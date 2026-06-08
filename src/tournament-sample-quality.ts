import { uniqueStrings } from './internal.js';
import { isVerifiedOutcome, round2 } from './tournament-scoring.js';
import type { FrontierSwarmStrategyMatch, FrontierSwarmStrategyStanding } from './tournament-types.js';
import type { FrontierSwarmTournamentSampleQuality } from './tournament-sample-quality-types.js';

const DISCOVERY_ONLY_OUTCOMES = new Set(['discovery', 'discovery-only', 'undefined']);

export function createTournamentSampleQuality(input: {
  strategyCount: number;
  matches: readonly FrontierSwarmStrategyMatch[];
  standings: readonly FrontierSwarmStrategyStanding[];
}): FrontierSwarmTournamentSampleQuality {
  const activeStandings = input.standings.filter((standing) => standing.matchCount > 0);
  const counts = activeStandings.map((standing) => standing.matchCount);
  const matchCount = input.matches.length;
  const activeStrategyCount = activeStandings.length;
  const mergeUsefulOutcomeCount = input.matches.filter((match) => isVerifiedOutcome(match.payoff.outcome)).length;
  const discoveryOnlyOutcomeCount = input.matches.filter((match) => DISCOVERY_ONLY_OUTCOMES.has(match.payoff.outcome)).length;
  const averageMatches = counts.length ? round2(counts.reduce((sum, count) => sum + count, 0) / counts.length) : 0;
  const longTailLikely = durationLongTailLikely(input.matches.map((match) => match.payoff.search.durationMs));
  const reasons = sampleQualityReasons({ input, matchCount, activeStrategyCount, mergeUsefulOutcomeCount, averageMatches, longTailLikely });
  const confidence = sampleConfidence(matchCount, activeStrategyCount, mergeUsefulOutcomeCount, averageMatches);
  return {
    confidence,
    decisionGrade: confidence === 'decision-grade',
    strategyCount: input.strategyCount,
    activeStrategyCount,
    matchCount,
    minMatchesPerActiveStrategy: counts.length ? Math.min(...counts) : 0,
    maxMatchesPerActiveStrategy: counts.length ? Math.max(...counts) : 0,
    averageMatchesPerActiveStrategy: averageMatches,
    mergeUsefulOutcomeCount,
    discoveryOnlyOutcomeCount,
    longTailLikely,
    reasons,
    recommendations: sampleQualityRecommendations(confidence, mergeUsefulOutcomeCount, longTailLikely)
  };
}

function sampleConfidence(matchCount: number, activeStrategies: number, useful: number, averageMatches: number): FrontierSwarmTournamentSampleQuality['confidence'] {
  if (matchCount === 0) return 'none';
  if (matchCount < 3 || activeStrategies < 2 || useful === 0) return 'thin';
  if (matchCount < 6 || averageMatches < 2) return 'limited';
  return 'decision-grade';
}

function sampleQualityReasons(input: {
  input: { strategyCount: number };
  matchCount: number;
  activeStrategyCount: number;
  mergeUsefulOutcomeCount: number;
  averageMatches: number;
  longTailLikely: boolean;
}): string[] {
  return uniqueStrings([
    input.matchCount === 0 ? 'no completed matches' : undefined,
    input.matchCount > 0 && input.matchCount < 3 ? `only ${input.matchCount} completed matches` : undefined,
    input.activeStrategyCount < Math.min(2, input.input.strategyCount) ? 'too few active strategies completed' : undefined,
    input.mergeUsefulOutcomeCount === 0 ? 'no merge-useful outcomes completed' : undefined,
    input.averageMatches > 0 && input.averageMatches < 2 ? 'less than two matches per active strategy' : undefined,
    input.longTailLikely ? 'completed matches show long-tail worker duration' : undefined
  ]);
}

function sampleQualityRecommendations(confidence: string, useful: number, longTailLikely: boolean): string[] {
  return uniqueStrings([
    confidence === 'thin' ? 'split broad or long-running lanes into smaller stricter shards before trusting standings' : undefined,
    useful === 0 ? 'require at least one verified, accepted, or landed bundle before using tournament results for scheduling decisions' : undefined,
    longTailLikely ? 'cap long-tail lanes separately or run a smaller proof wave before comparing strategies' : undefined,
    confidence === 'limited' ? 'collect more completed matches before treating top strategy as stable' : undefined
  ]);
}

function durationLongTailLikely(durations: readonly number[]): boolean {
  const values = durations.filter((value) => Number.isFinite(value) && value > 0).sort((left, right) => left - right);
  if (!values.length) return false;
  const median = values[Math.floor(values.length / 2)];
  const max = values[values.length - 1];
  return max >= 900000 || values.length >= 3 && median > 0 && max / median >= 4;
}
