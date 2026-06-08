import type { JsonObject } from '@shapeshift-labs/frontier';
import type { FrontierSwarmPlan, FrontierSwarmScheduleLimits } from './plan.js';
import type { FrontierSwarmSchedule } from './scheduler.js';
import type { FrontierSwarmCoordinatorDashboard } from './coordinator-dashboard-types.js';
import type { FrontierSwarmMergeAdmission, FrontierSwarmMergeIndex, FrontierSwarmRun } from './index.js';

export const FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_KIND = 'frontier.swarm.adaptive-load-plan';
export const FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_VERSION = 1;

export type FrontierSwarmAdaptiveMode = 'off' | 'observe' | 'conservative' | 'balanced' | 'aggressive' | string;
export type FrontierSwarmAdaptiveObservationKind =
  | 'resource-capacity'
  | 'lane-capacity'
  | 'concurrency-key-capacity'
  | 'compute-capacity'
  | 'ready-capacity'
  | 'evidence-failure'
  | 'merge-conflict'
  | 'stale-patch'
  | 'browser-contention'
  | 'semantic-empty'
  | 'semantic-weak'
  | 'log-noise'
  | 'discovery-only-output'
  | 'duplicate-output'
  | 'budget-pressure'
  | 'slow-job'
  | 'healthy-throughput'
  | 'strategy-regression'
  | 'strategy-underperforming'
  | string;
export type FrontierSwarmAdaptiveObservationSeverity = 'info' | 'warning' | 'error' | 'critical' | string;
export type FrontierSwarmAdaptiveDecisionAction = 'observe' | 'decrease' | 'increase' | 'hold' | string;
export type FrontierSwarmAdaptiveDecisionTarget =
  | 'max-ready-jobs'
  | 'lane'
  | 'concurrency-key'
  | 'compute'
  | 'resource'
  | string;

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

export interface FrontierSwarmAdaptiveTournamentFeedbackInput {
  id?: string;
  tournamentId?: string;
  historyId?: string;
  comparisonId?: string;
  generatedAt?: number;
  observations?: readonly FrontierSwarmAdaptiveObservationInput[];
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
  tournamentFeedback?: FrontierSwarmAdaptiveTournamentFeedbackInput | readonly FrontierSwarmAdaptiveTournamentFeedbackInput[];
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
