import type { JsonObject } from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_STRATEGY_CERTIFICATE_KIND,
  FRONTIER_SWARM_STRATEGY_CERTIFICATE_VERSION,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_KIND,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_VERSION
} from './constants.js';
import type {
  FrontierSwarmMergeBundle,
  FrontierSwarmMergeIndex
} from './merge-types.js';

export type FrontierSwarmPayoffDirection = 'maximize' | 'minimize' | string;
export type FrontierSwarmTournamentOutcome =
  | 'verified'
  | 'accepted'
  | 'candidate'
  | 'discovery'
  | 'rejected'
  | 'blocked'
  | 'undefined'
  | 'timeout'
  | 'error'
  | string;

export interface FrontierSwarmPayoffComponentInput {
  value: number;
  weight?: number;
  direction?: FrontierSwarmPayoffDirection;
  reason?: string;
  metadata?: unknown;
}

export interface FrontierSwarmPayoffComponentPolicyInput {
  weight?: number;
  direction?: FrontierSwarmPayoffDirection;
  min?: number;
  max?: number;
  unit?: string;
  description?: string;
  metadata?: unknown;
}

export interface FrontierSwarmPayoffComponentPolicy {
  weight: number;
  direction: FrontierSwarmPayoffDirection;
  min: number;
  max: number;
  unit?: string;
  description?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmPayoffComponent {
  value: number;
  normalized: number;
  weight: number;
  direction: FrontierSwarmPayoffDirection;
  reason?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmPayoffScoringPolicyInput {
  id?: string;
  title?: string;
  components?: Record<string, FrontierSwarmPayoffComponentPolicyInput>;
  outcomeMultipliers?: Record<string, number>;
  costWeights?: Record<string, number>;
  metadata?: unknown;
}

export interface FrontierSwarmPayoffScoringPolicy {
  id: string;
  title: string;
  components: Record<string, FrontierSwarmPayoffComponentPolicy>;
  outcomeMultipliers: Record<string, number>;
  costWeights: Record<string, number>;
  metadata?: JsonObject;
}

export interface FrontierSwarmStrategySearchInput {
  attempts?: number;
  durationMs?: number;
  tokens?: number;
  costUsd?: number;
  exploredStates?: number;
  strategyPath?: readonly string[];
  evidencePaths?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmStrategySearch {
  attempts: number;
  durationMs: number;
  tokens: number;
  costUsd: number;
  exploredStates: number;
  strategyPath: string[];
  evidencePaths: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmStrategyCertificateInput {
  id?: string;
  strategyId?: string;
  gameId?: string;
  replayable?: boolean;
  commands?: readonly string[];
  proofRefs?: readonly string[];
  traceRefs?: readonly string[];
  hashes?: Record<string, string>;
  durationMs?: number;
  evidencePaths?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmStrategyCertificate {
  kind: typeof FRONTIER_SWARM_STRATEGY_CERTIFICATE_KIND;
  version: typeof FRONTIER_SWARM_STRATEGY_CERTIFICATE_VERSION;
  id: string;
  strategyId?: string;
  gameId?: string;
  replayable: boolean;
  commands: string[];
  proofRefs: string[];
  traceRefs: string[];
  hashes: Record<string, string>;
  durationMs: number;
  evidencePaths: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmPayoffVectorInput {
  id?: string;
  strategyId: string;
  gameId?: string;
  matchId?: string;
  outcome?: FrontierSwarmTournamentOutcome;
  components?: Record<string, number | FrontierSwarmPayoffComponentInput>;
  penalties?: Record<string, number>;
  costs?: Record<string, number>;
  search?: FrontierSwarmStrategySearchInput;
  certificate?: FrontierSwarmStrategyCertificateInput;
  scoringPolicy?: FrontierSwarmPayoffScoringPolicyInput;
  evidencePaths?: readonly string[];
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmPayoffVector {
  id: string;
  strategyId: string;
  gameId?: string;
  matchId?: string;
  outcome: FrontierSwarmTournamentOutcome;
  components: Record<string, FrontierSwarmPayoffComponent>;
  penalties: Record<string, number>;
  costs: Record<string, number>;
  search: FrontierSwarmStrategySearch;
  certificate?: FrontierSwarmStrategyCertificate;
  scoringPolicy?: FrontierSwarmPayoffScoringPolicy;
  evidencePaths: string[];
  tags: string[];
  score: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmStrategyInput {
  id: string;
  title?: string;
  family?: string;
  lane?: string;
  description?: string;
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmStrategy {
  id: string;
  title: string;
  family?: string;
  lane?: string;
  description?: string;
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmStrategyGameInput {
  id: string;
  title?: string;
  objective?: string;
  fixtures?: readonly string[];
  ownershipRegions?: readonly string[];
  resources?: Record<string, number>;
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmStrategyGame {
  id: string;
  title: string;
  objective?: string;
  fixtures: string[];
  ownershipRegions: string[];
  resources: Record<string, number>;
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmStrategyMatchInput {
  id?: string;
  strategyId?: string;
  gameId?: string;
  opponentStrategyIds?: readonly string[];
  payoff: FrontierSwarmPayoffVector | FrontierSwarmPayoffVectorInput;
  evidencePaths?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmStrategyMatch {
  id: string;
  strategyId: string;
  gameId?: string;
  opponentStrategyIds: string[];
  payoff: FrontierSwarmPayoffVector;
  evidencePaths: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmStrategyStanding {
  strategyId: string;
  rank: number;
  score: number;
  matchCount: number;
  verifiedCount: number;
  rejectedCount: number;
  undefinedCount: number;
  searchCost: number;
  certificateCost: number;
  reviewCost: number;
  resourceCost: number;
  costBreakdown: Record<string, number>;
  componentMeans: Record<string, number>;
  evidencePaths: string[];
}

export interface FrontierSwarmStrategyTournamentInput {
  id?: string;
  title?: string;
  strategies?: readonly FrontierSwarmStrategyInput[];
  games?: readonly FrontierSwarmStrategyGameInput[];
  matches?: readonly FrontierSwarmStrategyMatchInput[];
  scoringPolicy?: FrontierSwarmPayoffScoringPolicyInput;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmStrategyTournament {
  kind: typeof FRONTIER_SWARM_STRATEGY_TOURNAMENT_KIND;
  version: typeof FRONTIER_SWARM_STRATEGY_TOURNAMENT_VERSION;
  id: string;
  title: string;
  generatedAt: number;
  strategies: FrontierSwarmStrategy[];
  games: FrontierSwarmStrategyGame[];
  matches: FrontierSwarmStrategyMatch[];
  standings: FrontierSwarmStrategyStanding[];
  byStrategy: Record<string, string[]>;
  byGame: Record<string, string[]>;
  scoringPolicy: FrontierSwarmPayoffScoringPolicy;
  summary: {
    strategyCount: number;
    gameCount: number;
    matchCount: number;
    verifiedCount: number;
    rejectedCount: number;
    undefinedCount: number;
    outcomeCounts: Record<string, number>;
    topStrategyId?: string;
    topScore?: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmStrategyTournamentQuery {
  strategyId?: string;
  gameId?: string;
  outcome?: FrontierSwarmTournamentOutcome;
  tag?: string;
  payoffTag?: string;
  strategyTag?: string;
  gameTag?: string;
  minScore?: number;
  maxScore?: number;
}

export interface FrontierSwarmMergeTournamentInput {
  id?: string;
  title?: string;
  gameId?: string;
  strategyMode?: 'bundle' | 'style' | string;
  bundles: readonly FrontierSwarmMergeBundle[];
  mergeIndex?: FrontierSwarmMergeIndex;
  generatedAt?: number;
  metadata?: unknown;
}
