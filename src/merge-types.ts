import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_MERGE_BUNDLE_KIND,
  FRONTIER_SWARM_MERGE_BUNDLE_VERSION,
  FRONTIER_SWARM_MERGE_INDEX_KIND,
  FRONTIER_SWARM_MERGE_INDEX_VERSION,
  FRONTIER_SWARM_QUEUE_OVERLAY_KIND,
  FRONTIER_SWARM_QUEUE_OVERLAY_VERSION
} from './constants.js';
import type {
  FrontierSwarmJob
} from './plan.js';
import type {
  FrontierSwarmQueueJob,
  FrontierSwarmQueueSnapshot
} from './queue-types.js';
import type {
  FrontierSwarmJobResult,
  FrontierSwarmJobResultInput,
  FrontierSwarmVerificationResult
} from './result-types.js';
import type {
  FrontierSwarmSemanticImportSummary,
  FrontierSwarmSemanticImportSummaryInput
} from './semantic-types.js';
import type {
  FrontierSwarmJobStatus,
  FrontierSwarmMergeDisposition,
  FrontierSwarmMergeReadiness,
  FrontierSwarmPatchStatus,
  FrontierSwarmQueueOverlayStatus,
  FrontierSwarmRiskLevel
} from './status-types.js';
import type {
  FrontierSwarmTraceShard,
  FrontierSwarmTraceShardInput
} from './trace-types.js';

export interface FrontierSwarmMergeBundleInput {
  id?: string;
  runId?: string;
  planId?: string;
  job?: FrontierSwarmJob;
  result: FrontierSwarmJobResult | FrontierSwarmJobResultInput;
  patchPath?: string;
  patchHash?: string;
  evidencePaths?: readonly string[];
  queueItemIds?: readonly string[];
  riskLevel?: FrontierSwarmRiskLevel;
  disposition?: FrontierSwarmMergeDisposition;
  staleAgainstHead?: boolean;
  branchName?: string;
  commit?: string;
  semanticImport?: FrontierSwarmSemanticImportSummaryInput;
  traceShards?: readonly (FrontierSwarmTraceShard | FrontierSwarmTraceShardInput)[];
  metadata?: unknown;
  generatedAt?: number;
}

export interface FrontierSwarmMergeBundle {
  kind: typeof FRONTIER_SWARM_MERGE_BUNDLE_KIND;
  version: typeof FRONTIER_SWARM_MERGE_BUNDLE_VERSION;
  id: string;
  runId?: string;
  planId?: string;
  jobId: string;
  taskId?: string;
  lane?: string;
  title?: string;
  generatedAt: number;
  status: FrontierSwarmJobStatus;
  mergeReadiness: FrontierSwarmMergeReadiness;
  disposition: FrontierSwarmMergeDisposition;
  riskLevel: FrontierSwarmRiskLevel;
  autoMergeable: boolean;
  changedPaths: string[];
  changedRegions: string[];
  ownedFilesTouched: string[];
  allowedWrites: string[];
  ownershipViolations: string[];
  patchPath?: string;
  patchHash?: string;
  evidencePaths: string[];
  commandsPassed: FrontierSwarmVerificationResult[];
  commandsFailed: FrontierSwarmVerificationResult[];
  queueItemIds: string[];
  branchName?: string;
  commit?: string;
  staleAgainstHead: boolean;
  reasons: string[];
  semanticImport?: FrontierSwarmSemanticImportSummary;
  traceShards: FrontierSwarmTraceShard[];
  metadata?: JsonObject;
}

export interface FrontierSwarmQueueOverlayInput {
  id?: string;
  runId?: string;
  bundles?: readonly FrontierSwarmMergeBundle[];
  results?: readonly (FrontierSwarmJobResult | FrontierSwarmJobResultInput)[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmQueueOverlay {
  kind: typeof FRONTIER_SWARM_QUEUE_OVERLAY_KIND;
  version: typeof FRONTIER_SWARM_QUEUE_OVERLAY_VERSION;
  id: string;
  runId?: string;
  generatedAt: number;
  entries: FrontierSwarmQueueOverlayEntry[];
  byQueueItemId: Record<string, FrontierSwarmQueueOverlayEntry[]>;
  summary: {
    entryCount: number;
    queueItemCount: number;
    readyToApplyCount: number;
    needsHumanPortCount: number;
    failedEvidenceCount: number;
    staleAgainstHeadCount: number;
    discoveryOnlyCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmQueueOverlayEntry {
  queueItemId: string;
  jobId: string;
  status: FrontierSwarmQueueOverlayStatus;
  mergeReadiness: FrontierSwarmMergeReadiness;
  disposition: FrontierSwarmMergeDisposition;
  riskLevel: FrontierSwarmRiskLevel;
  patchPath?: string;
  evidencePaths: string[];
  changedPaths: string[];
  changedRegions: string[];
  reasons: string[];
  semanticImport?: FrontierSwarmSemanticImportSummary;
  generatedAt: number;
}

export interface FrontierSwarmDerivedQueueStatusInput {
  snapshot: FrontierSwarmQueueSnapshot;
  overlays?: readonly FrontierSwarmQueueOverlay[];
  generatedAt?: number;
}

export interface FrontierSwarmDerivedQueueStatus {
  generatedAt: number;
  jobs: FrontierSwarmQueueJob[];
  byStatus: Record<string, string[]>;
  summary: FrontierSwarmQueueSnapshot['summary'];
}

export interface FrontierSwarmMergeIndexInput {
  id?: string;
  runId?: string;
  planId?: string;
  bundles: readonly FrontierSwarmMergeBundle[];
  patchStatuses?: Record<string, FrontierSwarmPatchStatus>;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmMergeIndex {
  kind: typeof FRONTIER_SWARM_MERGE_INDEX_KIND;
  version: typeof FRONTIER_SWARM_MERGE_INDEX_VERSION;
  id: string;
  runId?: string;
  planId?: string;
  generatedAt: number;
  entries: FrontierSwarmMergeIndexEntry[];
  conflicts: FrontierSwarmMergeConflict[];
  byDisposition: Record<string, string[]>;
  byPath: Record<string, string[]>;
  byRegion: Record<string, string[]>;
  summary: {
    entryCount: number;
    readyToApplyCount: number;
    needsHumanPortCount: number;
    failedEvidenceCount: number;
    staleAgainstHeadCount: number;
    discoveryOnlyCount: number;
    conflictCount: number;
    conflictedJobCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmMergeIndexEntry {
  jobId: string;
  taskId?: string;
  lane?: string;
  title?: string;
  status: FrontierSwarmJobStatus;
  mergeReadiness: FrontierSwarmMergeReadiness;
  disposition: FrontierSwarmMergeDisposition;
  riskLevel: FrontierSwarmRiskLevel;
  patchStatus: FrontierSwarmPatchStatus;
  staleAgainstHead: boolean;
  autoMergeable: boolean;
  changedPaths: string[];
  changedRegions: string[];
  conflictKeys: string[];
  conflictingJobIds: string[];
  ownedFilesTouched: string[];
  ownershipViolations: string[];
  patchPath?: string;
  patchHash?: string;
  evidencePaths: string[];
  queueItemIds: string[];
  reasons: string[];
  semanticImport?: FrontierSwarmSemanticImportSummary;
  generatedAt: number;
}

export interface FrontierSwarmMergeConflict {
  jobIds: string[];
  key: string;
  kind: 'path' | 'region';
  path?: string;
  region?: string;
}

export interface FrontierSwarmRegionOwnershipInput {
  changedPaths?: readonly string[];
  changedRegions?: readonly string[];
}

export interface FrontierSwarmRegionOwnershipReport {
  ok: boolean;
  jobId: string;
  changedPaths: string[];
  changedRegions: string[];
  ownedRegions: string[];
  regionViolations: string[];
  unclassifiedChangedPaths: string[];
}
