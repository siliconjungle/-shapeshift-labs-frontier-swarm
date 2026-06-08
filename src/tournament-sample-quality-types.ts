export type FrontierSwarmTournamentSampleConfidence =
  | 'none'
  | 'thin'
  | 'limited'
  | 'decision-grade';

export interface FrontierSwarmTournamentSampleQuality {
  confidence: FrontierSwarmTournamentSampleConfidence;
  decisionGrade: boolean;
  strategyCount: number;
  activeStrategyCount: number;
  matchCount: number;
  minMatchesPerActiveStrategy: number;
  maxMatchesPerActiveStrategy: number;
  averageMatchesPerActiveStrategy: number;
  mergeUsefulOutcomeCount: number;
  discoveryOnlyOutcomeCount: number;
  longTailLikely: boolean;
  reasons: string[];
  recommendations: string[];
}
