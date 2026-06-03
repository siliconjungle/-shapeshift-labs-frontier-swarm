import type { JsonObject, JsonValue } from '@shapeshift-labs/frontier';

export const FRONTIER_SWARM_MANIFEST_KIND = 'frontier.swarm.manifest';
export const FRONTIER_SWARM_MANIFEST_VERSION = 1;
export const FRONTIER_SWARM_TASK_KIND = 'frontier.swarm.task';
export const FRONTIER_SWARM_TASK_VERSION = 1;
export const FRONTIER_SWARM_PLAN_KIND = 'frontier.swarm.plan';
export const FRONTIER_SWARM_PLAN_VERSION = 1;
export const FRONTIER_SWARM_RUN_KIND = 'frontier.swarm.run';
export const FRONTIER_SWARM_RUN_VERSION = 1;
export const FRONTIER_SWARM_EVENT_KIND = 'frontier.swarm.event';
export const FRONTIER_SWARM_EVENT_VERSION = 1;
export const FRONTIER_SWARM_PROOF_KIND = 'frontier.swarm.proof';
export const FRONTIER_SWARM_PROOF_VERSION = 1;
export const FRONTIER_SWARM_SCHEDULE_KIND = 'frontier.swarm.schedule';
export const FRONTIER_SWARM_SCHEDULE_VERSION = 1;
export const FRONTIER_SWARM_LEASE_KIND = 'frontier.swarm.lease';
export const FRONTIER_SWARM_LEASE_VERSION = 1;
export const FRONTIER_SWARM_ARTIFACT_INDEX_KIND = 'frontier.swarm.artifact-index';
export const FRONTIER_SWARM_ARTIFACT_INDEX_VERSION = 1;
export const FRONTIER_SWARM_REVIEW_PLAN_KIND = 'frontier.swarm.review-plan';
export const FRONTIER_SWARM_REVIEW_PLAN_VERSION = 1;
export const FRONTIER_SWARM_MERGE_PLAN_KIND = 'frontier.swarm.merge-plan';
export const FRONTIER_SWARM_MERGE_PLAN_VERSION = 1;

export const FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID = 'codex.gpt-5.5.xhigh';
export const FRONTIER_SWARM_DEFAULT_MODEL = 'gpt-5.5';
export const FRONTIER_SWARM_DEFAULT_REASONING_EFFORT = 'xhigh';

export type FrontierSwarmComputeKind = 'codex' | 'shell' | 'human' | 'external' | string;
export type FrontierSwarmReasoningEffort = 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | string;
export type FrontierSwarmPolicyMode = 'advisory' | 'hard-file-ownership' | string;
export type FrontierSwarmTaskStatus =
  | 'open'
  | 'planned'
  | 'running'
  | 'blocked'
  | 'failed'
  | 'completed'
  | 'verified'
  | string;
export type FrontierSwarmJobStatus =
  | 'planned'
  | 'scheduled'
  | 'running'
  | 'blocked'
  | 'failed'
  | 'completed'
  | 'verified'
  | string;

export interface FrontierSwarmComputeInput {
  id: string;
  kind?: FrontierSwarmComputeKind;
  title?: string;
  model?: string;
  reasoningEffort?: FrontierSwarmReasoningEffort;
  serviceTier?: string;
  profile?: string;
  sandbox?: string;
  approval?: string;
  maxConcurrency?: number;
  timeoutMs?: number;
  metadata?: unknown;
}

export interface FrontierSwarmCompute {
  id: string;
  kind: FrontierSwarmComputeKind;
  title?: string;
  model?: string;
  reasoningEffort?: FrontierSwarmReasoningEffort;
  serviceTier?: string;
  profile?: string;
  sandbox?: string;
  approval?: string;
  maxConcurrency?: number;
  timeoutMs?: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmLayerInput {
  id: string;
  title?: string;
  description?: string;
  parentId?: string;
  compute?: string;
  defaultCompute?: string;
  childCompute?: Record<string, string>;
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmLayer {
  id: string;
  title: string;
  description?: string;
  parentId?: string;
  compute?: string;
  defaultCompute?: string;
  childCompute: Record<string, string>;
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmLaneInput {
  id: string;
  title?: string;
  description?: string;
  layer?: string;
  compute?: string;
  allowedWrites?: readonly string[];
  allowedGlobs?: readonly string[];
  sharedReadOnly?: readonly string[];
  neverEdit?: readonly string[];
  worktreePath?: string;
  evidencePrefix?: string;
  evidenceOutDirPrefix?: string;
  concurrencyKey?: string;
  maxConcurrency?: number;
  handoffCommands?: readonly (string | FrontierSwarmCommandInput)[];
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmLane {
  id: string;
  title: string;
  description?: string;
  layer?: string;
  compute?: string;
  allowedWrites: string[];
  sharedReadOnly: string[];
  neverEdit: string[];
  worktreePath?: string;
  evidencePrefix?: string;
  concurrencyKey: string;
  maxConcurrency?: number;
  handoffCommands: FrontierSwarmCommand[];
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmCommandInput {
  name?: string;
  command: string;
  args?: readonly string[];
  required?: boolean;
  cwd?: string;
  metadata?: unknown;
}

export interface FrontierSwarmCommand {
  name: string;
  command: string;
  args: string[];
  required: boolean;
  cwd?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmPolicyInput {
  mode?: FrontierSwarmPolicyMode;
  defaultConcurrency?: number;
  defaultCompute?: string;
  defaultLayer?: string;
  completedStatuses?: readonly string[];
  sharedReadOnly?: readonly string[];
  neverEditWithoutParent?: readonly string[];
  requireCleanWorktree?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmPolicy {
  mode: FrontierSwarmPolicyMode;
  defaultConcurrency: number;
  defaultCompute: string;
  defaultLayer?: string;
  completedStatuses: string[];
  sharedReadOnly: string[];
  neverEditWithoutParent: string[];
  requireCleanWorktree: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmManifestInput {
  id?: string;
  title?: string;
  description?: string;
  package?: string;
  feature?: string;
  owner?: string;
  compute?: readonly FrontierSwarmComputeInput[];
  layers?: readonly FrontierSwarmLayerInput[];
  lanes?: readonly FrontierSwarmLaneInput[];
  policy?: FrontierSwarmPolicyInput;
  resources?: readonly string[];
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmManifest {
  kind: typeof FRONTIER_SWARM_MANIFEST_KIND;
  version: typeof FRONTIER_SWARM_MANIFEST_VERSION;
  id: string;
  title: string;
  description?: string;
  package?: string;
  feature?: string;
  owner?: string;
  compute: FrontierSwarmCompute[];
  layers: FrontierSwarmLayer[];
  lanes: FrontierSwarmLane[];
  policy: FrontierSwarmPolicy;
  resources: string[];
  tags: string[];
  metadata?: JsonObject;
  summary: FrontierSwarmSummary;
}

export interface FrontierSwarmSummary {
  computeCount: number;
  layerCount: number;
  laneCount: number;
  taskCount?: number;
  jobCount?: number;
  completedCount?: number;
  blockedCount?: number;
  failedCount?: number;
  ownershipViolationCount?: number;
}

export interface FrontierSwarmTaskInput {
  id: string;
  title?: string;
  objective?: string;
  description?: string;
  kind?: string;
  status?: FrontierSwarmTaskStatus;
  lane?: string;
  layer?: string;
  compute?: string;
  parentTaskId?: string;
  dependsOn?: readonly string[];
  concurrencyKey?: string;
  budget?: FrontierSwarmBudgetInput;
  review?: FrontierSwarmReviewPolicyInput;
  priority?: number;
  sourceRefs?: readonly string[];
  targetRefs?: readonly string[];
  ownedFiles?: readonly string[];
  allowedWrites?: readonly string[];
  acceptance?: readonly string[];
  acceptanceChecks?: readonly ({ id?: string; description?: string } | string)[];
  verification?: readonly (string | FrontierSwarmCommandInput)[];
  evidenceCommand?: string;
  shardCommand?: string;
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmTask {
  kind: typeof FRONTIER_SWARM_TASK_KIND;
  version: typeof FRONTIER_SWARM_TASK_VERSION;
  id: string;
  title: string;
  objective: string;
  description?: string;
  workKind: string;
  status: FrontierSwarmTaskStatus;
  lane?: string;
  layer?: string;
  compute?: string;
  parentTaskId?: string;
  dependsOn: string[];
  concurrencyKey?: string;
  budget?: FrontierSwarmBudget;
  review?: FrontierSwarmReviewPolicy;
  priority: number;
  sourceRefs: string[];
  targetRefs: string[];
  allowedWrites: string[];
  acceptance: string[];
  verification: FrontierSwarmCommand[];
  evidenceCommand?: string;
  shardCommand?: string;
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmTaskSetInput {
  tasks?: readonly FrontierSwarmTaskInput[];
  items?: readonly FrontierSwarmTaskInput[];
}

export interface FrontierSwarmCompiled {
  manifest: FrontierSwarmManifest;
  validation: FrontierSwarmValidation;
  computeById: ReadonlyMap<string, FrontierSwarmCompute>;
  layersById: ReadonlyMap<string, FrontierSwarmLayer>;
  lanesById: ReadonlyMap<string, FrontierSwarmLane>;
}

export interface FrontierSwarmValidation {
  valid: boolean;
  issues: FrontierSwarmValidationIssue[];
}

export interface FrontierSwarmValidationIssue {
  code: string;
  severity: 'error' | 'warning';
  path: string;
  message: string;
}

export interface FrontierSwarmPlanFilter {
  lanes?: readonly string[];
  layers?: readonly string[];
  statuses?: readonly string[];
  selectors?: readonly string[];
  includeCompleted?: boolean;
  limit?: number;
  compute?: string;
}

export interface FrontierSwarmPlanInput extends FrontierSwarmPlanFilter {
  id?: string;
  runId?: string;
  now?: number;
  maxReadyJobs?: number;
  maxLaneConcurrency?: Record<string, number>;
  maxConcurrencyKeyConcurrency?: Record<string, number>;
  maxComputeConcurrency?: Record<string, number>;
  metadata?: unknown;
}

export interface FrontierSwarmPlan {
  kind: typeof FRONTIER_SWARM_PLAN_KIND;
  version: typeof FRONTIER_SWARM_PLAN_VERSION;
  id: string;
  runId: string;
  manifestId: string;
  createdAt: number;
  filters: FrontierSwarmPlanFilter;
  limits: FrontierSwarmScheduleLimits;
  validation: FrontierSwarmValidation;
  jobs: FrontierSwarmJob[];
  graph: FrontierSwarmJobGraph;
  summary: FrontierSwarmSummary;
  metadata?: JsonObject;
}

export interface FrontierSwarmScheduleLimits {
  maxReadyJobs?: number;
  maxLaneConcurrency: Record<string, number>;
  maxConcurrencyKeyConcurrency: Record<string, number>;
  maxComputeConcurrency: Record<string, number>;
}

export interface FrontierSwarmJob {
  id: string;
  taskId: string;
  title: string;
  lane: string;
  layer?: string;
  compute: FrontierSwarmCompute;
  status: FrontierSwarmJobStatus;
  priority: number;
  task: FrontierSwarmTask;
  allowedWrites: string[];
  sharedReadOnly: string[];
  neverEdit: string[];
  worktreePath?: string;
  evidencePrefix?: string;
  concurrencyKey: string;
  ownershipWarnings: string[];
  verification: FrontierSwarmCommand[];
  acceptance: string[];
  dependsOn: string[];
  budget?: FrontierSwarmBudget;
  review: FrontierSwarmReviewPolicy;
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmBudgetInput {
  maxCostUsd?: number;
  maxInputTokens?: number;
  maxOutputTokens?: number;
  maxDurationMs?: number;
  maxRetries?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBudget {
  maxCostUsd?: number;
  maxInputTokens?: number;
  maxOutputTokens?: number;
  maxDurationMs?: number;
  maxRetries: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmUsageInput {
  costUsd?: number;
  inputTokens?: number;
  outputTokens?: number;
  durationMs?: number;
  attempts?: number;
  metadata?: unknown;
}

export interface FrontierSwarmUsage {
  costUsd: number;
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
  attempts: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmBudgetDecision {
  ok: boolean;
  jobId: string;
  usage: FrontierSwarmUsage;
  budget?: FrontierSwarmBudget;
  violations: string[];
}

export interface FrontierSwarmReviewPolicyInput {
  requiredReviewers?: number;
  sampleRate?: number;
  alwaysReview?: boolean;
  reviewerPool?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmReviewPolicy {
  requiredReviewers: number;
  sampleRate: number;
  alwaysReview: boolean;
  reviewerPool: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmJobGraph {
  nodes: string[];
  edges: FrontierSwarmJobGraphEdge[];
  dependentsByJobId: Record<string, string[]>;
  dependenciesByJobId: Record<string, string[]>;
  roots: string[];
  leaves: string[];
  issues: FrontierSwarmValidationIssue[];
}

export interface FrontierSwarmJobGraphEdge {
  from: string;
  to: string;
  type: 'depends-on' | 'parent-task';
}

export interface FrontierSwarmScheduleInput {
  plan: FrontierSwarmPlan;
  run?: FrontierSwarmRun;
  now?: number;
  maxReadyJobs?: number;
  maxLaneConcurrency?: Record<string, number>;
  maxConcurrencyKeyConcurrency?: Record<string, number>;
  maxComputeConcurrency?: Record<string, number>;
}

export interface FrontierSwarmReviewPlanInput {
  plan: FrontierSwarmPlan;
  run?: FrontierSwarmRun;
  budgetDecisions?: readonly FrontierSwarmBudgetDecision[];
  reviewers?: readonly string[];
  generatedAt?: number;
  sampleSalt?: string;
}

export interface FrontierSwarmMergePlanInput {
  plan: FrontierSwarmPlan;
  run: FrontierSwarmRun;
  reviewPlan?: FrontierSwarmReviewPlan;
  generatedAt?: number;
}

export interface FrontierSwarmSchedule {
  kind: typeof FRONTIER_SWARM_SCHEDULE_KIND;
  version: typeof FRONTIER_SWARM_SCHEDULE_VERSION;
  id: string;
  planId: string;
  runId?: string;
  createdAt: number;
  ready: FrontierSwarmScheduledJob[];
  blocked: FrontierSwarmBlockedJob[];
  running: FrontierSwarmRunningJob[];
  completed: string[];
  failed: string[];
  summary: FrontierSwarmScheduleSummary;
}

export interface FrontierSwarmScheduledJob {
  jobId: string;
  taskId: string;
  lane: string;
  compute: string;
  concurrencyKey: string;
  priority: number;
  dependsOn: string[];
}

export interface FrontierSwarmBlockedJob extends FrontierSwarmScheduledJob {
  reasons: string[];
  waitingFor: string[];
}

export interface FrontierSwarmRunningJob {
  jobId: string;
  lane: string;
  compute: string;
  concurrencyKey: string;
}

export interface FrontierSwarmScheduleSummary {
  jobCount: number;
  readyCount: number;
  blockedCount: number;
  runningCount: number;
  completedCount: number;
  failedCount: number;
}

export interface FrontierSwarmLeaseInput {
  schedule: FrontierSwarmSchedule;
  workerId: string;
  now?: number;
  leaseMs?: number;
  count?: number;
  existingLeases?: readonly FrontierSwarmLease[];
}

export interface FrontierSwarmLease {
  kind: typeof FRONTIER_SWARM_LEASE_KIND;
  version: typeof FRONTIER_SWARM_LEASE_VERSION;
  id: string;
  jobId: string;
  workerId: string;
  token: string;
  leasedAt: number;
  expiresAt: number;
  fencingToken: number;
  status: 'active' | 'expired' | 'released';
}

export interface FrontierSwarmArtifactInput {
  jobId: string;
  path: string;
  kind?: string;
  bytes?: number;
  hash?: string;
  producedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmArtifact {
  jobId: string;
  path: string;
  kind: string;
  bytes?: number;
  hash?: string;
  producedAt?: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmArtifactIndex {
  kind: typeof FRONTIER_SWARM_ARTIFACT_INDEX_KIND;
  version: typeof FRONTIER_SWARM_ARTIFACT_INDEX_VERSION;
  id: string;
  generatedAt: number;
  artifacts: FrontierSwarmArtifact[];
  byJobId: Record<string, FrontierSwarmArtifact[]>;
  byKind: Record<string, FrontierSwarmArtifact[]>;
  summary: {
    artifactCount: number;
    jobCount: number;
    kindCount: number;
    totalBytes: number;
  };
}

export interface FrontierSwarmReviewPlan {
  kind: typeof FRONTIER_SWARM_REVIEW_PLAN_KIND;
  version: typeof FRONTIER_SWARM_REVIEW_PLAN_VERSION;
  id: string;
  planId: string;
  generatedAt: number;
  assignments: FrontierSwarmReviewAssignment[];
  summary: {
    assignmentCount: number;
    requiredCount: number;
    sampledCount: number;
  };
}

export interface FrontierSwarmReviewAssignment {
  jobId: string;
  taskId: string;
  reviewers: string[];
  required: boolean;
  reason: 'always-review' | 'sampled' | 'violations' | 'failed' | 'budget';
}

export interface FrontierSwarmMergePlan {
  kind: typeof FRONTIER_SWARM_MERGE_PLAN_KIND;
  version: typeof FRONTIER_SWARM_MERGE_PLAN_VERSION;
  id: string;
  planId: string;
  generatedAt: number;
  ready: string[];
  blocked: FrontierSwarmMergeBlocker[];
  groups: FrontierSwarmMergeGroup[];
  summary: {
    readyCount: number;
    blockedCount: number;
    groupCount: number;
  };
}

export interface FrontierSwarmMergeBlocker {
  jobId: string;
  reasons: string[];
  conflictingJobIds: string[];
}

export interface FrontierSwarmMergeGroup {
  id: string;
  jobIds: string[];
  changedPaths: string[];
}

export interface FrontierSwarmDecomposeInput {
  featureId: string;
  objective: string;
  lanes: readonly string[];
  files?: readonly string[];
  checks?: readonly (string | FrontierSwarmCommandInput)[];
  reviewers?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmRunInput {
  id?: string;
  plan: FrontierSwarmPlan;
  startedAt?: number;
  status?: FrontierSwarmJobStatus;
  events?: readonly FrontierSwarmEventInput[];
  results?: readonly FrontierSwarmJobResultInput[];
  metadata?: unknown;
}

export interface FrontierSwarmRun {
  kind: typeof FRONTIER_SWARM_RUN_KIND;
  version: typeof FRONTIER_SWARM_RUN_VERSION;
  id: string;
  planId: string;
  manifestId: string;
  startedAt: number;
  finishedAt?: number;
  status: FrontierSwarmJobStatus;
  jobs: FrontierSwarmJob[];
  events: FrontierSwarmEvent[];
  results: FrontierSwarmJobResult[];
  summary: FrontierSwarmSummary;
  metadata?: JsonObject;
}

export interface FrontierSwarmEventInput {
  id?: string;
  type: string;
  runId?: string;
  jobId?: string;
  taskId?: string;
  lane?: string;
  layer?: string;
  compute?: string;
  at?: number;
  message?: string;
  data?: unknown;
  metadata?: unknown;
}

export interface FrontierSwarmEvent {
  kind: typeof FRONTIER_SWARM_EVENT_KIND;
  version: typeof FRONTIER_SWARM_EVENT_VERSION;
  id: string;
  type: string;
  runId?: string;
  jobId?: string;
  taskId?: string;
  lane?: string;
  layer?: string;
  compute?: string;
  at: number;
  message?: string;
  data?: JsonValue;
  metadata?: JsonObject;
}

export interface FrontierSwarmJobResultInput {
  jobId: string;
  status?: FrontierSwarmJobStatus;
  startedAt?: number;
  finishedAt?: number;
  exitCode?: number;
  signal?: string;
  changedPaths?: readonly string[];
  ownershipViolations?: readonly string[];
  evidencePaths?: readonly string[];
  verification?: readonly FrontierSwarmVerificationResultInput[];
  lastMessage?: string;
  error?: unknown;
  metadata?: unknown;
}

export interface FrontierSwarmVerificationResultInput {
  name?: string;
  command?: readonly string[];
  status?: number;
  durationMs?: number;
  stdoutTail?: readonly string[];
  stderrTail?: readonly string[];
  required?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmVerificationResult {
  name: string;
  command: string[];
  status?: number;
  durationMs?: number;
  stdoutTail: string[];
  stderrTail: string[];
  required: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmJobResult {
  jobId: string;
  status: FrontierSwarmJobStatus;
  startedAt?: number;
  finishedAt?: number;
  durationMs?: number;
  exitCode?: number;
  signal?: string;
  changedPaths: string[];
  ownershipViolations: string[];
  evidencePaths: string[];
  verification: FrontierSwarmVerificationResult[];
  lastMessage?: string;
  error?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmOwnershipReport {
  ok: boolean;
  changedPaths: string[];
  allowedWrites: string[];
  violations: string[];
}

export interface FrontierSwarmProof {
  kind: typeof FRONTIER_SWARM_PROOF_KIND;
  version: typeof FRONTIER_SWARM_PROOF_VERSION;
  id: string;
  manifestId: string;
  generatedAt: number;
  hash: string;
  summary: FrontierSwarmSummary;
  validation?: FrontierSwarmValidation;
  metadata?: JsonObject;
}

const DEFAULT_COMPLETED_STATUSES = ['completed', 'verified', 'done', 'verified-local-harness'];

export function defineSwarmManifest(input: FrontierSwarmManifestInput = {}): FrontierSwarmManifest {
  return createSwarmManifest(input);
}

export function createSwarmManifest(input: FrontierSwarmManifestInput = {}): FrontierSwarmManifest {
  const compute = normalizeComputeList(input.compute);
  const defaultCompute = input.policy?.defaultCompute ?? compute[0]?.id ?? FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID;
  const layers = (input.layers ?? []).map(normalizeLayer);
  const lanes = (input.lanes ?? []).map(normalizeLane);
  const policy = normalizePolicy(input.policy, defaultCompute);
  return {
    kind: FRONTIER_SWARM_MANIFEST_KIND,
    version: FRONTIER_SWARM_MANIFEST_VERSION,
    id: normalizeId(input.id ?? 'frontier-swarm', 'manifest id'),
    title: input.title ?? titleFromId(input.id ?? 'frontier swarm'),
    ...(input.description ? { description: input.description } : {}),
    ...(input.package ? { package: input.package } : {}),
    ...(input.feature ? { feature: input.feature } : {}),
    ...(input.owner ? { owner: input.owner } : {}),
    compute,
    layers,
    lanes,
    policy,
    resources: uniqueStrings(input.resources ?? []),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {}),
    summary: {
      computeCount: compute.length,
      layerCount: layers.length,
      laneCount: lanes.length
    }
  };
}

export function defineSwarmTasks(input: readonly FrontierSwarmTaskInput[] | FrontierSwarmTaskSetInput = []): FrontierSwarmTask[] {
  const raw = Array.isArray(input) ? input : ((input as FrontierSwarmTaskSetInput).tasks ?? (input as FrontierSwarmTaskSetInput).items ?? []);
  return raw.map(normalizeTask);
}

export function compileSwarm(input: FrontierSwarmManifest | FrontierSwarmManifestInput): FrontierSwarmCompiled {
  const manifest = isSwarmManifest(input) ? cloneJsonValue(input) as FrontierSwarmManifest : createSwarmManifest(input);
  const computeById = new Map(manifest.compute.map((compute) => [compute.id, compute]));
  const layersById = new Map(manifest.layers.map((layer) => [layer.id, layer]));
  const lanesById = new Map(manifest.lanes.map((lane) => [lane.id, lane]));
  return {
    manifest,
    computeById,
    layersById,
    lanesById,
    validation: validateSwarmManifest(manifest)
  };
}

export function validateSwarmManifest(input: FrontierSwarmManifest | FrontierSwarmManifestInput): FrontierSwarmValidation {
  const manifest = isSwarmManifest(input) ? input : createSwarmManifest(input);
  const issues: FrontierSwarmValidationIssue[] = [];
  const computeIds = new Set<string>();
  const layerIds = new Set<string>();
  const laneIds = new Set<string>();

  for (const compute of manifest.compute) {
    if (computeIds.has(compute.id)) addIssue(issues, 'duplicate-compute', 'error', `compute.${compute.id}`, `Duplicate compute id: ${compute.id}`);
    computeIds.add(compute.id);
  }
  if (!computeIds.has(manifest.policy.defaultCompute)) {
    addIssue(issues, 'missing-default-compute', 'error', 'policy.defaultCompute', `Default compute is not declared: ${manifest.policy.defaultCompute}`);
  }

  for (const layer of manifest.layers) {
    if (layerIds.has(layer.id)) addIssue(issues, 'duplicate-layer', 'error', `layers.${layer.id}`, `Duplicate layer id: ${layer.id}`);
    layerIds.add(layer.id);
  }
  for (const layer of manifest.layers) {
    if (layer.parentId && !layerIds.has(layer.parentId)) {
      addIssue(issues, 'missing-parent-layer', 'error', `layers.${layer.id}.parentId`, `Layer parent is not declared: ${layer.parentId}`);
    }
    for (const [childLayer, compute] of Object.entries(layer.childCompute)) {
      if (childLayer !== '*' && !layerIds.has(childLayer)) {
        addIssue(issues, 'missing-child-layer', 'error', `layers.${layer.id}.childCompute.${childLayer}`, `Child layer is not declared: ${childLayer}`);
      }
      if (!computeIds.has(compute)) {
        addIssue(issues, 'missing-child-compute', 'error', `layers.${layer.id}.childCompute.${childLayer}`, `Child compute is not declared: ${compute}`);
      }
    }
    for (const field of ['compute', 'defaultCompute'] as const) {
      const compute = layer[field];
      if (compute && !computeIds.has(compute)) {
        addIssue(issues, 'missing-layer-compute', 'error', `layers.${layer.id}.${field}`, `Layer compute is not declared: ${compute}`);
      }
    }
    if (hasLayerCycle(layer.id, manifest.layers)) {
      addIssue(issues, 'layer-cycle', 'error', `layers.${layer.id}`, `Layer parent chain contains a cycle at ${layer.id}`);
    }
  }

  for (const lane of manifest.lanes) {
    if (laneIds.has(lane.id)) addIssue(issues, 'duplicate-lane', 'error', `lanes.${lane.id}`, `Duplicate lane id: ${lane.id}`);
    laneIds.add(lane.id);
    if (lane.layer && !layerIds.has(lane.layer)) {
      addIssue(issues, 'missing-lane-layer', 'error', `lanes.${lane.id}.layer`, `Lane layer is not declared: ${lane.layer}`);
    }
    if (lane.compute && !computeIds.has(lane.compute)) {
      addIssue(issues, 'missing-lane-compute', 'error', `lanes.${lane.id}.compute`, `Lane compute is not declared: ${lane.compute}`);
    }
  }

  return { valid: issues.every((issue) => issue.severity !== 'error'), issues };
}

export function createSwarmPlan(
  manifestInput: FrontierSwarmManifest | FrontierSwarmManifestInput,
  taskInput: readonly FrontierSwarmTaskInput[] | FrontierSwarmTaskSetInput | readonly FrontierSwarmTask[],
  options: FrontierSwarmPlanInput = {}
): FrontierSwarmPlan {
  const compiled = compileSwarm(manifestInput);
  const tasks = normalizeTaskList(taskInput);
  const jobs = selectSwarmTasks(compiled.manifest, tasks, options).map((task) => createJob(compiled, task, options));
  const id = options.id ?? 'swarm-plan:' + stableHash([compiled.manifest.id, jobs.map((job) => job.id), options]);
  const graph = createSwarmJobGraph(jobs);
  const validation = validateTasksForManifest(compiled, tasks, graph);
  return {
    kind: FRONTIER_SWARM_PLAN_KIND,
    version: FRONTIER_SWARM_PLAN_VERSION,
    id,
    runId: options.runId ?? id.replace(/^swarm-plan:/, 'swarm-run:'),
    manifestId: compiled.manifest.id,
    createdAt: options.now ?? Date.now(),
    filters: {
      lanes: options.lanes ? [...options.lanes] : undefined,
      layers: options.layers ? [...options.layers] : undefined,
      statuses: options.statuses ? [...options.statuses] : undefined,
      selectors: options.selectors ? [...options.selectors] : undefined,
      includeCompleted: options.includeCompleted,
      limit: options.limit,
      compute: options.compute
    },
    limits: normalizeScheduleLimits(compiled.manifest, options),
    validation,
    jobs,
    graph,
    summary: summarizeJobs(jobs),
    ...(toJsonObject(options.metadata) ? { metadata: toJsonObject(options.metadata) } : {})
  };
}

export function createSwarmRun(input: FrontierSwarmRunInput): FrontierSwarmRun {
  const results = (input.results ?? []).map(normalizeResult);
  const events = (input.events ?? []).map((event) => normalizeEvent({ ...event, runId: event.runId ?? input.id ?? input.plan.runId }));
  const run: FrontierSwarmRun = {
    kind: FRONTIER_SWARM_RUN_KIND,
    version: FRONTIER_SWARM_RUN_VERSION,
    id: input.id ?? input.plan.runId,
    planId: input.plan.id,
    manifestId: input.plan.manifestId,
    startedAt: input.startedAt ?? Date.now(),
    status: input.status ?? 'planned',
    jobs: input.plan.jobs.map((job) => cloneJsonValue(job) as FrontierSwarmJob),
    events,
    results,
    summary: summarizeRun(input.plan.jobs, results),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
  return run;
}

export function recordSwarmEvent(runInput: FrontierSwarmRun, eventInput: FrontierSwarmEventInput): FrontierSwarmRun {
  const run = cloneJsonValue(runInput) as FrontierSwarmRun;
  run.events = run.events.concat(normalizeEvent({ ...eventInput, runId: eventInput.runId ?? run.id }));
  return run;
}

export function completeSwarmJob(runInput: FrontierSwarmRun, resultInput: FrontierSwarmJobResultInput): FrontierSwarmRun {
  const run = cloneJsonValue(runInput) as FrontierSwarmRun;
  const result = normalizeResult(resultInput);
  const resultIndex = run.results.findIndex((entry) => entry.jobId === result.jobId);
  if (resultIndex >= 0) run.results[resultIndex] = result;
  else run.results.push(result);
  run.jobs = run.jobs.map((job) => job.id === result.jobId ? { ...job, status: result.status } : job);
  run.summary = summarizeRun(run.jobs, run.results);
  if (run.results.length >= run.jobs.length && run.summary.failedCount === 0 && run.summary.blockedCount === 0) {
    run.status = 'completed';
    run.finishedAt = result.finishedAt ?? Date.now();
  } else if (run.summary.failedCount && run.summary.failedCount > 0) {
    run.status = 'failed';
  }
  return run;
}

export function checkSwarmOwnership(job: FrontierSwarmJob, changedPaths: readonly string[]): FrontierSwarmOwnershipReport {
  const changed = uniqueStrings(changedPaths);
  const violations = changed.filter((file) => !job.allowedWrites.some((glob) => matchesGlob(file, glob)));
  return {
    ok: violations.length === 0,
    changedPaths: changed,
    allowedWrites: [...job.allowedWrites],
    violations
  };
}

export function resolveSwarmCompute(
  manifestInput: FrontierSwarmManifest | FrontierSwarmManifestInput,
  taskInput: FrontierSwarmTask | FrontierSwarmTaskInput
): FrontierSwarmCompute {
  const compiled = compileSwarm(manifestInput);
  const task = isSwarmTask(taskInput) ? taskInput : normalizeTask(taskInput);
  return resolveTaskCompute(compiled, task);
}

export function createSwarmProof(
  input: FrontierSwarmManifest | FrontierSwarmPlan | FrontierSwarmRun,
  options: { generatedAt?: number; validation?: FrontierSwarmValidation; metadata?: unknown } = {}
): FrontierSwarmProof {
  const manifestId = 'manifestId' in input ? input.manifestId : input.id;
  const summary = input.summary;
  const generatedAt = options.generatedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_PROOF_KIND,
    version: FRONTIER_SWARM_PROOF_VERSION,
    id: 'swarm-proof:' + stableHash([manifestId, summary, generatedAt]),
    manifestId,
    generatedAt,
    hash: stableHash([input, options.validation, options.metadata]),
    summary,
    ...(options.validation ? { validation: options.validation } : {}),
    ...(toJsonObject(options.metadata) ? { metadata: toJsonObject(options.metadata) } : {})
  };
}

export function createSwarmSchedule(input: FrontierSwarmPlan | FrontierSwarmScheduleInput): FrontierSwarmSchedule {
  const plan = 'plan' in input ? input.plan : input;
  const run = 'plan' in input ? input.run : undefined;
  const createdAt = 'plan' in input ? input.now ?? Date.now() : Date.now();
  const limits = mergeScheduleLimits(plan.limits, 'plan' in input ? input : {});
  const resultsByJob = new Map((run?.results ?? []).map((result) => [result.jobId, result]));
  const completed = new Set<string>();
  const failed = new Set<string>();
  for (const result of resultsByJob.values()) {
    if (result.status === 'completed' || result.status === 'verified') completed.add(result.jobId);
    if (result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0) failed.add(result.jobId);
  }
  const runningJobs = (run?.jobs ?? plan.jobs)
    .filter((job) => job.status === 'running')
    .map((job) => ({ jobId: job.id, lane: job.lane, compute: job.compute.id, concurrencyKey: job.concurrencyKey }));
  const runningByLane = countBy(runningJobs.map((job) => job.lane));
  const runningByKey = countBy(runningJobs.map((job) => job.concurrencyKey));
  const runningByCompute = countBy(runningJobs.map((job) => job.compute));
  const ready: FrontierSwarmScheduledJob[] = [];
  const blocked: FrontierSwarmBlockedJob[] = [];
  const sortedJobs = [...plan.jobs].sort((left, right) => left.priority - right.priority || left.id.localeCompare(right.id));
  for (const job of sortedJobs) {
    if (completed.has(job.id) || failed.has(job.id) || runningJobs.some((running) => running.jobId === job.id)) continue;
    const dependencyIds = plan.graph.dependenciesByJobId[job.id] ?? [];
    const waitingFor = dependencyIds.filter((dep) => !completed.has(dep));
    const reasons: string[] = [];
    if (waitingFor.length) reasons.push('waiting-for-dependencies');
    const laneMax = limits.maxLaneConcurrency[job.lane] ?? Number.POSITIVE_INFINITY;
    const keyMax = limits.maxConcurrencyKeyConcurrency[job.concurrencyKey] ?? Number.POSITIVE_INFINITY;
    const computeMax = limits.maxComputeConcurrency[job.compute.id] ?? job.compute.maxConcurrency ?? Number.POSITIVE_INFINITY;
    if ((runningByLane[job.lane] ?? 0) >= laneMax) reasons.push('lane-capacity');
    if ((runningByKey[job.concurrencyKey] ?? 0) >= keyMax) reasons.push('concurrency-key-capacity');
    if ((runningByCompute[job.compute.id] ?? 0) >= computeMax) reasons.push('compute-capacity');
    const scheduled = scheduleJob(job, dependencyIds);
    if (reasons.length) {
      blocked.push({ ...scheduled, reasons, waitingFor });
      continue;
    }
    if (limits.maxReadyJobs !== undefined && ready.length >= limits.maxReadyJobs) {
      blocked.push({ ...scheduled, reasons: ['ready-capacity'], waitingFor: [] });
      continue;
    }
    ready.push(scheduled);
    runningByLane[job.lane] = (runningByLane[job.lane] ?? 0) + 1;
    runningByKey[job.concurrencyKey] = (runningByKey[job.concurrencyKey] ?? 0) + 1;
    runningByCompute[job.compute.id] = (runningByCompute[job.compute.id] ?? 0) + 1;
  }
  return {
    kind: FRONTIER_SWARM_SCHEDULE_KIND,
    version: FRONTIER_SWARM_SCHEDULE_VERSION,
    id: 'swarm-schedule:' + stableHash([plan.id, run?.id, ready.map((job) => job.jobId), blocked.map((job) => [job.jobId, job.reasons]), createdAt]),
    planId: plan.id,
    ...(run ? { runId: run.id } : {}),
    createdAt,
    ready,
    blocked,
    running: runningJobs,
    completed: Array.from(completed).sort(),
    failed: Array.from(failed).sort(),
    summary: {
      jobCount: plan.jobs.length,
      readyCount: ready.length,
      blockedCount: blocked.length,
      runningCount: runningJobs.length,
      completedCount: completed.size,
      failedCount: failed.size
    }
  };
}

export function createSwarmLeases(input: FrontierSwarmLeaseInput): FrontierSwarmLease[] {
  const now = input.now ?? Date.now();
  const leaseMs = Math.max(1, Math.floor(input.leaseMs ?? 900000));
  const activeJobIds = new Set((input.existingLeases ?? []).filter((lease) => lease.status === 'active' && lease.expiresAt > now).map((lease) => lease.jobId));
  const existingMaxFence = Math.max(0, ...(input.existingLeases ?? []).map((lease) => lease.fencingToken));
  const count = Math.max(0, Math.floor(input.count ?? input.schedule.ready.length));
  return input.schedule.ready
    .filter((job) => !activeJobIds.has(job.jobId))
    .slice(0, count)
    .map((job, index) => ({
      kind: FRONTIER_SWARM_LEASE_KIND,
      version: FRONTIER_SWARM_LEASE_VERSION,
      id: 'swarm-lease:' + stableHash([input.schedule.id, job.jobId, input.workerId, now, existingMaxFence + index + 1]),
      jobId: job.jobId,
      workerId: input.workerId,
      token: stableHash([job.jobId, input.workerId, now, existingMaxFence + index + 1]),
      leasedAt: now,
      expiresAt: now + leaseMs,
      fencingToken: existingMaxFence + index + 1,
      status: 'active'
    }));
}

export function checkSwarmBudget(job: FrontierSwarmJob, usageInput: FrontierSwarmUsageInput): FrontierSwarmBudgetDecision {
  const usage = normalizeUsage(usageInput);
  const budget = job.budget;
  const violations: string[] = [];
  if (budget?.maxCostUsd !== undefined && usage.costUsd > budget.maxCostUsd) violations.push('max-cost-usd');
  if (budget?.maxInputTokens !== undefined && usage.inputTokens > budget.maxInputTokens) violations.push('max-input-tokens');
  if (budget?.maxOutputTokens !== undefined && usage.outputTokens > budget.maxOutputTokens) violations.push('max-output-tokens');
  if (budget?.maxDurationMs !== undefined && usage.durationMs > budget.maxDurationMs) violations.push('max-duration-ms');
  if (budget && usage.attempts > budget.maxRetries + 1) violations.push('max-retries');
  return { ok: violations.length === 0, jobId: job.id, usage, ...(budget ? { budget } : {}), violations };
}

export function createSwarmArtifactIndex(input: FrontierSwarmRun | { run?: FrontierSwarmRun; artifacts?: readonly FrontierSwarmArtifactInput[]; generatedAt?: number }): FrontierSwarmArtifactIndex {
  const run = 'kind' in input ? input : input.run;
  const generatedAt = 'kind' in input ? Date.now() : input.generatedAt ?? Date.now();
  const explicit = 'kind' in input ? [] : input.artifacts ?? [];
  const artifacts = [
    ...(run?.results ?? []).flatMap((result) => result.evidencePaths.map((evidencePath) => normalizeArtifact({ jobId: result.jobId, path: evidencePath, kind: 'evidence' }))),
    ...explicit.map(normalizeArtifact)
  ].sort((left, right) => left.jobId.localeCompare(right.jobId) || left.path.localeCompare(right.path));
  const byJobId = groupArtifacts(artifacts, (artifact) => artifact.jobId);
  const byKind = groupArtifacts(artifacts, (artifact) => artifact.kind);
  return {
    kind: FRONTIER_SWARM_ARTIFACT_INDEX_KIND,
    version: FRONTIER_SWARM_ARTIFACT_INDEX_VERSION,
    id: 'swarm-artifact-index:' + stableHash([artifacts, generatedAt]),
    generatedAt,
    artifacts,
    byJobId,
    byKind,
    summary: {
      artifactCount: artifacts.length,
      jobCount: Object.keys(byJobId).length,
      kindCount: Object.keys(byKind).length,
      totalBytes: artifacts.reduce((total, artifact) => total + (artifact.bytes ?? 0), 0)
    }
  };
}

export function createSwarmReviewPlan(input: FrontierSwarmReviewPlanInput): FrontierSwarmReviewPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const resultsByJob = new Map((input.run?.results ?? []).map((result) => [result.jobId, result]));
  const budgetsByJob = new Map((input.budgetDecisions ?? []).map((decision) => [decision.jobId, decision]));
  const assignments: FrontierSwarmReviewAssignment[] = [];
  for (const job of input.plan.jobs) {
    const result = resultsByJob.get(job.id);
    const budget = budgetsByJob.get(job.id);
    const reason = reviewReason(job, result, budget, input.sampleSalt ?? input.plan.id);
    if (!reason) continue;
    const pool = job.review.reviewerPool.length ? job.review.reviewerPool : [...(input.reviewers ?? [])];
    assignments.push({
      jobId: job.id,
      taskId: job.taskId,
      reviewers: selectReviewers(pool, job.review.requiredReviewers, job.id),
      required: job.review.alwaysReview || reason === 'violations' || reason === 'failed' || reason === 'budget',
      reason
    });
  }
  return {
    kind: FRONTIER_SWARM_REVIEW_PLAN_KIND,
    version: FRONTIER_SWARM_REVIEW_PLAN_VERSION,
    id: 'swarm-review-plan:' + stableHash([input.plan.id, assignments, generatedAt]),
    planId: input.plan.id,
    generatedAt,
    assignments,
    summary: {
      assignmentCount: assignments.length,
      requiredCount: assignments.filter((assignment) => assignment.required).length,
      sampledCount: assignments.filter((assignment) => assignment.reason === 'sampled').length
    }
  };
}

export function createSwarmMergePlan(input: FrontierSwarmMergePlanInput): FrontierSwarmMergePlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const resultsByJob = new Map(input.run.results.map((result) => [result.jobId, result]));
  const reviewRequired = new Set((input.reviewPlan?.assignments ?? []).filter((assignment) => assignment.required).map((assignment) => assignment.jobId));
  const conflicts = conflictMap(input.run.results);
  const ready: string[] = [];
  const blocked: FrontierSwarmMergeBlocker[] = [];
  for (const job of input.plan.jobs) {
    const result = resultsByJob.get(job.id);
    const reasons: string[] = [];
    if (!result || result.status !== 'completed' && result.status !== 'verified') reasons.push('not-completed');
    if (result?.ownershipViolations.length) reasons.push('ownership-violations');
    if (reviewRequired.has(job.id)) reasons.push('review-required');
    const conflictingJobIds = Array.from(conflicts.get(job.id) ?? []).sort();
    if (conflictingJobIds.length) reasons.push('conflicting-changes');
    if (reasons.length) blocked.push({ jobId: job.id, reasons: uniqueStrings(reasons), conflictingJobIds });
    else ready.push(job.id);
  }
  const groups = groupMergeReadyJobs(ready, input.run.results);
  return {
    kind: FRONTIER_SWARM_MERGE_PLAN_KIND,
    version: FRONTIER_SWARM_MERGE_PLAN_VERSION,
    id: 'swarm-merge-plan:' + stableHash([input.plan.id, ready, blocked, generatedAt]),
    planId: input.plan.id,
    generatedAt,
    ready,
    blocked,
    groups,
    summary: { readyCount: ready.length, blockedCount: blocked.length, groupCount: groups.length }
  };
}

export function decomposeSwarmFeature(input: FrontierSwarmDecomposeInput): FrontierSwarmTaskInput[] {
  const filesByLane = new Map<string, string[]>();
  const lanes = input.lanes.length ? [...input.lanes] : ['implementation'];
  for (const lane of lanes) filesByLane.set(lane, []);
  for (const file of input.files ?? []) {
    const selected = lanes.find((lane) => file.toLowerCase().includes(lane.toLowerCase())) ?? lanes[filesByLane.size ? stableHash(file).charCodeAt(10) % lanes.length : 0];
    filesByLane.get(selected)?.push(file);
  }
  return lanes.map((lane, index) => ({
    id: `${input.featureId}-${slug(lane)}`,
    lane,
    title: `${titleFromId(lane)} for ${input.featureId}`,
    objective: input.objective,
    priority: 100 + index,
    targetRefs: filesByLane.get(lane) ?? [],
    verification: input.checks ?? [],
    review: input.reviewers?.length ? { requiredReviewers: 1, reviewerPool: input.reviewers } : undefined,
    metadata: toJsonObject(input.metadata)
  }));
}

export function encodeSwarmJsonl(records: readonly unknown[]): string {
  return records.map((record) => JSON.stringify(record)).join('\n') + (records.length ? '\n' : '');
}

export function decodeSwarmJsonl(jsonl: string): JsonValue[] {
  return jsonl.split(/\r?\n/).filter((line) => line.trim().length > 0).map((line) => JSON.parse(line) as JsonValue);
}

export function matchesGlob(file: string, glob: string): boolean {
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '\u0000')
    .replace(/\*/g, '[^/]*')
    .replace(/\u0000/g, '.*');
  return new RegExp('^' + escaped + '$').test(file);
}

function createSwarmJobGraph(jobs: readonly FrontierSwarmJob[]): FrontierSwarmJobGraph {
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

function normalizeScheduleLimits(manifest: FrontierSwarmManifest, options: FrontierSwarmPlanInput): FrontierSwarmScheduleLimits {
  const maxLaneConcurrency: Record<string, number> = {};
  for (const lane of manifest.lanes) {
    const value = options.maxLaneConcurrency?.[lane.id] ?? lane.maxConcurrency ?? manifest.policy.defaultConcurrency;
    maxLaneConcurrency[lane.id] = Math.max(1, Math.floor(value));
  }
  return {
    ...(positiveNumber(options.maxReadyJobs) ? { maxReadyJobs: Math.floor(options.maxReadyJobs as number) } : {}),
    maxLaneConcurrency: { ...maxLaneConcurrency, ...(options.maxLaneConcurrency ?? {}) },
    maxConcurrencyKeyConcurrency: { ...(options.maxConcurrencyKeyConcurrency ?? {}) },
    maxComputeConcurrency: { ...(options.maxComputeConcurrency ?? {}) }
  };
}

function mergeScheduleLimits(base: FrontierSwarmScheduleLimits, override: Partial<FrontierSwarmScheduleInput>): FrontierSwarmScheduleLimits {
  return {
    maxReadyJobs: positiveNumber(override.maxReadyJobs) ? Math.floor(override.maxReadyJobs as number) : base.maxReadyJobs,
    maxLaneConcurrency: { ...base.maxLaneConcurrency, ...(override.maxLaneConcurrency ?? {}) },
    maxConcurrencyKeyConcurrency: { ...base.maxConcurrencyKeyConcurrency, ...(override.maxConcurrencyKeyConcurrency ?? {}) },
    maxComputeConcurrency: { ...base.maxComputeConcurrency, ...(override.maxComputeConcurrency ?? {}) }
  };
}

function scheduleJob(job: FrontierSwarmJob, dependsOn: readonly string[] = job.dependsOn): FrontierSwarmScheduledJob {
  return {
    jobId: job.id,
    taskId: job.taskId,
    lane: job.lane,
    compute: job.compute.id,
    concurrencyKey: job.concurrencyKey,
    priority: job.priority,
    dependsOn: [...dependsOn]
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

function normalizeUsage(input: FrontierSwarmUsageInput): FrontierSwarmUsage {
  return {
    costUsd: Math.max(0, input.costUsd ?? 0),
    inputTokens: Math.max(0, Math.floor(input.inputTokens ?? 0)),
    outputTokens: Math.max(0, Math.floor(input.outputTokens ?? 0)),
    durationMs: Math.max(0, Math.floor(input.durationMs ?? 0)),
    attempts: Math.max(1, Math.floor(input.attempts ?? 1)),
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

function normalizeArtifact(input: FrontierSwarmArtifactInput): FrontierSwarmArtifact {
  return {
    jobId: normalizeId(input.jobId, 'artifact job id'),
    path: normalizeId(input.path, 'artifact path'),
    kind: input.kind ?? 'artifact',
    ...(positiveNumber(input.bytes) ? { bytes: Math.floor(input.bytes as number) } : {}),
    ...(input.hash ? { hash: input.hash } : {}),
    ...(input.producedAt !== undefined ? { producedAt: input.producedAt } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function reviewReason(
  job: FrontierSwarmJob,
  result: FrontierSwarmJobResult | undefined,
  budget: FrontierSwarmBudgetDecision | undefined,
  sampleSalt: string
): FrontierSwarmReviewAssignment['reason'] | undefined {
  if (result?.ownershipViolations.length) return 'violations';
  if (result?.status === 'failed' || result?.exitCode !== undefined && result.exitCode !== 0) return 'failed';
  if (budget && !budget.ok) return 'budget';
  if (job.review.alwaysReview) return 'always-review';
  if (job.review.sampleRate > 0 && deterministicUnitInterval([sampleSalt, job.id]) < job.review.sampleRate) return 'sampled';
  return undefined;
}

function selectReviewers(pool: readonly string[], required: number, salt: string): string[] {
  if (required <= 0 || pool.length === 0) return [];
  const sorted = [...uniqueStrings(pool)].sort((left, right) => stableHash([salt, left]).localeCompare(stableHash([salt, right])));
  return sorted.slice(0, Math.min(required, sorted.length));
}

function conflictMap(results: readonly FrontierSwarmJobResult[]): Map<string, Set<string>> {
  const byPath = new Map<string, string[]>();
  for (const result of results) {
    for (const file of result.changedPaths) {
      const list = byPath.get(file) ?? [];
      list.push(result.jobId);
      byPath.set(file, list);
    }
  }
  const conflicts = new Map<string, Set<string>>();
  for (const jobIds of byPath.values()) {
    if (jobIds.length < 2) continue;
    for (const jobId of jobIds) {
      const set = conflicts.get(jobId) ?? new Set<string>();
      for (const other of jobIds) {
        if (other !== jobId) set.add(other);
      }
      conflicts.set(jobId, set);
    }
  }
  return conflicts;
}

function groupMergeReadyJobs(ready: readonly string[], results: readonly FrontierSwarmJobResult[]): FrontierSwarmMergeGroup[] {
  const byJob = new Map(results.map((result) => [result.jobId, result]));
  return ready.map((jobId) => {
    const changedPaths = [...(byJob.get(jobId)?.changedPaths ?? [])].sort();
    return {
      id: 'merge-group:' + stableHash([jobId, changedPaths]),
      jobIds: [jobId],
      changedPaths
    };
  });
}

function groupArtifacts(artifacts: readonly FrontierSwarmArtifact[], key: (artifact: FrontierSwarmArtifact) => string): Record<string, FrontierSwarmArtifact[]> {
  const out: Record<string, FrontierSwarmArtifact[]> = {};
  for (const artifact of artifacts) {
    const group = key(artifact);
    out[group] = [...(out[group] ?? []), artifact];
  }
  return out;
}

function countBy(values: readonly string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const value of values) out[value] = (out[value] ?? 0) + 1;
  return out;
}

function hasJobDependencyCycle(start: string, dependenciesByJobId: Record<string, string[]>): boolean {
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (node: string): boolean => {
    if (visiting.has(node)) return true;
    if (visited.has(node)) return false;
    visiting.add(node);
    for (const dep of dependenciesByJobId[node] ?? []) {
      if (visit(dep)) return true;
    }
    visiting.delete(node);
    visited.add(node);
    return false;
  };
  return visit(start);
}

function deterministicUnitInterval(value: unknown): number {
  const hex = stableHash(value).split(':')[1] ?? '0';
  return parseInt(hex, 16) / 0xffffffff;
}

function normalizeComputeList(input: readonly FrontierSwarmComputeInput[] | undefined): FrontierSwarmCompute[] {
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

function normalizeLayer(input: FrontierSwarmLayerInput): FrontierSwarmLayer {
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

function normalizeLane(input: FrontierSwarmLaneInput): FrontierSwarmLane {
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
    ...(input.worktreePath ? { worktreePath: input.worktreePath } : {}),
    ...(input.evidencePrefix || input.evidenceOutDirPrefix ? { evidencePrefix: input.evidencePrefix ?? input.evidenceOutDirPrefix } : {}),
    concurrencyKey: input.concurrencyKey ?? input.id,
    ...(positiveNumber(input.maxConcurrency) ? { maxConcurrency: Math.floor(input.maxConcurrency as number) } : {}),
    handoffCommands: normalizeCommands(input.handoffCommands ?? []),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizePolicy(input: FrontierSwarmPolicyInput | undefined, defaultCompute: string): FrontierSwarmPolicy {
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

function normalizeTask(input: FrontierSwarmTaskInput): FrontierSwarmTask {
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
    acceptance: normalizeAcceptance(input),
    verification: normalizeCommands(input.verification ?? []),
    ...(input.evidenceCommand ? { evidenceCommand: input.evidenceCommand } : {}),
    ...(input.shardCommand ? { shardCommand: input.shardCommand } : {}),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeTaskList(input: readonly FrontierSwarmTaskInput[] | FrontierSwarmTaskSetInput | readonly FrontierSwarmTask[]): FrontierSwarmTask[] {
  if (Array.isArray(input)) return input.map((task) => isSwarmTask(task) ? cloneJsonValue(task) as FrontierSwarmTask : normalizeTask(task as FrontierSwarmTaskInput));
  return defineSwarmTasks(input);
}

function normalizeAcceptance(input: FrontierSwarmTaskInput): string[] {
  const checks = (input.acceptanceChecks ?? []).map((check) => typeof check === 'string' ? check : check.description ?? check.id ?? '').filter(Boolean);
  return uniqueStrings([...(input.acceptance ?? []), ...checks]);
}

function normalizeCommands(input: readonly (string | FrontierSwarmCommandInput)[]): FrontierSwarmCommand[] {
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

function selectSwarmTasks(manifest: FrontierSwarmManifest, tasks: readonly FrontierSwarmTask[], options: FrontierSwarmPlanFilter): FrontierSwarmTask[] {
  const lanes = new Set(options.lanes ?? []);
  const layers = new Set(options.layers ?? []);
  const statuses = new Set(options.statuses ?? []);
  const selectors = (options.selectors ?? []).map((selector) => selector.toLowerCase());
  const completed = new Set(manifest.policy.completedStatuses);
  const limit = options.limit === undefined ? tasks.length : Math.max(0, Math.floor(options.limit));
  return tasks
    .filter((task) => !task.lane || manifest.lanes.some((lane) => lane.id === task.lane))
    .filter((task) => lanes.size === 0 || (task.lane !== undefined && lanes.has(task.lane)))
    .filter((task) => layers.size === 0 || taskLayer(manifest, task) !== undefined && layers.has(taskLayer(manifest, task) as string))
    .filter((task) => statuses.size === 0 || statuses.has(task.status))
    .filter((task) => options.includeCompleted || !completed.has(task.status))
    .filter((task) => selectors.length === 0 || selectors.some((selector) => searchableTask(task).includes(selector)))
    .sort((left, right) => left.priority - right.priority || left.id.localeCompare(right.id))
    .slice(0, limit);
}

function createJob(compiled: FrontierSwarmCompiled, task: FrontierSwarmTask, options: FrontierSwarmPlanFilter): FrontierSwarmJob {
  const lane = task.lane ? compiled.lanesById.get(task.lane) : undefined;
  const layer = task.layer ?? lane?.layer ?? compiled.manifest.policy.defaultLayer;
  const compute = options.compute
    ? readCompute(compiled, options.compute)
    : resolveTaskCompute(compiled, task);
  const evidencePrefix = lane?.evidencePrefix ? lane.evidencePrefix.replace(/\/?$/, '/') + slug(task.id) + '/' : undefined;
  const allowedWrites = uniqueStrings([
    ...(lane?.allowedWrites ?? []),
    ...task.allowedWrites,
    ...(evidencePrefix ? [evidencePrefix + '**'] : [])
  ]);
  const ownershipWarnings = task.targetRefs
    .filter((file) => allowedWrites.length > 0 && !allowedWrites.some((glob) => matchesGlob(file, glob)))
    .map((file) => `${file} is outside allowed write globs for ${lane?.id ?? 'unassigned'}`);
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

function resolveJobDependencies(task: FrontierSwarmTask): string[] {
  return uniqueStrings([
    ...(task.parentTaskId ? [task.parentTaskId] : []),
    ...task.dependsOn
  ]);
}

function resolveTaskCompute(compiled: FrontierSwarmCompiled, task: FrontierSwarmTask): FrontierSwarmCompute {
  if (task.compute) return readCompute(compiled, task.compute);
  const lane = task.lane ? compiled.lanesById.get(task.lane) : undefined;
  if (lane?.compute) return readCompute(compiled, lane.compute);
  const layerId = task.layer ?? lane?.layer ?? compiled.manifest.policy.defaultLayer;
  const layered = layerId ? resolveLayerCompute(compiled, layerId) : undefined;
  return layered ?? readCompute(compiled, compiled.manifest.policy.defaultCompute);
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

function readCompute(compiled: FrontierSwarmCompiled, id: string): FrontierSwarmCompute {
  return compiled.computeById.get(id) ?? compiled.computeById.get(compiled.manifest.policy.defaultCompute) ?? compiled.manifest.compute[0];
}

function validateTasksForManifest(compiled: FrontierSwarmCompiled, tasks: readonly FrontierSwarmTask[], graph?: FrontierSwarmJobGraph): FrontierSwarmValidation {
  const issues = [...compiled.validation.issues, ...(graph?.issues ?? [])];
  const taskIds = new Set(tasks.map((task) => task.id));
  for (const task of tasks) {
    if (task.lane && !compiled.lanesById.has(task.lane)) {
      addIssue(issues, 'missing-task-lane', 'error', `tasks.${task.id}.lane`, `Task lane is not declared: ${task.lane}`);
    }
    if (task.layer && !compiled.layersById.has(task.layer)) {
      addIssue(issues, 'missing-task-layer', 'error', `tasks.${task.id}.layer`, `Task layer is not declared: ${task.layer}`);
    }
    if (task.compute && !compiled.computeById.has(task.compute)) {
      addIssue(issues, 'missing-task-compute', 'error', `tasks.${task.id}.compute`, `Task compute is not declared: ${task.compute}`);
    }
    for (const dependency of task.dependsOn) {
      if (!taskIds.has(dependency)) {
        addIssue(issues, 'missing-task-dependency', 'warning', `tasks.${task.id}.dependsOn`, `Task dependency is not declared in the task set: ${dependency}`);
      }
    }
    if (task.parentTaskId && !taskIds.has(task.parentTaskId)) {
      addIssue(issues, 'missing-parent-task', 'warning', `tasks.${task.id}.parentTaskId`, `Task parent is not declared in the task set: ${task.parentTaskId}`);
    }
  }
  return { valid: issues.every((issue) => issue.severity !== 'error'), issues };
}

function normalizeEvent(input: FrontierSwarmEventInput): FrontierSwarmEvent {
  const at = input.at ?? Date.now();
  return {
    kind: FRONTIER_SWARM_EVENT_KIND,
    version: FRONTIER_SWARM_EVENT_VERSION,
    id: input.id ?? 'swarm-event:' + stableHash([input.type, input.runId, input.jobId, at, input.data]),
    type: input.type,
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.taskId ? { taskId: input.taskId } : {}),
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.layer ? { layer: input.layer } : {}),
    ...(input.compute ? { compute: input.compute } : {}),
    at,
    ...(input.message ? { message: input.message } : {}),
    ...(input.data !== undefined ? { data: toJsonValue(input.data) } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeResult(input: FrontierSwarmJobResultInput): FrontierSwarmJobResult {
  const startedAt = input.startedAt;
  const finishedAt = input.finishedAt;
  return {
    jobId: input.jobId,
    status: input.status ?? (input.exitCode === 0 || input.exitCode === undefined ? 'completed' : 'failed'),
    ...(startedAt !== undefined ? { startedAt } : {}),
    ...(finishedAt !== undefined ? { finishedAt } : {}),
    ...(startedAt !== undefined && finishedAt !== undefined ? { durationMs: Math.max(0, finishedAt - startedAt) } : {}),
    ...(input.exitCode !== undefined ? { exitCode: input.exitCode } : {}),
    ...(input.signal ? { signal: input.signal } : {}),
    changedPaths: uniqueStrings(input.changedPaths ?? []),
    ownershipViolations: uniqueStrings(input.ownershipViolations ?? []),
    evidencePaths: uniqueStrings(input.evidencePaths ?? []),
    verification: (input.verification ?? []).map(normalizeVerificationResult),
    ...(input.lastMessage ? { lastMessage: input.lastMessage } : {}),
    ...(input.error !== undefined ? { error: stringifyError(input.error) } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeVerificationResult(input: FrontierSwarmVerificationResultInput): FrontierSwarmVerificationResult {
  return {
    name: input.name ?? ((input.command ?? []).join(' ') || 'verification'),
    command: [...(input.command ?? [])],
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.durationMs !== undefined ? { durationMs: input.durationMs } : {}),
    stdoutTail: [...(input.stdoutTail ?? [])],
    stderrTail: [...(input.stderrTail ?? [])],
    required: input.required ?? true,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function summarizeJobs(jobs: readonly FrontierSwarmJob[]): FrontierSwarmSummary {
  return {
    computeCount: new Set(jobs.map((job) => job.compute.id)).size,
    layerCount: new Set(jobs.map((job) => job.layer).filter((layer): layer is string => !!layer)).size,
    laneCount: new Set(jobs.map((job) => job.lane)).size,
    taskCount: jobs.length,
    jobCount: jobs.length,
    ownershipViolationCount: jobs.reduce((total, job) => total + job.ownershipWarnings.length, 0)
  };
}

function summarizeRun(jobs: readonly FrontierSwarmJob[], results: readonly FrontierSwarmJobResult[]): FrontierSwarmSummary {
  const ownershipViolationCount = results.reduce((total, result) => total + result.ownershipViolations.length, 0);
  return {
    ...summarizeJobs(jobs),
    completedCount: results.filter((result) => result.status === 'completed' || result.status === 'verified').length,
    blockedCount: results.filter((result) => result.status === 'blocked').length,
    failedCount: results.filter((result) => result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0).length,
    ownershipViolationCount
  };
}

function taskLayer(manifest: FrontierSwarmManifest, task: FrontierSwarmTask): string | undefined {
  if (task.layer) return task.layer;
  const lane = task.lane ? manifest.lanes.find((entry) => entry.id === task.lane) : undefined;
  return lane?.layer ?? manifest.policy.defaultLayer;
}

function searchableTask(task: FrontierSwarmTask): string {
  return [
    task.id,
    task.title,
    task.objective,
    task.description,
    task.workKind,
    task.status,
    task.lane,
    task.layer,
    task.compute,
    ...task.sourceRefs,
    ...task.targetRefs,
    ...task.tags
  ].filter(Boolean).join(' ').toLowerCase();
}

function addIssue(issues: FrontierSwarmValidationIssue[], code: string, severity: 'error' | 'warning', path: string, message: string): void {
  issues.push({ code, severity, path, message });
}

function hasLayerCycle(layerId: string, layers: readonly FrontierSwarmLayer[]): boolean {
  const byId = new Map(layers.map((layer) => [layer.id, layer]));
  const seen = new Set<string>();
  let cursor: string | undefined = layerId;
  while (cursor) {
    if (seen.has(cursor)) return true;
    seen.add(cursor);
    cursor = byId.get(cursor)?.parentId;
  }
  return false;
}

function isSwarmManifest(value: unknown): value is FrontierSwarmManifest {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_MANIFEST_KIND;
}

function isSwarmTask(value: unknown): value is FrontierSwarmTask {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_TASK_KIND;
}

function normalizeId(value: string, label: string): string {
  const id = String(value || '').trim();
  if (!id) throw new Error(`Missing ${label}`);
  return id;
}

function titleFromId(id: string): string {
  const parts = String(id).split(/[.:/_-]+/).filter(Boolean);
  return parts.length ? parts.map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ') : String(id);
}

function slug(value: string): string {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';
}

function uniqueStrings(values: readonly (string | undefined | null)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? '').trim()).filter(Boolean)));
}

function positiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function toJsonObject(value: unknown): JsonObject | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return cloneJsonValue(value) as JsonObject;
}

function toJsonValue(value: unknown): JsonValue {
  if (value === undefined) return null;
  return cloneJsonValue(value) as JsonValue;
}

function cloneJsonValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function stringifyError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function stableHash(value: unknown): string {
  const text = stableStringify(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return 'fnv1a32:' + (hash >>> 0).toString(16).padStart(8, '0');
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
  const object = value as Record<string, unknown>;
  return '{' + Object.keys(object).sort().map((key) => JSON.stringify(key) + ':' + stableStringify(object[key])).join(',') + '}';
}
