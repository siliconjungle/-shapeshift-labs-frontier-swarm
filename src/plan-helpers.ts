import { cloneJsonValue, matchesGlob, positiveNumber, slug, toJsonObject, uniqueStrings } from './internal.js';
import type {
  FrontierSwarmCompiled,
  FrontierSwarmCompute,
  FrontierSwarmCommand,
  FrontierSwarmManifest,
  FrontierSwarmOwnershipRegion,
  FrontierSwarmResourceRequirements,
  FrontierSwarmReviewPolicy,
  FrontierSwarmReviewPolicyInput,
  FrontierSwarmSummary,
  FrontierSwarmTask,
  FrontierSwarmTaskInput,
  FrontierSwarmTaskSetInput,
  FrontierSwarmValidation,
  FrontierSwarmValidationIssue
} from './index.js';
import type {
  FrontierSwarmJob,
  FrontierSwarmJobGraph,
  FrontierSwarmJobGraphEdge,
  FrontierSwarmPlanFilter,
  FrontierSwarmPlanInput,
  FrontierSwarmScheduleLimits
} from './plan.js';

type DefineSwarmTasks = (input: readonly FrontierSwarmTaskInput[] | FrontierSwarmTaskSetInput) => FrontierSwarmTask[];

export function normalizePlanTaskInput(input: FrontierSwarmTask | FrontierSwarmTaskInput, defineSwarmTasks: DefineSwarmTasks): FrontierSwarmTask {
  return isPlanSwarmTask(input) ? cloneJsonValue(input) as FrontierSwarmTask : defineSwarmTasks([input as FrontierSwarmTaskInput])[0];
}

export function normalizePlanTaskList(
  input: readonly FrontierSwarmTaskInput[] | FrontierSwarmTaskSetInput | readonly FrontierSwarmTask[],
  defineSwarmTasks: DefineSwarmTasks
): FrontierSwarmTask[] {
  if (Array.isArray(input)) return input.map((task) => normalizePlanTaskInput(task, defineSwarmTasks));
  return defineSwarmTasks(input);
}

export function createPlanJob(compiled: FrontierSwarmCompiled, task: FrontierSwarmTask, options: FrontierSwarmPlanFilter): FrontierSwarmJob {
  const lane = task.lane ? compiled.lanesById.get(task.lane) : undefined;
  const layer = task.layer ?? lane?.layer ?? compiled.manifest.policy.defaultLayer;
  const compute = options.compute ? readCompute(compiled, options.compute) : resolvePlanTaskCompute(compiled, task);
  const evidencePrefix = lane?.evidencePrefix ? lane.evidencePrefix.replace(/\/?$/, '/') + slug(task.id) + '/' : undefined;
  const allowedWrites = uniqueStrings([...(lane?.allowedWrites ?? []), ...task.allowedWrites, ...(evidencePrefix ? [evidencePrefix + '**'] : [])]);
  const ownershipWarnings = task.targetRefs
    .filter((file) => allowedWrites.length > 0 && !allowedWrites.some((glob) => matchesGlob(file, glob)))
    .map((file) => `${file} is outside allowed write globs for ${lane?.id ?? 'unassigned'}`);
  const capabilities = uniqueStrings([...(lane?.capabilities ?? []), ...task.capabilities]);
  const resourceRequirements = mergeResourceRequirements(lane?.resourceRequirements, task.resourceRequirements, capabilities);
  const ownershipRegions = mergeOwnershipRegions(lane?.ownershipRegions ?? [], task.ownershipRegions);
  const ownedRegions = uniqueStrings([...task.ownedRegions, ...ownershipRegions.map((region) => region.id)]);
  return {
    id: `${lane?.id ?? 'unassigned'}-${slug(task.id)}`,
    taskId: task.id,
    title: task.title,
    lane: lane?.id ?? 'unassigned',
    ...(layer ? { layer } : {}),
    compute,
    status: 'planned',
    priority: task.priority,
    task,
    allowedWrites,
    sharedReadOnly: uniqueStrings([...(compiled.manifest.policy.sharedReadOnly ?? []), ...(lane?.sharedReadOnly ?? [])]),
    neverEdit: uniqueStrings([...(compiled.manifest.policy.neverEditWithoutParent ?? []), ...(lane?.neverEdit ?? [])]),
    ownershipRegions,
    ownedRegions,
    changedRegions: uniqueStrings(task.changedRegions),
    capabilities,
    ...(resourceRequirements ? { resourceRequirements } : {}),
    ...(lane?.worktreePath ? { worktreePath: lane.worktreePath } : {}),
    ...(evidencePrefix ? { evidencePrefix } : {}),
    concurrencyKey: task.concurrencyKey ?? lane?.concurrencyKey ?? task.lane ?? compute.id,
    ownershipWarnings,
    verification: task.verification.length ? task.verification : (lane?.handoffCommands ?? []),
    acceptance: [...task.acceptance],
    dependsOn: resolveJobDependencies(task),
    ...(task.budget ? { budget: task.budget } : {}),
    review: task.review ?? normalizeReviewPolicy(),
    tags: uniqueStrings([...task.tags, ...(lane?.tags ?? []), ...(layer ? [layer] : []), compute.id]),
    ...(task.metadata ? { metadata: task.metadata } : {})
  };
}

export function resolvePlanTaskCompute(compiled: FrontierSwarmCompiled, task: FrontierSwarmTask): FrontierSwarmCompute {
  if (task.compute) return readCompute(compiled, task.compute);
  const lane = task.lane ? compiled.lanesById.get(task.lane) : undefined;
  if (lane?.compute) return readCompute(compiled, lane.compute);
  const layerId = task.layer ?? lane?.layer ?? compiled.manifest.policy.defaultLayer;
  const layered = layerId ? resolveLayerCompute(compiled, layerId) : undefined;
  return layered ?? readCompute(compiled, compiled.manifest.policy.defaultCompute);
}

export function createPlanJobGraph(jobs: readonly FrontierSwarmJob[]): FrontierSwarmJobGraph {
  const nodes = jobs.map((job) => job.id).sort();
  const nodeSet = new Set(nodes);
  const taskToJob = new Map(jobs.map((job) => [job.taskId, job.id]));
  const edges: FrontierSwarmJobGraphEdge[] = [];
  const issues: FrontierSwarmValidationIssue[] = [];
  for (const job of jobs) {
    for (const rawDep of job.dependsOn) {
      const dep = nodeSet.has(rawDep) ? rawDep : taskToJob.get(rawDep);
      if (!dep) {
        addIssue(issues, 'missing-job-dependency', 'error', `jobs.${job.id}.dependsOn`, `Job dependency is not in this plan: ${rawDep}`);
        continue;
      }
      if (dep === job.id) {
        addIssue(issues, 'self-job-dependency', 'error', `jobs.${job.id}.dependsOn`, `Job cannot depend on itself: ${job.id}`);
        continue;
      }
      edges.push({ from: dep, to: job.id, type: 'depends-on' });
    }
  }
  const dependenciesByJobId = Object.fromEntries(nodes.map((node) => [node, [] as string[]]));
  const dependentsByJobId = Object.fromEntries(nodes.map((node) => [node, [] as string[]]));
  for (const edge of edges) {
    dependenciesByJobId[edge.to]?.push(edge.from);
    dependentsByJobId[edge.from]?.push(edge.to);
  }
  for (const key of nodes) {
    dependenciesByJobId[key] = uniqueStrings(dependenciesByJobId[key] ?? []).sort();
    dependentsByJobId[key] = uniqueStrings(dependentsByJobId[key] ?? []).sort();
    if (hasJobDependencyCycle(key, dependenciesByJobId)) {
      addIssue(issues, 'job-dependency-cycle', 'error', `jobs.${key}.dependsOn`, `Job dependency graph contains a cycle at ${key}`);
    }
  }
  return {
    nodes,
    edges: edges.sort((left, right) => left.from.localeCompare(right.from) || left.to.localeCompare(right.to)),
    dependentsByJobId,
    dependenciesByJobId,
    roots: nodes.filter((node) => dependenciesByJobId[node]?.length === 0),
    leaves: nodes.filter((node) => dependentsByJobId[node]?.length === 0),
    issues
  };
}

export function normalizePlanScheduleLimits(manifest: FrontierSwarmManifest, options: FrontierSwarmPlanInput): FrontierSwarmScheduleLimits {
  const maxLaneConcurrency: Record<string, number> = {};
  for (const lane of manifest.lanes) {
    const browserMax = lane.resourceRequirements?.browser?.maxConcurrency;
    const value = options.maxLaneConcurrency?.[lane.id] ?? lane.maxConcurrency ?? browserMax ?? manifest.policy.defaultConcurrency;
    maxLaneConcurrency[lane.id] = Math.max(1, Math.floor(value));
  }
  return {
    ...(positiveNumber(options.maxReadyJobs) ? { maxReadyJobs: Math.floor(options.maxReadyJobs as number) } : {}),
    maxLaneConcurrency: { ...maxLaneConcurrency, ...(options.maxLaneConcurrency ?? {}) },
    maxConcurrencyKeyConcurrency: { ...(options.maxConcurrencyKeyConcurrency ?? {}) },
    maxComputeConcurrency: { ...(options.maxComputeConcurrency ?? {}) },
    resourceQuotas: normalizeResourceQuotas(options.resourceQuotas ?? {})
  };
}

export function validatePlanTasksForManifest(compiled: FrontierSwarmCompiled, tasks: readonly FrontierSwarmTask[], graph?: FrontierSwarmJobGraph): FrontierSwarmValidation {
  const issues = [...compiled.validation.issues, ...(graph?.issues ?? [])];
  const taskIds = new Set(tasks.map((task) => task.id));
  for (const task of tasks) {
    if (task.lane && !compiled.lanesById.has(task.lane)) addIssue(issues, 'missing-task-lane', 'error', `tasks.${task.id}.lane`, `Task lane is not declared: ${task.lane}`);
    if (task.layer && !compiled.layersById.has(task.layer)) addIssue(issues, 'missing-task-layer', 'error', `tasks.${task.id}.layer`, `Task layer is not declared: ${task.layer}`);
    if (task.compute && !compiled.computeById.has(task.compute)) addIssue(issues, 'missing-task-compute', 'error', `tasks.${task.id}.compute`, `Task compute is not declared: ${task.compute}`);
    for (const dependency of task.dependsOn) {
      if (!taskIds.has(dependency)) addIssue(issues, 'missing-task-dependency', 'warning', `tasks.${task.id}.dependsOn`, `Task dependency is not declared in the task set: ${dependency}`);
    }
    if (task.parentTaskId && !taskIds.has(task.parentTaskId)) addIssue(issues, 'missing-parent-task', 'warning', `tasks.${task.id}.parentTaskId`, `Task parent is not declared in the task set: ${task.parentTaskId}`);
  }
  return { valid: issues.every((issue) => issue.severity !== 'error'), issues };
}

export function summarizePlanJobs(jobs: readonly FrontierSwarmJob[]): FrontierSwarmSummary {
  return {
    computeCount: new Set(jobs.map((job) => job.compute.id)).size,
    layerCount: new Set(jobs.map((job) => job.layer).filter((layer): layer is string => !!layer)).size,
    laneCount: new Set(jobs.map((job) => job.lane)).size,
    taskCount: jobs.length,
    jobCount: jobs.length,
    ownershipViolationCount: jobs.reduce((total, job) => total + job.ownershipWarnings.length, 0)
  };
}

function addIssue(issues: FrontierSwarmValidationIssue[], code: string, severity: 'error' | 'warning', path: string, message: string): void {
  issues.push({ code, severity, path, message });
}

function hasJobDependencyCycle(start: string, dependenciesByJobId: Record<string, string[]>): boolean {
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (node: string): boolean => {
    if (visiting.has(node)) return true;
    if (visited.has(node)) return false;
    visiting.add(node);
    for (const dep of dependenciesByJobId[node] ?? []) if (visit(dep)) return true;
    visiting.delete(node);
    visited.add(node);
    return false;
  };
  return visit(start);
}

function isPlanSwarmTask(value: unknown): value is FrontierSwarmTask {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === 'frontier.swarm.task';
}

function mergeOwnershipRegions(laneRegions: readonly FrontierSwarmOwnershipRegion[], taskRegions: readonly FrontierSwarmOwnershipRegion[]): FrontierSwarmOwnershipRegion[] {
  const byId = new Map<string, FrontierSwarmOwnershipRegion>();
  for (const region of laneRegions) byId.set(region.id, cloneJsonValue(region) as FrontierSwarmOwnershipRegion);
  for (const region of taskRegions) byId.set(region.id, cloneJsonValue(region) as FrontierSwarmOwnershipRegion);
  return Array.from(byId.values()).sort((left, right) => left.id.localeCompare(right.id));
}

function mergeResourceRequirements(
  lane: FrontierSwarmResourceRequirements | undefined,
  task: FrontierSwarmResourceRequirements | undefined,
  extraCapabilities: readonly string[] = []
): FrontierSwarmResourceRequirements | undefined {
  if (!lane && !task && extraCapabilities.length === 0) return undefined;
  const capabilities = uniqueStrings([...(lane?.capabilities ?? []), ...(task?.capabilities ?? []), ...extraCapabilities]);
  const resources: Record<string, number> = { ...(lane?.resources ?? {}) };
  for (const [key, value] of Object.entries(task?.resources ?? {})) resources[key] = Math.max(resources[key] ?? 0, value);
  const browser = task?.browser ?? lane?.browser;
  const metadata = toJsonObject({ ...(lane?.metadata ?? {}), ...(task?.metadata ?? {}) });
  return { capabilities, resources, ...(browser ? { browser } : {}), ...(metadata && Object.keys(metadata).length ? { metadata } : {}) };
}

function normalizeReviewPolicy(input: FrontierSwarmReviewPolicyInput = {}): FrontierSwarmReviewPolicy {
  const sampleRate = typeof input.sampleRate === 'number' && Number.isFinite(input.sampleRate) ? Math.min(1, Math.max(0, input.sampleRate)) : 0;
  return {
    requiredReviewers: Math.max(0, Math.floor(input.requiredReviewers ?? 0)),
    sampleRate,
    alwaysReview: input.alwaysReview ?? false,
    reviewerPool: uniqueStrings(input.reviewerPool ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeResourceQuotas(input: Record<string, number>): Record<string, number> {
  const quotas: Record<string, number> = {};
  for (const [resource, value] of Object.entries(input)) if (positiveNumber(value)) quotas[resource] = value;
  return quotas;
}

function readCompute(compiled: FrontierSwarmCompiled, id: string): FrontierSwarmCompute {
  return compiled.computeById.get(id) ?? compiled.computeById.get(compiled.manifest.policy.defaultCompute) ?? compiled.manifest.compute[0];
}

function resolveJobDependencies(task: FrontierSwarmTask): string[] {
  return uniqueStrings([...(task.parentTaskId ? [task.parentTaskId] : []), ...task.dependsOn]);
}

function resolveLayerCompute(compiled: FrontierSwarmCompiled, layerId: string): FrontierSwarmCompute | undefined {
  const layer = compiled.layersById.get(layerId);
  if (!layer) return undefined;
  let childId = layer.id;
  let parentId = layer.parentId;
  while (parentId) {
    const parent = compiled.layersById.get(parentId);
    if (!parent) break;
    const selected = parent.childCompute[childId] ?? parent.childCompute['*'];
    if (selected) return readCompute(compiled, selected);
    childId = parent.id;
    parentId = parent.parentId;
  }
  const own = layer.compute ?? layer.defaultCompute;
  return own ? readCompute(compiled, own) : undefined;
}
