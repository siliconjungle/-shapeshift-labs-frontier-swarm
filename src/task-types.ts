import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_TASK_KIND,
  FRONTIER_SWARM_TASK_VERSION
} from './constants.js';
import type {
  FrontierSwarmCommand,
  FrontierSwarmCommandInput,
  FrontierSwarmCompute,
  FrontierSwarmLane,
  FrontierSwarmLayer,
  FrontierSwarmManifest,
  FrontierSwarmOwnershipRegion,
  FrontierSwarmOwnershipRegionInput,
  FrontierSwarmResourceRequirements,
  FrontierSwarmResourceRequirementsInput
} from './manifest-types.js';
import type {
  FrontierSwarmPlan
} from './plan.js';
import type {
  FrontierSwarmReviewPlan
} from './queue-types.js';
import type {
  FrontierSwarmRun
} from './run-types.js';
import type {
  FrontierSwarmTaskStatus
} from './status-types.js';

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
