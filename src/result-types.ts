import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FrontierSwarmSemanticImportSummary,
  FrontierSwarmSemanticImportSummaryInput
} from './semantic-types.js';
import type {
  FrontierSwarmJobStatus,
  FrontierSwarmMergeDisposition,
  FrontierSwarmMergeReadiness,
  FrontierSwarmRiskLevel
} from './status-types.js';

export interface FrontierSwarmJobResultInput {
  jobId: string;
  status?: FrontierSwarmJobStatus;
  mergeReadiness?: FrontierSwarmMergeReadiness;
  startedAt?: number;
  finishedAt?: number;
  exitCode?: number;
  signal?: string;
  changedPaths?: readonly string[];
  changedRegions?: readonly string[];
  ownershipViolations?: readonly string[];
  evidencePaths?: readonly string[];
  patchPath?: string;
  queueItemIds?: readonly string[];
  riskLevel?: FrontierSwarmRiskLevel;
  mergeDisposition?: FrontierSwarmMergeDisposition;
  verification?: readonly FrontierSwarmVerificationResultInput[];
  semanticImport?: FrontierSwarmSemanticImportSummaryInput;
  lastMessage?: string;
  error?: unknown;
  metadata?: unknown;
}

export interface FrontierSwarmVerificationResultInput {
  name?: string;
  command?: readonly string[];
  status?: number;
  durationMs?: number;
  stdoutTail?: readonly string[];
  stderrTail?: readonly string[];
  required?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmVerificationResult {
  name: string;
  command: string[];
  status?: number;
  durationMs?: number;
  stdoutTail: string[];
  stderrTail: string[];
  required: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmJobResult {
  jobId: string;
  status: FrontierSwarmJobStatus;
  mergeReadiness: FrontierSwarmMergeReadiness;
  startedAt?: number;
  finishedAt?: number;
  durationMs?: number;
  exitCode?: number;
  signal?: string;
  changedPaths: string[];
  changedRegions: string[];
  ownershipViolations: string[];
  evidencePaths: string[];
  patchPath?: string;
  queueItemIds: string[];
  riskLevel: FrontierSwarmRiskLevel;
  mergeDisposition: FrontierSwarmMergeDisposition;
  verification: FrontierSwarmVerificationResult[];
  semanticImport?: FrontierSwarmSemanticImportSummary;
  lastMessage?: string;
  error?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmOwnershipReport {
  ok: boolean;
  changedPaths: string[];
  allowedWrites: string[];
  violations: string[];
}
