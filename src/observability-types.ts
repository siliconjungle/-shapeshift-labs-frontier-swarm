import type {
  JsonObject,
  JsonValue
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_DIVERGENCE_REPORT_KIND,
  FRONTIER_SWARM_DIVERGENCE_REPORT_VERSION,
  FRONTIER_SWARM_OBSERVABILITY_POINT_KIND,
  FRONTIER_SWARM_OBSERVABILITY_POINT_VERSION,
  FRONTIER_SWARM_PARITY_ORACLE_KIND,
  FRONTIER_SWARM_PARITY_ORACLE_VERSION,
  FRONTIER_SWARM_REPLAY_BUNDLE_KIND,
  FRONTIER_SWARM_REPLAY_BUNDLE_VERSION
} from './constants.js';
import type {
  FrontierSwarmNamedRef,
  FrontierSwarmNamedRefInput
} from './context-types.js';
import type {
  FrontierSwarmCommand,
  FrontierSwarmCommandInput
} from './manifest-types.js';
import type {
  FrontierSwarmConfidence,
  FrontierSwarmDivergenceSeverity,
  FrontierSwarmParityOracleStatus
} from './status-types.js';

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
