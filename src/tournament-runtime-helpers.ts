import { uniqueStrings } from './internal.js';
import {
  costFromPayoff,
  isRejectedOutcome,
  isUndefinedOutcome,
  isVerifiedOutcome,
  round2
} from './tournament-scoring.js';
import type {
  FrontierSwarmPayoffVector,
  FrontierSwarmPayoffVectorInput,
  FrontierSwarmStrategy,
  FrontierSwarmStrategyGame,
  FrontierSwarmStrategyMatch,
  FrontierSwarmStrategyStanding,
  FrontierSwarmStrategyTournamentQuery
} from './tournament-types.js';

export function assertCompatibleId(label: string, expected: string | undefined, actual: string | undefined): void {
  if (expected && actual && expected !== actual) throw new Error(label + ' mismatch: expected ' + expected + ', received ' + actual);
}

export function countSwarmTournamentOutcomes(matches: readonly FrontierSwarmStrategyMatch[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const match of matches) counts[match.payoff.outcome] = (counts[match.payoff.outcome] ?? 0) + 1;
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

export function validateSwarmExistingPayoff(
  payoff: FrontierSwarmPayoffVector,
  strategyId: string | undefined,
  gameId: string | undefined
): FrontierSwarmPayoffVector {
  assertCompatibleId('match.strategyId', payoff.strategyId, strategyId);
  assertCompatibleId('match.gameId', payoff.gameId, gameId);
  assertCompatibleId('payoff.certificate.strategyId', payoff.strategyId, payoff.certificate?.strategyId);
  assertCompatibleId('payoff.certificate.gameId', payoff.gameId, payoff.certificate?.gameId);
  return payoff;
}

export function rankSwarmStrategyStandings(
  matches: readonly FrontierSwarmStrategyMatch[],
  strategyIds: readonly string[]
): FrontierSwarmStrategyStanding[] {
  const byStrategy = new Map<string, FrontierSwarmStrategyMatch[]>();
  for (const id of strategyIds) byStrategy.set(id, []);
  for (const match of matches) byStrategy.set(match.strategyId, [...(byStrategy.get(match.strategyId) ?? []), match]);
  const standings = Array.from(byStrategy.entries()).map(([strategyId, strategyMatches]) => createStanding(strategyId, strategyMatches));
  standings.sort(compareStandings);
  return standings.map((standing, index) => ({ ...standing, rank: index + 1 }));
}

export function matchSwarmTournamentQuery(
  match: FrontierSwarmStrategyMatch,
  query: FrontierSwarmStrategyTournamentQuery,
  strategyById: Map<string, FrontierSwarmStrategy>,
  gameById: Map<string, FrontierSwarmStrategyGame>
): boolean {
  if (query.strategyId && match.strategyId !== query.strategyId) return false;
  if (query.gameId && match.gameId !== query.gameId) return false;
  if (query.outcome && match.payoff.outcome !== query.outcome) return false;
  if (query.payoffTag && !match.payoff.tags.includes(query.payoffTag)) return false;
  if (query.strategyTag && !strategyById.get(match.strategyId)?.tags.includes(query.strategyTag)) return false;
  if (query.gameTag && (!match.gameId || !gameById.get(match.gameId)?.tags.includes(query.gameTag))) return false;
  if (query.tag && !matchesAnyTag(match, query.tag, strategyById, gameById)) return false;
  if (query.minScore !== undefined && match.payoff.score < query.minScore) return false;
  if (query.maxScore !== undefined && match.payoff.score > query.maxScore) return false;
  return true;
}

export function groupSwarmTournamentMatchIds(
  matches: readonly FrontierSwarmStrategyMatch[],
  key: (match: FrontierSwarmStrategyMatch) => string,
  knownKeys: readonly string[] = []
): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  for (const knownKey of knownKeys) groups[knownKey] = [];
  for (const match of matches) groups[key(match)] = uniqueStrings([...(groups[key(match)] ?? []), match.id]);
  return groups;
}

export function isSwarmPayoffVector(value: FrontierSwarmPayoffVector | FrontierSwarmPayoffVectorInput): value is FrontierSwarmPayoffVector {
  return typeof (value as FrontierSwarmPayoffVector).score === 'number'
    && typeof (value as FrontierSwarmPayoffVector).outcome === 'string'
    && !!(value as FrontierSwarmPayoffVector).search;
}

function createStanding(strategyId: string, matches: readonly FrontierSwarmStrategyMatch[]): FrontierSwarmStrategyStanding {
  const score = matches.length ? round2(matches.reduce((sum, match) => sum + match.payoff.score, 0) / matches.length) : 0;
  return {
    strategyId,
    rank: 0,
    score,
    matchCount: matches.length,
    verifiedCount: matches.filter((match) => isVerifiedOutcome(match.payoff.outcome)).length,
    rejectedCount: matches.filter((match) => isRejectedOutcome(match.payoff.outcome)).length,
    undefinedCount: matches.filter((match) => isUndefinedOutcome(match.payoff.outcome)).length,
    searchCost: round2(matches.reduce((sum, match) => sum + costFromPayoff(match.payoff, 'search'), 0)),
    certificateCost: round2(matches.reduce((sum, match) => sum + costFromPayoff(match.payoff, 'certificate'), 0)),
    reviewCost: round2(matches.reduce((sum, match) => sum + costFromPayoff(match.payoff, 'review'), 0)),
    resourceCost: round2(matches.reduce((sum, match) => sum + costFromPayoff(match.payoff, 'resource'), 0)),
    costBreakdown: createCostBreakdown(matches),
    componentMeans: meanComponents(matches),
    evidencePaths: uniqueStrings(matches.flatMap((match) => match.evidencePaths))
  };
}

function compareStandings(left: FrontierSwarmStrategyStanding, right: FrontierSwarmStrategyStanding): number {
  return right.score - left.score
    || right.verifiedCount - left.verifiedCount
    || left.undefinedCount - right.undefinedCount
    || left.rejectedCount - right.rejectedCount
    || left.reviewCost - right.reviewCost
    || left.searchCost - right.searchCost
    || left.strategyId.localeCompare(right.strategyId);
}

function meanComponents(matches: readonly FrontierSwarmStrategyMatch[]): Record<string, number> {
  const sums: Record<string, { value: number; count: number }> = {};
  for (const match of matches) {
    for (const [name, component] of Object.entries(match.payoff.components)) {
      const current = sums[name] ?? { value: 0, count: 0 };
      sums[name] = { value: current.value + component.normalized, count: current.count + 1 };
    }
  }
  return Object.fromEntries(Object.entries(sums).map(([key, value]) => [key, round2(value.value / value.count)]));
}

function createCostBreakdown(matches: readonly FrontierSwarmStrategyMatch[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const match of matches) for (const [name, value] of Object.entries(match.payoff.costs)) out[name] = round2((out[name] ?? 0) + value);
  return Object.fromEntries(Object.entries(out).sort(([left], [right]) => left.localeCompare(right)));
}

function matchesAnyTag(
  match: FrontierSwarmStrategyMatch,
  tag: string,
  strategyById: Map<string, FrontierSwarmStrategy>,
  gameById: Map<string, FrontierSwarmStrategyGame>
): boolean {
  return match.payoff.tags.includes(tag)
    || !!strategyById.get(match.strategyId)?.tags.includes(tag)
    || !!gameById.get(match.gameId ?? '')?.tags.includes(tag);
}
