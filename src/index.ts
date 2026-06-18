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
export const FRONTIER_SWARM_EVENT_STREAM_KIND = 'frontier.swarm.event-stream';
export const FRONTIER_SWARM_EVENT_STREAM_VERSION = 1;
export const FRONTIER_SWARM_MAILBOX_KIND = 'frontier.swarm.mailbox';
export const FRONTIER_SWARM_MAILBOX_VERSION = 1;
export const FRONTIER_SWARM_PROOF_KIND = 'frontier.swarm.proof';
export const FRONTIER_SWARM_PROOF_VERSION = 1;
export const FRONTIER_SWARM_SCHEDULE_KIND = 'frontier.swarm.schedule';
export const FRONTIER_SWARM_SCHEDULE_VERSION = 1;
export const FRONTIER_SWARM_LEASE_KIND = 'frontier.swarm.lease';
export const FRONTIER_SWARM_LEASE_VERSION = 1;
export const FRONTIER_SWARM_QUEUE_SNAPSHOT_KIND = 'frontier.swarm.queue-snapshot';
export const FRONTIER_SWARM_QUEUE_SNAPSHOT_VERSION = 1;
export const FRONTIER_SWARM_RUN_CHECKPOINT_KIND = 'frontier.swarm.run-checkpoint';
export const FRONTIER_SWARM_RUN_CHECKPOINT_VERSION = 1;
export const FRONTIER_SWARM_ARTIFACT_INDEX_KIND = 'frontier.swarm.artifact-index';
export const FRONTIER_SWARM_ARTIFACT_INDEX_VERSION = 1;
export const FRONTIER_SWARM_REVIEW_PLAN_KIND = 'frontier.swarm.review-plan';
export const FRONTIER_SWARM_REVIEW_PLAN_VERSION = 1;
export const FRONTIER_SWARM_MERGE_PLAN_KIND = 'frontier.swarm.merge-plan';
export const FRONTIER_SWARM_MERGE_PLAN_VERSION = 1;
export const FRONTIER_SWARM_MERGE_BUNDLE_KIND = 'frontier.swarm.merge-bundle';
export const FRONTIER_SWARM_MERGE_BUNDLE_VERSION = 1;
export const FRONTIER_SWARM_QUEUE_OVERLAY_KIND = 'frontier.swarm.queue-overlay';
export const FRONTIER_SWARM_QUEUE_OVERLAY_VERSION = 1;
export const FRONTIER_SWARM_MERGE_INDEX_KIND = 'frontier.swarm.merge-index';
export const FRONTIER_SWARM_MERGE_INDEX_VERSION = 1;
export const FRONTIER_SWARM_HOTSPOT_REPORT_KIND = 'frontier.swarm.hotspot-report';
export const FRONTIER_SWARM_HOTSPOT_REPORT_VERSION = 1;
export const FRONTIER_SWARM_REVIEWER_LANE_PLAN_KIND = 'frontier.swarm.reviewer-lane-plan';
export const FRONTIER_SWARM_REVIEWER_LANE_PLAN_VERSION = 1;
export const FRONTIER_SWARM_RUN_STORE_SHARDS_KIND = 'frontier.swarm.run-store-shards';
export const FRONTIER_SWARM_RUN_STORE_SHARDS_VERSION = 1;
export const FRONTIER_SWARM_MERGE_ADMISSION_KIND = 'frontier.swarm.merge-admission';
export const FRONTIER_SWARM_MERGE_ADMISSION_VERSION = 1;
export const FRONTIER_SWARM_CONTEXT_PACK_KIND = 'frontier.swarm.context-pack';
export const FRONTIER_SWARM_CONTEXT_PACK_VERSION = 1;
export const FRONTIER_SWARM_ORACLE_CORPUS_KIND = 'frontier.swarm.oracle-corpus';
export const FRONTIER_SWARM_ORACLE_CORPUS_VERSION = 1;
export const FRONTIER_SWARM_REPLAY_BUNDLE_KIND = 'frontier.swarm.replay-bundle';
export const FRONTIER_SWARM_REPLAY_BUNDLE_VERSION = 1;
export const FRONTIER_SWARM_PARITY_ORACLE_KIND = 'frontier.swarm.parity-oracle';
export const FRONTIER_SWARM_PARITY_ORACLE_VERSION = 1;
export const FRONTIER_SWARM_DIVERGENCE_REPORT_KIND = 'frontier.swarm.divergence-report';
export const FRONTIER_SWARM_DIVERGENCE_REPORT_VERSION = 1;
export const FRONTIER_SWARM_OBSERVABILITY_POINT_KIND = 'frontier.swarm.observability-point';
export const FRONTIER_SWARM_OBSERVABILITY_POINT_VERSION = 1;
export const FRONTIER_SWARM_WATCHPOINT_PLAN_KIND = 'frontier.swarm.watchpoint-plan';
export const FRONTIER_SWARM_WATCHPOINT_PLAN_VERSION = 1;
export const FRONTIER_SWARM_DEBUG_HANDOFF_KIND = 'frontier.swarm.debug-handoff';
export const FRONTIER_SWARM_DEBUG_HANDOFF_VERSION = 1;
export const FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND = 'frontier.swarm.instrumentation-budget';
export const FRONTIER_SWARM_INSTRUMENTATION_BUDGET_VERSION = 1;
export const FRONTIER_SWARM_BOTTLENECK_REPORT_KIND = 'frontier.swarm.bottleneck-report';
export const FRONTIER_SWARM_BOTTLENECK_REPORT_VERSION = 1;
export const FRONTIER_SWARM_EVIDENCE_INDEX_KIND = 'frontier.swarm.evidence-index';
export const FRONTIER_SWARM_EVIDENCE_INDEX_VERSION = 1;
export const FRONTIER_SWARM_BLACKBOARD_KIND = 'frontier.swarm.blackboard';
export const FRONTIER_SWARM_BLACKBOARD_VERSION = 1;
export const FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_KIND = 'frontier.swarm.reference-oracle-plan';
export const FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_VERSION = 1;
export const FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_KIND = 'frontier.swarm.reference-oracle-response';
export const FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_VERSION = 1;
export const FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_KIND = 'frontier.swarm.artifact-routing-plan';
export const FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_VERSION = 1;
export const FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_KIND = 'frontier.swarm.scheduler-recommendations';
export const FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_VERSION = 1;
export const FRONTIER_SWARM_FIXTURE_CATALOG_KIND = 'frontier.swarm.fixture-catalog';
export const FRONTIER_SWARM_FIXTURE_CATALOG_VERSION = 1;
export const FRONTIER_SWARM_PROGRESS_MODEL_KIND = 'frontier.swarm.progress-model';
export const FRONTIER_SWARM_PROGRESS_MODEL_VERSION = 1;
export const FRONTIER_SWARM_AUTO_REVIEW_REPORT_KIND = 'frontier.swarm.auto-review-report';
export const FRONTIER_SWARM_AUTO_REVIEW_REPORT_VERSION = 1;
export const FRONTIER_SWARM_REBASE_REPORT_KIND = 'frontier.swarm.rebase-report';
export const FRONTIER_SWARM_REBASE_REPORT_VERSION = 1;
export const FRONTIER_SWARM_USAGE_GOVERNOR_KIND = 'frontier.swarm.usage-governor';
export const FRONTIER_SWARM_USAGE_GOVERNOR_VERSION = 1;
export const FRONTIER_SWARM_LANE_PLAYBOOK_KIND = 'frontier.swarm.lane-playbook';
export const FRONTIER_SWARM_LANE_PLAYBOOK_VERSION = 1;
export const FRONTIER_SWARM_PATCH_STACK_PLAN_KIND = 'frontier.swarm.patch-stack-plan';
export const FRONTIER_SWARM_PATCH_STACK_PLAN_VERSION = 1;
export const FRONTIER_SWARM_HIERARCHICAL_MERGE_QUEUE_KIND = 'frontier.swarm.hierarchical-merge-queue';
export const FRONTIER_SWARM_HIERARCHICAL_MERGE_QUEUE_VERSION = 1;
export const FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_KIND = 'frontier.swarm.coordinator-agent-drain-work';
export const FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_VERSION = 1;
export const FRONTIER_SWARM_PRIORITY_POLICY_KIND = 'frontier.swarm.priority-policy';
export const FRONTIER_SWARM_PRIORITY_POLICY_VERSION = 1;

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
export type FrontierSwarmMergeReadiness =
  | 'discovery-only'
  | 'patch-candidate'
  | 'verified-patch'
  | 'rejected'
  | 'blocked'
  | string;
export type FrontierSwarmMergeDisposition =
  | 'auto-mergeable'
  | 'needs-port'
  | 'discovery-only'
  | 'rejected'
  | 'blocked'
  | 'stale-against-head'
  | string;
export type FrontierSwarmRiskLevel = 'low' | 'medium' | 'high' | 'unknown' | string;
export type FrontierSwarmPatchStatus = 'unknown' | 'applies' | 'missing' | 'stale' | 'failed-check' | string;
export type FrontierSwarmQueueOverlayStatus =
  | 'satisfied'
  | 'ready-to-apply'
  | 'needs-human-port'
  | 'failed-evidence'
  | 'stale-against-head'
  | 'discovery-only'
  | 'blocked'
  | 'rejected'
  | 'unknown'
  | string;
export type FrontierSwarmParityOracleStatus = 'pending' | 'passed' | 'failed' | 'blocked' | 'skipped' | string;
export type FrontierSwarmDivergenceSeverity = 'info' | 'warning' | 'error' | 'critical' | string;
export type FrontierSwarmWatchpointAction = 'break' | 'log' | 'capture' | 'handoff' | string;
export type FrontierSwarmBottleneckKind =
  | 'correctness'
  | 'performance'
  | 'instrumentation-overhead'
  | 'missing-oracle'
  | 'flaky-harness'
  | 'blocked-dependency'
  | 'merge-review'
  | 'resource-capacity'
  | 'budget'
  | 'queue'
  | string;
export type FrontierSwarmConfidence = 'low' | 'medium' | 'high' | string;
export type FrontierSwarmBlackboardEntryKind = 'fact' | 'divergence' | 'rejected-theory' | 'ownership' | 'decision' | string;
export type FrontierSwarmProgressStatus =
  | 'not-started'
  | 'declared'
  | 'implemented'
  | 'structure-verified'
  | 'visual-verified'
  | 'functional-verified'
  | 'collaboration-verified'
  | 'accepted'
  | 'rejected'
  | 'blocked'
  | string;
export type FrontierSwarmAutoReviewFindingKind =
  | 'stub-risk'
  | 'missing-evidence'
  | 'ownership-violation'
  | 'overlarge-patch'
  | 'weak-evidence'
  | 'strict-source-policy'
  | string;
export type FrontierSwarmRebaseStatus =
  | 'clean-apply'
  | 'textual-conflict'
  | 'semantic-overlap'
  | 'stale-evidence'
  | 'needs-rerun'
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

export interface FrontierSwarmOwnershipRegionInput {
  id: string;
  title?: string;
  description?: string;
  globs?: readonly string[];
  paths?: readonly string[];
  selectors?: readonly string[];
  owner?: string;
  metadata?: unknown;
}

export interface FrontierSwarmOwnershipRegion {
  id: string;
  title: string;
  description?: string;
  globs: string[];
  selectors: string[];
  owner?: string;
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
  ownershipRegions?: readonly FrontierSwarmOwnershipRegionInput[];
  capabilities?: readonly string[];
  resourceRequirements?: FrontierSwarmResourceRequirementsInput;
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
  ownershipRegions: FrontierSwarmOwnershipRegion[];
  capabilities: string[];
  resourceRequirements?: FrontierSwarmResourceRequirements;
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

export interface FrontierSwarmBrowserResourceInput {
  required?: boolean;
  portPool?: readonly (string | number)[];
  profileDir?: string;
  profileDirPrefix?: string;
  maxConcurrency?: number;
  headless?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmBrowserResource {
  required: boolean;
  portPool: string[];
  profileDir?: string;
  profileDirPrefix?: string;
  maxConcurrency?: number;
  headless?: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmResourceRequirementsInput {
  capabilities?: readonly string[];
  resources?: Record<string, number>;
  browser?: FrontierSwarmBrowserResourceInput;
  metadata?: unknown;
}

export interface FrontierSwarmResourceRequirements {
  capabilities: string[];
  resources: Record<string, number>;
  browser?: FrontierSwarmBrowserResource;
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
  ownershipRegions?: readonly FrontierSwarmOwnershipRegionInput[];
  ownedRegions?: readonly string[];
  changedRegions?: readonly string[];
  capabilities?: readonly string[];
  resourceRequirements?: FrontierSwarmResourceRequirementsInput;
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
  ownershipRegions: FrontierSwarmOwnershipRegion[];
  ownedRegions: string[];
  changedRegions: string[];
  capabilities: string[];
  resourceRequirements?: FrontierSwarmResourceRequirements;
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

export type FrontierSwarmPriorityClass = 'coordinator-drain' | 'review' | 'standard' | 'speculative' | string;

export interface FrontierSwarmPriorityPolicyClass {
  className: FrontierSwarmPriorityClass;
  rank: number;
  description: string;
  matchers: string[];
}

export interface FrontierSwarmPriorityPolicy {
  kind: typeof FRONTIER_SWARM_PRIORITY_POLICY_KIND;
  version: typeof FRONTIER_SWARM_PRIORITY_POLICY_VERSION;
  id: string;
  description: string;
  classes: FrontierSwarmPriorityPolicyClass[];
  laneFairness: {
    strategy: 'round-robin-within-priority-class';
    scope: 'ready-window' | string;
    tieBreakers: string[];
  };
  concurrency: {
    preservesLaneLimits: boolean;
    preservesConcurrencyKeyLimits: boolean;
    preservesComputeLimits: boolean;
    preservesResourceQuotas: boolean;
  };
}

export interface FrontierSwarmPriorityDecision {
  policyId: string;
  className: FrontierSwarmPriorityClass;
  rank: number;
  basePriority: number;
  effectivePriority: number;
  reasons: string[];
}

export const FRONTIER_SWARM_REVIEW_PRIORITY_POLICY: FrontierSwarmPriorityPolicy = {
  kind: FRONTIER_SWARM_PRIORITY_POLICY_KIND,
  version: FRONTIER_SWARM_PRIORITY_POLICY_VERSION,
  id: 'frontier-swarm-review-priority-v1',
  description: 'Coordinator drain and review work is selected before speculative backlog, with lane round-robin inside each priority class and all existing lane, compute, resource, and concurrency-key limits preserved.',
  classes: [
    {
      className: 'coordinator-drain',
      rank: 0,
      description: 'Coordinator-agent drain, auto-drain, review-debt drain, and coordinator-review queue work.',
      matchers: ['coordinator-drain', 'coordinator-agent-drain', 'auto-drain', 'drain-work', 'review-debt-drain', 'coordinator-review']
    },
    {
      className: 'review',
      rank: 0,
      description: 'Review, reviewer, merge-review, and needs-port work that should not wait behind speculative implementation backlog.',
      matchers: ['review', 'reviewer', 'merge-review', 'needs-human-port', 'needs-port']
    },
    {
      className: 'standard',
      rank: 50,
      description: 'Ordinary implementation, evidence, diagnostics, and queue work without an explicit drain/review/speculative marker.',
      matchers: []
    },
    {
      className: 'speculative',
      rank: 90,
      description: 'Speculative, exploratory, idea, research, or backlog work that should yield to current-head review and drain decisions.',
      matchers: ['speculative', 'exploratory', 'exploration', 'idea', 'research', 'backlog']
    }
  ],
  laneFairness: {
    strategy: 'round-robin-within-priority-class',
    scope: 'ready-window',
    tieBreakers: ['priority-class-rank', 'lane-round-robin', 'base-priority', 'id']
  },
  concurrency: {
    preservesLaneLimits: true,
    preservesConcurrencyKeyLimits: true,
    preservesComputeLimits: true,
    preservesResourceQuotas: true
  }
};

export interface FrontierSwarmSelectionPriorityInput {
  statuses?: Record<string, number>;
  workKinds?: Record<string, number>;
  defaultStatusRank?: number;
  defaultWorkKindRank?: number;
  statusWeight?: number;
  workKindWeight?: number;
}

export interface FrontierSwarmTaskSelectionInput extends FrontierSwarmPlanFilter {
  workKinds?: readonly string[];
  spreadLanes?: boolean;
  includeOwnershipWarnings?: boolean;
  assignSelectionPriority?: boolean;
  priority?: FrontierSwarmSelectionPriorityInput;
}

export interface FrontierSwarmTaskSelectionEntry {
  task: FrontierSwarmTask;
  lane?: FrontierSwarmLane;
  ownershipWarnings: string[];
  selectionPriority: number;
}

export interface FrontierSwarmTaskSelectionSummary {
  total: number;
  byLane: Record<string, number>;
  byWorkKind: Record<string, number>;
  ownershipWarningCount: number;
}

export interface FrontierSwarmTaskSelection {
  tasks: FrontierSwarmTask[];
  entries: FrontierSwarmTaskSelectionEntry[];
  summary: FrontierSwarmTaskSelectionSummary;
}

export interface FrontierSwarmPlanInput extends FrontierSwarmPlanFilter {
  id?: string;
  runId?: string;
  now?: number;
  maxReadyJobs?: number;
  maxLaneConcurrency?: Record<string, number>;
  maxConcurrencyKeyConcurrency?: Record<string, number>;
  maxComputeConcurrency?: Record<string, number>;
  resourceQuotas?: Record<string, number>;
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
  resourceQuotas: Record<string, number>;
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
  ownershipRegions: FrontierSwarmOwnershipRegion[];
  ownedRegions: string[];
  changedRegions: string[];
  capabilities: string[];
  resourceRequirements?: FrontierSwarmResourceRequirements;
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
  resourceQuotas?: Record<string, number>;
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
  metadata?: JsonObject;
}

export interface FrontierSwarmScheduledJob {
  jobId: string;
  taskId: string;
  lane: string;
  compute: string;
  concurrencyKey: string;
  priority: number;
  dependsOn: string[];
  capabilities: string[];
  resourceRequirements?: FrontierSwarmResourceRequirements;
  metadata?: JsonObject;
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
  capabilities: string[];
  resourceRequirements?: FrontierSwarmResourceRequirements;
  metadata?: JsonObject;
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

export type FrontierSwarmQueueJobStatus =
  | 'ready'
  | 'leased'
  | 'running'
  | 'completed'
  | 'failed'
  | 'blocked'
  | 'retrying'
  | 'dead-letter'
  | string;

export interface FrontierSwarmQueueJobInput {
  jobId: string;
  taskId?: string;
  runId?: string;
  status?: FrontierSwarmQueueJobStatus;
  lane?: string;
  compute?: string;
  concurrencyKey?: string;
  priority?: number;
  attempts?: number;
  maxAttempts?: number;
  availableAt?: number;
  lease?: FrontierSwarmLease;
  lastError?: string;
  metadata?: unknown;
}

export interface FrontierSwarmQueueJob {
  jobId: string;
  taskId?: string;
  runId?: string;
  status: FrontierSwarmQueueJobStatus;
  lane?: string;
  compute?: string;
  concurrencyKey?: string;
  priority: number;
  attempts: number;
  maxAttempts: number;
  availableAt?: number;
  lease?: FrontierSwarmLease;
  lastError?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmQueueSnapshotInput {
  id?: string;
  plan: FrontierSwarmPlan;
  run?: FrontierSwarmRun;
  jobs?: readonly FrontierSwarmQueueJobInput[];
  leases?: readonly FrontierSwarmLease[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmQueueSnapshot {
  kind: typeof FRONTIER_SWARM_QUEUE_SNAPSHOT_KIND;
  version: typeof FRONTIER_SWARM_QUEUE_SNAPSHOT_VERSION;
  id: string;
  planId: string;
  runId: string;
  generatedAt: number;
  jobs: FrontierSwarmQueueJob[];
  byStatus: Record<string, string[]>;
  byLane: Record<string, string[]>;
  leases: FrontierSwarmLease[];
  metadata?: JsonObject;
  summary: {
    jobCount: number;
    leaseCount: number;
    readyCount: number;
    leasedCount: number;
    completedCount: number;
    failedCount: number;
    deadLetterCount: number;
  };
}

export interface FrontierSwarmLeaseRenewalInput {
  lease: FrontierSwarmLease;
  now?: number;
  leaseMs?: number;
  status?: FrontierSwarmLease['status'];
}

export interface FrontierSwarmQueueAdapter {
  snapshot(): FrontierSwarmQueueSnapshot | Promise<FrontierSwarmQueueSnapshot>;
  enqueue?(snapshot: FrontierSwarmQueueSnapshot): FrontierSwarmQueueSnapshot | Promise<FrontierSwarmQueueSnapshot>;
  lease?(input: FrontierSwarmLeaseInput): readonly FrontierSwarmLease[] | Promise<readonly FrontierSwarmLease[]>;
  renew?(input: FrontierSwarmLeaseRenewalInput): FrontierSwarmLease | Promise<FrontierSwarmLease>;
  complete?(result: FrontierSwarmJobResultInput): FrontierSwarmQueueSnapshot | Promise<FrontierSwarmQueueSnapshot>;
}

export interface FrontierSwarmRunCheckpointInput {
  run: FrontierSwarmRun;
  sequence?: number;
  savedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmRunCheckpoint {
  kind: typeof FRONTIER_SWARM_RUN_CHECKPOINT_KIND;
  version: typeof FRONTIER_SWARM_RUN_CHECKPOINT_VERSION;
  id: string;
  runId: string;
  planId: string;
  sequence: number;
  savedAt: number;
  status: FrontierSwarmJobStatus;
  eventCount: number;
  resultCount: number;
  hash: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmRunStoreAdapter {
  loadRun(runId: string): FrontierSwarmRun | undefined | Promise<FrontierSwarmRun | undefined>;
  saveRun(run: FrontierSwarmRun, checkpoint?: FrontierSwarmRunCheckpoint): void | Promise<void>;
  appendEvents?(runId: string, events: readonly FrontierSwarmEventInput[]): void | Promise<void>;
  appendResults?(runId: string, results: readonly FrontierSwarmJobResultInput[]): void | Promise<void>;
  checkpoint?(run: FrontierSwarmRun): FrontierSwarmRunCheckpoint | Promise<FrontierSwarmRunCheckpoint>;
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

export type FrontierSwarmMailboxScope = 'global' | 'lane' | 'job' | string;

export interface FrontierSwarmMailboxInput {
  id?: string;
  runId?: string;
  scope?: FrontierSwarmMailboxScope;
  lane?: string;
  jobId?: string;
  path?: string;
  eventTypes?: readonly string[];
  appendOnly?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmMailbox {
  kind: typeof FRONTIER_SWARM_MAILBOX_KIND;
  version: typeof FRONTIER_SWARM_MAILBOX_VERSION;
  id: string;
  runId?: string;
  scope: FrontierSwarmMailboxScope;
  lane?: string;
  jobId?: string;
  path?: string;
  eventTypes: string[];
  appendOnly: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmEventStreamInput {
  id?: string;
  runId?: string;
  root?: string;
  lanes?: readonly (string | FrontierSwarmLaneInput | FrontierSwarmLane)[];
  eventTypes?: readonly string[];
  appendOnly?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmEventStream {
  kind: typeof FRONTIER_SWARM_EVENT_STREAM_KIND;
  version: typeof FRONTIER_SWARM_EVENT_STREAM_VERSION;
  id: string;
  runId?: string;
  root?: string;
  appendOnly: boolean;
  global: FrontierSwarmMailbox;
  lanes: Record<string, FrontierSwarmMailbox>;
  eventTypes: string[];
  metadata?: JsonObject;
  summary: {
    mailboxCount: number;
    laneCount: number;
    eventTypeCount: number;
  };
}

export interface FrontierSwarmJobResultInput {
  jobId: string;
  status?: FrontierSwarmJobStatus;
  mergeReadiness?: FrontierSwarmMergeReadiness;
  startedAt?: number;
  finishedAt?: number;
  exitCode?: number;
  signal?: string;
  changedPaths?: readonly string[];
  changedRegions?: readonly string[];
  ownershipViolations?: readonly string[];
  evidencePaths?: readonly string[];
  patchPath?: string;
  queueItemIds?: readonly string[];
  riskLevel?: FrontierSwarmRiskLevel;
  mergeDisposition?: FrontierSwarmMergeDisposition;
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
  mergeReadiness: FrontierSwarmMergeReadiness;
  startedAt?: number;
  finishedAt?: number;
  durationMs?: number;
  exitCode?: number;
  signal?: string;
  changedPaths: string[];
  changedRegions: string[];
  ownershipViolations: string[];
  evidencePaths: string[];
  patchPath?: string;
  queueItemIds: string[];
  riskLevel: FrontierSwarmRiskLevel;
  mergeDisposition: FrontierSwarmMergeDisposition;
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

export interface FrontierSwarmMergeBundleInput {
  id?: string;
  runId?: string;
  planId?: string;
  job?: FrontierSwarmJob;
  result: FrontierSwarmJobResult | FrontierSwarmJobResultInput;
  patchPath?: string;
  patchHash?: string;
  evidencePaths?: readonly string[];
  queueItemIds?: readonly string[];
  riskLevel?: FrontierSwarmRiskLevel;
  disposition?: FrontierSwarmMergeDisposition;
  staleAgainstHead?: boolean;
  branchName?: string;
  commit?: string;
  metadata?: unknown;
  generatedAt?: number;
}

export interface FrontierSwarmMergeBundle {
  kind: typeof FRONTIER_SWARM_MERGE_BUNDLE_KIND;
  version: typeof FRONTIER_SWARM_MERGE_BUNDLE_VERSION;
  id: string;
  runId?: string;
  planId?: string;
  jobId: string;
  taskId?: string;
  lane?: string;
  title?: string;
  generatedAt: number;
  status: FrontierSwarmJobStatus;
  mergeReadiness: FrontierSwarmMergeReadiness;
  disposition: FrontierSwarmMergeDisposition;
  riskLevel: FrontierSwarmRiskLevel;
  autoMergeable: boolean;
  changedPaths: string[];
  changedRegions: string[];
  ownedFilesTouched: string[];
  allowedWrites: string[];
  ownershipViolations: string[];
  patchPath?: string;
  patchHash?: string;
  evidencePaths: string[];
  commandsPassed: FrontierSwarmVerificationResult[];
  commandsFailed: FrontierSwarmVerificationResult[];
  queueItemIds: string[];
  branchName?: string;
  commit?: string;
  staleAgainstHead: boolean;
  reasons: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmQueueOverlayInput {
  id?: string;
  runId?: string;
  bundles?: readonly FrontierSwarmMergeBundle[];
  results?: readonly (FrontierSwarmJobResult | FrontierSwarmJobResultInput)[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmQueueOverlay {
  kind: typeof FRONTIER_SWARM_QUEUE_OVERLAY_KIND;
  version: typeof FRONTIER_SWARM_QUEUE_OVERLAY_VERSION;
  id: string;
  runId?: string;
  generatedAt: number;
  entries: FrontierSwarmQueueOverlayEntry[];
  byQueueItemId: Record<string, FrontierSwarmQueueOverlayEntry[]>;
  summary: {
    entryCount: number;
    queueItemCount: number;
    readyToApplyCount: number;
    needsHumanPortCount: number;
    failedEvidenceCount: number;
    staleAgainstHeadCount: number;
    discoveryOnlyCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmQueueOverlayEntry {
  queueItemId: string;
  jobId: string;
  status: FrontierSwarmQueueOverlayStatus;
  mergeReadiness: FrontierSwarmMergeReadiness;
  disposition: FrontierSwarmMergeDisposition;
  riskLevel: FrontierSwarmRiskLevel;
  patchPath?: string;
  evidencePaths: string[];
  changedPaths: string[];
  changedRegions: string[];
  reasons: string[];
  generatedAt: number;
}

export interface FrontierSwarmDerivedQueueStatusInput {
  snapshot: FrontierSwarmQueueSnapshot;
  overlays?: readonly FrontierSwarmQueueOverlay[];
  generatedAt?: number;
}

export interface FrontierSwarmDerivedQueueStatus {
  generatedAt: number;
  jobs: FrontierSwarmQueueJob[];
  byStatus: Record<string, string[]>;
  summary: FrontierSwarmQueueSnapshot['summary'];
}

export interface FrontierSwarmMergeIndexInput {
  id?: string;
  runId?: string;
  planId?: string;
  bundles: readonly FrontierSwarmMergeBundle[];
  patchStatuses?: Record<string, FrontierSwarmPatchStatus>;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmMergeIndex {
  kind: typeof FRONTIER_SWARM_MERGE_INDEX_KIND;
  version: typeof FRONTIER_SWARM_MERGE_INDEX_VERSION;
  id: string;
  runId?: string;
  planId?: string;
  generatedAt: number;
  entries: FrontierSwarmMergeIndexEntry[];
  conflicts: FrontierSwarmMergeConflict[];
  byDisposition: Record<string, string[]>;
  byPath: Record<string, string[]>;
  byRegion: Record<string, string[]>;
  summary: {
    entryCount: number;
    readyToApplyCount: number;
    needsHumanPortCount: number;
    failedEvidenceCount: number;
    staleAgainstHeadCount: number;
    discoveryOnlyCount: number;
    conflictCount: number;
    conflictedJobCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmMergeIndexEntry {
  jobId: string;
  taskId?: string;
  lane?: string;
  title?: string;
  status: FrontierSwarmJobStatus;
  mergeReadiness: FrontierSwarmMergeReadiness;
  disposition: FrontierSwarmMergeDisposition;
  riskLevel: FrontierSwarmRiskLevel;
  patchStatus: FrontierSwarmPatchStatus;
  staleAgainstHead: boolean;
  autoMergeable: boolean;
  changedPaths: string[];
  changedRegions: string[];
  conflictKeys: string[];
  conflictingJobIds: string[];
  ownedFilesTouched: string[];
  ownershipViolations: string[];
  patchPath?: string;
  patchHash?: string;
  evidencePaths: string[];
  queueItemIds: string[];
  reasons: string[];
  generatedAt: number;
}

export interface FrontierSwarmMergeConflict {
  jobIds: string[];
  key: string;
  kind: 'path' | 'region';
  path?: string;
  region?: string;
}

export interface FrontierSwarmRegionOwnershipInput {
  changedPaths?: readonly string[];
  changedRegions?: readonly string[];
}

export interface FrontierSwarmRegionOwnershipReport {
  ok: boolean;
  jobId: string;
  changedPaths: string[];
  changedRegions: string[];
  ownedRegions: string[];
  regionViolations: string[];
  unclassifiedChangedPaths: string[];
}

export interface FrontierSwarmHotspotReportInput {
  id?: string;
  bundles?: readonly FrontierSwarmMergeBundle[];
  results?: readonly (FrontierSwarmJobResult | FrontierSwarmJobResultInput)[];
  threshold?: number;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmHotspotReport {
  kind: typeof FRONTIER_SWARM_HOTSPOT_REPORT_KIND;
  version: typeof FRONTIER_SWARM_HOTSPOT_REPORT_VERSION;
  id: string;
  generatedAt: number;
  threshold: number;
  entries: FrontierSwarmHotspotEntry[];
  recommendations: FrontierSwarmHotspotRecommendation[];
  summary: {
    pathCount: number;
    hotspotCount: number;
    recommendationCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmHotspotEntry {
  path: string;
  touchCount: number;
  jobIds: string[];
  regions: string[];
  dispositions: string[];
  riskLevels: string[];
}

export interface FrontierSwarmHotspotRecommendation {
  path: string;
  reason: 'repeated-conflicts' | 'hot-file' | 'region-overlap';
  suggestedModuleId: string;
  suggestedOwnershipRegions: string[];
  jobIds: string[];
}

export interface FrontierSwarmReviewerLanePlanInput {
  id?: string;
  index: FrontierSwarmMergeIndex;
  admission?: FrontierSwarmMergeAdmission;
  reviewerLane?: string;
  reviewers?: readonly string[];
  includeAutoMergeable?: boolean;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmReviewerLanePlan {
  kind: typeof FRONTIER_SWARM_REVIEWER_LANE_PLAN_KIND;
  version: typeof FRONTIER_SWARM_REVIEWER_LANE_PLAN_VERSION;
  id: string;
  mergeIndexId: string;
  generatedAt: number;
  reviewerLane: string;
  assignments: FrontierSwarmReviewerLaneAssignment[];
  tasks: FrontierSwarmTaskInput[];
  summary: {
    assignmentCount: number;
    taskCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmReviewerLaneAssignment {
  jobId: string;
  reviewers: string[];
  required: boolean;
  reasons: string[];
}

export interface FrontierSwarmRunStoreShardsInput {
  id?: string;
  run?: FrontierSwarmRun;
  plan?: FrontierSwarmPlan;
  root?: string;
  shardSize?: number;
  groupBy?: 'lane' | 'hash' | 'none';
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmRunStoreShards {
  kind: typeof FRONTIER_SWARM_RUN_STORE_SHARDS_KIND;
  version: typeof FRONTIER_SWARM_RUN_STORE_SHARDS_VERSION;
  id: string;
  runId?: string;
  planId?: string;
  root: string;
  generatedAt: number;
  groupBy: 'lane' | 'hash' | 'none';
  shardSize: number;
  shards: FrontierSwarmRunStoreShard[];
  summary: {
    shardCount: number;
    jobCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmRunStoreShard {
  id: string;
  lane?: string;
  path: string;
  eventPath: string;
  resultPath: string;
  checkpointPath: string;
  jobIds: string[];
}

export interface FrontierSwarmMergeAdmissionInput {
  id?: string;
  index: FrontierSwarmMergeIndex;
  maxReady?: number;
  maxChangedPaths?: number;
  maxChangedRegions?: number;
  maxHighRisk?: number;
  allowRisks?: readonly FrontierSwarmRiskLevel[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmMergeAdmission {
  kind: typeof FRONTIER_SWARM_MERGE_ADMISSION_KIND;
  version: typeof FRONTIER_SWARM_MERGE_ADMISSION_VERSION;
  id: string;
  mergeIndexId: string;
  generatedAt: number;
  admitted: string[];
  deferred: FrontierSwarmMergeAdmissionDeferral[];
  budget: {
    maxReady: number;
    maxChangedPaths?: number;
    maxChangedRegions?: number;
    maxHighRisk?: number;
    allowRisks: string[];
  };
  summary: {
    admittedCount: number;
    deferredCount: number;
    changedPathCount: number;
    changedRegionCount: number;
    highRiskCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmMergeAdmissionDeferral {
  jobId: string;
  reasons: string[];
}

export interface FrontierSwarmContextPackInput {
  id?: string;
  job?: FrontierSwarmJob;
  task?: FrontierSwarmTask | FrontierSwarmTaskInput;
  title?: string;
  files?: readonly string[];
  apiMap?: Record<string, readonly string[]>;
  knownFailures?: readonly string[];
  commands?: readonly (string | FrontierSwarmCommandInput)[];
  oracleCommands?: readonly (string | FrontierSwarmCommandInput)[];
  evidenceSchema?: unknown;
  expectedEvidence?: readonly string[];
  exclusions?: readonly string[];
  avoidInvestigating?: readonly string[];
  playbookIds?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmContextPack {
  kind: typeof FRONTIER_SWARM_CONTEXT_PACK_KIND;
  version: typeof FRONTIER_SWARM_CONTEXT_PACK_VERSION;
  id: string;
  jobId?: string;
  taskId?: string;
  lane?: string;
  title: string;
  generatedAt: number;
  files: string[];
  apiMap: Record<string, string[]>;
  knownFailures: string[];
  commands: FrontierSwarmCommand[];
  oracleCommands: FrontierSwarmCommand[];
  evidenceSchema?: JsonValue;
  expectedEvidence: string[];
  exclusions: string[];
  avoidInvestigating: string[];
  playbookIds: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmOracleArtifactInput {
  id: string;
  path: string;
  kind?: string;
  command?: string | FrontierSwarmCommandInput;
  hash?: string;
  sourceRef?: string;
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmOracleArtifact {
  id: string;
  path: string;
  kind: string;
  command?: FrontierSwarmCommand;
  hash?: string;
  sourceRef?: string;
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmOracleCorpusInput {
  id?: string;
  title?: string;
  artifacts?: readonly FrontierSwarmOracleArtifactInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmOracleCorpus {
  kind: typeof FRONTIER_SWARM_ORACLE_CORPUS_KIND;
  version: typeof FRONTIER_SWARM_ORACLE_CORPUS_VERSION;
  id: string;
  title: string;
  generatedAt: number;
  artifacts: FrontierSwarmOracleArtifact[];
  byKind: Record<string, string[]>;
  byTag: Record<string, string[]>;
  summary: {
    artifactCount: number;
    kindCount: number;
    tagCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmNamedRefInput {
  id?: string;
  path?: string;
  uri?: string;
  kind?: string;
  role?: string;
  hash?: string;
  bytes?: number;
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmNamedRef {
  id: string;
  kind: string;
  path?: string;
  uri?: string;
  role?: string;
  hash?: string;
  bytes?: number;
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmObservabilityPointInput {
  id?: string;
  subject?: string;
  scope?: string;
  operationIndex?: number;
  at?: number;
  path?: string;
  selector?: string;
  before?: unknown;
  after?: unknown;
  eventRefs?: readonly (string | FrontierSwarmNamedRefInput)[];
  metadata?: unknown;
}

export interface FrontierSwarmObservabilityPoint {
  kind: typeof FRONTIER_SWARM_OBSERVABILITY_POINT_KIND;
  version: typeof FRONTIER_SWARM_OBSERVABILITY_POINT_VERSION;
  id: string;
  subject?: string;
  scope?: string;
  operationIndex?: number;
  at?: number;
  path?: string;
  selector?: string;
  before?: JsonValue;
  after?: JsonValue;
  eventRefs: FrontierSwarmNamedRef[];
  metadata?: JsonObject;
}

export interface FrontierSwarmReplayBundleInput {
  id?: string;
  title?: string;
  subject?: string;
  commands?: readonly (string | FrontierSwarmCommandInput)[];
  inputs?: readonly FrontierSwarmNamedRefInput[];
  artifacts?: readonly FrontierSwarmNamedRefInput[];
  sourceRefs?: readonly (string | FrontierSwarmNamedRefInput)[];
  seeds?: readonly (string | number | FrontierSwarmNamedRefInput)[];
  environment?: unknown;
  expectedEvidence?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmReplayBundle {
  kind: typeof FRONTIER_SWARM_REPLAY_BUNDLE_KIND;
  version: typeof FRONTIER_SWARM_REPLAY_BUNDLE_VERSION;
  id: string;
  title: string;
  subject?: string;
  generatedAt: number;
  commands: FrontierSwarmCommand[];
  inputs: FrontierSwarmNamedRef[];
  artifacts: FrontierSwarmNamedRef[];
  sourceRefs: FrontierSwarmNamedRef[];
  seeds: FrontierSwarmNamedRef[];
  environment?: JsonObject;
  expectedEvidence: string[];
  summary: {
    commandCount: number;
    inputCount: number;
    artifactCount: number;
    sourceRefCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmParityComparatorInput {
  id?: string;
  title?: string;
  status?: FrontierSwarmParityOracleStatus;
  expected?: unknown;
  actual?: unknown;
  path?: string;
  operationIndex?: number;
  evidenceRefs?: readonly (string | FrontierSwarmNamedRefInput)[];
  metadata?: unknown;
}

export interface FrontierSwarmParityComparator {
  id: string;
  title: string;
  status: FrontierSwarmParityOracleStatus;
  expected?: JsonValue;
  actual?: JsonValue;
  path?: string;
  operationIndex?: number;
  evidenceRefs: FrontierSwarmNamedRef[];
  metadata?: JsonObject;
}

export interface FrontierSwarmParityOracleInput {
  id?: string;
  title?: string;
  status?: FrontierSwarmParityOracleStatus;
  subject?: string;
  referenceCommands?: readonly (string | FrontierSwarmCommandInput)[];
  testCommands?: readonly (string | FrontierSwarmCommandInput)[];
  comparators?: readonly FrontierSwarmParityComparatorInput[];
  artifacts?: readonly FrontierSwarmNamedRefInput[];
  replayBundleIds?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmParityOracle {
  kind: typeof FRONTIER_SWARM_PARITY_ORACLE_KIND;
  version: typeof FRONTIER_SWARM_PARITY_ORACLE_VERSION;
  id: string;
  title: string;
  status: FrontierSwarmParityOracleStatus;
  subject?: string;
  generatedAt: number;
  referenceCommands: FrontierSwarmCommand[];
  testCommands: FrontierSwarmCommand[];
  comparators: FrontierSwarmParityComparator[];
  artifacts: FrontierSwarmNamedRef[];
  replayBundleIds: string[];
  summary: {
    comparatorCount: number;
    passedCount: number;
    failedCount: number;
    blockedCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmDivergenceReportInput {
  id?: string;
  title?: string;
  status?: FrontierSwarmParityOracleStatus;
  severity?: FrontierSwarmDivergenceSeverity;
  subject?: string;
  confidence?: FrontierSwarmConfidence;
  divergesAt?: string;
  operationIndex?: number;
  expected?: unknown;
  actual?: unknown;
  observabilityPoints?: readonly (FrontierSwarmObservabilityPoint | FrontierSwarmObservabilityPointInput)[];
  traceRefs?: readonly (string | FrontierSwarmNamedRefInput)[];
  replayBundleIds?: readonly string[];
  evidenceRefs?: readonly (string | FrontierSwarmNamedRefInput)[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmDivergenceReport {
  kind: typeof FRONTIER_SWARM_DIVERGENCE_REPORT_KIND;
  version: typeof FRONTIER_SWARM_DIVERGENCE_REPORT_VERSION;
  id: string;
  title: string;
  status: FrontierSwarmParityOracleStatus;
  severity: FrontierSwarmDivergenceSeverity;
  subject?: string;
  confidence: FrontierSwarmConfidence;
  divergesAt?: string;
  operationIndex?: number;
  expected?: JsonValue;
  actual?: JsonValue;
  observabilityPoints: FrontierSwarmObservabilityPoint[];
  traceRefs: FrontierSwarmNamedRef[];
  replayBundleIds: string[];
  evidenceRefs: FrontierSwarmNamedRef[];
  generatedAt: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmWatchpointInput {
  id?: string;
  title?: string;
  target?: string;
  path?: string;
  selector?: string;
  operator?: string;
  value?: unknown;
  action?: FrontierSwarmWatchpointAction;
  metadata?: unknown;
}

export interface FrontierSwarmWatchpoint {
  id: string;
  title: string;
  target?: string;
  path?: string;
  selector?: string;
  operator: string;
  value?: JsonValue;
  action: FrontierSwarmWatchpointAction;
  metadata?: JsonObject;
}

export interface FrontierSwarmWatchpointPlanInput {
  id?: string;
  title?: string;
  subject?: string;
  matchMode?: 'all' | 'any' | string;
  watchpoints?: readonly FrontierSwarmWatchpointInput[];
  commands?: readonly (string | FrontierSwarmCommandInput)[];
  replayBundleIds?: readonly string[];
  divergenceReportIds?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmWatchpointPlan {
  kind: typeof FRONTIER_SWARM_WATCHPOINT_PLAN_KIND;
  version: typeof FRONTIER_SWARM_WATCHPOINT_PLAN_VERSION;
  id: string;
  title: string;
  subject?: string;
  matchMode: string;
  generatedAt: number;
  watchpoints: FrontierSwarmWatchpoint[];
  commands: FrontierSwarmCommand[];
  replayBundleIds: string[];
  divergenceReportIds: string[];
  summary: {
    watchpointCount: number;
    commandCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmDebugHandoffInput {
  id?: string;
  title?: string;
  status?: 'ready' | 'needs-review' | 'blocked' | 'failed' | string;
  subject?: string;
  focus?: FrontierSwarmObservabilityPointInput | FrontierSwarmObservabilityPoint;
  replayBundleIds?: readonly string[];
  divergenceReportIds?: readonly string[];
  watchpointPlanIds?: readonly string[];
  commands?: readonly (string | FrontierSwarmCommandInput)[];
  files?: readonly FrontierSwarmNamedRefInput[];
  artifacts?: readonly FrontierSwarmNamedRefInput[];
  comparisons?: readonly FrontierSwarmParityComparatorInput[];
  environment?: unknown;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmDebugHandoff {
  kind: typeof FRONTIER_SWARM_DEBUG_HANDOFF_KIND;
  version: typeof FRONTIER_SWARM_DEBUG_HANDOFF_VERSION;
  id: string;
  title: string;
  status: string;
  subject?: string;
  focus?: FrontierSwarmObservabilityPoint;
  replayBundleIds: string[];
  divergenceReportIds: string[];
  watchpointPlanIds: string[];
  commands: FrontierSwarmCommand[];
  files: FrontierSwarmNamedRef[];
  artifacts: FrontierSwarmNamedRef[];
  comparisons: FrontierSwarmParityComparator[];
  environment?: JsonObject;
  generatedAt: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmInstrumentationBudgetInput {
  id?: string;
  title?: string;
  lane?: string;
  maxEvents?: number;
  maxBytes?: number;
  maxDurationMs?: number;
  maxOverheadRatio?: number;
  captureKinds?: readonly string[];
  sampling?: { mode?: string; rate?: number; metadata?: unknown };
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmInstrumentationBudget {
  kind: typeof FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND;
  version: typeof FRONTIER_SWARM_INSTRUMENTATION_BUDGET_VERSION;
  id: string;
  title: string;
  lane?: string;
  generatedAt: number;
  maxEvents?: number;
  maxBytes?: number;
  maxDurationMs?: number;
  maxOverheadRatio?: number;
  captureKinds: string[];
  sampling: { mode: string; rate?: number; metadata?: JsonObject };
  metadata?: JsonObject;
}

export interface FrontierSwarmInstrumentationUsageInput {
  events?: number;
  bytes?: number;
  durationMs?: number;
  overheadRatio?: number;
  captureKinds?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmInstrumentationBudgetDecision {
  ok: boolean;
  budgetId: string;
  usage: {
    events: number;
    bytes: number;
    durationMs: number;
    overheadRatio: number;
    captureKinds: string[];
    metadata?: JsonObject;
  };
  violations: string[];
}

export interface FrontierSwarmBottleneckSource {
  jobId?: string;
  lane?: string;
  text?: string;
  status?: string;
  reasons?: readonly string[];
  verification?: readonly FrontierSwarmVerificationResultInput[];
  evidencePaths?: readonly string[];
  changedPaths?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmBottleneckClassification {
  kind: FrontierSwarmBottleneckKind;
  confidence: FrontierSwarmConfidence;
  reasons: string[];
  route: {
    lane?: string;
    workKind?: string;
    priority?: number;
  };
}

export interface FrontierSwarmBottleneckReportInput {
  id?: string;
  sources?: readonly (FrontierSwarmBottleneckSource | FrontierSwarmJobResultInput | FrontierSwarmMergeBundle)[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBottleneckReport {
  kind: typeof FRONTIER_SWARM_BOTTLENECK_REPORT_KIND;
  version: typeof FRONTIER_SWARM_BOTTLENECK_REPORT_VERSION;
  id: string;
  generatedAt: number;
  classifications: FrontierSwarmBottleneckClassification[];
  byKind: Record<string, FrontierSwarmBottleneckClassification[]>;
  summary: {
    sourceCount: number;
    kindCount: number;
  };
  metadata?: JsonObject;
}

export type FrontierSwarmEvidenceFacetValue = string | number | boolean;

export interface FrontierSwarmEvidenceIndexEntryInput {
  id?: string;
  jobId?: string;
  queueItemId?: string;
  lane?: string;
  topic?: string;
  path?: string;
  kind?: string;
  status?: string;
  confidence?: number;
  tags?: readonly string[];
  facets?: Record<string, FrontierSwarmEvidenceFacetValue>;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmEvidenceIndexEntry {
  id: string;
  jobId?: string;
  queueItemId?: string;
  lane?: string;
  topic?: string;
  path?: string;
  kind: string;
  status: string;
  confidence: number;
  tags: string[];
  facets: Record<string, FrontierSwarmEvidenceFacetValue>;
  generatedAt: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmEvidenceIndexInput {
  id?: string;
  run?: FrontierSwarmRun;
  entries?: readonly FrontierSwarmEvidenceIndexEntryInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmEvidenceIndex {
  kind: typeof FRONTIER_SWARM_EVIDENCE_INDEX_KIND;
  version: typeof FRONTIER_SWARM_EVIDENCE_INDEX_VERSION;
  id: string;
  runId?: string;
  generatedAt: number;
  entries: FrontierSwarmEvidenceIndexEntry[];
  byJobId: Record<string, FrontierSwarmEvidenceIndexEntry[]>;
  byTopic: Record<string, FrontierSwarmEvidenceIndexEntry[]>;
  byPath: Record<string, FrontierSwarmEvidenceIndexEntry[]>;
  summary: {
    entryCount: number;
    jobCount: number;
    topicCount: number;
    pathCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmEvidenceIndexQuery {
  jobId?: string;
  lane?: string;
  topic?: string;
  pathIncludes?: string;
  kind?: string;
  status?: string;
  tag?: string;
  minConfidence?: number;
  facet?: Record<string, FrontierSwarmEvidenceFacetValue>;
}

export interface FrontierSwarmEvidenceIndexQueryResult {
  entries: FrontierSwarmEvidenceIndexEntry[];
  summary: { entryCount: number };
}

export interface FrontierSwarmBlackboardEntryInput {
  id?: string;
  kind?: FrontierSwarmBlackboardEntryKind;
  topic?: string;
  status?: string;
  text?: string;
  lane?: string;
  jobId?: string;
  owner?: string;
  confidence?: FrontierSwarmConfidence;
  sourceIds?: readonly string[];
  paths?: readonly string[];
  tags?: readonly string[];
  supersedes?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBlackboardEntry {
  id: string;
  kind: FrontierSwarmBlackboardEntryKind;
  topic: string;
  status: string;
  text: string;
  lane?: string;
  jobId?: string;
  owner?: string;
  confidence: FrontierSwarmConfidence;
  sourceIds: string[];
  paths: string[];
  tags: string[];
  supersedes: string[];
  generatedAt: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmBlackboardInput {
  id?: string;
  runId?: string;
  entries?: readonly FrontierSwarmBlackboardEntryInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBlackboard {
  kind: typeof FRONTIER_SWARM_BLACKBOARD_KIND;
  version: typeof FRONTIER_SWARM_BLACKBOARD_VERSION;
  id: string;
  runId?: string;
  generatedAt: number;
  entries: FrontierSwarmBlackboardEntry[];
  byTopic: Record<string, FrontierSwarmBlackboardEntry[]>;
  byKind: Record<string, FrontierSwarmBlackboardEntry[]>;
  summary: {
    entryCount: number;
    topicCount: number;
    kindCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmBlackboardQuery {
  kind?: FrontierSwarmBlackboardEntryKind;
  topic?: string;
  status?: string;
  lane?: string;
  jobId?: string;
  owner?: string;
  tag?: string;
  textIncludes?: string;
}

export interface FrontierSwarmBlackboardQueryResult {
  entries: FrontierSwarmBlackboardEntry[];
  summary: { entryCount: number };
}

export interface FrontierSwarmReferenceOraclePlanInput {
  id?: string;
  serviceId?: string;
  subject?: string;
  fixtureId?: string;
  targets?: readonly { id: string; role?: string; command?: string | FrontierSwarmCommandInput; metadata?: unknown }[];
  window?: { start?: number; end?: number; focus?: string; metadata?: unknown };
  watchpoints?: readonly FrontierSwarmWatchpointInput[];
  artifactKinds?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmReferenceOraclePlan {
  kind: typeof FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_KIND;
  version: typeof FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_VERSION;
  id: string;
  serviceId?: string;
  subject?: string;
  fixtureId?: string;
  generatedAt: number;
  targets: { id: string; role: string; command?: FrontierSwarmCommand; metadata?: JsonObject }[];
  window?: { start?: number; end?: number; focus?: string; metadata?: JsonObject };
  watchpoints: FrontierSwarmWatchpoint[];
  artifactKinds: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmReferenceOracleResponseInput {
  id?: string;
  planId?: string;
  status?: FrontierSwarmParityOracleStatus;
  subject?: string;
  targetResults?: readonly { targetId: string; status?: FrontierSwarmParityOracleStatus; artifacts?: readonly FrontierSwarmNamedRefInput[]; metadata?: unknown }[];
  divergence?: FrontierSwarmDivergenceReportInput;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmReferenceOracleResponse {
  kind: typeof FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_KIND;
  version: typeof FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_VERSION;
  id: string;
  planId?: string;
  status: FrontierSwarmParityOracleStatus;
  subject?: string;
  generatedAt: number;
  targetResults: { targetId: string; status: FrontierSwarmParityOracleStatus; artifacts: FrontierSwarmNamedRef[]; metadata?: JsonObject }[];
  divergence?: FrontierSwarmDivergenceReport;
  metadata?: JsonObject;
}

export interface FrontierSwarmRoutingHintInput {
  artifactKind?: string;
  pathPattern?: string;
  lane?: string;
  bucket?: FrontierSwarmQueueOverlayStatus;
  reason?: string;
  metadata?: unknown;
}

export interface FrontierSwarmRoutingHint {
  artifactKind?: string;
  pathPattern?: string;
  lane?: string;
  bucket: FrontierSwarmQueueOverlayStatus;
  reason: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmArtifactRoutingPlanInput {
  id?: string;
  bundles?: readonly FrontierSwarmMergeBundle[];
  artifacts?: readonly FrontierSwarmNamedRefInput[];
  hints?: readonly FrontierSwarmRoutingHintInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmArtifactRoutingPlan {
  kind: typeof FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_KIND;
  version: typeof FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_VERSION;
  id: string;
  generatedAt: number;
  routes: { artifact: FrontierSwarmNamedRef; bucket: FrontierSwarmQueueOverlayStatus; lane?: string; reasons: string[] }[];
  byBucket: Record<string, string[]>;
  summary: { routeCount: number; bucketCount: number };
  metadata?: JsonObject;
}

export interface FrontierSwarmSchedulerRecommendationsInput {
  id?: string;
  schedule: FrontierSwarmSchedule;
  mergeIndex?: FrontierSwarmMergeIndex;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmSchedulerRecommendation {
  id: string;
  reason: string;
  jobIds: string[];
  resource?: string;
  lane?: string;
  action: string;
  priority: number;
}

export interface FrontierSwarmSchedulerRecommendations {
  kind: typeof FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_KIND;
  version: typeof FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_VERSION;
  id: string;
  scheduleId: string;
  generatedAt: number;
  recommendations: FrontierSwarmSchedulerRecommendation[];
  summary: { recommendationCount: number };
  metadata?: JsonObject;
}

export interface FrontierSwarmFixtureInput {
  id: string;
  title?: string;
  description?: string;
  state?: unknown;
  artifacts?: readonly FrontierSwarmNamedRefInput[];
  setupCommands?: readonly (string | FrontierSwarmCommandInput)[];
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmFixture {
  id: string;
  title: string;
  description?: string;
  state?: JsonValue;
  artifacts: FrontierSwarmNamedRef[];
  setupCommands: FrontierSwarmCommand[];
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmFixtureCatalogInput {
  id?: string;
  fixtures?: readonly FrontierSwarmFixtureInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmFixtureCatalog {
  kind: typeof FRONTIER_SWARM_FIXTURE_CATALOG_KIND;
  version: typeof FRONTIER_SWARM_FIXTURE_CATALOG_VERSION;
  id: string;
  generatedAt: number;
  fixtures: FrontierSwarmFixture[];
  byTag: Record<string, string[]>;
  summary: { fixtureCount: number; tagCount: number };
  metadata?: JsonObject;
}

export interface FrontierSwarmProgressItemInput {
  id: string;
  surface?: string;
  status?: FrontierSwarmProgressStatus;
  evidencePaths?: readonly string[];
  blockers?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmProgressItem {
  id: string;
  surface?: string;
  status: FrontierSwarmProgressStatus;
  evidencePaths: string[];
  blockers: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmProgressModelInput {
  id?: string;
  items?: readonly FrontierSwarmProgressItemInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmProgressModel {
  kind: typeof FRONTIER_SWARM_PROGRESS_MODEL_KIND;
  version: typeof FRONTIER_SWARM_PROGRESS_MODEL_VERSION;
  id: string;
  generatedAt: number;
  items: FrontierSwarmProgressItem[];
  byStatus: Record<string, string[]>;
  summary: { itemCount: number; acceptedCount: number; blockedCount: number };
  metadata?: JsonObject;
}

export interface FrontierSwarmAutoReviewFindingInput {
  id?: string;
  jobId?: string;
  kind?: FrontierSwarmAutoReviewFindingKind;
  severity?: FrontierSwarmDivergenceSeverity;
  message: string;
  paths?: readonly string[];
  evidencePaths?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmAutoReviewFinding {
  id: string;
  jobId?: string;
  kind: FrontierSwarmAutoReviewFindingKind;
  severity: FrontierSwarmDivergenceSeverity;
  message: string;
  paths: string[];
  evidencePaths: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmAutoReviewReportInput {
  id?: string;
  bundles?: readonly FrontierSwarmMergeBundle[];
  findings?: readonly FrontierSwarmAutoReviewFindingInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmAutoReviewReport {
  kind: typeof FRONTIER_SWARM_AUTO_REVIEW_REPORT_KIND;
  version: typeof FRONTIER_SWARM_AUTO_REVIEW_REPORT_VERSION;
  id: string;
  generatedAt: number;
  findings: FrontierSwarmAutoReviewFinding[];
  byKind: Record<string, FrontierSwarmAutoReviewFinding[]>;
  summary: { findingCount: number; highSeverityCount: number };
  metadata?: JsonObject;
}

export interface FrontierSwarmRebaseReportInput {
  id?: string;
  currentHead?: string;
  mergeIndex?: FrontierSwarmMergeIndex;
  bundles?: readonly FrontierSwarmMergeBundle[];
  entries?: readonly { jobId: string; status?: FrontierSwarmRebaseStatus; reasons?: readonly string[]; metadata?: unknown }[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmRebaseReport {
  kind: typeof FRONTIER_SWARM_REBASE_REPORT_KIND;
  version: typeof FRONTIER_SWARM_REBASE_REPORT_VERSION;
  id: string;
  currentHead?: string;
  generatedAt: number;
  entries: { jobId: string; status: FrontierSwarmRebaseStatus; reasons: string[]; metadata?: JsonObject }[];
  byStatus: Record<string, string[]>;
  summary: { entryCount: number; cleanCount: number; conflictCount: number; staleCount: number };
  metadata?: JsonObject;
}

export interface FrontierSwarmUsageGovernorInput {
  id?: string;
  maxWorkers?: number;
  maxTokensByLane?: Record<string, number>;
  maxCostUsd?: number;
  retryBudget?: number;
  stopConditions?: readonly string[];
  preferStaticWhenLowBudget?: boolean;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmUsageGovernor {
  kind: typeof FRONTIER_SWARM_USAGE_GOVERNOR_KIND;
  version: typeof FRONTIER_SWARM_USAGE_GOVERNOR_VERSION;
  id: string;
  generatedAt: number;
  maxWorkers?: number;
  maxTokensByLane: Record<string, number>;
  maxCostUsd?: number;
  retryBudget: number;
  stopConditions: string[];
  preferStaticWhenLowBudget: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmUsageGovernorDecision {
  ok: boolean;
  reasons: string[];
  recommendedMaxWorkers?: number;
  preferStatic: boolean;
}

export interface FrontierSwarmLanePlaybookInput {
  id?: string;
  lane: string;
  title?: string;
  successfulBundles?: readonly FrontierSwarmMergeBundle[];
  notes?: readonly string[];
  commands?: readonly (string | FrontierSwarmCommandInput)[];
  avoidInvestigating?: readonly string[];
  evidencePatterns?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmLanePlaybook {
  kind: typeof FRONTIER_SWARM_LANE_PLAYBOOK_KIND;
  version: typeof FRONTIER_SWARM_LANE_PLAYBOOK_VERSION;
  id: string;
  lane: string;
  title: string;
  generatedAt: number;
  notes: string[];
  commands: FrontierSwarmCommand[];
  avoidInvestigating: string[];
  evidencePatterns: string[];
  successfulJobIds: string[];
  hotPaths: string[];
  changedRegions: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmPatchStackPlanInput {
  id?: string;
  index: FrontierSwarmMergeIndex;
  maxStackSize?: number;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmPatchStackPlan {
  kind: typeof FRONTIER_SWARM_PATCH_STACK_PLAN_KIND;
  version: typeof FRONTIER_SWARM_PATCH_STACK_PLAN_VERSION;
  id: string;
  mergeIndexId: string;
  generatedAt: number;
  stacks: FrontierSwarmPatchStack[];
  summary: {
    stackCount: number;
    jobCount: number;
    conflictedStackCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmPatchStack {
  id: string;
  title: string;
  lane?: string;
  jobIds: string[];
  changedPaths: string[];
  changedRegions: string[];
  riskLevels: string[];
  dispositions: string[];
  conflicts: FrontierSwarmMergeConflict[];
  gateHints: string[];
}

export type FrontierSwarmMergeQueueScopeKind =
  | 'root'
  | 'lane'
  | 'semantic-region'
  | 'path'
  | 'custom'
  | string;

export type FrontierSwarmMergeQueueAssignmentAction =
  | 'apply-local'
  | 'queue-local'
  | 'promote'
  | 'rerun'
  | 'reject'
  | 'record-only'
  | 'block'
  | string;

export interface FrontierSwarmMergeAdmissionPressure {
  applyLocalCount: number;
  applyLocalQueueItemCount: number;
  queueLocalCount: number;
  queueLocalQueueItemCount: number;
  promoteUpwardCount: number;
  promoteUpwardQueueItemCount: number;
  rerunCount: number;
  rerunQueueItemCount: number;
  rejectedCount: number;
  rejectedQueueItemCount: number;
  recordOnlyCount: number;
  recordOnlyQueueItemCount: number;
  trueBlockCount: number;
  trueBlockQueueItemCount: number;
}

export interface FrontierSwarmMergeQueueScopeInput {
  id: string;
  kind?: FrontierSwarmMergeQueueScopeKind;
  parentId?: string;
  title?: string;
  lane?: string;
  changedPaths?: readonly string[];
  changedRegions?: readonly string[];
  leaseKey?: string;
  metadata?: unknown;
}

export interface FrontierSwarmMergeQueueScope {
  id: string;
  kind: FrontierSwarmMergeQueueScopeKind;
  parentId?: string;
  title: string;
  lane?: string;
  changedPaths: string[];
  changedRegions: string[];
  leaseKey: string;
  jobIds: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmMergeQueueRetrySlice {
  id: string;
  scopeId: string;
  kind: FrontierSwarmMergeQueueScopeKind;
  parentScopeIds: string[];
  leaseKey: string;
  lane?: string;
  changedPaths: string[];
  changedRegions: string[];
  reasons: string[];
}

export interface FrontierSwarmHierarchicalMergeQueueInput {
  id?: string;
  index: FrontierSwarmMergeIndex;
  admission?: FrontierSwarmMergeAdmission;
  rootScopeId?: string;
  scopes?: readonly FrontierSwarmMergeQueueScopeInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmHierarchicalMergeQueue {
  kind: typeof FRONTIER_SWARM_HIERARCHICAL_MERGE_QUEUE_KIND;
  version: typeof FRONTIER_SWARM_HIERARCHICAL_MERGE_QUEUE_VERSION;
  id: string;
  mergeIndexId: string;
  admissionId?: string;
  generatedAt: number;
  rootScopeId: string;
  scopes: FrontierSwarmMergeQueueScope[];
  assignments: FrontierSwarmMergeQueueAssignment[];
  promotions: FrontierSwarmMergeQueuePromotion[];
  byScope: Record<string, string[]>;
  byAction: Record<string, string[]>;
  summary: {
    scopeCount: number;
    assignmentCount: number;
    applyLocalCount: number;
    queueLocalCount: number;
    promoteCount: number;
    rerunCount: number;
    rejectCount: number;
    blockCount: number;
    recordOnlyCount: number;
    admissionPressure: FrontierSwarmMergeAdmissionPressure;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmMergeQueueAssignment {
  jobId: string;
  taskId?: string;
  lane?: string;
  title?: string;
  queueItemIds: string[];
  scopeId: string;
  parentScopeIds: string[];
  action: FrontierSwarmMergeQueueAssignmentAction;
  reasons: string[];
  admitted: boolean;
  riskLevel: FrontierSwarmRiskLevel;
  disposition: FrontierSwarmMergeDisposition;
  mergeReadiness: FrontierSwarmMergeReadiness;
  changedPaths: string[];
  changedRegions: string[];
  conflictingJobIds: string[];
  leaseKey: string;
  requiredLeaseScopeIds?: string[];
  requiredLeaseKeys?: string[];
  promoteToScopeId?: string;
  retrySlices?: FrontierSwarmMergeQueueRetrySlice[];
  semanticSliceScopeIds?: string[];
  semanticSliceLeaseKeys?: string[];
  parentDecisionRegions?: string[];
  unknownRegions?: string[];
}

export interface FrontierSwarmMergeQueuePromotion {
  jobId: string;
  fromScopeId: string;
  toScopeId: string;
  reasons: string[];
}

interface FrontierSwarmMergeQueueEntryScopes {
  leafScope: FrontierSwarmMergeQueueScope;
  scopeIds: string[];
  semanticScopeIds: string[];
  pathScopeIds: string[];
  unknownRegions: string[];
  parentDecisionRegions: string[];
  retrySlices: FrontierSwarmMergeQueueRetrySlice[];
  reasons: string[];
}

export type FrontierSwarmCoordinatorAgentDrainDecision =
  | 'applied'
  | 'queued'
  | 'escalated'
  | 'rerun'
  | 'rejected'
  | 'recorded'
  | 'blocked'
  | string;

export type FrontierSwarmCoordinatorAgentDrainClassification = 'terminal' | 'non-terminal' | string;

export interface FrontierSwarmCoordinatorAgentDrainWorkInput {
  id?: string;
  queue: FrontierSwarmHierarchicalMergeQueue;
  coordinatorId?: string;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmCoordinatorAgentDrainWorkConsumerSummary {
  leaseCount: number;
  assignmentCount: number;
  activeAssignmentCount: number;
  terminalCount: number;
  promotedWorkCount: number;
  blockerCount: number;
  queueItemCount: number;
  activeQueueItemCount: number;
  terminalQueueItemCount: number;
  promotedQueueItemCount: number;
  blockerQueueItemCount: number;
  admissionPressure: FrontierSwarmMergeAdmissionPressure;
  rootQueueSelectionPressure: FrontierSwarmCoordinatorAgentRootQueueSelectionPressure;
}

export interface FrontierSwarmCoordinatorAgentRootQueueSelectionPressure {
  rootQueueId: string;
  leaseId?: string;
  leaseScope?: string;
  promotedWorkCount: number;
  promotedQueueItemCount: number;
  promotedJobIds: string[];
  promotedQueueItemIds: string[];
  bySourceQueueId: Record<string, string[]>;
  byReason: Record<string, string[]>;
  admissionPressure: FrontierSwarmMergeAdmissionPressure;
}

export interface FrontierSwarmCoordinatorAgentDrainWork {
  kind: typeof FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_KIND;
  version: typeof FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_VERSION;
  id: string;
  queueId: string;
  mergeIndexId: string;
  admissionId?: string;
  coordinatorId?: string;
  generatedAt: number;
  rootQueueId: string;
  leases: FrontierSwarmCoordinatorAgentDrainLease[];
  assignments: FrontierSwarmCoordinatorAgentDrainAssignment[];
  activeAssignments: FrontierSwarmCoordinatorAgentDrainAssignment[];
  terminalDecisions: FrontierSwarmCoordinatorAgentDrainTerminalDecision[];
  promotedWork: FrontierSwarmCoordinatorAgentPromotedWork[];
  blockers: FrontierSwarmCoordinatorAgentDrainTerminalDecision[];
  byAction: Record<string, string[]>;
  byDecision: Record<string, string[]>;
  byClassification: Record<string, string[]>;
  byQueueId: Record<string, string[]>;
  byLeaseScope: Record<string, string[]>;
  summary: {
    leaseCount: number;
    assignmentCount: number;
    activeAssignmentCount?: number;
    terminalCount: number;
    nonTerminalCount: number;
    promotedWorkCount: number;
    blockerCount?: number;
    queueItemCount?: number;
    activeQueueItemCount?: number;
    terminalQueueItemCount?: number;
    promotedQueueItemCount?: number;
    blockerQueueItemCount?: number;
    appliedCount: number;
    queuedCount: number;
    escalatedCount: number;
    rerunCount: number;
    rejectedCount: number;
    recordedCount: number;
    blockedCount: number;
    admissionPressure: FrontierSwarmMergeAdmissionPressure;
    rootQueueSelectionPressure: FrontierSwarmCoordinatorAgentRootQueueSelectionPressure;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmCoordinatorAgentDrainLease {
  id: string;
  queueId: string;
  scopeId: string;
  scopeKind: FrontierSwarmMergeQueueScopeKind;
  title: string;
  leaseScope: string;
  leaseKey: string;
  parentQueueId?: string;
  lane?: string;
  changedPaths: string[];
  changedRegions: string[];
  jobIds: string[];
  actions: Record<string, string[]>;
  metadata?: JsonObject;
}

export interface FrontierSwarmCoordinatorAgentDrainAssignment {
  id: string;
  jobId: string;
  taskId?: string;
  lane?: string;
  title?: string;
  queueItemIds: string[];
  queueId: string;
  queueKind: FrontierSwarmMergeQueueScopeKind;
  rootQueueId: string;
  parentQueueIds: string[];
  parentQueueId?: string;
  promoteToQueueId?: string;
  leaseId: string;
  leaseScope: string;
  assignedAction: FrontierSwarmMergeQueueAssignmentAction;
  decision: FrontierSwarmCoordinatorAgentDrainDecision;
  classification: FrontierSwarmCoordinatorAgentDrainClassification;
  terminal: boolean;
  reasons: string[];
  admitted: boolean;
  riskLevel: FrontierSwarmRiskLevel;
  disposition: FrontierSwarmMergeDisposition;
  mergeReadiness: FrontierSwarmMergeReadiness;
  changedPaths: string[];
  changedRegions: string[];
  conflictingJobIds: string[];
  retrySlices?: FrontierSwarmMergeQueueRetrySlice[];
  semanticSliceScopeIds?: string[];
  semanticSliceLeaseKeys?: string[];
  requiredLeaseScopeIds?: string[];
  requiredLeaseKeys?: string[];
  parentDecisionRegions?: string[];
  unknownRegions?: string[];
}

export interface FrontierSwarmCoordinatorAgentDrainTerminalDecision {
  id: string;
  jobId: string;
  queueItemIds: string[];
  queueId: string;
  leaseId: string;
  leaseScope: string;
  assignedAction: FrontierSwarmMergeQueueAssignmentAction;
  decision: FrontierSwarmCoordinatorAgentDrainDecision;
  classification: 'terminal';
  terminal: true;
  reasons: string[];
  retrySlices?: FrontierSwarmMergeQueueRetrySlice[];
  semanticSliceScopeIds?: string[];
  semanticSliceLeaseKeys?: string[];
  requiredLeaseScopeIds?: string[];
  requiredLeaseKeys?: string[];
  parentDecisionRegions?: string[];
  unknownRegions?: string[];
}

export interface FrontierSwarmCoordinatorAgentPromotedWork {
  id: string;
  jobId: string;
  taskId?: string;
  lane?: string;
  queueItemIds: string[];
  fromQueueId: string;
  parentQueueId: string;
  leaseId: string;
  leaseScope: string;
  assignedAction: FrontierSwarmMergeQueueAssignmentAction;
  decision: FrontierSwarmCoordinatorAgentDrainDecision;
  classification: 'non-terminal';
  terminal: false;
  reasons: string[];
  requiredLeaseScopeIds?: string[];
  requiredLeaseKeys?: string[];
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
const DEFAULT_SWARM_EVENT_TYPES = [
  'swarm.started',
  'swarm.finished',
  'agent.scheduled',
  'agent.finished',
  'agent.handoff',
  'agent.blocked',
  'agent.ownership-request',
  'agent.evidence',
  'review.requested',
  'review.completed',
  'merge.proposed'
];

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
    metadata: priorityPolicyMetadata(options.metadata, jobs)
  };
}

export function createSwarmTaskSelection(
  manifestInput: FrontierSwarmManifest | FrontierSwarmManifestInput,
  taskInput: readonly FrontierSwarmTaskInput[] | FrontierSwarmTaskSetInput | readonly FrontierSwarmTask[],
  options: FrontierSwarmTaskSelectionInput = {}
): FrontierSwarmTaskSelection {
  const manifest = compileSwarm(manifestInput).manifest;
  const tasks = normalizeTaskList(taskInput);
  const lanes = new Set(options.lanes ?? []);
  const layers = new Set(options.layers ?? []);
  const statuses = new Set(options.statuses ?? []);
  const workKinds = new Set(options.workKinds ?? []);
  const selectors = (options.selectors ?? []).map((selector) => selector.toLowerCase());
  const completed = new Set(manifest.policy.completedStatuses);
  const limit = options.limit === undefined ? tasks.length : Math.max(0, Math.floor(options.limit));
  const candidates = tasks
    .filter((task) => !task.lane || manifest.lanes.some((lane) => lane.id === task.lane))
    .filter((task) => lanes.size === 0 || (task.lane !== undefined && lanes.has(task.lane)))
    .filter((task) => layers.size === 0 || taskLayer(manifest, task) !== undefined && layers.has(taskLayer(manifest, task) as string))
    .filter((task) => statuses.size === 0 || statuses.has(task.status))
    .filter((task) => workKinds.size === 0 || workKinds.has(task.workKind))
    .filter((task) => options.includeCompleted || !completed.has(task.status))
    .filter((task) => selectors.length === 0 || selectors.some((selector) => searchableTask(task).includes(selector)))
    .map((task) => createSelectionEntry(manifest, task, options.priority))
    .filter((entry) => options.includeOwnershipWarnings || entry.ownershipWarnings.length === 0)
    .sort((left, right) => (
      left.selectionPriority - right.selectionPriority
      || left.task.priority - right.task.priority
      || left.task.id.localeCompare(right.task.id)
    ));
  const ordered = options.spreadLanes ? roundRobinSelectionByLane(candidates) : candidates;
  const entries = ordered.slice(0, limit).map((entry, index) => {
    if (!options.assignSelectionPriority) return entry;
    return { ...entry, task: { ...entry.task, priority: index } };
  });
  return {
    tasks: entries.map((entry) => entry.task),
    entries,
    summary: summarizeTaskSelection(entries)
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

export function createSwarmMailbox(input: FrontierSwarmMailboxInput = {}): FrontierSwarmMailbox {
  const scope = input.scope ?? (input.lane ? 'lane' : input.jobId ? 'job' : 'global');
  const eventTypes = uniqueStrings(input.eventTypes ?? DEFAULT_SWARM_EVENT_TYPES);
  return {
    kind: FRONTIER_SWARM_MAILBOX_KIND,
    version: FRONTIER_SWARM_MAILBOX_VERSION,
    id: input.id ?? 'swarm-mailbox:' + stableHash([input.runId, scope, input.lane, input.jobId, input.path, eventTypes]),
    ...(input.runId ? { runId: input.runId } : {}),
    scope,
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.path ? { path: input.path } : {}),
    eventTypes,
    appendOnly: input.appendOnly ?? true,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmEventStream(input: FrontierSwarmEventStreamInput = {}): FrontierSwarmEventStream {
  const laneIds = uniqueStrings((input.lanes ?? []).map(readLaneId));
  const eventTypes = uniqueStrings(input.eventTypes ?? DEFAULT_SWARM_EVENT_TYPES);
  const appendOnly = input.appendOnly ?? true;
  const global = createSwarmMailbox({
    runId: input.runId,
    scope: 'global',
    path: input.root ? joinPathParts(input.root, 'global.jsonl') : undefined,
    eventTypes,
    appendOnly
  });
  const lanes = Object.fromEntries(laneIds.map((lane) => [lane, createSwarmMailbox({
    runId: input.runId,
    scope: 'lane',
    lane,
    path: input.root ? joinPathParts(input.root, 'lanes', `${lane}.jsonl`) : undefined,
    eventTypes,
    appendOnly
  })]));
  return {
    kind: FRONTIER_SWARM_EVENT_STREAM_KIND,
    version: FRONTIER_SWARM_EVENT_STREAM_VERSION,
    id: input.id ?? 'swarm-event-stream:' + stableHash([input.runId, input.root, laneIds, eventTypes]),
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.root ? { root: input.root } : {}),
    appendOnly,
    global,
    lanes,
    eventTypes,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {}),
    summary: {
      mailboxCount: 1 + laneIds.length,
      laneCount: laneIds.length,
      eventTypeCount: eventTypes.length
    }
  };
}

export function routeSwarmEventToMailboxes(
  stream: FrontierSwarmEventStream,
  eventInput: FrontierSwarmEvent | FrontierSwarmEventInput
): FrontierSwarmMailbox[] {
  const event = isSwarmEvent(eventInput) ? eventInput : normalizeEvent(eventInput);
  const mailboxes = [stream.global];
  if (event.lane && stream.lanes[event.lane]) mailboxes.push(stream.lanes[event.lane]);
  return mailboxes;
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

export function resolveSwarmChangedRegions(job: FrontierSwarmJob, changedPaths: readonly string[]): string[] {
  const changed = uniqueStrings(changedPaths);
  const regions = new Set(job.changedRegions);
  for (const region of job.ownershipRegions) {
    if (region.globs.some((glob) => changed.some((file) => matchesGlob(file, glob)))) regions.add(region.id);
    for (const selector of region.selectors) {
      if (changed.includes(selector)) regions.add(region.id);
    }
  }
  return Array.from(regions).sort();
}

export function classifySwarmMergeReadiness(result: FrontierSwarmJobResultInput | FrontierSwarmJobResult): FrontierSwarmMergeReadiness {
  if (result.mergeReadiness) return result.mergeReadiness;
  if (result.status === 'blocked') return 'blocked';
  if (result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0) return 'rejected';
  const changedPaths = result.changedPaths ?? [];
  if (changedPaths.length === 0) return 'discovery-only';
  const ownershipViolations = result.ownershipViolations ?? [];
  if (ownershipViolations.length) return 'rejected';
  const verification = result.verification ?? [];
  const failedRequired = verification.some((entry) => entry.required !== false && entry.status !== 0);
  if (failedRequired) return 'patch-candidate';
  return verification.length > 0 || result.status === 'verified' ? 'verified-patch' : 'patch-candidate';
}

export function classifySwarmMergeDisposition(
  result: FrontierSwarmJobResultInput | FrontierSwarmJobResult,
  input: { staleAgainstHead?: boolean } = {}
): FrontierSwarmMergeDisposition {
  if (result.mergeDisposition) return result.mergeDisposition;
  if (input.staleAgainstHead) return 'stale-against-head';
  const readiness = classifySwarmMergeReadiness(result);
  if (readiness === 'discovery-only') return 'discovery-only';
  if (readiness === 'blocked') return 'blocked';
  if (readiness === 'rejected') return 'rejected';
  if (readiness === 'verified-patch') return 'auto-mergeable';
  return 'needs-port';
}

export function createSwarmMergeBundle(input: FrontierSwarmMergeBundleInput): FrontierSwarmMergeBundle {
  const generatedAt = input.generatedAt ?? Date.now();
  const result = isSwarmJobResult(input.result) ? cloneJsonValue(input.result) as FrontierSwarmJobResult : normalizeResult(input.result);
  const job = input.job;
  const changedPaths = uniqueStrings(result.changedPaths);
  const changedRegions = uniqueStrings([
    ...result.changedRegions,
    ...(job ? resolveSwarmChangedRegions(job, changedPaths) : [])
  ]);
  const evidencePaths = uniqueStrings([...(result.evidencePaths ?? []), ...(input.evidencePaths ?? [])]);
  const queueItemIds = uniqueStrings([...(result.queueItemIds ?? []), ...(input.queueItemIds ?? []), ...(job ? [job.taskId] : [])]);
  const disposition = input.disposition ?? classifySwarmMergeDisposition(result, { staleAgainstHead: input.staleAgainstHead });
  const commandsPassed = result.verification.filter((entry) => entry.status === 0 || entry.required === false && entry.status === undefined);
  const commandsFailed = result.verification.filter((entry) => entry.status !== undefined && entry.status !== 0 && entry.required !== false);
  const ownedFilesTouched = job ? changedPaths.filter((file) => job.allowedWrites.some((glob) => matchesGlob(file, glob))) : changedPaths;
  const reasons = mergeBundleReasons(result, disposition, input.staleAgainstHead ?? false);
  return {
    kind: FRONTIER_SWARM_MERGE_BUNDLE_KIND,
    version: FRONTIER_SWARM_MERGE_BUNDLE_VERSION,
    id: input.id ?? 'swarm-merge-bundle:' + stableHash([input.runId, input.planId, result.jobId, changedPaths, changedRegions, disposition, generatedAt]),
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.planId ? { planId: input.planId } : {}),
    jobId: result.jobId,
    ...(job ? { taskId: job.taskId, lane: job.lane, title: job.title } : {}),
    generatedAt,
    status: result.status,
    mergeReadiness: result.mergeReadiness,
    disposition,
    riskLevel: input.riskLevel ?? result.riskLevel ?? inferMergeRisk(result, disposition),
    autoMergeable: disposition === 'auto-mergeable' && reasons.length === 0,
    changedPaths,
    changedRegions,
    ownedFilesTouched,
    allowedWrites: job ? [...job.allowedWrites] : [],
    ownershipViolations: [...result.ownershipViolations],
    ...(input.patchPath ?? result.patchPath ? { patchPath: input.patchPath ?? result.patchPath } : {}),
    ...(input.patchHash ? { patchHash: input.patchHash } : {}),
    evidencePaths,
    commandsPassed,
    commandsFailed,
    queueItemIds,
    ...(input.branchName ? { branchName: input.branchName } : {}),
    ...(input.commit ? { commit: input.commit } : {}),
    staleAgainstHead: input.staleAgainstHead ?? false,
    reasons,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmQueueOverlay(input: FrontierSwarmQueueOverlayInput = {}): FrontierSwarmQueueOverlay {
  const generatedAt = input.generatedAt ?? Date.now();
  const entries: FrontierSwarmQueueOverlayEntry[] = [];
  for (const bundle of input.bundles ?? []) {
    const status = queueOverlayStatusFromBundle(bundle);
    const queueItemIds = bundle.queueItemIds.length ? bundle.queueItemIds : [bundle.taskId ?? bundle.jobId];
    for (const queueItemId of queueItemIds) {
      entries.push({
        queueItemId,
        jobId: bundle.jobId,
        status,
        mergeReadiness: bundle.mergeReadiness,
        disposition: bundle.disposition,
        riskLevel: bundle.riskLevel,
        ...(bundle.patchPath ? { patchPath: bundle.patchPath } : {}),
        evidencePaths: [...bundle.evidencePaths],
        changedPaths: [...bundle.changedPaths],
        changedRegions: [...bundle.changedRegions],
        reasons: [...bundle.reasons],
        generatedAt: bundle.generatedAt
      });
    }
  }
  for (const raw of input.results ?? []) {
    const result = isSwarmJobResult(raw) ? cloneJsonValue(raw) as FrontierSwarmJobResult : normalizeResult(raw);
    const queueItemIds = result.queueItemIds.length ? result.queueItemIds : [result.jobId];
    for (const queueItemId of queueItemIds) {
      entries.push({
        queueItemId,
        jobId: result.jobId,
        status: queueOverlayStatusFromResult(result),
        mergeReadiness: result.mergeReadiness,
        disposition: result.mergeDisposition,
        riskLevel: result.riskLevel,
        ...(result.patchPath ? { patchPath: result.patchPath } : {}),
        evidencePaths: [...result.evidencePaths],
        changedPaths: [...result.changedPaths],
        changedRegions: [...result.changedRegions],
        reasons: result.error ? [result.error] : [],
        generatedAt
      });
    }
  }
  const byQueueItemId = groupOverlayEntries(entries);
  return {
    kind: FRONTIER_SWARM_QUEUE_OVERLAY_KIND,
    version: FRONTIER_SWARM_QUEUE_OVERLAY_VERSION,
    id: input.id ?? 'swarm-queue-overlay:' + stableHash([input.runId, entries, generatedAt]),
    ...(input.runId ? { runId: input.runId } : {}),
    generatedAt,
    entries,
    byQueueItemId,
    summary: {
      entryCount: entries.length,
      queueItemCount: Object.keys(byQueueItemId).length,
      readyToApplyCount: entries.filter((entry) => entry.status === 'ready-to-apply').length,
      needsHumanPortCount: entries.filter((entry) => entry.status === 'needs-human-port').length,
      failedEvidenceCount: entries.filter((entry) => entry.status === 'failed-evidence').length,
      staleAgainstHeadCount: entries.filter((entry) => entry.status === 'stale-against-head').length,
      discoveryOnlyCount: entries.filter((entry) => entry.status === 'discovery-only').length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function deriveSwarmQueueStatus(input: FrontierSwarmDerivedQueueStatusInput): FrontierSwarmDerivedQueueStatus {
  const generatedAt = input.generatedAt ?? Date.now();
  const latestByQueueItem = new Map<string, FrontierSwarmQueueOverlayEntry>();
  for (const overlay of input.overlays ?? []) {
    for (const entry of overlay.entries) {
      const existing = latestByQueueItem.get(entry.queueItemId);
      if (!existing || entry.generatedAt >= existing.generatedAt) latestByQueueItem.set(entry.queueItemId, entry);
    }
  }
  const jobs = input.snapshot.jobs.map((job) => {
    const overlay = latestByQueueItem.get(job.taskId ?? job.jobId) ?? latestByQueueItem.get(job.jobId);
    if (!overlay) return cloneJsonValue(job) as FrontierSwarmQueueJob;
    return {
      ...cloneJsonValue(job) as FrontierSwarmQueueJob,
      status: queueJobStatusFromOverlay(overlay),
      lastError: overlay.status === 'failed-evidence' || overlay.status === 'stale-against-head' ? overlay.reasons.join(', ') : job.lastError,
      metadata: toJsonObject({
        ...(job.metadata ?? {}),
        overlayStatus: overlay.status,
        mergeDisposition: overlay.disposition,
        mergeReadiness: overlay.mergeReadiness,
        evidencePaths: overlay.evidencePaths
      })
    };
  });
  const byStatus = groupIds(jobs, (job) => job.status);
  return {
    generatedAt,
    jobs,
    byStatus,
    summary: {
      jobCount: jobs.length,
      leaseCount: input.snapshot.leases.length,
      readyCount: byStatus.ready?.length ?? 0,
      leasedCount: byStatus.leased?.length ?? 0,
      completedCount: byStatus.completed?.length ?? 0,
      failedCount: byStatus.failed?.length ?? 0,
      deadLetterCount: byStatus['dead-letter']?.length ?? 0
    }
  };
}

export function createSwarmMergeIndex(input: FrontierSwarmMergeIndexInput): FrontierSwarmMergeIndex {
  const generatedAt = input.generatedAt ?? Date.now();
  const entries: FrontierSwarmMergeIndexEntry[] = input.bundles.map((bundle) => {
    const patchStatus = input.patchStatuses?.[bundle.jobId] ?? (bundle.staleAgainstHead ? 'stale' : bundle.patchPath ? 'unknown' : 'missing');
    const staleAgainstHead = bundle.staleAgainstHead || patchStatus === 'stale' || patchStatus === 'failed-check';
    return {
      jobId: bundle.jobId,
      ...(bundle.taskId ? { taskId: bundle.taskId } : {}),
      ...(bundle.lane ? { lane: bundle.lane } : {}),
      ...(bundle.title ? { title: bundle.title } : {}),
      status: bundle.status,
      mergeReadiness: bundle.mergeReadiness,
      disposition: staleAgainstHead ? 'stale-against-head' : bundle.disposition,
      riskLevel: bundle.riskLevel,
      patchStatus,
      staleAgainstHead,
      autoMergeable: bundle.autoMergeable && !staleAgainstHead,
      changedPaths: [...bundle.changedPaths],
      changedRegions: [...bundle.changedRegions],
      conflictKeys: mergeIndexConflictKeys(bundle),
      conflictingJobIds: [],
      ownedFilesTouched: [...bundle.ownedFilesTouched],
      ownershipViolations: [...bundle.ownershipViolations],
      ...(bundle.patchPath ? { patchPath: bundle.patchPath } : {}),
      ...(bundle.patchHash ? { patchHash: bundle.patchHash } : {}),
      evidencePaths: [...bundle.evidencePaths],
      queueItemIds: [...bundle.queueItemIds],
      reasons: uniqueStrings([...bundle.reasons, ...(staleAgainstHead ? ['stale-against-head'] : [])]),
      generatedAt: bundle.generatedAt
    };
  });
  const conflicts = createMergeIndexConflicts(entries);
  const conflictsByJob = new Map<string, Set<string>>();
  for (const conflict of conflicts) {
    for (const jobId of conflict.jobIds) {
      const set = conflictsByJob.get(jobId) ?? new Set<string>();
      for (const other of conflict.jobIds) if (other !== jobId) set.add(other);
      conflictsByJob.set(jobId, set);
    }
  }
  const indexed = entries.map((entry) => ({
    ...entry,
    conflictingJobIds: Array.from(conflictsByJob.get(entry.jobId) ?? []).sort()
  }));
  const byDisposition = groupJobIdsBy(indexed, (entry) => entry.disposition);
  const byPath = groupJobIdsByMany(indexed, (entry) => entry.changedPaths);
  const byRegion = groupJobIdsByMany(indexed, (entry) => entry.changedRegions);
  return {
    kind: FRONTIER_SWARM_MERGE_INDEX_KIND,
    version: FRONTIER_SWARM_MERGE_INDEX_VERSION,
    id: input.id ?? 'swarm-merge-index:' + stableHash([input.runId, input.planId, indexed, conflicts, generatedAt]),
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.planId ? { planId: input.planId } : {}),
    generatedAt,
    entries: indexed,
    conflicts,
    byDisposition,
    byPath,
    byRegion,
    summary: {
      entryCount: indexed.length,
      readyToApplyCount: indexed.filter((entry) => entry.disposition === 'auto-mergeable' && entry.autoMergeable && !entry.conflictingJobIds.length).length,
      needsHumanPortCount: indexed.filter((entry) => entry.disposition === 'needs-port').length,
      failedEvidenceCount: indexed.filter((entry) => entry.disposition === 'rejected' || entry.disposition === 'blocked' || entry.ownershipViolations.length > 0).length,
      staleAgainstHeadCount: indexed.filter((entry) => entry.staleAgainstHead || entry.disposition === 'stale-against-head').length,
      discoveryOnlyCount: indexed.filter((entry) => entry.disposition === 'discovery-only').length,
      conflictCount: conflicts.length,
      conflictedJobCount: conflictsByJob.size
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function checkSwarmRegionOwnership(job: FrontierSwarmJob, input: FrontierSwarmRegionOwnershipInput = {}): FrontierSwarmRegionOwnershipReport {
  const changedPaths = uniqueStrings(input.changedPaths ?? []);
  const resolvedRegions = resolveSwarmChangedRegions(job, changedPaths);
  const changedRegions = uniqueStrings([...(input.changedRegions ?? []), ...resolvedRegions]);
  const ownedRegions = new Set(job.ownedRegions);
  const regionViolations = changedRegions.filter((region) => !ownedRegions.has(region));
  const classifiedPaths = new Set<string>();
  for (const region of job.ownershipRegions) {
    for (const file of changedPaths) {
      if (region.globs.some((glob) => matchesGlob(file, glob))) classifiedPaths.add(file);
    }
  }
  const unclassifiedChangedPaths = changedPaths.filter((file) => !classifiedPaths.has(file));
  return {
    ok: regionViolations.length === 0 && (job.ownershipRegions.length === 0 || unclassifiedChangedPaths.length === 0),
    jobId: job.id,
    changedPaths,
    changedRegions,
    ownedRegions: [...job.ownedRegions],
    regionViolations,
    unclassifiedChangedPaths
  };
}

export function createSwarmHotspotReport(input: FrontierSwarmHotspotReportInput = {}): FrontierSwarmHotspotReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const threshold = Math.max(2, Math.floor(input.threshold ?? 3));
  const byPath = new Map<string, FrontierSwarmHotspotEntry>();
  for (const bundle of input.bundles ?? []) {
    for (const file of bundle.changedPaths) {
      const current = byPath.get(file) ?? {
        path: file,
        touchCount: 0,
        jobIds: [],
        regions: [],
        dispositions: [],
        riskLevels: []
      };
      current.touchCount += 1;
      current.jobIds = uniqueStrings([...current.jobIds, bundle.jobId]);
      current.regions = uniqueStrings([...current.regions, ...bundle.changedRegions]);
      current.dispositions = uniqueStrings([...current.dispositions, bundle.disposition]);
      current.riskLevels = uniqueStrings([...current.riskLevels, bundle.riskLevel]);
      byPath.set(file, current);
    }
  }
  for (const raw of input.results ?? []) {
    const result = isSwarmJobResult(raw) ? raw : normalizeResult(raw);
    for (const file of result.changedPaths) {
      const current = byPath.get(file) ?? {
        path: file,
        touchCount: 0,
        jobIds: [],
        regions: [],
        dispositions: [],
        riskLevels: []
      };
      current.touchCount += 1;
      current.jobIds = uniqueStrings([...current.jobIds, result.jobId]);
      current.regions = uniqueStrings([...current.regions, ...result.changedRegions]);
      current.dispositions = uniqueStrings([...current.dispositions, result.mergeDisposition]);
      current.riskLevels = uniqueStrings([...current.riskLevels, result.riskLevel]);
      byPath.set(file, current);
    }
  }
  const entries = Array.from(byPath.values()).sort((left, right) => right.touchCount - left.touchCount || left.path.localeCompare(right.path));
  const recommendations = entries
    .filter((entry) => entry.touchCount >= threshold || entry.regions.length > 1)
    .map((entry) => ({
      path: entry.path,
      reason: entry.regions.length > 1 ? 'region-overlap' as const : 'hot-file' as const,
      suggestedModuleId: suggestedModuleId(entry.path),
      suggestedOwnershipRegions: entry.regions.length ? entry.regions : [`${suggestedModuleId(entry.path)}.*`],
      jobIds: [...entry.jobIds]
    }));
  return {
    kind: FRONTIER_SWARM_HOTSPOT_REPORT_KIND,
    version: FRONTIER_SWARM_HOTSPOT_REPORT_VERSION,
    id: input.id ?? 'swarm-hotspot-report:' + stableHash([entries, threshold, generatedAt]),
    generatedAt,
    threshold,
    entries,
    recommendations,
    summary: {
      pathCount: entries.length,
      hotspotCount: entries.filter((entry) => entry.touchCount >= threshold).length,
      recommendationCount: recommendations.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmReviewerLanePlan(input: FrontierSwarmReviewerLanePlanInput): FrontierSwarmReviewerLanePlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const reviewerLane = input.reviewerLane ?? 'review';
  const reviewers = uniqueStrings(input.reviewers ?? []);
  const deferralsByJob = new Map((input.admission?.deferred ?? []).map((entry) => [entry.jobId, entry.reasons]));
  const candidates = input.index.entries.filter((entry) => input.includeAutoMergeable
    || deferralsByJob.has(entry.jobId)
    || entry.conflictingJobIds.length > 0
    || entry.riskLevel === 'high'
    || entry.disposition !== 'auto-mergeable'
    || !entry.autoMergeable);
  const assignments = candidates.map((entry) => ({
    jobId: entry.jobId,
    reviewers: selectReviewers(reviewers, reviewers.length ? 1 : 0, entry.jobId),
    required: deferralsByJob.has(entry.jobId) || entry.conflictingJobIds.length > 0 || entry.riskLevel === 'high' || entry.disposition !== 'auto-mergeable',
    reasons: uniqueStrings([...reviewerLaneReasons(entry), ...(deferralsByJob.get(entry.jobId) ?? [])])
  }));
  const tasks = candidates.map((entry) => ({
    id: `review-${slug(entry.jobId)}`,
    lane: reviewerLane,
    kind: 'review',
    title: `Review ${entry.title ?? entry.jobId}`,
    objective: `Review swarm merge bundle ${entry.jobId}.`,
    sourceRefs: entry.evidencePaths,
    targetRefs: entry.changedPaths,
    ownedRegions: entry.changedRegions,
    acceptance: [
      'Review evidence, patch applicability, ownership, conflicts, and risk.',
      `Merge disposition: ${entry.disposition}.`
    ],
    metadata: {
      mergeJobId: entry.jobId,
      conflictingJobIds: entry.conflictingJobIds,
      reasons: uniqueStrings([...reviewerLaneReasons(entry), ...(deferralsByJob.get(entry.jobId) ?? [])])
    }
  }));
  return {
    kind: FRONTIER_SWARM_REVIEWER_LANE_PLAN_KIND,
    version: FRONTIER_SWARM_REVIEWER_LANE_PLAN_VERSION,
    id: input.id ?? 'swarm-reviewer-lane-plan:' + stableHash([input.index.id, assignments, generatedAt]),
    mergeIndexId: input.index.id,
    generatedAt,
    reviewerLane,
    assignments,
    tasks,
    summary: {
      assignmentCount: assignments.length,
      taskCount: tasks.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmRunStoreShards(input: FrontierSwarmRunStoreShardsInput = {}): FrontierSwarmRunStoreShards {
  const generatedAt = input.generatedAt ?? Date.now();
  const root = input.root ?? 'agent-runs/shards';
  const shardSize = Math.max(1, Math.floor(input.shardSize ?? 100));
  const groupBy = input.groupBy ?? 'lane';
  const jobs = input.run?.jobs ?? input.plan?.jobs ?? [];
  const groups = new Map<string, FrontierSwarmJob[]>();
  for (const job of jobs) {
    const key = groupBy === 'none' ? 'all' : groupBy === 'hash' ? String(hashBucket(job.id, shardSize)) : job.lane;
    groups.set(key, [...(groups.get(key) ?? []), job]);
  }
  const shards: FrontierSwarmRunStoreShard[] = [];
  for (const [group, groupJobs] of Array.from(groups.entries()).sort((left, right) => left[0].localeCompare(right[0]))) {
    for (let index = 0; index < groupJobs.length; index += shardSize) {
      const slice = groupJobs.slice(index, index + shardSize);
      const suffix = `${slug(group)}-${Math.floor(index / shardSize)}`;
      const shardRoot = joinPathParts(root, suffix);
      shards.push({
        id: 'swarm-run-store-shard:' + stableHash([input.run?.id, input.plan?.id, group, index, slice.map((job) => job.id)]),
        ...(groupBy === 'lane' ? { lane: group } : {}),
        path: shardRoot,
        eventPath: joinPathParts(shardRoot, 'events.jsonl'),
        resultPath: joinPathParts(shardRoot, 'results.jsonl'),
        checkpointPath: joinPathParts(shardRoot, 'checkpoint.json'),
        jobIds: slice.map((job) => job.id)
      });
    }
  }
  return {
    kind: FRONTIER_SWARM_RUN_STORE_SHARDS_KIND,
    version: FRONTIER_SWARM_RUN_STORE_SHARDS_VERSION,
    id: input.id ?? 'swarm-run-store-shards:' + stableHash([input.run?.id, input.plan?.id, root, shardSize, groupBy, shards, generatedAt]),
    ...(input.run ? { runId: input.run.id } : {}),
    ...(input.plan ? { planId: input.plan.id } : {}),
    root,
    generatedAt,
    groupBy,
    shardSize,
    shards,
    summary: {
      shardCount: shards.length,
      jobCount: jobs.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmMergeAdmission(input: FrontierSwarmMergeAdmissionInput): FrontierSwarmMergeAdmission {
  const generatedAt = input.generatedAt ?? Date.now();
  const maxReady = Math.max(0, Math.floor(input.maxReady ?? input.index.entries.length));
  const maxChangedPaths = input.maxChangedPaths === undefined ? undefined : Math.max(0, Math.floor(input.maxChangedPaths));
  const maxChangedRegions = input.maxChangedRegions === undefined ? undefined : Math.max(0, Math.floor(input.maxChangedRegions));
  const maxHighRisk = input.maxHighRisk === undefined ? undefined : Math.max(0, Math.floor(input.maxHighRisk));
  const allowRisks = uniqueStrings(input.allowRisks ?? ['low', 'medium']);
  const admitted: string[] = [];
  const deferred: FrontierSwarmMergeAdmissionDeferral[] = [];
  const usedPaths = new Set<string>();
  const usedRegions = new Set<string>();
  let highRiskCount = 0;
  for (const entry of input.index.entries) {
    const reasons: string[] = [];
    if (entry.disposition !== 'auto-mergeable' || !entry.autoMergeable) reasons.push('not-auto-mergeable');
    if (entry.staleAgainstHead) reasons.push('stale-against-head');
    if (entry.conflictingJobIds.length) reasons.push('conflicting-changes');
    if (!allowRisks.includes(entry.riskLevel)) reasons.push('risk-not-admitted');
    if (admitted.length >= maxReady) reasons.push('max-ready');
    const nextPaths = new Set([...usedPaths, ...entry.changedPaths]);
    const nextRegions = new Set([...usedRegions, ...entry.changedRegions]);
    const nextHighRiskCount = highRiskCount + (entry.riskLevel === 'high' ? 1 : 0);
    if (maxChangedPaths !== undefined && nextPaths.size > maxChangedPaths) reasons.push('max-changed-paths');
    if (maxChangedRegions !== undefined && nextRegions.size > maxChangedRegions) reasons.push('max-changed-regions');
    if (maxHighRisk !== undefined && nextHighRiskCount > maxHighRisk) reasons.push('max-high-risk');
    if (reasons.length) {
      deferred.push({ jobId: entry.jobId, reasons: uniqueStrings(reasons) });
      continue;
    }
    admitted.push(entry.jobId);
    for (const file of entry.changedPaths) usedPaths.add(file);
    for (const region of entry.changedRegions) usedRegions.add(region);
    highRiskCount = nextHighRiskCount;
  }
  return {
    kind: FRONTIER_SWARM_MERGE_ADMISSION_KIND,
    version: FRONTIER_SWARM_MERGE_ADMISSION_VERSION,
    id: input.id ?? 'swarm-merge-admission:' + stableHash([input.index.id, admitted, deferred, generatedAt]),
    mergeIndexId: input.index.id,
    generatedAt,
    admitted,
    deferred,
    budget: {
      maxReady,
      ...(maxChangedPaths !== undefined ? { maxChangedPaths } : {}),
      ...(maxChangedRegions !== undefined ? { maxChangedRegions } : {}),
      ...(maxHighRisk !== undefined ? { maxHighRisk } : {}),
      allowRisks
    },
    summary: {
      admittedCount: admitted.length,
      deferredCount: deferred.length,
      changedPathCount: usedPaths.size,
      changedRegionCount: usedRegions.size,
      highRiskCount
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmContextPack(input: FrontierSwarmContextPackInput = {}): FrontierSwarmContextPack {
  const generatedAt = input.generatedAt ?? Date.now();
  const task = input.job?.task ?? (input.task ? isSwarmTask(input.task) ? input.task : normalizeTask(input.task) : undefined);
  const files = uniqueStrings([
    ...(input.files ?? []),
    ...(input.job?.task.sourceRefs ?? []),
    ...(input.job?.task.targetRefs ?? []),
    ...(task?.sourceRefs ?? []),
    ...(task?.targetRefs ?? [])
  ]);
  const apiMap = Object.fromEntries(Object.entries(input.apiMap ?? {}).map(([key, values]) => [key, uniqueStrings(values)]));
  const commands = normalizeCommands([
    ...(input.commands ?? []),
    ...(input.oracleCommands ?? []),
    ...(input.job?.verification ?? [])
  ]);
  const expectedEvidence = uniqueStrings([
    ...(input.expectedEvidence ?? []),
    ...(input.job?.evidencePrefix ? [joinPathParts(input.job.evidencePrefix, 'evidence.json')] : [])
  ]);
  return {
    kind: FRONTIER_SWARM_CONTEXT_PACK_KIND,
    version: FRONTIER_SWARM_CONTEXT_PACK_VERSION,
    id: input.id ?? 'swarm-context-pack:' + stableHash([input.job?.id, task?.id, files, apiMap, generatedAt]),
    ...(input.job ? { jobId: input.job.id } : {}),
    ...(task ? { taskId: task.id } : {}),
    ...(input.job?.lane ?? task?.lane ? { lane: input.job?.lane ?? task?.lane } : {}),
    title: input.title ?? input.job?.title ?? task?.title ?? 'Swarm Context Pack',
    generatedAt,
    files,
    apiMap,
    knownFailures: uniqueStrings(input.knownFailures ?? []),
    commands,
    oracleCommands: commands,
    ...(input.evidenceSchema !== undefined ? { evidenceSchema: toJsonValue(input.evidenceSchema) } : {}),
    expectedEvidence,
    exclusions: uniqueStrings(input.exclusions ?? []),
    avoidInvestigating: uniqueStrings(input.avoidInvestigating ?? []),
    playbookIds: uniqueStrings(input.playbookIds ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmOracleCorpus(input: FrontierSwarmOracleCorpusInput = {}): FrontierSwarmOracleCorpus {
  const generatedAt = input.generatedAt ?? Date.now();
  const artifacts = (input.artifacts ?? []).map(normalizeOracleArtifact).sort((left, right) => left.id.localeCompare(right.id));
  const byKind = groupArtifactIdsBy(artifacts, (artifact) => [artifact.kind]);
  const byTag = groupArtifactIdsBy(artifacts, (artifact) => artifact.tags);
  return {
    kind: FRONTIER_SWARM_ORACLE_CORPUS_KIND,
    version: FRONTIER_SWARM_ORACLE_CORPUS_VERSION,
    id: input.id ?? 'swarm-oracle-corpus:' + stableHash([artifacts, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? 'oracle corpus'),
    generatedAt,
    artifacts,
    byKind,
    byTag,
    summary: {
      artifactCount: artifacts.length,
      kindCount: Object.keys(byKind).length,
      tagCount: Object.keys(byTag).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmObservabilityPoint(input: FrontierSwarmObservabilityPointInput = {}): FrontierSwarmObservabilityPoint {
  const eventRefs = normalizeNamedRefs(input.eventRefs ?? [], 'event');
  return {
    kind: FRONTIER_SWARM_OBSERVABILITY_POINT_KIND,
    version: FRONTIER_SWARM_OBSERVABILITY_POINT_VERSION,
    id: input.id ?? 'swarm-observability-point:' + stableHash([input.subject, input.scope, input.operationIndex, input.at, input.path, input.selector, eventRefs]),
    ...(input.subject ? { subject: input.subject } : {}),
    ...(input.scope ? { scope: input.scope } : {}),
    ...(input.operationIndex !== undefined ? { operationIndex: Math.max(0, Math.floor(input.operationIndex)) } : {}),
    ...(input.at !== undefined ? { at: input.at } : {}),
    ...(input.path ? { path: input.path } : {}),
    ...(input.selector ? { selector: input.selector } : {}),
    ...(input.before !== undefined ? { before: toJsonValue(input.before) } : {}),
    ...(input.after !== undefined ? { after: toJsonValue(input.after) } : {}),
    eventRefs,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmReplayBundle(input: FrontierSwarmReplayBundleInput = {}): FrontierSwarmReplayBundle {
  const generatedAt = input.generatedAt ?? Date.now();
  const commands = normalizeCommands(input.commands ?? []);
  const inputs = normalizeNamedRefs(input.inputs ?? [], 'input');
  const artifacts = normalizeNamedRefs(input.artifacts ?? [], 'artifact');
  const sourceRefs = normalizeNamedRefs(input.sourceRefs ?? [], 'source');
  const seeds = normalizeSeedRefs(input.seeds ?? []);
  const expectedEvidence = uniqueStrings(input.expectedEvidence ?? []);
  const title = input.title ?? titleFromId(input.id ?? input.subject ?? 'replay bundle');
  return {
    kind: FRONTIER_SWARM_REPLAY_BUNDLE_KIND,
    version: FRONTIER_SWARM_REPLAY_BUNDLE_VERSION,
    id: input.id ?? 'swarm-replay-bundle:' + stableHash([title, input.subject, commands, inputs, artifacts, sourceRefs, seeds, expectedEvidence, generatedAt]),
    title,
    ...(input.subject ? { subject: input.subject } : {}),
    generatedAt,
    commands,
    inputs,
    artifacts,
    sourceRefs,
    seeds,
    ...(toJsonObject(input.environment) ? { environment: toJsonObject(input.environment) } : {}),
    expectedEvidence,
    summary: {
      commandCount: commands.length,
      inputCount: inputs.length,
      artifactCount: artifacts.length,
      sourceRefCount: sourceRefs.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmParityOracle(input: FrontierSwarmParityOracleInput = {}): FrontierSwarmParityOracle {
  const generatedAt = input.generatedAt ?? Date.now();
  const referenceCommands = normalizeCommands(input.referenceCommands ?? []);
  const testCommands = normalizeCommands(input.testCommands ?? []);
  const comparators = (input.comparators ?? []).map(normalizeParityComparator);
  const artifacts = normalizeNamedRefs(input.artifacts ?? [], 'parity-artifact');
  const status = input.status ?? inferParityStatus(comparators);
  return {
    kind: FRONTIER_SWARM_PARITY_ORACLE_KIND,
    version: FRONTIER_SWARM_PARITY_ORACLE_VERSION,
    id: input.id ?? 'swarm-parity-oracle:' + stableHash([input.title, input.subject, referenceCommands, testCommands, comparators, artifacts, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.subject ?? 'parity oracle'),
    status,
    ...(input.subject ? { subject: input.subject } : {}),
    generatedAt,
    referenceCommands,
    testCommands,
    comparators,
    artifacts,
    replayBundleIds: uniqueStrings(input.replayBundleIds ?? []),
    summary: {
      comparatorCount: comparators.length,
      passedCount: comparators.filter((comparator) => comparator.status === 'passed').length,
      failedCount: comparators.filter((comparator) => comparator.status === 'failed').length,
      blockedCount: comparators.filter((comparator) => comparator.status === 'blocked').length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmDivergenceReport(input: FrontierSwarmDivergenceReportInput = {}): FrontierSwarmDivergenceReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const observabilityPoints = (input.observabilityPoints ?? []).map((point) => isSwarmObservabilityPoint(point) ? point : createSwarmObservabilityPoint(point));
  const earliest = observabilityPoints
    .filter((point) => point.operationIndex !== undefined)
    .sort((left, right) => (left.operationIndex as number) - (right.operationIndex as number))[0];
  const divergesAt = input.divergesAt ?? earliest?.path;
  const operationIndex = input.operationIndex ?? earliest?.operationIndex;
  return {
    kind: FRONTIER_SWARM_DIVERGENCE_REPORT_KIND,
    version: FRONTIER_SWARM_DIVERGENCE_REPORT_VERSION,
    id: input.id ?? 'swarm-divergence-report:' + stableHash([input.subject, input.divergesAt, input.operationIndex, observabilityPoints, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.subject ?? 'divergence report'),
    status: input.status ?? 'failed',
    severity: input.severity ?? 'error',
    ...(input.subject ? { subject: input.subject } : {}),
    confidence: input.confidence ?? 'medium',
    ...(divergesAt ? { divergesAt } : {}),
    ...(operationIndex !== undefined ? { operationIndex } : {}),
    ...(input.expected !== undefined ? { expected: toJsonValue(input.expected) } : {}),
    ...(input.actual !== undefined ? { actual: toJsonValue(input.actual) } : {}),
    observabilityPoints,
    traceRefs: normalizeNamedRefs(input.traceRefs ?? [], 'trace'),
    replayBundleIds: uniqueStrings(input.replayBundleIds ?? []),
    evidenceRefs: normalizeNamedRefs(input.evidenceRefs ?? [], 'evidence'),
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmWatchpointPlan(input: FrontierSwarmWatchpointPlanInput = {}): FrontierSwarmWatchpointPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const watchpoints = (input.watchpoints ?? []).map(normalizeWatchpoint);
  const commands = normalizeCommands(input.commands ?? []);
  return {
    kind: FRONTIER_SWARM_WATCHPOINT_PLAN_KIND,
    version: FRONTIER_SWARM_WATCHPOINT_PLAN_VERSION,
    id: input.id ?? 'swarm-watchpoint-plan:' + stableHash([input.subject, watchpoints, commands, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.subject ?? 'watchpoint plan'),
    ...(input.subject ? { subject: input.subject } : {}),
    matchMode: input.matchMode ?? 'all',
    generatedAt,
    watchpoints,
    commands,
    replayBundleIds: uniqueStrings(input.replayBundleIds ?? []),
    divergenceReportIds: uniqueStrings(input.divergenceReportIds ?? []),
    summary: {
      watchpointCount: watchpoints.length,
      commandCount: commands.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmDebugHandoff(input: FrontierSwarmDebugHandoffInput = {}): FrontierSwarmDebugHandoff {
  const generatedAt = input.generatedAt ?? Date.now();
  const focus = input.focus ? (isSwarmObservabilityPoint(input.focus) ? input.focus : createSwarmObservabilityPoint(input.focus)) : undefined;
  return {
    kind: FRONTIER_SWARM_DEBUG_HANDOFF_KIND,
    version: FRONTIER_SWARM_DEBUG_HANDOFF_VERSION,
    id: input.id ?? 'swarm-debug-handoff:' + stableHash([input.subject, focus, input.replayBundleIds, input.divergenceReportIds, input.watchpointPlanIds, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.subject ?? 'debug handoff'),
    status: input.status ?? 'ready',
    ...(input.subject ? { subject: input.subject } : {}),
    ...(focus ? { focus } : {}),
    replayBundleIds: uniqueStrings(input.replayBundleIds ?? []),
    divergenceReportIds: uniqueStrings(input.divergenceReportIds ?? []),
    watchpointPlanIds: uniqueStrings(input.watchpointPlanIds ?? []),
    commands: normalizeCommands(input.commands ?? []),
    files: normalizeNamedRefs(input.files ?? [], 'file'),
    artifacts: normalizeNamedRefs(input.artifacts ?? [], 'artifact'),
    comparisons: (input.comparisons ?? []).map(normalizeParityComparator),
    ...(toJsonObject(input.environment) ? { environment: toJsonObject(input.environment) } : {}),
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmInstrumentationBudget(input: FrontierSwarmInstrumentationBudgetInput = {}): FrontierSwarmInstrumentationBudget {
  const generatedAt = input.generatedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND,
    version: FRONTIER_SWARM_INSTRUMENTATION_BUDGET_VERSION,
    id: input.id ?? 'swarm-instrumentation-budget:' + stableHash([input.lane, input.maxEvents, input.maxBytes, input.maxDurationMs, input.maxOverheadRatio, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.lane ?? 'instrumentation budget'),
    ...(input.lane ? { lane: input.lane } : {}),
    generatedAt,
    ...(positiveNumber(input.maxEvents) ? { maxEvents: Math.floor(input.maxEvents as number) } : {}),
    ...(positiveNumber(input.maxBytes) ? { maxBytes: Math.floor(input.maxBytes as number) } : {}),
    ...(positiveNumber(input.maxDurationMs) ? { maxDurationMs: Math.floor(input.maxDurationMs as number) } : {}),
    ...(positiveNumber(input.maxOverheadRatio) ? { maxOverheadRatio: input.maxOverheadRatio as number } : {}),
    captureKinds: uniqueStrings(input.captureKinds ?? []),
    sampling: {
      mode: input.sampling?.mode ?? 'adaptive',
      ...(positiveNumber(input.sampling?.rate) ? { rate: input.sampling?.rate as number } : {}),
      ...(toJsonObject(input.sampling?.metadata) ? { metadata: toJsonObject(input.sampling?.metadata) } : {})
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function checkSwarmInstrumentationBudget(
  budgetInput: FrontierSwarmInstrumentationBudget | FrontierSwarmInstrumentationBudgetInput,
  usageInput: FrontierSwarmInstrumentationUsageInput = {}
): FrontierSwarmInstrumentationBudgetDecision {
  const budget = isSwarmInstrumentationBudget(budgetInput) ? budgetInput : createSwarmInstrumentationBudget(budgetInput);
  const usage = {
    events: Math.max(0, Math.floor(usageInput.events ?? 0)),
    bytes: Math.max(0, Math.floor(usageInput.bytes ?? 0)),
    durationMs: Math.max(0, Math.floor(usageInput.durationMs ?? 0)),
    overheadRatio: Math.max(0, usageInput.overheadRatio ?? 0),
    captureKinds: uniqueStrings(usageInput.captureKinds ?? []),
    ...(toJsonObject(usageInput.metadata) ? { metadata: toJsonObject(usageInput.metadata) } : {})
  };
  const violations: string[] = [];
  if (budget.maxEvents !== undefined && usage.events > budget.maxEvents) violations.push('max-events');
  if (budget.maxBytes !== undefined && usage.bytes > budget.maxBytes) violations.push('max-bytes');
  if (budget.maxDurationMs !== undefined && usage.durationMs > budget.maxDurationMs) violations.push('max-duration-ms');
  if (budget.maxOverheadRatio !== undefined && usage.overheadRatio > budget.maxOverheadRatio) violations.push('max-overhead-ratio');
  for (const kind of usage.captureKinds.filter((kind) => budget.captureKinds.length > 0 && !budget.captureKinds.includes(kind))) {
    violations.push(`capture-kind:${kind}`);
  }
  return { ok: violations.length === 0, budgetId: budget.id, usage, violations: uniqueStrings(violations) };
}

export function classifySwarmBottleneck(input: FrontierSwarmBottleneckSource | FrontierSwarmJobResultInput | FrontierSwarmMergeBundle): FrontierSwarmBottleneckClassification {
  const source = normalizeBottleneckSource(input);
  const text = [source.text, source.status, ...(source.reasons ?? []), ...(source.evidencePaths ?? []), ...(source.changedPaths ?? [])].join(' ').toLowerCase();
  const verification = source.verification ?? [];
  let kind: FrontierSwarmBottleneckKind = 'queue';
  let confidence: FrontierSwarmConfidence = 'medium';
  if (/missing.*oracle|no oracle|needs-fixture|fixture/.test(text)) kind = 'missing-oracle';
  else if (/flaky|timeout|browser|playwright|chrome|port/.test(text)) kind = 'flaky-harness';
  else if (/instrument|logging|trace|telemetry|overhead/.test(text)) kind = 'instrumentation-overhead';
  else if (/merge|conflict|review|needs-port|ownership/.test(text)) kind = 'merge-review';
  else if (/dependency|depends|blocked/.test(text)) kind = 'blocked-dependency';
  else if (/perf|slow|latency|throughput|cpu|memory|resource-capacity/.test(text)) kind = 'performance';
  else if (/diverg|correct|parity|oracle failed|regression/.test(text)) kind = 'correctness';
  if (verification.some((entry) => entry.status !== undefined && entry.status !== 0 && entry.required !== false)) confidence = 'high';
  if ((source.evidencePaths?.length ?? 0) === 0 && (source.changedPaths?.length ?? 0) > 0) confidence = 'low';
  return {
    kind,
    confidence,
    reasons: uniqueStrings([kind, ...(source.reasons ?? []), ...verification.filter((entry) => entry.status !== undefined && entry.status !== 0).map((entry) => entry.name ?? 'failed-verification')]),
    route: routeForBottleneck(kind, source.lane)
  };
}

export function createSwarmBottleneckReport(input: FrontierSwarmBottleneckReportInput = {}): FrontierSwarmBottleneckReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const classifications = (input.sources ?? []).map(classifySwarmBottleneck);
  const byKind = groupObjects(classifications, (classification) => classification.kind);
  return {
    kind: FRONTIER_SWARM_BOTTLENECK_REPORT_KIND,
    version: FRONTIER_SWARM_BOTTLENECK_REPORT_VERSION,
    id: input.id ?? 'swarm-bottleneck-report:' + stableHash([classifications, generatedAt]),
    generatedAt,
    classifications,
    byKind,
    summary: {
      sourceCount: input.sources?.length ?? 0,
      kindCount: Object.keys(byKind).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmEvidenceIndex(input: FrontierSwarmRun | FrontierSwarmEvidenceIndexInput = {}): FrontierSwarmEvidenceIndex {
  const source = isSwarmRun(input) ? { run: input } : input;
  const generatedAt = source.generatedAt ?? Date.now();
  const runEntries = source.run?.results.flatMap((result) => result.evidencePaths.map((path) => normalizeEvidenceIndexEntry({
    jobId: result.jobId,
    queueItemId: result.queueItemIds[0],
    path,
    kind: evidenceKindFromPath(path),
    status: result.status,
    confidence: result.status === 'verified' || result.mergeReadiness === 'verified-patch' ? 1 : 0.65,
    generatedAt
  }))) ?? [];
  const entries = [...runEntries, ...(source.entries ?? []).map((entry) => normalizeEvidenceIndexEntry({ ...entry, generatedAt: entry.generatedAt ?? generatedAt }))];
  const byJobId = groupObjects(entries.filter((entry) => entry.jobId), (entry) => entry.jobId as string);
  const byTopic = groupObjects(entries.filter((entry) => entry.topic), (entry) => entry.topic as string);
  const byPath = groupObjects(entries.filter((entry) => entry.path), (entry) => entry.path as string);
  return {
    kind: FRONTIER_SWARM_EVIDENCE_INDEX_KIND,
    version: FRONTIER_SWARM_EVIDENCE_INDEX_VERSION,
    id: source.id ?? 'swarm-evidence-index:' + stableHash([source.run?.id, entries, generatedAt]),
    ...(source.run?.id ? { runId: source.run.id } : {}),
    generatedAt,
    entries,
    byJobId,
    byTopic,
    byPath,
    summary: {
      entryCount: entries.length,
      jobCount: Object.keys(byJobId).length,
      topicCount: Object.keys(byTopic).length,
      pathCount: Object.keys(byPath).length
    },
    ...(toJsonObject(source.metadata) ? { metadata: toJsonObject(source.metadata) } : {})
  };
}

export function querySwarmEvidenceIndex(index: FrontierSwarmEvidenceIndex, query: FrontierSwarmEvidenceIndexQuery = {}): FrontierSwarmEvidenceIndexQueryResult {
  const entries = index.entries.filter((entry) => (
    (query.jobId === undefined || entry.jobId === query.jobId)
    && (query.lane === undefined || entry.lane === query.lane)
    && (query.topic === undefined || entry.topic === query.topic)
    && (query.pathIncludes === undefined || (entry.path ?? '').includes(query.pathIncludes))
    && (query.kind === undefined || entry.kind === query.kind)
    && (query.status === undefined || entry.status === query.status)
    && (query.tag === undefined || entry.tags.includes(query.tag))
    && (query.minConfidence === undefined || entry.confidence >= query.minConfidence)
    && matchesFacetQuery(entry.facets, query.facet)
  ));
  return { entries, summary: { entryCount: entries.length } };
}

export function createSwarmBlackboard(input: FrontierSwarmBlackboardInput = {}): FrontierSwarmBlackboard {
  const generatedAt = input.generatedAt ?? Date.now();
  const entries = (input.entries ?? []).map((entry) => normalizeBlackboardEntry({ ...entry, generatedAt: entry.generatedAt ?? generatedAt }));
  const byTopic = groupObjects(entries, (entry) => entry.topic);
  const byKind = groupObjects(entries, (entry) => entry.kind);
  return {
    kind: FRONTIER_SWARM_BLACKBOARD_KIND,
    version: FRONTIER_SWARM_BLACKBOARD_VERSION,
    id: input.id ?? 'swarm-blackboard:' + stableHash([input.runId, entries, generatedAt]),
    ...(input.runId ? { runId: input.runId } : {}),
    generatedAt,
    entries,
    byTopic,
    byKind,
    summary: {
      entryCount: entries.length,
      topicCount: Object.keys(byTopic).length,
      kindCount: Object.keys(byKind).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function querySwarmBlackboard(blackboard: FrontierSwarmBlackboard, query: FrontierSwarmBlackboardQuery = {}): FrontierSwarmBlackboardQueryResult {
  const textIncludes = query.textIncludes?.toLowerCase();
  const entries = blackboard.entries.filter((entry) => (
    (query.kind === undefined || entry.kind === query.kind)
    && (query.topic === undefined || entry.topic === query.topic)
    && (query.status === undefined || entry.status === query.status)
    && (query.lane === undefined || entry.lane === query.lane)
    && (query.jobId === undefined || entry.jobId === query.jobId)
    && (query.owner === undefined || entry.owner === query.owner)
    && (query.tag === undefined || entry.tags.includes(query.tag))
    && (textIncludes === undefined || entry.text.toLowerCase().includes(textIncludes))
  ));
  return { entries, summary: { entryCount: entries.length } };
}

export function createSwarmReferenceOraclePlan(input: FrontierSwarmReferenceOraclePlanInput = {}): FrontierSwarmReferenceOraclePlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const targets = (input.targets ?? []).map((target) => ({
    id: target.id,
    role: target.role ?? 'candidate',
    ...(target.command ? { command: normalizeCommand(target.command) } : {}),
    ...(toJsonObject(target.metadata) ? { metadata: toJsonObject(target.metadata) } : {})
  }));
  return {
    kind: FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_KIND,
    version: FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_VERSION,
    id: input.id ?? 'swarm-reference-oracle-plan:' + stableHash([input.serviceId, input.subject, input.fixtureId, targets, input.window, generatedAt]),
    ...(input.serviceId ? { serviceId: input.serviceId } : {}),
    ...(input.subject ? { subject: input.subject } : {}),
    ...(input.fixtureId ? { fixtureId: input.fixtureId } : {}),
    generatedAt,
    targets,
    ...(input.window ? { window: normalizeReferenceWindow(input.window) } : {}),
    watchpoints: (input.watchpoints ?? []).map(normalizeWatchpoint),
    artifactKinds: uniqueStrings(input.artifactKinds ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmReferenceOracleResponse(input: FrontierSwarmReferenceOracleResponseInput = {}): FrontierSwarmReferenceOracleResponse {
  const generatedAt = input.generatedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_KIND,
    version: FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_VERSION,
    id: input.id ?? 'swarm-reference-oracle-response:' + stableHash([input.planId, input.status, input.targetResults, input.divergence, generatedAt]),
    ...(input.planId ? { planId: input.planId } : {}),
    status: input.status ?? (input.divergence ? 'failed' : 'pending'),
    ...(input.subject ? { subject: input.subject } : {}),
    generatedAt,
    targetResults: (input.targetResults ?? []).map((target) => ({
      targetId: target.targetId,
      status: target.status ?? 'pending',
      artifacts: normalizeNamedRefs(target.artifacts ?? [], 'reference-oracle-artifact'),
      ...(toJsonObject(target.metadata) ? { metadata: toJsonObject(target.metadata) } : {})
    })),
    ...(input.divergence ? { divergence: createSwarmDivergenceReport(input.divergence) } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmArtifactRoutingPlan(input: FrontierSwarmArtifactRoutingPlanInput = {}): FrontierSwarmArtifactRoutingPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const artifacts = [
    ...normalizeNamedRefs(input.artifacts ?? [], 'artifact'),
    ...(input.bundles ?? []).flatMap((bundle) => bundle.evidencePaths.map((path) => normalizeNamedRef({ path, kind: evidenceKindFromPath(path), role: bundle.disposition }, 'evidence')))
  ];
  const hints = (input.hints ?? []).map(normalizeRoutingHint);
  const routes = artifacts.map((artifact) => {
    const matched = hints.filter((hint) => (
      (hint.artifactKind === undefined || hint.artifactKind === artifact.kind)
      && (hint.pathPattern === undefined || (artifact.path ?? artifact.uri ?? '').includes(hint.pathPattern))
    ));
    const bucket = matched[0]?.bucket ?? defaultArtifactBucket(artifact);
    return {
      artifact,
      bucket,
      ...(matched[0]?.lane ? { lane: matched[0].lane } : {}),
      reasons: uniqueStrings(matched.map((hint) => hint.reason))
    };
  });
  const byBucket = groupIds(routes.map((route) => ({ id: route.artifact.id, bucket: route.bucket })), (route) => route.bucket);
  return {
    kind: FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_KIND,
    version: FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_VERSION,
    id: input.id ?? 'swarm-artifact-routing-plan:' + stableHash([routes, generatedAt]),
    generatedAt,
    routes,
    byBucket,
    summary: {
      routeCount: routes.length,
      bucketCount: Object.keys(byBucket).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmFixtureCatalog(input: FrontierSwarmFixtureCatalogInput = {}): FrontierSwarmFixtureCatalog {
  const generatedAt = input.generatedAt ?? Date.now();
  const fixtures = (input.fixtures ?? []).map(normalizeFixture);
  const byTag: Record<string, string[]> = {};
  for (const fixture of fixtures) {
    for (const tag of fixture.tags) byTag[tag] = uniqueStrings([...(byTag[tag] ?? []), fixture.id]);
  }
  return {
    kind: FRONTIER_SWARM_FIXTURE_CATALOG_KIND,
    version: FRONTIER_SWARM_FIXTURE_CATALOG_VERSION,
    id: input.id ?? 'swarm-fixture-catalog:' + stableHash([fixtures, generatedAt]),
    generatedAt,
    fixtures,
    byTag,
    summary: {
      fixtureCount: fixtures.length,
      tagCount: Object.keys(byTag).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmProgressModel(input: FrontierSwarmProgressModelInput = {}): FrontierSwarmProgressModel {
  const generatedAt = input.generatedAt ?? Date.now();
  const items = (input.items ?? []).map((item) => ({
    id: item.id,
    ...(item.surface ? { surface: item.surface } : {}),
    status: item.status ?? 'not-started',
    evidencePaths: uniqueStrings(item.evidencePaths ?? []),
    blockers: uniqueStrings(item.blockers ?? []),
    ...(toJsonObject(item.metadata) ? { metadata: toJsonObject(item.metadata) } : {})
  }));
  const byStatus = groupIds(items, (item) => item.status);
  return {
    kind: FRONTIER_SWARM_PROGRESS_MODEL_KIND,
    version: FRONTIER_SWARM_PROGRESS_MODEL_VERSION,
    id: input.id ?? 'swarm-progress-model:' + stableHash([items, generatedAt]),
    generatedAt,
    items,
    byStatus,
    summary: {
      itemCount: items.length,
      acceptedCount: byStatus.accepted?.length ?? 0,
      blockedCount: byStatus.blocked?.length ?? 0
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmAutoReviewReport(input: FrontierSwarmAutoReviewReportInput = {}): FrontierSwarmAutoReviewReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const derived = (input.bundles ?? []).flatMap((bundle) => deriveAutoReviewFindings(bundle, generatedAt));
  const findings = [...derived, ...(input.findings ?? []).map((finding) => normalizeAutoReviewFinding(finding, generatedAt))];
  const byKind = groupObjects(findings, (finding) => finding.kind);
  return {
    kind: FRONTIER_SWARM_AUTO_REVIEW_REPORT_KIND,
    version: FRONTIER_SWARM_AUTO_REVIEW_REPORT_VERSION,
    id: input.id ?? 'swarm-auto-review-report:' + stableHash([findings, generatedAt]),
    generatedAt,
    findings,
    byKind,
    summary: {
      findingCount: findings.length,
      highSeverityCount: findings.filter((finding) => finding.severity === 'error' || finding.severity === 'critical').length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmRebaseReport(input: FrontierSwarmRebaseReportInput = {}): FrontierSwarmRebaseReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const fromIndex = input.mergeIndex?.entries.map((entry) => ({
    jobId: entry.jobId,
    status: entry.staleAgainstHead ? 'stale-evidence' : entry.conflictingJobIds.length ? 'semantic-overlap' : 'clean-apply',
    reasons: uniqueStrings([...entry.reasons, ...entry.conflictKeys])
  })) ?? [];
  const fromBundles = !input.mergeIndex && input.bundles ? input.bundles.map((bundle) => ({
    jobId: bundle.jobId,
    status: bundle.staleAgainstHead ? 'stale-evidence' : 'clean-apply',
    reasons: [...bundle.reasons]
  })) : [];
  const entries = [...fromIndex, ...fromBundles, ...(input.entries ?? [])].map((entry) => ({
    jobId: entry.jobId,
    status: entry.status ?? 'clean-apply',
    reasons: uniqueStrings(entry.reasons ?? []),
    ...('metadata' in entry && toJsonObject(entry.metadata) ? { metadata: toJsonObject(entry.metadata) } : {})
  }));
  const byStatus = groupIds(entries, (entry) => entry.status);
  return {
    kind: FRONTIER_SWARM_REBASE_REPORT_KIND,
    version: FRONTIER_SWARM_REBASE_REPORT_VERSION,
    id: input.id ?? 'swarm-rebase-report:' + stableHash([input.currentHead, entries, generatedAt]),
    ...(input.currentHead ? { currentHead: input.currentHead } : {}),
    generatedAt,
    entries,
    byStatus,
    summary: {
      entryCount: entries.length,
      cleanCount: byStatus['clean-apply']?.length ?? 0,
      conflictCount: (byStatus['textual-conflict']?.length ?? 0) + (byStatus['semantic-overlap']?.length ?? 0),
      staleCount: byStatus['stale-evidence']?.length ?? 0
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmUsageGovernor(input: FrontierSwarmUsageGovernorInput = {}): FrontierSwarmUsageGovernor {
  const generatedAt = input.generatedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_USAGE_GOVERNOR_KIND,
    version: FRONTIER_SWARM_USAGE_GOVERNOR_VERSION,
    id: input.id ?? 'swarm-usage-governor:' + stableHash([input.maxWorkers, input.maxTokensByLane, input.maxCostUsd, input.retryBudget, generatedAt]),
    generatedAt,
    ...(positiveNumber(input.maxWorkers) ? { maxWorkers: Math.floor(input.maxWorkers as number) } : {}),
    maxTokensByLane: { ...(input.maxTokensByLane ?? {}) },
    ...(positiveNumber(input.maxCostUsd) ? { maxCostUsd: input.maxCostUsd as number } : {}),
    retryBudget: Math.max(0, Math.floor(input.retryBudget ?? 0)),
    stopConditions: uniqueStrings(input.stopConditions ?? []),
    preferStaticWhenLowBudget: input.preferStaticWhenLowBudget ?? true,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function checkSwarmUsageGovernor(
  governorInput: FrontierSwarmUsageGovernor | FrontierSwarmUsageGovernorInput,
  usage: { activeWorkers?: number; costUsd?: number; tokensByLane?: Record<string, number>; retriesUsed?: number } = {}
): FrontierSwarmUsageGovernorDecision {
  const governor = isSwarmUsageGovernor(governorInput) ? governorInput : createSwarmUsageGovernor(governorInput);
  const reasons: string[] = [];
  if (governor.maxWorkers !== undefined && (usage.activeWorkers ?? 0) > governor.maxWorkers) reasons.push('max-workers');
  if (governor.maxCostUsd !== undefined && (usage.costUsd ?? 0) > governor.maxCostUsd) reasons.push('max-cost-usd');
  if ((usage.retriesUsed ?? 0) > governor.retryBudget) reasons.push('retry-budget');
  for (const [lane, maxTokens] of Object.entries(governor.maxTokensByLane)) {
    if ((usage.tokensByLane?.[lane] ?? 0) > maxTokens) reasons.push(`max-tokens:${lane}`);
  }
  return {
    ok: reasons.length === 0,
    reasons,
    ...(governor.maxWorkers !== undefined ? { recommendedMaxWorkers: Math.max(1, governor.maxWorkers - (reasons.length ? 1 : 0)) } : {}),
    preferStatic: governor.preferStaticWhenLowBudget && reasons.some((reason) => reason.startsWith('max-tokens') || reason === 'max-cost-usd')
  };
}

export function createSwarmLanePlaybook(input: FrontierSwarmLanePlaybookInput): FrontierSwarmLanePlaybook {
  const generatedAt = input.generatedAt ?? Date.now();
  const successful = (input.successfulBundles ?? []).filter((bundle) => bundle.status === 'completed' || bundle.status === 'verified' || bundle.autoMergeable);
  const hotPaths = createSwarmHotspotReport({ bundles: successful, threshold: 2, generatedAt }).entries
    .filter((entry) => entry.touchCount >= 2)
    .map((entry) => entry.path);
  return {
    kind: FRONTIER_SWARM_LANE_PLAYBOOK_KIND,
    version: FRONTIER_SWARM_LANE_PLAYBOOK_VERSION,
    id: input.id ?? 'swarm-lane-playbook:' + stableHash([input.lane, successful.map((bundle) => bundle.jobId), input.notes, generatedAt]),
    lane: normalizeId(input.lane, 'playbook lane'),
    title: input.title ?? `${titleFromId(input.lane)} Playbook`,
    generatedAt,
    notes: uniqueStrings(input.notes ?? []),
    commands: normalizeCommands(input.commands ?? []),
    avoidInvestigating: uniqueStrings(input.avoidInvestigating ?? []),
    evidencePatterns: uniqueStrings(input.evidencePatterns ?? successful.flatMap((bundle) => bundle.evidencePaths)),
    successfulJobIds: uniqueStrings(successful.map((bundle) => bundle.jobId)),
    hotPaths,
    changedRegions: uniqueStrings(successful.flatMap((bundle) => bundle.changedRegions)),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmPatchStackPlan(input: FrontierSwarmPatchStackPlanInput): FrontierSwarmPatchStackPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const maxStackSize = Math.max(1, Math.floor(input.maxStackSize ?? 8));
  const groups = new Map<string, FrontierSwarmMergeIndexEntry[]>();
  for (const entry of input.index.entries) {
    const key = patchStackKey(entry);
    groups.set(key, [...(groups.get(key) ?? []), entry]);
  }
  const stacks: FrontierSwarmPatchStack[] = [];
  for (const [key, entries] of Array.from(groups.entries()).sort((left, right) => left[0].localeCompare(right[0]))) {
    const sorted = [...entries].sort((left, right) => riskRank(left.riskLevel) - riskRank(right.riskLevel) || left.jobId.localeCompare(right.jobId));
    for (let index = 0; index < sorted.length; index += maxStackSize) {
      const slice = sorted.slice(index, index + maxStackSize);
      const jobIds = slice.map((entry) => entry.jobId);
      const conflicts = input.index.conflicts.filter((conflict) => conflict.jobIds.some((jobId) => jobIds.includes(jobId)));
      stacks.push({
        id: 'swarm-patch-stack:' + stableHash([input.index.id, key, index, jobIds]),
        title: titleFromId(key),
        ...(slice[0]?.lane ? { lane: slice[0].lane } : {}),
        jobIds,
        changedPaths: uniqueStrings(slice.flatMap((entry) => entry.changedPaths)),
        changedRegions: uniqueStrings(slice.flatMap((entry) => entry.changedRegions)),
        riskLevels: uniqueStrings(slice.map((entry) => entry.riskLevel)),
        dispositions: uniqueStrings(slice.map((entry) => entry.disposition)),
        conflicts,
        gateHints: uniqueStrings(slice.flatMap((entry) => entry.evidencePaths.filter((file) => file.endsWith('.json') || file.endsWith('.jsonl'))))
      });
    }
  }
  return {
    kind: FRONTIER_SWARM_PATCH_STACK_PLAN_KIND,
    version: FRONTIER_SWARM_PATCH_STACK_PLAN_VERSION,
    id: input.id ?? 'swarm-patch-stack-plan:' + stableHash([input.index.id, stacks, generatedAt]),
    mergeIndexId: input.index.id,
    generatedAt,
    stacks,
    summary: {
      stackCount: stacks.length,
      jobCount: input.index.entries.length,
      conflictedStackCount: stacks.filter((stack) => stack.conflicts.length > 0).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmHierarchicalMergeQueue(input: FrontierSwarmHierarchicalMergeQueueInput): FrontierSwarmHierarchicalMergeQueue {
  const generatedAt = input.generatedAt ?? Date.now();
  const rootScopeId = input.rootScopeId ?? 'root';
  const scopes = new Map<string, FrontierSwarmMergeQueueScope>();
  ensureMergeQueueScope(scopes, {
    id: rootScopeId,
    kind: 'root',
    title: 'Root merge queue',
    leaseKey: mergeQueueRootLeaseKey(rootScopeId)
  });
  for (const scope of input.scopes ?? []) ensureMergeQueueScope(scopes, scope);
  const leafScopeIdsByJob = new Map<string, string>();
  const scopesByJob = new Map<string, FrontierSwarmMergeQueueEntryScopes>();
  for (const entry of input.index.entries) {
    const entryScopes = mergeQueueScopesForEntry(entry, scopes, rootScopeId);
    scopesByJob.set(entry.jobId, entryScopes);
    leafScopeIdsByJob.set(entry.jobId, entryScopes.leafScope.id);
  }
  const admitted = new Set(input.admission?.admitted ?? []);
  const hasExplicitAdmission = input.admission !== undefined;
  const deferralsByJob = new Map((input.admission?.deferred ?? []).map((entry) => [entry.jobId, entry.reasons]));
  const assignments: FrontierSwarmMergeQueueAssignment[] = [];
  const promotions: FrontierSwarmMergeQueuePromotion[] = [];
  for (const entry of input.index.entries) {
    const entryScopes = scopesByJob.get(entry.jobId);
    const scopeId = entryScopes?.leafScope.id ?? leafScopeIdsByJob.get(entry.jobId) ?? rootScopeId;
    const scope = entryScopes?.leafScope ?? scopes.get(scopeId) ?? scopes.get(rootScopeId);
    if (!scope) throw new Error(`Missing merge queue scope: ${scopeId}`);
    const deferralReasons = deferralsByJob.get(entry.jobId) ?? [];
    const entryAdmitted = input.admission ? admitted.has(entry.jobId) : defaultMergeQueueAdmission(entry);
    const decision = classifyMergeQueueAssignment(entry, entryAdmitted, deferralReasons, {
      scope,
      entryScopes,
      leafScopeIdsByJob,
      hasExplicitAdmission
    });
    const parentScopeIds = mergeQueueParentScopeIds(scope, scopes);
    const promoteToScopeId = decision.action === 'promote'
      ? mergeQueuePromotionScopeId(entry, scope, scopes, leafScopeIdsByJob, rootScopeId)
      : undefined;
    const semanticSlices = (
      decision.action === 'rerun' && decision.reasons.includes('semantic-slice-lease-retry')
      || decision.action === 'apply-local' && decision.reasons.includes('lease-backed-cross-scope-apply')
    )
      ? cloneMergeQueueRetrySlices(entryScopes?.retrySlices ?? [])
      : [];
    const retrySlices = decision.action === 'rerun' ? semanticSlices : [];
    const semanticSliceScopeIds = uniqueStrings(semanticSlices.map((slice) => slice.scopeId));
    const semanticSliceLeaseKeys = uniqueStrings(semanticSlices.map((slice) => slice.leaseKey));
    const requiredLeases = mergeQueueRequiredLeasesForAssignment({
      action: decision.action,
      scope,
      scopes,
      promoteToScopeId,
      semanticSliceScopeIds,
      semanticSliceLeaseKeys
    });
    const assignment: FrontierSwarmMergeQueueAssignment = {
      jobId: entry.jobId,
      ...(entry.taskId ? { taskId: entry.taskId } : {}),
      ...(entry.lane ? { lane: entry.lane } : {}),
      ...(entry.title ? { title: entry.title } : {}),
      queueItemIds: entry.queueItemIds.length ? [...entry.queueItemIds] : [entry.taskId ?? entry.jobId],
      scopeId: scope.id,
      parentScopeIds,
      action: decision.action,
      reasons: decision.reasons,
      admitted: entryAdmitted,
      riskLevel: entry.riskLevel,
      disposition: entry.disposition,
      mergeReadiness: entry.mergeReadiness,
      changedPaths: [...entry.changedPaths],
      changedRegions: [...entry.changedRegions],
      conflictingJobIds: [...entry.conflictingJobIds],
      leaseKey: scope.leaseKey,
      requiredLeaseScopeIds: requiredLeases.scopeIds,
      requiredLeaseKeys: requiredLeases.leaseKeys,
      ...(promoteToScopeId ? { promoteToScopeId } : {}),
      ...(retrySlices.length ? { retrySlices } : {}),
      ...(semanticSliceScopeIds.length ? { semanticSliceScopeIds, semanticSliceLeaseKeys } : {}),
      ...(entryScopes?.parentDecisionRegions.length ? { parentDecisionRegions: [...entryScopes.parentDecisionRegions] } : {}),
      ...(entryScopes?.unknownRegions.length ? { unknownRegions: [...entryScopes.unknownRegions] } : {})
    };
    assignments.push(assignment);
    scope.jobIds = uniqueStrings([...scope.jobIds, entry.jobId]);
    if (promoteToScopeId) {
      promotions.push({
        jobId: entry.jobId,
        fromScopeId: scope.id,
        toScopeId: promoteToScopeId,
        reasons: decision.reasons
      });
    }
  }
  const byScope = groupJobIdsBy(assignments, (assignment) => assignment.scopeId);
  const byAction = groupJobIdsBy(assignments, (assignment) => assignment.action);
  const admissionPressure = summarizeSwarmMergeAdmissionPressure(assignments);
  const orderedScopes = Array.from(scopes.values()).sort((left, right) => (
    mergeQueueScopeRank(left.kind) - mergeQueueScopeRank(right.kind)
    || left.id.localeCompare(right.id)
  ));
  return {
    kind: FRONTIER_SWARM_HIERARCHICAL_MERGE_QUEUE_KIND,
    version: FRONTIER_SWARM_HIERARCHICAL_MERGE_QUEUE_VERSION,
    id: input.id ?? 'swarm-hierarchical-merge-queue:' + stableHash([input.index.id, input.admission?.id, orderedScopes, assignments, promotions, generatedAt]),
    mergeIndexId: input.index.id,
    ...(input.admission ? { admissionId: input.admission.id } : {}),
    generatedAt,
    rootScopeId,
    scopes: orderedScopes,
    assignments,
    promotions,
    byScope,
    byAction,
    summary: {
      scopeCount: orderedScopes.length,
      assignmentCount: assignments.length,
      applyLocalCount: byAction['apply-local']?.length ?? 0,
      queueLocalCount: byAction['queue-local']?.length ?? 0,
      promoteCount: byAction.promote?.length ?? 0,
      rerunCount: byAction.rerun?.length ?? 0,
      rejectCount: byAction.reject?.length ?? 0,
      blockCount: byAction.block?.length ?? 0,
      recordOnlyCount: byAction['record-only']?.length ?? 0,
      admissionPressure
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmCoordinatorAgentDrainWork(input: FrontierSwarmCoordinatorAgentDrainWorkInput): FrontierSwarmCoordinatorAgentDrainWork {
  const generatedAt = input.generatedAt ?? Date.now();
  const scopesById = new Map(input.queue.scopes.map((scope) => [scope.id, scope]));
  const leases: FrontierSwarmCoordinatorAgentDrainLease[] = input.queue.scopes.map((scope) => {
    const scopedAssignments = input.queue.assignments.filter((assignment) => (
      assignment.scopeId === scope.id || assignment.promoteToScopeId === scope.id
    ));
    const jobIds = uniqueStrings([...scope.jobIds, ...scopedAssignments.map((assignment) => assignment.jobId)]);
    return {
      id: coordinatorAgentDrainLeaseId(scope),
      queueId: scope.id,
      scopeId: scope.id,
      scopeKind: scope.kind,
      title: scope.title,
      leaseScope: scope.leaseKey,
      leaseKey: scope.leaseKey,
      ...(scope.parentId ? { parentQueueId: scope.parentId } : {}),
      ...(scope.lane ? { lane: scope.lane } : {}),
      changedPaths: [...scope.changedPaths],
      changedRegions: [...scope.changedRegions],
      jobIds,
      actions: groupJobIdsBy(scopedAssignments, (assignment) => assignment.action),
      ...(scope.metadata ? { metadata: cloneJsonValue(scope.metadata) as JsonObject } : {})
    };
  });
  const leasesByQueueId = new Map(leases.map((lease) => [lease.queueId, lease]));
  const assignments: FrontierSwarmCoordinatorAgentDrainAssignment[] = input.queue.assignments.map((assignment) => {
    const scope = scopesById.get(assignment.scopeId);
    const assignmentLeaseScopeId = coordinatorAgentDrainAssignmentLeaseScopeId(assignment);
    const leaseScopeRecord = scopesById.get(assignmentLeaseScopeId);
    const lease = leasesByQueueId.get(assignmentLeaseScopeId);
    const leaseScope = lease?.leaseScope ?? leaseScopeRecord?.leaseKey ?? assignment.leaseKey;
    const leaseId = lease?.id ?? coordinatorAgentDrainLeaseId({
      id: assignmentLeaseScopeId,
      kind: leaseScopeRecord?.kind ?? 'custom',
      leaseKey: leaseScope
    });
    const assignmentRequiredLeaseScopeIds = assignment.requiredLeaseScopeIds ?? [];
    const assignmentRequiredLeaseKeys = assignment.requiredLeaseKeys ?? [];
    const requiredLeaseScopeIds = assignmentRequiredLeaseScopeIds.length
      ? [...assignmentRequiredLeaseScopeIds]
      : [assignmentLeaseScopeId];
    const requiredLeaseKeys = assignmentRequiredLeaseKeys.length
      ? [...assignmentRequiredLeaseKeys]
      : [leaseScope];
    const decision = coordinatorAgentDrainDecisionForAction(assignment.action);
    const terminal = coordinatorAgentDrainActionIsTerminal(assignment.action);
    const parentQueueId = assignment.action === 'promote'
      ? assignment.promoteToScopeId ?? assignment.parentScopeIds[0]
      : undefined;
    return {
      id: 'swarm-coordinator-agent-drain-assignment:' + stableHash([input.queue.id, assignment.jobId, assignment.scopeId, assignment.action, parentQueueId]),
      jobId: assignment.jobId,
      ...(assignment.taskId ? { taskId: assignment.taskId } : {}),
      ...(assignment.lane ? { lane: assignment.lane } : {}),
      ...(assignment.title ? { title: assignment.title } : {}),
      queueItemIds: [...assignment.queueItemIds],
      queueId: assignment.scopeId,
      queueKind: scope?.kind ?? 'custom',
      rootQueueId: input.queue.rootScopeId,
      parentQueueIds: [...assignment.parentScopeIds],
      ...(parentQueueId ? { parentQueueId, promoteToQueueId: parentQueueId } : {}),
      leaseId,
      leaseScope,
      assignedAction: assignment.action,
      decision,
      classification: terminal ? 'terminal' : 'non-terminal',
      terminal,
      reasons: [...assignment.reasons],
      admitted: assignment.admitted,
      riskLevel: assignment.riskLevel,
      disposition: assignment.disposition,
      mergeReadiness: assignment.mergeReadiness,
      changedPaths: [...assignment.changedPaths],
      changedRegions: [...assignment.changedRegions],
      conflictingJobIds: [...assignment.conflictingJobIds],
      requiredLeaseScopeIds,
      requiredLeaseKeys,
      ...(assignment.retrySlices?.length ? { retrySlices: cloneMergeQueueRetrySlices(assignment.retrySlices) } : {}),
      ...(assignment.semanticSliceScopeIds?.length ? { semanticSliceScopeIds: [...assignment.semanticSliceScopeIds] } : {}),
      ...(assignment.semanticSliceLeaseKeys?.length ? { semanticSliceLeaseKeys: [...assignment.semanticSliceLeaseKeys] } : {}),
      ...(assignment.parentDecisionRegions?.length ? { parentDecisionRegions: [...assignment.parentDecisionRegions] } : {}),
      ...(assignment.unknownRegions?.length ? { unknownRegions: [...assignment.unknownRegions] } : {})
    };
  });
  const terminalDecisions: FrontierSwarmCoordinatorAgentDrainTerminalDecision[] = assignments
    .filter((assignment) => assignment.terminal)
    .map((assignment) => ({
      id: 'swarm-coordinator-agent-terminal-decision:' + stableHash([input.queue.id, assignment.jobId, assignment.queueId, assignment.assignedAction]),
      jobId: assignment.jobId,
      queueItemIds: [...assignment.queueItemIds],
      queueId: assignment.queueId,
      leaseId: assignment.leaseId,
      leaseScope: assignment.leaseScope,
      assignedAction: assignment.assignedAction,
      decision: assignment.decision,
      classification: 'terminal',
      terminal: true,
      reasons: [...assignment.reasons],
      requiredLeaseScopeIds: [...(assignment.requiredLeaseScopeIds ?? [])],
      requiredLeaseKeys: [...(assignment.requiredLeaseKeys ?? [])],
      ...(assignment.retrySlices?.length ? { retrySlices: cloneMergeQueueRetrySlices(assignment.retrySlices) } : {}),
      ...(assignment.semanticSliceScopeIds?.length ? { semanticSliceScopeIds: [...assignment.semanticSliceScopeIds] } : {}),
      ...(assignment.semanticSliceLeaseKeys?.length ? { semanticSliceLeaseKeys: [...assignment.semanticSliceLeaseKeys] } : {}),
      ...(assignment.parentDecisionRegions?.length ? { parentDecisionRegions: [...assignment.parentDecisionRegions] } : {}),
      ...(assignment.unknownRegions?.length ? { unknownRegions: [...assignment.unknownRegions] } : {})
    }));
  const promotedWork: FrontierSwarmCoordinatorAgentPromotedWork[] = assignments
    .filter((assignment) => assignment.assignedAction === 'promote' && assignment.parentQueueId)
    .map((assignment) => ({
      id: 'swarm-coordinator-agent-promoted-work:' + stableHash([input.queue.id, assignment.jobId, assignment.queueId, assignment.parentQueueId]),
      jobId: assignment.jobId,
      ...(assignment.taskId ? { taskId: assignment.taskId } : {}),
      ...(assignment.lane ? { lane: assignment.lane } : {}),
      queueItemIds: [...assignment.queueItemIds],
      fromQueueId: assignment.queueId,
      parentQueueId: assignment.parentQueueId as string,
      leaseId: assignment.leaseId,
      leaseScope: assignment.leaseScope,
      assignedAction: assignment.assignedAction,
      decision: assignment.decision,
      classification: 'non-terminal',
      terminal: false,
      reasons: [...assignment.reasons],
      requiredLeaseScopeIds: [...(assignment.requiredLeaseScopeIds ?? [])],
      requiredLeaseKeys: [...(assignment.requiredLeaseKeys ?? [])]
    }));
  const activeAssignments = assignments.filter((assignment) => !coordinatorAgentDrainAssignmentIsTerminal(assignment));
  const blockers = terminalDecisions.filter((decision) => decision.assignedAction === 'block' || decision.decision === 'blocked');
  const byAction = groupJobIdsBy(assignments, (assignment) => assignment.assignedAction);
  const byDecision = groupJobIdsBy(assignments, (assignment) => assignment.decision);
  const byClassification = groupJobIdsBy(assignments, (assignment) => assignment.classification);
  const byQueueId = groupJobIdsBy(assignments, (assignment) => assignment.queueId);
  const byLeaseScope = groupJobIdsBy(assignments, (assignment) => assignment.leaseScope);
  const consumerSummary = summarizeSwarmCoordinatorAgentDrainWork({ leases, assignments, terminalDecisions, promotedWork });
  return {
    kind: FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_KIND,
    version: FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_VERSION,
    id: input.id ?? 'swarm-coordinator-agent-drain-work:' + stableHash([input.queue.id, input.coordinatorId, assignments, promotedWork, generatedAt]),
    queueId: input.queue.id,
    mergeIndexId: input.queue.mergeIndexId,
    ...(input.queue.admissionId ? { admissionId: input.queue.admissionId } : {}),
    ...(input.coordinatorId ? { coordinatorId: input.coordinatorId } : {}),
    generatedAt,
    rootQueueId: input.queue.rootScopeId,
    leases,
    assignments,
    activeAssignments,
    terminalDecisions,
    promotedWork,
    blockers,
    byAction,
    byDecision,
    byClassification,
    byQueueId,
    byLeaseScope,
    summary: {
      leaseCount: leases.length,
      assignmentCount: assignments.length,
      activeAssignmentCount: consumerSummary.activeAssignmentCount,
      terminalCount: terminalDecisions.length,
      nonTerminalCount: assignments.length - terminalDecisions.length,
      promotedWorkCount: promotedWork.length,
      blockerCount: consumerSummary.blockerCount,
      queueItemCount: consumerSummary.queueItemCount,
      activeQueueItemCount: consumerSummary.activeQueueItemCount,
      terminalQueueItemCount: consumerSummary.terminalQueueItemCount,
      promotedQueueItemCount: consumerSummary.promotedQueueItemCount,
      blockerQueueItemCount: consumerSummary.blockerQueueItemCount,
      appliedCount: assignments.filter((assignment) => assignment.decision === 'applied').length,
      queuedCount: assignments.filter((assignment) => assignment.decision === 'queued').length,
      escalatedCount: assignments.filter((assignment) => assignment.decision === 'escalated').length,
      rerunCount: assignments.filter((assignment) => assignment.decision === 'rerun').length,
      rejectedCount: assignments.filter((assignment) => assignment.decision === 'rejected').length,
      recordedCount: assignments.filter((assignment) => assignment.decision === 'recorded').length,
      blockedCount: assignments.filter((assignment) => assignment.decision === 'blocked').length,
      admissionPressure: consumerSummary.admissionPressure,
      rootQueueSelectionPressure: consumerSummary.rootQueueSelectionPressure
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function summarizeSwarmCoordinatorAgentDrainWork(
  work: Pick<FrontierSwarmCoordinatorAgentDrainWork, 'leases' | 'assignments' | 'terminalDecisions' | 'promotedWork'>
): FrontierSwarmCoordinatorAgentDrainWorkConsumerSummary {
  const activeAssignments = work.assignments.filter((assignment) => !coordinatorAgentDrainAssignmentIsTerminal(assignment));
  const terminalAssignments = work.assignments.filter((assignment) => coordinatorAgentDrainAssignmentIsTerminal(assignment));
  const blockerAssignments = work.assignments.filter((assignment) => coordinatorAgentDrainAssignmentIsBlocker(assignment));
  return {
    leaseCount: work.leases.length,
    assignmentCount: work.assignments.length,
    activeAssignmentCount: activeAssignments.length,
    terminalCount: terminalAssignments.length,
    promotedWorkCount: work.promotedWork.length,
    blockerCount: blockerAssignments.length,
    queueItemCount: countUniqueDrainQueueItems(work.assignments),
    activeQueueItemCount: countUniqueDrainQueueItems(activeAssignments),
    terminalQueueItemCount: countUniqueDrainQueueItems(terminalAssignments),
    promotedQueueItemCount: countUniqueDrainQueueItems(work.promotedWork),
    blockerQueueItemCount: countUniqueDrainQueueItems(blockerAssignments),
    admissionPressure: summarizeSwarmMergeAdmissionPressure(work.assignments),
    rootQueueSelectionPressure: summarizeRootQueueSelectionPressure(work)
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
    .map((job) => ({
      jobId: job.id,
      lane: job.lane,
      compute: job.compute.id,
      concurrencyKey: job.concurrencyKey,
      capabilities: [...job.capabilities],
      ...(job.resourceRequirements ? { resourceRequirements: cloneJsonValue(job.resourceRequirements) as FrontierSwarmResourceRequirements } : {}),
      metadata: priorityDecisionMetadata(job.metadata, priorityDecisionForJob(job))
    }));
  const runningByLane = countBy(runningJobs.map((job) => job.lane));
  const runningByKey = countBy(runningJobs.map((job) => job.concurrencyKey));
  const runningByCompute = countBy(runningJobs.map((job) => job.compute));
  const runningByResource = resourceUsageFromScheduled(runningJobs);
  const ready: FrontierSwarmScheduledJob[] = [];
  const blocked: FrontierSwarmBlockedJob[] = [];
  const sortedJobs = orderJobsByPriorityPolicy(plan.jobs);
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
    for (const resource of resourceQuotaViolations(scheduled, runningByResource, limits.resourceQuotas)) {
      reasons.push(`resource-capacity:${resource}`);
    }
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
    addResourceUsage(runningByResource, scheduled);
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
    },
    metadata: priorityPolicyMetadata(undefined, plan.jobs, { ready, blocked, running: runningJobs })
  };
}

export function createSwarmSchedulerRecommendations(input: FrontierSwarmSchedulerRecommendationsInput): FrontierSwarmSchedulerRecommendations {
  const generatedAt = input.generatedAt ?? Date.now();
  const recommendations: FrontierSwarmSchedulerRecommendation[] = [];
  const blockedByReason = new Map<string, FrontierSwarmBlockedJob[]>();
  for (const job of input.schedule.blocked) {
    for (const reason of job.reasons) blockedByReason.set(reason, [...(blockedByReason.get(reason) ?? []), job]);
  }
  for (const [reason, jobs] of blockedByReason) {
    const resource = reason.startsWith('resource-capacity:') ? reason.slice('resource-capacity:'.length) : undefined;
    recommendations.push({
      id: 'swarm-scheduler-recommendation:' + stableHash([input.schedule.id, reason, jobs.map((job) => job.jobId), generatedAt]),
      reason,
      jobIds: jobs.map((job) => job.jobId).sort(),
      ...(resource ? { resource } : {}),
      ...(jobs[0]?.lane ? { lane: jobs[0].lane } : {}),
      action: schedulerActionForReason(reason),
      priority: schedulerPriorityForReason(reason)
    });
  }
  for (const conflict of input.mergeIndex?.conflicts ?? []) {
    recommendations.push({
      id: 'swarm-scheduler-recommendation:' + stableHash([input.schedule.id, conflict.key, conflict.jobIds, generatedAt]),
      reason: `merge-conflict:${conflict.kind}`,
      jobIds: [...conflict.jobIds],
      action: 'serialize-conflicting-surface-or-split-ownership',
      priority: 15
    });
  }
  return {
    kind: FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_KIND,
    version: FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_VERSION,
    id: input.id ?? 'swarm-scheduler-recommendations:' + stableHash([input.schedule.id, recommendations, generatedAt]),
    scheduleId: input.schedule.id,
    generatedAt,
    recommendations: recommendations.sort((left, right) => left.priority - right.priority || left.id.localeCompare(right.id)),
    summary: { recommendationCount: recommendations.length },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
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

export function renewSwarmLease(input: FrontierSwarmLeaseRenewalInput): FrontierSwarmLease {
  const now = input.now ?? Date.now();
  const leaseMs = Math.max(1, Math.floor(input.leaseMs ?? Math.max(1, input.lease.expiresAt - input.lease.leasedAt)));
  return {
    ...cloneJsonValue(input.lease),
    leasedAt: now,
    expiresAt: now + leaseMs,
    status: input.status ?? 'active'
  };
}

export function createSwarmQueueSnapshot(input: FrontierSwarmQueueSnapshotInput): FrontierSwarmQueueSnapshot {
  const generatedAt = input.generatedAt ?? Date.now();
  const leases = [...(input.leases ?? [])].map((lease) => cloneJsonValue(lease) as FrontierSwarmLease);
  const jobs = orderQueueJobsByPriorityPolicy(input.jobs ? input.jobs.map(normalizeQueueJob) : queueJobsFromPlan(input.plan, input.run, leases));
  const byStatus = groupIds(jobs, (job) => job.status);
  const byLane = groupIds(jobs, (job) => job.lane ?? 'unassigned');
  return {
    kind: FRONTIER_SWARM_QUEUE_SNAPSHOT_KIND,
    version: FRONTIER_SWARM_QUEUE_SNAPSHOT_VERSION,
    id: input.id ?? 'swarm-queue-snapshot:' + stableHash([input.plan.id, input.run?.id, jobs, leases, generatedAt]),
    planId: input.plan.id,
    runId: input.run?.id ?? input.plan.runId,
    generatedAt,
    jobs,
    byStatus,
    byLane,
    leases,
    metadata: priorityPolicyMetadata(input.metadata, jobs),
    summary: {
      jobCount: jobs.length,
      leaseCount: leases.length,
      readyCount: byStatus.ready?.length ?? 0,
      leasedCount: byStatus.leased?.length ?? 0,
      completedCount: byStatus.completed?.length ?? 0,
      failedCount: byStatus.failed?.length ?? 0,
      deadLetterCount: byStatus['dead-letter']?.length ?? 0
    }
  };
}

export function createSwarmRunCheckpoint(input: FrontierSwarmRun | FrontierSwarmRunCheckpointInput): FrontierSwarmRunCheckpoint {
  const run = 'kind' in input ? input : input.run;
  const sequence = 'kind' in input ? run.events.length + run.results.length : input.sequence ?? run.events.length + run.results.length;
  const savedAt = 'kind' in input ? Date.now() : input.savedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_RUN_CHECKPOINT_KIND,
    version: FRONTIER_SWARM_RUN_CHECKPOINT_VERSION,
    id: 'swarm-run-checkpoint:' + stableHash([run.id, sequence, savedAt, run.summary]),
    runId: run.id,
    planId: run.planId,
    sequence,
    savedAt,
    status: run.status,
    eventCount: run.events.length,
    resultCount: run.results.length,
    hash: stableHash(run),
    ...(!('kind' in input) && toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
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

function mergeScheduleLimits(base: FrontierSwarmScheduleLimits, override: Partial<FrontierSwarmScheduleInput>): FrontierSwarmScheduleLimits {
  return {
    maxReadyJobs: positiveNumber(override.maxReadyJobs) ? Math.floor(override.maxReadyJobs as number) : base.maxReadyJobs,
    maxLaneConcurrency: { ...base.maxLaneConcurrency, ...(override.maxLaneConcurrency ?? {}) },
    maxConcurrencyKeyConcurrency: { ...base.maxConcurrencyKeyConcurrency, ...(override.maxConcurrencyKeyConcurrency ?? {}) },
    maxComputeConcurrency: { ...base.maxComputeConcurrency, ...(override.maxComputeConcurrency ?? {}) },
    resourceQuotas: { ...base.resourceQuotas, ...normalizeResourceQuotas(override.resourceQuotas ?? {}) }
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
    dependsOn: [...dependsOn],
    capabilities: [...job.capabilities],
    ...(job.resourceRequirements ? { resourceRequirements: cloneJsonValue(job.resourceRequirements) as FrontierSwarmResourceRequirements } : {}),
    metadata: priorityDecisionMetadata(job.metadata, priorityDecisionForJob(job))
  };
}

function normalizeResourceQuotas(input: Record<string, number>): Record<string, number> {
  const quotas: Record<string, number> = {};
  for (const [resource, value] of Object.entries(input)) {
    if (positiveNumber(value)) quotas[resource] = value;
  }
  return quotas;
}

function resourceUsageFromScheduled(jobs: readonly (FrontierSwarmScheduledJob | FrontierSwarmRunningJob)[]): Record<string, number> {
  const usage: Record<string, number> = {};
  for (const job of jobs) addResourceUsage(usage, job);
  return usage;
}

function addResourceUsage(usage: Record<string, number>, job: FrontierSwarmScheduledJob | FrontierSwarmRunningJob): void {
  for (const [resource, amount] of Object.entries(job.resourceRequirements?.resources ?? {})) {
    usage[resource] = (usage[resource] ?? 0) + amount;
  }
  if (job.resourceRequirements?.browser?.required) {
    if (job.resourceRequirements.resources.browser === undefined) usage.browser = (usage.browser ?? 0) + 1;
    if (job.resourceRequirements.resources['browser-port'] === undefined) usage['browser-port'] = (usage['browser-port'] ?? 0) + 1;
  }
}

function resourceQuotaViolations(
  job: FrontierSwarmScheduledJob,
  usage: Record<string, number>,
  quotas: Record<string, number>
): string[] {
  const next = { ...usage };
  addResourceUsage(next, job);
  return Object.entries(quotas)
    .filter(([resource, quota]) => (next[resource] ?? 0) > quota)
    .map(([resource]) => resource)
    .sort();
}

function schedulerActionForReason(reason: string): string {
  if (reason.startsWith('resource-capacity:')) return 'lower-concurrency-or-add-resource-pool';
  if (reason === 'lane-capacity') return 'increase-lane-capacity-or-split-lane';
  if (reason === 'compute-capacity') return 'increase-compute-capacity-or-use-another-compute';
  if (reason === 'concurrency-key-capacity') return 'serialize-or-split-concurrency-key';
  if (reason === 'waiting-for-dependencies') return 'prioritize-dependency-chain';
  if (reason === 'ready-capacity') return 'raise-ready-window-or-drain-ready-jobs';
  return 'review-scheduler-blocker';
}

function schedulerPriorityForReason(reason: string): number {
  if (reason.startsWith('resource-capacity:')) return 10;
  if (reason === 'waiting-for-dependencies') return 20;
  if (reason === 'ready-capacity') return 25;
  return 30;
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
  const conflicts = new Map<string, Set<string>>();
  for (let leftIndex = 0; leftIndex < results.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < results.length; rightIndex += 1) {
      const left = results[leftIndex];
      const right = results[rightIndex];
      if (!left || !right || pairConflictKeys(left, right).length === 0) continue;
      const leftConflicts = conflicts.get(left.jobId) ?? new Set<string>();
      const rightConflicts = conflicts.get(right.jobId) ?? new Set<string>();
      leftConflicts.add(right.jobId);
      rightConflicts.add(left.jobId);
      conflicts.set(left.jobId, leftConflicts);
      conflicts.set(right.jobId, rightConflicts);
    }
  }
  return conflicts;
}

function queueOverlayStatusFromBundle(bundle: FrontierSwarmMergeBundle): FrontierSwarmQueueOverlayStatus {
  if (bundle.staleAgainstHead || bundle.disposition === 'stale-against-head') return 'stale-against-head';
  if (bundle.disposition === 'rejected' || bundle.disposition === 'blocked' || bundle.status === 'failed' || bundle.commandsFailed.length > 0) {
    return 'failed-evidence';
  }
  if (bundle.disposition === 'auto-mergeable' && bundle.autoMergeable) return 'ready-to-apply';
  if (bundle.disposition === 'needs-port') return 'needs-human-port';
  if (bundle.disposition === 'discovery-only') return 'discovery-only';
  if (bundle.mergeReadiness === 'blocked') return 'blocked';
  if (bundle.mergeReadiness === 'rejected') return 'rejected';
  return 'unknown';
}

function queueOverlayStatusFromResult(result: FrontierSwarmJobResult): FrontierSwarmQueueOverlayStatus {
  if (result.mergeDisposition === 'stale-against-head') return 'stale-against-head';
  if (result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0 || result.ownershipViolations.length > 0) return 'failed-evidence';
  if (result.mergeDisposition === 'auto-mergeable') return 'ready-to-apply';
  if (result.mergeDisposition === 'needs-port') return 'needs-human-port';
  if (result.mergeDisposition === 'discovery-only') return 'discovery-only';
  if (result.status === 'blocked') return 'blocked';
  return 'unknown';
}

function queueJobStatusFromOverlay(entry: FrontierSwarmQueueOverlayEntry): FrontierSwarmQueueJobStatus {
  if (entry.status === 'ready-to-apply' || entry.status === 'discovery-only') return 'completed';
  if (entry.status === 'needs-human-port') return 'blocked';
  if (entry.status === 'failed-evidence' || entry.status === 'rejected' || entry.status === 'stale-against-head') return 'failed';
  if (entry.status === 'blocked') return 'blocked';
  return 'completed';
}

function groupOverlayEntries(entries: readonly FrontierSwarmQueueOverlayEntry[]): Record<string, FrontierSwarmQueueOverlayEntry[]> {
  const out: Record<string, FrontierSwarmQueueOverlayEntry[]> = {};
  for (const entry of entries) out[entry.queueItemId] = [...(out[entry.queueItemId] ?? []), entry];
  for (const key of Object.keys(out)) {
    out[key] = [...(out[key] ?? [])].sort((left, right) => right.generatedAt - left.generatedAt || left.jobId.localeCompare(right.jobId));
  }
  return out;
}

function mergeIndexConflictKeys(bundle: FrontierSwarmMergeBundle): string[] {
  return bundle.changedRegions.length
    ? bundle.changedRegions.map((region) => `region:${region}`).sort()
    : bundle.changedPaths.map((file) => `path:${file}`).sort();
}

function createMergeIndexConflicts(entries: readonly FrontierSwarmMergeIndexEntry[]): FrontierSwarmMergeConflict[] {
  const conflicts: FrontierSwarmMergeConflict[] = [];
  for (let leftIndex = 0; leftIndex < entries.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < entries.length; rightIndex += 1) {
      const left = entries[leftIndex];
      const right = entries[rightIndex];
      if (!left || !right) continue;
      const keys = pairConflictKeys(left, right);
      for (const key of keys) {
        const kind = key.startsWith('region:') ? 'region' as const : 'path' as const;
        const value = key.slice(key.indexOf(':') + 1);
        conflicts.push({
          jobIds: [left.jobId, right.jobId].sort(),
          key,
          kind,
          ...(kind === 'region' ? { region: value } : { path: value })
        });
      }
    }
  }
  const deduped = new Map<string, FrontierSwarmMergeConflict>();
  for (const conflict of conflicts) deduped.set(`${conflict.key}:${conflict.jobIds.join(',')}`, conflict);
  return Array.from(deduped.values()).sort((left, right) => left.key.localeCompare(right.key) || left.jobIds.join(',').localeCompare(right.jobIds.join(',')));
}

function pairConflictKeys(
  left: Pick<FrontierSwarmJobResult | FrontierSwarmMergeIndexEntry, 'changedPaths' | 'changedRegions'>,
  right: Pick<FrontierSwarmJobResult | FrontierSwarmMergeIndexEntry, 'changedPaths' | 'changedRegions'>
): string[] {
  if (left.changedRegions.length > 0 && right.changedRegions.length > 0) {
    const rightRegions = new Set(right.changedRegions);
    return left.changedRegions.filter((region) => rightRegions.has(region)).map((region) => `region:${region}`).sort();
  }
  const rightPaths = new Set(right.changedPaths);
  return left.changedPaths.filter((file) => rightPaths.has(file)).map((file) => `path:${file}`).sort();
}

function groupJobIdsBy<T extends { jobId: string }>(items: readonly T[], key: (item: T) => string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const item of items) out[key(item)] = uniqueStrings([...(out[key(item)] ?? []), item.jobId]);
  return out;
}

function groupJobIdsByMany<T extends { jobId: string }>(items: readonly T[], key: (item: T) => readonly string[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const item of items) {
    for (const value of key(item)) out[value] = uniqueStrings([...(out[value] ?? []), item.jobId]);
  }
  return out;
}

function suggestedModuleId(file: string): string {
  const base = file.split('/').pop()?.replace(/\.[^.]+$/, '') ?? file;
  return slug(base).replace(/-/g, '.');
}

function reviewerLaneReasons(entry: FrontierSwarmMergeIndexEntry): string[] {
  const reasons: string[] = [];
  if (entry.conflictingJobIds.length) reasons.push('conflicting-changes');
  if (entry.riskLevel === 'high') reasons.push('high-risk');
  if (entry.disposition !== 'auto-mergeable') reasons.push(entry.disposition);
  if (!entry.autoMergeable) reasons.push('not-auto-mergeable');
  if (entry.staleAgainstHead) reasons.push('stale-against-head');
  return uniqueStrings(reasons);
}

function ensureMergeQueueScope(
  scopes: Map<string, FrontierSwarmMergeQueueScope>,
  input: FrontierSwarmMergeQueueScopeInput
): FrontierSwarmMergeQueueScope {
  const existing = scopes.get(input.id);
  if (existing) {
    if (input.kind) existing.kind = input.kind;
    if (input.parentId) existing.parentId = input.parentId;
    if (input.title) existing.title = input.title;
    if (input.lane) existing.lane = input.lane;
    existing.changedPaths = uniqueStrings([...existing.changedPaths, ...(input.changedPaths ?? [])]);
    existing.changedRegions = uniqueStrings([...existing.changedRegions, ...(input.changedRegions ?? [])]);
    if (input.leaseKey) existing.leaseKey = input.leaseKey;
    const metadata = toJsonObject(input.metadata);
    if (metadata) existing.metadata = metadata;
    return existing;
  }
  const scope: FrontierSwarmMergeQueueScope = {
    id: input.id,
    kind: input.kind ?? 'custom',
    ...(input.parentId ? { parentId: input.parentId } : {}),
    title: input.title ?? titleFromId(input.id),
    ...(input.lane ? { lane: input.lane } : {}),
    changedPaths: uniqueStrings(input.changedPaths ?? []),
    changedRegions: uniqueStrings(input.changedRegions ?? []),
    leaseKey: input.leaseKey ?? `merge:${input.id}`,
    jobIds: [],
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
  scopes.set(scope.id, scope);
  return scope;
}

function mergeQueueRootLeaseKey(rootScopeId: string): string {
  return rootScopeId === 'root' ? 'merge:repo:*' : `merge:repo:${rootScopeId}`;
}

function mergeQueueScopesForEntry(
  entry: FrontierSwarmMergeIndexEntry,
  scopes: Map<string, FrontierSwarmMergeQueueScope>,
  rootScopeId: string
): FrontierSwarmMergeQueueEntryScopes {
  const rootScope = scopes.get(rootScopeId) ?? ensureMergeQueueScope(scopes, {
    id: rootScopeId,
    kind: 'root',
    title: 'Root merge queue',
    leaseKey: mergeQueueRootLeaseKey(rootScopeId)
  });
  const laneScope = entry.lane
    ? ensureMergeQueueScope(scopes, {
      id: `lane:${slug(entry.lane)}`,
      kind: 'lane',
      parentId: rootScopeId,
      title: `${titleFromId(entry.lane)} merge queue`,
      lane: entry.lane,
      leaseKey: `merge:lane:${entry.lane}`
    })
    : undefined;
  const parentId = laneScope?.id ?? rootScopeId;
  const changedRegions = uniqueStrings(entry.changedRegions);
  const unknownRegions = changedRegions.filter(mergeQueueRegionIsUnknown);
  const semanticRegions = changedRegions.filter((region) => !mergeQueueRegionIsUnknown(region));
  const parentDecisionRegions = semanticRegions.filter(mergeQueueRegionRequiresParentDecision);
  const semanticScopes = semanticRegions.map((region) => ensureMergeQueueScope(scopes, {
    id: `semantic-region:${stableHash([parentId, region])}`,
    kind: 'semantic-region',
    parentId,
    title: `Semantic region ${region}`,
    ...(entry.lane ? { lane: entry.lane } : {}),
    changedPaths: entry.changedPaths,
    changedRegions: [region],
    leaseKey: `merge:semantic:${entry.lane ?? 'root'}:${region}`
  }));
  const shouldCreatePathScopes = changedRegions.length === 0 || unknownRegions.length > 0;
  const pathScopes = shouldCreatePathScopes
    ? uniqueStrings(entry.changedPaths).map((file) => ensureMergeQueueScope(scopes, {
      id: `path:${stableHash([parentId, file])}`,
      kind: 'path',
      parentId,
      title: `Path ${file}`,
      ...(entry.lane ? { lane: entry.lane } : {}),
      changedPaths: [file],
      ...(unknownRegions.length ? { changedRegions: unknownRegions } : {}),
      leaseKey: `merge:path:${file}`
    }))
    : [];
  const leafScope = semanticScopes.length === 1 && unknownRegions.length === 0
    ? semanticScopes[0] as FrontierSwarmMergeQueueScope
    : pathScopes.length === 1 && semanticScopes.length === 0
      ? pathScopes[0] as FrontierSwarmMergeQueueScope
      : entry.changedPaths.length === 0 && changedRegions.length === 0
        ? rootScope
      : laneScope ?? rootScope;
  const reasons: string[] = [];
  if (unknownRegions.length) reasons.push('unknown-semantic-region');
  if (parentDecisionRegions.length) reasons.push('public-api-or-contract-region');
  if (semanticScopes.length + pathScopes.length > 1) reasons.push('cross-scope-change');
  const retrySlices = semanticScopes
    .filter((scope) => scope.changedRegions.every((region) => !mergeQueueRegionRequiresParentDecision(region)))
    .map((scope) => mergeQueueRetrySliceForScope(entry, scope, scopes));
  return {
    leafScope,
    scopeIds: uniqueStrings([...semanticScopes.map((scope) => scope.id), ...pathScopes.map((scope) => scope.id), leafScope.id]),
    semanticScopeIds: semanticScopes.map((scope) => scope.id),
    pathScopeIds: pathScopes.map((scope) => scope.id),
    unknownRegions,
    parentDecisionRegions,
    retrySlices,
    reasons: uniqueStrings(reasons)
  };
}

function mergeQueueParentScopeIds(scope: FrontierSwarmMergeQueueScope, scopes: Map<string, FrontierSwarmMergeQueueScope>): string[] {
  const parentIds: string[] = [];
  const visited = new Set<string>([scope.id]);
  let next = scope.parentId;
  while (next && !visited.has(next)) {
    parentIds.push(next);
    visited.add(next);
    next = scopes.get(next)?.parentId;
  }
  return parentIds;
}

function mergeQueueRetrySliceForScope(
  entry: FrontierSwarmMergeIndexEntry,
  scope: FrontierSwarmMergeQueueScope,
  scopes: Map<string, FrontierSwarmMergeQueueScope>
): FrontierSwarmMergeQueueRetrySlice {
  return {
    id: 'swarm-merge-queue-retry-slice:' + stableHash([entry.jobId, scope.id, scope.leaseKey]),
    scopeId: scope.id,
    kind: scope.kind,
    parentScopeIds: mergeQueueParentScopeIds(scope, scopes),
    leaseKey: scope.leaseKey,
    ...(scope.lane ? { lane: scope.lane } : {}),
    changedPaths: [...scope.changedPaths],
    changedRegions: [...scope.changedRegions],
    reasons: ['semantic-slice-lease-retry']
  };
}

function cloneMergeQueueRetrySlices(slices: readonly FrontierSwarmMergeQueueRetrySlice[]): FrontierSwarmMergeQueueRetrySlice[] {
  return slices.map((slice) => ({
    id: slice.id,
    scopeId: slice.scopeId,
    kind: slice.kind,
    parentScopeIds: [...slice.parentScopeIds],
    leaseKey: slice.leaseKey,
    ...(slice.lane ? { lane: slice.lane } : {}),
    changedPaths: [...slice.changedPaths],
    changedRegions: [...slice.changedRegions],
    reasons: [...slice.reasons]
  }));
}

function mergeQueueRequiredLeasesForAssignment(input: {
  action: FrontierSwarmMergeQueueAssignmentAction;
  scope: FrontierSwarmMergeQueueScope;
  scopes: Map<string, FrontierSwarmMergeQueueScope>;
  promoteToScopeId?: string;
  semanticSliceScopeIds: readonly string[];
  semanticSliceLeaseKeys: readonly string[];
}): { scopeIds: string[]; leaseKeys: string[] } {
  const hasSemanticSliceLeases = input.semanticSliceScopeIds.length > 0 && input.semanticSliceLeaseKeys.length > 0;
  if ((input.action === 'apply-local' || input.action === 'rerun') && hasSemanticSliceLeases) {
    return {
      scopeIds: uniqueStrings(input.semanticSliceScopeIds),
      leaseKeys: uniqueStrings(input.semanticSliceLeaseKeys)
    };
  }
  if (input.action === 'promote' && input.promoteToScopeId) {
    const promotedScope = input.scopes.get(input.promoteToScopeId);
    return {
      scopeIds: [input.promoteToScopeId],
      leaseKeys: [promotedScope?.leaseKey ?? input.scope.leaseKey]
    };
  }
  return {
    scopeIds: [input.scope.id],
    leaseKeys: [input.scope.leaseKey]
  };
}

function classifyMergeQueueAssignment(
  entry: FrontierSwarmMergeIndexEntry,
  admitted: boolean,
  deferralReasons: readonly string[],
  context: {
    scope: FrontierSwarmMergeQueueScope;
    entryScopes?: FrontierSwarmMergeQueueEntryScopes;
    leafScopeIdsByJob: Map<string, string>;
    hasExplicitAdmission: boolean;
  }
): { action: FrontierSwarmMergeQueueAssignmentAction; reasons: string[] } {
  const reasons = uniqueStrings([...reviewerLaneReasons(entry), ...deferralReasons, ...(context.entryScopes?.reasons ?? [])]);
  if (entry.staleAgainstHead || entry.disposition === 'stale-against-head') {
    return { action: 'rerun', reasons: uniqueStrings(['stale-against-head', ...reasons]) };
  }
  if (
    entry.disposition === 'rejected'
    || entry.status === 'failed'
    || entry.ownershipViolations.length > 0
    || entry.patchStatus === 'failed-check'
  ) {
    return { action: 'reject', reasons: uniqueStrings(['failed-or-invalid-evidence', ...reasons]) };
  }
  if (entry.disposition === 'discovery-only' || entry.mergeReadiness === 'discovery-only') {
    return { action: 'record-only', reasons: uniqueStrings(['discovery-only', ...reasons]) };
  }
  if (entry.disposition === 'blocked' || entry.mergeReadiness === 'blocked' || entry.status === 'blocked') {
    return { action: 'block', reasons: uniqueStrings(['true-blocker', ...reasons]) };
  }
  if (entry.riskLevel === 'high') {
    return { action: 'promote', reasons: uniqueStrings(['high-risk', ...reasons]) };
  }
  const cleanAutoMerge = entry.disposition === 'auto-mergeable' && entry.autoMergeable;
  if (cleanAutoMerge && (context.entryScopes?.parentDecisionRegions.length ?? 0) > 0) {
    return { action: 'promote', reasons: uniqueStrings(['public-api-or-contract-region', ...reasons]) };
  }
  if (cleanAutoMerge && (context.entryScopes?.unknownRegions.length ?? 0) > 0) {
    return { action: 'promote', reasons: uniqueStrings(['unknown-semantic-region', ...reasons]) };
  }
  const explicitlyAdmitted = context.hasExplicitAdmission && admitted;
  if (!explicitlyAdmitted && cleanAutoMerge && mergeQueueEntryCanRetrySemanticSlices(context.entryScopes)) {
    return { action: 'rerun', reasons: uniqueStrings(['semantic-slice-lease-retry', 'cross-scope-change', ...reasons]) };
  }
  if (!explicitlyAdmitted && cleanAutoMerge && mergeQueueEntrySpansMultipleLeaseScopes(entry, context.entryScopes)) {
    return { action: 'promote', reasons: uniqueStrings(['cross-scope-change', ...reasons]) };
  }
  if (cleanAutoMerge && entry.conflictingJobIds.length > 0 && mergeQueueConflictsStayInScope(entry, context.scope, context.leafScopeIdsByJob)) {
    return { action: 'queue-local', reasons: uniqueStrings(['same-lease-scope-conflict', ...reasons]) };
  }
  if (cleanAutoMerge && entry.conflictingJobIds.length === 0) {
    if (admitted) {
      const admittedReasons = mergeQueueEntrySpansMultipleLeaseScopes(entry, context.entryScopes)
        ? ['admitted-by-merge-admission', 'lease-backed-cross-scope-apply']
        : ['admitted-by-merge-admission'];
      return { action: 'apply-local', reasons: uniqueStrings([...admittedReasons, ...reasons]) };
    }
    return {
      action: 'queue-local',
      reasons: uniqueStrings([...(deferralReasons.length ? deferralReasons : ['waiting-for-local-queue-capacity']), ...reasons])
    };
  }
  return { action: 'promote', reasons: uniqueStrings(['coordinator-queue-required', ...reasons]) };
}

function mergeQueueEntrySpansMultipleLeaseScopes(
  entry: FrontierSwarmMergeIndexEntry,
  entryScopes?: FrontierSwarmMergeQueueEntryScopes
): boolean {
  if (entryScopes) {
    if (entryScopes.unknownRegions.length > 0) return true;
    return uniqueStrings([...entryScopes.semanticScopeIds, ...entryScopes.pathScopeIds]).length > 1;
  }
  if (entry.changedRegions.length > 1) return true;
  return entry.changedRegions.length === 0 && entry.changedPaths.length > 1;
}

function mergeQueueEntryCanRetrySemanticSlices(entryScopes?: FrontierSwarmMergeQueueEntryScopes): boolean {
  return (entryScopes?.retrySlices.length ?? 0) > 1
    && (entryScopes?.unknownRegions.length ?? 0) === 0
    && (entryScopes?.parentDecisionRegions.length ?? 0) === 0
    && (entryScopes?.pathScopeIds.length ?? 0) === 0;
}

function mergeQueueRegionIsUnknown(region: string): boolean {
  const normalized = region.trim().toLowerCase();
  if (!normalized || normalized === '*') return true;
  const tokens = mergeQueueRegionTokens(normalized);
  return tokens.includes('unknown')
    || tokens.includes('unclassified')
    || tokens.includes('unresolved')
    || tokens.includes('ambiguous')
    || tokens.includes('fallback');
}

function mergeQueueRegionRequiresParentDecision(region: string): boolean {
  const tokens = mergeQueueRegionTokens(region.toLowerCase());
  const hasPublic = tokens.includes('public');
  const hasApi = tokens.includes('api');
  return tokens.includes('contract')
    || tokens.includes('contracts')
    || tokens.includes('publicapi')
    || tokens.includes('publicinterface')
    || tokens.includes('exports')
    || tokens.includes('export')
    || (hasPublic && (hasApi || tokens.includes('surface') || tokens.includes('interface')));
}

function mergeQueueRegionTokens(region: string): string[] {
  return uniqueStrings(region.split(/[^a-z0-9]+/u).filter(Boolean));
}

function mergeQueueConflictsStayInScope(
  entry: FrontierSwarmMergeIndexEntry,
  scope: FrontierSwarmMergeQueueScope,
  leafScopeIdsByJob: Map<string, string>
): boolean {
  return entry.conflictingJobIds.length > 0
    && entry.conflictingJobIds.every((jobId) => leafScopeIdsByJob.get(jobId) === scope.id);
}

function defaultMergeQueueAdmission(entry: FrontierSwarmMergeIndexEntry): boolean {
  return entry.disposition === 'auto-mergeable'
    && entry.autoMergeable
    && !entry.staleAgainstHead
    && entry.conflictingJobIds.length === 0
    && entry.ownershipViolations.length === 0
    && entry.riskLevel !== 'high';
}

function mergeQueuePromotionScopeId(
  entry: FrontierSwarmMergeIndexEntry,
  scope: FrontierSwarmMergeQueueScope,
  scopes: Map<string, FrontierSwarmMergeQueueScope>,
  leafScopeIdsByJob: Map<string, string>,
  rootScopeId: string
): string {
  if (entry.riskLevel === 'high') return rootScopeId;
  if (entry.conflictingJobIds.length > 0) {
    const conflictScopes = entry.conflictingJobIds
      .map((jobId) => leafScopeIdsByJob.get(jobId))
      .filter((value): value is string => Boolean(value))
      .map((scopeId) => scopes.get(scopeId))
      .filter((value): value is FrontierSwarmMergeQueueScope => Boolean(value));
    const sameLane = conflictScopes.length > 0 && conflictScopes.every((conflictScope) => conflictScope.lane === scope.lane && scope.lane !== undefined);
    if (!sameLane) return rootScopeId;
    const laneParent = mergeQueueParentScopeIds(scope, scopes).find((scopeId) => scopes.get(scopeId)?.kind === 'lane');
    return laneParent ?? rootScopeId;
  }
  return mergeQueueParentScopeIds(scope, scopes)[0] ?? rootScopeId;
}

function mergeQueueScopeRank(kind: FrontierSwarmMergeQueueScopeKind): number {
  if (kind === 'root') return 0;
  if (kind === 'lane') return 1;
  if (kind === 'semantic-region') return 2;
  if (kind === 'path') return 3;
  return 4;
}

function coordinatorAgentDrainLeaseId(scope: Pick<FrontierSwarmMergeQueueScope, 'id' | 'kind' | 'leaseKey'>): string {
  return 'swarm-coordinator-agent-drain-lease:' + stableHash([scope.kind, scope.id, scope.leaseKey]);
}

function coordinatorAgentDrainAssignmentLeaseScopeId(assignment: FrontierSwarmMergeQueueAssignment): string {
  return assignment.action === 'promote'
    ? assignment.promoteToScopeId ?? assignment.parentScopeIds[0] ?? assignment.scopeId
    : assignment.scopeId;
}

function coordinatorAgentDrainDecisionForAction(action: FrontierSwarmMergeQueueAssignmentAction): FrontierSwarmCoordinatorAgentDrainDecision {
  if (action === 'apply-local') return 'applied';
  if (action === 'queue-local') return 'queued';
  if (action === 'promote') return 'escalated';
  if (action === 'rerun') return 'rerun';
  if (action === 'reject') return 'rejected';
  if (action === 'record-only') return 'recorded';
  if (action === 'block') return 'blocked';
  return action;
}

function coordinatorAgentDrainActionIsTerminal(action: FrontierSwarmMergeQueueAssignmentAction): boolean {
  return action === 'apply-local'
    || action === 'rerun'
    || action === 'reject'
    || action === 'record-only'
    || action === 'block';
}

function coordinatorAgentDrainAssignmentIsTerminal(assignment: FrontierSwarmCoordinatorAgentDrainAssignment): boolean {
  return assignment.terminal === true
    || assignment.classification === 'terminal'
    || coordinatorAgentDrainActionIsTerminal(assignment.assignedAction);
}

function coordinatorAgentDrainAssignmentIsBlocker(assignment: FrontierSwarmCoordinatorAgentDrainAssignment): boolean {
  return assignment.decision === 'blocked' || assignment.assignedAction === 'block';
}

function summarizeSwarmMergeAdmissionPressure(
  items: readonly {
    action?: FrontierSwarmMergeQueueAssignmentAction;
    assignedAction?: FrontierSwarmMergeQueueAssignmentAction;
    queueItemIds: readonly string[];
  }[]
): FrontierSwarmMergeAdmissionPressure {
  let applyLocalCount = 0;
  let queueLocalCount = 0;
  let promoteUpwardCount = 0;
  let rerunCount = 0;
  let rejectedCount = 0;
  let recordOnlyCount = 0;
  let trueBlockCount = 0;
  const applyLocalQueueItemIds = new Set<string>();
  const queueLocalQueueItemIds = new Set<string>();
  const promoteUpwardQueueItemIds = new Set<string>();
  const rerunQueueItemIds = new Set<string>();
  const rejectedQueueItemIds = new Set<string>();
  const recordOnlyQueueItemIds = new Set<string>();
  const trueBlockQueueItemIds = new Set<string>();

  for (const item of items) {
    const action = item.assignedAction ?? item.action;
    if (action === 'apply-local') {
      applyLocalCount += 1;
      addQueueItemIds(applyLocalQueueItemIds, item.queueItemIds);
    } else if (action === 'queue-local') {
      queueLocalCount += 1;
      addQueueItemIds(queueLocalQueueItemIds, item.queueItemIds);
    } else if (action === 'promote') {
      promoteUpwardCount += 1;
      addQueueItemIds(promoteUpwardQueueItemIds, item.queueItemIds);
    } else if (action === 'rerun') {
      rerunCount += 1;
      addQueueItemIds(rerunQueueItemIds, item.queueItemIds);
    } else if (action === 'reject') {
      rejectedCount += 1;
      addQueueItemIds(rejectedQueueItemIds, item.queueItemIds);
    } else if (action === 'record-only') {
      recordOnlyCount += 1;
      addQueueItemIds(recordOnlyQueueItemIds, item.queueItemIds);
    } else if (action === 'block') {
      trueBlockCount += 1;
      addQueueItemIds(trueBlockQueueItemIds, item.queueItemIds);
    }
  }

  return {
    applyLocalCount,
    applyLocalQueueItemCount: applyLocalQueueItemIds.size,
    queueLocalCount,
    queueLocalQueueItemCount: queueLocalQueueItemIds.size,
    promoteUpwardCount,
    promoteUpwardQueueItemCount: promoteUpwardQueueItemIds.size,
    rerunCount,
    rerunQueueItemCount: rerunQueueItemIds.size,
    rejectedCount,
    rejectedQueueItemCount: rejectedQueueItemIds.size,
    recordOnlyCount,
    recordOnlyQueueItemCount: recordOnlyQueueItemIds.size,
    trueBlockCount,
    trueBlockQueueItemCount: trueBlockQueueItemIds.size
  };
}

function summarizeRootQueueSelectionPressure(
  work: Pick<FrontierSwarmCoordinatorAgentDrainWork, 'leases' | 'promotedWork'>
): FrontierSwarmCoordinatorAgentRootQueueSelectionPressure {
  const rootLease = work.leases.find((lease) => lease.scopeKind === 'root')
    ?? work.leases.find((lease) => !lease.parentQueueId);
  const rootQueueId = rootLease?.queueId ?? 'root';
  const rootPromotedWork = work.promotedWork.filter((entry) => entry.parentQueueId === rootQueueId);
  const promotedQueueItemIds = uniqueStrings(rootPromotedWork.flatMap((entry) => entry.queueItemIds));
  return {
    rootQueueId,
    ...(rootLease ? { leaseId: rootLease.id, leaseScope: rootLease.leaseScope } : {}),
    promotedWorkCount: rootPromotedWork.length,
    promotedQueueItemCount: promotedQueueItemIds.length,
    promotedJobIds: uniqueStrings(rootPromotedWork.map((entry) => entry.jobId)),
    promotedQueueItemIds,
    bySourceQueueId: groupJobIdsBy(rootPromotedWork, (entry) => entry.fromQueueId),
    byReason: groupJobIdsByMany(rootPromotedWork, (entry) => entry.reasons),
    admissionPressure: summarizeSwarmMergeAdmissionPressure(rootPromotedWork)
  };
}

function addQueueItemIds(target: Set<string>, queueItemIds: readonly string[]): void {
  for (const queueItemId of queueItemIds) target.add(queueItemId);
}

function countUniqueDrainQueueItems(items: readonly { queueItemIds: readonly string[] }[]): number {
  const ids = new Set<string>();
  for (const item of items) {
    for (const id of item.queueItemIds) ids.add(id);
  }
  return ids.size;
}

function hashBucket(value: string, buckets: number): number {
  const hex = stableHash(value).split(':')[1] ?? '0';
  return parseInt(hex, 16) % Math.max(1, buckets);
}

function normalizeOracleArtifact(input: FrontierSwarmOracleArtifactInput): FrontierSwarmOracleArtifact {
  return {
    id: normalizeId(input.id, 'oracle artifact id'),
    path: normalizeId(input.path, 'oracle artifact path'),
    kind: input.kind ?? 'oracle',
    ...(input.command ? { command: typeof input.command === 'string' ? normalizeCommands([input.command])[0] : normalizeCommands([input.command])[0] } : {}),
    ...(input.hash ? { hash: input.hash } : {}),
    ...(input.sourceRef ? { sourceRef: input.sourceRef } : {}),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeCommand(input: string | FrontierSwarmCommandInput): FrontierSwarmCommand {
  return normalizeCommands([input])[0] as FrontierSwarmCommand;
}

function normalizeNamedRef(input: string | number | FrontierSwarmNamedRefInput, fallbackKind: string): FrontierSwarmNamedRef {
  if (typeof input === 'string' || typeof input === 'number') {
    const value = String(input);
    return { id: value, kind: fallbackKind, path: value, tags: [] };
  }
  const path = input.path ?? input.uri;
  const id = input.id ?? path ?? stableHash(input);
  return {
    id,
    kind: input.kind ?? fallbackKind,
    ...(input.path ? { path: input.path } : {}),
    ...(input.uri ? { uri: input.uri } : {}),
    ...(input.role ? { role: input.role } : {}),
    ...(input.hash ? { hash: input.hash } : {}),
    ...(positiveNumber(input.bytes) ? { bytes: Math.floor(input.bytes as number) } : {}),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeNamedRefs(input: readonly (string | FrontierSwarmNamedRefInput)[], fallbackKind: string): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, fallbackKind)).sort((left, right) => left.id.localeCompare(right.id));
}

function normalizeSeedRefs(input: readonly (string | number | FrontierSwarmNamedRefInput)[]): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, 'seed')).sort((left, right) => left.id.localeCompare(right.id));
}

function normalizeParityComparator(input: FrontierSwarmParityComparatorInput): FrontierSwarmParityComparator {
  const title = input.title ?? titleFromId(input.id ?? input.path ?? 'comparator');
  return {
    id: input.id ?? 'swarm-parity-comparator:' + stableHash([title, input.status, input.expected, input.actual, input.path, input.operationIndex]),
    title,
    status: input.status ?? (input.expected !== undefined && input.actual !== undefined && stableStringify(input.expected) === stableStringify(input.actual) ? 'passed' : 'unknown'),
    ...(input.expected !== undefined ? { expected: toJsonValue(input.expected) } : {}),
    ...(input.actual !== undefined ? { actual: toJsonValue(input.actual) } : {}),
    ...(input.path ? { path: input.path } : {}),
    ...(input.operationIndex !== undefined ? { operationIndex: Math.max(0, Math.floor(input.operationIndex)) } : {}),
    evidenceRefs: normalizeNamedRefs(input.evidenceRefs ?? [], 'evidence'),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function inferParityStatus(comparators: readonly FrontierSwarmParityComparator[]): FrontierSwarmParityOracleStatus {
  if (comparators.some((comparator) => comparator.status === 'failed')) return 'failed';
  if (comparators.some((comparator) => comparator.status === 'blocked')) return 'blocked';
  if (comparators.length > 0 && comparators.every((comparator) => comparator.status === 'passed')) return 'passed';
  return 'pending';
}

function normalizeWatchpoint(input: FrontierSwarmWatchpointInput): FrontierSwarmWatchpoint {
  const title = input.title ?? titleFromId(input.id ?? input.path ?? input.selector ?? input.target ?? 'watchpoint');
  return {
    id: input.id ?? 'swarm-watchpoint:' + stableHash([input.target, input.path, input.selector, input.operator, input.value, input.action]),
    title,
    ...(input.target ? { target: input.target } : {}),
    ...(input.path ? { path: input.path } : {}),
    ...(input.selector ? { selector: input.selector } : {}),
    operator: input.operator ?? 'changed',
    ...(input.value !== undefined ? { value: toJsonValue(input.value) } : {}),
    action: input.action ?? 'capture',
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeBottleneckSource(input: FrontierSwarmBottleneckSource | FrontierSwarmJobResultInput | FrontierSwarmMergeBundle): FrontierSwarmBottleneckSource {
  if ((input as FrontierSwarmMergeBundle).kind === FRONTIER_SWARM_MERGE_BUNDLE_KIND) {
    const bundle = input as FrontierSwarmMergeBundle;
    return {
      jobId: bundle.jobId,
      lane: bundle.lane,
      status: bundle.status,
      reasons: bundle.reasons,
      evidencePaths: bundle.evidencePaths,
      changedPaths: bundle.changedPaths,
      text: bundle.title,
      metadata: bundle.metadata
    };
  }
  if ('text' in input || 'reasons' in input || 'lane' in input) return input as FrontierSwarmBottleneckSource;
  const result = input as FrontierSwarmJobResultInput;
  if (result.jobId) {
    return {
      jobId: result.jobId,
      status: result.status,
      reasons: result.error !== undefined ? [stringifyError(result.error)] : [],
      verification: result.verification,
      evidencePaths: result.evidencePaths,
      changedPaths: result.changedPaths,
      text: result.lastMessage,
      metadata: result.metadata
    };
  }
  return input as FrontierSwarmBottleneckSource;
}

function routeForBottleneck(kind: FrontierSwarmBottleneckKind, lane?: string): FrontierSwarmBottleneckClassification['route'] {
  if (kind === 'missing-oracle') return { lane: lane ?? 'verification', workKind: 'oracle', priority: 20 };
  if (kind === 'flaky-harness') return { lane: lane ?? 'evidence', workKind: 'harness', priority: 25 };
  if (kind === 'merge-review') return { lane: lane ?? 'review', workKind: 'review', priority: 10 };
  if (kind === 'instrumentation-overhead') return { lane: lane ?? 'diagnostics', workKind: 'instrumentation', priority: 30 };
  if (kind === 'performance') return { lane: lane ?? 'performance', workKind: 'benchmark', priority: 35 };
  if (kind === 'correctness') return { lane: lane ?? 'implementation', workKind: 'debug', priority: 15 };
  return { ...(lane ? { lane } : {}), workKind: 'triage', priority: 50 };
}

function evidenceKindFromPath(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith('.patch') || lower.endsWith('.diff')) return 'patch';
  if (lower.endsWith('.jsonl')) return 'jsonl';
  if (lower.endsWith('.json')) return 'json';
  if (lower.includes('trace')) return 'trace';
  if (lower.includes('screenshot')) return 'screenshot';
  if (lower.includes('last-message')) return 'handoff';
  return 'evidence';
}

function normalizeEvidenceIndexEntry(input: FrontierSwarmEvidenceIndexEntryInput): FrontierSwarmEvidenceIndexEntry {
  const generatedAt = input.generatedAt ?? Date.now();
  return {
    id: input.id ?? 'swarm-evidence-entry:' + stableHash([input.jobId, input.queueItemId, input.path, input.topic, input.kind, generatedAt]),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.queueItemId ? { queueItemId: input.queueItemId } : {}),
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.topic ? { topic: input.topic } : {}),
    ...(input.path ? { path: input.path } : {}),
    kind: input.kind ?? (input.path ? evidenceKindFromPath(input.path) : 'evidence'),
    status: input.status ?? 'unknown',
    confidence: clamp01(input.confidence ?? 0.5),
    tags: uniqueStrings(input.tags ?? []),
    facets: normalizeFacets(input.facets ?? {}),
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function matchesFacetQuery(facets: Record<string, FrontierSwarmEvidenceFacetValue>, query?: Record<string, FrontierSwarmEvidenceFacetValue>): boolean {
  if (!query) return true;
  return Object.entries(query).every(([key, value]) => facets[key] === value);
}

function normalizeFacets(input: Record<string, FrontierSwarmEvidenceFacetValue>): Record<string, FrontierSwarmEvidenceFacetValue> {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value)));
}

function normalizeBlackboardEntry(input: FrontierSwarmBlackboardEntryInput): FrontierSwarmBlackboardEntry {
  const generatedAt = input.generatedAt ?? Date.now();
  const topic = input.topic ?? input.kind ?? 'general';
  return {
    id: input.id ?? 'swarm-blackboard-entry:' + stableHash([input.kind, topic, input.text, input.sourceIds, generatedAt]),
    kind: input.kind ?? 'fact',
    topic,
    status: input.status ?? 'fresh',
    text: input.text ?? '',
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.owner ? { owner: input.owner } : {}),
    confidence: input.confidence ?? 'medium',
    sourceIds: uniqueStrings(input.sourceIds ?? []),
    paths: uniqueStrings(input.paths ?? []),
    tags: uniqueStrings(input.tags ?? []),
    supersedes: uniqueStrings(input.supersedes ?? []),
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeReferenceWindow(input: NonNullable<FrontierSwarmReferenceOraclePlanInput['window']>): NonNullable<FrontierSwarmReferenceOraclePlan['window']> {
  return {
    ...(input.start !== undefined ? { start: Math.max(0, Math.floor(input.start)) } : {}),
    ...(input.end !== undefined ? { end: Math.max(0, Math.floor(input.end)) } : {}),
    ...(input.focus ? { focus: input.focus } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeRoutingHint(input: FrontierSwarmRoutingHintInput): FrontierSwarmRoutingHint {
  return {
    ...(input.artifactKind ? { artifactKind: input.artifactKind } : {}),
    ...(input.pathPattern ? { pathPattern: input.pathPattern } : {}),
    ...(input.lane ? { lane: input.lane } : {}),
    bucket: input.bucket ?? 'needs-human-port',
    reason: input.reason ?? 'matched-routing-hint',
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function defaultArtifactBucket(artifact: FrontierSwarmNamedRef): FrontierSwarmQueueOverlayStatus {
  if (artifact.kind === 'patch') return 'ready-to-apply';
  if (artifact.kind === 'handoff' || artifact.kind === 'trace' || artifact.kind === 'jsonl') return 'discovery-only';
  return 'needs-human-port';
}

function normalizeFixture(input: FrontierSwarmFixtureInput): FrontierSwarmFixture {
  return {
    id: normalizeId(input.id, 'fixture id'),
    title: input.title ?? titleFromId(input.id),
    ...(input.description ? { description: input.description } : {}),
    ...(input.state !== undefined ? { state: toJsonValue(input.state) } : {}),
    artifacts: normalizeNamedRefs(input.artifacts ?? [], 'fixture-artifact'),
    setupCommands: normalizeCommands(input.setupCommands ?? []),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function deriveAutoReviewFindings(bundle: FrontierSwarmMergeBundle, generatedAt: number): FrontierSwarmAutoReviewFinding[] {
  const findings: FrontierSwarmAutoReviewFinding[] = [];
  if (bundle.ownershipViolations.length) {
    findings.push(normalizeAutoReviewFinding({
      jobId: bundle.jobId,
      kind: 'ownership-violation',
      severity: 'error',
      message: 'Bundle changed paths outside its ownership lease.',
      paths: bundle.ownershipViolations,
      evidencePaths: bundle.evidencePaths
    }, generatedAt));
  }
  if (bundle.evidencePaths.length === 0 && bundle.changedPaths.length > 0) {
    findings.push(normalizeAutoReviewFinding({
      jobId: bundle.jobId,
      kind: 'missing-evidence',
      severity: 'warning',
      message: 'Patch bundle has changed paths but no evidence paths.',
      paths: bundle.changedPaths
    }, generatedAt));
  }
  if (bundle.changedPaths.length > 12) {
    findings.push(normalizeAutoReviewFinding({
      jobId: bundle.jobId,
      kind: 'overlarge-patch',
      severity: 'warning',
      message: 'Patch bundle touches many files and should be split or reviewed manually.',
      paths: bundle.changedPaths,
      evidencePaths: bundle.evidencePaths
    }, generatedAt));
  }
  return findings;
}

function normalizeAutoReviewFinding(input: FrontierSwarmAutoReviewFindingInput, generatedAt: number): FrontierSwarmAutoReviewFinding {
  return {
    id: input.id ?? 'swarm-auto-review-finding:' + stableHash([input.jobId, input.kind, input.message, input.paths, generatedAt]),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    kind: input.kind ?? 'weak-evidence',
    severity: input.severity ?? 'warning',
    message: input.message,
    paths: uniqueStrings(input.paths ?? []),
    evidencePaths: uniqueStrings(input.evidencePaths ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function isSwarmObservabilityPoint(value: unknown): value is FrontierSwarmObservabilityPoint {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_OBSERVABILITY_POINT_KIND;
}

function isSwarmInstrumentationBudget(value: unknown): value is FrontierSwarmInstrumentationBudget {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND;
}

function isSwarmUsageGovernor(value: unknown): value is FrontierSwarmUsageGovernor {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_USAGE_GOVERNOR_KIND;
}

function isSwarmRun(value: unknown): value is FrontierSwarmRun {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_RUN_KIND;
}

function groupObjects<T>(items: readonly T[], key: (item: T) => string): Record<string, T[]> {
  const out: Record<string, T[]> = {};
  for (const item of items) {
    const group = key(item);
    out[group] = [...(out[group] ?? []), item];
  }
  return out;
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function groupArtifactIdsBy(artifacts: readonly FrontierSwarmOracleArtifact[], key: (artifact: FrontierSwarmOracleArtifact) => readonly string[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const artifact of artifacts) {
    for (const value of key(artifact)) out[value] = uniqueStrings([...(out[value] ?? []), artifact.id]);
  }
  return out;
}

function patchStackKey(entry: FrontierSwarmMergeIndexEntry): string {
  const lane = entry.lane ?? 'unassigned';
  if (entry.changedRegions.length) return `${lane}:${entry.changedRegions[0]}`;
  const firstPath = entry.changedPaths[0] ?? 'evidence-only';
  return `${lane}:${firstPath.split('/').slice(0, 2).join('/') || firstPath}`;
}

function riskRank(risk: FrontierSwarmRiskLevel): number {
  if (risk === 'low') return 0;
  if (risk === 'medium') return 1;
  if (risk === 'unknown') return 2;
  if (risk === 'high') return 3;
  return 4;
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

function groupIds<T extends { jobId?: string; id?: string }>(items: readonly T[], key: (item: T) => string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const item of items) {
    const group = key(item);
    const id = item.jobId ?? item.id;
    if (!id) continue;
    out[group] = [...(out[group] ?? []), id];
  }
  for (const ids of Object.values(out)) ids.sort();
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

interface PriorityPolicyRecord<T> {
  item: T;
  id: string;
  lane: string;
  decision: FrontierSwarmPriorityDecision;
  index: number;
}

function orderTasksByPriorityPolicy(tasks: readonly FrontierSwarmTask[]): FrontierSwarmTask[] {
  return roundRobinPriorityPolicy(tasks.map((task, index) => ({
    item: task,
    id: task.id,
    lane: task.lane ?? 'unassigned',
    decision: priorityDecisionForTask(task),
    index
  })));
}

function orderJobsByPriorityPolicy(jobs: readonly FrontierSwarmJob[]): FrontierSwarmJob[] {
  return roundRobinPriorityPolicy(jobs.map((job, index) => ({
    item: job,
    id: job.id,
    lane: job.lane,
    decision: priorityDecisionForJob(job),
    index
  })));
}

function orderQueueJobsByPriorityPolicy(jobs: readonly FrontierSwarmQueueJob[]): FrontierSwarmQueueJob[] {
  return roundRobinPriorityPolicy(jobs.map((job, index) => ({
    item: job,
    id: job.jobId,
    lane: job.lane ?? 'unassigned',
    decision: priorityDecisionForQueueJob(job),
    index
  })));
}

function roundRobinPriorityPolicy<T>(records: readonly PriorityPolicyRecord<T>[]): T[] {
  const classGroups = new Map<string, { rank: number; className: string; records: PriorityPolicyRecord<T>[] }>();
  for (const record of records) {
    const key = String(record.decision.rank);
    const group = classGroups.get(key) ?? { rank: record.decision.rank, className: `rank:${record.decision.rank}`, records: [] };
    group.records.push(record);
    classGroups.set(key, group);
  }

  const ordered: T[] = [];
  const sortedClassGroups = Array.from(classGroups.values()).sort((left, right) => (
    left.rank - right.rank
  ));
  for (const group of sortedClassGroups) {
    const lanes = new Map<string, PriorityPolicyRecord<T>[]>();
    for (const record of group.records) lanes.set(record.lane, [...(lanes.get(record.lane) ?? []), record]);
    const laneQueues = Array.from(lanes.entries()).map(([lane, laneRecords]) => ({
      lane,
      records: laneRecords.sort(comparePriorityPolicyRecords)
    })).sort((left, right) => {
      const leftFirst = left.records[0];
      const rightFirst = right.records[0];
      if (!leftFirst || !rightFirst) return left.lane.localeCompare(right.lane);
      return comparePriorityPolicyRecords(leftFirst, rightFirst)
        || leftFirst.index - rightFirst.index
        || left.lane.localeCompare(right.lane);
    });

    while (laneQueues.some((queue) => queue.records.length > 0)) {
      for (const queue of laneQueues) {
        const next = queue.records.shift();
        if (next) ordered.push(next.item);
      }
    }
  }
  return ordered;
}

function comparePriorityPolicyRecords<T>(left: PriorityPolicyRecord<T>, right: PriorityPolicyRecord<T>): number {
  return left.decision.rank - right.decision.rank
    || left.decision.basePriority - right.decision.basePriority
    || left.id.localeCompare(right.id)
    || left.index - right.index;
}

function priorityDecisionForTask(
  task: FrontierSwarmTask,
  lane: string | undefined = task.lane,
  layer: string | undefined = task.layer
): FrontierSwarmPriorityDecision {
  return createPriorityDecision({
    id: task.id,
    priority: task.priority,
    lane,
    layer,
    title: task.title,
    objective: task.objective,
    workKind: task.workKind,
    status: task.status,
    tags: task.tags,
    metadata: task.metadata
  });
}

function priorityDecisionForJob(job: FrontierSwarmJob): FrontierSwarmPriorityDecision {
  return readPriorityDecision(job.metadata) ?? createPriorityDecision({
    id: job.id,
    priority: job.priority,
    lane: job.lane,
    layer: job.layer,
    title: job.title,
    objective: job.task.objective,
    workKind: job.task.workKind,
    status: job.status,
    tags: job.tags,
    metadata: job.metadata
  });
}

function priorityDecisionForQueueJob(job: FrontierSwarmQueueJob): FrontierSwarmPriorityDecision {
  return readPriorityDecision(job.metadata) ?? createPriorityDecision({
    id: job.jobId,
    priority: job.priority,
    lane: job.lane,
    status: job.status,
    metadata: job.metadata
  });
}

function priorityDecisionForScheduledJob(job: FrontierSwarmScheduledJob | FrontierSwarmBlockedJob | FrontierSwarmRunningJob): FrontierSwarmPriorityDecision {
  return readPriorityDecision(job.metadata) ?? createPriorityDecision({
    id: job.jobId,
    priority: 'priority' in job ? job.priority : 100,
    lane: job.lane,
    metadata: job.metadata
  });
}

function readPriorityDecision(metadata: JsonObject | undefined): FrontierSwarmPriorityDecision | undefined {
  const value = metadata?.priorityPolicy;
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const record = value as Record<string, unknown>;
  if (
    typeof record.policyId !== 'string'
    || typeof record.className !== 'string'
    || typeof record.rank !== 'number'
    || typeof record.basePriority !== 'number'
    || typeof record.effectivePriority !== 'number'
    || !Array.isArray(record.reasons)
  ) return undefined;
  return {
    policyId: record.policyId,
    className: record.className,
    rank: record.rank,
    basePriority: record.basePriority,
    effectivePriority: record.effectivePriority,
    reasons: uniqueStrings(record.reasons.map((entry) => typeof entry === 'string' ? entry : undefined))
  };
}

function priorityDecisionMetadata(metadata: unknown, decision: FrontierSwarmPriorityDecision): JsonObject {
  return {
    ...(toJsonObject(metadata) ?? {}),
    priorityPolicy: cloneJsonValue(decision) as unknown as JsonObject
  };
}

function priorityPolicyMetadata(
  metadata: unknown,
  items: readonly (FrontierSwarmJob | FrontierSwarmQueueJob)[],
  schedule?: {
    ready?: readonly FrontierSwarmScheduledJob[];
    blocked?: readonly FrontierSwarmBlockedJob[];
    running?: readonly FrontierSwarmRunningJob[];
  }
): JsonObject {
  const decisions = items.map(priorityDecisionForMetadataItem);
  const base = toJsonObject(metadata) ?? {};
  const scheduleSummary = schedule ? {
    readyClassCounts: priorityClassCounts(schedule.ready?.map(priorityDecisionForScheduledJob) ?? []),
    blockedClassCounts: priorityClassCounts(schedule.blocked?.map(priorityDecisionForScheduledJob) ?? []),
    runningClassCounts: priorityClassCounts(schedule.running?.map(priorityDecisionForScheduledJob) ?? [])
  } : undefined;
  return {
    ...base,
    priorityPolicy: {
      policy: cloneJsonValue(FRONTIER_SWARM_REVIEW_PRIORITY_POLICY) as unknown as JsonObject,
      summary: {
        itemCount: decisions.length,
        classCounts: priorityClassCounts(decisions),
        laneClassCounts: priorityLaneClassCounts(items),
        ...(scheduleSummary ? { schedule: scheduleSummary } : {})
      }
    }
  };
}

function priorityDecisionForMetadataItem(item: FrontierSwarmJob | FrontierSwarmQueueJob): FrontierSwarmPriorityDecision {
  return 'jobId' in item ? priorityDecisionForQueueJob(item) : priorityDecisionForJob(item);
}

function priorityClassCounts(decisions: readonly FrontierSwarmPriorityDecision[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const decision of decisions) counts[decision.className] = (counts[decision.className] ?? 0) + 1;
  return counts;
}

function priorityLaneClassCounts(items: readonly (FrontierSwarmJob | FrontierSwarmQueueJob)[]): Record<string, Record<string, number>> {
  const counts: Record<string, Record<string, number>> = {};
  for (const item of items) {
    const lane = 'jobId' in item ? item.lane ?? 'unassigned' : item.lane;
    const decision = priorityDecisionForMetadataItem(item);
    counts[lane] = counts[lane] ?? {};
    counts[lane][decision.className] = (counts[lane][decision.className] ?? 0) + 1;
  }
  return counts;
}

function createPriorityDecision(input: {
  id: string;
  priority: number;
  lane?: string;
  layer?: string;
  title?: string;
  objective?: string;
  workKind?: string;
  status?: string;
  tags?: readonly string[];
  metadata?: JsonObject;
}): FrontierSwarmPriorityDecision {
  const terms = prioritySubjectTerms(input);
  const tokens = priorityTokens(terms);
  const phrases = priorityPhrases(terms);
  const hasToken = (value: string) => tokens.has(value);
  const hasPhrase = (value: string) => phrases.some((phrase) => phrase === value || phrase.includes(value));
  let className: FrontierSwarmPriorityClass = 'standard';
  let reasons = ['default-standard-priority'];
  if (
    hasPhrase('coordinator-drain')
    || hasPhrase('coordinator-agent-drain')
    || hasPhrase('auto-drain')
    || hasPhrase('drain-work')
    || hasPhrase('review-debt-drain')
    || hasPhrase('coordinator-review')
    || (hasToken('drain') && (hasToken('coordinator') || hasToken('review')))
    || (hasToken('coordinator') && hasToken('review'))
  ) {
    className = 'coordinator-drain';
    reasons = ['matched-coordinator-drain-work'];
  } else if (
    hasToken('review')
    || hasToken('reviewer')
    || hasPhrase('merge-review')
    || hasPhrase('needs-human-port')
    || hasPhrase('needs-port')
  ) {
    className = 'review';
    reasons = ['matched-review-work'];
  } else if (
    hasToken('speculative')
    || hasToken('exploratory')
    || hasToken('exploration')
    || hasToken('idea')
    || hasToken('research')
    || hasToken('backlog')
  ) {
    className = 'speculative';
    reasons = ['matched-speculative-backlog'];
  }
  const rank = priorityRankForClass(className);
  const basePriority = Number.isFinite(input.priority) ? Number(input.priority) : 100;
  return {
    policyId: FRONTIER_SWARM_REVIEW_PRIORITY_POLICY.id,
    className,
    rank,
    basePriority,
    effectivePriority: rank * 1_000_000 + Math.max(0, Math.floor(basePriority)),
    reasons
  };
}

function priorityRankForClass(className: FrontierSwarmPriorityClass): number {
  return FRONTIER_SWARM_REVIEW_PRIORITY_POLICY.classes.find((entry) => entry.className === className)?.rank ?? 50;
}

function prioritySubjectTerms(input: {
  id: string;
  lane?: string;
  layer?: string;
  title?: string;
  objective?: string;
  workKind?: string;
  status?: string;
  tags?: readonly string[];
  metadata?: JsonObject;
}): string[] {
  const terms = uniqueStrings([
    input.id,
    input.lane,
    input.layer,
    input.title,
    input.objective,
    input.workKind,
    input.status,
    ...(input.tags ?? [])
  ]);
  collectPriorityMetadataTerms(input.metadata, terms);
  return uniqueStrings(terms);
}

function collectPriorityMetadataTerms(value: unknown, terms: string[], depth = 0): void {
  if (!value || depth > 2) return;
  if (typeof value === 'string') {
    terms.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      if (typeof entry === 'string') terms.push(entry);
    }
    return;
  }
  if (typeof value !== 'object') return;
  const object = value as Record<string, unknown>;
  for (const key of ['priorityClass', 'queueClass', 'workKind', 'kind', 'lane', 'status', 'title', 'objective', 'queuePurpose', 'tags', 'source']) {
    const entry = object[key];
    if (typeof entry === 'string') terms.push(entry);
    else if (Array.isArray(entry)) {
      for (const item of entry) if (typeof item === 'string') terms.push(item);
    } else if (entry && typeof entry === 'object') collectPriorityMetadataTerms(entry, terms, depth + 1);
  }
}

function priorityPhrases(terms: readonly string[]): string[] {
  return uniqueStrings(terms.map((term) => slug(term)));
}

function priorityTokens(terms: readonly string[]): Set<string> {
  return new Set(priorityPhrases(terms).flatMap((term) => term.split('-').filter(Boolean)));
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

function mergeOwnershipRegions(
  laneRegions: readonly FrontierSwarmOwnershipRegion[],
  taskRegions: readonly FrontierSwarmOwnershipRegion[]
): FrontierSwarmOwnershipRegion[] {
  const byId = new Map<string, FrontierSwarmOwnershipRegion>();
  for (const region of laneRegions) byId.set(region.id, cloneJsonValue(region) as FrontierSwarmOwnershipRegion);
  for (const region of taskRegions) byId.set(region.id, cloneJsonValue(region) as FrontierSwarmOwnershipRegion);
  return Array.from(byId.values()).sort((left, right) => left.id.localeCompare(right.id));
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
  return {
    capabilities,
    resources,
    ...(browser ? { browser } : {}),
    ...(metadata && Object.keys(metadata).length ? { metadata } : {})
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
  const candidates = tasks
    .filter((task) => !task.lane || manifest.lanes.some((lane) => lane.id === task.lane))
    .filter((task) => lanes.size === 0 || (task.lane !== undefined && lanes.has(task.lane)))
    .filter((task) => layers.size === 0 || taskLayer(manifest, task) !== undefined && layers.has(taskLayer(manifest, task) as string))
    .filter((task) => statuses.size === 0 || statuses.has(task.status))
    .filter((task) => options.includeCompleted || !completed.has(task.status))
    .filter((task) => selectors.length === 0 || selectors.some((selector) => searchableTask(task).includes(selector)));
  const ordered = options.limit === undefined
    ? [...candidates].sort((left, right) => left.priority - right.priority || left.id.localeCompare(right.id))
    : orderTasksByPriorityPolicy(candidates);
  return ordered.slice(0, limit);
}

function createSelectionEntry(
  manifest: FrontierSwarmManifest,
  task: FrontierSwarmTask,
  priority?: FrontierSwarmSelectionPriorityInput
): FrontierSwarmTaskSelectionEntry {
  const lane = task.lane ? manifest.lanes.find((entry) => entry.id === task.lane) : undefined;
  return {
    task,
    ...(lane ? { lane } : {}),
    ownershipWarnings: selectionOwnershipWarnings(task, lane),
    selectionPriority: selectionPriority(task, priority)
  };
}

function selectionOwnershipWarnings(task: FrontierSwarmTask, lane: FrontierSwarmLane | undefined): string[] {
  if (!lane || lane.allowedWrites.length === 0) return [];
  return task.targetRefs
    .filter((file) => !lane.allowedWrites.some((glob) => matchesGlob(file, glob)))
    .map((file) => `${file} is outside allowed write globs for ${lane.id}`);
}

function selectionPriority(task: FrontierSwarmTask, input?: FrontierSwarmSelectionPriorityInput): number {
  const statusRanks = input?.statuses ?? {};
  const workKindRanks = input?.workKinds ?? {};
  const statusRank = statusRanks[task.status] ?? input?.defaultStatusRank ?? 100;
  const workKindRank = workKindRanks[task.workKind] ?? input?.defaultWorkKindRank ?? 100;
  const statusWeight = input?.statusWeight ?? 1000;
  const workKindWeight = input?.workKindWeight ?? 1;
  return statusRank * statusWeight + workKindRank * workKindWeight;
}

function roundRobinSelectionByLane(entries: readonly FrontierSwarmTaskSelectionEntry[]): FrontierSwarmTaskSelectionEntry[] {
  const groups = new Map<string, FrontierSwarmTaskSelectionEntry[]>();
  for (const entry of entries) groups.set(entry.task.lane ?? 'unassigned', [...(groups.get(entry.task.lane ?? 'unassigned') ?? []), entry]);
  const selected: FrontierSwarmTaskSelectionEntry[] = [];
  while (Array.from(groups.values()).some((group) => group.length > 0)) {
    for (const group of groups.values()) {
      const next = group.shift();
      if (next) selected.push(next);
    }
  }
  return selected;
}

function summarizeTaskSelection(entries: readonly FrontierSwarmTaskSelectionEntry[]): FrontierSwarmTaskSelectionSummary {
  return entries.reduce<FrontierSwarmTaskSelectionSummary>((summary, entry) => {
    const lane = entry.task.lane ?? 'unassigned';
    summary.total += 1;
    summary.byLane[lane] = (summary.byLane[lane] ?? 0) + 1;
    summary.byWorkKind[entry.task.workKind] = (summary.byWorkKind[entry.task.workKind] ?? 0) + 1;
    summary.ownershipWarningCount += entry.ownershipWarnings.length;
    return summary;
  }, { total: 0, byLane: {}, byWorkKind: {}, ownershipWarningCount: 0 });
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
    metadata: priorityDecisionMetadata(task.metadata, priorityDecisionForTask(task, lane?.id ?? 'unassigned', layer))
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

function normalizeQueueJob(input: FrontierSwarmQueueJobInput): FrontierSwarmQueueJob {
  return {
    jobId: input.jobId,
    ...(input.taskId ? { taskId: input.taskId } : {}),
    ...(input.runId ? { runId: input.runId } : {}),
    status: input.status ?? 'ready',
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.compute ? { compute: input.compute } : {}),
    ...(input.concurrencyKey ? { concurrencyKey: input.concurrencyKey } : {}),
    priority: input.priority ?? 100,
    attempts: Math.max(0, Math.floor(input.attempts ?? 0)),
    maxAttempts: Math.max(1, Math.floor(input.maxAttempts ?? 1)),
    ...(input.availableAt !== undefined ? { availableAt: input.availableAt } : {}),
    ...(input.lease ? { lease: cloneJsonValue(input.lease) as FrontierSwarmLease } : {}),
    ...(input.lastError ? { lastError: input.lastError } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function queueJobsFromPlan(
  plan: FrontierSwarmPlan,
  run: FrontierSwarmRun | undefined,
  leases: readonly FrontierSwarmLease[]
): FrontierSwarmQueueJob[] {
  const resultsByJob = new Map((run?.results ?? []).map((result) => [result.jobId, result]));
  const activeLeases = new Map(leases.filter((lease) => lease.status === 'active').map((lease) => [lease.jobId, lease]));
  return plan.jobs.map((job) => {
    const result = resultsByJob.get(job.id);
    const lease = activeLeases.get(job.id);
    const failed = result?.status === 'failed' || result?.exitCode !== undefined && result.exitCode !== 0;
    const completed = result?.status === 'completed' || result?.status === 'verified';
    const status: FrontierSwarmQueueJobStatus = completed
      ? 'completed'
      : failed
        ? 'failed'
        : lease
          ? 'leased'
          : job.status === 'running'
            ? 'running'
            : 'ready';
    return normalizeQueueJob({
      jobId: job.id,
      taskId: job.taskId,
      runId: run?.id ?? plan.runId,
      status,
      lane: job.lane,
      compute: job.compute.id,
      concurrencyKey: job.concurrencyKey,
      priority: job.priority,
      attempts: result?.metadata && typeof result.metadata.attempts === 'number' ? result.metadata.attempts : undefined,
      maxAttempts: job.budget?.maxRetries !== undefined ? job.budget.maxRetries + 1 : 1,
      lease,
      lastError: result?.error,
      metadata: priorityDecisionMetadata(job.metadata, priorityDecisionForJob(job))
    });
  });
}

function normalizeResult(input: FrontierSwarmJobResultInput): FrontierSwarmJobResult {
  const startedAt = input.startedAt;
  const finishedAt = input.finishedAt;
  const status = input.status ?? (input.exitCode === 0 || input.exitCode === undefined ? 'completed' : 'failed');
  return {
    jobId: input.jobId,
    status,
    mergeReadiness: classifySwarmMergeReadiness({ ...input, status }),
    ...(startedAt !== undefined ? { startedAt } : {}),
    ...(finishedAt !== undefined ? { finishedAt } : {}),
    ...(startedAt !== undefined && finishedAt !== undefined ? { durationMs: Math.max(0, finishedAt - startedAt) } : {}),
    ...(input.exitCode !== undefined ? { exitCode: input.exitCode } : {}),
    ...(input.signal ? { signal: input.signal } : {}),
    changedPaths: uniqueStrings(input.changedPaths ?? []),
    changedRegions: uniqueStrings(input.changedRegions ?? []),
    ownershipViolations: uniqueStrings(input.ownershipViolations ?? []),
    evidencePaths: uniqueStrings(input.evidencePaths ?? []),
    ...(input.patchPath ? { patchPath: input.patchPath } : {}),
    queueItemIds: uniqueStrings(input.queueItemIds ?? []),
    riskLevel: input.riskLevel ?? 'unknown',
    mergeDisposition: input.mergeDisposition ?? classifySwarmMergeDisposition({ ...input, status }),
    verification: (input.verification ?? []).map(normalizeVerificationResult),
    ...(input.lastMessage ? { lastMessage: input.lastMessage } : {}),
    ...(input.error !== undefined ? { error: stringifyError(input.error) } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function isSwarmJobResult(value: FrontierSwarmJobResult | FrontierSwarmJobResultInput): value is FrontierSwarmJobResult {
  return Array.isArray((value as FrontierSwarmJobResult).changedPaths)
    && Array.isArray((value as FrontierSwarmJobResult).changedRegions)
    && Array.isArray((value as FrontierSwarmJobResult).verification)
    && Array.isArray((value as FrontierSwarmJobResult).queueItemIds)
    && typeof (value as FrontierSwarmJobResult).riskLevel === 'string'
    && typeof (value as FrontierSwarmJobResult).mergeDisposition === 'string';
}

function mergeBundleReasons(
  result: FrontierSwarmJobResult,
  disposition: FrontierSwarmMergeDisposition,
  staleAgainstHead: boolean
): string[] {
  const reasons: string[] = [];
  if (staleAgainstHead) reasons.push('stale-against-head');
  if (result.status === 'blocked') reasons.push('blocked');
  if (result.status === 'failed') reasons.push('failed');
  if (result.ownershipViolations.length) reasons.push('ownership-violations');
  if (result.verification.some((entry) => entry.required !== false && entry.status !== 0)) reasons.push('failed-verification');
  if (disposition === 'needs-port') reasons.push('needs-human-port');
  if (disposition === 'rejected') reasons.push('rejected');
  return uniqueStrings(reasons);
}

function inferMergeRisk(result: FrontierSwarmJobResult, disposition: FrontierSwarmMergeDisposition): FrontierSwarmRiskLevel {
  if (disposition === 'discovery-only') return 'low';
  if (disposition === 'rejected' || disposition === 'blocked' || disposition === 'stale-against-head') return 'high';
  if (result.changedPaths.length <= 2 && result.ownershipViolations.length === 0) return 'low';
  if (result.changedPaths.length <= 8) return 'medium';
  return 'high';
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

function isSwarmEvent(value: unknown): value is FrontierSwarmEvent {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_EVENT_KIND;
}

function readLaneId(value: string | FrontierSwarmLaneInput | FrontierSwarmLane): string {
  return typeof value === 'string' ? value : value.id;
}

function joinPathParts(...parts: readonly string[]): string {
  const first = parts[0] ? String(parts[0]) : '';
  const prefix = first.startsWith('/') ? '/' : '';
  return prefix + parts
    .map((part, index) => String(part).replace(index === 0 ? /\/+$/g : /^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
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
