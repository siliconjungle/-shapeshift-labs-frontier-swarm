import assert from 'node:assert';
import {
  createSwarmMergeBundle,
  createSwarmMergeIndex,
  createSwarmMergePayoffVector,
  createSwarmMergeTournament,
  createSwarmPayoffVector,
  createSwarmStrategyCertificate,
  createSwarmStrategyTournament,
  compareSwarmStrategyTournaments,
  createSwarmStrategyTournamentHistory,
  createSwarmTournamentAdaptiveFeedback,
  normalizeScoringPolicy,
  querySwarmStrategyTournament,
  scoreSwarmPayoffVector
} from './api.mjs';
import { scalePlan } from './fixtures/scale.mjs';

const certificate = createSwarmStrategyCertificate({
  strategyId: 'patch-with-trace',
  gameId: 'merge-admission',
  commands: ['npm test'],
  traceRefs: ['agent-runs/run/trace.jsonl'],
  durationMs: 1500,
  evidencePaths: ['agent-runs/run/evidence.json']
});
assert.strictEqual(certificate.kind, 'frontier.swarm.strategy-certificate');
assert.strictEqual(certificate.replayable, true);

const verified = createSwarmPayoffVector({
  strategyId: 'patch-with-trace',
  gameId: 'merge-admission',
  outcome: 'verified',
  components: {
    correctness: 1,
    evidence: 0.9,
    mergeCleanliness: 0.8,
    reviewCost: { value: 0.2, direction: 'minimize', weight: 0.5 }
  },
  costs: { review: 0.2, resource: 0.1 },
  search: { attempts: 8, durationMs: 12000, tokens: 24000, strategyPath: ['discover', 'patch', 'verify'] },
  certificate
});
assert.ok(verified.score > 70);
assert.strictEqual(scoreSwarmPayoffVector(verified), verified.score);

const undefinedPayoff = createSwarmPayoffVector({
  strategyId: 'discovery-only',
  gameId: 'merge-admission',
  outcome: 'undefined',
  components: { novelty: 1, evidence: 0.1 },
  penalties: { noCertificate: 0.4 }
});
assert.strictEqual(undefinedPayoff.score, 0);

const scoringPolicy = normalizeScoringPolicy({
  components: {
    latencyMs: { min: 0, max: 1000, direction: 'minimize', weight: 2 },
    correctness: { weight: 3 }
  },
  outcomeMultipliers: { customOutcome: 0.5 },
  costWeights: { review: 0.1 }
});
const policyPayoff = createSwarmPayoffVector({
  strategyId: 'policy-tested',
  gameId: 'merge-admission',
  outcome: 'customOutcome',
  scoringPolicy,
  components: { latencyMs: 200, correctness: 1 },
  costs: { review: 0.2 },
  tags: ['policy-payoff']
});
assert.strictEqual(policyPayoff.scoringPolicy.id, scoringPolicy.id);
assert.ok(policyPayoff.score > 30 && policyPayoff.score < 60);

const tournament = createSwarmStrategyTournament({
  id: 'merge-tournament',
  strategies: [
    { id: 'patch-with-trace', family: 'implementation', lane: 'runtime', tags: ['patch'] },
    { id: 'discovery-only', family: 'research', lane: 'discovery', tags: ['discovery'] },
    { id: 'declared-only', family: 'review', lane: 'review', tags: ['empty'] }
  ],
  games: [
    { id: 'merge-admission', objective: 'prefer compact replayable patches', ownershipRegions: ['runtime.timing'], tags: ['merge-game'] }
  ],
  matches: [
    { payoff: verified },
    { payoff: undefinedPayoff },
    { payoff: policyPayoff }
  ],
  scoringPolicy,
  generatedAt: 1
});
assert.strictEqual(tournament.kind, 'frontier.swarm.strategy-tournament');
assert.strictEqual(tournament.summary.topStrategyId, 'patch-with-trace');
assert.strictEqual(tournament.standings[0].rank, 1);
assert.strictEqual(tournament.summary.outcomeCounts.undefined, 1);
assert.strictEqual(tournament.byStrategy['declared-only'].length, 0);
assert.strictEqual(tournament.standings.find((standing) => standing.strategyId === 'declared-only').matchCount, 0);
assert.ok(tournament.standings[0].searchCost > tournament.standings[0].certificateCost);
assert.deepStrictEqual(tournament.byStrategy['patch-with-trace'], [tournament.matches[0].id]);

const queried = querySwarmStrategyTournament(tournament, { outcome: 'verified', minScore: 50 });
assert.strictEqual(queried.matches.length, 1);
assert.strictEqual(queried.summary.topStrategyId, 'patch-with-trace');
assert.strictEqual(querySwarmStrategyTournament(tournament, { tag: 'patch' }).matches.length, 1);
assert.strictEqual(querySwarmStrategyTournament(tournament, { gameTag: 'merge-game' }).matches.length, 3);
assert.strictEqual(querySwarmStrategyTournament(tournament, { payoffTag: 'policy-payoff' }).matches.length, 1);

assert.throws(() => createSwarmPayoffVector({
  strategyId: 'one',
  certificate: { strategyId: 'two' }
}), /certificate\.strategyId mismatch/);

assert.throws(() => createSwarmStrategyTournament({
  matches: [{
    strategyId: 'outer',
    payoff: verified
  }]
}), /match\.strategyId mismatch/);

const verifiedBundle = createSwarmMergeBundle({
  job: scalePlan.jobs[0],
  result: {
    jobId: scalePlan.jobs[0].id,
    status: 'verified',
    changedPaths: ['src/runtime/file.ts'],
    verification: [{ name: 'unit', status: 0 }]
  },
  patchPath: 'agent-runs/verified/changes.patch',
  riskLevel: 'low'
});
const staleBundle = createSwarmMergeBundle({
  job: scalePlan.jobs[1],
  result: {
    jobId: scalePlan.jobs[1].id,
    status: 'completed',
    changedPaths: ['src/runtime/stale.ts'],
    verification: []
  },
  staleAgainstHead: true,
  riskLevel: 'high'
});
const mergeIndex = createSwarmMergeIndex({ bundles: [verifiedBundle, staleBundle], generatedAt: 2 });
const mergePayoff = createSwarmMergePayoffVector(verifiedBundle, mergeIndex.entries[0]);
const stalePayoff = createSwarmMergePayoffVector(staleBundle, mergeIndex.entries[1]);
assert.strictEqual(mergePayoff.outcome, 'verified');
assert.ok(mergePayoff.score > stalePayoff.score);
const mergeTournament = createSwarmMergeTournament({
  bundles: [verifiedBundle, staleBundle],
  mergeIndex,
  generatedAt: 3
});
assert.strictEqual(mergeTournament.summary.matchCount, 2);
assert.strictEqual(mergeTournament.standings[0].strategyId, verifiedBundle.jobId);

const worseTournament = createSwarmStrategyTournament({
  id: 'merge-tournament-worse',
  strategies: tournament.strategies,
  games: tournament.games,
  matches: [
    {
      payoff: createSwarmPayoffVector({
        strategyId: 'patch-with-trace',
        gameId: 'merge-admission',
        outcome: 'rejected',
        components: { correctness: 0, evidence: 0.4 },
        costs: { review: 1 }
      })
    },
    tournament.matches[1]
  ],
  generatedAt: 4
});
const history = createSwarmStrategyTournamentHistory({ tournaments: [tournament, worseTournament], generatedAt: 5 });
assert.strictEqual(history.kind, 'frontier.swarm.strategy-tournament-history');
assert.strictEqual(history.summary.tournamentCount, 2);
assert.ok(history.byStrategy['patch-with-trace'].scoreDelta < 0);

const comparison = compareSwarmStrategyTournaments({
  baseline: tournament,
  current: worseTournament,
  generatedAt: 6,
  scoreThreshold: 5
});
assert.strictEqual(comparison.kind, 'frontier.swarm.strategy-tournament-comparison');
assert.ok(comparison.entries.some((entry) => entry.strategyId === 'patch-with-trace' && entry.status === 'regressed'));

const feedback = createSwarmTournamentAdaptiveFeedback({
  tournament: worseTournament,
  history,
  comparison,
  scoreFloor: 40,
  generatedAt: 7
});
assert.strictEqual(feedback.kind, 'frontier.swarm.tournament-adaptive-feedback');
assert.ok(feedback.observations.some((entry) => entry.kind === 'strategy-regression'));
assert.ok(feedback.recommendations.some((entry) => entry.action === 'decrease'));
