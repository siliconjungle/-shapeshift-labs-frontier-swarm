import type { JsonObject } from '@shapeshift-labs/frontier';
import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { groupObjects } from './record-helpers.js';
import type { FrontierSwarmDivergenceSeverity, FrontierSwarmMergeBundle } from './index.js';

export const FRONTIER_SWARM_AUTO_REVIEW_REPORT_KIND = 'frontier.swarm.auto-review-report';
export const FRONTIER_SWARM_AUTO_REVIEW_REPORT_VERSION = 1;

export type FrontierSwarmAutoReviewFindingKind =
  | 'stub-risk'
  | 'missing-evidence'
  | 'ownership-violation'
  | 'overlarge-patch'
  | 'weak-evidence'
  | 'strict-source-policy'
  | string;

export interface FrontierSwarmAutoReviewFindingInput {
  id?: string;
  jobId?: string;
  kind?: FrontierSwarmAutoReviewFindingKind;
  severity?: FrontierSwarmDivergenceSeverity;
  message: string;
  paths?: readonly string[];
  evidencePaths?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmAutoReviewFinding {
  id: string;
  jobId?: string;
  kind: FrontierSwarmAutoReviewFindingKind;
  severity: FrontierSwarmDivergenceSeverity;
  message: string;
  paths: string[];
  evidencePaths: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmAutoReviewReportInput {
  id?: string;
  bundles?: readonly FrontierSwarmMergeBundle[];
  findings?: readonly FrontierSwarmAutoReviewFindingInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmAutoReviewReport {
  kind: typeof FRONTIER_SWARM_AUTO_REVIEW_REPORT_KIND;
  version: typeof FRONTIER_SWARM_AUTO_REVIEW_REPORT_VERSION;
  id: string;
  generatedAt: number;
  findings: FrontierSwarmAutoReviewFinding[];
  byKind: Record<string, FrontierSwarmAutoReviewFinding[]>;
  summary: { findingCount: number; highSeverityCount: number };
  metadata?: JsonObject;
}

export function createSwarmAutoReviewReport(input: FrontierSwarmAutoReviewReportInput = {}): FrontierSwarmAutoReviewReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const derived = (input.bundles ?? []).flatMap((bundle) => deriveAutoReviewFindings(bundle, generatedAt));
  const findings = [...derived, ...(input.findings ?? []).map((finding) => normalizeAutoReviewFinding(finding, generatedAt))];
  const byKind = groupObjects(findings, (finding) => finding.kind);
  return {
    kind: FRONTIER_SWARM_AUTO_REVIEW_REPORT_KIND,
    version: FRONTIER_SWARM_AUTO_REVIEW_REPORT_VERSION,
    id: input.id ?? 'swarm-auto-review-report:' + stableHash([findings, generatedAt]),
    generatedAt,
    findings,
    byKind,
    summary: {
      findingCount: findings.length,
      highSeverityCount: findings.filter((finding) => finding.severity === 'error' || finding.severity === 'critical').length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function deriveAutoReviewFindings(bundle: FrontierSwarmMergeBundle, generatedAt: number): FrontierSwarmAutoReviewFinding[] {
  const findings: FrontierSwarmAutoReviewFinding[] = [];
  if (bundle.ownershipViolations.length) {
    findings.push(normalizeAutoReviewFinding({
      jobId: bundle.jobId,
      kind: 'ownership-violation',
      severity: 'error',
      message: 'Bundle changed paths outside its ownership lease.',
      paths: bundle.ownershipViolations,
      evidencePaths: bundle.evidencePaths
    }, generatedAt));
  }
  if (bundle.evidencePaths.length === 0 && bundle.changedPaths.length > 0) {
    findings.push(normalizeAutoReviewFinding({
      jobId: bundle.jobId,
      kind: 'missing-evidence',
      severity: 'warning',
      message: 'Patch bundle has changed paths but no evidence paths.',
      paths: bundle.changedPaths
    }, generatedAt));
  }
  if (bundle.changedPaths.length > 12) {
    findings.push(normalizeAutoReviewFinding({
      jobId: bundle.jobId,
      kind: 'overlarge-patch',
      severity: 'warning',
      message: 'Patch bundle touches many files and should be split or reviewed manually.',
      paths: bundle.changedPaths,
      evidencePaths: bundle.evidencePaths
    }, generatedAt));
  }
  return findings;
}

function normalizeAutoReviewFinding(input: FrontierSwarmAutoReviewFindingInput, generatedAt: number): FrontierSwarmAutoReviewFinding {
  return {
    id: input.id ?? 'swarm-auto-review-finding:' + stableHash([input.jobId, input.kind, input.message, input.paths, generatedAt]),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    kind: input.kind ?? 'weak-evidence',
    severity: input.severity ?? 'warning',
    message: input.message,
    paths: uniqueStrings(input.paths ?? []),
    evidencePaths: uniqueStrings(input.evidencePaths ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
