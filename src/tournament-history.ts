import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import {
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_COMPARISON_KIND,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_COMPARISON_VERSION,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_HISTORY_KIND,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_HISTORY_VERSION,
  FRONTIER_SWARM_TOURNAMENT_ADAPTIVE_FEEDBACK_KIND,
  FRONTIER_SWARM_TOURNAMENT_ADAPTIVE_FEEDBACK_VERSION
} from './constants.js';
import { round2 } from './tournament-scoring.js';
import type { FrontierSwarmAdaptiveObservationInput } from './adaptive-load-types.js';
import type {
  FrontierSwarmStrategy,
  FrontierSwarmStrategyStanding,
  FrontierSwarmStrategyTournament
} from './tournament-types.js';
import type {
  FrontierSwarmStrategyTournamentComparison,
  FrontierSwarmStrategyTournamentComparisonEntry,
  FrontierSwarmStrategyTournamentComparisonInput,
  FrontierSwarmStrategyTournamentHistory,
  FrontierSwarmStrategyTournamentHistoryEntry,
  FrontierSwarmStrategyTournamentHistoryInput,
  FrontierSwarmTournamentAdaptiveFeedback,
  FrontierSwarmTournamentAdaptiveFeedbackInput,
  FrontierSwarmTournamentTrendStatus
} from './tournament-history-types.js';

export function createSwarmStrategyTournamentHistory(
  input: FrontierSwarmStrategyTournamentHistoryInput = {}
): FrontierSwarmStrategyTournamentHistory {
  const generatedAt = input.generatedAt ?? Date.now();
  const tournaments = [...(input.tournaments ?? [])].sort((left, right) => left.generatedAt - right.generatedAt || left.id.localeCompare(right.id));
  const entries = summarizeHistoryEntries(tournaments);
  const top = entries[0];
  return {
    kind: FRONTIER_SWARM_STRATEGY_TOURNAMENT_HISTORY_KIND,
    version: FRONTIER_SWARM_STRATEGY_TOURNAMENT_HISTORY_VERSION,
    id: input.id ?? 'swarm-strategy-history:' + stableHash(tournaments.map((tournament) => tournament.id)),
    generatedAt,
    tournamentIds: tournaments.map((tournament) => tournament.id),
    entries,
    byStrategy: Object.fromEntries(entries.map((entry) => [entry.strategyId, entry])),
    summary: {
      tournamentCount: tournaments.length,
      strategyCount: entries.length,
      matchCount: entries.reduce((sum, entry) => sum + entry.matchCount, 0),
      verifiedCount: entries.reduce((sum, entry) => sum + entry.verifiedCount, 0),
      rejectedCount: entries.reduce((sum, entry) => sum + entry.rejectedCount, 0),
      undefinedCount: entries.reduce((sum, entry) => sum + entry.undefinedCount, 0),
      ...(top ? { topStrategyId: top.strategyId, topAverageScore: top.averageScore } : {}),
      regressedCount: entries.filter((entry) => entry.scoreDelta < 0).length,
      improvedCount: entries.filter((entry) => entry.scoreDelta > 0).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function compareSwarmStrategyTournaments(
  input: FrontierSwarmStrategyTournamentComparisonInput
): FrontierSwarmStrategyTournamentComparison {
  const generatedAt = input.generatedAt ?? Date.now();
  const threshold = Math.max(0, input.scoreThreshold ?? 5);
  const baseline = new Map(input.baseline.standings.map((standing) => [standing.strategyId, standing]));
  const current = new Map(input.current.standings.map((standing) => [standing.strategyId, standing]));
  const ids = uniqueStrings([...baseline.keys(), ...current.keys()]).sort();
  const entries = ids.map((strategyId) => compareStanding(strategyId, baseline.get(strategyId), current.get(strategyId), threshold))
    .sort(compareComparisonEntries);
  const regressions = entries.map((entry) => entry.scoreDelta).filter((score) => score < 0);
  const improvements = entries.map((entry) => entry.scoreDelta).filter((score) => score > 0);
  return {
    kind: FRONTIER_SWARM_STRATEGY_TOURNAMENT_COMPARISON_KIND,
    version: FRONTIER_SWARM_STRATEGY_TOURNAMENT_COMPARISON_VERSION,
    id: input.id ?? 'swarm-strategy-comparison:' + stableHash([input.baseline.id, input.current.id, threshold]),
    baselineId: input.baseline.id,
    currentId: input.current.id,
    generatedAt,
    entries,
    summary: {
      strategyCount: entries.length,
      newCount: entries.filter((entry) => entry.status === 'new').length,
      removedCount: entries.filter((entry) => entry.status === 'removed').length,
      regressedCount: entries.filter((entry) => entry.status === 'regressed').length,
      improvedCount: entries.filter((entry) => entry.status === 'improved').length,
      stableCount: entries.filter((entry) => entry.status === 'stable').length,
      ...(regressions.length ? { largestRegression: Math.min(...regressions) } : {}),
      ...(improvements.length ? { largestImprovement: Math.max(...improvements) } : {})
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmTournamentAdaptiveFeedback(
  input: FrontierSwarmTournamentAdaptiveFeedbackInput = {}
): FrontierSwarmTournamentAdaptiveFeedback {
  const generatedAt = input.generatedAt ?? Date.now();
  const observations: FrontierSwarmAdaptiveObservationInput[] = [
    ...tournamentObservations(input.tournament, generatedAt, input.scoreFloor ?? 40),
    ...historyObservations(input.history, generatedAt, input.scoreFloor ?? 40),
    ...comparisonObservations(input.comparison, generatedAt, input.regressionThreshold ?? 5)
  ];
  const recommendations = observations.map((observation) => ({
    action: recommendationAction(observation.kind),
    target: observation.lane ? 'lane' : observation.jobId ? 'strategy' : 'max-ready-jobs',
    key: observation.lane ?? observation.jobId,
    reason: observation.reasons?.[0] ?? observation.reason ?? observation.kind,
    score: observation.value
  }));
  return {
    kind: FRONTIER_SWARM_TOURNAMENT_ADAPTIVE_FEEDBACK_KIND,
    version: FRONTIER_SWARM_TOURNAMENT_ADAPTIVE_FEEDBACK_VERSION,
    id: input.id ?? 'swarm-tournament-feedback:' + stableHash([input.tournament?.id, input.history?.id, input.comparison?.id, generatedAt]),
    ...(input.tournament ? { tournamentId: input.tournament.id } : {}),
    ...(input.history ? { historyId: input.history.id } : {}),
    ...(input.comparison ? { comparisonId: input.comparison.id } : {}),
    generatedAt,
    observations,
    recommendations,
    summary: {
      observationCount: observations.length,
      recommendationCount: recommendations.length,
      reduceSignals: recommendations.filter((entry) => entry.action === 'decrease').length,
      increaseSignals: recommendations.filter((entry) => entry.action === 'increase').length,
      holdSignals: recommendations.filter((entry) => entry.action === 'hold').length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function summarizeHistoryEntries(tournaments: readonly FrontierSwarmStrategyTournament[]): FrontierSwarmStrategyTournamentHistoryEntry[] {
  const strategies = new Map<string, FrontierSwarmStrategy>();
  for (const tournament of tournaments) for (const strategy of tournament.strategies) strategies.set(strategy.id, strategy);
  return uniqueStrings(tournaments.flatMap((tournament) => tournament.standings.map((standing) => standing.strategyId))).map((strategyId) => {
    const standings = tournaments.map((tournament) => ({ tournament, standing: tournament.standings.find((entry) => entry.strategyId === strategyId) })).filter((entry): entry is { tournament: FrontierSwarmStrategyTournament; standing: FrontierSwarmStrategyStanding } => !!entry.standing);
    return historyEntry(strategyId, standings, strategies.get(strategyId));
  }).sort((left, right) => right.averageScore - left.averageScore || left.strategyId.localeCompare(right.strategyId));
}

function historyEntry(
  strategyId: string,
  standings: readonly { tournament: FrontierSwarmStrategyTournament; standing: FrontierSwarmStrategyStanding }[],
  strategy?: FrontierSwarmStrategy
): FrontierSwarmStrategyTournamentHistoryEntry {
  const scores = standings.map((entry) => entry.standing.score);
  const first = standings[0]?.standing;
  const latest = standings[standings.length - 1]?.standing;
  const outcomes = mergeOutcomeCounts(standings.map((entry) => entry.tournament.summary.outcomeCounts));
  return {
    strategyId,
    tournamentIds: standings.map((entry) => entry.tournament.id),
    runCount: standings.length,
    matchCount: standings.reduce((sum, entry) => sum + entry.standing.matchCount, 0),
    verifiedCount: standings.reduce((sum, entry) => sum + entry.standing.verifiedCount, 0),
    rejectedCount: standings.reduce((sum, entry) => sum + entry.standing.rejectedCount, 0),
    undefinedCount: standings.reduce((sum, entry) => sum + entry.standing.undefinedCount, 0),
    averageScore: round2(scores.reduce((sum, score) => sum + score, 0) / Math.max(1, scores.length)),
    bestScore: scores.length ? Math.max(...scores) : 0,
    worstScore: scores.length ? Math.min(...scores) : 0,
    firstScore: first?.score ?? 0,
    latestScore: latest?.score ?? 0,
    scoreDelta: round2((latest?.score ?? 0) - (first?.score ?? 0)),
    ...(latest ? { latestRank: latest.rank } : {}),
    lanes: uniqueStrings([strategy?.lane]),
    tags: uniqueStrings(strategy?.tags ?? []),
    evidencePaths: uniqueStrings(standings.flatMap((entry) => entry.standing.evidencePaths)),
    outcomeCounts: outcomes
  };
}

function compareStanding(
  strategyId: string,
  baseline: FrontierSwarmStrategyStanding | undefined,
  current: FrontierSwarmStrategyStanding | undefined,
  threshold: number
): FrontierSwarmStrategyTournamentComparisonEntry {
  const scoreDelta = round2((current?.score ?? 0) - (baseline?.score ?? 0));
  const status: FrontierSwarmTournamentTrendStatus = !baseline ? 'new' : !current ? 'removed' : scoreDelta <= -threshold ? 'regressed' : scoreDelta >= threshold ? 'improved' : 'stable';
  const rankDelta = baseline && current ? baseline.rank - current.rank : undefined;
  return {
    strategyId,
    status,
    ...(baseline ? { baselineRank: baseline.rank, baselineScore: baseline.score } : {}),
    ...(current ? { currentRank: current.rank, currentScore: current.score } : {}),
    ...(rankDelta !== undefined ? { rankDelta } : {}),
    scoreDelta,
    baselineMatchCount: baseline?.matchCount ?? 0,
    currentMatchCount: current?.matchCount ?? 0,
    baselineVerifiedCount: baseline?.verifiedCount ?? 0,
    currentVerifiedCount: current?.verifiedCount ?? 0,
    reasons: comparisonReasons(status, scoreDelta, rankDelta)
  };
}

function tournamentObservations(tournament: FrontierSwarmStrategyTournament | undefined, at: number, scoreFloor: number): FrontierSwarmAdaptiveObservationInput[] {
  if (!tournament) return [];
  return tournament.standings.filter((standing) => standing.matchCount > 0 && standing.score < scoreFloor).map((standing) => ({
    kind: standing.verifiedCount === 0 ? 'discovery-only-output' : 'strategy-underperforming',
    severity: 'warning',
    at,
    value: standing.score,
    jobId: standing.strategyId,
    reason: `strategy score ${standing.score} is below floor ${scoreFloor}`
  }));
}

function historyObservations(history: FrontierSwarmStrategyTournamentHistory | undefined, at: number, scoreFloor: number): FrontierSwarmAdaptiveObservationInput[] {
  if (!history) return [];
  return history.entries.filter((entry) => entry.averageScore < scoreFloor || entry.scoreDelta < 0).map((entry) => ({
    kind: entry.scoreDelta < 0 ? 'strategy-regression' : 'strategy-underperforming',
    severity: entry.scoreDelta < -10 ? 'warning' : 'info',
    at,
    value: entry.scoreDelta,
    jobId: entry.strategyId,
    reason: `strategy average ${entry.averageScore}, delta ${entry.scoreDelta}`
  }));
}

function comparisonObservations(comparison: FrontierSwarmStrategyTournamentComparison | undefined, at: number, threshold: number): FrontierSwarmAdaptiveObservationInput[] {
  if (!comparison) return [];
  return comparison.entries.filter((entry) => entry.status === 'regressed' || entry.status === 'improved').map((entry) => ({
    kind: entry.status === 'regressed' ? 'strategy-regression' : 'healthy-throughput',
    severity: entry.status === 'regressed' && Math.abs(entry.scoreDelta) >= threshold ? 'warning' : 'info',
    at,
    value: entry.scoreDelta,
    jobId: entry.strategyId,
    reason: entry.reasons[0] ?? entry.status
  }));
}

function recommendationAction(kind: string): 'increase' | 'decrease' | 'hold' | 'observe' {
  if (kind === 'healthy-throughput') return 'increase';
  if (kind === 'strategy-regression' || kind === 'strategy-underperforming' || kind === 'discovery-only-output') return 'decrease';
  return 'observe';
}

function comparisonReasons(status: FrontierSwarmTournamentTrendStatus, scoreDelta: number, rankDelta?: number): string[] {
  return uniqueStrings([
    status,
    scoreDelta ? `score delta ${scoreDelta}` : undefined,
    rankDelta ? `rank delta ${rankDelta}` : undefined
  ]);
}

function compareComparisonEntries(left: FrontierSwarmStrategyTournamentComparisonEntry, right: FrontierSwarmStrategyTournamentComparisonEntry): number {
  return statusRank(left.status) - statusRank(right.status) || left.scoreDelta - right.scoreDelta || left.strategyId.localeCompare(right.strategyId);
}

function statusRank(status: FrontierSwarmTournamentTrendStatus): number {
  return { regressed: 0, removed: 1, new: 2, improved: 3, stable: 4 }[status] ?? 5;
}

function mergeOutcomeCounts(records: readonly Record<string, number>[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const record of records) for (const [key, value] of Object.entries(record)) out[key] = (out[key] ?? 0) + value;
  return Object.fromEntries(Object.entries(out).sort(([left], [right]) => left.localeCompare(right)));
}
