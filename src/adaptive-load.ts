import { cloneJsonValue, stableHash, toJsonObject } from './internal.js';
import { createSwarmSchedule } from './scheduler.js';
import {
  clampAdaptiveLimits,
  createAdaptiveCurrentLimits,
  createAdaptiveMaxLimits,
  createAdaptiveMinLimits
} from './adaptive-load-limits.js';
import {
  adaptiveDecisionKeyForObservation,
  adaptiveDecisionTargetForObservation,
  adaptiveObservationIsBottleneck,
  deriveAdaptiveAdmissionObservations,
  deriveAdaptiveDashboardObservations,
  deriveAdaptiveMergeIndexObservations,
  deriveAdaptiveRunObservations,
  deriveAdaptiveScheduleObservations,
  normalizeAdaptiveObservations
} from './adaptive-load-observations.js';
import { applyAdaptiveObservation, applyAdaptiveRecovery, createAdaptiveDecision } from './adaptive-load-decisions.js';
import {
  FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_KIND,
  FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_VERSION
} from './adaptive-load-types.js';
import type { FrontierSwarmPlan, FrontierSwarmScheduleLimits } from './plan.js';
import type { FrontierSwarmScheduleInput } from './scheduler.js';
import type { FrontierSwarmRun } from './index.js';
import type {
  FrontierSwarmAdaptiveLoadDecision,
  FrontierSwarmAdaptiveLoadPlan,
  FrontierSwarmAdaptiveLoadPlanInput
} from './adaptive-load-types.js';

export function createSwarmAdaptiveLoadPlan(input: FrontierSwarmAdaptiveLoadPlanInput = {}): FrontierSwarmAdaptiveLoadPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const mode = input.mode ?? 'balanced';
  const maxLimits = createAdaptiveMaxLimits(input);
  const minLimits = createAdaptiveMinLimits(input.minLimits, maxLimits);
  const currentLimits = clampAdaptiveLimits(createAdaptiveCurrentLimits(input.currentLimits, maxLimits), minLimits, maxLimits);
  const effectiveLimits = mode === 'off'
    ? cloneJsonValue(maxLimits) as FrontierSwarmScheduleLimits
    : cloneJsonValue(currentLimits) as FrontierSwarmScheduleLimits;
  const schedule = input.schedule ?? (input.plan ? createSwarmSchedule({ plan: input.plan, run: input.run }) : undefined);
  const observations = normalizeAdaptiveObservations([
    ...deriveAdaptiveScheduleObservations(schedule, generatedAt),
    ...deriveAdaptiveRunObservations(input.run, generatedAt),
    ...deriveAdaptiveMergeIndexObservations(input.mergeIndex, generatedAt),
    ...deriveAdaptiveDashboardObservations(input.dashboard, generatedAt),
    ...deriveAdaptiveAdmissionObservations(input.admission, generatedAt),
    ...(input.observations ?? [])
  ], generatedAt);
  const decisions: FrontierSwarmAdaptiveLoadDecision[] = [];
  const bottlenecks = observations.filter((observation) => adaptiveObservationIsBottleneck(observation));

  if (mode === 'observe') {
    for (const observation of bottlenecks) {
      decisions.push(createAdaptiveDecision({
        action: 'observe',
        target: adaptiveDecisionTargetForObservation(observation),
        key: adaptiveDecisionKeyForObservation(observation),
        reason: observation.reasons[0] ?? observation.kind,
        observationIds: [observation.id]
      }));
    }
  } else if (mode !== 'off') {
    for (const observation of bottlenecks) {
      applyAdaptiveObservation(effectiveLimits, minLimits, maxLimits, mode, observation, decisions);
    }
    const healthy = observations.filter((observation) => observation.kind === 'healthy-throughput');
    if (bottlenecks.length === 0 && healthy.length > 0) {
      for (const observation of healthy) applyAdaptiveRecovery(effectiveLimits, maxLimits, observation, decisions);
    }
  }

  const summary = {
    observationCount: observations.length,
    bottleneckCount: bottlenecks.length,
    decisionCount: decisions.length,
    reducedCount: decisions.filter((decision) => decision.action === 'decrease').length,
    increasedCount: decisions.filter((decision) => decision.action === 'increase').length,
    ...(effectiveLimits.maxReadyJobs !== undefined ? { effectiveMaxReadyJobs: effectiveLimits.maxReadyJobs } : {}),
    ...(maxLimits.maxReadyJobs !== undefined ? { maxReadyJobs: maxLimits.maxReadyJobs } : {})
  };
  return {
    kind: FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_KIND,
    version: FRONTIER_SWARM_ADAPTIVE_LOAD_PLAN_VERSION,
    id: input.id ?? 'swarm-adaptive-load-plan:' + stableHash([input.plan?.id, input.run?.id, mode, observations, decisions, generatedAt]),
    ...(input.plan?.id ? { planId: input.plan.id } : {}),
    ...(input.run?.id ? { runId: input.run.id } : {}),
    mode,
    generatedAt,
    maxLimits,
    currentLimits,
    minLimits,
    effectiveLimits,
    observations,
    decisions,
    summary,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmScheduleInputFromAdaptiveLoadPlan(
  plan: FrontierSwarmPlan,
  adaptive: FrontierSwarmAdaptiveLoadPlan,
  input: { run?: FrontierSwarmRun; now?: number } = {}
): FrontierSwarmScheduleInput {
  return {
    plan,
    ...(input.run ? { run: input.run } : {}),
    ...(input.now !== undefined ? { now: input.now } : {}),
    ...(adaptive.effectiveLimits.maxReadyJobs !== undefined ? { maxReadyJobs: adaptive.effectiveLimits.maxReadyJobs } : {}),
    maxLaneConcurrency: adaptive.effectiveLimits.maxLaneConcurrency,
    maxConcurrencyKeyConcurrency: adaptive.effectiveLimits.maxConcurrencyKeyConcurrency,
    maxComputeConcurrency: adaptive.effectiveLimits.maxComputeConcurrency,
    resourceQuotas: adaptive.effectiveLimits.resourceQuotas
  };
}
