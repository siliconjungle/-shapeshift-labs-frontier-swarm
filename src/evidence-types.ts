import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_BLACKBOARD_KIND,
  FRONTIER_SWARM_BLACKBOARD_VERSION,
  FRONTIER_SWARM_EVIDENCE_INDEX_KIND,
  FRONTIER_SWARM_EVIDENCE_INDEX_VERSION
} from './constants.js';
import type {
  FrontierSwarmRun
} from './run-types.js';
import type {
  FrontierSwarmBlackboardEntryKind,
  FrontierSwarmConfidence
} from './status-types.js';

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
