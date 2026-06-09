import type { JsonObject } from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_CONTEXTUAL_BANDIT_RECOMMENDATIONS_KIND,
  FRONTIER_SWARM_CONTEXTUAL_BANDIT_RECOMMENDATIONS_VERSION
} from './constants.js';
import type {
  FrontierSwarmStrategyTournament,
  FrontierSwarmTournamentOutcome
} from './tournament-types.js';
import type { FrontierSwarmStrategyTournamentHistory } from './tournament-history-types.js';

export type FrontierSwarmBanditAlgorithm = 'deterministic-ucb1' | string;
export type FrontierSwarmBanditTarget = 'strategy' | 'lane' | 'concurrency-key' | string;
export type FrontierSwarmBanditAction = 'promote' | 'demote' | 'hold' | 'explore' | string;

export interface FrontierSwarmContextualBanditPolicyInput {
  algorithm?: FrontierSwarmBanditAlgorithm;
  explorationWeight?: number;
  minPromoteMatches?: number;
  minPromoteVerified?: number;
  promoteReward?: number;
  demoteReward?: number;
  maxNegativeRate?: number;
  requireDecisionGradeForPromotion?: boolean;
  includeTargets?: readonly FrontierSwarmBanditTarget[];
  metadata?: unknown;
}

export interface FrontierSwarmContextualBanditPolicy {
  algorithm: FrontierSwarmBanditAlgorithm;
  explorationWeight: number;
  minPromoteMatches: number;
  minPromoteVerified: number;
  promoteReward: number;
  demoteReward: number;
  maxNegativeRate: number;
  requireDecisionGradeForPromotion: boolean;
  includeTargets: FrontierSwarmBanditTarget[];
  metadata?: JsonObject;
}

export interface FrontierSwarmContextualBanditInput {
  id?: string;
  tournament?: FrontierSwarmStrategyTournament;
  history?: FrontierSwarmStrategyTournamentHistory;
  policy?: FrontierSwarmContextualBanditPolicyInput;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBanditArmRecommendation {
  id: string;
  target: FrontierSwarmBanditTarget;
  key: string;
  action: FrontierSwarmBanditAction;
  score: number;
  rewardMean: number;
  explorationBonus: number;
  confidence: number;
  matchCount: number;
  totalMatchCount: number;
  verifiedCount: number;
  rejectedCount: number;
  undefinedCount: number;
  negativeRate: number;
  sampleConfidence?: string;
  decisionGrade?: boolean;
  strategyIds: string[];
  lanes: string[];
  concurrencyKeys: string[];
  tags: string[];
  outcomeCounts: Record<FrontierSwarmTournamentOutcome, number>;
  evidencePaths: string[];
  reasonCodes: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmContextualBanditRecommendations {
  kind: typeof FRONTIER_SWARM_CONTEXTUAL_BANDIT_RECOMMENDATIONS_KIND;
  version: typeof FRONTIER_SWARM_CONTEXTUAL_BANDIT_RECOMMENDATIONS_VERSION;
  id: string;
  generatedAt: number;
  algorithm: FrontierSwarmBanditAlgorithm;
  tournamentId?: string;
  historyId?: string;
  policy: FrontierSwarmContextualBanditPolicy;
  recommendations: FrontierSwarmBanditArmRecommendation[];
  byTarget: Record<string, string[]>;
  summary: {
    recommendationCount: number;
    promoteCount: number;
    demoteCount: number;
    exploreCount: number;
    holdCount: number;
    totalMatchCount: number;
    sampleConfidence?: string;
    decisionGrade?: boolean;
    topRecommendationId?: string;
    topScore?: number;
  };
  metadata?: JsonObject;
}
