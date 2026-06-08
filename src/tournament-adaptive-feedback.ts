import { toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmAdaptiveObservationInput } from './adaptive-load-types.js';
import type {
  FrontierSwarmStrategy,
  FrontierSwarmStrategyMatch,
  FrontierSwarmStrategyTournament
} from './tournament-types.js';
import type {
  FrontierSwarmStrategyTournamentComparison,
  FrontierSwarmStrategyTournamentHistory
} from './tournament-history-types.js';
import { tournamentSampleQualityObservations } from './tournament-sample-observations.js';

export interface FrontierSwarmStrategyContext {
  strategyId: string;
  lanes: string[];
  concurrencyKeys: string[];
  tags: string[];
  outcomeCounts: Record<string, number>;
  matchCount: number;
}

const HIGH_VALUE_OUTCOMES = ['landed', 'verified', 'accepted', 'accepted-clean'];
const STALE_OUTCOMES = ['stale'];
const NOISY_OUTCOMES = ['noisy'];
const DISCOVERY_OUTCOMES = ['discovery', 'discovery-only', 'undefined'];
const REJECTED_OUTCOMES = ['rejected', 'error', 'timeout', 'blocked'];

export function createTournamentAdaptiveObservations(input: {
  tournament?: FrontierSwarmStrategyTournament;
  history?: FrontierSwarmStrategyTournamentHistory;
  comparison?: FrontierSwarmStrategyTournamentComparison;
  generatedAt: number;
  scoreFloor: number;
  regressionThreshold: number;
}): FrontierSwarmAdaptiveObservationInput[] {
  const tournamentContext = strategyContextById(input.tournament);
  return [
    ...tournamentSampleQualityObservations(input.tournament, input.generatedAt),
    ...tournamentObservations(input.tournament, input.generatedAt, input.scoreFloor),
    ...historyObservations(input.history, input.generatedAt, input.scoreFloor),
    ...comparisonObservations(input.comparison, input.generatedAt, input.regressionThreshold, tournamentContext)
  ];
}

export function tournamentRecommendationAction(kind: string): 'increase' | 'decrease' | 'hold' | 'observe' {
  if (kind === 'healthy-throughput') return 'increase';
  if (
    kind === 'strategy-regression' ||
    kind === 'strategy-underperforming' ||
    kind === 'discovery-only-output' ||
    kind === 'stale-patch' ||
    kind === 'log-noise'
  ) return 'decrease';
  return 'observe';
}

function tournamentObservations(
  tournament: FrontierSwarmStrategyTournament | undefined,
  at: number,
  scoreFloor: number
): FrontierSwarmAdaptiveObservationInput[] {
  if (!tournament) return [];
  const contexts = strategyContextById(tournament);
  return tournament.standings.flatMap((standing) => {
    if (standing.matchCount === 0) return [];
    return strategyStandingObservations(
      contexts.get(standing.strategyId) ?? emptyStrategyContext(standing.strategyId),
      standing.score,
      at,
      scoreFloor,
      'tournament'
    );
  });
}

function historyObservations(
  history: FrontierSwarmStrategyTournamentHistory | undefined,
  at: number,
  scoreFloor: number
): FrontierSwarmAdaptiveObservationInput[] {
  if (!history) return [];
  return history.entries.flatMap((entry) => strategyStandingObservations({
    strategyId: entry.strategyId,
    lanes: entry.lanes,
    concurrencyKeys: entry.concurrencyKeys,
    tags: entry.tags,
    outcomeCounts: entry.outcomeCounts,
    matchCount: entry.matchCount
  }, entry.averageScore, at, scoreFloor, 'history', entry.scoreDelta));
}

function comparisonObservations(
  comparison: FrontierSwarmStrategyTournamentComparison | undefined,
  at: number,
  threshold: number,
  contexts: ReadonlyMap<string, FrontierSwarmStrategyContext>
): FrontierSwarmAdaptiveObservationInput[] {
  if (!comparison) return [];
  return comparison.entries.filter((entry) => entry.status === 'regressed' || entry.status === 'improved').flatMap((entry) => {
    const context = contexts.get(entry.strategyId) ?? emptyStrategyContext(entry.strategyId);
    return expandStrategyObservationTargets(context, {
      kind: entry.status === 'regressed' ? 'strategy-regression' : 'healthy-throughput',
      severity: entry.status === 'regressed' && Math.abs(entry.scoreDelta) >= threshold ? 'warning' : 'info',
      at,
      value: entry.scoreDelta,
      jobId: entry.strategyId,
      reason: entry.reasons[0] ?? entry.status,
      metadata: {
        source: 'comparison',
        strategyId: entry.strategyId,
        status: entry.status,
        scoreDelta: entry.scoreDelta
      }
    });
  });
}

export function strategyContextById(tournament: FrontierSwarmStrategyTournament | undefined): Map<string, FrontierSwarmStrategyContext> {
  const byId = new Map<string, FrontierSwarmStrategyContext>();
  if (!tournament) return byId;
  for (const strategy of tournament.strategies) {
    byId.set(strategy.id, mergeStrategyContext(emptyStrategyContext(strategy.id), contextFromStrategy(strategy)));
  }
  for (const match of tournament.matches) {
    byId.set(match.strategyId, mergeStrategyContext(byId.get(match.strategyId) ?? emptyStrategyContext(match.strategyId), contextFromMatch(match)));
  }
  return byId;
}

function emptyStrategyContext(strategyId: string): FrontierSwarmStrategyContext {
  return {
    strategyId,
    lanes: [],
    concurrencyKeys: [],
    tags: [],
    outcomeCounts: {},
    matchCount: 0
  };
}

function contextFromStrategy(strategy: FrontierSwarmStrategy): FrontierSwarmStrategyContext {
  return {
    strategyId: strategy.id,
    lanes: uniqueStrings([strategy.lane, ...metadataLanes(strategy.metadata)]),
    concurrencyKeys: metadataConcurrencyKeys(strategy.metadata),
    tags: uniqueStrings(strategy.tags),
    outcomeCounts: {},
    matchCount: 0
  };
}

function contextFromMatch(match: FrontierSwarmStrategyMatch): FrontierSwarmStrategyContext {
  return {
    strategyId: match.strategyId,
    lanes: uniqueStrings([...metadataLanes(match.metadata), ...metadataLanes(match.payoff.metadata)]),
    concurrencyKeys: uniqueStrings([...metadataConcurrencyKeys(match.metadata), ...metadataConcurrencyKeys(match.payoff.metadata)]),
    tags: uniqueStrings(match.payoff.tags),
    outcomeCounts: { [match.payoff.outcome]: 1 },
    matchCount: 1
  };
}

function mergeStrategyContext(left: FrontierSwarmStrategyContext, right: FrontierSwarmStrategyContext): FrontierSwarmStrategyContext {
  return {
    strategyId: left.strategyId,
    lanes: uniqueStrings([...left.lanes, ...right.lanes]),
    concurrencyKeys: uniqueStrings([...left.concurrencyKeys, ...right.concurrencyKeys]),
    tags: uniqueStrings([...left.tags, ...right.tags]),
    outcomeCounts: mergeOutcomeCounts([left.outcomeCounts, right.outcomeCounts]),
    matchCount: left.matchCount + right.matchCount
  };
}

function strategyStandingObservations(
  context: FrontierSwarmStrategyContext,
  score: number,
  at: number,
  scoreFloor: number,
  source: 'tournament' | 'history',
  scoreDelta = 0
): FrontierSwarmAdaptiveObservationInput[] {
  if (context.matchCount === 0) return [];
  const highValue = outcomeCount(context.outcomeCounts, HIGH_VALUE_OUTCOMES);
  const stale = outcomeCount(context.outcomeCounts, STALE_OUTCOMES);
  const noisy = outcomeCount(context.outcomeCounts, NOISY_OUTCOMES);
  const discovery = outcomeCount(context.outcomeCounts, DISCOVERY_OUTCOMES);
  const rejected = outcomeCount(context.outcomeCounts, REJECTED_OUTCOMES);
  const negative = stale + noisy + discovery + rejected;
  const observations: FrontierSwarmAdaptiveObservationInput[] = [];

  if (stale > 0 && (highValue === 0 || stale > highValue)) {
    observations.push(strategyObservation(context, 'stale-patch', outcomeSeverity(stale, context.matchCount), at, score, `strategy produced ${stale} stale outcome${stale === 1 ? '' : 's'}`, source, scoreFloor, scoreDelta));
  }
  if (noisy > 0 && (highValue === 0 || noisy > highValue)) {
    observations.push(strategyObservation(context, 'log-noise', outcomeSeverity(noisy, context.matchCount), at, score, `strategy produced ${noisy} noisy outcome${noisy === 1 ? '' : 's'}`, source, scoreFloor, scoreDelta));
  }
  if (discovery > 0 && highValue === 0) {
    observations.push(strategyObservation(context, 'discovery-only-output', outcomeSeverity(discovery, context.matchCount), at, score, `strategy produced ${discovery} discovery-only or undefined outcome${discovery === 1 ? '' : 's'}`, source, scoreFloor, scoreDelta));
  }
  if (observations.length === 0 && rejected > 0 && highValue === 0) {
    observations.push(strategyObservation(context, 'evidence-failure', outcomeSeverity(rejected, context.matchCount), at, score, `strategy produced ${rejected} rejected or blocked outcome${rejected === 1 ? '' : 's'}`, source, scoreFloor, scoreDelta));
  }
  if (observations.length === 0 && (score < scoreFloor || scoreDelta < 0)) {
    const kind = scoreDelta < 0 ? 'strategy-regression' : 'strategy-underperforming';
    observations.push(strategyObservation(context, kind, scoreDelta <= -10 || score < scoreFloor ? 'warning' : 'info', at, scoreDelta || score, `strategy score ${score}, delta ${scoreDelta}`, source, scoreFloor, scoreDelta));
  }
  if (highValue > 0 && score >= scoreFloor && highValue >= negative) {
    observations.push(strategyObservation(context, 'healthy-throughput', 'info', at, score, `strategy produced ${highValue} landed or verified outcome${highValue === 1 ? '' : 's'}`, source, scoreFloor, scoreDelta));
  }

  return observations.flatMap((observation) => expandStrategyObservationTargets(context, observation));
}

function strategyObservation(
  context: FrontierSwarmStrategyContext,
  kind: FrontierSwarmAdaptiveObservationInput['kind'],
  severity: FrontierSwarmAdaptiveObservationInput['severity'],
  at: number,
  value: number,
  reason: string,
  source: string,
  scoreFloor: number,
  scoreDelta: number
): FrontierSwarmAdaptiveObservationInput {
  return {
    kind,
    severity,
    at,
    value,
    jobId: context.strategyId,
    reason,
    metadata: {
      source,
      strategyId: context.strategyId,
      scoreFloor,
      scoreDelta,
      matchCount: context.matchCount,
      outcomeCounts: context.outcomeCounts,
      lanes: context.lanes,
      concurrencyKeys: context.concurrencyKeys,
      tags: context.tags
    }
  };
}

function expandStrategyObservationTargets(
  context: FrontierSwarmStrategyContext,
  observation: FrontierSwarmAdaptiveObservationInput
): FrontierSwarmAdaptiveObservationInput[] {
  const targets: { lane?: string; concurrencyKey?: string; target: 'lane' | 'concurrency-key' }[] = [
    ...context.lanes.map((lane) => ({ lane, target: 'lane' as const })),
    ...context.concurrencyKeys.map((concurrencyKey) => ({ concurrencyKey, target: 'concurrency-key' as const }))
  ];
  if (targets.length === 0) return [observation];
  return targets.map((target) => ({
    ...observation,
    ...(target.lane ? { lane: target.lane } : {}),
    ...(target.concurrencyKey ? { concurrencyKey: target.concurrencyKey } : {}),
    metadata: {
      ...(toJsonObject(observation.metadata) ?? {}),
      target: target.target
    }
  }));
}

function outcomeCount(counts: Record<string, number>, outcomes: readonly string[]): number {
  return outcomes.reduce((sum, outcome) => sum + (counts[outcome] ?? 0), 0);
}

function outcomeSeverity(count: number, matchCount: number): 'warning' | 'error' {
  return count / Math.max(1, matchCount) >= 0.75 ? 'error' : 'warning';
}

function mergeOutcomeCounts(records: readonly Record<string, number>[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const record of records) for (const [key, value] of Object.entries(record)) out[key] = (out[key] ?? 0) + value;
  return Object.fromEntries(Object.entries(out).sort(([left], [right]) => left.localeCompare(right)));
}

function metadataLanes(metadata: unknown): string[] {
  const record = toRecord(metadata);
  const adaptive = toRecord(record.adaptive);
  const tournamentStrategy = toRecord(record.tournamentStrategy);
  return uniqueStrings([
    stringValue(record.lane),
    stringValue(record.adaptiveLane),
    stringValue(adaptive.lane),
    stringValue(tournamentStrategy.lane)
  ]);
}

function metadataConcurrencyKeys(metadata: unknown): string[] {
  const record = toRecord(metadata);
  const adaptive = toRecord(record.adaptive);
  const tournamentStrategy = toRecord(record.tournamentStrategy);
  return uniqueStrings([
    stringValue(record.concurrencyKey),
    ...stringValues(record.concurrencyKeys),
    stringValue(record.adaptiveConcurrencyKey),
    ...stringValues(record.adaptiveConcurrencyKeys),
    stringValue(adaptive.concurrencyKey),
    ...stringValues(adaptive.concurrencyKeys),
    stringValue(tournamentStrategy.concurrencyKey),
    ...stringValues(tournamentStrategy.concurrencyKeys)
  ]);
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function stringValues(value: unknown): string[] {
  return Array.isArray(value) ? value.map(stringValue).filter((entry): entry is string => !!entry) : [];
}
