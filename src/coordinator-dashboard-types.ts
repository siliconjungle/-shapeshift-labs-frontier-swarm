import type { JsonObject } from '@shapeshift-labs/frontier';
import type { FrontierSwarmPlan } from './plan.js';
import type {
  FrontierSwarmEvidenceIndex,
  FrontierSwarmJobStatus,
  FrontierSwarmMergeAdmission,
  FrontierSwarmMergeBundle,
  FrontierSwarmMergeDisposition,
  FrontierSwarmMergeIndex,
  FrontierSwarmMergeReadiness,
  FrontierSwarmQueueOverlay,
  FrontierSwarmRiskLevel,
  FrontierSwarmRun,
  FrontierSwarmSemanticImportSummary,
  FrontierSwarmTraceIndex
} from './index.js';

export const FRONTIER_SWARM_COORDINATOR_DASHBOARD_KIND = 'frontier.swarm.coordinator-dashboard';
export const FRONTIER_SWARM_COORDINATOR_DASHBOARD_VERSION = 1;

export type FrontierSwarmCoordinatorLiveness = 'running' | 'finished' | 'missing' | 'unknown' | string;
export type FrontierSwarmCoordinatorAdmissionStatus = 'admitted' | 'deferred' | 'not-admissible' | 'unknown' | string;

export interface FrontierSwarmCoordinatorProcessInput {
  pid?: number;
  role?: string;
  jobId?: string;
  runId?: string;
  status?: FrontierSwarmCoordinatorLiveness;
  startedAt?: number;
  lastSeenAt?: number;
  command?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmCoordinatorProcess {
  pid?: number;
  role: string;
  jobId?: string;
  runId?: string;
  status: FrontierSwarmCoordinatorLiveness;
  startedAt?: number;
  lastSeenAt?: number;
  command: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmCoordinatorSourceCitation {
  path: string;
  kind: string;
  symbol?: string;
  region?: string;
  confidence?: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmCoordinatorDashboardInput {
  id?: string;
  plan?: FrontierSwarmPlan;
  run?: FrontierSwarmRun;
  bundles?: readonly FrontierSwarmMergeBundle[];
  mergeIndex?: FrontierSwarmMergeIndex;
  queueOverlay?: FrontierSwarmQueueOverlay;
  evidenceIndex?: FrontierSwarmEvidenceIndex;
  traceIndex?: FrontierSwarmTraceIndex;
  admission?: FrontierSwarmMergeAdmission;
  processes?: readonly FrontierSwarmCoordinatorProcessInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmCoordinatorDashboard {
  kind: typeof FRONTIER_SWARM_COORDINATOR_DASHBOARD_KIND;
  version: typeof FRONTIER_SWARM_COORDINATOR_DASHBOARD_VERSION;
  id: string;
  runId?: string;
  planId?: string;
  generatedAt: number;
  jobs: FrontierSwarmCoordinatorJob[];
  duplicateGroups: FrontierSwarmCoordinatorDuplicateGroup[];
  processes: FrontierSwarmCoordinatorProcess[];
  byLane: Record<string, string[]>;
  byDisposition: Record<string, string[]>;
  byLiveness: Record<string, string[]>;
  mergeIndex?: FrontierSwarmMergeIndex;
  queueOverlay?: FrontierSwarmQueueOverlay;
  evidenceIndex?: FrontierSwarmEvidenceIndex;
  traceIndex?: FrontierSwarmTraceIndex;
  admission?: FrontierSwarmMergeAdmission;
  summary: {
    jobCount: number;
    readyToApplyCount: number;
    needsHumanPortCount: number;
    failedEvidenceCount: number;
    staleAgainstHeadCount: number;
    duplicateGroupCount: number;
    semanticSidecarCount: number;
    semanticRegionCount: number;
    semanticDependencyRelationCount: number;
    traceShardCount: number;
    traceDivergenceCount: number;
    executableOwnershipRegionCount: number;
    averageMergeScore: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmCoordinatorTraceSummary {
  shardCount: number;
  rowWindowCount: number;
  hypothesisCount: number;
  executableOwnershipRegionCount: number;
  focusedTestCount: number;
  referenceEvidenceCount: number;
  divergenceCount: number;
  openDivergenceCount: number;
}

export interface FrontierSwarmCoordinatorJob {
  jobId: string;
  taskId?: string;
  lane?: string;
  title?: string;
  status: FrontierSwarmJobStatus;
  liveness: FrontierSwarmCoordinatorLiveness;
  mergeReadiness: FrontierSwarmMergeReadiness;
  disposition: FrontierSwarmMergeDisposition;
  riskLevel: FrontierSwarmRiskLevel;
  mergeScore: number;
  mergeScoreReasons: string[];
  admissionStatus: FrontierSwarmCoordinatorAdmissionStatus;
  admissionReasons: string[];
  staleAgainstHead: boolean;
  duplicateGroupId?: string;
  duplicateOf?: string;
  changedPaths: string[];
  changedRegions: string[];
  semanticRegions: string[];
  ownershipViolations: string[];
  patchPath?: string;
  evidencePaths: string[];
  primaryEvidencePath?: string;
  sourceCitations: FrontierSwarmCoordinatorSourceCitation[];
  tests: { passed: number; failed: number; requiredFailed: number };
  semanticImport?: FrontierSwarmSemanticImportSummary;
  traceSummary?: FrontierSwarmCoordinatorTraceSummary;
  generatedAt: number;
}

export interface FrontierSwarmCoordinatorDuplicateGroup {
  id: string;
  key: string;
  jobIds: string[];
  reason: string;
}

export interface FrontierSwarmCoordinatorDashboardQuery {
  jobId?: string;
  lane?: string;
  disposition?: FrontierSwarmMergeDisposition;
  liveness?: FrontierSwarmCoordinatorLiveness;
  admissionStatus?: FrontierSwarmCoordinatorAdmissionStatus;
  pathIncludes?: string;
  region?: string;
  hasSemanticImport?: boolean;
  hasSemanticRegions?: boolean;
  hasSemanticDependencies?: boolean;
  hasTraceShards?: boolean;
  traceSubject?: string;
  traceRegion?: string;
  staleAgainstHead?: boolean;
  duplicateOnly?: boolean;
  minMergeScore?: number;
  maxMergeScore?: number;
}

export interface FrontierSwarmCoordinatorDashboardQueryResult {
  jobs: FrontierSwarmCoordinatorJob[];
  summary: { jobCount: number; averageMergeScore: number };
}
