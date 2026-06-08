import { uniqueStrings } from './internal.js';
import type {
  FrontierSwarmCoordinatorAdmissionStatus,
  FrontierSwarmCoordinatorDuplicateGroup,
  FrontierSwarmCoordinatorTraceSummary
} from './coordinator-dashboard-types.js';
import type { FrontierSwarmMergeBundle, FrontierSwarmMergeIndexEntry, FrontierSwarmTraceShard } from './index.js';

export function createCoordinatorTraceSummary(shards: readonly FrontierSwarmTraceShard[]): FrontierSwarmCoordinatorTraceSummary {
  const summary = summarizeCoordinatorTraceShards(shards);
  const openDivergenceCount = shards.filter((shard) => (
    shard.status === 'failed'
    || shard.divergence?.status === 'failed'
    || shard.divergence?.severity === 'error'
    || shard.divergence?.severity === 'critical'
  )).length;
  return {
    shardCount: summary.shardCount,
    rowWindowCount: summary.rowWindowCount,
    hypothesisCount: summary.hypothesisCount,
    executableOwnershipRegionCount: summary.executableOwnershipRegionCount,
    focusedTestCount: summary.focusedTestCount,
    referenceEvidenceCount: summary.referenceEvidenceCount,
    divergenceCount: summary.divergenceCount,
    openDivergenceCount
  };
}

export function scoreCoordinatorMergeJob(
  entry: FrontierSwarmMergeIndexEntry | undefined,
  bundle: FrontierSwarmMergeBundle | undefined,
  evidenceEntryCount: number,
  duplicateGroup: FrontierSwarmCoordinatorDuplicateGroup | undefined,
  admissionStatus: FrontierSwarmCoordinatorAdmissionStatus,
  admissionReasons: readonly string[],
  traceShards: readonly FrontierSwarmTraceShard[] = []
): { score: number; reasons: string[] } {
  if (!entry) return { score: 10, reasons: ['no-merge-index-entry'] };
  let score = entry.disposition === 'auto-mergeable' && entry.autoMergeable ? 85 : entry.disposition === 'needs-port' ? 60 : entry.disposition === 'discovery-only' ? 35 : 15;
  const reasons: string[] = [];
  if (entry.staleAgainstHead) {
    score -= 45;
    reasons.push('stale-against-head');
  }
  if (entry.conflictingJobIds.length) {
    score -= Math.min(35, 15 + entry.conflictingJobIds.length * 5);
    reasons.push('conflicting-changes');
  }
  if (entry.ownershipViolations.length) {
    score -= 40;
    reasons.push('ownership-violations');
  } else if (entry.changedPaths.length > 0 && entry.ownedFilesTouched.length >= entry.changedPaths.length) {
    score += 5;
    reasons.push('owned-paths-only');
  }
  if (entry.patchStatus === 'applies') {
    score += 6;
    reasons.push('patch-applies-cleanly');
  } else if (entry.patchStatus === 'missing') {
    score -= 12;
    reasons.push('missing-patch');
  } else if (entry.patchStatus === 'failed-check') {
    score -= 25;
    reasons.push('patch-apply-failed');
  }
  if (bundle?.commandsFailed.length) {
    score -= Math.min(35, 15 + bundle.commandsFailed.length * 10);
    reasons.push('failed-required-commands');
  }
  if (entry.evidencePaths.length === 0 && evidenceEntryCount === 0) {
    score -= 15;
    reasons.push('missing-evidence');
  }
  if (entry.riskLevel === 'high') {
    score -= 15;
    reasons.push('high-risk');
  } else if (entry.riskLevel === 'unknown') {
    score -= 8;
    reasons.push('unknown-risk');
  } else if (entry.riskLevel === 'medium') {
    score -= 5;
  }
  if (entry.changedPaths.length > 12) {
    score -= Math.min(14, entry.changedPaths.length - 12);
    reasons.push('large-path-surface');
  }
  if (entry.changedRegions.length > 0 && entry.conflictingJobIds.length === 0) {
    score += Math.min(5, entry.changedRegions.length);
    reasons.push('semantic-region-owned');
  }
  if (entry.disposition === 'needs-port') reasons.push('needs-human-port');
  if (entry.disposition === 'discovery-only') reasons.push('discovery-only');
  if (duplicateGroup) {
    score -= 12;
    reasons.push('duplicate-candidate');
  }
  if (admissionStatus === 'deferred') {
    score -= 10;
    reasons.push(...admissionReasons);
  }
  if (entry.semanticImport && entry.changedPaths.length > 0) {
    const symbols = entry.semanticImport.semanticIndex.symbols;
    const regions = entry.semanticImport.semanticSidecars.ownershipRegions;
    const dependencies = entry.semanticImport.dependencies?.total ?? 0;
    const errors = entry.semanticImport.errors;
    if (symbols > 0 && regions > 0) {
      score += 8;
      reasons.push('semantic-sidecar-usable');
    }
    if (dependencies > 0) {
      score += Math.min(6, dependencies);
      reasons.push('semantic-dependencies-indexed');
    } else if (symbols > 1) {
      score -= 3;
      reasons.push('semantic-dependencies-missing');
    }
    if (entry.semanticImport.semanticSidecars.empty > 0 || symbols === 0) {
      score -= 8;
      reasons.push('weak-semantic-sidecar');
    }
    if (errors > 0) {
      score -= Math.min(25, errors * 10);
      reasons.push('semantic-import-errors');
    }
  } else if (entry.changedPaths.length > 0) {
    score -= 5;
    reasons.push('missing-semantic-sidecar');
  }
  const traceSummary = createCoordinatorTraceSummary(traceShards);
  if (traceSummary.shardCount > 0) {
    score += Math.min(6, traceSummary.shardCount * 2);
    reasons.push('trace-shard-evidence');
  }
  if (traceSummary.referenceEvidenceCount > 0) {
    score += Math.min(6, traceSummary.referenceEvidenceCount * 2);
    reasons.push('reference-evidence-attached');
  }
  if (traceSummary.focusedTestCount > 0) {
    score += Math.min(6, traceSummary.focusedTestCount * 2);
    reasons.push('focused-tests-attached');
  }
  if (traceSummary.executableOwnershipRegionCount > 0) {
    score += Math.min(6, traceSummary.executableOwnershipRegionCount * 2);
    reasons.push('executable-ownership-regions');
  }
  if (traceSummary.openDivergenceCount > 0) {
    score -= Math.min(20, traceSummary.openDivergenceCount * 10);
    reasons.push('trace-divergence-open');
  }
  const conflictingAssumptionCount = traceShards.reduce((total, shard) => total + shard.executableOwnershipRegions.reduce((inner, region) => inner + region.conflictingAssumptions.length, 0), 0);
  if (conflictingAssumptionCount > 0) {
    score -= Math.min(16, conflictingAssumptionCount * 4);
    reasons.push('conflicting-trace-assumptions');
  }
  if (bundle?.commandsPassed.length) score += Math.min(8, bundle.commandsPassed.length * 2);
  return { score: clampScore(score), reasons: uniqueStrings(reasons) };
}

function summarizeCoordinatorTraceShards(shards: readonly FrontierSwarmTraceShard[]): Omit<FrontierSwarmCoordinatorTraceSummary, 'openDivergenceCount'> {
  return {
    shardCount: shards.length,
    rowWindowCount: shards.reduce((total, shard) => total + shard.rowWindows.length, 0),
    hypothesisCount: shards.reduce((total, shard) => total + shard.hypotheses.length, 0),
    executableOwnershipRegionCount: shards.reduce((total, shard) => total + shard.executableOwnershipRegions.length, 0),
    focusedTestCount: shards.reduce((total, shard) => total + shard.focusedTests.length, 0),
    referenceEvidenceCount: shards.reduce((total, shard) => total + shard.referenceEvidence.length, 0),
    divergenceCount: shards.filter((shard) => Boolean(shard.divergence)).length
  };
}

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}
