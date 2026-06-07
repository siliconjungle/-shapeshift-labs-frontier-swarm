import { stableHash, toJsonObject } from './internal.js';
import { createSwarmPayoffVector, createSwarmStrategyTournament } from './tournament-runtime.js';
import type {
  FrontierSwarmMergeBundle,
  FrontierSwarmMergeIndexEntry
} from './merge-types.js';
import type {
  FrontierSwarmMergeTournamentInput,
  FrontierSwarmPayoffVector,
  FrontierSwarmStrategyTournament,
  FrontierSwarmTournamentOutcome
} from './tournament-types.js';

export function createSwarmMergePayoffVector(
  bundle: FrontierSwarmMergeBundle,
  entry?: FrontierSwarmMergeIndexEntry
): FrontierSwarmPayoffVector {
  const changedPaths = entry?.changedPaths ?? bundle.changedPaths;
  const changedRegions = entry?.changedRegions ?? bundle.changedRegions;
  const conflictCount = entry?.conflictingJobIds.length ?? 0;
  const semanticCoverage = semanticCoverageScore(bundle);
  const traceEvidence = Math.min(1, bundle.traceShards.length / 3);
  const evidence = Math.min(1, (bundle.evidencePaths.length + bundle.commandsPassed.length + bundle.traceShards.length) / 6);
  const failed = bundle.commandsFailed.length;
  return createSwarmPayoffVector({
    strategyId: bundle.jobId,
    gameId: 'merge-admission',
    matchId: bundle.id,
    outcome: outcomeForMergeBundle(bundle, entry),
    components: {
      correctness: failed === 0 && bundle.status !== 'failed' ? 1 : 0,
      evidence,
      mergeCleanliness: conflictCount === 0 && bundle.ownershipViolations.length === 0 && !bundle.staleAgainstHead ? 1 : 0,
      semanticCoverage,
      traceEvidence,
      reviewCost: { value: Math.min(1, (changedPaths.length + changedRegions.length * 2) / 20), direction: 'minimize', weight: 0.7 }
    },
    penalties: {
      stale: bundle.staleAgainstHead ? 0.45 : 0,
      conflicts: Math.min(0.5, conflictCount * 0.1),
      failedCommands: Math.min(0.5, failed * 0.15),
      ownership: Math.min(0.5, bundle.ownershipViolations.length * 0.2)
    },
    costs: {
      review: changedPaths.length + changedRegions.length * 2,
      resource: bundle.traceShards.length + bundle.commandsPassed.length + failed
    },
    certificate: bundle.commandsPassed.length || bundle.traceShards.length ? {
      strategyId: bundle.jobId,
      gameId: 'merge-admission',
      commands: bundle.commandsPassed.map((command) => command.name),
      traceRefs: bundle.traceShards.flatMap((shard) => shard.referenceEvidence.map((evidenceRef) => evidenceRef.path).filter((path): path is string => !!path)),
      evidencePaths: bundle.evidencePaths,
      replayable: bundle.commandsPassed.length > 0
    } : undefined,
    evidencePaths: bundle.evidencePaths,
    tags: [bundle.lane, bundle.disposition, bundle.mergeReadiness].filter((tag): tag is string => !!tag),
    metadata: toJsonObject({
      bundleId: bundle.id,
      patchPath: bundle.patchPath,
      patchHash: bundle.patchHash,
      riskLevel: bundle.riskLevel,
      entry
    })
  });
}

export function createSwarmMergeTournament(input: FrontierSwarmMergeTournamentInput): FrontierSwarmStrategyTournament {
  const entriesByJob = new Map((input.mergeIndex?.entries ?? []).map((entry) => [entry.jobId, entry]));
  const gameId = input.gameId ?? 'merge-admission';
  const matches = input.bundles.map((bundle) => {
    const payoff = createSwarmMergePayoffVector(bundle, entriesByJob.get(bundle.jobId));
    return { id: bundle.id, strategyId: bundle.jobId, gameId, payoff: { ...payoff, gameId } };
  });
  return createSwarmStrategyTournament({
    id: input.id ?? 'swarm-merge-tournament:' + stableHash([input.bundles.map((bundle) => bundle.id), input.mergeIndex?.id, input.generatedAt]),
    title: input.title ?? 'Swarm Merge Tournament',
    strategies: input.bundles.map((bundle) => ({
      id: bundle.jobId,
      title: bundle.title ?? bundle.jobId,
      lane: bundle.lane,
      tags: [bundle.disposition, bundle.mergeReadiness, bundle.riskLevel]
    })),
    games: [{ id: gameId, objective: 'Rank merge bundles by acceptance evidence and review cost' }],
    matches,
    generatedAt: input.generatedAt,
    metadata: input.metadata
  });
}

function outcomeForMergeBundle(
  bundle: FrontierSwarmMergeBundle,
  entry?: FrontierSwarmMergeIndexEntry
): FrontierSwarmTournamentOutcome {
  if (bundle.staleAgainstHead || entry?.staleAgainstHead) return 'undefined';
  if (bundle.status === 'blocked') return 'blocked';
  if (bundle.status === 'failed' || bundle.commandsFailed.length > 0 || bundle.disposition === 'rejected') return 'rejected';
  if (bundle.disposition === 'auto-mergeable' || bundle.mergeReadiness === 'verified-patch') return 'verified';
  if (bundle.disposition === 'needs-port' || bundle.mergeReadiness === 'patch-candidate') return 'candidate';
  if (bundle.disposition === 'discovery-only') return 'discovery';
  return 'undefined';
}

function semanticCoverageScore(bundle: FrontierSwarmMergeBundle): number {
  const semantic = bundle.semanticImport;
  if (!semantic) return 0;
  const symbols = semantic.semanticIndex.symbols;
  const regions = semantic.semanticSidecars.ownershipRegions;
  const dependencies = semantic.dependencies?.total ?? 0;
  const imported = semantic.imported;
  return Math.min(1, (symbols > 0 ? 0.3 : 0) + (regions > 0 ? 0.3 : 0) + (dependencies > 0 ? 0.2 : 0) + (imported > 0 ? 0.2 : 0));
}
