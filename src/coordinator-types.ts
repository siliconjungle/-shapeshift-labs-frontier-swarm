import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_COORDINATOR_DASHBOARD_KIND,
  FRONTIER_SWARM_COORDINATOR_DASHBOARD_VERSION
} from './constants.js';
import type {
  FrontierSwarmMergeAdmission
} from './context-types.js';
import type {
  FrontierSwarmEvidenceIndex
} from './evidence-types.js';
import type {
  FrontierSwarmMergeBundle,
  FrontierSwarmMergeIndex,
  FrontierSwarmQueueOverlay
} from './merge-types.js';
import type {
  FrontierSwarmPlan
} from './plan.js';
import type {
  FrontierSwarmRun
} from './run-types.js';
import type {
  FrontierSwarmSemanticImportSummary
} from './semantic-types.js';
import type {
  FrontierSwarmCoordinatorAdmissionStatus,
  FrontierSwarmCoordinatorLiveness,
  FrontierSwarmJobStatus,
  FrontierSwarmMergeDisposition,
  FrontierSwarmMergeReadiness,
  FrontierSwarmRiskLevel
} from './status-types.js';
import type {
  FrontierSwarmTraceIndex
} from './trace-types.js';

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
  tests: {
    passed: number;
    failed: number;
    requiredFailed: number;
  };
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
  summary: {
    jobCount: number;
    averageMergeScore: number;
  };
}
