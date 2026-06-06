import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_TRACE_INDEX_KIND,
  FRONTIER_SWARM_TRACE_INDEX_VERSION,
  FRONTIER_SWARM_TRACE_SHARD_KIND,
  FRONTIER_SWARM_TRACE_SHARD_VERSION
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
  FrontierSwarmMergeBundle
} from './merge-types.js';
import type {
  FrontierSwarmDivergenceReport,
  FrontierSwarmDivergenceReportInput
} from './observability-types.js';
import type {
  FrontierSwarmConfidence,
  FrontierSwarmRiskLevel,
  FrontierSwarmTraceShardStatus
} from './status-types.js';

export interface FrontierSwarmTraceRowWindowInput {
  id?: string;
  title?: string;
  start?: number;
  end?: number;
  rowCount?: number;
  firstDivergenceAt?: number;
  deltaFields?: readonly string[];
  evidenceRefs?: readonly (string | FrontierSwarmNamedRefInput)[];
  metadata?: unknown;
}

export interface FrontierSwarmTraceRowWindow {
  id: string;
  title: string;
  start?: number;
  end?: number;
  rowCount?: number;
  firstDivergenceAt?: number;
  deltaFields: string[];
  evidenceRefs: FrontierSwarmNamedRef[];
  metadata?: JsonObject;
}

export interface FrontierSwarmTraceHypothesisInput {
  id?: string;
  title?: string;
  sourcePath?: string;
  line?: number;
  symbol?: string;
  region?: string;
  confidence?: FrontierSwarmConfidence;
  reason?: string;
  evidenceRefs?: readonly (string | FrontierSwarmNamedRefInput)[];
  metadata?: unknown;
}

export interface FrontierSwarmTraceHypothesis {
  id: string;
  title: string;
  sourcePath?: string;
  line?: number;
  symbol?: string;
  region?: string;
  confidence: FrontierSwarmConfidence;
  reason?: string;
  evidenceRefs: FrontierSwarmNamedRef[];
  metadata?: JsonObject;
}

export interface FrontierSwarmExecutableOwnershipRegionInput {
  id: string;
  kind?: string;
  sourcePath?: string;
  symbol?: string;
  selectors?: readonly string[];
  affectedTests?: readonly (string | FrontierSwarmCommandInput)[];
  conflictingAssumptions?: readonly string[];
  traceRefs?: readonly (string | FrontierSwarmNamedRefInput)[];
  riskLevel?: FrontierSwarmRiskLevel;
  metadata?: unknown;
}

export interface FrontierSwarmExecutableOwnershipRegion {
  id: string;
  kind: string;
  sourcePath?: string;
  symbol?: string;
  selectors: string[];
  affectedTests: FrontierSwarmCommand[];
  conflictingAssumptions: string[];
  traceRefs: FrontierSwarmNamedRef[];
  riskLevel: FrontierSwarmRiskLevel;
  metadata?: JsonObject;
}

export interface FrontierSwarmTraceShardInput {
  id?: string;
  jobId?: string;
  lane?: string;
  subject?: string;
  status?: FrontierSwarmTraceShardStatus;
  traceRefs?: readonly (string | FrontierSwarmNamedRefInput)[];
  divergence?: FrontierSwarmDivergenceReport | FrontierSwarmDivergenceReportInput;
  rowWindows?: readonly FrontierSwarmTraceRowWindowInput[];
  hypotheses?: readonly FrontierSwarmTraceHypothesisInput[];
  executableOwnershipRegions?: readonly FrontierSwarmExecutableOwnershipRegionInput[];
  focusedTests?: readonly (string | FrontierSwarmCommandInput)[];
  referenceEvidence?: readonly (string | FrontierSwarmNamedRefInput)[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmTraceShard {
  kind: typeof FRONTIER_SWARM_TRACE_SHARD_KIND;
  version: typeof FRONTIER_SWARM_TRACE_SHARD_VERSION;
  id: string;
  jobId?: string;
  lane?: string;
  subject?: string;
  status: FrontierSwarmTraceShardStatus;
  traceRefs: FrontierSwarmNamedRef[];
  divergence?: FrontierSwarmDivergenceReport;
  rowWindows: FrontierSwarmTraceRowWindow[];
  hypotheses: FrontierSwarmTraceHypothesis[];
  executableOwnershipRegions: FrontierSwarmExecutableOwnershipRegion[];
  focusedTests: FrontierSwarmCommand[];
  referenceEvidence: FrontierSwarmNamedRef[];
  generatedAt: number;
  summary: {
    rowWindowCount: number;
    hypothesisCount: number;
    executableOwnershipRegionCount: number;
    focusedTestCount: number;
    referenceEvidenceCount: number;
    hasDivergence: boolean;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmTraceIndexInput {
  id?: string;
  shards?: readonly (FrontierSwarmTraceShard | FrontierSwarmTraceShardInput)[];
  bundles?: readonly FrontierSwarmMergeBundle[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmTraceIndex {
  kind: typeof FRONTIER_SWARM_TRACE_INDEX_KIND;
  version: typeof FRONTIER_SWARM_TRACE_INDEX_VERSION;
  id: string;
  generatedAt: number;
  shards: FrontierSwarmTraceShard[];
  byJobId: Record<string, FrontierSwarmTraceShard[]>;
  bySubject: Record<string, FrontierSwarmTraceShard[]>;
  byRegion: Record<string, FrontierSwarmTraceShard[]>;
  bySourcePath: Record<string, FrontierSwarmTraceShard[]>;
  summary: {
    shardCount: number;
    rowWindowCount: number;
    hypothesisCount: number;
    executableOwnershipRegionCount: number;
    focusedTestCount: number;
    referenceEvidenceCount: number;
    divergenceCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmTraceIndexQuery {
  jobId?: string;
  lane?: string;
  subject?: string;
  region?: string;
  sourcePath?: string;
  status?: FrontierSwarmTraceShardStatus;
  minConfidence?: number;
  hasDivergence?: boolean;
  textIncludes?: string;
}

export interface FrontierSwarmTraceIndexQueryResult {
  shards: FrontierSwarmTraceShard[];
  summary: {
    shardCount: number;
    rowWindowCount: number;
    hypothesisCount: number;
    executableOwnershipRegionCount: number;
  };
}
