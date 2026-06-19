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
export const FRONTIER_SWARM_QUEUE_OUTCOME_MODEL_KIND = 'frontier.swarm.queue-outcome-model';
export const FRONTIER_SWARM_QUEUE_OUTCOME_MODEL_VERSION = 1;
export const FRONTIER_SWARM_TERMINAL_STATE_RECONCILIATION_KIND = 'frontier.swarm.terminal-state-reconciliation';
export const FRONTIER_SWARM_TERMINAL_STATE_RECONCILIATION_VERSION = 1;
export const FRONTIER_SWARM_PRIORITY_POLICY_KIND = 'frontier.swarm.priority-policy';
export const FRONTIER_SWARM_PRIORITY_POLICY_VERSION = 1;
export const FRONTIER_SWARM_MODEL_ROUTE_KIND = 'frontier.swarm.model-route';
export const FRONTIER_SWARM_MODEL_ROUTE_VERSION = 1;
export const FRONTIER_SWARM_PANEL_EVALUATION_KIND = 'frontier.swarm.panel-evaluation';
export const FRONTIER_SWARM_PANEL_EVALUATION_VERSION = 1;
export const FRONTIER_SWARM_CONTINUOUS_POOL_STATE_KIND = 'frontier.swarm.continuous-pool-state';
export const FRONTIER_SWARM_CONTINUOUS_POOL_STATE_VERSION = 1;

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
export type FrontierSwarmModelRouteStrategy = 'single-cheap' | 'single-deep' | 'panel' | 'tournament' | string;
export type FrontierSwarmPanelStrategy = 'panel' | 'tournament' | 'auto' | string;
export type FrontierSwarmTimePressure = 'relaxed' | 'normal' | 'soon' | 'urgent' | string;
export type FrontierSwarmContinuousPoolPhase =
  | 'active'
  | 'queued'
  | 'review-drain'
  | 'rerun'
  | 'human-blocked'
  | 'conflicted'
  | 'capacity-blocked'
  | 'done'
  | string;
export type FrontierSwarmContinuousPoolBucket =
  | 'active'
  | 'queued'
  | 'review-drain'
  | 'rerun'
  | 'human-blocked'
  | 'conflicted'
  | 'capacity-blocked'
  | 'done'
  | string;
export type FrontierSwarmContinuousPoolStopCondition =
  | 'drained'
  | 'human-blocked'
  | 'conflicted'
  | 'capacity-blocked'
  | string;
export type FrontierSwarmContinuousPoolRefillAction =
  | 'drain-review'
  | 'rerun-stale'
  | 'lease-queued'
  | 'start-speculative-backlog'
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

export interface FrontierSwarmModelTokenEstimateInput {
  inputTokens?: number;
  cachedInputTokens?: number;
  outputTokens?: number;
  metadata?: unknown;
}

export interface FrontierSwarmModelTokenEstimate {
  inputTokens: number;
  cachedInputTokens: number;
  outputTokens: number;
  totalTokens: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmModelPriceInput {
  id?: string;
  compute?: string;
  model?: string;
  inputUsdPerUnit?: number;
  cachedInputUsdPerUnit?: number;
  outputUsdPerUnit?: number;
  unitTokens?: number;
  latencyMs?: number;
  metadata?: unknown;
}

export interface FrontierSwarmModelPrice {
  id: string;
  compute?: string;
  model?: string;
  inputUsdPerUnit: number;
  cachedInputUsdPerUnit: number;
  outputUsdPerUnit: number;
  unitTokens: number;
  latencyMs?: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmModelOutcomeInput {
  compute?: string;
  model?: string;
  attempts?: number;
  successRate?: number;
  failureRate?: number;
  confidence?: number;
  averageCostUsd?: number;
  averageDurationMs?: number;
  metadata?: unknown;
}

export interface FrontierSwarmPanelRouteInput {
  enabled?: boolean;
  strategy?: FrontierSwarmPanelStrategy;
  memberComputeIds?: readonly string[];
  minMembers?: number;
  maxMembers?: number;
  fuserComputeId?: string;
  fuserTokenEstimate?: FrontierSwarmModelTokenEstimateInput;
  confidenceLift?: number;
  minRiskScore?: number;
  maxCostUsd?: number;
  metadata?: unknown;
}

export interface FrontierSwarmModelRouterInput {
  id?: string;
  manifest?: FrontierSwarmManifest | FrontierSwarmManifestInput;
  task: FrontierSwarmTask | FrontierSwarmTaskInput;
  candidates?: readonly (string | FrontierSwarmComputeInput | FrontierSwarmCompute)[];
  priceCatalog?: Record<string, FrontierSwarmModelPriceInput> | readonly FrontierSwarmModelPriceInput[];
  tokenEstimate?: FrontierSwarmModelTokenEstimateInput;
  budget?: FrontierSwarmBudget | FrontierSwarmBudgetInput;
  timePressure?: FrontierSwarmTimePressure | number;
  outcomeHistory?: readonly FrontierSwarmModelOutcomeInput[];
  requiredCapabilities?: readonly string[];
  panel?: FrontierSwarmPanelRouteInput;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmModelRouteCandidate {
  compute: FrontierSwarmCompute;
  capable: boolean;
  missingCapabilities: string[];
  estimatedCostUsd: number;
  estimatedLatencyMs: number;
  priceKnown: boolean;
  outcomeKnown: boolean;
  budgetOk: boolean;
  qualityScore: number;
  costScore: number;
  latencyScore: number;
  historyScore: number;
  riskFitScore: number;
  score: number;
  reasons: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmPanelEvaluationInput {
  id?: string;
  candidates?: readonly FrontierSwarmModelRouteCandidate[];
  task?: FrontierSwarmTask | FrontierSwarmTaskInput;
  budget?: FrontierSwarmBudget | FrontierSwarmBudgetInput;
  panel?: FrontierSwarmPanelRouteInput;
  riskScore?: number;
  uncertaintyScore?: number;
  impactScore?: number;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmPanelEvaluation {
  kind: typeof FRONTIER_SWARM_PANEL_EVALUATION_KIND;
  version: typeof FRONTIER_SWARM_PANEL_EVALUATION_VERSION;
  id: string;
  generatedAt: number;
  strategy: FrontierSwarmPanelStrategy;
  memberComputeIds: string[];
  fuserComputeId?: string;
  expectedCostUsd: number;
  expectedLatencyMs: number;
  confidenceLift: number;
  confidenceScore: number;
  residualRiskScore: number;
  budgetOk: boolean;
  recommended: boolean;
  reasons: string[];
  summary: {
    memberCount: number;
    costUsd: number;
    latencyMs: number;
    confidenceLift: number;
    residualRiskScore: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmModelRoute {
  kind: typeof FRONTIER_SWARM_MODEL_ROUTE_KIND;
  version: typeof FRONTIER_SWARM_MODEL_ROUTE_VERSION;
  id: string;
  generatedAt: number;
  taskId: string;
  route: FrontierSwarmModelRouteStrategy;
  recommendedComputeIds: string[];
  fuserComputeId?: string;
  recommended: FrontierSwarmModelRouteCandidate;
  candidates: FrontierSwarmModelRouteCandidate[];
  panel?: FrontierSwarmPanelEvaluation;
  tokenEstimate: FrontierSwarmModelTokenEstimate;
  riskScore: number;
  uncertaintyScore: number;
  impactScore: number;
  timePressureScore: number;
  reasons: string[];
  explanation: string;
  summary: {
    candidateCount: number;
    capableCount: number;
    priceKnownCount: number;
    outcomeKnownCount: number;
    cheapestCapableComputeId?: string;
    recommendedCostUsd: number;
    recommendedLatencyMs: number;
    panelCostUsd?: number;
    panelLatencyMs?: number;
  };
  metadata?: JsonObject;
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
  routingMode?: FrontierSwarmModelRoutingMode;
  routingPolicy?: FrontierSwarmModelRoutingPolicyInput | FrontierSwarmModelRoutingPolicy | unknown;
  routingContext?: unknown;
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
  semanticImport?: unknown;
  traceShards?: readonly unknown[];
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
  semanticImport?: unknown;
  traceShards: unknown[];
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
  semanticImport?: unknown;
  traceShards?: readonly unknown[];
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
  semanticImport?: unknown;
  traceShards: unknown[];
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
  metadata?: JsonObject;
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
  | 'parent'
  | 'child'
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
  requiredLeaseScopeIds?: string[];
  requiredLeaseKeys?: string[];
  lane?: string;
  changedPaths: string[];
  changedRegions: string[];
  reasons: string[];
}

export type FrontierSwarmHierarchicalQueueLeaseScopeClass =
  | 'root'
  | 'parent'
  | 'child'
  | 'lane'
  | 'semantic'
  | 'path'
  | 'custom'
  | string;

export type FrontierSwarmHierarchicalQueueLeasePromotionState =
  | 'local'
  | 'terminal'
  | 'promoted-to-parent'
  | 'receiving-promoted'
  | string;

export interface FrontierSwarmHierarchicalQueueLocalLeaderInput {
  id?: string;
  coordinatorId?: string;
  workerId?: string;
  role?: string;
  electedAt?: number;
  leaseId?: string;
  leaseKey?: string;
  metadata?: unknown;
}

export interface FrontierSwarmHierarchicalQueueLocalLeader {
  id: string;
  coordinatorId?: string;
  workerId?: string;
  role?: string;
  electedAt?: number;
  leaseId?: string;
  leaseKey?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmHierarchicalQueuePromotionState {
  state: FrontierSwarmHierarchicalQueueLeasePromotionState;
  parentQueueId?: string;
  promotionIds: string[];
  promotedFromQueueIds: string[];
  promotedToQueueIds: string[];
  promotedJobIds: string[];
  promotedQueueItemIds: string[];
}

export interface FrontierSwarmHierarchicalQueueTerminalDecisionLink {
  id: string;
  jobId: string;
  taskId?: string;
  queueId: string;
  queueItemIds: string[];
  action: FrontierSwarmMergeQueueAssignmentAction;
  decision: FrontierSwarmCoordinatorAgentDrainDecision;
  reasons: string[];
}

export interface FrontierSwarmHierarchicalQueueLeaseRecord {
  id: string;
  queueId: string;
  scopeId: string;
  scopeKind: FrontierSwarmMergeQueueScopeKind;
  scopeClass: FrontierSwarmHierarchicalQueueLeaseScopeClass;
  rootQueueId: string;
  parentQueueId?: string;
  lane?: string;
  title: string;
  leaseKey: string;
  localLeader?: FrontierSwarmHierarchicalQueueLocalLeader;
  promotion: FrontierSwarmHierarchicalQueuePromotionState;
  conflictReasons: string[];
  retryReasons: string[];
  reasons: string[];
  jobIds: string[];
  queueItemIds: string[];
  activeJobIds: string[];
  activeQueueItemIds: string[];
  terminalJobIds: string[];
  terminalQueueItemIds: string[];
  terminalDecisionIds: string[];
  terminalDecisionLinks: FrontierSwarmHierarchicalQueueTerminalDecisionLink[];
  changedPaths: string[];
  changedRegions: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmHierarchicalMergeQueueInput {
  id?: string;
  index: FrontierSwarmMergeIndex;
  admission?: FrontierSwarmMergeAdmission;
  rootScopeId?: string;
  scopes?: readonly FrontierSwarmMergeQueueScopeInput[];
  localLeader?: FrontierSwarmHierarchicalQueueLocalLeaderInput;
  localLeaders?: Readonly<Record<string, FrontierSwarmHierarchicalQueueLocalLeaderInput | undefined>>;
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
  leaseRecords: FrontierSwarmHierarchicalQueueLeaseRecord[];
  assignments: FrontierSwarmMergeQueueAssignment[];
  promotions: FrontierSwarmMergeQueuePromotion[];
  byScope: Record<string, string[]>;
  byLeaseKey: Record<string, string[]>;
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
  terminalDecisionId?: string;
  terminalDecisionQueueItemIds?: string[];
  retrySlices?: FrontierSwarmMergeQueueRetrySlice[];
  semanticSliceScopeIds?: string[];
  semanticSliceLeaseKeys?: string[];
  parentDecisionRegions?: string[];
  unknownRegions?: string[];
  metadata?: JsonObject;
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

export type FrontierSwarmQueueOutcomeCategory =
  | 'terminal'
  | 'continuation'
  | 'coordinator-review'
  | 'human-blocked'
  | 'stale-rerun'
  | 'conflict'
  | string;

export type FrontierSwarmQueueTerminalOutcome =
  | 'applied'
  | 'committed'
  | 'superseded'
  | 'rejected'
  | 'recorded'
  | 'closed'
  | string;
export type FrontierSwarmQueueContinuationOutcome = 'queued' | 'continued' | 'ready' | 'running' | 'leased' | string;
export type FrontierSwarmQueueCoordinatorReviewOutcome = 'coordinator-review' | 'escalated' | 'needs-port' | string;
export type FrontierSwarmQueueHumanBlockedOutcome = 'human-blocked' | 'blocked' | string;
export type FrontierSwarmQueueStaleRerunOutcome = 'stale-rerun' | 'rerun' | string;
export type FrontierSwarmQueueConflictOutcome = 'conflict' | 'merge-conflict' | string;
export type FrontierSwarmQueueOutcome =
  | FrontierSwarmQueueTerminalOutcome
  | FrontierSwarmQueueContinuationOutcome
  | FrontierSwarmQueueCoordinatorReviewOutcome
  | FrontierSwarmQueueHumanBlockedOutcome
  | FrontierSwarmQueueStaleRerunOutcome
  | FrontierSwarmQueueConflictOutcome;

export const FRONTIER_SWARM_TERMINAL_OUTCOME_LABELS = [
  'applied',
  'committed',
  'evidence-only',
  'no-change',
  'generated-by-collector',
  'patch-missing',
  'bundle-missing',
  'rerun',
  'rejected',
  'conflict-blocked',
  'human-blocked',
  'coordinator-review'
] as const;

export type FrontierSwarmTerminalOutcomeLabel = typeof FRONTIER_SWARM_TERMINAL_OUTCOME_LABELS[number] | string;
export type FrontierSwarmTerminalOutcomeCategory = 'success' | 'incomplete' | 'rerun' | 'rejected' | 'blocked' | 'review' | 'unknown' | string;

export interface FrontierSwarmTerminalOutcomeInput {
  label?: FrontierSwarmTerminalOutcomeLabel | string;
  outcome?: FrontierSwarmTerminalOutcomeLabel | string;
  status?: string;
  decision?: string;
  generatedByCollector?: boolean;
  evidenceOnly?: boolean;
  noChange?: boolean;
  patchMissing?: boolean;
  bundleMissing?: boolean;
  conflictBlocked?: boolean;
  humanBlocked?: boolean;
  coordinatorReview?: boolean;
  reasons?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmTerminalOutcome {
  label: FrontierSwarmTerminalOutcomeLabel;
  category: FrontierSwarmTerminalOutcomeCategory;
  terminal: true;
  success: boolean;
  incomplete: boolean;
  blocker: boolean;
  review: boolean;
  generatedByCollector: boolean;
  reasons: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmQueueOutcomeClassification {
  category: FrontierSwarmQueueOutcomeCategory;
  outcome: FrontierSwarmQueueOutcome;
  terminal: boolean;
  closesSubject: boolean;
  coordinatorReview: boolean;
  humanBlocked: boolean;
  staleOrRerun: boolean;
  conflict: boolean;
  reviewDebt: boolean;
}

export interface FrontierSwarmQueueOutcomeDecisionInput {
  id?: string;
  subjectId?: string;
  subjectAliases?: readonly string[];
  jobId?: string;
  taskId?: string;
  queueItemId?: string;
  queueItemIds?: readonly string[];
  queueId?: string;
  lane?: string;
  action?: FrontierSwarmMergeQueueAssignmentAction;
  assignedAction?: FrontierSwarmMergeQueueAssignmentAction;
  decision?: FrontierSwarmCoordinatorAgentDrainDecision | string;
  category?: FrontierSwarmQueueOutcomeCategory;
  outcome?: FrontierSwarmQueueOutcome;
  terminal?: boolean;
  reasons?: readonly string[];
  disposition?: FrontierSwarmMergeDisposition;
  mergeReadiness?: FrontierSwarmMergeReadiness;
  status?: string;
  conflictingJobIds?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmQueueOutcomeDecision {
  id: string;
  subjectId: string;
  subjectAliases: string[];
  jobId?: string;
  taskId?: string;
  queueItemIds: string[];
  queueId?: string;
  lane?: string;
  action?: FrontierSwarmMergeQueueAssignmentAction;
  assignedAction?: FrontierSwarmMergeQueueAssignmentAction;
  decision?: FrontierSwarmCoordinatorAgentDrainDecision | string;
  category: FrontierSwarmQueueOutcomeCategory;
  outcome: FrontierSwarmQueueOutcome;
  terminal: boolean;
  closesSubject: boolean;
  coordinatorReview: boolean;
  humanBlocked: boolean;
  staleOrRerun: boolean;
  conflict: boolean;
  reviewDebt: boolean;
  reasons: string[];
  disposition?: FrontierSwarmMergeDisposition;
  mergeReadiness?: FrontierSwarmMergeReadiness;
  status?: string;
  conflictingJobIds: string[];
  generatedAt: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmQueueOutcomeModelInput {
  id?: string;
  decisions?: readonly (FrontierSwarmQueueOutcomeDecisionInput | FrontierSwarmQueueOutcomeDecision)[];
  queue?: FrontierSwarmHierarchicalMergeQueue;
  drainWork?: FrontierSwarmCoordinatorAgentDrainWork;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmQueueOutcomeSubject {
  subjectId: string;
  aliases: string[];
  latestDecision: FrontierSwarmQueueOutcomeDecision;
  supersededDecisions: FrontierSwarmQueueOutcomeDecision[];
}

export interface FrontierSwarmQueueOutcomeModel {
  kind: typeof FRONTIER_SWARM_QUEUE_OUTCOME_MODEL_KIND;
  version: typeof FRONTIER_SWARM_QUEUE_OUTCOME_MODEL_VERSION;
  id: string;
  generatedAt: number;
  decisions: FrontierSwarmQueueOutcomeDecision[];
  subjects: FrontierSwarmQueueOutcomeSubject[];
  latestDecisions: FrontierSwarmQueueOutcomeDecision[];
  supersededDecisions: FrontierSwarmQueueOutcomeDecision[];
  visibleReviewDebt: FrontierSwarmQueueOutcomeDecision[];
  visibleHumanBlockers: FrontierSwarmQueueOutcomeDecision[];
  visibleReruns: FrontierSwarmQueueOutcomeDecision[];
  visibleConflicts: FrontierSwarmQueueOutcomeDecision[];
  bySubjectId: Record<string, string>;
  subjectIdByAlias: Record<string, string>;
  latestDecisionIdByAlias: Record<string, string>;
  byCategory: Record<string, string[]>;
  byOutcome: Record<string, string[]>;
  summary: {
    decisionCount: number;
    subjectCount: number;
    latestDecisionCount: number;
    supersededDecisionCount: number;
    terminalCount: number;
    continuationCount: number;
    coordinatorReviewCount: number;
    humanBlockedCount: number;
    staleRerunCount: number;
    conflictCount: number;
    visibleReviewDebtCount: number;
    visibleHumanBlockedCount: number;
    visibleRerunCount: number;
    visibleConflictCount: number;
  };
  metadata?: JsonObject;
}

export type FrontierSwarmTerminalStateBucket =
  | 'ready'
  | 'review'
  | 'stale'
  | 'failed'
  | 'done'
  | 'terminal'
  | string;

export interface FrontierSwarmTerminalStateItemInput {
  id?: string;
  subjectId?: string;
  subjectAliases?: readonly string[];
  jobId?: string;
  taskId?: string;
  queueItemId?: string;
  queueItemIds?: readonly string[];
  bucket?: FrontierSwarmTerminalStateBucket;
  status?: string;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmTerminalStateCollectionInput {
  bucket: FrontierSwarmTerminalStateBucket;
  items: readonly (string | FrontierSwarmTerminalStateItemInput)[];
}

export type FrontierSwarmTerminalStateCollectionsInput =
  | Record<string, readonly (string | FrontierSwarmTerminalStateItemInput)[]>
  | readonly FrontierSwarmTerminalStateCollectionInput[];

export interface FrontierSwarmTerminalStateItem {
  id: string;
  subjectId: string;
  subjectAliases: string[];
  jobId?: string;
  taskId?: string;
  queueItemIds: string[];
  bucket: FrontierSwarmTerminalStateBucket;
  status?: string;
  generatedAt: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmTerminalStateResolution {
  id: string;
  subjectId: string;
  subjectAliases: string[];
  jobId?: string;
  taskId?: string;
  queueItemIds: string[];
  bucket: FrontierSwarmTerminalStateBucket;
  sourceItemIds: string[];
  sourceBuckets: FrontierSwarmTerminalStateBucket[];
  decisionId: string;
  decisionCategory: FrontierSwarmQueueOutcomeCategory;
  decisionOutcome: FrontierSwarmQueueOutcome;
  decisionTerminal: boolean;
  decisionGeneratedAt: number;
  resolved: boolean;
  terminal: boolean;
  failedWorkerOutput: false;
  reasons: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmTerminalStateReconciliationInput {
  id?: string;
  collections?: FrontierSwarmTerminalStateCollectionsInput;
  decisions?: readonly (FrontierSwarmQueueOutcomeDecisionInput | FrontierSwarmQueueOutcomeDecision)[];
  outcomeModel?: FrontierSwarmQueueOutcomeModel;
  generatedAt?: number;
  doneBucket?: FrontierSwarmTerminalStateBucket;
  terminalBucket?: FrontierSwarmTerminalStateBucket;
  metadata?: unknown;
}

export interface FrontierSwarmTerminalStateReconciliation {
  kind: typeof FRONTIER_SWARM_TERMINAL_STATE_RECONCILIATION_KIND;
  version: typeof FRONTIER_SWARM_TERMINAL_STATE_RECONCILIATION_VERSION;
  id: string;
  generatedAt: number;
  outcomeModelId: string;
  items: FrontierSwarmTerminalStateItem[];
  active: FrontierSwarmTerminalStateItem[];
  failedWorkerOutput: FrontierSwarmTerminalStateItem[];
  resolved: FrontierSwarmTerminalStateResolution[];
  terminal: FrontierSwarmTerminalStateResolution[];
  terminalUnresolved: FrontierSwarmTerminalStateResolution[];
  collapsed: FrontierSwarmTerminalStateResolution[];
  collections: Record<string, FrontierSwarmTerminalStateItem[]>;
  byBucket: Record<string, string[]>;
  latestDecisionIdByAlias: Record<string, string>;
  summary: {
    inputItemCount: number;
    decisionCount: number;
    latestDecisionCount: number;
    supersededDecisionCount: number;
    activeItemCount: number;
    collapsedItemCount: number;
    resolvedCount: number;
    terminalCount: number;
    terminalUnresolvedCount: number;
    failedWorkerOutputCount: number;
    visibleReviewDebtCount: number;
    visibleHumanBlockedCount: number;
    visibleRerunCount: number;
    visibleConflictCount: number;
  };
  metadata?: JsonObject;
}

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
  terminalDecisionId?: string;
  terminalDecisionQueueItemIds?: string[];
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
  metadata?: JsonObject;
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
  metadata?: JsonObject;
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
  metadata?: JsonObject;
}

export interface FrontierSwarmContinuousPoolWorkItemInput {
  id?: string;
  jobId?: string;
  taskId?: string;
  queueItemId?: string;
  queueItemIds?: readonly string[];
  lane?: string;
  bucket?: FrontierSwarmContinuousPoolBucket;
  source?: string;
  status?: string;
  priority?: number;
  priorityClass?: FrontierSwarmPriorityClass;
  reasons?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmContinuousPoolWorkItem {
  id: string;
  jobId?: string;
  taskId?: string;
  queueItemIds: string[];
  lane?: string;
  bucket: FrontierSwarmContinuousPoolBucket;
  source: string;
  status?: string;
  priority?: number;
  priorityClass: FrontierSwarmPriorityClass;
  reasons: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmContinuousPoolStateInput {
  id?: string;
  maxWorkers?: number;
  active?: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[];
  queued?: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[];
  reviewDrain?: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[];
  rerun?: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[];
  humanBlocked?: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[];
  conflicted?: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[];
  conflicts?: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[];
  capacityBlocked?: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[];
  done?: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[];
  activeLeases?: readonly FrontierSwarmLease[];
  queueSnapshot?: FrontierSwarmQueueSnapshot;
  schedule?: FrontierSwarmSchedule;
  drainWork?: FrontierSwarmCoordinatorAgentDrainWork;
  outcomeModel?: FrontierSwarmQueueOutcomeModel;
  decisions?: readonly (FrontierSwarmQueueOutcomeDecisionInput | FrontierSwarmQueueOutcomeDecision)[];
  terminalState?: FrontierSwarmTerminalStateReconciliation;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmContinuousPoolRefillSlot {
  id: string;
  index: number;
  state: 'fillable' | 'idle' | string;
  recommendationId?: string;
}

export interface FrontierSwarmContinuousPoolRefillRecommendation {
  id: string;
  slotId: string;
  action: FrontierSwarmContinuousPoolRefillAction;
  bucket: FrontierSwarmContinuousPoolBucket;
  itemIds: string[];
  jobIds: string[];
  priority: number;
  priorityClass: FrontierSwarmPriorityClass;
  reasons: string[];
}

export interface FrontierSwarmContinuousPoolState {
  kind: typeof FRONTIER_SWARM_CONTINUOUS_POOL_STATE_KIND;
  version: typeof FRONTIER_SWARM_CONTINUOUS_POOL_STATE_VERSION;
  id: string;
  generatedAt: number;
  phase: FrontierSwarmContinuousPoolPhase;
  maxWorkers?: number;
  activeLeases: FrontierSwarmLease[];
  buckets: {
    active: FrontierSwarmContinuousPoolWorkItem[];
    queued: FrontierSwarmContinuousPoolWorkItem[];
    reviewDrain: FrontierSwarmContinuousPoolWorkItem[];
    rerun: FrontierSwarmContinuousPoolWorkItem[];
    humanBlocked: FrontierSwarmContinuousPoolWorkItem[];
    conflicted: FrontierSwarmContinuousPoolWorkItem[];
    capacityBlocked: FrontierSwarmContinuousPoolWorkItem[];
    done: FrontierSwarmContinuousPoolWorkItem[];
  };
  byBucket: Record<string, string[]>;
  refillSlots: FrontierSwarmContinuousPoolRefillSlot[];
  refillRecommendations: FrontierSwarmContinuousPoolRefillRecommendation[];
  stopCondition?: FrontierSwarmContinuousPoolStopCondition;
  stopConditions: FrontierSwarmContinuousPoolStopCondition[];
  stopped: boolean;
  drained: boolean;
  summary: {
    activeCount: number;
    queuedCount: number;
    reviewDrainCount: number;
    rerunCount: number;
    humanBlockedCount: number;
    conflictedCount: number;
    capacityBlockedCount: number;
    doneCount: number;
    pendingCount: number;
    terminalUnresolvedCount: number;
    refillSlotCount: number;
    idleRefillSlotCount: number;
    refillRecommendationCount: number;
  };
  metadata?: JsonObject;
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

export function createSwarmModelRoute(input: FrontierSwarmModelRouterInput): FrontierSwarmModelRoute {
  const generatedAt = input.generatedAt ?? Date.now();
  const task = isSwarmTask(input.task) ? cloneJsonValue(input.task) as FrontierSwarmTask : normalizeTask(input.task);
  const computes = routerComputes(input);
  const tokenEstimate = normalizeModelTokenEstimate(input.tokenEstimate, task);
  const budget = input.budget ? normalizeBudget(input.budget) : task.budget;
  const priceCatalog = normalizeModelPriceCatalog(input.priceCatalog);
  const outcomeHistory = input.outcomeHistory ?? readModelOutcomeHistory(task.metadata);
  const requiredCapabilities = routerRequiredCapabilities(task, input.requiredCapabilities);
  const riskScore = inferRoutingDimension(task, 'risk');
  const uncertaintyScore = inferRoutingDimension(task, 'uncertainty', outcomeHistory.length === 0 ? 0.12 : 0);
  const impactScore = inferRoutingDimension(task, 'impact');
  const timePressureScore = normalizeTimePressureScore(input.timePressure ?? readRoutingMetadataValue(task.metadata, ['timePressure', 'urgency']));
  const rawCandidates = computes.map((compute) => createRawModelRouteCandidate({
    compute,
    requiredCapabilities,
    tokenEstimate,
    priceCatalog,
    outcomeHistory,
    budget
  }));
  const candidates = finalizeModelRouteCandidates(rawCandidates, {
    riskScore,
    uncertaintyScore,
    impactScore,
    timePressureScore
  });
  const capable = candidates.filter((candidate) => candidate.capable);
  const budgetCapable = capable.filter((candidate) => candidate.budgetOk);
  const usable = budgetCapable.length ? budgetCapable : capable.length ? capable : candidates;
  const cheapestCapable = [...usable].sort(compareCandidatesByCost)[0] ?? candidates[0];
  const riskDemand = clamp01(riskScore * 0.42 + uncertaintyScore * 0.33 + impactScore * 0.25);
  const ranked = [...usable].sort(compareModelRouteCandidates);
  const qualityThreshold = routingQualityThreshold(riskDemand);
  const cheapestHasPoorHistory = !!cheapestCapable && cheapestCapable.historyScore < 0.45 && cheapestCapable.outcomeKnown;
  const selected = riskDemand < 0.46 && !cheapestHasPoorHistory
    ? cheapestCapable
    : ranked.find((candidate) => candidate.qualityScore >= qualityThreshold) ?? ranked[0] ?? cheapestCapable;
  if (!selected) throw new Error('No model route candidates available');
  const panel = createSwarmPanelEvaluation({
    candidates,
    task,
    budget,
    panel: input.panel ?? { enabled: false },
    riskScore,
    uncertaintyScore,
    impactScore,
    generatedAt,
    metadata: input.panel?.metadata
  });
  const budgetCapped = capable.length > 0 && budgetCapable.length < capable.length;
  const route = panel.recommended
    ? panel.strategy === 'tournament' ? 'tournament' : 'panel'
    : selected.compute.id === cheapestCapable?.compute.id && (riskDemand < 0.62 || budgetCapped)
      ? 'single-cheap'
      : 'single-deep';
  const recommendedComputeIds = route === 'panel' || route === 'tournament'
    ? panel.memberComputeIds
    : [selected.compute.id];
  const reasons = modelRouteReasons(route, selected, cheapestCapable, panel, {
    riskDemand,
    qualityThreshold,
    budgetCapped,
    missingTelemetry: candidates.some((candidate) => !candidate.priceKnown || !candidate.outcomeKnown)
  });
  return {
    kind: FRONTIER_SWARM_MODEL_ROUTE_KIND,
    version: FRONTIER_SWARM_MODEL_ROUTE_VERSION,
    id: input.id ?? 'swarm-model-route:' + stableHash([task.id, route, recommendedComputeIds, generatedAt]),
    generatedAt,
    taskId: task.id,
    route,
    recommendedComputeIds,
    ...(panel.fuserComputeId && (route === 'panel' || route === 'tournament') ? { fuserComputeId: panel.fuserComputeId } : {}),
    recommended: selected,
    candidates,
    ...(input.panel || panel.recommended ? { panel } : {}),
    tokenEstimate,
    riskScore,
    uncertaintyScore,
    impactScore,
    timePressureScore,
    reasons,
    explanation: explainModelRoute(route, selected, cheapestCapable, panel, riskDemand),
    summary: {
      candidateCount: candidates.length,
      capableCount: capable.length,
      priceKnownCount: candidates.filter((candidate) => candidate.priceKnown).length,
      outcomeKnownCount: candidates.filter((candidate) => candidate.outcomeKnown).length,
      ...(cheapestCapable ? { cheapestCapableComputeId: cheapestCapable.compute.id } : {}),
      recommendedCostUsd: route === 'panel' || route === 'tournament' ? panel.expectedCostUsd : selected.estimatedCostUsd,
      recommendedLatencyMs: route === 'panel' || route === 'tournament' ? panel.expectedLatencyMs : selected.estimatedLatencyMs,
      ...(input.panel || panel.recommended ? { panelCostUsd: panel.expectedCostUsd, panelLatencyMs: panel.expectedLatencyMs } : {})
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmPanelEvaluation(input: FrontierSwarmPanelEvaluationInput = {}): FrontierSwarmPanelEvaluation {
  const generatedAt = input.generatedAt ?? Date.now();
  const panel = input.panel ?? {};
  const enabled = panel.enabled ?? true;
  const riskTask = input.task ? isSwarmTask(input.task) ? input.task : normalizeTask(input.task) : undefined;
  const riskScore = clamp01(input.riskScore ?? (riskTask ? inferRoutingDimension(riskTask, 'risk') : 0));
  const uncertaintyScore = clamp01(input.uncertaintyScore ?? (riskTask ? inferRoutingDimension(riskTask, 'uncertainty') : 0));
  const impactScore = clamp01(input.impactScore ?? (riskTask ? inferRoutingDimension(riskTask, 'impact') : 0));
  const riskDemand = clamp01(riskScore * 0.42 + uncertaintyScore * 0.33 + impactScore * 0.25);
  const candidates = [...(input.candidates ?? [])].filter((candidate) => candidate.capable).sort(compareModelRouteCandidates);
  const minMembers = Math.max(2, Math.floor(panel.minMembers ?? 2));
  const maxMembers = Math.max(minMembers, Math.floor(panel.maxMembers ?? 3));
  const members = selectPanelMembers(candidates, panel, maxMembers);
  const fuser = selectPanelFuser(candidates, panel, members);
  const fuserCost = fuser ? estimateFuserCost(fuser, panel.fuserTokenEstimate) : 0;
  const fuserLatency = fuser ? estimateFuserLatency(fuser, panel.fuserTokenEstimate) : 0;
  const memberCost = members.reduce((total, candidate) => total + candidate.estimatedCostUsd, 0);
  const memberLatency = members.reduce((max, candidate) => Math.max(max, candidate.estimatedLatencyMs), 0);
  const expectedCostUsd = roundCurrency(memberCost + fuserCost);
  const expectedLatencyMs = Math.max(1, Math.round(memberLatency + fuserLatency));
  const confidenceLift = roundScore(clamp01(panel.confidenceLift ?? defaultPanelConfidenceLift(members.length, riskScore, uncertaintyScore, impactScore)));
  const bestQuality = members.reduce((max, candidate) => Math.max(max, candidate.qualityScore), 0);
  const residualRiskScore = roundScore(clamp01(riskDemand - confidenceLift * 0.7));
  const confidenceScore = roundScore(clamp01(bestQuality + confidenceLift - residualRiskScore * 0.15));
  const budget = input.budget ? normalizeBudget(input.budget) : undefined;
  const maxCostUsd = panel.maxCostUsd ?? budget?.maxCostUsd;
  const budgetOk = maxCostUsd === undefined || expectedCostUsd <= maxCostUsd + 1e-12;
  const strategy = panel.strategy && panel.strategy !== 'auto' ? panel.strategy : 'panel';
  const minRiskScore = clamp01(panel.minRiskScore ?? 0.62);
  const reasons = panelEvaluationReasons({
    enabled,
    memberCount: members.length,
    minMembers,
    budgetOk,
    riskDemand,
    minRiskScore,
    confidenceLift,
    strategy
  });
  const recommended = enabled
    && members.length >= minMembers
    && budgetOk
    && riskDemand >= minRiskScore
    && confidenceLift >= 0.08;
  return {
    kind: FRONTIER_SWARM_PANEL_EVALUATION_KIND,
    version: FRONTIER_SWARM_PANEL_EVALUATION_VERSION,
    id: input.id ?? 'swarm-panel-evaluation:' + stableHash([strategy, members.map((candidate) => candidate.compute.id), fuser?.compute.id, generatedAt]),
    generatedAt,
    strategy,
    memberComputeIds: members.map((candidate) => candidate.compute.id),
    ...(fuser ? { fuserComputeId: fuser.compute.id } : {}),
    expectedCostUsd,
    expectedLatencyMs,
    confidenceLift,
    confidenceScore,
    residualRiskScore,
    budgetOk,
    recommended,
    reasons,
    summary: {
      memberCount: members.length,
      costUsd: expectedCostUsd,
      latencyMs: expectedLatencyMs,
      confidenceLift,
      residualRiskScore
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
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
  const metadata = mergeSwarmMetadata([input.metadata, job?.metadata, result.metadata]);
  const semanticImport = input.semanticImport !== undefined ? input.semanticImport : result.semanticImport;
  const traceShards = cloneJsonValue([...(input.traceShards ?? []), ...(result.traceShards ?? [])]);
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
    ...(semanticImport !== undefined ? { semanticImport: cloneJsonValue(semanticImport) } : {}),
    traceShards,
    ...(input.branchName ? { branchName: input.branchName } : {}),
    ...(input.commit ? { commit: input.commit } : {}),
    staleAgainstHead: input.staleAgainstHead ?? false,
    reasons,
    ...(metadata ? { metadata } : {})
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
  const metadata = mergeSwarmMetadata([input.metadata]);
  const entries: FrontierSwarmMergeIndexEntry[] = input.bundles.map((bundle) => {
    const patchStatus = input.patchStatuses?.[bundle.jobId] ?? (bundle.staleAgainstHead ? 'stale' : bundle.patchPath ? 'unknown' : 'missing');
    const staleAgainstHead = bundle.staleAgainstHead || patchStatus === 'stale' || patchStatus === 'failed-check';
    const entryMetadata = mergeSwarmMetadata([bundle.metadata]);
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
      generatedAt: bundle.generatedAt,
      ...(entryMetadata ? { metadata: entryMetadata } : {})
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
    ...(metadata ? { metadata } : {})
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
    const metadata = mergeSwarmMetadata([scope.metadata, entry.metadata]);
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
      ...(entryScopes?.unknownRegions.length ? { unknownRegions: [...entryScopes.unknownRegions] } : {}),
      ...(metadata ? { metadata } : {})
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
  const queueId = input.id ?? 'swarm-hierarchical-merge-queue:' + stableHash([input.index.id, input.admission?.id, orderedScopes, assignments, promotions, generatedAt]);
  const linkedAssignments = assignments.map((assignment) => {
    if (!coordinatorAgentDrainActionIsTerminal(assignment.action)) return assignment;
    return {
      ...assignment,
      terminalDecisionId: hierarchicalQueueTerminalDecisionId(queueId, assignment),
      terminalDecisionQueueItemIds: [...assignment.queueItemIds]
    };
  });
  const leaseRecords = createHierarchicalQueueLeaseRecords({
    queueId,
    rootScopeId,
    generatedAt,
    scopes: orderedScopes,
    assignments: linkedAssignments,
    promotions,
    localLeader: input.localLeader,
    localLeaders: input.localLeaders
  });
  const byLeaseKey = groupJobIdsByMany(linkedAssignments, (assignment) => assignment.requiredLeaseKeys ?? [assignment.leaseKey]);
  return {
    kind: FRONTIER_SWARM_HIERARCHICAL_MERGE_QUEUE_KIND,
    version: FRONTIER_SWARM_HIERARCHICAL_MERGE_QUEUE_VERSION,
    id: queueId,
    mergeIndexId: input.index.id,
    ...(input.admission ? { admissionId: input.admission.id } : {}),
    generatedAt,
    rootScopeId,
    scopes: orderedScopes,
    leaseRecords,
    assignments: linkedAssignments,
    promotions,
    byScope,
    byLeaseKey,
    byAction,
    summary: {
      scopeCount: orderedScopes.length,
      assignmentCount: linkedAssignments.length,
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
    const assignmentMetadata = mergeSwarmMetadata([leaseScopeRecord?.metadata, assignment.metadata]);
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
      ...(assignment.terminalDecisionId ? { terminalDecisionId: assignment.terminalDecisionId } : {}),
      ...(assignment.terminalDecisionQueueItemIds?.length ? { terminalDecisionQueueItemIds: [...assignment.terminalDecisionQueueItemIds] } : {}),
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
      ...(assignment.unknownRegions?.length ? { unknownRegions: [...assignment.unknownRegions] } : {}),
      ...(assignmentMetadata ? { metadata: assignmentMetadata } : {})
    };
  });
  const terminalDecisions: FrontierSwarmCoordinatorAgentDrainTerminalDecision[] = assignments
    .filter((assignment) => assignment.terminal)
    .map((assignment) => ({
      id: assignment.terminalDecisionId ?? 'swarm-coordinator-agent-terminal-decision:' + stableHash([input.queue.id, assignment.jobId, assignment.queueId, assignment.assignedAction]),
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
      ...(assignment.unknownRegions?.length ? { unknownRegions: [...assignment.unknownRegions] } : {}),
      ...(assignment.metadata ? { metadata: cloneJsonValue(assignment.metadata) as JsonObject } : {})
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
      requiredLeaseKeys: [...(assignment.requiredLeaseKeys ?? [])],
      ...(assignment.metadata ? { metadata: cloneJsonValue(assignment.metadata) as JsonObject } : {})
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

export function createSwarmContinuousPoolState(input: FrontierSwarmContinuousPoolStateInput = {}): FrontierSwarmContinuousPoolState {
  const generatedAt = input.generatedAt ?? Date.now();
  const maxWorkers = positiveNumber(input.maxWorkers) || input.maxWorkers === 0
    ? Math.max(0, Math.floor(input.maxWorkers as number))
    : undefined;
  const activeLeases = uniqueLeases([
    ...(input.activeLeases ?? []),
    ...(input.queueSnapshot?.leases ?? [])
  ], generatedAt);
  const outcomeModel = input.outcomeModel ?? (
    input.drainWork || input.decisions?.length
      ? createSwarmQueueOutcomeModel({
        drainWork: input.drainWork,
        decisions: input.decisions ?? [],
        generatedAt
      })
      : undefined
  );

  const active = dedupeContinuousPoolItems([
    ...normalizeContinuousPoolItems(input.active, 'active', 'input.active', generatedAt),
    ...activeLeases.map((lease, index) => continuousPoolItemFromLease(lease, index)),
    ...(input.queueSnapshot?.jobs ?? [])
      .filter((job) => continuousPoolQueueStatusIsActive(job.status))
      .map((job, index) => continuousPoolItemFromQueueJob(job, 'active', 'queue-snapshot', index)),
    ...(input.schedule?.running ?? [])
      .map((job, index) => continuousPoolItemFromScheduledJob(job, 'active', 'schedule.running', index))
  ]);

  const queued = dedupeContinuousPoolItems([
    ...normalizeContinuousPoolItems(input.queued, 'queued', 'input.queued', generatedAt),
    ...(input.queueSnapshot?.jobs ?? [])
      .filter((job) => continuousPoolQueueStatusIsQueued(job.status))
      .map((job, index) => continuousPoolItemFromQueueJob(job, 'queued', 'queue-snapshot', index)),
    ...(input.schedule?.ready ?? [])
      .map((job, index) => continuousPoolItemFromScheduledJob(job, 'queued', 'schedule.ready', index))
  ]);

  const reviewDrain = dedupeContinuousPoolItems([
    ...normalizeContinuousPoolItems(input.reviewDrain, 'review-drain', 'input.reviewDrain', generatedAt),
    ...(input.drainWork?.activeAssignments ?? [])
      .filter((assignment) => assignment.decision === 'escalated' || assignment.assignedAction === 'promote' || assignment.classification === 'non-terminal')
      .map((assignment, index) => continuousPoolItemFromDrainAssignment(assignment, 'review-drain', 'coordinator-drain-work', index)),
    ...(input.drainWork?.promotedWork ?? [])
      .map((work, index) => continuousPoolItemFromPromotedWork(work, 'review-drain', 'coordinator-promoted-work', index)),
    ...(outcomeModel?.visibleReviewDebt ?? [])
      .filter((decision) => decision.coordinatorReview && !decision.conflict)
      .map((decision, index) => continuousPoolItemFromOutcomeDecision(decision, 'review-drain', 'queue-outcome-model', index)),
    ...(input.terminalState?.terminalUnresolved ?? [])
      .filter((resolution) => resolution.decisionCategory === 'coordinator-review')
      .map((resolution, index) => continuousPoolItemFromTerminalResolution(resolution, 'review-drain', 'terminal-state', index))
  ]);

  const rerun = dedupeContinuousPoolItems([
    ...normalizeContinuousPoolItems(input.rerun, 'rerun', 'input.rerun', generatedAt),
    ...(outcomeModel?.visibleReruns ?? [])
      .map((decision, index) => continuousPoolItemFromOutcomeDecision(decision, 'rerun', 'queue-outcome-model', index)),
    ...(input.terminalState?.terminalUnresolved ?? [])
      .filter((resolution) => resolution.decisionCategory === 'stale-rerun')
      .map((resolution, index) => continuousPoolItemFromTerminalResolution(resolution, 'rerun', 'terminal-state', index))
  ]);

  const humanBlocked = dedupeContinuousPoolItems([
    ...normalizeContinuousPoolItems(input.humanBlocked, 'human-blocked', 'input.humanBlocked', generatedAt),
    ...(input.queueSnapshot?.jobs ?? [])
      .filter((job) => continuousPoolQueueStatusIsHumanBlocked(job.status))
      .map((job, index) => continuousPoolItemFromQueueJob(job, 'human-blocked', 'queue-snapshot', index)),
    ...(outcomeModel?.visibleHumanBlockers ?? [])
      .map((decision, index) => continuousPoolItemFromOutcomeDecision(decision, 'human-blocked', 'queue-outcome-model', index)),
    ...(input.terminalState?.terminalUnresolved ?? [])
      .filter((resolution) => resolution.decisionCategory === 'human-blocked')
      .map((resolution, index) => continuousPoolItemFromTerminalResolution(resolution, 'human-blocked', 'terminal-state', index))
  ]);

  const conflicted = dedupeContinuousPoolItems([
    ...normalizeContinuousPoolItems(input.conflicted, 'conflicted', 'input.conflicted', generatedAt),
    ...normalizeContinuousPoolItems(input.conflicts, 'conflicted', 'input.conflicts', generatedAt),
    ...(outcomeModel?.visibleConflicts ?? [])
      .map((decision, index) => continuousPoolItemFromOutcomeDecision(decision, 'conflicted', 'queue-outcome-model', index)),
    ...(input.terminalState?.terminalUnresolved ?? [])
      .filter((resolution) => resolution.decisionCategory === 'conflict')
      .map((resolution, index) => continuousPoolItemFromTerminalResolution(resolution, 'conflicted', 'terminal-state', index))
  ]);

  const capacityBlocked = dedupeContinuousPoolItems([
    ...normalizeContinuousPoolItems(input.capacityBlocked, 'capacity-blocked', 'input.capacityBlocked', generatedAt),
    ...(input.schedule?.blocked ?? [])
      .filter((job) => continuousPoolBlockedJobIsCapacityBlocked(job))
      .map((job, index) => continuousPoolItemFromBlockedJob(job, 'capacity-blocked', 'schedule.blocked', index))
  ]);

  const done = dedupeContinuousPoolItems([
    ...normalizeContinuousPoolItems(input.done, 'done', 'input.done', generatedAt),
    ...(input.queueSnapshot?.jobs ?? [])
      .filter((job) => continuousPoolQueueStatusIsDone(job.status))
      .map((job, index) => continuousPoolItemFromQueueJob(job, 'done', 'queue-snapshot', index)),
    ...(input.schedule?.completed ?? [])
      .map((jobId, index) => normalizeContinuousPoolItem(jobId, 'done', 'schedule.completed', generatedAt, index)),
    ...(outcomeModel?.latestDecisions ?? [])
      .filter(continuousPoolDecisionIsDone)
      .map((decision, index) => continuousPoolItemFromOutcomeDecision(decision, 'done', 'queue-outcome-model', index)),
    ...(input.terminalState?.resolved ?? [])
      .map((resolution, index) => continuousPoolItemFromTerminalResolution(resolution, 'done', 'terminal-state', index)),
    ...(input.terminalState?.terminal ?? [])
      .filter((resolution) => resolution.decisionCategory === 'terminal')
      .map((resolution, index) => continuousPoolItemFromTerminalResolution(resolution, 'done', 'terminal-state', index))
  ]);

  const buckets = { active, queued, reviewDrain, rerun, humanBlocked, conflicted, capacityBlocked, done };
  const refill = createContinuousPoolRefill({ buckets, maxWorkers, generatedAt });
  const stopConditions = continuousPoolStopConditions({ buckets, maxWorkers });
  const stopCondition = stopConditions[0];
  const phase = continuousPoolPhase(buckets);
  const pendingCount = active.length + queued.length + reviewDrain.length + rerun.length + humanBlocked.length + conflicted.length + capacityBlocked.length;
  const terminalUnresolvedCount = reviewDrain.length + rerun.length + humanBlocked.length + conflicted.length + capacityBlocked.length;
  return {
    kind: FRONTIER_SWARM_CONTINUOUS_POOL_STATE_KIND,
    version: FRONTIER_SWARM_CONTINUOUS_POOL_STATE_VERSION,
    id: input.id ?? 'swarm-continuous-pool-state:' + stableHash([maxWorkers, buckets, stopConditions, generatedAt]),
    generatedAt,
    phase,
    ...(maxWorkers !== undefined ? { maxWorkers } : {}),
    activeLeases,
    buckets,
    byBucket: continuousPoolByBucket(buckets),
    refillSlots: refill.slots,
    refillRecommendations: refill.recommendations,
    ...(stopCondition ? { stopCondition } : {}),
    stopConditions,
    stopped: stopConditions.length > 0,
    drained: stopConditions.length === 1 && stopCondition === 'drained',
    summary: {
      activeCount: active.length,
      queuedCount: queued.length,
      reviewDrainCount: reviewDrain.length,
      rerunCount: rerun.length,
      humanBlockedCount: humanBlocked.length,
      conflictedCount: conflicted.length,
      capacityBlockedCount: capacityBlocked.length,
      doneCount: done.length,
      pendingCount,
      terminalUnresolvedCount,
      refillSlotCount: refill.slots.length,
      idleRefillSlotCount: refill.slots.filter((slot) => slot.state === 'idle').length,
      refillRecommendationCount: refill.recommendations.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function classifySwarmQueueOutcome(input: FrontierSwarmQueueOutcomeDecisionInput): FrontierSwarmQueueOutcomeClassification {
  const explicitCategory = input.category?.trim();
  const search = queueOutcomeSearch(input);
  const action = input.assignedAction ?? input.action;
  const conflict = uniqueStrings(input.conflictingJobIds ?? []).length > 0
    || queueOutcomeHas(search, 'conflict', 'conflicting-changes', 'merge-conflict', 'textual-conflict', 'semantic-overlap');
  let category: FrontierSwarmQueueOutcomeCategory;

  if (explicitCategory) {
    category = explicitCategory;
  } else if (
    queueOutcomeHas(search, 'committed', 'applied', 'superseded', 'rejected', 'recorded', 'closed')
    || action === 'apply-local'
    || action === 'reject'
    || action === 'record-only'
    || input.disposition === 'rejected'
    || input.mergeReadiness === 'discovery-only'
  ) {
    category = 'terminal';
  } else if (
    action === 'rerun'
    || input.decision === 'rerun'
    || input.disposition === 'stale-against-head'
    || queueOutcomeHas(search, 'stale-against-head', 'stale-rerun', 'needs-rerun')
  ) {
    category = 'stale-rerun';
  } else if (
    action === 'block'
    || input.decision === 'blocked'
    || input.disposition === 'blocked'
    || input.mergeReadiness === 'blocked'
    || queueOutcomeHas(search, 'true-blocker', 'human-blocked', 'human-question')
  ) {
    category = 'human-blocked';
  } else if (conflict) {
    category = 'conflict';
  } else if (
    action === 'promote'
    || input.decision === 'escalated'
    || input.disposition === 'needs-port'
    || input.status === 'needs-human-port'
    || queueOutcomeHas(
      search,
      'coordinator-review',
      'coordinator-queue-required',
      'needs-human-port',
      'needs-port',
      'review',
      'parent-scope-region',
      'unknown-semantic-region',
      'high-risk'
    )
  ) {
    category = 'coordinator-review';
  } else if (
    input.terminal === true
    || queueOutcomeHas(search, 'terminal')
  ) {
    category = 'terminal';
  } else {
    category = 'continuation';
  }

  const outcome = input.outcome?.trim() || defaultQueueOutcomeForCategory(category, input, search);
  const terminal = category === 'terminal';
  return {
    category,
    outcome,
    terminal,
    closesSubject: terminal,
    coordinatorReview: category === 'coordinator-review',
    humanBlocked: category === 'human-blocked',
    staleOrRerun: category === 'stale-rerun',
    conflict: category === 'conflict',
    reviewDebt: category === 'coordinator-review' || category === 'conflict'
  };
}

export function createSwarmQueueOutcomeDecision(
  input: FrontierSwarmQueueOutcomeDecisionInput | FrontierSwarmQueueOutcomeDecision
): FrontierSwarmQueueOutcomeDecision {
  const generatedAt = input.generatedAt ?? Date.now();
  const queueItemId = 'queueItemId' in input ? input.queueItemId : undefined;
  const queueItemIds = uniqueStrings([
    queueItemId,
    ...(input.queueItemIds ?? [])
  ]);
  const subjectAliases = uniqueStrings([
    input.subjectId,
    ...(input.subjectAliases ?? []),
    ...queueItemIds,
    input.taskId,
    input.jobId
  ]);
  const subjectId = input.subjectId?.trim()
    || queueItemIds[0]
    || input.taskId?.trim()
    || input.jobId?.trim()
    || input.id?.trim()
    || 'unknown-subject';
  const classification = classifySwarmQueueOutcome(input);
  const action = input.action ?? input.assignedAction;
  const assignedAction = input.assignedAction;
  const reasons = uniqueStrings(input.reasons ?? []);
  const conflictingJobIds = uniqueStrings(input.conflictingJobIds ?? []);
  const decision: FrontierSwarmQueueOutcomeDecision = {
    id: input.id ?? 'swarm-queue-outcome-decision:' + stableHash([subjectId, subjectAliases, action, input.decision, classification.category, classification.outcome, generatedAt]),
    subjectId,
    subjectAliases: subjectAliases.length ? subjectAliases : [subjectId],
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.taskId ? { taskId: input.taskId } : {}),
    queueItemIds,
    ...(input.queueId ? { queueId: input.queueId } : {}),
    ...(input.lane ? { lane: input.lane } : {}),
    ...(action ? { action } : {}),
    ...(assignedAction ? { assignedAction } : {}),
    ...(input.decision ? { decision: input.decision } : {}),
    ...classification,
    reasons,
    ...(input.disposition ? { disposition: input.disposition } : {}),
    ...(input.mergeReadiness ? { mergeReadiness: input.mergeReadiness } : {}),
    ...(input.status ? { status: input.status } : {}),
    conflictingJobIds,
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
  return decision;
}

export function createSwarmQueueOutcomeModel(input: FrontierSwarmQueueOutcomeModelInput = {}): FrontierSwarmQueueOutcomeModel {
  const generatedAt = input.generatedAt ?? Date.now();
  const rawDecisions: FrontierSwarmQueueOutcomeDecisionInput[] = [
    ...(input.queue ? queueOutcomeInputsFromMergeQueue(input.queue) : []),
    ...(input.drainWork ? queueOutcomeInputsFromDrainWork(input.drainWork) : []),
    ...(input.decisions ?? []).map((decision) => ({ ...decision }))
  ];
  const records = rawDecisions.map((decision, index) => ({
    index,
    decision: createSwarmQueueOutcomeDecision({
      ...decision,
      generatedAt: decision.generatedAt ?? generatedAt
    })
  }));
  const parent = new Map<string, string>();
  const find = (alias: string): string => {
    const current = parent.get(alias) ?? alias;
    if (current === alias) {
      parent.set(alias, alias);
      return alias;
    }
    const root = find(current);
    parent.set(alias, root);
    return root;
  };
  const union = (left: string, right: string): void => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot === rightRoot) return;
    const [nextRoot, nextChild] = [leftRoot, rightRoot].sort();
    parent.set(nextChild, nextRoot);
  };

  for (const { decision } of records) {
    const aliases = decision.subjectAliases.length ? decision.subjectAliases : [decision.subjectId];
    for (const alias of aliases) find(alias);
    for (const alias of aliases.slice(1)) union(aliases[0] as string, alias);
  }

  const recordsByRoot = new Map<string, typeof records>();
  for (const record of records) {
    const root = find(record.decision.subjectAliases[0] ?? record.decision.subjectId);
    recordsByRoot.set(root, [...(recordsByRoot.get(root) ?? []), record]);
  }

  const subjects: FrontierSwarmQueueOutcomeSubject[] = [];
  for (const componentRecords of recordsByRoot.values()) {
    const aliases = uniqueStrings(componentRecords.flatMap((record) => record.decision.subjectAliases)).sort();
    const subjectId = preferredQueueOutcomeSubjectId(componentRecords.map((record) => record.decision), aliases);
    const latestRecord = componentRecords.reduce((latest, candidate) => (
      queueOutcomeRecordIsLater(candidate, latest) ? candidate : latest
    ));
    const canonicalize = (decision: FrontierSwarmQueueOutcomeDecision): FrontierSwarmQueueOutcomeDecision => ({
      ...decision,
      subjectId,
      subjectAliases: aliases
    });
    const latestDecision = canonicalize(latestRecord.decision);
    const supersededDecisions = componentRecords
      .filter((record) => record !== latestRecord)
      .sort((left, right) => left.decision.generatedAt - right.decision.generatedAt || left.index - right.index)
      .map((record) => canonicalize(record.decision));
    subjects.push({ subjectId, aliases, latestDecision, supersededDecisions });
  }
  subjects.sort((left, right) => left.subjectId.localeCompare(right.subjectId));

  const latestDecisions = subjects.map((subject) => subject.latestDecision);
  const supersededDecisions = subjects.flatMap((subject) => subject.supersededDecisions);
  const decisions = [...latestDecisions, ...supersededDecisions].sort((left, right) => (
    left.generatedAt - right.generatedAt || left.id.localeCompare(right.id)
  ));
  const visibleReviewDebt = latestDecisions.filter((decision) => decision.reviewDebt);
  const visibleHumanBlockers = latestDecisions.filter((decision) => decision.humanBlocked);
  const visibleReruns = latestDecisions.filter((decision) => decision.staleOrRerun);
  const visibleConflicts = latestDecisions.filter((decision) => decision.conflict);
  const bySubjectId: Record<string, string> = {};
  const subjectIdByAlias: Record<string, string> = {};
  const latestDecisionIdByAlias: Record<string, string> = {};
  for (const subject of subjects) {
    bySubjectId[subject.subjectId] = subject.latestDecision.id;
    for (const alias of subject.aliases) {
      subjectIdByAlias[alias] = subject.subjectId;
      latestDecisionIdByAlias[alias] = subject.latestDecision.id;
    }
  }
  const byCategory = groupDecisionIdsBy(latestDecisions, (decision) => decision.category);
  const byOutcome = groupDecisionIdsBy(latestDecisions, (decision) => decision.outcome);
  return {
    kind: FRONTIER_SWARM_QUEUE_OUTCOME_MODEL_KIND,
    version: FRONTIER_SWARM_QUEUE_OUTCOME_MODEL_VERSION,
    id: input.id ?? 'swarm-queue-outcome-model:' + stableHash([latestDecisions, supersededDecisions, generatedAt]),
    generatedAt,
    decisions,
    subjects,
    latestDecisions,
    supersededDecisions,
    visibleReviewDebt,
    visibleHumanBlockers,
    visibleReruns,
    visibleConflicts,
    bySubjectId,
    subjectIdByAlias,
    latestDecisionIdByAlias,
    byCategory,
    byOutcome,
    summary: {
      decisionCount: decisions.length,
      subjectCount: subjects.length,
      latestDecisionCount: latestDecisions.length,
      supersededDecisionCount: supersededDecisions.length,
      terminalCount: latestDecisions.filter((decision) => decision.category === 'terminal').length,
      continuationCount: latestDecisions.filter((decision) => decision.category === 'continuation').length,
      coordinatorReviewCount: latestDecisions.filter((decision) => decision.category === 'coordinator-review').length,
      humanBlockedCount: latestDecisions.filter((decision) => decision.category === 'human-blocked').length,
      staleRerunCount: latestDecisions.filter((decision) => decision.category === 'stale-rerun').length,
      conflictCount: latestDecisions.filter((decision) => decision.category === 'conflict').length,
      visibleReviewDebtCount: visibleReviewDebt.length,
      visibleHumanBlockedCount: visibleHumanBlockers.length,
      visibleRerunCount: visibleReruns.length,
      visibleConflictCount: visibleConflicts.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function collapseSwarmQueueOutcomeDecisions(
  input: FrontierSwarmQueueOutcomeModelInput | readonly (FrontierSwarmQueueOutcomeDecisionInput | FrontierSwarmQueueOutcomeDecision)[]
): FrontierSwarmQueueOutcomeModel {
  if (Array.isArray(input)) return createSwarmQueueOutcomeModel({ decisions: input });
  return createSwarmQueueOutcomeModel(input as FrontierSwarmQueueOutcomeModelInput);
}

function normalizeSwarmTerminalOutcomeText(value: string): string {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function terminalOutcomeTextMatches(value: string | undefined, ...needles: string[]): boolean {
  if (!value) return false;
  const token = normalizeSwarmTerminalOutcomeText(value);
  return needles.some((needle) => token === needle || token.includes(needle));
}

function terminalOutcomeLabelFromText(value: string | undefined): FrontierSwarmTerminalOutcomeLabel | undefined {
  if (!value) return undefined;
  const token = normalizeSwarmTerminalOutcomeText(value);
  if (!token) return undefined;
  if (token === 'applied' || token === 'apply-local' || token === 'apply') return 'applied';
  if (token === 'committed' || token === 'commit') return 'committed';
  if (token === 'evidence-only' || token === 'evidenceonly' || token === 'evidence') return 'evidence-only';
  if (token === 'no-change' || token === 'nochange' || token === 'no-op' || token === 'noop' || token === 'unchanged') return 'no-change';
  if (token === 'generated-by-collector' || token === 'collector-generated' || token === 'generated-collector') return 'generated-by-collector';
  if (token === 'patch-missing' || token === 'missing-patch' || token === 'patchmissing') return 'patch-missing';
  if (token === 'bundle-missing' || token === 'missing-bundle' || token === 'bundlemissing') return 'bundle-missing';
  if (token === 'rerun' || token === 're-run' || token === 'retry' || token === 'needs-rerun' || token === 'stale-rerun') return 'rerun';
  if (token === 'rejected' || token === 'reject' || token === 'failed' || token === 'failure') return 'rejected';
  if (token === 'conflict-blocked' || token === 'merge-conflict' || token === 'textual-conflict' || token === 'conflict') return 'conflict-blocked';
  if (token === 'human-blocked' || token === 'human-question' || token === 'blocked') return 'human-blocked';
  if (token === 'coordinator-review' || token === 'needs-port' || token === 'escalated' || token === 'review') return 'coordinator-review';
  return token;
}

export function normalizeSwarmTerminalOutcome(
  input: FrontierSwarmTerminalOutcomeInput | FrontierSwarmTerminalOutcomeLabel | string = {}
): FrontierSwarmTerminalOutcome {
  const labelInput = typeof input === 'string' ? input : input.label ?? input.outcome ?? input.status ?? input.decision;
  const generatedByCollector = typeof input === 'string'
    ? terminalOutcomeTextMatches(input, 'generated-by-collector', 'collector-generated', 'generated-collector')
    : input.generatedByCollector === true
      || terminalOutcomeTextMatches(input.label, 'generated-by-collector', 'collector-generated', 'generated-collector')
      || terminalOutcomeTextMatches(input.outcome, 'generated-by-collector', 'collector-generated', 'generated-collector')
      || terminalOutcomeTextMatches(input.status, 'generated-by-collector', 'collector-generated', 'generated-collector')
      || terminalOutcomeTextMatches(input.decision, 'generated-by-collector', 'collector-generated', 'generated-collector');
  const evidenceOnly = typeof input === 'string'
    ? terminalOutcomeTextMatches(input, 'evidence-only', 'evidenceonly')
    : input.evidenceOnly === true
      || terminalOutcomeTextMatches(input.label, 'evidence-only', 'evidenceonly')
      || terminalOutcomeTextMatches(input.outcome, 'evidence-only', 'evidenceonly')
      || terminalOutcomeTextMatches(input.status, 'evidence-only', 'evidenceonly')
      || terminalOutcomeTextMatches(input.decision, 'evidence-only', 'evidenceonly');
  const noChange = typeof input === 'string'
    ? terminalOutcomeTextMatches(input, 'no-change', 'nochange', 'no-op', 'noop', 'unchanged')
    : input.noChange === true
      || terminalOutcomeTextMatches(input.label, 'no-change', 'nochange', 'no-op', 'noop', 'unchanged')
      || terminalOutcomeTextMatches(input.outcome, 'no-change', 'nochange', 'no-op', 'noop', 'unchanged')
      || terminalOutcomeTextMatches(input.status, 'no-change', 'nochange', 'no-op', 'noop', 'unchanged')
      || terminalOutcomeTextMatches(input.decision, 'no-change', 'nochange', 'no-op', 'noop', 'unchanged');
  const patchMissing = typeof input === 'string'
    ? terminalOutcomeTextMatches(input, 'patch-missing', 'missing-patch', 'patchmissing')
    : input.patchMissing === true
      || terminalOutcomeTextMatches(input.label, 'patch-missing', 'missing-patch', 'patchmissing')
      || terminalOutcomeTextMatches(input.outcome, 'patch-missing', 'missing-patch', 'patchmissing')
      || terminalOutcomeTextMatches(input.status, 'patch-missing', 'missing-patch', 'patchmissing')
      || terminalOutcomeTextMatches(input.decision, 'patch-missing', 'missing-patch', 'patchmissing');
  const bundleMissing = typeof input === 'string'
    ? terminalOutcomeTextMatches(input, 'bundle-missing', 'missing-bundle', 'bundlemissing')
    : input.bundleMissing === true
      || terminalOutcomeTextMatches(input.label, 'bundle-missing', 'missing-bundle', 'bundlemissing')
      || terminalOutcomeTextMatches(input.outcome, 'bundle-missing', 'missing-bundle', 'bundlemissing')
      || terminalOutcomeTextMatches(input.status, 'bundle-missing', 'missing-bundle', 'bundlemissing')
      || terminalOutcomeTextMatches(input.decision, 'bundle-missing', 'missing-bundle', 'bundlemissing');
  const conflictBlocked = typeof input === 'string'
    ? terminalOutcomeTextMatches(input, 'conflict-blocked', 'merge-conflict', 'textual-conflict', 'conflict')
    : input.conflictBlocked === true
      || terminalOutcomeTextMatches(input.label, 'conflict-blocked', 'merge-conflict', 'textual-conflict', 'conflict')
      || terminalOutcomeTextMatches(input.outcome, 'conflict-blocked', 'merge-conflict', 'textual-conflict', 'conflict')
      || terminalOutcomeTextMatches(input.status, 'conflict-blocked', 'merge-conflict', 'textual-conflict', 'conflict')
      || terminalOutcomeTextMatches(input.decision, 'conflict-blocked', 'merge-conflict', 'textual-conflict', 'conflict');
  const humanBlocked = typeof input === 'string'
    ? terminalOutcomeTextMatches(input, 'human-blocked', 'human-question', 'blocked')
    : input.humanBlocked === true
      || terminalOutcomeTextMatches(input.label, 'human-blocked', 'human-question', 'blocked')
      || terminalOutcomeTextMatches(input.outcome, 'human-blocked', 'human-question', 'blocked')
      || terminalOutcomeTextMatches(input.status, 'human-blocked', 'human-question', 'blocked')
      || terminalOutcomeTextMatches(input.decision, 'human-blocked', 'human-question', 'blocked');
  const coordinatorReview = typeof input === 'string'
    ? terminalOutcomeTextMatches(input, 'coordinator-review', 'needs-port', 'escalated', 'review')
    : input.coordinatorReview === true
      || terminalOutcomeTextMatches(input.label, 'coordinator-review', 'needs-port', 'escalated', 'review')
      || terminalOutcomeTextMatches(input.outcome, 'coordinator-review', 'needs-port', 'escalated', 'review')
      || terminalOutcomeTextMatches(input.status, 'coordinator-review', 'needs-port', 'escalated', 'review')
      || terminalOutcomeTextMatches(input.decision, 'coordinator-review', 'needs-port', 'escalated', 'review');
  const explicitLabel = terminalOutcomeLabelFromText(labelInput);

  const label = bundleMissing
    ? 'bundle-missing'
    : patchMissing
      ? 'patch-missing'
      : evidenceOnly
        ? 'evidence-only'
        : noChange
          ? 'no-change'
          : generatedByCollector
            ? 'generated-by-collector'
            : conflictBlocked
              ? 'conflict-blocked'
              : humanBlocked
                ? 'human-blocked'
                : coordinatorReview
                  ? 'coordinator-review'
                  : explicitLabel ?? 'unknown';

  const category: FrontierSwarmTerminalOutcomeCategory = label === 'applied' || label === 'committed' || label === 'evidence-only' || label === 'no-change' || label === 'generated-by-collector'
    ? 'success'
    : label === 'patch-missing' || label === 'bundle-missing'
      ? 'incomplete'
      : label === 'rerun'
        ? 'rerun'
        : label === 'rejected'
          ? 'rejected'
          : label === 'conflict-blocked' || label === 'human-blocked'
            ? 'blocked'
            : label === 'coordinator-review'
              ? 'review'
              : 'unknown';

  return {
    label,
    category,
    terminal: true,
    success: category === 'success',
    incomplete: category === 'incomplete',
    blocker: category === 'blocked',
    review: category === 'review',
    generatedByCollector,
    reasons: typeof input === 'string' ? [] : uniqueStrings(input.reasons ?? []),
    ...(typeof input !== 'string' && toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function reconcileSwarmTerminalState(input: FrontierSwarmTerminalStateReconciliationInput = {}): FrontierSwarmTerminalStateReconciliation {
  const generatedAt = input.generatedAt ?? Date.now();
  const doneBucket = input.doneBucket ?? 'done';
  const terminalBucket = input.terminalBucket ?? 'terminal';
  const model = input.outcomeModel && !input.decisions?.length
    ? input.outcomeModel
    : createSwarmQueueOutcomeModel({
      decisions: [
        ...(input.outcomeModel?.decisions ?? []),
        ...(input.decisions ?? [])
      ],
      generatedAt
    });
  const items = normalizeTerminalStateCollections(input.collections, generatedAt);
  const latestDecisionById = new Map(model.latestDecisions.map((decision) => [decision.id, decision]));
  const terminalByDecisionId = new Map<string, FrontierSwarmTerminalStateResolution>();
  const active: FrontierSwarmTerminalStateItem[] = [];

  for (const item of items) {
    const decision = latestTerminalStateDecisionForItem(item, model, latestDecisionById);
    if (!decision || !queueOutcomeDecisionClosesTerminalState(decision)) {
      active.push(item);
      continue;
    }
    const resolution = terminalByDecisionId.get(decision.id)
      ?? createTerminalStateResolution({
        decision,
        bucket: queueOutcomeDecisionIsResolvedOutput(decision) ? doneBucket : terminalBucket,
        item,
        generatedAt
      });
    mergeTerminalStateResolutionSource(resolution, item);
    terminalByDecisionId.set(decision.id, resolution);
  }

  for (const decision of model.latestDecisions) {
    if (!queueOutcomeDecisionClosesTerminalState(decision)) continue;
    if (terminalByDecisionId.has(decision.id)) continue;
    terminalByDecisionId.set(decision.id, createTerminalStateResolution({
      decision,
      bucket: queueOutcomeDecisionIsResolvedOutput(decision) ? doneBucket : terminalBucket,
      generatedAt
    }));
  }

  const terminal = Array.from(terminalByDecisionId.values())
    .sort((left, right) => left.decisionGeneratedAt - right.decisionGeneratedAt || left.decisionId.localeCompare(right.decisionId));
  const resolved = terminal.filter((resolution) => resolution.resolved);
  const terminalUnresolved = terminal.filter((resolution) => !resolution.resolved);
  const collapsed = terminal.filter((resolution) => resolution.sourceItemIds.length > 0);
  const failedWorkerOutput = active.filter(terminalStateItemIsFailedWorkerOutput);
  const collections = groupTerminalStateItemsByBucket([
    ...active,
    ...terminal.map(terminalStateItemFromResolution)
  ]);
  const byBucket = groupIds(Object.values(collections).flat(), (item) => item.bucket);

  return {
    kind: FRONTIER_SWARM_TERMINAL_STATE_RECONCILIATION_KIND,
    version: FRONTIER_SWARM_TERMINAL_STATE_RECONCILIATION_VERSION,
    id: input.id ?? 'swarm-terminal-state-reconciliation:' + stableHash([model.id, items, terminal, active, generatedAt]),
    generatedAt,
    outcomeModelId: model.id,
    items,
    active,
    failedWorkerOutput,
    resolved,
    terminal,
    terminalUnresolved,
    collapsed,
    collections,
    byBucket,
    latestDecisionIdByAlias: { ...model.latestDecisionIdByAlias },
    summary: {
      inputItemCount: items.length,
      decisionCount: model.summary.decisionCount,
      latestDecisionCount: model.summary.latestDecisionCount,
      supersededDecisionCount: model.summary.supersededDecisionCount,
      activeItemCount: active.length,
      collapsedItemCount: collapsed.reduce((total, resolution) => total + resolution.sourceItemIds.length, 0),
      resolvedCount: resolved.length,
      terminalCount: terminal.length,
      terminalUnresolvedCount: terminalUnresolved.length,
      failedWorkerOutputCount: failedWorkerOutput.length,
      visibleReviewDebtCount: model.summary.visibleReviewDebtCount,
      visibleHumanBlockedCount: model.summary.visibleHumanBlockedCount,
      visibleRerunCount: model.summary.visibleRerunCount,
      visibleConflictCount: model.summary.visibleConflictCount
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
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
  return rootScopeId === 'root' ? 'merge:root:*' : `merge:root:${rootScopeId}`;
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
  const publicContractRegions = semanticRegions.filter(mergeQueueRegionRequiresPublicContractDecision);
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
  if (publicContractRegions.length) reasons.push('public-contract-region');
  if (parentDecisionRegions.length) reasons.push('parent-scope-region');
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
    requiredLeaseScopeIds: [scope.id],
    requiredLeaseKeys: [scope.leaseKey],
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
    ...(slice.requiredLeaseScopeIds?.length ? { requiredLeaseScopeIds: [...slice.requiredLeaseScopeIds] } : {}),
    ...(slice.requiredLeaseKeys?.length ? { requiredLeaseKeys: [...slice.requiredLeaseKeys] } : {}),
    ...(slice.lane ? { lane: slice.lane } : {}),
    changedPaths: [...slice.changedPaths],
    changedRegions: [...slice.changedRegions],
    reasons: [...slice.reasons]
  }));
}

function createHierarchicalQueueLeaseRecords(input: {
  queueId: string;
  rootScopeId: string;
  generatedAt: number;
  scopes: readonly FrontierSwarmMergeQueueScope[];
  assignments: readonly FrontierSwarmMergeQueueAssignment[];
  promotions: readonly FrontierSwarmMergeQueuePromotion[];
  localLeader?: FrontierSwarmHierarchicalQueueLocalLeaderInput;
  localLeaders?: Readonly<Record<string, FrontierSwarmHierarchicalQueueLocalLeaderInput | undefined>>;
}): FrontierSwarmHierarchicalQueueLeaseRecord[] {
  return input.scopes.map((scope) => {
    const localAssignments = input.assignments.filter((assignment) => assignment.scopeId === scope.id);
    const receivedAssignments = input.assignments.filter((assignment) => assignment.promoteToScopeId === scope.id);
    const relevantAssignments = uniqueAssignmentsByJob([...localAssignments, ...receivedAssignments]);
    const promotionsFromScope = input.promotions.filter((promotion) => promotion.fromScopeId === scope.id);
    const promotionsToScope = input.promotions.filter((promotion) => promotion.toScopeId === scope.id);
    const relevantPromotions = [...promotionsFromScope, ...promotionsToScope];
    const terminalDecisionLinks = localAssignments
      .filter((assignment) => coordinatorAgentDrainActionIsTerminal(assignment.action))
      .map((assignment) => hierarchicalQueueTerminalDecisionLink(input.queueId, assignment));
    const activeAssignments = relevantAssignments.filter((assignment) => !coordinatorAgentDrainActionIsTerminal(assignment.action));
    const promotedAssignments = relevantAssignments.filter((assignment) => (
      relevantPromotions.some((promotion) => promotion.jobId === assignment.jobId)
    ));
    const conflictReasons = uniqueStrings(relevantAssignments.flatMap((assignment) => {
      const conflictReasonsForAssignment = assignment.reasons.filter(hierarchicalQueueReasonIsConflict);
      return assignment.conflictingJobIds.length
        ? ['conflicting-changes', ...conflictReasonsForAssignment]
        : conflictReasonsForAssignment;
    }));
    const retryReasons = uniqueStrings(relevantAssignments.flatMap((assignment) => {
      const retryReasonsForAssignment = assignment.reasons.filter(hierarchicalQueueReasonIsRetry);
      return assignment.action === 'rerun'
        ? ['rerun', ...retryReasonsForAssignment]
        : retryReasonsForAssignment;
    }));
    const promotionState = hierarchicalQueuePromotionStateForScope({
      scope,
      promotionsFromScope,
      promotionsToScope,
      terminalDecisionLinks,
      activeAssignments
    });

    return {
      id: hierarchicalQueueLeaseRecordId(input.queueId, scope),
      queueId: scope.id,
      scopeId: scope.id,
      scopeKind: scope.kind,
      scopeClass: hierarchicalQueueLeaseScopeClass(scope.kind),
      rootQueueId: input.rootScopeId,
      ...(scope.parentId ? { parentQueueId: scope.parentId } : {}),
      ...(scope.lane ? { lane: scope.lane } : {}),
      title: scope.title,
      leaseKey: scope.leaseKey,
      ...(hierarchicalQueueLocalLeaderForScope(input, scope) ? { localLeader: hierarchicalQueueLocalLeaderForScope(input, scope) } : {}),
      promotion: {
        state: promotionState,
        ...(promotionsFromScope[0]?.toScopeId ? { parentQueueId: promotionsFromScope[0].toScopeId } : scope.parentId ? { parentQueueId: scope.parentId } : {}),
        promotionIds: uniqueStrings(relevantPromotions.map((promotion) => hierarchicalQueuePromotionId(input.queueId, promotion))),
        promotedFromQueueIds: uniqueStrings(relevantPromotions.map((promotion) => promotion.fromScopeId)),
        promotedToQueueIds: uniqueStrings(relevantPromotions.map((promotion) => promotion.toScopeId)),
        promotedJobIds: uniqueStrings(promotedAssignments.map((assignment) => assignment.jobId)),
        promotedQueueItemIds: uniqueStrings(promotedAssignments.flatMap((assignment) => assignment.queueItemIds))
      },
      conflictReasons,
      retryReasons,
      reasons: uniqueStrings(relevantAssignments.flatMap((assignment) => assignment.reasons)),
      jobIds: uniqueStrings([...scope.jobIds, ...relevantAssignments.map((assignment) => assignment.jobId)]),
      queueItemIds: uniqueStrings(relevantAssignments.flatMap((assignment) => assignment.queueItemIds)),
      activeJobIds: uniqueStrings(activeAssignments.map((assignment) => assignment.jobId)),
      activeQueueItemIds: uniqueStrings(activeAssignments.flatMap((assignment) => assignment.queueItemIds)),
      terminalJobIds: uniqueStrings(terminalDecisionLinks.map((link) => link.jobId)),
      terminalQueueItemIds: uniqueStrings(terminalDecisionLinks.flatMap((link) => link.queueItemIds)),
      terminalDecisionIds: uniqueStrings(terminalDecisionLinks.map((link) => link.id)),
      terminalDecisionLinks,
      changedPaths: uniqueStrings([...scope.changedPaths, ...relevantAssignments.flatMap((assignment) => assignment.changedPaths)]),
      changedRegions: uniqueStrings([...scope.changedRegions, ...relevantAssignments.flatMap((assignment) => assignment.changedRegions)]),
      ...(scope.metadata ? { metadata: cloneJsonValue(scope.metadata) as JsonObject } : {})
    };
  });
}

function uniqueAssignmentsByJob(assignments: readonly FrontierSwarmMergeQueueAssignment[]): FrontierSwarmMergeQueueAssignment[] {
  const out = new Map<string, FrontierSwarmMergeQueueAssignment>();
  for (const assignment of assignments) out.set(assignment.jobId, assignment);
  return Array.from(out.values());
}

function hierarchicalQueueLeaseRecordId(queueId: string, scope: FrontierSwarmMergeQueueScope): string {
  return 'swarm-hierarchical-queue-lease-record:' + stableHash([queueId, scope.id, scope.kind, scope.leaseKey]);
}

function hierarchicalQueuePromotionId(queueId: string, promotion: FrontierSwarmMergeQueuePromotion): string {
  return 'swarm-hierarchical-queue-promotion:' + stableHash([queueId, promotion.jobId, promotion.fromScopeId, promotion.toScopeId, promotion.reasons]);
}

function hierarchicalQueueTerminalDecisionId(queueId: string, assignment: Pick<FrontierSwarmMergeQueueAssignment, 'jobId' | 'scopeId' | 'action' | 'queueItemIds'>): string {
  return 'swarm-hierarchical-queue-terminal-decision:' + stableHash([queueId, assignment.jobId, assignment.scopeId, assignment.action, assignment.queueItemIds]);
}

function hierarchicalQueueTerminalDecisionLink(
  queueId: string,
  assignment: FrontierSwarmMergeQueueAssignment
): FrontierSwarmHierarchicalQueueTerminalDecisionLink {
  return {
    id: assignment.terminalDecisionId ?? hierarchicalQueueTerminalDecisionId(queueId, assignment),
    jobId: assignment.jobId,
    ...(assignment.taskId ? { taskId: assignment.taskId } : {}),
    queueId: assignment.scopeId,
    queueItemIds: [...assignment.queueItemIds],
    action: assignment.action,
    decision: coordinatorAgentDrainDecisionForAction(assignment.action),
    reasons: [...assignment.reasons]
  };
}

function hierarchicalQueueLeaseScopeClass(kind: FrontierSwarmMergeQueueScopeKind): FrontierSwarmHierarchicalQueueLeaseScopeClass {
  if (kind === 'semantic-region' || kind === 'semantic') return 'semantic';
  if (kind === 'root' || kind === 'parent' || kind === 'child' || kind === 'lane' || kind === 'path') return kind;
  return 'custom';
}

function hierarchicalQueueLocalLeaderForScope(
  input: {
    queueId: string;
    generatedAt: number;
    localLeader?: FrontierSwarmHierarchicalQueueLocalLeaderInput;
    localLeaders?: Readonly<Record<string, FrontierSwarmHierarchicalQueueLocalLeaderInput | undefined>>;
  },
  scope: FrontierSwarmMergeQueueScope
): FrontierSwarmHierarchicalQueueLocalLeader | undefined {
  const leader = input.localLeaders?.[scope.id] ?? input.localLeaders?.[scope.leaseKey] ?? input.localLeader;
  if (!leader) return undefined;
  return {
    id: leader.id ?? 'swarm-hierarchical-queue-local-leader:' + stableHash([input.queueId, scope.id, leader.coordinatorId, leader.workerId, leader.role, input.generatedAt]),
    ...(leader.coordinatorId ? { coordinatorId: leader.coordinatorId } : {}),
    ...(leader.workerId ? { workerId: leader.workerId } : {}),
    ...(leader.role ? { role: leader.role } : {}),
    ...(leader.electedAt !== undefined ? { electedAt: leader.electedAt } : {}),
    ...(leader.leaseId ? { leaseId: leader.leaseId } : {}),
    ...(leader.leaseKey ? { leaseKey: leader.leaseKey } : {}),
    ...(toJsonObject(leader.metadata) ? { metadata: toJsonObject(leader.metadata) } : {})
  };
}

function hierarchicalQueuePromotionStateForScope(input: {
  scope: FrontierSwarmMergeQueueScope;
  promotionsFromScope: readonly FrontierSwarmMergeQueuePromotion[];
  promotionsToScope: readonly FrontierSwarmMergeQueuePromotion[];
  terminalDecisionLinks: readonly FrontierSwarmHierarchicalQueueTerminalDecisionLink[];
  activeAssignments: readonly FrontierSwarmMergeQueueAssignment[];
}): FrontierSwarmHierarchicalQueueLeasePromotionState {
  if (input.promotionsFromScope.length > 0) return 'promoted-to-parent';
  if (input.promotionsToScope.length > 0) return 'receiving-promoted';
  if (input.terminalDecisionLinks.length > 0 && input.activeAssignments.length === 0) return 'terminal';
  return 'local';
}

function hierarchicalQueueReasonIsConflict(reason: string): boolean {
  const normalized = reason.toLowerCase();
  return normalized.includes('conflict') || normalized.includes('cross-scope');
}

function hierarchicalQueueReasonIsRetry(reason: string): boolean {
  const normalized = reason.toLowerCase();
  return normalized.includes('retry') || normalized.includes('rerun') || normalized.includes('stale-against-head');
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
    return { action: 'promote', reasons: uniqueStrings(['parent-scope-region', ...reasons]) };
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
  const normalized = region.trim().toLowerCase();
  const tokens = mergeQueueRegionTokens(normalized);
  return tokens.includes('parent')
    || tokens.includes('shared')
    || tokens.includes('boundary')
    || tokens.includes('upstream')
    || mergeQueueRegionRequiresPublicContractDecision(normalized);
}

function mergeQueueRegionRequiresPublicContractDecision(region: string): boolean {
  const normalized = region.trim().toLowerCase();
  if (normalized.includes('public-contract')) return true;
  const tokens = mergeQueueRegionTokens(normalized);
  return tokens.includes('public') && tokens.includes('contract');
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
  if (kind === 'parent') return 1;
  if (kind === 'child') return 2;
  if (kind === 'lane') return 3;
  if (kind === 'semantic-region') return 4;
  if (kind === 'path') return 5;
  return 6;
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

function uniqueLeases(leases: readonly FrontierSwarmLease[], now: number): FrontierSwarmLease[] {
  const byJobId = new Map<string, FrontierSwarmLease>();
  for (const lease of leases) {
    if (lease.status !== 'active' || lease.expiresAt <= now) continue;
    const existing = byJobId.get(lease.jobId);
    if (!existing || lease.fencingToken > existing.fencingToken || lease.expiresAt > existing.expiresAt) {
      byJobId.set(lease.jobId, cloneJsonValue(lease) as FrontierSwarmLease);
    }
  }
  return Array.from(byJobId.values()).sort((left, right) => left.jobId.localeCompare(right.jobId));
}

function normalizeContinuousPoolItems(
  items: readonly (string | FrontierSwarmContinuousPoolWorkItemInput)[] | undefined,
  bucket: FrontierSwarmContinuousPoolBucket,
  source: string,
  generatedAt: number
): FrontierSwarmContinuousPoolWorkItem[] {
  return (items ?? []).map((item, index) => normalizeContinuousPoolItem(item, bucket, source, generatedAt, index));
}

function normalizeContinuousPoolItem(
  input: string | FrontierSwarmContinuousPoolWorkItemInput,
  bucket: FrontierSwarmContinuousPoolBucket,
  source: string,
  generatedAt: number,
  index: number
): FrontierSwarmContinuousPoolWorkItem {
  if (typeof input === 'string') {
    return {
      id: input,
      queueItemIds: [input],
      bucket,
      source,
      priorityClass: continuousPoolDefaultPriorityClass(bucket),
      reasons: []
    };
  }
  const queueItemIds = uniqueStrings([input.queueItemId, ...(input.queueItemIds ?? [])]);
  const id = input.id?.trim()
    || input.jobId?.trim()
    || input.taskId?.trim()
    || queueItemIds[0]
    || 'swarm-continuous-pool-item:' + stableHash([bucket, source, index, generatedAt]);
  const metadata = toJsonObject(input.metadata);
  return {
    id,
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.taskId ? { taskId: input.taskId } : {}),
    queueItemIds,
    ...(input.lane ? { lane: input.lane } : {}),
    bucket: input.bucket ?? bucket,
    source: input.source ?? source,
    ...(input.status ? { status: input.status } : {}),
    ...(typeof input.priority === 'number' && Number.isFinite(input.priority) ? { priority: input.priority } : {}),
    priorityClass: input.priorityClass ?? continuousPoolPriorityClassFromMetadata(metadata) ?? continuousPoolDefaultPriorityClass(bucket),
    reasons: uniqueStrings(input.reasons ?? []),
    ...(metadata ? { metadata } : {})
  };
}

function continuousPoolItemFromLease(lease: FrontierSwarmLease, index: number): FrontierSwarmContinuousPoolWorkItem {
  return {
    id: lease.id,
    jobId: lease.jobId,
    queueItemIds: [lease.jobId],
    bucket: 'active',
    source: 'active-lease',
    status: lease.status,
    priorityClass: 'standard',
    reasons: [],
    metadata: toJsonObject({
      workerId: lease.workerId,
      leasedAt: lease.leasedAt,
      expiresAt: lease.expiresAt,
      fencingToken: lease.fencingToken,
      index
    })
  };
}

function continuousPoolItemFromQueueJob(
  job: FrontierSwarmQueueJob,
  bucket: FrontierSwarmContinuousPoolBucket,
  source: string,
  index: number
): FrontierSwarmContinuousPoolWorkItem {
  return normalizeContinuousPoolItem({
    id: job.jobId,
    jobId: job.jobId,
    taskId: job.taskId,
    queueItemIds: [job.taskId ?? job.jobId],
    lane: job.lane,
    status: job.status,
    priority: job.priority,
    priorityClass: continuousPoolPriorityClassFromMetadata(job.metadata) ?? continuousPoolDefaultPriorityClass(bucket),
    reasons: job.lastError ? [job.lastError] : [],
    metadata: {
      source,
      attempts: job.attempts,
      maxAttempts: job.maxAttempts,
      availableAt: job.availableAt,
      index,
      ...(job.metadata ?? {})
    }
  }, bucket, source, 0, index);
}

function continuousPoolItemFromScheduledJob(
  job: FrontierSwarmScheduledJob | FrontierSwarmRunningJob,
  bucket: FrontierSwarmContinuousPoolBucket,
  source: string,
  index: number
): FrontierSwarmContinuousPoolWorkItem {
  const scheduled = job as FrontierSwarmScheduledJob;
  return normalizeContinuousPoolItem({
    id: job.jobId,
    jobId: job.jobId,
    taskId: 'taskId' in job ? job.taskId : undefined,
    queueItemIds: ['taskId' in job ? job.taskId : job.jobId],
    lane: job.lane,
    status: source,
    priority: 'priority' in job ? job.priority : undefined,
    priorityClass: continuousPoolPriorityClassFromMetadata(job.metadata) ?? continuousPoolDefaultPriorityClass(bucket),
    reasons: 'dependsOn' in scheduled && scheduled.dependsOn.length ? [`depends-on:${scheduled.dependsOn.join(',')}`] : [],
    metadata: {
      compute: job.compute,
      concurrencyKey: job.concurrencyKey,
      index,
      ...(job.metadata ?? {})
    }
  }, bucket, source, 0, index);
}

function continuousPoolItemFromBlockedJob(
  job: FrontierSwarmBlockedJob,
  bucket: FrontierSwarmContinuousPoolBucket,
  source: string,
  index: number
): FrontierSwarmContinuousPoolWorkItem {
  return normalizeContinuousPoolItem({
    id: job.jobId,
    jobId: job.jobId,
    taskId: job.taskId,
    queueItemIds: [job.taskId],
    lane: job.lane,
    status: 'blocked',
    priority: job.priority,
    priorityClass: continuousPoolPriorityClassFromMetadata(job.metadata) ?? continuousPoolDefaultPriorityClass(bucket),
    reasons: [...job.reasons],
    metadata: {
      compute: job.compute,
      concurrencyKey: job.concurrencyKey,
      waitingFor: job.waitingFor,
      index,
      ...(job.metadata ?? {})
    }
  }, bucket, source, 0, index);
}

function continuousPoolItemFromDrainAssignment(
  assignment: FrontierSwarmCoordinatorAgentDrainAssignment,
  bucket: FrontierSwarmContinuousPoolBucket,
  source: string,
  index: number
): FrontierSwarmContinuousPoolWorkItem {
  return normalizeContinuousPoolItem({
    id: assignment.id,
    jobId: assignment.jobId,
    taskId: assignment.taskId,
    queueItemIds: assignment.queueItemIds,
    lane: assignment.lane,
    status: assignment.decision,
    priorityClass: 'coordinator-drain',
    reasons: assignment.reasons,
    metadata: {
      assignedAction: assignment.assignedAction,
      queueId: assignment.queueId,
      leaseScope: assignment.leaseScope,
      index
    }
  }, bucket, source, 0, index);
}

function continuousPoolItemFromPromotedWork(
  work: FrontierSwarmCoordinatorAgentPromotedWork,
  bucket: FrontierSwarmContinuousPoolBucket,
  source: string,
  index: number
): FrontierSwarmContinuousPoolWorkItem {
  return normalizeContinuousPoolItem({
    id: work.id,
    jobId: work.jobId,
    taskId: work.taskId,
    queueItemIds: work.queueItemIds,
    lane: work.lane,
    status: work.decision,
    priorityClass: 'coordinator-drain',
    reasons: work.reasons,
    metadata: {
      assignedAction: work.assignedAction,
      fromQueueId: work.fromQueueId,
      parentQueueId: work.parentQueueId,
      leaseScope: work.leaseScope,
      index
    }
  }, bucket, source, 0, index);
}

function continuousPoolItemFromOutcomeDecision(
  decision: FrontierSwarmQueueOutcomeDecision,
  bucket: FrontierSwarmContinuousPoolBucket,
  source: string,
  index: number
): FrontierSwarmContinuousPoolWorkItem {
  return normalizeContinuousPoolItem({
    id: decision.id,
    jobId: decision.jobId,
    taskId: decision.taskId,
    queueItemIds: decision.queueItemIds,
    lane: decision.lane,
    status: decision.outcome,
    priorityClass: continuousPoolDefaultPriorityClass(bucket),
    reasons: decision.reasons,
    metadata: {
      category: decision.category,
      decision: decision.decision,
      action: decision.action,
      assignedAction: decision.assignedAction,
      subjectId: decision.subjectId,
      subjectAliases: decision.subjectAliases,
      generatedAt: decision.generatedAt,
      index
    }
  }, bucket, source, 0, index);
}

function continuousPoolItemFromTerminalResolution(
  resolution: FrontierSwarmTerminalStateResolution,
  bucket: FrontierSwarmContinuousPoolBucket,
  source: string,
  index: number
): FrontierSwarmContinuousPoolWorkItem {
  return normalizeContinuousPoolItem({
    id: resolution.id,
    jobId: resolution.jobId,
    taskId: resolution.taskId,
    queueItemIds: resolution.queueItemIds,
    status: resolution.decisionOutcome,
    priorityClass: continuousPoolDefaultPriorityClass(bucket),
    reasons: resolution.reasons,
    metadata: {
      decisionId: resolution.decisionId,
      decisionCategory: resolution.decisionCategory,
      decisionTerminal: resolution.decisionTerminal,
      resolved: resolution.resolved,
      sourceBuckets: resolution.sourceBuckets,
      index
    }
  }, bucket, source, 0, index);
}

function dedupeContinuousPoolItems(items: readonly FrontierSwarmContinuousPoolWorkItem[]): FrontierSwarmContinuousPoolWorkItem[] {
  const byKey = new Map<string, FrontierSwarmContinuousPoolWorkItem>();
  for (const item of items) {
    const key = continuousPoolItemDedupeKey(item);
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, item);
      continue;
    }
    byKey.set(key, {
      ...existing,
      queueItemIds: uniqueStrings([...existing.queueItemIds, ...item.queueItemIds]),
      reasons: uniqueStrings([...existing.reasons, ...item.reasons]),
      metadata: toJsonObject({
        ...(existing.metadata ?? {}),
        alternateSources: uniqueStrings([
          ...((existing.metadata?.alternateSources as string[] | undefined) ?? []),
          item.source
        ])
      })
    });
  }
  return Array.from(byKey.values()).sort((left, right) => (
    (left.priority ?? 0) - (right.priority ?? 0)
    || left.id.localeCompare(right.id)
  ));
}

function continuousPoolItemDedupeKey(item: FrontierSwarmContinuousPoolWorkItem): string {
  return [
    item.bucket,
    item.jobId ?? item.taskId ?? item.queueItemIds[0] ?? item.id
  ].join(':');
}

function continuousPoolQueueStatusIsActive(status: FrontierSwarmQueueJobStatus): boolean {
  return status === 'leased' || status === 'running';
}

function continuousPoolQueueStatusIsQueued(status: FrontierSwarmQueueJobStatus): boolean {
  return status === 'ready'
    || status === 'queued'
    || status === 'retrying'
    || status === 'scheduled'
    || status === 'planned'
    || status === 'open';
}

function continuousPoolQueueStatusIsHumanBlocked(status: FrontierSwarmQueueJobStatus): boolean {
  return status === 'blocked' || status === 'failed' || status === 'dead-letter';
}

function continuousPoolQueueStatusIsDone(status: FrontierSwarmQueueJobStatus): boolean {
  return status === 'completed' || status === 'verified' || status === 'done';
}

function continuousPoolBlockedJobIsCapacityBlocked(job: FrontierSwarmBlockedJob): boolean {
  return job.reasons.some((reason) => (
    reason === 'lane-capacity'
    || reason === 'compute-capacity'
    || reason === 'concurrency-key-capacity'
    || reason === 'ready-capacity'
    || reason.startsWith('resource-capacity:')
  ));
}

function continuousPoolDecisionIsDone(decision: FrontierSwarmQueueOutcomeDecision): boolean {
  return decision.category === 'terminal'
    && !decision.coordinatorReview
    && !decision.humanBlocked
    && !decision.staleOrRerun
    && !decision.conflict;
}

function continuousPoolDefaultPriorityClass(bucket: FrontierSwarmContinuousPoolBucket): FrontierSwarmPriorityClass {
  if (bucket === 'review-drain' || bucket === 'rerun') return 'coordinator-drain';
  if (bucket === 'human-blocked' || bucket === 'conflicted' || bucket === 'capacity-blocked') return 'review';
  return 'standard';
}

function continuousPoolPriorityClassFromMetadata(metadata: JsonObject | undefined): FrontierSwarmPriorityClass | undefined {
  const direct = metadata?.priorityClass;
  if (typeof direct === 'string' && direct.trim()) return direct;
  const priorityPolicy = metadata?.priorityPolicy;
  if (priorityPolicy && typeof priorityPolicy === 'object' && !Array.isArray(priorityPolicy)) {
    const policyClass = (priorityPolicy as JsonObject).className;
    if (typeof policyClass === 'string' && policyClass.trim()) return policyClass;
  }
  return undefined;
}

function createContinuousPoolRefill(input: {
  buckets: FrontierSwarmContinuousPoolState['buckets'];
  maxWorkers?: number;
  generatedAt: number;
}): {
  slots: FrontierSwarmContinuousPoolRefillSlot[];
  recommendations: FrontierSwarmContinuousPoolRefillRecommendation[];
} {
  const slotCount = input.maxWorkers === undefined
    ? 0
    : Math.max(0, input.maxWorkers - input.buckets.active.length);
  const candidates = [
    ...input.buckets.reviewDrain.map((item) => continuousPoolRefillCandidate(item, 'drain-review', 0, 'review-drain')),
    ...input.buckets.rerun.map((item) => continuousPoolRefillCandidate(item, 'rerun-stale', 5, 'rerun')),
    ...[...input.buckets.queued].sort(compareContinuousPoolQueuedItems).map((item) => (
      continuousPoolRefillCandidate(
        item,
        item.priorityClass === 'speculative' ? 'start-speculative-backlog' : 'lease-queued',
        item.priorityClass === 'speculative' ? 90 : 20,
        'queued'
      )
    ))
  ];
  const slots: FrontierSwarmContinuousPoolRefillSlot[] = [];
  const recommendations: FrontierSwarmContinuousPoolRefillRecommendation[] = [];
  for (let index = 0; index < slotCount; index += 1) {
    const candidate = candidates[index];
    const slotId = 'swarm-continuous-pool-refill-slot:' + stableHash([index, input.maxWorkers, input.generatedAt]);
    if (!candidate) {
      slots.push({ id: slotId, index, state: 'idle' });
      continue;
    }
    const recommendationId = 'swarm-continuous-pool-refill-recommendation:' + stableHash([slotId, candidate.item.id, candidate.action, input.generatedAt]);
    slots.push({ id: slotId, index, state: 'fillable', recommendationId });
    recommendations.push({
      id: recommendationId,
      slotId,
      action: candidate.action,
      bucket: candidate.bucket,
      itemIds: [candidate.item.id],
      jobIds: uniqueStrings([candidate.item.jobId]),
      priority: candidate.priority,
      priorityClass: candidate.item.priorityClass,
      reasons: candidate.reasons
    });
  }
  return {
    slots,
    recommendations: recommendations.sort((left, right) => left.priority - right.priority || left.id.localeCompare(right.id))
  };
}

function continuousPoolRefillCandidate(
  item: FrontierSwarmContinuousPoolWorkItem,
  action: FrontierSwarmContinuousPoolRefillAction,
  priority: number,
  bucket: FrontierSwarmContinuousPoolBucket
): {
  item: FrontierSwarmContinuousPoolWorkItem;
  action: FrontierSwarmContinuousPoolRefillAction;
  priority: number;
  bucket: FrontierSwarmContinuousPoolBucket;
  reasons: string[];
} {
  const reasons = item.reasons.length
    ? [...item.reasons]
    : bucket === 'review-drain'
      ? ['coordinator-drain-before-new-backlog']
      : bucket === 'rerun'
        ? ['rerun-before-new-backlog']
        : item.priorityClass === 'speculative'
          ? ['speculative-backlog-after-drain']
          : ['ready-queued-work'];
  return { item, action, priority, bucket, reasons };
}

function compareContinuousPoolQueuedItems(
  left: FrontierSwarmContinuousPoolWorkItem,
  right: FrontierSwarmContinuousPoolWorkItem
): number {
  const leftSpeculative = left.priorityClass === 'speculative' ? 1 : 0;
  const rightSpeculative = right.priorityClass === 'speculative' ? 1 : 0;
  return leftSpeculative - rightSpeculative
    || (left.priority ?? 0) - (right.priority ?? 0)
    || left.id.localeCompare(right.id);
}

function continuousPoolStopConditions(input: {
  buckets: FrontierSwarmContinuousPoolState['buckets'];
  maxWorkers?: number;
}): FrontierSwarmContinuousPoolStopCondition[] {
  const progressableCount = input.buckets.active.length + input.buckets.queued.length + input.buckets.reviewDrain.length + input.buckets.rerun.length;
  const refillableCount = input.buckets.queued.length + input.buckets.reviewDrain.length + input.buckets.rerun.length;
  if (input.buckets.active.length === 0 && input.maxWorkers === 0 && refillableCount > 0) return ['capacity-blocked'];
  if (progressableCount > 0) return [];
  const stops: FrontierSwarmContinuousPoolStopCondition[] = [];
  if (input.buckets.humanBlocked.length > 0) stops.push('human-blocked');
  if (input.buckets.conflicted.length > 0) stops.push('conflicted');
  if (input.buckets.capacityBlocked.length > 0) stops.push('capacity-blocked');
  if (stops.length === 0) stops.push('drained');
  return uniqueStrings(stops);
}

function continuousPoolPhase(buckets: FrontierSwarmContinuousPoolState['buckets']): FrontierSwarmContinuousPoolPhase {
  if (buckets.active.length > 0) return 'active';
  if (buckets.reviewDrain.length > 0) return 'review-drain';
  if (buckets.rerun.length > 0) return 'rerun';
  if (buckets.queued.length > 0) return 'queued';
  if (buckets.humanBlocked.length > 0) return 'human-blocked';
  if (buckets.conflicted.length > 0) return 'conflicted';
  if (buckets.capacityBlocked.length > 0) return 'capacity-blocked';
  return 'done';
}

function continuousPoolByBucket(buckets: FrontierSwarmContinuousPoolState['buckets']): Record<string, string[]> {
  return {
    active: buckets.active.map((item) => item.id),
    queued: buckets.queued.map((item) => item.id),
    'review-drain': buckets.reviewDrain.map((item) => item.id),
    rerun: buckets.rerun.map((item) => item.id),
    'human-blocked': buckets.humanBlocked.map((item) => item.id),
    conflicted: buckets.conflicted.map((item) => item.id),
    'capacity-blocked': buckets.capacityBlocked.map((item) => item.id),
    done: buckets.done.map((item) => item.id)
  };
}

function queueOutcomeSearch(input: FrontierSwarmQueueOutcomeDecisionInput): string {
  return [
    input.category,
    input.outcome,
    input.action,
    input.assignedAction,
    input.decision,
    input.disposition,
    input.mergeReadiness,
    input.status,
    ...(input.reasons ?? [])
  ].filter(Boolean).join(' ').toLowerCase();
}

function queueOutcomeHas(search: string, ...phrases: readonly string[]): boolean {
  const normalized = search.replace(/[^a-z0-9]+/gu, '-');
  return phrases.some((phrase) => {
    const lower = phrase.toLowerCase();
    return search.includes(lower) || normalized.includes(lower.replace(/[^a-z0-9]+/gu, '-'));
  });
}

function defaultQueueOutcomeForCategory(
  category: FrontierSwarmQueueOutcomeCategory,
  input: FrontierSwarmQueueOutcomeDecisionInput,
  search: string
): FrontierSwarmQueueOutcome {
  const action = input.assignedAction ?? input.action;
  if (category === 'terminal') {
    if (queueOutcomeHas(search, 'committed')) return 'committed';
    if (action === 'apply-local' || input.decision === 'applied' || queueOutcomeHas(search, 'applied')) return 'applied';
    if (input.decision === 'superseded' || queueOutcomeHas(search, 'superseded')) return 'superseded';
    if (action === 'reject' || input.decision === 'rejected' || input.disposition === 'rejected' || queueOutcomeHas(search, 'rejected')) return 'rejected';
    if (action === 'record-only' || input.decision === 'recorded' || input.mergeReadiness === 'discovery-only' || queueOutcomeHas(search, 'recorded')) return 'recorded';
    return 'closed';
  }
  if (category === 'stale-rerun') return queueOutcomeHas(search, 'stale') ? 'stale-rerun' : 'rerun';
  if (category === 'human-blocked') return 'human-blocked';
  if (category === 'conflict') return 'conflict';
  if (category === 'coordinator-review') {
    if (input.decision === 'escalated' || action === 'promote') return 'escalated';
    if (input.disposition === 'needs-port' || queueOutcomeHas(search, 'needs-port', 'needs-human-port')) return 'needs-port';
    return 'coordinator-review';
  }
  if (category === 'continuation') {
    if (input.decision === 'queued' || action === 'queue-local' || input.status === 'queued') return 'queued';
    if (input.status === 'ready') return 'ready';
    if (input.status === 'running') return 'running';
    if (input.status === 'leased') return 'leased';
    return 'continued';
  }
  return category;
}

function queueOutcomeInputsFromMergeQueue(queue: FrontierSwarmHierarchicalMergeQueue): FrontierSwarmQueueOutcomeDecisionInput[] {
  return queue.assignments.map((assignment) => ({
    subjectAliases: uniqueStrings([assignment.taskId, assignment.jobId, ...assignment.queueItemIds]),
    jobId: assignment.jobId,
    ...(assignment.taskId ? { taskId: assignment.taskId } : {}),
    queueItemIds: [...assignment.queueItemIds],
    queueId: assignment.scopeId,
    ...(assignment.lane ? { lane: assignment.lane } : {}),
    action: assignment.action,
    decision: coordinatorAgentDrainDecisionForAction(assignment.action),
    terminal: coordinatorAgentDrainActionIsTerminal(assignment.action),
    reasons: [...assignment.reasons],
    disposition: assignment.disposition,
    mergeReadiness: assignment.mergeReadiness,
    conflictingJobIds: [...assignment.conflictingJobIds],
    generatedAt: queue.generatedAt,
    metadata: {
      source: 'hierarchical-merge-queue',
      queueId: queue.id,
      mergeIndexId: queue.mergeIndexId,
      ...(assignment.terminalDecisionId ? { terminalDecisionId: assignment.terminalDecisionId } : {})
    }
  }));
}

function queueOutcomeInputsFromDrainWork(work: FrontierSwarmCoordinatorAgentDrainWork): FrontierSwarmQueueOutcomeDecisionInput[] {
  return work.assignments.map((assignment) => ({
    subjectAliases: uniqueStrings([assignment.taskId, assignment.jobId, ...assignment.queueItemIds]),
    jobId: assignment.jobId,
    ...(assignment.taskId ? { taskId: assignment.taskId } : {}),
    queueItemIds: [...assignment.queueItemIds],
    queueId: assignment.queueId,
    ...(assignment.lane ? { lane: assignment.lane } : {}),
    action: assignment.assignedAction,
    assignedAction: assignment.assignedAction,
    decision: assignment.decision,
    terminal: assignment.terminal,
    reasons: [...assignment.reasons],
    disposition: assignment.disposition,
    mergeReadiness: assignment.mergeReadiness,
    conflictingJobIds: [...assignment.conflictingJobIds],
    generatedAt: work.generatedAt,
    metadata: {
      source: 'coordinator-agent-drain-work',
      drainWorkId: work.id,
      queueId: work.queueId,
      mergeIndexId: work.mergeIndexId,
      ...(assignment.terminalDecisionId ? { terminalDecisionId: assignment.terminalDecisionId } : {})
    }
  }));
}

function preferredQueueOutcomeSubjectId(
  decisions: readonly FrontierSwarmQueueOutcomeDecision[],
  aliases: readonly string[]
): string {
  const queueItemIds = uniqueStrings(decisions.flatMap((decision) => decision.queueItemIds)).sort();
  if (queueItemIds[0]) return queueItemIds[0];
  const taskIds = uniqueStrings(decisions.map((decision) => decision.taskId)).sort();
  if (taskIds[0]) return taskIds[0];
  const jobIds = uniqueStrings(decisions.map((decision) => decision.jobId)).sort();
  if (jobIds[0]) return jobIds[0];
  return aliases[0] ?? 'unknown-subject';
}

function queueOutcomeRecordIsLater(
  candidate: { index: number; decision: FrontierSwarmQueueOutcomeDecision },
  latest: { index: number; decision: FrontierSwarmQueueOutcomeDecision }
): boolean {
  return candidate.decision.generatedAt > latest.decision.generatedAt
    || candidate.decision.generatedAt === latest.decision.generatedAt && candidate.index > latest.index;
}

function groupDecisionIdsBy(
  decisions: readonly FrontierSwarmQueueOutcomeDecision[],
  key: (decision: FrontierSwarmQueueOutcomeDecision) => string
): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const decision of decisions) {
    const group = key(decision);
    out[group] = [...(out[group] ?? []), decision.id];
  }
  for (const ids of Object.values(out)) ids.sort();
  return out;
}

function normalizeTerminalStateCollections(
  collections: FrontierSwarmTerminalStateCollectionsInput | undefined,
  generatedAt: number
): FrontierSwarmTerminalStateItem[] {
  if (!collections) return [];
  const entries: FrontierSwarmTerminalStateCollectionInput[] = Array.isArray(collections)
    ? collections
    : Object.entries(collections).map(([bucket, items]) => ({ bucket, items }));
  return entries.flatMap((entry, entryIndex) => entry.items.map((item, itemIndex) => (
    normalizeTerminalStateItem(item, entry.bucket, generatedAt, entryIndex, itemIndex)
  )));
}

function normalizeTerminalStateItem(
  input: string | FrontierSwarmTerminalStateItemInput,
  bucket: FrontierSwarmTerminalStateBucket,
  generatedAt: number,
  entryIndex: number,
  itemIndex: number
): FrontierSwarmTerminalStateItem {
  if (typeof input === 'string') {
    const subjectId = normalizeId(input, 'terminal state subject');
    return {
      id: 'swarm-terminal-state-item:' + stableHash([bucket, subjectId, entryIndex, itemIndex, generatedAt]),
      subjectId,
      subjectAliases: [subjectId],
      queueItemIds: [],
      bucket,
      generatedAt
    };
  }
  const queueItemIds = uniqueStrings([input.queueItemId, ...(input.queueItemIds ?? [])]);
  const subjectId = input.subjectId?.trim()
    || queueItemIds[0]
    || input.taskId?.trim()
    || input.jobId?.trim()
    || input.id?.trim()
    || 'unknown-subject';
  const subjectAliases = uniqueStrings([
    input.subjectId,
    ...(input.subjectAliases ?? []),
    ...queueItemIds,
    input.taskId,
    input.jobId,
    input.id
  ]);
  const normalizedBucket = input.bucket ?? bucket;
  return {
    id: input.id ?? 'swarm-terminal-state-item:' + stableHash([normalizedBucket, subjectId, subjectAliases, entryIndex, itemIndex, generatedAt]),
    subjectId,
    subjectAliases: subjectAliases.length ? subjectAliases : [subjectId],
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.taskId ? { taskId: input.taskId } : {}),
    queueItemIds,
    bucket: normalizedBucket,
    ...(input.status ? { status: input.status } : {}),
    generatedAt: input.generatedAt ?? generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function latestTerminalStateDecisionForItem(
  item: FrontierSwarmTerminalStateItem,
  model: FrontierSwarmQueueOutcomeModel,
  latestDecisionById: ReadonlyMap<string, FrontierSwarmQueueOutcomeDecision>
): FrontierSwarmQueueOutcomeDecision | undefined {
  let latest: FrontierSwarmQueueOutcomeDecision | undefined;
  const seen = new Set<string>();
  for (const alias of item.subjectAliases) {
    const decisionId = model.latestDecisionIdByAlias[alias];
    if (!decisionId || seen.has(decisionId)) continue;
    seen.add(decisionId);
    const decision = latestDecisionById.get(decisionId);
    if (!decision) continue;
    if (!latest || decision.generatedAt > latest.generatedAt || decision.generatedAt === latest.generatedAt && decision.id > latest.id) {
      latest = decision;
    }
  }
  return latest;
}

function queueOutcomeDecisionClosesTerminalState(decision: FrontierSwarmQueueOutcomeDecision): boolean {
  if (decision.terminal || decision.closesSubject) return true;
  if (decision.category === 'terminal' || decision.category === 'stale-rerun' || decision.category === 'human-blocked' || decision.category === 'conflict') {
    return true;
  }
  const search = queueOutcomeSearch(decision);
  return queueOutcomeHas(search, 'applied', 'committed', 'superseded', 'rejected', 'rerun', 'stale-against-head', 'conflict', 'human-question');
}

function queueOutcomeDecisionIsResolvedOutput(decision: FrontierSwarmQueueOutcomeDecision): boolean {
  if (decision.category !== 'terminal') return false;
  return decision.outcome === 'applied'
    || decision.outcome === 'committed'
    || decision.outcome === 'superseded'
    || decision.outcome === 'recorded'
    || decision.outcome === 'closed';
}

function createTerminalStateResolution(input: {
  decision: FrontierSwarmQueueOutcomeDecision;
  bucket: FrontierSwarmTerminalStateBucket;
  item?: FrontierSwarmTerminalStateItem;
  generatedAt: number;
}): FrontierSwarmTerminalStateResolution {
  const subjectAliases = uniqueStrings([
    ...(input.item?.subjectAliases ?? []),
    ...input.decision.subjectAliases
  ]);
  const queueItemIds = uniqueStrings([
    ...(input.item?.queueItemIds ?? []),
    ...input.decision.queueItemIds
  ]);
  const resolved = queueOutcomeDecisionIsResolvedOutput(input.decision);
  return {
    id: 'swarm-terminal-state-resolution:' + stableHash([input.decision.id, input.bucket, subjectAliases, input.generatedAt]),
    subjectId: input.decision.subjectId,
    subjectAliases: subjectAliases.length ? subjectAliases : [input.decision.subjectId],
    ...(input.decision.jobId ?? input.item?.jobId ? { jobId: input.decision.jobId ?? input.item?.jobId } : {}),
    ...(input.decision.taskId ?? input.item?.taskId ? { taskId: input.decision.taskId ?? input.item?.taskId } : {}),
    queueItemIds,
    bucket: input.bucket,
    sourceItemIds: [],
    sourceBuckets: [],
    decisionId: input.decision.id,
    decisionCategory: input.decision.category,
    decisionOutcome: input.decision.outcome,
    decisionTerminal: input.decision.terminal,
    decisionGeneratedAt: input.decision.generatedAt,
    resolved,
    terminal: true,
    failedWorkerOutput: false,
    reasons: [...input.decision.reasons],
    metadata: toJsonObject({
      decision: input.decision.decision,
      status: input.decision.status,
      disposition: input.decision.disposition,
      mergeReadiness: input.decision.mergeReadiness
    })
  };
}

function mergeTerminalStateResolutionSource(
  resolution: FrontierSwarmTerminalStateResolution,
  item: FrontierSwarmTerminalStateItem
): void {
  resolution.sourceItemIds = uniqueStrings([...resolution.sourceItemIds, item.id]);
  resolution.sourceBuckets = uniqueStrings([...resolution.sourceBuckets, item.bucket]);
  resolution.subjectAliases = uniqueStrings([...resolution.subjectAliases, ...item.subjectAliases]);
  resolution.queueItemIds = uniqueStrings([...resolution.queueItemIds, ...item.queueItemIds]);
  if (!resolution.jobId && item.jobId) resolution.jobId = item.jobId;
  if (!resolution.taskId && item.taskId) resolution.taskId = item.taskId;
}

function terminalStateItemFromResolution(resolution: FrontierSwarmTerminalStateResolution): FrontierSwarmTerminalStateItem {
  return {
    id: 'swarm-terminal-state-item:' + stableHash([resolution.id, resolution.bucket]),
    subjectId: resolution.subjectId,
    subjectAliases: [...resolution.subjectAliases],
    ...(resolution.jobId ? { jobId: resolution.jobId } : {}),
    ...(resolution.taskId ? { taskId: resolution.taskId } : {}),
    queueItemIds: [...resolution.queueItemIds],
    bucket: resolution.bucket,
    status: resolution.resolved ? 'resolved' : 'terminal',
    generatedAt: resolution.decisionGeneratedAt,
    metadata: toJsonObject({
      decisionId: resolution.decisionId,
      decisionCategory: resolution.decisionCategory,
      decisionOutcome: resolution.decisionOutcome,
      sourceItemIds: resolution.sourceItemIds,
      sourceBuckets: resolution.sourceBuckets,
      resolved: resolution.resolved,
      terminal: resolution.terminal,
      failedWorkerOutput: resolution.failedWorkerOutput
    })
  };
}

function terminalStateItemIsFailedWorkerOutput(item: FrontierSwarmTerminalStateItem): boolean {
  const normalized = `${item.bucket} ${item.status ?? ''}`.toLowerCase().replace(/[^a-z0-9]+/gu, '-');
  return normalized.includes('failed') || normalized.includes('dead-letter');
}

function groupTerminalStateItemsByBucket(items: readonly FrontierSwarmTerminalStateItem[]): Record<string, FrontierSwarmTerminalStateItem[]> {
  const out: Record<string, FrontierSwarmTerminalStateItem[]> = {};
  for (const item of items) out[item.bucket] = [...(out[item.bucket] ?? []), item];
  for (const bucket of Object.keys(out)) {
    out[bucket] = [...(out[bucket] ?? [])].sort((left, right) => (
      left.generatedAt - right.generatedAt || left.id.localeCompare(right.id)
    ));
  }
  return out;
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

export function mergeSwarmMetadata(
  metadataInputs: readonly unknown[] = [],
  verificationGates: readonly (string | FrontierSwarmCommandInput)[] = []
): JsonObject | undefined {
  const merged: Record<string, unknown> = {};
  const gates: FrontierSwarmCommand[] = [];
  for (const metadataInput of metadataInputs) {
    const metadata = toJsonObject(metadataInput);
    if (!metadata) continue;
    for (const [key, value] of Object.entries(metadata)) {
      if (key === 'verificationGates') {
        if (Array.isArray(value)) gates.push(...normalizeCommands(value as readonly (string | FrontierSwarmCommandInput)[]));
        continue;
      }
      merged[key] = value;
    }
  }
  gates.push(...normalizeCommands(verificationGates));
  if (gates.length > 0) merged.verificationGates = uniqueSwarmCommands(gates);
  return Object.keys(merged).length > 0 ? merged as JsonObject : undefined;
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

function routerComputes(input: FrontierSwarmModelRouterInput): FrontierSwarmCompute[] {
  const manifest = input.manifest ? compileSwarm(input.manifest).manifest : undefined;
  const byId = new Map((manifest?.compute ?? []).map((compute) => [compute.id, compute]));
  const source = input.candidates && input.candidates.length > 0
    ? input.candidates
    : manifest?.compute && manifest.compute.length > 0
      ? manifest.compute
      : undefined;
  const computes = source
    ? source.map((entry) => {
      if (typeof entry === 'string') {
        return byId.get(entry) ?? normalizeComputeList([{ id: entry }])[0];
      }
      return normalizeComputeList([entry as FrontierSwarmComputeInput])[0];
    })
    : normalizeComputeList(undefined);
  const unique = new Map<string, FrontierSwarmCompute>();
  for (const compute of computes) unique.set(compute.id, compute);
  return Array.from(unique.values());
}

function normalizeModelTokenEstimate(
  input: FrontierSwarmModelTokenEstimateInput | undefined,
  task?: FrontierSwarmTask
): FrontierSwarmModelTokenEstimate {
  const inputCap = task?.budget?.maxInputTokens;
  const outputCap = task?.budget?.maxOutputTokens;
  const inputTokens = Math.max(0, Math.floor(readNonNegativeNumber(input?.inputTokens) ?? Math.min(inputCap ?? 24000, 24000)));
  const outputTokens = Math.max(0, Math.floor(readNonNegativeNumber(input?.outputTokens) ?? Math.min(outputCap ?? 6000, 6000)));
  const cachedInputTokens = Math.min(inputTokens, Math.max(0, Math.floor(readNonNegativeNumber(input?.cachedInputTokens) ?? 0)));
  return {
    inputTokens,
    cachedInputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    ...(toJsonObject(input?.metadata) ? { metadata: toJsonObject(input?.metadata) } : {})
  };
}

function normalizeModelPriceCatalog(input: FrontierSwarmModelRouterInput['priceCatalog']): FrontierSwarmModelPrice[] {
  if (!input) return [];
  const entries = Array.isArray(input)
    ? input.map((price) => [price.id, price] as const)
    : Object.entries(input);
  return entries
    .map(([key, price]) => normalizeModelPrice(price, key))
    .filter((price): price is FrontierSwarmModelPrice => !!price);
}

function normalizeModelPrice(input: unknown, fallbackId?: string): FrontierSwarmModelPrice | undefined {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return undefined;
  const record = input as FrontierSwarmModelPriceInput;
  const inputUsdPerUnit = readNonNegativeNumber(record.inputUsdPerUnit);
  const cachedInputUsdPerUnit = readNonNegativeNumber(record.cachedInputUsdPerUnit);
  const outputUsdPerUnit = readNonNegativeNumber(record.outputUsdPerUnit);
  const latencyMs = readNonNegativeNumber(record.latencyMs);
  if (inputUsdPerUnit === undefined && cachedInputUsdPerUnit === undefined && outputUsdPerUnit === undefined && latencyMs === undefined) return undefined;
  const id = record.id ?? record.compute ?? record.model ?? fallbackId ?? 'model-price';
  const unitTokens = Math.max(1, Math.floor(readNonNegativeNumber(record.unitTokens) ?? 1000000));
  return {
    id,
    ...(record.compute ? { compute: record.compute } : fallbackId && !record.model ? { compute: fallbackId } : {}),
    ...(record.model ? { model: record.model } : {}),
    inputUsdPerUnit: inputUsdPerUnit ?? 0,
    cachedInputUsdPerUnit: cachedInputUsdPerUnit ?? inputUsdPerUnit ?? 0,
    outputUsdPerUnit: outputUsdPerUnit ?? 0,
    unitTokens,
    ...(latencyMs !== undefined ? { latencyMs } : {}),
    ...(toJsonObject(record.metadata) ? { metadata: toJsonObject(record.metadata) } : {})
  };
}

function routerRequiredCapabilities(task: FrontierSwarmTask, extra: readonly string[] | undefined): string[] {
  const metadataCapabilities = readStringArrayFromMetadata(task.metadata, ['requiredCapabilities', 'capabilities']);
  return uniqueStrings([
    ...task.capabilities,
    ...(task.resourceRequirements?.capabilities ?? []),
    ...metadataCapabilities,
    ...(extra ?? [])
  ]);
}

function createRawModelRouteCandidate(input: {
  compute: FrontierSwarmCompute;
  requiredCapabilities: readonly string[];
  tokenEstimate: FrontierSwarmModelTokenEstimate;
  priceCatalog: readonly FrontierSwarmModelPrice[];
  outcomeHistory: readonly FrontierSwarmModelOutcomeInput[];
  budget?: FrontierSwarmBudget;
}): FrontierSwarmModelRouteCandidate {
  const compute = cloneJsonValue(input.compute) as FrontierSwarmCompute;
  const price = modelPriceForCompute(compute, input.priceCatalog);
  const outcome = modelOutcomeForCompute(compute, input.outcomeHistory);
  const capabilities = computeCapabilities(compute);
  const missingCapabilities = input.requiredCapabilities.filter((capability) => !capabilities.includes(capability) && !capabilities.includes('*'));
  const qualityScore = computeQualityScore(compute);
  const estimatedCostUsd = roundCurrency(estimateCandidateCostUsd(compute, price, outcome, input.tokenEstimate, qualityScore));
  const estimatedLatencyMs = Math.max(1, Math.round(estimateCandidateLatencyMs(compute, price, outcome, qualityScore)));
  const priceKnown = !!price;
  const outcomeKnown = !!outcome;
  const budgetOk = input.budget?.maxCostUsd === undefined || estimatedCostUsd <= input.budget.maxCostUsd + 1e-12;
  const historyScore = outcomeKnown ? outcomeScore(outcome) : 0.65;
  const reasons = uniqueStrings([
    missingCapabilities.length ? 'missing-required-capabilities' : 'capable',
    priceKnown ? 'price-catalog-match' : 'price-estimated-from-compute-heuristics',
    outcomeKnown ? 'outcome-history-match' : 'outcome-history-missing',
    budgetOk ? 'within-budget' : 'over-budget'
  ]);
  const metadata = toJsonObject({
    capabilities,
    tokenEstimate: input.tokenEstimate,
    ...(price ? { price } : {}),
    ...(outcome ? { outcome } : {})
  });
  return {
    compute,
    capable: missingCapabilities.length === 0,
    missingCapabilities,
    estimatedCostUsd,
    estimatedLatencyMs,
    priceKnown,
    outcomeKnown,
    budgetOk,
    qualityScore,
    costScore: 0,
    latencyScore: 0,
    historyScore,
    riskFitScore: 0,
    score: 0,
    reasons,
    ...(metadata ? { metadata } : {})
  };
}

function finalizeModelRouteCandidates(
  rawCandidates: readonly FrontierSwarmModelRouteCandidate[],
  input: { riskScore: number; uncertaintyScore: number; impactScore: number; timePressureScore: number }
): FrontierSwarmModelRouteCandidate[] {
  const costs = rawCandidates.map((candidate) => candidate.estimatedCostUsd);
  const latencies = rawCandidates.map((candidate) => candidate.estimatedLatencyMs);
  const minCost = Math.min(...costs);
  const maxCost = Math.max(...costs);
  const minLatency = Math.min(...latencies);
  const maxLatency = Math.max(...latencies);
  const riskDemand = clamp01(input.riskScore * 0.42 + input.uncertaintyScore * 0.33 + input.impactScore * 0.25);
  const threshold = routingQualityThreshold(riskDemand);
  return rawCandidates
    .map((candidate) => {
      const costScore = normalizedRangeScore(candidate.estimatedCostUsd, minCost, maxCost);
      const latencyScore = normalizedRangeScore(candidate.estimatedLatencyMs, minLatency, maxLatency);
      const riskFitScore = clamp01(threshold - candidate.qualityScore);
      const score = (candidate.capable ? 0 : 1000)
        + (candidate.budgetOk ? 0 : 100)
        + costScore * Math.max(0.25, 0.68 - riskDemand * 0.3)
        + latencyScore * (0.14 + input.timePressureScore * 0.36)
        + riskFitScore * (0.7 + riskDemand)
        + (1 - candidate.historyScore) * 0.3
        - candidate.qualityScore * riskDemand * 0.22;
      return {
        ...candidate,
        costScore: roundScore(costScore),
        latencyScore: roundScore(latencyScore),
        riskFitScore: roundScore(riskFitScore),
        score: roundRouteScore(score)
      };
    })
    .sort(compareModelRouteCandidates);
}

function modelPriceForCompute(compute: FrontierSwarmCompute, catalog: readonly FrontierSwarmModelPrice[]): FrontierSwarmModelPrice | undefined {
  const metadataPrice = normalizeModelPrice(readRoutingMetadataValue(compute.metadata, ['modelPricing', 'pricing', 'price']), compute.id);
  return catalog.find((price) => price.compute === compute.id || price.id === compute.id)
    ?? (compute.model ? catalog.find((price) => price.model === compute.model || price.id === compute.model) : undefined)
    ?? (compute.profile ? catalog.find((price) => price.id === compute.profile) : undefined)
    ?? metadataPrice;
}

function modelOutcomeForCompute(compute: FrontierSwarmCompute, history: readonly FrontierSwarmModelOutcomeInput[]): FrontierSwarmModelOutcomeInput | undefined {
  const matches = history.filter((entry) => (
    entry.compute === compute.id
    || entry.model !== undefined && entry.model === compute.model
  ));
  if (!matches.length) return undefined;
  const attempts = matches.reduce((total, entry) => total + Math.max(1, Math.floor(entry.attempts ?? 1)), 0);
  const weighted = (key: 'successRate' | 'failureRate' | 'confidence' | 'averageCostUsd' | 'averageDurationMs'): number | undefined => {
    let total = 0;
    let weight = 0;
    for (const entry of matches) {
      const value = readNonNegativeNumber(entry[key]);
      if (value === undefined) continue;
      const entryWeight = Math.max(1, Math.floor(entry.attempts ?? 1));
      total += value * entryWeight;
      weight += entryWeight;
    }
    return weight > 0 ? total / weight : undefined;
  };
  return {
    compute: compute.id,
    ...(compute.model ? { model: compute.model } : {}),
    attempts,
    ...(weighted('successRate') !== undefined ? { successRate: clamp01(weighted('successRate') as number) } : {}),
    ...(weighted('failureRate') !== undefined ? { failureRate: clamp01(weighted('failureRate') as number) } : {}),
    ...(weighted('confidence') !== undefined ? { confidence: clamp01(weighted('confidence') as number) } : {}),
    ...(weighted('averageCostUsd') !== undefined ? { averageCostUsd: weighted('averageCostUsd') } : {}),
    ...(weighted('averageDurationMs') !== undefined ? { averageDurationMs: weighted('averageDurationMs') } : {})
  };
}

function estimateCandidateCostUsd(
  compute: FrontierSwarmCompute,
  price: FrontierSwarmModelPrice | undefined,
  outcome: FrontierSwarmModelOutcomeInput | undefined,
  tokens: FrontierSwarmModelTokenEstimate,
  qualityScore: number
): number {
  if (price) return estimateCostUsd(price, tokens);
  const historicalCost = readNonNegativeNumber(outcome?.averageCostUsd);
  if (historicalCost !== undefined) return historicalCost;
  const metadataCost = readNonNegativeNumber(readRoutingMetadataValue(compute.metadata, ['estimatedCostUsd', 'costUsd']));
  if (metadataCost !== undefined) return metadataCost;
  const tokenScale = Math.max(0.2, tokens.totalTokens / 30000);
  return (0.012 + Math.pow(qualityScore + 0.18, 2) * 0.16) * tokenScale;
}

function estimateCostUsd(price: FrontierSwarmModelPrice, tokens: FrontierSwarmModelTokenEstimate): number {
  const uncachedInputTokens = Math.max(0, tokens.inputTokens - tokens.cachedInputTokens);
  return (
    uncachedInputTokens * price.inputUsdPerUnit
    + tokens.cachedInputTokens * price.cachedInputUsdPerUnit
    + tokens.outputTokens * price.outputUsdPerUnit
  ) / price.unitTokens;
}

function estimateCandidateLatencyMs(
  compute: FrontierSwarmCompute,
  price: FrontierSwarmModelPrice | undefined,
  outcome: FrontierSwarmModelOutcomeInput | undefined,
  qualityScore: number
): number {
  const historicalDuration = readNonNegativeNumber(outcome?.averageDurationMs);
  if (historicalDuration !== undefined) return historicalDuration;
  if (price?.latencyMs !== undefined) return price.latencyMs;
  const metadataLatency = readNonNegativeNumber(readRoutingMetadataValue(compute.metadata, ['latencyMs', 'durationMs']));
  if (metadataLatency !== undefined) return metadataLatency;
  if (compute.timeoutMs !== undefined) return Math.max(1, Math.round(compute.timeoutMs * 0.55));
  return 30000 + qualityScore * 120000;
}

function computeCapabilities(compute: FrontierSwarmCompute): string[] {
  const metadataCapabilities = readStringArrayFromMetadata(compute.metadata, ['capabilities', 'provides', 'tags']);
  return uniqueStrings([
    compute.kind,
    compute.model,
    compute.reasoningEffort,
    compute.serviceTier,
    compute.profile,
    ...metadataCapabilities
  ]);
}

function computeQualityScore(compute: FrontierSwarmCompute): number {
  const explicit = readNonNegativeNumber(readRoutingMetadataValue(compute.metadata, ['qualityScore', 'capabilityScore']));
  if (explicit !== undefined) return roundScore(clamp01(explicit));
  const effort = String(compute.reasoningEffort ?? compute.profile ?? '').toLowerCase();
  let score = 0.5;
  if (effort.includes('minimal')) score = 0.22;
  else if (effort.includes('low')) score = 0.35;
  else if (effort.includes('medium')) score = 0.56;
  else if (effort.includes('high')) score = 0.78;
  if (effort.includes('xhigh') || effort.includes('max')) score = 0.92;
  const model = String(compute.model ?? compute.id).toLowerCase();
  if (model.includes('mini') || model.includes('small') || model.includes('fast') || compute.id.includes('cheap')) score -= 0.08;
  if (model.includes('deep') || model.includes('pro') || model.includes('large') || model.includes('opus') || model.includes('gpt-5.5')) score += 0.08;
  if (compute.kind === 'human') score = Math.max(score, 0.85);
  return roundScore(clamp01(score));
}

function outcomeScore(outcome: FrontierSwarmModelOutcomeInput | undefined): number {
  if (!outcome) return 0.65;
  const success = readNonNegativeNumber(outcome.successRate);
  const failure = readNonNegativeNumber(outcome.failureRate);
  const confidence = readNonNegativeNumber(outcome.confidence);
  const inferred = success ?? (failure !== undefined ? 1 - failure : undefined) ?? confidence ?? 0.65;
  return roundScore(clamp01(inferred));
}

function inferRoutingDimension(task: FrontierSwarmTask, dimension: 'risk' | 'uncertainty' | 'impact', additive = 0): number {
  const explicit = readRoutingMetadataValue(task.metadata, [`${dimension}Score`, dimension, `${dimension}Level`]);
  const numeric = readNonNegativeNumber(explicit);
  if (numeric !== undefined) return roundScore(clamp01(numeric + additive));
  if (typeof explicit === 'string') return roundScore(clamp01(routingLevelScore(explicit) + additive));
  const terms = priorityTokens(prioritySubjectTerms({
    id: task.id,
    lane: task.lane,
    layer: task.layer,
    title: task.title,
    objective: task.objective,
    workKind: task.workKind,
    status: task.status,
    tags: task.tags,
    metadata: task.metadata
  }));
  let score = dimension === 'risk' ? 0.2 : 0.22;
  const bump = (value: number, tokens: readonly string[]) => {
    if (tokens.some((token) => terms.has(token))) score += value;
  };
  if (dimension === 'risk') {
    bump(0.3, ['risky', 'risk', 'security', 'release', 'production', 'critical', 'conflict']);
    bump(0.18, ['migration', 'codec', 'serialization', 'public', 'api', 'merge']);
    if (task.targetRefs.length > 4 || task.changedRegions.length > 4) score += 0.12;
  } else if (dimension === 'uncertainty') {
    bump(0.28, ['unknown', 'uncertain', 'research', 'exploratory', 'investigate', 'oracle', 'divergence']);
    bump(0.16, ['missing', 'flaky', 'blocked', 'prototype']);
    if (task.sourceRefs.length === 0 && task.targetRefs.length === 0) score += 0.08;
  } else {
    bump(0.3, ['critical', 'release', 'public', 'api', 'production', 'ga', 'security']);
    bump(0.14, ['multi', 'cross', 'package', 'workflow', 'queue', 'router']);
    if (task.allowedWrites.length > 3 || task.targetRefs.length > 3) score += 0.12;
  }
  return roundScore(clamp01(score + additive));
}

function routingLevelScore(value: string): number {
  const level = value.toLowerCase();
  if (level === 'minimal' || level === 'none') return 0.05;
  if (level === 'low') return 0.2;
  if (level === 'medium' || level === 'moderate') return 0.5;
  if (level === 'unknown') return 0.62;
  if (level === 'high') return 0.82;
  if (level === 'critical' || level === 'urgent') return 0.95;
  return 0.35;
}

function normalizeTimePressureScore(value: unknown): number {
  const numeric = readNonNegativeNumber(value);
  if (numeric !== undefined) return roundScore(clamp01(numeric));
  if (typeof value !== 'string') return 0.35;
  const normalized = value.toLowerCase();
  if (normalized === 'relaxed' || normalized === 'low') return 0.12;
  if (normalized === 'normal' || normalized === 'medium') return 0.35;
  if (normalized === 'soon' || normalized === 'high') return 0.68;
  if (normalized === 'urgent' || normalized === 'critical') return 0.92;
  return 0.35;
}

function routingQualityThreshold(riskDemand: number): number {
  if (riskDemand >= 0.78) return 0.78;
  if (riskDemand >= 0.62) return 0.68;
  if (riskDemand >= 0.46) return 0.58;
  return 0;
}

function compareModelRouteCandidates(left: FrontierSwarmModelRouteCandidate, right: FrontierSwarmModelRouteCandidate): number {
  return left.score - right.score
    || left.estimatedCostUsd - right.estimatedCostUsd
    || right.qualityScore - left.qualityScore
    || left.compute.id.localeCompare(right.compute.id);
}

function compareCandidatesByCost(left: FrontierSwarmModelRouteCandidate, right: FrontierSwarmModelRouteCandidate): number {
  return left.estimatedCostUsd - right.estimatedCostUsd
    || right.qualityScore - left.qualityScore
    || left.compute.id.localeCompare(right.compute.id);
}

function selectPanelMembers(
  candidates: readonly FrontierSwarmModelRouteCandidate[],
  panel: FrontierSwarmPanelRouteInput,
  maxMembers: number
): FrontierSwarmModelRouteCandidate[] {
  const byId = new Map(candidates.map((candidate) => [candidate.compute.id, candidate]));
  const requested = uniqueStrings(panel.memberComputeIds ?? []).map((id) => byId.get(id)).filter((candidate): candidate is FrontierSwarmModelRouteCandidate => !!candidate);
  const cheapest = [...candidates].sort(compareCandidatesByCost)[0];
  const strongest = [...candidates].sort((left, right) => right.qualityScore - left.qualityScore || compareCandidatesByCost(left, right))[0];
  const ordered = uniqueCandidates([
    ...requested,
    ...(cheapest ? [cheapest] : []),
    ...(strongest ? [strongest] : []),
    ...candidates
  ]);
  return ordered.slice(0, maxMembers);
}

function selectPanelFuser(
  candidates: readonly FrontierSwarmModelRouteCandidate[],
  panel: FrontierSwarmPanelRouteInput,
  members: readonly FrontierSwarmModelRouteCandidate[]
): FrontierSwarmModelRouteCandidate | undefined {
  if (panel.fuserComputeId) return candidates.find((candidate) => candidate.compute.id === panel.fuserComputeId);
  return [...members, ...candidates].sort((left, right) => right.qualityScore - left.qualityScore || compareCandidatesByCost(left, right))[0];
}

function estimateFuserCost(candidate: FrontierSwarmModelRouteCandidate, tokenEstimate: FrontierSwarmModelTokenEstimateInput | undefined): number {
  const price = normalizeModelPrice(candidate.metadata?.price, candidate.compute.id);
  if (price) return roundCurrency(estimateCostUsd(price, normalizeModelTokenEstimate(tokenEstimate ?? { inputTokens: 3000, outputTokens: 1000 })));
  return roundCurrency(candidate.estimatedCostUsd * 0.18);
}

function estimateFuserLatency(candidate: FrontierSwarmModelRouteCandidate, tokenEstimate: FrontierSwarmModelTokenEstimateInput | undefined): number {
  if (tokenEstimate) {
    const baseTokens = readNonNegativeNumber((candidate.metadata?.tokenEstimate as { totalTokens?: number } | undefined)?.totalTokens) ?? 30000;
    const fuserTokens = normalizeModelTokenEstimate(tokenEstimate).totalTokens;
    return Math.max(1, Math.round(candidate.estimatedLatencyMs * Math.min(1, Math.max(0.08, fuserTokens / baseTokens))));
  }
  return Math.max(1, Math.round(candidate.estimatedLatencyMs * 0.18));
}

function defaultPanelConfidenceLift(memberCount: number, riskScore: number, uncertaintyScore: number, impactScore: number): number {
  if (memberCount < 2) return 0;
  return Math.min(0.35, 0.08 * (memberCount - 1) + uncertaintyScore * 0.12 + riskScore * 0.08 + impactScore * 0.05);
}

function panelEvaluationReasons(input: {
  enabled: boolean;
  memberCount: number;
  minMembers: number;
  budgetOk: boolean;
  riskDemand: number;
  minRiskScore: number;
  confidenceLift: number;
  strategy: FrontierSwarmPanelStrategy;
}): string[] {
  const reasons: string[] = [];
  if (!input.enabled) reasons.push('panel-disabled');
  if (input.memberCount < input.minMembers) reasons.push('not-enough-capable-members');
  else reasons.push(`${input.strategy}-members-ready`);
  if (input.budgetOk) reasons.push('panel-within-budget');
  else reasons.push('panel-over-budget');
  if (input.riskDemand >= input.minRiskScore) reasons.push('risk-justifies-panel');
  else reasons.push('risk-below-panel-threshold');
  if (input.confidenceLift >= 0.08) reasons.push('confidence-lift-material');
  else reasons.push('confidence-lift-low');
  return uniqueStrings(reasons);
}

function modelRouteReasons(
  route: FrontierSwarmModelRouteStrategy,
  selected: FrontierSwarmModelRouteCandidate,
  cheapest: FrontierSwarmModelRouteCandidate | undefined,
  panel: FrontierSwarmPanelEvaluation,
  input: { riskDemand: number; qualityThreshold: number; budgetCapped: boolean; missingTelemetry: boolean }
): string[] {
  const reasons: string[] = [];
  if (route === 'panel' || route === 'tournament') {
    reasons.push('panel-confidence-lift-selected', ...panel.reasons);
  } else if (route === 'single-cheap') {
    reasons.push('cheapest-capable-selected', 'risk-below-escalation-threshold');
  } else {
    reasons.push('single-deep-selected', 'risk-uncertainty-or-impact-escalation');
    if (selected.qualityScore >= input.qualityThreshold) reasons.push('quality-threshold-satisfied');
    if (cheapest && selected.compute.id !== cheapest.compute.id) reasons.push(`escalated-from:${cheapest.compute.id}`);
  }
  if (input.budgetCapped) reasons.push('budget-cap-filtered-candidates');
  if (input.missingTelemetry) reasons.push('missing-telemetry-fallback-used');
  return uniqueStrings([...reasons, ...selected.reasons]);
}

function explainModelRoute(
  route: FrontierSwarmModelRouteStrategy,
  selected: FrontierSwarmModelRouteCandidate,
  cheapest: FrontierSwarmModelRouteCandidate | undefined,
  panel: FrontierSwarmPanelEvaluation,
  riskDemand: number
): string {
  if (route === 'panel' || route === 'tournament') {
    return `${route} route selected: ${panel.memberComputeIds.join(', ')} plus ${panel.fuserComputeId ?? 'default'} fuser costs about $${panel.expectedCostUsd.toFixed(6)}, adds ${panel.confidenceLift.toFixed(3)} confidence lift, and leaves residual risk ${panel.residualRiskScore.toFixed(3)}.`;
  }
  if (route === 'single-cheap') {
    return `single-cheap route selected: ${selected.compute.id} is the cheapest capable candidate at about $${selected.estimatedCostUsd.toFixed(6)} with routing risk ${riskDemand.toFixed(3)}.`;
  }
  const from = cheapest && cheapest.compute.id !== selected.compute.id ? ` instead of cheapest ${cheapest.compute.id}` : '';
  return `single-deep route selected: ${selected.compute.id}${from} because routing risk ${riskDemand.toFixed(3)} needs quality score ${selected.qualityScore.toFixed(3)} within budget.`;
}

function uniqueCandidates(candidates: readonly FrontierSwarmModelRouteCandidate[]): FrontierSwarmModelRouteCandidate[] {
  const byId = new Map<string, FrontierSwarmModelRouteCandidate>();
  for (const candidate of candidates) byId.set(candidate.compute.id, candidate);
  return Array.from(byId.values());
}

function normalizedRangeScore(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 0;
  return clamp01((value - min) / (max - min));
}

function roundCurrency(value: number): number {
  return Math.max(0, Math.round((Number.isFinite(value) ? value : 0) * 1_000_000_000) / 1_000_000_000);
}

function roundScore(value: number): number {
  return Math.round(clamp01(value) * 1_000_000) / 1_000_000;
}

function roundRouteScore(value: number): number {
  const safe = Number.isFinite(value) ? value : 0;
  return Math.round(safe * 1_000_000) / 1_000_000;
}

function readModelOutcomeHistory(metadata: JsonObject | undefined): FrontierSwarmModelOutcomeInput[] {
  const value = readRoutingMetadataValue(metadata, ['outcomeHistory', 'modelOutcomeHistory', 'routingOutcomeHistory']);
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is FrontierSwarmModelOutcomeInput => !!entry && typeof entry === 'object' && !Array.isArray(entry))
    .map((entry) => ({ ...entry }));
}

function readStringArrayFromMetadata(metadata: JsonObject | undefined, keys: readonly string[]): string[] {
  const value = readRoutingMetadataValue(metadata, keys);
  if (!Array.isArray(value)) return [];
  return uniqueStrings(value.map((entry) => typeof entry === 'string' ? entry : undefined));
}

function readRoutingMetadataValue(metadata: JsonObject | undefined, keys: readonly string[]): unknown {
  if (!metadata) return undefined;
  for (const key of keys) {
    const direct = metadata[key];
    if (direct !== undefined) return direct;
  }
  for (const scope of ['routing', 'router', 'modelRouting', 'modelRouter']) {
    const scoped = metadata[scope];
    if (!scoped || typeof scoped !== 'object' || Array.isArray(scoped)) continue;
    for (const key of keys) {
      const direct = (scoped as Record<string, unknown>)[key];
      if (direct !== undefined) return direct;
    }
  }
  return undefined;
}

function readNonNegativeNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : undefined;
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
  const metadata = mergeSwarmMetadata([input.metadata], input.verification ?? []);
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
    ...(metadata ? { metadata } : {})
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
  const metadata = mergeSwarmMetadata([priorityDecisionMetadata(task.metadata, priorityDecisionForTask(task, lane?.id ?? 'unassigned', layer))], task.verification);
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
    ...(metadata ? { metadata } : {})
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
  const metadata = mergeSwarmMetadata([input.metadata]);
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
    ...(metadata ? { metadata } : {})
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
    ...(input.semanticImport !== undefined ? { semanticImport: cloneJsonValue(input.semanticImport) } : {}),
    traceShards: cloneJsonValue([...(input.traceShards ?? [])]),
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

export type FrontierSwarmBacklogStatus = 'open' | 'ready' | 'running' | 'blocked' | 'completed' | 'verified' | string;
export type FrontierSwarmBacklogEntryKind = 'task' | 'bug' | 'feature' | 'chore' | 'research' | 'spike' | 'decision' | string;
export type FrontierSwarmCycleType = 'milestone' | 'iteration' | 'wave' | string;

export interface FrontierSwarmBacklogEntryInput {
  id: string;
  title?: string;
  objective?: string;
  entryKind?: FrontierSwarmBacklogEntryKind;
  status?: FrontierSwarmBacklogStatus;
  lane?: string;
  layer?: string;
  workKind?: string;
  epicId?: string;
  groupId?: string;
  cycleId?: string;
  parentEntryId?: string;
  childEntryIds?: readonly string[];
  taskId?: string;
  dependsOn?: readonly string[];
  blockedBy?: readonly string[];
  sourceRefs?: readonly string[];
  targetRefs?: readonly string[];
  allowedWrites?: readonly string[];
  acceptance?: readonly string[];
  tags?: readonly string[];
  priority?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBacklogEntry extends FrontierSwarmBacklogEntryInput {
  title: string;
  entryKind: FrontierSwarmBacklogEntryKind;
  status: FrontierSwarmBacklogStatus;
  childEntryIds: string[];
  dependsOn: string[];
  blockedBy: string[];
  sourceRefs: string[];
  targetRefs: string[];
  allowedWrites: string[];
  acceptance: string[];
  tags: string[];
  priority: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmBacklogInput {
  id?: string;
  title?: string;
  package?: string;
  epics?: readonly Record<string, unknown>[];
  taskGroups?: readonly Record<string, unknown>[];
  cycles?: readonly Record<string, unknown>[];
  entries?: readonly FrontierSwarmBacklogEntryInput[];
  tasks?: readonly (FrontierSwarmTaskInput | FrontierSwarmTask)[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBacklog {
  kind: 'frontier.swarm.backlog';
  version: 1;
  id: string;
  title: string;
  package?: string;
  generatedAt: number;
  epics: Record<string, unknown>[];
  taskGroups: Record<string, unknown>[];
  cycles: Record<string, unknown>[];
  entries: FrontierSwarmBacklogEntry[];
  tasks: FrontierSwarmTask[];
  summary: {
    epicCount: number;
    groupCount: number;
    cycleCount: number;
    entryCount: number;
    taskCount: number;
    readyCount: number;
    runningCount: number;
    blockedCount: number;
    completedCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmBacklogTaskPlanInput {
  backlog: FrontierSwarmBacklog | FrontierSwarmBacklogInput;
  recursive?: boolean;
  maxDepth?: number;
  childArtifactPath?: string;
  decomposeCompute?: string;
  metadata?: unknown;
}

export interface FrontierSwarmBacklogDecompositionMetadata {
  sourceId: string;
  sourceKind: string;
  remainingDepth: number;
  childArtifactPath?: string;
}

export interface FrontierSwarmBacklogContinuationTaskPlanMetadata extends FrontierSwarmBacklogDecompositionMetadata {
  parentTaskId?: string;
}

export interface FrontierSwarmBacklogTaskPlan {
  kind: 'frontier.swarm.backlog-task-plan';
  version: 1;
  id: string;
  backlogId: string;
  generatedAt: number;
  tasks: FrontierSwarmTask[];
  runnableTaskIds: string[];
  decompositionTaskIds: string[];
  summary: { taskCount: number; runnableCount: number; decompositionCount: number };
  metadata?: JsonObject;
}

export function createSwarmBacklog(input: FrontierSwarmBacklogInput = {}): FrontierSwarmBacklog {
  const generatedAt = input.generatedAt ?? Date.now();
  const taskEntries = (input.tasks ?? []).map((task) => normalizeTask(task)).map(taskToBacklogEntry);
  const entries = [...(input.entries ?? []).map(normalizeBacklogEntry), ...taskEntries];
  const tasks = (input.tasks ?? []).map((task) => normalizeTask(task));
  const id = input.id ?? 'swarm-backlog:' + stableHash([input.package, input.title, entries.map((entry) => entry.id), tasks.map((task) => task.id)]);
  return {
    kind: 'frontier.swarm.backlog',
    version: 1,
    id,
    title: input.title ?? titleFromId(id),
    ...(input.package ? { package: input.package } : {}),
    generatedAt,
    epics: cloneJsonValue([...(input.epics ?? [])]),
    taskGroups: cloneJsonValue([...(input.taskGroups ?? [])]),
    cycles: cloneJsonValue([...(input.cycles ?? [])]),
    entries,
    tasks,
    summary: summarizeBacklog(entries, tasks, input),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function querySwarmBacklog(backlogInput: FrontierSwarmBacklog | FrontierSwarmBacklogInput, query: Partial<FrontierSwarmBacklogEntryInput> = {}): FrontierSwarmBacklog {
  const backlog = isBacklog(backlogInput) ? backlogInput : createSwarmBacklog(backlogInput);
  const entries = backlog.entries.filter((entry) => (
    (query.status === undefined || entry.status === query.status)
    && (query.lane === undefined || entry.lane === query.lane)
    && (query.epicId === undefined || entry.epicId === query.epicId)
    && (query.groupId === undefined || entry.groupId === query.groupId)
    && (query.cycleId === undefined || entry.cycleId === query.cycleId)
  ));
  return createSwarmBacklog({ ...backlog, entries, tasks: backlog.tasks.filter((task) => entries.some((entry) => entry.taskId === task.id || entry.id === task.id)) });
}

export function mergeSwarmBacklogs(input: { base: FrontierSwarmBacklog | FrontierSwarmBacklogInput; entries?: readonly FrontierSwarmBacklogEntryInput[]; tasks?: readonly FrontierSwarmTaskInput[] }): FrontierSwarmBacklog {
  const base = isBacklog(input.base) ? input.base : createSwarmBacklog(input.base);
  const byId = new Map(base.entries.map((entry) => [entry.id, entry]));
  for (const raw of input.entries ?? []) {
    const entry = normalizeBacklogEntry(raw);
    byId.set(entry.id, { ...(byId.get(entry.id) ?? entry), ...entry, tags: uniqueStrings([...(byId.get(entry.id)?.tags ?? []), ...entry.tags]) });
  }
  return createSwarmBacklog({ ...base, entries: Array.from(byId.values()), tasks: [...base.tasks, ...(input.tasks ?? []).map((task) => normalizeTask(task))] });
}

export function createSwarmBacklogTaskPlan(input: FrontierSwarmBacklogTaskPlanInput): FrontierSwarmBacklogTaskPlan {
  const backlog = isBacklog(input.backlog) ? input.backlog : createSwarmBacklog(input.backlog);
  const runnable = backlog.entries.filter((entry) => entry.status === 'ready' || entry.status === 'open');
  const tasks = runnable.map((entry) => normalizeTask({
    id: entry.taskId ?? entry.id,
    title: entry.title,
    objective: entry.objective,
    status: entry.status,
    lane: entry.lane,
    layer: entry.layer,
    kind: entry.workKind ?? entry.entryKind,
    priority: entry.priority,
    sourceRefs: entry.sourceRefs,
    targetRefs: entry.targetRefs,
    allowedWrites: entry.allowedWrites,
    dependsOn: entry.dependsOn,
    tags: entry.tags,
    metadata: { backlogEntryId: entry.id, ...(entry.metadata ?? {}) }
  }));
  const decompositionTasks = input.recursive ? backlog.entries
    .filter((entry) => entry.entryKind === 'feature' || entry.childEntryIds.length > 0)
    .map((entry) => normalizeTask({
      id: `${entry.id}:decompose`,
      title: `Decompose ${entry.title}`,
      objective: `Break ${entry.title} into child tasks.`,
      status: 'ready',
      lane: entry.lane,
      layer: entry.layer,
      compute: input.decomposeCompute,
      kind: 'backlog-decompose',
      targetRefs: input.childArtifactPath ? [input.childArtifactPath] : [],
      allowedWrites: input.childArtifactPath ? [input.childArtifactPath] : [],
      metadata: { source: { kind: 'entry', id: entry.id, taskId: entry.taskId }, continuation: { remainingDepth: Math.max(0, input.maxDepth ?? 1), childArtifactPath: input.childArtifactPath } }
    }))
    : [];
  const allTasks = [...tasks, ...decompositionTasks];
  return {
    kind: 'frontier.swarm.backlog-task-plan',
    version: 1,
    id: 'swarm-backlog-task-plan:' + stableHash([backlog.id, allTasks.map((task) => task.id), input.recursive, input.maxDepth]),
    backlogId: backlog.id,
    generatedAt: Date.now(),
    tasks: allTasks,
    runnableTaskIds: tasks.map((task) => task.id),
    decompositionTaskIds: decompositionTasks.map((task) => task.id),
    summary: { taskCount: allTasks.length, runnableCount: tasks.length, decompositionCount: decompositionTasks.length },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export type FrontierSwarmModelRoutingMode = 'fill' | 'observe' | 'override' | string;
export type FrontierSwarmModelRoutingScope = 'global' | 'repository' | 'package' | 'lane' | 'task' | string;
export type FrontierSwarmEvidenceQualityBand = 'missing' | 'weak' | 'adequate' | 'strong' | string;

export interface FrontierSwarmModelRoutingFeedbackInput {
  id?: string;
  scope?: FrontierSwarmModelRoutingScope;
  policyId?: string;
  taskId?: string;
  lane?: string;
  layer?: string;
  workKind?: string;
  computeId?: string;
  model?: string;
  resultStatus?: string;
  mergeDisposition?: FrontierSwarmMergeDisposition;
  selected?: boolean;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmModelRoutingFeedback extends FrontierSwarmModelRoutingFeedbackInput {
  kind: 'frontier.swarm.model-routing-feedback';
  version: 1;
  id: string;
  scope: FrontierSwarmModelRoutingScope;
  lane: string;
  model: string;
  taskKind: string;
  generatedAt: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmModelRoutingPolicySignalInput {
  mode?: FrontierSwarmModelRoutingMode;
  lane?: string;
  workKind?: string;
  model?: string;
  confidence?: FrontierSwarmConfidence;
  reason?: string;
  metadata?: unknown;
}

export interface FrontierSwarmModelRoutingPolicySignal extends FrontierSwarmModelRoutingPolicySignalInput {
  id: string;
}

export interface FrontierSwarmModelRoutingPolicyInput {
  id?: string;
  defaultMode?: FrontierSwarmModelRoutingMode;
  signals?: readonly FrontierSwarmModelRoutingPolicySignalInput[];
  feedback?: readonly FrontierSwarmModelRoutingFeedbackInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmModelRoutingPolicy {
  kind: 'frontier.swarm.model-routing-policy';
  version: 1;
  id: string;
  defaultMode: FrontierSwarmModelRoutingMode;
  signals: FrontierSwarmModelRoutingPolicySignal[];
  feedback: FrontierSwarmModelRoutingFeedback[];
  generatedAt: number;
  summary: { signalCount: number; feedbackCount: number; selectedCount: number };
  metadata?: JsonObject;
}

export function createSwarmModelRoutingFeedback(input: FrontierSwarmModelRoutingFeedbackInput = {}): FrontierSwarmModelRoutingFeedback {
  const generatedAt = input.generatedAt ?? Date.now();
  const lane = input.lane ?? 'global';
  const model = input.model ?? input.computeId ?? 'unknown';
  const { metadata: rawMetadata, ...rest } = input;
  const metadata = toJsonObject(rawMetadata);
  return {
    kind: 'frontier.swarm.model-routing-feedback',
    version: 1,
    id: input.id ?? 'swarm-model-routing-feedback:' + stableHash([input.scope, input.policyId, input.taskId, lane, model, generatedAt]),
    scope: input.scope ?? 'task',
    lane,
    model,
    taskKind: input.workKind ?? 'task',
    generatedAt,
    ...rest,
    ...(metadata ? { metadata } : {})
  };
}

export function createSwarmModelRoutingPolicy(input: FrontierSwarmModelRoutingPolicyInput = {}): FrontierSwarmModelRoutingPolicy {
  const generatedAt = input.generatedAt ?? Date.now();
  const feedback = (input.feedback ?? []).map(createSwarmModelRoutingFeedback);
  const signals = (input.signals ?? []).map((signal, index) => ({ id: `signal-${index + 1}`, ...signal }));
  return {
    kind: 'frontier.swarm.model-routing-policy',
    version: 1,
    id: input.id ?? 'swarm-model-routing-policy:' + stableHash([input.defaultMode, signals, feedback.map((entry) => entry.id)]),
    defaultMode: input.defaultMode ?? 'observe',
    signals,
    feedback,
    generatedAt,
    summary: { signalCount: signals.length, feedbackCount: feedback.length, selectedCount: feedback.filter((entry) => entry.selected).length },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmModelRoutingFeedbackFromBoard(input: { board?: unknown; generatedAt?: number; metadata?: unknown } = {}): FrontierSwarmModelRoutingFeedback {
  return createSwarmModelRoutingFeedback({ scope: 'lane', resultStatus: 'board-observed', generatedAt: input.generatedAt, metadata: input.metadata });
}

export function createSwarmModelRoutingFeedbackFromPanel(input: { panel?: unknown; generatedAt?: number; metadata?: unknown } = {}): FrontierSwarmModelRoutingFeedback {
  return createSwarmModelRoutingFeedback({ scope: 'task', resultStatus: 'panel-observed', generatedAt: input.generatedAt, metadata: input.metadata });
}

export interface FrontierSwarmAdaptiveObservationInput { kind?: string; jobId?: string; lane?: string; score?: number; metadata?: unknown }
export interface FrontierSwarmTournamentAdaptiveRecommendation { id: string; model?: string; computeId?: string; score: number; reason: string; metadata?: JsonObject }
export interface FrontierSwarmTournamentAdaptiveFeedback { kind: 'frontier.swarm.tournament-adaptive-feedback'; version: 1; id: string; observations: FrontierSwarmAdaptiveObservationInput[]; recommendations: FrontierSwarmTournamentAdaptiveRecommendation[]; generatedAt: number; metadata?: JsonObject }
export interface FrontierSwarmStrategyTournament { kind: 'frontier.swarm.strategy-tournament'; version: 1; id: string; candidates: Record<string, unknown>[]; winnerId?: string; generatedAt: number; metadata?: JsonObject }
export interface FrontierSwarmStrategyTournamentHistory { kind: 'frontier.swarm.strategy-tournament-history'; version: 1; id: string; tournaments: FrontierSwarmStrategyTournament[]; generatedAt: number; metadata?: JsonObject }
export interface FrontierSwarmStrategyTournamentComparison { winnerId?: string; tournamentCount: number; candidateCount: number; metadata?: JsonObject }

export function createSwarmTournamentAdaptiveFeedback(input: { observations?: readonly FrontierSwarmAdaptiveObservationInput[]; recommendations?: readonly Partial<FrontierSwarmTournamentAdaptiveRecommendation>[]; generatedAt?: number; metadata?: unknown } = {}): FrontierSwarmTournamentAdaptiveFeedback {
  const generatedAt = input.generatedAt ?? Date.now();
  const recommendations = (input.recommendations ?? []).map((entry, index) => ({
    id: entry.id ?? `recommendation-${index + 1}`,
    score: entry.score ?? 0,
    reason: entry.reason ?? 'observed',
    ...(entry.model ? { model: entry.model } : {}),
    ...(entry.computeId ? { computeId: entry.computeId } : {}),
    ...(toJsonObject(entry.metadata) ? { metadata: toJsonObject(entry.metadata) } : {})
  }));
  return {
    kind: 'frontier.swarm.tournament-adaptive-feedback',
    version: 1,
    id: 'swarm-tournament-adaptive-feedback:' + stableHash([input.observations, recommendations, generatedAt]),
    observations: cloneJsonValue([...(input.observations ?? [])]),
    recommendations,
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmMergeTournament(input: { candidates?: readonly Record<string, unknown>[]; winnerId?: string; generatedAt?: number; metadata?: unknown } = {}): FrontierSwarmStrategyTournament {
  const generatedAt = input.generatedAt ?? Date.now();
  const candidates = cloneJsonValue([...(input.candidates ?? [])]);
  return { kind: 'frontier.swarm.strategy-tournament', version: 1, id: 'swarm-strategy-tournament:' + stableHash([candidates, input.winnerId, generatedAt]), candidates, ...(input.winnerId ? { winnerId: input.winnerId } : {}), generatedAt, ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {}) };
}

export function createSwarmStrategyTournamentHistory(input: { tournaments?: readonly FrontierSwarmStrategyTournament[]; generatedAt?: number; metadata?: unknown } = {}): FrontierSwarmStrategyTournamentHistory {
  const generatedAt = input.generatedAt ?? Date.now();
  const tournaments = cloneJsonValue([...(input.tournaments ?? [])]);
  return { kind: 'frontier.swarm.strategy-tournament-history', version: 1, id: 'swarm-strategy-tournament-history:' + stableHash([tournaments.map((entry) => entry.id), generatedAt]), tournaments, generatedAt, ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {}) };
}

export function querySwarmStrategyTournament(tournament: FrontierSwarmStrategyTournament): FrontierSwarmStrategyTournament {
  return tournament;
}

export function compareSwarmStrategyTournaments(history: FrontierSwarmStrategyTournamentHistory | readonly FrontierSwarmStrategyTournament[]): FrontierSwarmStrategyTournamentComparison {
  const tournaments: readonly FrontierSwarmStrategyTournament[] = Array.isArray(history)
    ? history as readonly FrontierSwarmStrategyTournament[]
    : (history as FrontierSwarmStrategyTournamentHistory).tournaments;
  return { winnerId: tournaments.find((entry: FrontierSwarmStrategyTournament) => entry.winnerId)?.winnerId, tournamentCount: tournaments.length, candidateCount: tournaments.reduce((sum: number, entry: FrontierSwarmStrategyTournament) => sum + entry.candidates.length, 0) };
}

export interface FrontierSwarmAdaptiveLoadPlan { kind: 'frontier.swarm.adaptive-load-plan'; version: 1; id: string; planId?: string; observations: FrontierSwarmAdaptiveObservationInput[]; generatedAt: number; limits: FrontierSwarmScheduleLimits; metadata?: JsonObject }

export function createSwarmAdaptiveLoadPlan(input: { plan?: FrontierSwarmPlan; observations?: readonly FrontierSwarmAdaptiveObservationInput[]; currentLimits?: Partial<FrontierSwarmScheduleLimits>; maxLimits?: Partial<FrontierSwarmScheduleLimits>; generatedAt?: number; metadata?: unknown } = {}): FrontierSwarmAdaptiveLoadPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  return {
    kind: 'frontier.swarm.adaptive-load-plan',
    version: 1,
    id: 'swarm-adaptive-load-plan:' + stableHash([input.plan?.id, input.observations, generatedAt]),
    ...(input.plan ? { planId: input.plan.id } : {}),
    observations: cloneJsonValue([...(input.observations ?? [])]),
    generatedAt,
    limits: { maxLaneConcurrency: {}, maxConcurrencyKeyConcurrency: {}, maxComputeConcurrency: {}, resourceQuotas: {}, ...(input.currentLimits ?? {}), ...(input.maxLimits ?? {}) },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmScheduleInputFromAdaptiveLoadPlan(plan: FrontierSwarmPlan, adaptivePlan: FrontierSwarmAdaptiveLoadPlan): FrontierSwarmScheduleInput {
  return { plan, ...adaptivePlan.limits };
}

export interface FrontierSwarmCoordinatorProcessInput { id?: string; role?: string; lane?: string; status?: string; metadata?: unknown }
export interface FrontierSwarmCoordinatorDashboard { kind: 'frontier.swarm.coordinator-dashboard'; version: 1; id: string; generatedAt: number; processes: FrontierSwarmCoordinatorProcessInput[]; summary: { processCount: number; activeCount: number }; metadata?: JsonObject }

export function createSwarmCoordinatorDashboard(input: { processes?: readonly FrontierSwarmCoordinatorProcessInput[]; generatedAt?: number; metadata?: unknown } = {}): FrontierSwarmCoordinatorDashboard {
  const generatedAt = input.generatedAt ?? Date.now();
  const processes = cloneJsonValue([...(input.processes ?? [])]);
  return {
    kind: 'frontier.swarm.coordinator-dashboard',
    version: 1,
    id: 'swarm-coordinator-dashboard:' + stableHash([processes, generatedAt]),
    generatedAt,
    processes,
    summary: { processCount: processes.length, activeCount: processes.filter((entry) => entry.status === 'active' || entry.status === 'running').length },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function querySwarmCoordinatorDashboard(dashboard: FrontierSwarmCoordinatorDashboard): FrontierSwarmCoordinatorDashboard {
  return dashboard;
}

function normalizeBacklogEntry(input: FrontierSwarmBacklogEntryInput): FrontierSwarmBacklogEntry {
  const { metadata: rawMetadata, ...rest } = input;
  const metadata = toJsonObject(rawMetadata);
  return {
    ...rest,
    title: input.title ?? titleFromId(input.id),
    entryKind: input.entryKind ?? 'task',
    status: input.status ?? 'open',
    childEntryIds: uniqueStrings(input.childEntryIds ?? []),
    dependsOn: uniqueStrings(input.dependsOn ?? []),
    blockedBy: uniqueStrings(input.blockedBy ?? []),
    sourceRefs: uniqueStrings(input.sourceRefs ?? []),
    targetRefs: uniqueStrings(input.targetRefs ?? []),
    allowedWrites: uniqueStrings(input.allowedWrites ?? []),
    acceptance: uniqueStrings(input.acceptance ?? []),
    tags: uniqueStrings(input.tags ?? []),
    priority: input.priority ?? 0,
    ...(metadata ? { metadata } : {})
  };
}

function taskToBacklogEntry(task: FrontierSwarmTask): FrontierSwarmBacklogEntry {
  return normalizeBacklogEntry({
    id: task.id,
    taskId: task.id,
    title: task.title,
    objective: task.objective,
    entryKind: task.workKind === 'feature' ? 'feature' : 'task',
    status: task.status,
    lane: task.lane,
    layer: task.layer,
    workKind: task.workKind,
    sourceRefs: task.sourceRefs,
    targetRefs: task.targetRefs,
    allowedWrites: task.allowedWrites,
    acceptance: task.acceptance,
    tags: task.tags,
    priority: task.priority,
    metadata: task.metadata
  });
}

function summarizeBacklog(entries: readonly FrontierSwarmBacklogEntry[], tasks: readonly FrontierSwarmTask[], input: FrontierSwarmBacklogInput): FrontierSwarmBacklog['summary'] {
  return {
    epicCount: input.epics?.length ?? 0,
    groupCount: input.taskGroups?.length ?? 0,
    cycleCount: input.cycles?.length ?? 0,
    entryCount: entries.length,
    taskCount: tasks.length,
    readyCount: entries.filter((entry) => entry.status === 'ready' || entry.status === 'open').length,
    runningCount: entries.filter((entry) => entry.status === 'running').length,
    blockedCount: entries.filter((entry) => entry.status === 'blocked').length,
    completedCount: entries.filter((entry) => entry.status === 'completed' || entry.status === 'verified').length
  };
}

function isBacklog(value: FrontierSwarmBacklog | FrontierSwarmBacklogInput): value is FrontierSwarmBacklog {
  return (value as FrontierSwarmBacklog).kind === 'frontier.swarm.backlog';
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

function uniqueSwarmCommands(commands: readonly FrontierSwarmCommand[]): FrontierSwarmCommand[] {
  const seen = new Set<string>();
  const unique: FrontierSwarmCommand[] = [];
  for (const command of commands) {
    const key = stableHash(command);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(command);
  }
  return unique;
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
