import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_AUTO_REVIEW_REPORT_KIND,
  FRONTIER_SWARM_AUTO_REVIEW_REPORT_VERSION,
  FRONTIER_SWARM_LANE_PLAYBOOK_KIND,
  FRONTIER_SWARM_LANE_PLAYBOOK_VERSION,
  FRONTIER_SWARM_PATCH_STACK_PLAN_KIND,
  FRONTIER_SWARM_PATCH_STACK_PLAN_VERSION,
  FRONTIER_SWARM_REBASE_REPORT_KIND,
  FRONTIER_SWARM_REBASE_REPORT_VERSION,
  FRONTIER_SWARM_USAGE_GOVERNOR_KIND,
  FRONTIER_SWARM_USAGE_GOVERNOR_VERSION
} from './constants.js';
import type {
  FrontierSwarmCommand,
  FrontierSwarmCommandInput
} from './manifest-types.js';
import type {
  FrontierSwarmMergeBundle,
  FrontierSwarmMergeConflict,
  FrontierSwarmMergeIndex
} from './merge-types.js';
import type {
  FrontierSwarmAutoReviewFindingKind,
  FrontierSwarmDivergenceSeverity,
  FrontierSwarmRebaseStatus
} from './status-types.js';

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
