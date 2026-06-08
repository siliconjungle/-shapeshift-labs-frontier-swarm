import { stableHash, toJsonObject } from './internal.js';
import { createSwarmPayoffVector, createSwarmStrategyTournament } from './tournament-runtime.js';
import type {
  FrontierSwarmMergeBundle,
  FrontierSwarmMergeIndexEntry
} from './merge-types.js';
import type {
  FrontierSwarmMergeTournamentInput,
  FrontierSwarmPayoffVector,
  FrontierSwarmStrategyInput,
  FrontierSwarmStrategyTournament,
  FrontierSwarmTournamentOutcome
} from './tournament-types.js';

export function createSwarmMergePayoffVector(
  bundle: FrontierSwarmMergeBundle,
  entry?: FrontierSwarmMergeIndexEntry,
  options: { strategyId?: string } = {}
): FrontierSwarmPayoffVector {
  const changedPaths = entry?.changedPaths ?? bundle.changedPaths;
  const changedRegions = entry?.changedRegions ?? bundle.changedRegions;
  const conflictCount = entry?.conflictingJobIds.length ?? 0;
  const semanticCoverage = semanticCoverageScore(bundle);
  const traceEvidence = Math.min(1, bundle.traceShards.length / 3);
  const evidence = Math.min(1, (bundle.evidencePaths.length + bundle.commandsPassed.length + bundle.traceShards.length) / 6);
  const failed = bundle.commandsFailed.length;
  const strategyId = options.strategyId ?? bundle.jobId;
  return createSwarmPayoffVector({
    strategyId,
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
      strategyId,
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
      jobId: bundle.jobId,
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
  const strategies = mergeTournamentStrategies(input.bundles, input.strategyMode);
  const strategyByJob = new Map(input.bundles.map((bundle) => [bundle.jobId, strategyForBundle(bundle, input.strategyMode)]));
  const matches = input.bundles.map((bundle) => {
    const strategy = strategyByJob.get(bundle.jobId) ?? strategyForBundle(bundle, input.strategyMode);
    const payoff = createSwarmMergePayoffVector(bundle, entriesByJob.get(bundle.jobId), { strategyId: strategy.id });
    return { id: bundle.id, strategyId: strategy.id, gameId, payoff: { ...payoff, gameId }, metadata: { jobId: bundle.jobId } };
  });
  return createSwarmStrategyTournament({
    id: input.id ?? 'swarm-merge-tournament:' + stableHash([input.bundles.map((bundle) => bundle.id), input.mergeIndex?.id, input.generatedAt]),
    title: input.title ?? 'Swarm Merge Tournament',
    strategies,
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
  if (bundle.commit) return 'landed';
  if (bundle.staleAgainstHead || entry?.staleAgainstHead) return 'stale';
  if (bundle.status === 'blocked') return 'blocked';
  if (bundle.status === 'failed' || bundle.commandsFailed.length > 0 || bundle.disposition === 'rejected') return 'rejected';
  if (isNoisyBundle(bundle)) return 'noisy';
  if (bundle.disposition === 'auto-mergeable' || bundle.mergeReadiness === 'verified-patch') return 'verified';
  if (bundle.disposition === 'needs-port' || bundle.mergeReadiness === 'patch-candidate') return 'candidate';
  if (bundle.disposition === 'discovery-only') return 'discovery';
  return 'undefined';
}

function mergeTournamentStrategies(
  bundles: readonly FrontierSwarmMergeBundle[],
  mode: FrontierSwarmMergeTournamentInput['strategyMode']
): FrontierSwarmStrategyInput[] {
  const byId = new Map<string, FrontierSwarmStrategyInput>();
  for (const bundle of bundles) {
    const strategy = strategyForBundle(bundle, mode);
    const existing = byId.get(strategy.id);
    byId.set(strategy.id, existing ? { ...existing, tags: uniqueTags(existing.tags, strategy.tags) } : strategy);
  }
  return Array.from(byId.values());
}

function strategyForBundle(
  bundle: FrontierSwarmMergeBundle,
  mode: FrontierSwarmMergeTournamentInput['strategyMode']
): FrontierSwarmStrategyInput {
  const concurrencyKey = bundleConcurrencyKey(bundle);
  if (mode !== 'style') return {
    id: bundle.jobId,
    title: bundle.title ?? bundle.jobId,
    lane: bundle.lane,
    tags: [bundle.disposition, bundle.mergeReadiness, bundle.riskLevel],
    ...(concurrencyKey ? { metadata: { concurrencyKey } } : {})
  };
  const metadata = toRecord(bundle.metadata);
  const explicit = toRecord(metadata.tournamentStrategy);
  const promptStyle = stringValue(explicit.promptStyle) ?? stringValue(metadata.promptStyle) ?? 'codex-default';
  const workspaceStyle = stringValue(explicit.workspaceStyle) ?? stringValue(metadata.workspaceStyle) ?? stringValue(metadata.workspaceMode) ?? 'unknown-workspace';
  const evidenceStyle = stringValue(explicit.evidenceStyle) ?? stringValue(metadata.evidenceStyle) ?? evidenceStyleForBundle(bundle);
  const id = stringValue(explicit.id) ?? stringValue(metadata.strategyId) ?? `style:${promptStyle}:${workspaceStyle}:${evidenceStyle}`;
  return {
    id,
    title: stringValue(explicit.title) ?? id,
    family: 'style',
    lane: bundle.lane,
    tags: [promptStyle, workspaceStyle, evidenceStyle, bundle.disposition, bundle.mergeReadiness],
    metadata: { promptStyle, workspaceStyle, evidenceStyle, ...(concurrencyKey ? { concurrencyKey } : {}) }
  };
}

function bundleConcurrencyKey(bundle: FrontierSwarmMergeBundle): string | undefined {
  const metadata = toRecord(bundle.metadata);
  const explicit = toRecord(metadata.tournamentStrategy);
  const adaptive = toRecord(metadata.adaptive);
  return stringValue(explicit.concurrencyKey)
    ?? stringValue(metadata.concurrencyKey)
    ?? stringValue(metadata.adaptiveConcurrencyKey)
    ?? stringValue(adaptive.concurrencyKey);
}

function evidenceStyleForBundle(bundle: FrontierSwarmMergeBundle): string {
  if (bundle.commandsPassed.length > 0 && bundle.commandsFailed.length === 0) return 'verified-evidence';
  if (bundle.evidencePaths.length > 0 || bundle.traceShards.length > 0) return 'structured-evidence';
  return 'missing-evidence';
}

function isNoisyBundle(bundle: FrontierSwarmMergeBundle): boolean {
  const metadata = toRecord(bundle.metadata);
  const logSummary = toRecord(metadata.logSummary);
  return stringValue(metadata.outputClass) === 'noisy'
    || (numberValue(metadata.outputBytes) ?? numberValue(logSummary.totalBytes) ?? 0) > 500000;
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

function uniqueTags(left: readonly string[] = [], right: readonly string[] = []): string[] {
  return Array.from(new Set([...left, ...right].filter((tag) => tag.length > 0))).sort();
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}
