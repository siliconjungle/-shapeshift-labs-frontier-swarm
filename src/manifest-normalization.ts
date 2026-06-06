import {
  FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID,
  FRONTIER_SWARM_DEFAULT_MODEL,
  FRONTIER_SWARM_DEFAULT_REASONING_EFFORT,
  FRONTIER_SWARM_TASK_KIND,
  FRONTIER_SWARM_TASK_VERSION
} from './constants.js';
import { normalizeId, titleFromId } from './coercion.js';
import { positiveNumber, toJsonObject, uniqueStrings } from './internal.js';
import type {
  FrontierSwarmBrowserResource,
  FrontierSwarmBrowserResourceInput,
  FrontierSwarmBudget,
  FrontierSwarmBudgetInput,
  FrontierSwarmCommand,
  FrontierSwarmCommandInput,
  FrontierSwarmCompute,
  FrontierSwarmComputeInput,
  FrontierSwarmLayer,
  FrontierSwarmLayerInput,
  FrontierSwarmLane,
  FrontierSwarmLaneInput,
  FrontierSwarmOwnershipRegion,
  FrontierSwarmOwnershipRegionInput,
  FrontierSwarmPolicy,
  FrontierSwarmPolicyInput,
  FrontierSwarmResourceRequirements,
  FrontierSwarmResourceRequirementsInput,
  FrontierSwarmReviewPolicy,
  FrontierSwarmReviewPolicyInput,
  FrontierSwarmTask,
  FrontierSwarmTaskInput
} from './index.js';

const DEFAULT_COMPLETED_STATUSES = ['completed', 'verified', 'done', 'verified-local-harness'];

export function normalizeComputeList(input: readonly FrontierSwarmComputeInput[] | undefined): FrontierSwarmCompute[] {
  const values = input && input.length > 0 ? input : [{
    id: FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID,
    kind: 'codex',
    model: FRONTIER_SWARM_DEFAULT_MODEL,
    reasoningEffort: FRONTIER_SWARM_DEFAULT_REASONING_EFFORT
  }];
  return values.map((compute) => ({
    id: normalizeId(compute.id, 'compute id'),
    kind: compute.kind ?? 'external',
    ...(compute.title ? { title: compute.title } : {}),
    ...(compute.model ? { model: compute.model } : {}),
    ...(compute.reasoningEffort ? { reasoningEffort: compute.reasoningEffort } : {}),
    ...(compute.serviceTier ? { serviceTier: compute.serviceTier } : {}),
    ...(compute.profile ? { profile: compute.profile } : {}),
    ...(compute.sandbox ? { sandbox: compute.sandbox } : {}),
    ...(compute.approval ? { approval: compute.approval } : {}),
    ...(positiveNumber(compute.maxConcurrency) ? { maxConcurrency: Math.floor(compute.maxConcurrency as number) } : {}),
    ...(positiveNumber(compute.timeoutMs) ? { timeoutMs: Math.floor(compute.timeoutMs as number) } : {}),
    ...(toJsonObject(compute.metadata) ? { metadata: toJsonObject(compute.metadata) } : {})
  }));
}

export function normalizeLayer(input: FrontierSwarmLayerInput): FrontierSwarmLayer {
  return {
    id: normalizeId(input.id, 'layer id'),
    title: input.title ?? titleFromId(input.id),
    ...(input.description ? { description: input.description } : {}),
    ...(input.parentId ? { parentId: normalizeId(input.parentId, 'parent layer id') } : {}),
    ...(input.compute ? { compute: input.compute } : {}),
    ...(input.defaultCompute ? { defaultCompute: input.defaultCompute } : {}),
    childCompute: { ...(input.childCompute ?? {}) },
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function normalizeLane(input: FrontierSwarmLaneInput): FrontierSwarmLane {
  const allowedWrites = uniqueStrings([...(input.allowedWrites ?? []), ...(input.allowedGlobs ?? [])]);
  return {
    id: normalizeId(input.id, 'lane id'),
    title: input.title ?? titleFromId(input.id),
    ...(input.description ? { description: input.description } : {}),
    ...(input.layer ? { layer: input.layer } : {}),
    ...(input.compute ? { compute: input.compute } : {}),
    allowedWrites,
    sharedReadOnly: uniqueStrings(input.sharedReadOnly ?? []),
    neverEdit: uniqueStrings(input.neverEdit ?? []),
    ownershipRegions: normalizeOwnershipRegions(input.ownershipRegions ?? []),
    capabilities: uniqueStrings(input.capabilities ?? []),
    ...(input.resourceRequirements ? { resourceRequirements: normalizeResourceRequirements(input.resourceRequirements) } : {}),
    ...(input.worktreePath ? { worktreePath: input.worktreePath } : {}),
    ...(input.evidencePrefix || input.evidenceOutDirPrefix ? { evidencePrefix: input.evidencePrefix ?? input.evidenceOutDirPrefix } : {}),
    concurrencyKey: input.concurrencyKey ?? input.id,
    ...(positiveNumber(input.maxConcurrency) ? { maxConcurrency: Math.floor(input.maxConcurrency as number) } : {}),
    handoffCommands: normalizeCommands(input.handoffCommands ?? []),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function normalizePolicy(input: FrontierSwarmPolicyInput | undefined, defaultCompute: string): FrontierSwarmPolicy {
  return {
    mode: input?.mode ?? 'hard-file-ownership',
    defaultConcurrency: Math.max(1, Math.floor(input?.defaultConcurrency ?? 1)),
    defaultCompute: input?.defaultCompute ?? defaultCompute,
    ...(input?.defaultLayer ? { defaultLayer: input.defaultLayer } : {}),
    completedStatuses: uniqueStrings(input?.completedStatuses ?? DEFAULT_COMPLETED_STATUSES),
    sharedReadOnly: uniqueStrings(input?.sharedReadOnly ?? []),
    neverEditWithoutParent: uniqueStrings(input?.neverEditWithoutParent ?? []),
    requireCleanWorktree: input?.requireCleanWorktree ?? true,
    ...(toJsonObject(input?.metadata) ? { metadata: toJsonObject(input?.metadata) } : {})
  };
}

export function normalizeTask(input: FrontierSwarmTaskInput): FrontierSwarmTask {
  const targetRefs = uniqueStrings([...(input.targetRefs ?? []), ...(input.ownedFiles ?? [])]);
  return {
    kind: FRONTIER_SWARM_TASK_KIND,
    version: FRONTIER_SWARM_TASK_VERSION,
    id: normalizeId(input.id, 'task id'),
    title: input.title ?? titleFromId(input.id),
    objective: input.objective ?? input.description ?? input.title ?? input.id,
    ...(input.description ? { description: input.description } : {}),
    workKind: input.kind ?? 'agent-task',
    status: input.status ?? 'open',
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.layer ? { layer: input.layer } : {}),
    ...(input.compute ? { compute: input.compute } : {}),
    ...(input.parentTaskId ? { parentTaskId: input.parentTaskId } : {}),
    dependsOn: uniqueStrings(input.dependsOn ?? []),
    ...(input.concurrencyKey ? { concurrencyKey: input.concurrencyKey } : {}),
    ...(input.budget ? { budget: normalizeBudget(input.budget) } : {}),
    ...(input.review ? { review: normalizeReviewPolicy(input.review) } : {}),
    priority: Number.isFinite(input.priority) ? Number(input.priority) : 100,
    sourceRefs: uniqueStrings(input.sourceRefs ?? []),
    targetRefs,
    allowedWrites: uniqueStrings([...(input.allowedWrites ?? []), ...targetRefs]),
    ownershipRegions: normalizeOwnershipRegions(input.ownershipRegions ?? []),
    ownedRegions: uniqueStrings(input.ownedRegions ?? []),
    changedRegions: uniqueStrings(input.changedRegions ?? []),
    capabilities: uniqueStrings(input.capabilities ?? []),
    ...(input.resourceRequirements ? { resourceRequirements: normalizeResourceRequirements(input.resourceRequirements) } : {}),
    acceptance: normalizeAcceptance(input),
    verification: normalizeCommands(input.verification ?? []),
    ...(input.evidenceCommand ? { evidenceCommand: input.evidenceCommand } : {}),
    ...(input.shardCommand ? { shardCommand: input.shardCommand } : {}),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function normalizeCommands(input: readonly (string | FrontierSwarmCommandInput)[]): FrontierSwarmCommand[] {
  return input.map((entry) => {
    if (typeof entry === 'string') {
      return { name: entry, command: entry, args: [], required: true };
    }
    return {
      name: entry.name ?? [entry.command, ...(entry.args ?? [])].join(' '),
      command: entry.command,
      args: [...(entry.args ?? [])],
      required: entry.required ?? true,
      ...(entry.cwd ? { cwd: entry.cwd } : {}),
      ...(toJsonObject(entry.metadata) ? { metadata: toJsonObject(entry.metadata) } : {})
    };
  });
}

function normalizeOwnershipRegions(input: readonly FrontierSwarmOwnershipRegionInput[] = []): FrontierSwarmOwnershipRegion[] {
  return input.map((region) => {
    const globs = uniqueStrings([...(region.globs ?? []), ...(region.paths ?? [])]);
    return {
      id: normalizeId(region.id, 'ownership region id'),
      title: region.title ?? titleFromId(region.id),
      ...(region.description ? { description: region.description } : {}),
      globs,
      selectors: uniqueStrings(region.selectors ?? []),
      ...(region.owner ? { owner: region.owner } : {}),
      ...(toJsonObject(region.metadata) ? { metadata: toJsonObject(region.metadata) } : {})
    };
  });
}

function normalizeResourceRequirements(input: FrontierSwarmResourceRequirementsInput = {}): FrontierSwarmResourceRequirements {
  const resources: Record<string, number> = {};
  for (const [key, value] of Object.entries(input.resources ?? {})) {
    if (Number.isFinite(value) && value > 0) resources[key] = value;
  }
  return {
    capabilities: uniqueStrings(input.capabilities ?? []),
    resources,
    ...(input.browser ? { browser: normalizeBrowserResource(input.browser) } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeBrowserResource(input: FrontierSwarmBrowserResourceInput): FrontierSwarmBrowserResource {
  return {
    required: input.required ?? true,
    portPool: uniqueStrings((input.portPool ?? []).map((port) => String(port))),
    ...(input.profileDir ? { profileDir: input.profileDir } : {}),
    ...(input.profileDirPrefix ? { profileDirPrefix: input.profileDirPrefix } : {}),
    ...(positiveNumber(input.maxConcurrency) ? { maxConcurrency: Math.floor(input.maxConcurrency as number) } : {}),
    ...(input.headless !== undefined ? { headless: input.headless } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeBudget(input: FrontierSwarmBudgetInput = {}): FrontierSwarmBudget {
  return {
    ...(positiveNumber(input.maxCostUsd) ? { maxCostUsd: input.maxCostUsd } : {}),
    ...(positiveNumber(input.maxInputTokens) ? { maxInputTokens: Math.floor(input.maxInputTokens as number) } : {}),
    ...(positiveNumber(input.maxOutputTokens) ? { maxOutputTokens: Math.floor(input.maxOutputTokens as number) } : {}),
    ...(positiveNumber(input.maxDurationMs) ? { maxDurationMs: Math.floor(input.maxDurationMs as number) } : {}),
    maxRetries: Math.max(0, Math.floor(input.maxRetries ?? 0)),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeReviewPolicy(input: FrontierSwarmReviewPolicyInput = {}): FrontierSwarmReviewPolicy {
  const sampleRate = typeof input.sampleRate === 'number' && Number.isFinite(input.sampleRate)
    ? Math.min(1, Math.max(0, input.sampleRate))
    : 0;
  return {
    requiredReviewers: Math.max(0, Math.floor(input.requiredReviewers ?? 0)),
    sampleRate,
    alwaysReview: input.alwaysReview ?? false,
    reviewerPool: uniqueStrings(input.reviewerPool ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeAcceptance(input: FrontierSwarmTaskInput): string[] {
  const checks = (input.acceptanceChecks ?? []).map((check) => typeof check === 'string' ? check : check.description ?? check.id ?? '').filter(Boolean);
  return uniqueStrings([...(input.acceptance ?? []), ...checks]);
}
