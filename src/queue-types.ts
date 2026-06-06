import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_ARTIFACT_INDEX_KIND,
  FRONTIER_SWARM_ARTIFACT_INDEX_VERSION,
  FRONTIER_SWARM_MERGE_PLAN_KIND,
  FRONTIER_SWARM_MERGE_PLAN_VERSION,
  FRONTIER_SWARM_QUEUE_SNAPSHOT_KIND,
  FRONTIER_SWARM_QUEUE_SNAPSHOT_VERSION,
  FRONTIER_SWARM_REVIEW_PLAN_KIND,
  FRONTIER_SWARM_REVIEW_PLAN_VERSION,
  FRONTIER_SWARM_RUN_CHECKPOINT_KIND,
  FRONTIER_SWARM_RUN_CHECKPOINT_VERSION
} from './constants.js';
import type {
  FrontierSwarmLease,
  FrontierSwarmLeaseInput,
  FrontierSwarmLeaseRenewalInput
} from './leases.js';
import type {
  FrontierSwarmCommandInput
} from './manifest-types.js';
import type {
  FrontierSwarmPlan
} from './plan.js';
import type {
  FrontierSwarmJobResultInput
} from './result-types.js';
import type {
  FrontierSwarmEventInput,
  FrontierSwarmRun
} from './run-types.js';
import type {
  FrontierSwarmJobStatus
} from './status-types.js';

export type FrontierSwarmQueueJobStatus =
  | 'ready'
  | 'leased'
  | 'running'
  | 'completed'
  | 'failed'
  | 'blocked'
  | 'retrying'
  | 'dead-letter'
  | string;

export interface FrontierSwarmQueueJobInput {
  jobId: string;
  taskId?: string;
  runId?: string;
  status?: FrontierSwarmQueueJobStatus;
  lane?: string;
  compute?: string;
  concurrencyKey?: string;
  priority?: number;
  attempts?: number;
  maxAttempts?: number;
  availableAt?: number;
  lease?: FrontierSwarmLease;
  lastError?: string;
  metadata?: unknown;
}

export interface FrontierSwarmQueueJob {
  jobId: string;
  taskId?: string;
  runId?: string;
  status: FrontierSwarmQueueJobStatus;
  lane?: string;
  compute?: string;
  concurrencyKey?: string;
  priority: number;
  attempts: number;
  maxAttempts: number;
  availableAt?: number;
  lease?: FrontierSwarmLease;
  lastError?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmQueueSnapshotInput {
  id?: string;
  plan: FrontierSwarmPlan;
  run?: FrontierSwarmRun;
  jobs?: readonly FrontierSwarmQueueJobInput[];
  leases?: readonly FrontierSwarmLease[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmQueueSnapshot {
  kind: typeof FRONTIER_SWARM_QUEUE_SNAPSHOT_KIND;
  version: typeof FRONTIER_SWARM_QUEUE_SNAPSHOT_VERSION;
  id: string;
  planId: string;
  runId: string;
  generatedAt: number;
  jobs: FrontierSwarmQueueJob[];
  byStatus: Record<string, string[]>;
  byLane: Record<string, string[]>;
  leases: FrontierSwarmLease[];
  metadata?: JsonObject;
  summary: {
    jobCount: number;
    leaseCount: number;
    readyCount: number;
    leasedCount: number;
    completedCount: number;
    failedCount: number;
    deadLetterCount: number;
  };
}

export interface FrontierSwarmQueueAdapter {
  snapshot(): FrontierSwarmQueueSnapshot | Promise<FrontierSwarmQueueSnapshot>;
  enqueue?(snapshot: FrontierSwarmQueueSnapshot): FrontierSwarmQueueSnapshot | Promise<FrontierSwarmQueueSnapshot>;
  lease?(input: FrontierSwarmLeaseInput): readonly FrontierSwarmLease[] | Promise<readonly FrontierSwarmLease[]>;
  renew?(input: FrontierSwarmLeaseRenewalInput): FrontierSwarmLease | Promise<FrontierSwarmLease>;
  complete?(result: FrontierSwarmJobResultInput): FrontierSwarmQueueSnapshot | Promise<FrontierSwarmQueueSnapshot>;
}

export interface FrontierSwarmRunCheckpointInput {
  run: FrontierSwarmRun;
  sequence?: number;
  savedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmRunCheckpoint {
  kind: typeof FRONTIER_SWARM_RUN_CHECKPOINT_KIND;
  version: typeof FRONTIER_SWARM_RUN_CHECKPOINT_VERSION;
  id: string;
  runId: string;
  planId: string;
  sequence: number;
  savedAt: number;
  status: FrontierSwarmJobStatus;
  eventCount: number;
  resultCount: number;
  hash: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmRunStoreAdapter {
  loadRun(runId: string): FrontierSwarmRun | undefined | Promise<FrontierSwarmRun | undefined>;
  saveRun(run: FrontierSwarmRun, checkpoint?: FrontierSwarmRunCheckpoint): void | Promise<void>;
  appendEvents?(runId: string, events: readonly FrontierSwarmEventInput[]): void | Promise<void>;
  appendResults?(runId: string, results: readonly FrontierSwarmJobResultInput[]): void | Promise<void>;
  checkpoint?(run: FrontierSwarmRun): FrontierSwarmRunCheckpoint | Promise<FrontierSwarmRunCheckpoint>;
}

export interface FrontierSwarmArtifactInput {
  jobId: string;
  path: string;
  kind?: string;
  bytes?: number;
  hash?: string;
  producedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmArtifact {
  jobId: string;
  path: string;
  kind: string;
  bytes?: number;
  hash?: string;
  producedAt?: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmArtifactIndex {
  kind: typeof FRONTIER_SWARM_ARTIFACT_INDEX_KIND;
  version: typeof FRONTIER_SWARM_ARTIFACT_INDEX_VERSION;
  id: string;
  generatedAt: number;
  artifacts: FrontierSwarmArtifact[];
  byJobId: Record<string, FrontierSwarmArtifact[]>;
  byKind: Record<string, FrontierSwarmArtifact[]>;
  summary: {
    artifactCount: number;
    jobCount: number;
    kindCount: number;
    totalBytes: number;
  };
}

export interface FrontierSwarmReviewPlan {
  kind: typeof FRONTIER_SWARM_REVIEW_PLAN_KIND;
  version: typeof FRONTIER_SWARM_REVIEW_PLAN_VERSION;
  id: string;
  planId: string;
  generatedAt: number;
  assignments: FrontierSwarmReviewAssignment[];
  summary: {
    assignmentCount: number;
    requiredCount: number;
    sampledCount: number;
  };
}

export interface FrontierSwarmReviewAssignment {
  jobId: string;
  taskId: string;
  reviewers: string[];
  required: boolean;
  reason: 'always-review' | 'sampled' | 'violations' | 'failed' | 'budget';
}

export interface FrontierSwarmMergePlan {
  kind: typeof FRONTIER_SWARM_MERGE_PLAN_KIND;
  version: typeof FRONTIER_SWARM_MERGE_PLAN_VERSION;
  id: string;
  planId: string;
  generatedAt: number;
  ready: string[];
  blocked: FrontierSwarmMergeBlocker[];
  groups: FrontierSwarmMergeGroup[];
  summary: {
    readyCount: number;
    blockedCount: number;
    groupCount: number;
  };
}

export interface FrontierSwarmMergeBlocker {
  jobId: string;
  reasons: string[];
  conflictingJobIds: string[];
}

export interface FrontierSwarmMergeGroup {
  id: string;
  jobIds: string[];
  changedPaths: string[];
}

export interface FrontierSwarmDecomposeInput {
  featureId: string;
  objective: string;
  lanes: readonly string[];
  files?: readonly string[];
  checks?: readonly (string | FrontierSwarmCommandInput)[];
  reviewers?: readonly string[];
  metadata?: unknown;
}
