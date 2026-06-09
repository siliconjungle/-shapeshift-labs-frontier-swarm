import assert from 'node:assert';
import {
  createSwarmAdaptiveLoadPlan,
  createSwarmContextualBanditRecommendations,
  createSwarmPayoffVector,
  createSwarmStrategyTournament,
  createSwarmStrategyTournamentHistory,
  createSwarmTournamentAdaptiveFeedback,
  normalizeContextualBanditPolicy
} from './api.mjs';

const policy = normalizeContextualBanditPolicy({
  minPromoteMatches: 2,
  minPromoteVerified: 2,
  promoteReward: 0.7,
  demoteReward: 0.35,
  explorationWeight: 0.2
});
assert.strictEqual(policy.algorithm, 'deterministic-ucb1');

const tournament = createSwarmStrategyTournament({
  strategies: [
    { id: 'style:focused-copy', lane: 'harness', metadata: { concurrencyKey: 'surface-stable' } },
    { id: 'style:thin-promising', lane: 'research', metadata: { concurrencyKey: 'surface-new' } },
    { id: 'style:noisy-stale', lane: 'runtime', metadata: { concurrencyKey: 'surface-noisy' } }
  ],
  matches: [
    payoff('style:focused-copy', 'landed', { correctness: 1, evidence: 1, mergeCleanliness: 1 }),
    payoff('style:focused-copy', 'verified', { correctness: 1, evidence: 0.95, mergeCleanliness: 1 }),
    payoff('style:thin-promising', 'verified', { correctness: 0.9, evidence: 0.8 }),
    payoff('style:noisy-stale', 'stale', { correctness: 0.1, evidence: 0.2 }),
    payoff('style:noisy-stale', 'rejected', { correctness: 0, evidence: 0.1 }),
    payoff('style:noisy-stale', 'noisy', { correctness: 0.2, evidence: 0.1 })
  ],
  generatedAt: 1
});

const history = createSwarmStrategyTournamentHistory({ tournaments: [tournament], generatedAt: 2 });
const bandit = createSwarmContextualBanditRecommendations({ tournament, history, policy, generatedAt: 3 });
assert.strictEqual(bandit.kind, 'frontier.swarm.contextual-bandit-recommendations');
assert.strictEqual(bandit.algorithm, 'deterministic-ucb1');
assert.ok(bandit.summary.promoteCount >= 1);
assert.ok(bandit.summary.demoteCount >= 1);
assert.ok(bandit.summary.exploreCount >= 1);

const stableStrategy = byTarget(bandit, 'strategy', 'style:focused-copy');
const thinStrategy = byTarget(bandit, 'strategy', 'style:thin-promising');
const noisyLane = byTarget(bandit, 'lane', 'runtime');
assert.strictEqual(stableStrategy.action, 'promote');
assert.strictEqual(thinStrategy.action, 'explore');
assert.strictEqual(noisyLane.action, 'demote');
assert.ok(stableStrategy.score > noisyLane.score);
assert.ok(stableStrategy.reasonCodes.includes('reward-above-promotion-threshold'));
assert.ok(noisyLane.reasonCodes.includes('negative-rate-above-threshold'));

const feedback = createSwarmTournamentAdaptiveFeedback({
  tournament,
  history,
  banditPolicy: policy,
  generatedAt: 4
});
assert.ok(feedback.bandit);
assert.ok(feedback.recommendations.some((entry) => entry.reason.startsWith('bandit promote')));
assert.ok(feedback.recommendations.some((entry) => entry.reason.startsWith('bandit demote')));
assert.ok(feedback.observations.some((entry) => entry.kind === 'healthy-throughput' && entry.lane === 'harness'));
assert.ok(feedback.observations.some((entry) => entry.kind === 'strategy-underperforming' && entry.lane === 'runtime'));

const adaptive = createSwarmAdaptiveLoadPlan({
  mode: 'balanced',
  tournamentFeedback: feedback,
  maxLimits: { maxReadyJobs: 6, maxLaneConcurrency: { harness: 4, runtime: 4 } },
  currentLimits: { maxReadyJobs: 4, maxLaneConcurrency: { harness: 2, runtime: 4 } },
  generatedAt: 5
});
assert.ok((adaptive.effectiveLimits.maxLaneConcurrency.harness ?? 0) >= 2);
assert.ok((adaptive.effectiveLimits.maxLaneConcurrency.runtime ?? 4) < 4);

function payoff(strategyId, outcome, components) {
  return {
    payoff: createSwarmPayoffVector({
      strategyId,
      outcome,
      components,
      certificate: outcome === 'landed' || outcome === 'verified' ? { commands: ['npm test'] } : undefined
    })
  };
}

function byTarget(bandit, target, key) {
  const recommendation = bandit.recommendations.find((entry) => entry.target === target && entry.key === key);
  assert.ok(recommendation, `${target}:${key} recommendation missing`);
  return recommendation;
}
