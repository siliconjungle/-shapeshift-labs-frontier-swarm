import type { FrontierSwarmAdaptiveObservationInput } from './adaptive-load-types.js';
import type { FrontierSwarmStrategyTournament } from './tournament-types.js';

export function tournamentSampleQualityObservations(
  tournament: FrontierSwarmStrategyTournament | undefined,
  at: number
): FrontierSwarmAdaptiveObservationInput[] {
  const quality = tournament?.sampleQuality;
  if (!quality || quality.decisionGrade) return [];
  const reason = quality.reasons[0] ?? 'tournament sample is not decision-grade';
  return [{
    kind: 'thin-tournament-sample',
    severity: 'info',
    at,
    value: quality.matchCount,
    reason,
    metadata: {
      tournamentId: tournament?.id,
      sampleQuality: quality,
      recommendations: quality.recommendations
    }
  }];
}
