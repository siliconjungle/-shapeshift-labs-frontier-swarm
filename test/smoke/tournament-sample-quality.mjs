import assert from 'node:assert';
import {
  createSwarmPayoffVector,
  createSwarmStrategyTournament,
  createSwarmTournamentAdaptiveFeedback,
  createTournamentSampleQuality
} from './api.mjs';

const thinTournament = createSwarmStrategyTournament({
  id: 'thin-tournament',
  strategies: [{ id: 'timing-lane', lane: 'timing' }, { id: 'ppu-lane', lane: 'ppu' }],
  matches: [{
    payoff: createSwarmPayoffVector({
      strategyId: 'timing-lane',
      outcome: 'discovery-only',
      components: { novelty: 0.7, evidence: 0.2 },
      search: { durationMs: 950000 }
    })
  }],
  generatedAt: 11
});

assert.strictEqual(thinTournament.sampleQuality.confidence, 'thin');
assert.strictEqual(thinTournament.sampleQuality.decisionGrade, false);
assert.strictEqual(thinTournament.sampleQuality.mergeUsefulOutcomeCount, 0);
assert.ok(thinTournament.sampleQuality.longTailLikely);
assert.ok(thinTournament.sampleQuality.recommendations.some((entry) => entry.includes('smaller stricter shards')));
assert.strictEqual(createTournamentSampleQuality({
  strategyCount: 2,
  matches: thinTournament.matches,
  standings: thinTournament.standings
}).confidence, 'thin');

const thinFeedback = createSwarmTournamentAdaptiveFeedback({ tournament: thinTournament, generatedAt: 12 });
assert.ok(thinFeedback.observations.some((entry) => entry.kind === 'thin-tournament-sample'));
assert.ok(thinFeedback.recommendations.some((entry) => entry.action === 'observe' && entry.reason.includes('only 1 completed')));
