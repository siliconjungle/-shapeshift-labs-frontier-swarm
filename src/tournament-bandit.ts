import {
  FRONTIER_SWARM_CONTEXTUAL_BANDIT_RECOMMENDATIONS_KIND,
  FRONTIER_SWARM_CONTEXTUAL_BANDIT_RECOMMENDATIONS_VERSION
} from './constants.js';
import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { isRejectedOutcome, isUndefinedOutcome, isVerifiedOutcome, round2 } from './tournament-scoring.js';
import { strategyContextById } from './tournament-adaptive-feedback.js';
import type { FrontierSwarmStrategyContext } from './tournament-adaptive-feedback.js';
import type {
  FrontierSwarmContextualBanditInput,
  FrontierSwarmContextualBanditPolicy,
  FrontierSwarmContextualBanditPolicyInput,
  FrontierSwarmContextualBanditRecommendations,
  FrontierSwarmBanditArmRecommendation,
  FrontierSwarmBanditTarget
} from './tournament-bandit-types.js';
import type { FrontierSwarmStrategyStanding } from './tournament-types.js';
import type { FrontierSwarmStrategyTournamentHistoryEntry } from './tournament-history-types.js';

interface ArmStats {
  target: FrontierSwarmBanditTarget;
  key: string;
  rewardSum: number;
  matchCount: number;
  verifiedCount: number;
  rejectedCount: number;
  undefinedCount: number;
  strategyIds: string[];
  lanes: string[];
  concurrencyKeys: string[];
  tags: string[];
  evidencePaths: string[];
  outcomeCounts: Record<string, number>;
}

export function normalizeContextualBanditPolicy(input: FrontierSwarmContextualBanditPolicyInput = {}): FrontierSwarmContextualBanditPolicy {
  return {
    algorithm: input.algorithm ?? 'deterministic-ucb1',
    explorationWeight: nonNegative(input.explorationWeight, 0.32),
    minPromoteMatches: positiveInteger(input.minPromoteMatches, 3),
    minPromoteVerified: positiveInteger(input.minPromoteVerified, 1),
    promoteReward: clamp01(input.promoteReward ?? 0.72),
    demoteReward: clamp01(input.demoteReward ?? 0.35),
    maxNegativeRate: clamp01(input.maxNegativeRate ?? 0.34),
    requireDecisionGradeForPromotion: input.requireDecisionGradeForPromotion ?? true,
    includeTargets: uniqueStrings(input.includeTargets ?? ['strategy', 'lane', 'concurrency-key']),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmContextualBanditRecommendations(
  input: FrontierSwarmContextualBanditInput = {}
): FrontierSwarmContextualBanditRecommendations {
  const generatedAt = input.generatedAt ?? Date.now();
  const policy = normalizeContextualBanditPolicy(input.policy);
  const stats = buildBanditArms(input, policy);
  const totalMatchCount = Math.max(1, stats.reduce((sum, arm) => sum + arm.matchCount, 0));
  const sampleQuality = input.tournament?.sampleQuality;
  const recommendations = stats.map((arm) => recommendArm(arm, policy, totalMatchCount, sampleQuality))
    .sort(compareRecommendations);
  const top = recommendations[0];
  return {
    kind: FRONTIER_SWARM_CONTEXTUAL_BANDIT_RECOMMENDATIONS_KIND,
    version: FRONTIER_SWARM_CONTEXTUAL_BANDIT_RECOMMENDATIONS_VERSION,
    id: input.id ?? 'swarm-contextual-bandit:' + stableHash([input.tournament?.id, input.history?.id, policy, generatedAt]),
    generatedAt,
    algorithm: policy.algorithm,
    ...(input.tournament ? { tournamentId: input.tournament.id } : {}),
    ...(input.history ? { historyId: input.history.id } : {}),
    policy,
    recommendations,
    byTarget: groupByTarget(recommendations),
    summary: {
      recommendationCount: recommendations.length,
      promoteCount: recommendations.filter((entry) => entry.action === 'promote').length,
      demoteCount: recommendations.filter((entry) => entry.action === 'demote').length,
      exploreCount: recommendations.filter((entry) => entry.action === 'explore').length,
      holdCount: recommendations.filter((entry) => entry.action === 'hold').length,
      totalMatchCount,
      ...(sampleQuality ? { sampleConfidence: sampleQuality.confidence, decisionGrade: sampleQuality.decisionGrade } : {}),
      ...(top ? { topRecommendationId: top.id, topScore: top.score } : {})
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function buildBanditArms(input: FrontierSwarmContextualBanditInput, policy: FrontierSwarmContextualBanditPolicy): ArmStats[] {
  const arms = new Map<string, ArmStats>();
  if (input.history) {
    for (const entry of input.history.entries) addHistoryEntry(arms, entry, policy);
  } else if (input.tournament) {
    const contexts = strategyContextById(input.tournament);
    for (const standing of input.tournament.standings) {
      addStanding(arms, standing, contexts.get(standing.strategyId), policy);
    }
  }
  return Array.from(arms.values()).filter((arm) => arm.matchCount > 0 || policy.includeTargets.includes(arm.target));
}

function addHistoryEntry(
  arms: Map<string, ArmStats>,
  entry: FrontierSwarmStrategyTournamentHistoryEntry,
  policy: FrontierSwarmContextualBanditPolicy
): void {
  const reward = clamp01(entry.averageScore / 100);
  const base = {
    rewardSum: reward * entry.matchCount,
    matchCount: entry.matchCount,
    verifiedCount: entry.verifiedCount,
    rejectedCount: entry.rejectedCount,
    undefinedCount: entry.undefinedCount,
    strategyIds: [entry.strategyId],
    lanes: entry.lanes,
    concurrencyKeys: entry.concurrencyKeys,
    tags: entry.tags,
    evidencePaths: entry.evidencePaths,
    outcomeCounts: entry.outcomeCounts
  };
  addTargets(arms, policy, entry.strategyId, base);
}

function addStanding(
  arms: Map<string, ArmStats>,
  standing: FrontierSwarmStrategyStanding,
  context: FrontierSwarmStrategyContext | undefined,
  policy: FrontierSwarmContextualBanditPolicy
): void {
  const base = {
    rewardSum: clamp01(standing.score / 100) * standing.matchCount,
    matchCount: standing.matchCount,
    verifiedCount: standing.verifiedCount,
    rejectedCount: standing.rejectedCount,
    undefinedCount: standing.undefinedCount,
    strategyIds: [standing.strategyId],
    lanes: context?.lanes ?? [],
    concurrencyKeys: context?.concurrencyKeys ?? [],
    tags: context?.tags ?? [],
    evidencePaths: standing.evidencePaths,
    outcomeCounts: context?.outcomeCounts ?? {}
  };
  addTargets(arms, policy, standing.strategyId, base);
}

function addTargets(arms: Map<string, ArmStats>, policy: FrontierSwarmContextualBanditPolicy, strategyId: string, base: Omit<ArmStats, 'target' | 'key'>): void {
  if (policy.includeTargets.includes('strategy')) addArm(arms, 'strategy', strategyId, base);
  if (policy.includeTargets.includes('lane')) for (const lane of base.lanes) addArm(arms, 'lane', lane, base);
  if (policy.includeTargets.includes('concurrency-key')) {
    for (const key of base.concurrencyKeys) addArm(arms, 'concurrency-key', key, base);
  }
}

function addArm(arms: Map<string, ArmStats>, target: FrontierSwarmBanditTarget, key: string, input: Omit<ArmStats, 'target' | 'key'>): void {
  const id = `${target}:${key}`;
  const current = arms.get(id) ?? emptyArm(target, key);
  arms.set(id, {
    ...current,
    rewardSum: current.rewardSum + input.rewardSum,
    matchCount: current.matchCount + input.matchCount,
    verifiedCount: current.verifiedCount + input.verifiedCount,
    rejectedCount: current.rejectedCount + input.rejectedCount,
    undefinedCount: current.undefinedCount + input.undefinedCount,
    strategyIds: uniqueStrings([...current.strategyIds, ...input.strategyIds]),
    lanes: uniqueStrings([...current.lanes, ...input.lanes]),
    concurrencyKeys: uniqueStrings([...current.concurrencyKeys, ...input.concurrencyKeys]),
    tags: uniqueStrings([...current.tags, ...input.tags]),
    evidencePaths: uniqueStrings([...current.evidencePaths, ...input.evidencePaths]),
    outcomeCounts: mergeOutcomeCounts(current.outcomeCounts, input.outcomeCounts)
  });
}

function recommendArm(
  arm: ArmStats,
  policy: FrontierSwarmContextualBanditPolicy,
  totalMatchCount: number,
  sampleQuality: { confidence: string; decisionGrade: boolean } | undefined
): FrontierSwarmBanditArmRecommendation {
  const rewardMean = arm.matchCount ? arm.rewardSum / arm.matchCount : 0;
  const explorationBonus = arm.matchCount ? policy.explorationWeight * Math.sqrt(Math.log(totalMatchCount + 1) / arm.matchCount) : policy.explorationWeight;
  const negativeRate = arm.matchCount ? (arm.rejectedCount + arm.undefinedCount) / arm.matchCount : 0;
  const confidence = clamp01(Math.min(arm.matchCount / policy.minPromoteMatches, 1) * (1 - negativeRate));
  const decisionGrade = sampleQuality?.decisionGrade;
  const action = banditAction(arm, policy, rewardMean, negativeRate, decisionGrade);
  const reasonCodes = banditReasons(arm, policy, rewardMean, negativeRate, action, decisionGrade);
  const score = round2((rewardMean + explorationBonus) * 100);
  return {
    id: 'swarm-bandit-arm:' + stableHash([arm.target, arm.key, arm.matchCount, rewardMean, explorationBonus, action]),
    target: arm.target,
    key: arm.key,
    action,
    score,
    rewardMean: round2(rewardMean),
    explorationBonus: round2(explorationBonus),
    confidence: round2(confidence),
    matchCount: arm.matchCount,
    totalMatchCount,
    verifiedCount: arm.verifiedCount,
    rejectedCount: arm.rejectedCount,
    undefinedCount: arm.undefinedCount,
    negativeRate: round2(negativeRate),
    ...(sampleQuality ? { sampleConfidence: sampleQuality.confidence, decisionGrade: sampleQuality.decisionGrade } : {}),
    strategyIds: arm.strategyIds,
    lanes: arm.lanes,
    concurrencyKeys: arm.concurrencyKeys,
    tags: arm.tags,
    outcomeCounts: arm.outcomeCounts,
    evidencePaths: arm.evidencePaths,
    reasonCodes
  };
}

function banditAction(arm: ArmStats, policy: FrontierSwarmContextualBanditPolicy, reward: number, negativeRate: number, decisionGrade: boolean | undefined): string {
  if (arm.matchCount < policy.minPromoteMatches) return reward >= policy.demoteReward ? 'explore' : 'hold';
  if (reward <= policy.demoteReward || negativeRate > policy.maxNegativeRate) return 'demote';
  if (policy.requireDecisionGradeForPromotion && decisionGrade === false) return reward >= policy.promoteReward ? 'explore' : 'hold';
  if (reward >= policy.promoteReward && arm.verifiedCount >= policy.minPromoteVerified) return 'promote';
  return 'hold';
}

function banditReasons(arm: ArmStats, policy: FrontierSwarmContextualBanditPolicy, reward: number, negativeRate: number, action: string, decisionGrade: boolean | undefined): string[] {
  return uniqueStrings([
    `${policy.algorithm}`,
    action,
    arm.matchCount < policy.minPromoteMatches ? 'sample-below-promotion-floor' : undefined,
    policy.requireDecisionGradeForPromotion && decisionGrade === false ? 'sample-not-decision-grade' : undefined,
    reward >= policy.promoteReward ? 'reward-above-promotion-threshold' : undefined,
    reward <= policy.demoteReward ? 'reward-below-demotion-threshold' : undefined,
    negativeRate > policy.maxNegativeRate ? 'negative-rate-above-threshold' : undefined,
    arm.verifiedCount >= policy.minPromoteVerified ? 'verified-sample-present' : undefined
  ]);
}

function emptyArm(target: FrontierSwarmBanditTarget, key: string): ArmStats {
  return { target, key, rewardSum: 0, matchCount: 0, verifiedCount: 0, rejectedCount: 0, undefinedCount: 0, strategyIds: [], lanes: [], concurrencyKeys: [], tags: [], evidencePaths: [], outcomeCounts: {} };
}

function groupByTarget(recommendations: readonly FrontierSwarmBanditArmRecommendation[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const recommendation of recommendations) out[recommendation.target] = uniqueStrings([...(out[recommendation.target] ?? []), recommendation.id]);
  return Object.fromEntries(Object.entries(out).sort(([left], [right]) => left.localeCompare(right)));
}

function mergeOutcomeCounts(left: Record<string, number>, right: Record<string, number>): Record<string, number> {
  const out = { ...left };
  for (const [key, value] of Object.entries(right)) out[key] = (out[key] ?? 0) + value;
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
}

function compareRecommendations(left: FrontierSwarmBanditArmRecommendation, right: FrontierSwarmBanditArmRecommendation): number {
  return actionRank(left.action) - actionRank(right.action) || right.score - left.score || left.target.localeCompare(right.target) || left.key.localeCompare(right.key);
}

function actionRank(action: string): number {
  return { promote: 0, explore: 1, demote: 2, hold: 3 }[action] ?? 4;
}

function clamp01(value: number): number { return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0)); }
function nonNegative(value: number | undefined, fallback: number): number { return Math.max(0, Number.isFinite(value) ? Number(value) : fallback); }
function positiveInteger(value: number | undefined, fallback: number): number {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : fallback;
}
