import type { JsonObject } from '@shapeshift-labs/frontier';
import type { FrontierSwarmAdaptiveObservationInput } from './adaptive-load-types.js';
import type {
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_COMPARISON_KIND,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_COMPARISON_VERSION,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_HISTORY_KIND,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_HISTORY_VERSION,
  FRONTIER_SWARM_TOURNAMENT_ADAPTIVE_FEEDBACK_KIND,
  FRONTIER_SWARM_TOURNAMENT_ADAPTIVE_FEEDBACK_VERSION
} from './constants.js';
import type { FrontierSwarmStrategyTournament } from './tournament-types.js';

export type FrontierSwarmTournamentTrendStatus =
  | 'new'
  | 'removed'
  | 'regressed'
  | 'improved'
  | 'stable';

export interface FrontierSwarmStrategyTournamentHistoryInput {
  id?: string;
  tournaments?: readonly FrontierSwarmStrategyTournament[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmStrategyTournamentHistoryEntry {
  strategyId: string;
  tournamentIds: string[];
  runCount: number;
  matchCount: number;
  verifiedCount: number;
  rejectedCount: number;
  undefinedCount: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  firstScore: number;
  latestScore: number;
  scoreDelta: number;
  latestRank?: number;
  lanes: string[];
  concurrencyKeys: string[];
  tags: string[];
  evidencePaths: string[];
  outcomeCounts: Record<string, number>;
}

export interface FrontierSwarmStrategyTournamentHistory {
  kind: typeof FRONTIER_SWARM_STRATEGY_TOURNAMENT_HISTORY_KIND;
  version: typeof FRONTIER_SWARM_STRATEGY_TOURNAMENT_HISTORY_VERSION;
  id: string;
  generatedAt: number;
  tournamentIds: string[];
  entries: FrontierSwarmStrategyTournamentHistoryEntry[];
  byStrategy: Record<string, FrontierSwarmStrategyTournamentHistoryEntry>;
  summary: {
    tournamentCount: number;
    strategyCount: number;
    matchCount: number;
    verifiedCount: number;
    rejectedCount: number;
    undefinedCount: number;
    topStrategyId?: string;
    topAverageScore?: number;
    regressedCount: number;
    improvedCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmStrategyTournamentComparisonInput {
  id?: string;
  baseline: FrontierSwarmStrategyTournament;
  current: FrontierSwarmStrategyTournament;
  scoreThreshold?: number;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmStrategyTournamentComparisonEntry {
  strategyId: string;
  status: FrontierSwarmTournamentTrendStatus;
  baselineRank?: number;
  currentRank?: number;
  rankDelta?: number;
  baselineScore?: number;
  currentScore?: number;
  scoreDelta: number;
  baselineMatchCount: number;
  currentMatchCount: number;
  baselineVerifiedCount: number;
  currentVerifiedCount: number;
  reasons: string[];
}

export interface FrontierSwarmStrategyTournamentComparison {
  kind: typeof FRONTIER_SWARM_STRATEGY_TOURNAMENT_COMPARISON_KIND;
  version: typeof FRONTIER_SWARM_STRATEGY_TOURNAMENT_COMPARISON_VERSION;
  id: string;
  baselineId: string;
  currentId: string;
  generatedAt: number;
  entries: FrontierSwarmStrategyTournamentComparisonEntry[];
  summary: {
    strategyCount: number;
    newCount: number;
    removedCount: number;
    regressedCount: number;
    improvedCount: number;
    stableCount: number;
    largestRegression?: number;
    largestImprovement?: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmTournamentAdaptiveFeedbackInput {
  id?: string;
  tournament?: FrontierSwarmStrategyTournament;
  history?: FrontierSwarmStrategyTournamentHistory;
  comparison?: FrontierSwarmStrategyTournamentComparison;
  scoreFloor?: number;
  regressionThreshold?: number;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmTournamentAdaptiveRecommendation {
  action: 'increase' | 'decrease' | 'hold' | 'observe' | string;
  target: 'strategy' | 'lane' | 'max-ready-jobs' | string;
  key?: string;
  reason: string;
  score?: number;
}

export interface FrontierSwarmTournamentAdaptiveFeedback {
  kind: typeof FRONTIER_SWARM_TOURNAMENT_ADAPTIVE_FEEDBACK_KIND;
  version: typeof FRONTIER_SWARM_TOURNAMENT_ADAPTIVE_FEEDBACK_VERSION;
  id: string;
  tournamentId?: string;
  historyId?: string;
  comparisonId?: string;
  generatedAt: number;
  observations: FrontierSwarmAdaptiveObservationInput[];
  recommendations: FrontierSwarmTournamentAdaptiveRecommendation[];
  summary: {
    observationCount: number;
    recommendationCount: number;
    reduceSignals: number;
    increaseSignals: number;
    holdSignals: number;
  };
  metadata?: JsonObject;
}
