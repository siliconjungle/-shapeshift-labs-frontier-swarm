import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_KIND,
  FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_VERSION,
  FRONTIER_SWARM_PROOF_KIND,
  FRONTIER_SWARM_PROOF_VERSION
} from './constants.js';
import type {
  FrontierSwarmMergeAdmission
} from './context-types.js';
import type {
  FrontierSwarmCoordinatorDashboard
} from './coordinator-types.js';
import type {
  FrontierSwarmSummary
} from './manifest-types.js';
import type {
  FrontierSwarmMergeIndex
} from './merge-types.js';
import type {
  FrontierSwarmPlan,
  FrontierSwarmScheduleLimits
} from './plan.js';
import type {
  FrontierSwarmRun
} from './run-types.js';
import type {
  FrontierSwarmSchedule
} from './scheduler.js';
import type {
  FrontierSwarmAdaptiveDecisionAction,
  FrontierSwarmAdaptiveDecisionTarget,
  FrontierSwarmAdaptiveMode,
  FrontierSwarmAdaptiveObservationKind,
  FrontierSwarmAdaptiveObservationSeverity
} from './status-types.js';
import type {
  FrontierSwarmValidation
} from './task-types.js';

export interface FrontierSwarmAdaptiveScheduleLimitsInput {
  maxReadyJobs?: number;
  maxLaneConcurrency?: Record<string, number>;
  maxConcurrencyKeyConcurrency?: Record<string, number>;
  maxComputeConcurrency?: Record<string, number>;
  resourceQuotas?: Record<string, number>;
}

export interface FrontierSwarmAdaptiveObservationInput {
  id?: string;
  kind: FrontierSwarmAdaptiveObservationKind;
  severity?: FrontierSwarmAdaptiveObservationSeverity;
  at?: number;
  value?: number;
  jobId?: string;
  taskId?: string;
  lane?: string;
  compute?: string;
  concurrencyKey?: string;
  resource?: string;
  path?: string;
  region?: string;
  reason?: string;
  reasons?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmAdaptiveObservation {
  id: string;
  kind: FrontierSwarmAdaptiveObservationKind;
  severity: FrontierSwarmAdaptiveObservationSeverity;
  at: number;
  value: number;
  jobId?: string;
  taskId?: string;
  lane?: string;
  compute?: string;
  concurrencyKey?: string;
  resource?: string;
  path?: string;
  region?: string;
  reasons: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmAdaptiveLoadPlanInput {
  id?: string;
  plan?: FrontierSwarmPlan;
  run?: FrontierSwarmRun;
  schedule?: FrontierSwarmSchedule;
  mergeIndex?: FrontierSwarmMergeIndex;
  dashboard?: FrontierSwarmCoordinatorDashboard;
  admission?: FrontierSwarmMergeAdmission;
  mode?: FrontierSwarmAdaptiveMode;
  maxLimits?: FrontierSwarmAdaptiveScheduleLimitsInput;
  currentLimits?: FrontierSwarmAdaptiveScheduleLimitsInput;
  minLimits?: FrontierSwarmAdaptiveScheduleLimitsInput;
  observations?: readonly FrontierSwarmAdaptiveObservationInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmAdaptiveLoadDecision {
  id: string;
  action: FrontierSwarmAdaptiveDecisionAction;
  target: FrontierSwarmAdaptiveDecisionTarget;
  key?: string;
  previous?: number;
  next?: number;
  max?: number;
  min?: number;
  reason: string;
  observationIds: string[];
}

export interface FrontierSwarmAdaptiveLoadPlan {
  kind: typeof FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_KIND;
  version: typeof FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_VERSION;
  id: string;
  planId?: string;
  runId?: string;
  mode: FrontierSwarmAdaptiveMode;
  generatedAt: number;
  maxLimits: FrontierSwarmScheduleLimits;
  currentLimits: FrontierSwarmScheduleLimits;
  minLimits: FrontierSwarmScheduleLimits;
  effectiveLimits: FrontierSwarmScheduleLimits;
  observations: FrontierSwarmAdaptiveObservation[];
  decisions: FrontierSwarmAdaptiveLoadDecision[];
  summary: {
    observationCount: number;
    bottleneckCount: number;
    decisionCount: number;
    reducedCount: number;
    increasedCount: number;
    effectiveMaxReadyJobs?: number;
    maxReadyJobs?: number;
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
