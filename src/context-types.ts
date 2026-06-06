import type {
  JsonObject,
  JsonValue
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_CONTEXT_PACK_KIND,
  FRONTIER_SWARM_CONTEXT_PACK_VERSION,
  FRONTIER_SWARM_MERGE_ADMISSION_KIND,
  FRONTIER_SWARM_MERGE_ADMISSION_VERSION,
  FRONTIER_SWARM_ORACLE_CORPUS_KIND,
  FRONTIER_SWARM_ORACLE_CORPUS_VERSION,
  FRONTIER_SWARM_RUN_STORE_SHARDS_KIND,
  FRONTIER_SWARM_RUN_STORE_SHARDS_VERSION
} from './constants.js';
import type {
  FrontierSwarmCommand,
  FrontierSwarmCommandInput
} from './manifest-types.js';
import type {
  FrontierSwarmMergeIndex
} from './merge-types.js';
import type {
  FrontierSwarmJob,
  FrontierSwarmPlan
} from './plan.js';
import type {
  FrontierSwarmRun
} from './run-types.js';
import type {
  FrontierSwarmRiskLevel
} from './status-types.js';
import type {
  FrontierSwarmTask,
  FrontierSwarmTaskInput
} from './task-types.js';

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
