import { positiveNumber, stableHash } from './internal.js';
import { clampAdaptiveLimit } from './adaptive-load-limits.js';
import {
  adaptiveDecisionKeyForObservation,
  adaptiveDecisionTargetForObservation,
  adaptiveObservationIsCapacityBackpressure,
  adaptiveObservationShouldReduceReadyWindow
} from './adaptive-load-observations.js';
import type { FrontierSwarmScheduleLimits } from './plan.js';
import type {
  FrontierSwarmAdaptiveDecisionTarget,
  FrontierSwarmAdaptiveLoadDecision,
  FrontierSwarmAdaptiveMode,
  FrontierSwarmAdaptiveObservation
} from './adaptive-load-types.js';

export function applyAdaptiveObservation(
  limits: FrontierSwarmScheduleLimits,
  minLimits: FrontierSwarmScheduleLimits,
  maxLimits: FrontierSwarmScheduleLimits,
  mode: FrontierSwarmAdaptiveMode,
  observation: FrontierSwarmAdaptiveObservation,
  decisions: FrontierSwarmAdaptiveLoadDecision[]
): void {
  if (observation.kind === 'ready-capacity') {
    decisions.push(createAdaptiveDecision({
      action: 'hold',
      target: 'max-ready-jobs',
      previous: limits.maxReadyJobs,
      next: limits.maxReadyJobs,
      max: maxLimits.maxReadyJobs,
      min: minLimits.maxReadyJobs,
      reason: observation.reasons[0] ?? 'ready-capacity',
      observationIds: [observation.id]
    }));
    return;
  }
  const target = adaptiveDecisionTargetForObservation(observation);
  const key = adaptiveDecisionKeyForObservation(observation);
  if (adaptiveObservationIsCapacityBackpressure(observation)) {
    decisions.push(createAdaptiveDecision({
      action: 'hold',
      target,
      ...(key ? { key } : {}),
      reason: observation.reasons[0] ?? observation.kind,
      observationIds: [observation.id]
    }));
    return;
  }
  if (target === 'lane' && key) {
    decreaseAdaptiveRecordLimit(limits.maxLaneConcurrency, minLimits.maxLaneConcurrency, maxLimits.maxLaneConcurrency, key, mode, observation, decisions, target);
  } else if (target === 'concurrency-key' && key) {
    decreaseAdaptiveRecordLimit(limits.maxConcurrencyKeyConcurrency, minLimits.maxConcurrencyKeyConcurrency, maxLimits.maxConcurrencyKeyConcurrency, key, mode, observation, decisions, target);
  } else if (target === 'compute' && key) {
    decreaseAdaptiveRecordLimit(limits.maxComputeConcurrency, minLimits.maxComputeConcurrency, maxLimits.maxComputeConcurrency, key, mode, observation, decisions, target);
  } else if (target === 'resource' && key) {
    decreaseAdaptiveRecordLimit(limits.resourceQuotas, minLimits.resourceQuotas, maxLimits.resourceQuotas, key, mode, observation, decisions, target);
  }
  if (adaptiveObservationShouldReduceReadyWindow(observation)) {
    const previous = limits.maxReadyJobs ?? maxLimits.maxReadyJobs ?? 1;
    const min = minLimits.maxReadyJobs ?? 1;
    const max = maxLimits.maxReadyJobs ?? previous;
    limits.maxReadyJobs = clampAdaptiveLimit(adaptiveReducedValue(previous, min, mode, observation), min, max);
    decisions.push(createAdaptiveDecision({
      action: limits.maxReadyJobs < previous ? 'decrease' : 'hold',
      target: 'max-ready-jobs',
      previous,
      next: limits.maxReadyJobs,
      max,
      min,
      reason: observation.reasons[0] ?? observation.kind,
      observationIds: [observation.id]
    }));
  }
}

export function applyAdaptiveRecovery(
  limits: FrontierSwarmScheduleLimits,
  maxLimits: FrontierSwarmScheduleLimits,
  observation: FrontierSwarmAdaptiveObservation,
  decisions: FrontierSwarmAdaptiveLoadDecision[],
  options: { increaseReadyWindow?: boolean } = {}
): void {
  if (options.increaseReadyWindow !== false && limits.maxReadyJobs !== undefined && maxLimits.maxReadyJobs !== undefined && limits.maxReadyJobs < maxLimits.maxReadyJobs) {
    const previous = limits.maxReadyJobs;
    limits.maxReadyJobs = Math.min(maxLimits.maxReadyJobs, previous + 1);
    decisions.push(createAdaptiveDecision({
      action: 'increase',
      target: 'max-ready-jobs',
      previous,
      next: limits.maxReadyJobs,
      max: maxLimits.maxReadyJobs,
      reason: observation.reasons[0] ?? observation.kind,
      observationIds: [observation.id]
    }));
  }
  if (observation.lane) {
    increaseAdaptiveRecordLimit(limits.maxLaneConcurrency, maxLimits.maxLaneConcurrency, observation.lane, observation, decisions, 'lane');
  }
  if (observation.compute) {
    increaseAdaptiveRecordLimit(limits.maxComputeConcurrency, maxLimits.maxComputeConcurrency, observation.compute, observation, decisions, 'compute');
  }
  if (observation.concurrencyKey) {
    increaseAdaptiveRecordLimit(limits.maxConcurrencyKeyConcurrency, maxLimits.maxConcurrencyKeyConcurrency, observation.concurrencyKey, observation, decisions, 'concurrency-key');
  }
}

export function createAdaptiveDecision(input: Omit<FrontierSwarmAdaptiveLoadDecision, 'id'>): FrontierSwarmAdaptiveLoadDecision {
  return {
    id: 'swarm-adaptive-decision:' + stableHash([input.action, input.target, input.key, input.previous, input.next, input.reason, input.observationIds]),
    ...input
  };
}

function decreaseAdaptiveRecordLimit(
  record: Record<string, number>,
  minRecord: Record<string, number>,
  maxRecord: Record<string, number>,
  key: string,
  mode: FrontierSwarmAdaptiveMode,
  observation: FrontierSwarmAdaptiveObservation,
  decisions: FrontierSwarmAdaptiveLoadDecision[],
  target: FrontierSwarmAdaptiveDecisionTarget
): void {
  const previous = record[key] ?? maxRecord[key];
  if (!positiveNumber(previous)) return;
  const min = minRecord[key] ?? 1;
  const max = maxRecord[key] ?? previous;
  const next = clampAdaptiveLimit(adaptiveReducedValue(previous as number, min, mode, observation), min, max);
  record[key] = next;
  decisions.push(createAdaptiveDecision({
    action: next < previous ? 'decrease' : 'hold',
    target,
    key,
    previous,
    next,
    max,
    min,
    reason: observation.reasons[0] ?? observation.kind,
    observationIds: [observation.id]
  }));
}

function increaseAdaptiveRecordLimit(
  record: Record<string, number>,
  maxRecord: Record<string, number>,
  key: string,
  observation: FrontierSwarmAdaptiveObservation,
  decisions: FrontierSwarmAdaptiveLoadDecision[],
  target: FrontierSwarmAdaptiveDecisionTarget
): void {
  const previous = record[key];
  const max = maxRecord[key];
  if (!positiveNumber(previous) || !positiveNumber(max) || previous >= max) return;
  record[key] = Math.min(max, previous + 1);
  decisions.push(createAdaptiveDecision({
    action: 'increase',
    target,
    key,
    previous,
    next: record[key],
    max,
    reason: observation.reasons[0] ?? observation.kind,
    observationIds: [observation.id]
  }));
}

function adaptiveReducedValue(previous: number, min: number, mode: FrontierSwarmAdaptiveMode, observation: FrontierSwarmAdaptiveObservation): number {
  if (observation.kind === 'merge-conflict' || observation.kind === 'duplicate-output' || observation.kind === 'concurrency-key-capacity') return min;
  const severityFactor = observation.severity === 'critical' ? 0.45 : observation.severity === 'error' ? 0.55 : observation.severity === 'warning' ? 0.7 : 0.85;
  const modeFactor = mode === 'conservative' ? 0.6 : mode === 'aggressive' ? 0.85 : 0.75;
  return Math.max(min, Math.floor(previous * Math.min(severityFactor, modeFactor)));
}
