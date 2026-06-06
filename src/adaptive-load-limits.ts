import { cloneJsonValue, positiveNumber, uniqueStrings } from './internal.js';
import type { FrontierSwarmScheduleLimits } from './plan.js';
import type { FrontierSwarmAdaptiveLoadPlanInput, FrontierSwarmAdaptiveScheduleLimitsInput } from './adaptive-load-types.js';

export function createAdaptiveMaxLimits(input: FrontierSwarmAdaptiveLoadPlanInput): FrontierSwarmScheduleLimits {
  const plan = input.plan;
  const jobCount = Math.max(1, plan?.jobs.length ?? input.schedule?.summary.jobCount ?? input.dashboard?.summary.jobCount ?? 1);
  const raw = mergeAdaptiveScheduleLimitInputs(plan?.limits, input.maxLimits);
  const maxReadyJobs = positiveNumber(raw.maxReadyJobs) ? Math.floor(raw.maxReadyJobs as number) : jobCount;
  const maxLaneConcurrency: Record<string, number> = { ...raw.maxLaneConcurrency };
  const maxConcurrencyKeyConcurrency: Record<string, number> = { ...raw.maxConcurrencyKeyConcurrency };
  const maxComputeConcurrency: Record<string, number> = { ...raw.maxComputeConcurrency };
  const resourceQuotas: Record<string, number> = { ...raw.resourceQuotas };
  for (const job of plan?.jobs ?? []) {
    maxLaneConcurrency[job.lane] = adaptivePositiveLimit(maxLaneConcurrency[job.lane], job.compute.maxConcurrency ?? maxReadyJobs);
    maxConcurrencyKeyConcurrency[job.concurrencyKey] = adaptivePositiveLimit(maxConcurrencyKeyConcurrency[job.concurrencyKey], maxReadyJobs);
    maxComputeConcurrency[job.compute.id] = adaptivePositiveLimit(maxComputeConcurrency[job.compute.id], job.compute.maxConcurrency ?? maxReadyJobs);
    for (const [resource, amount] of Object.entries(job.resourceRequirements?.resources ?? {})) {
      resourceQuotas[resource] = adaptivePositiveLimit(resourceQuotas[resource], Math.max(1, Math.ceil(amount), maxReadyJobs));
    }
    if (job.resourceRequirements?.browser?.required) {
      resourceQuotas.browser = adaptivePositiveLimit(resourceQuotas.browser, maxReadyJobs);
      resourceQuotas['browser-port'] = adaptivePositiveLimit(resourceQuotas['browser-port'], maxReadyJobs);
    }
  }
  return {
    maxReadyJobs,
    maxLaneConcurrency: normalizeAdaptiveLimitRecord(maxLaneConcurrency),
    maxConcurrencyKeyConcurrency: normalizeAdaptiveLimitRecord(maxConcurrencyKeyConcurrency),
    maxComputeConcurrency: normalizeAdaptiveLimitRecord(maxComputeConcurrency),
    resourceQuotas: normalizeAdaptiveLimitRecord(resourceQuotas)
  };
}

export function createAdaptiveCurrentLimits(
  input: FrontierSwarmAdaptiveScheduleLimitsInput | undefined,
  maxLimits: FrontierSwarmScheduleLimits
): FrontierSwarmScheduleLimits {
  if (!input) return cloneJsonValue(maxLimits) as FrontierSwarmScheduleLimits;
  const raw = mergeAdaptiveScheduleLimitInputs(maxLimits, input);
  return {
    ...(positiveNumber(raw.maxReadyJobs) ? { maxReadyJobs: Math.floor(raw.maxReadyJobs as number) } : {}),
    maxLaneConcurrency: normalizeAdaptiveLimitRecord(raw.maxLaneConcurrency),
    maxConcurrencyKeyConcurrency: normalizeAdaptiveLimitRecord(raw.maxConcurrencyKeyConcurrency),
    maxComputeConcurrency: normalizeAdaptiveLimitRecord(raw.maxComputeConcurrency),
    resourceQuotas: normalizeAdaptiveLimitRecord(raw.resourceQuotas)
  };
}

export function createAdaptiveMinLimits(
  input: FrontierSwarmAdaptiveScheduleLimitsInput | undefined,
  maxLimits: FrontierSwarmScheduleLimits
): FrontierSwarmScheduleLimits {
  const raw = mergeAdaptiveScheduleLimitInputs(undefined, input);
  const laneMinimums = Object.fromEntries(Object.keys(maxLimits.maxLaneConcurrency).map((key) => [key, 1]));
  const keyMinimums = Object.fromEntries(Object.keys(maxLimits.maxConcurrencyKeyConcurrency).map((key) => [key, 1]));
  const computeMinimums = Object.fromEntries(Object.keys(maxLimits.maxComputeConcurrency).map((key) => [key, 1]));
  const resourceMinimums = Object.fromEntries(Object.keys(maxLimits.resourceQuotas).map((key) => [key, 1]));
  return {
    maxReadyJobs: adaptivePositiveLimit(raw.maxReadyJobs, 1),
    maxLaneConcurrency: normalizeAdaptiveLimitRecord({ ...laneMinimums, ...raw.maxLaneConcurrency }),
    maxConcurrencyKeyConcurrency: normalizeAdaptiveLimitRecord({ ...keyMinimums, ...raw.maxConcurrencyKeyConcurrency }),
    maxComputeConcurrency: normalizeAdaptiveLimitRecord({ ...computeMinimums, ...raw.maxComputeConcurrency }),
    resourceQuotas: normalizeAdaptiveLimitRecord({ ...resourceMinimums, ...raw.resourceQuotas })
  };
}

export function clampAdaptiveLimits(
  value: FrontierSwarmScheduleLimits,
  minLimits: FrontierSwarmScheduleLimits,
  maxLimits: FrontierSwarmScheduleLimits
): FrontierSwarmScheduleLimits {
  return {
    ...(value.maxReadyJobs !== undefined || maxLimits.maxReadyJobs !== undefined ? {
      maxReadyJobs: clampAdaptiveLimit(value.maxReadyJobs ?? maxLimits.maxReadyJobs ?? 1, minLimits.maxReadyJobs ?? 1, maxLimits.maxReadyJobs ?? value.maxReadyJobs ?? 1)
    } : {}),
    maxLaneConcurrency: clampAdaptiveRecord(value.maxLaneConcurrency, minLimits.maxLaneConcurrency, maxLimits.maxLaneConcurrency),
    maxConcurrencyKeyConcurrency: clampAdaptiveRecord(value.maxConcurrencyKeyConcurrency, minLimits.maxConcurrencyKeyConcurrency, maxLimits.maxConcurrencyKeyConcurrency),
    maxComputeConcurrency: clampAdaptiveRecord(value.maxComputeConcurrency, minLimits.maxComputeConcurrency, maxLimits.maxComputeConcurrency),
    resourceQuotas: clampAdaptiveRecord(value.resourceQuotas, minLimits.resourceQuotas, maxLimits.resourceQuotas)
  };
}

export function clampAdaptiveLimit(value: number, min: number, max: number): number {
  const upper = Math.max(1, Math.floor(max));
  const lower = Math.min(upper, Math.max(1, Math.floor(min)));
  return Math.min(upper, Math.max(lower, Math.floor(value)));
}

function mergeAdaptiveScheduleLimitInputs(
  left?: FrontierSwarmScheduleLimits | FrontierSwarmAdaptiveScheduleLimitsInput,
  right?: FrontierSwarmAdaptiveScheduleLimitsInput
): FrontierSwarmScheduleLimits {
  return {
    ...(right?.maxReadyJobs !== undefined ? { maxReadyJobs: right.maxReadyJobs } : left?.maxReadyJobs !== undefined ? { maxReadyJobs: left.maxReadyJobs } : {}),
    maxLaneConcurrency: { ...(left?.maxLaneConcurrency ?? {}), ...(right?.maxLaneConcurrency ?? {}) },
    maxConcurrencyKeyConcurrency: { ...(left?.maxConcurrencyKeyConcurrency ?? {}), ...(right?.maxConcurrencyKeyConcurrency ?? {}) },
    maxComputeConcurrency: { ...(left?.maxComputeConcurrency ?? {}), ...(right?.maxComputeConcurrency ?? {}) },
    resourceQuotas: { ...(left?.resourceQuotas ?? {}), ...(right?.resourceQuotas ?? {}) }
  };
}

function normalizeAdaptiveLimitRecord(input: Record<string, number> = {}): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [key, value] of Object.entries(input)) {
    if (positiveNumber(value)) out[key] = Math.max(1, Math.floor(value));
  }
  return out;
}

function clampAdaptiveRecord(value: Record<string, number>, minRecord: Record<string, number>, maxRecord: Record<string, number>): Record<string, number> {
  const keys = uniqueStrings([...Object.keys(value), ...Object.keys(minRecord), ...Object.keys(maxRecord)]);
  const out: Record<string, number> = {};
  for (const key of keys) {
    const max = maxRecord[key];
    if (!positiveNumber(max)) continue;
    const min = minRecord[key] ?? 1;
    out[key] = clampAdaptiveLimit(value[key] ?? max, min, max);
  }
  return out;
}

function adaptivePositiveLimit(value: unknown, fallback: number): number {
  return positiveNumber(value) ? Math.max(1, Math.floor(value as number)) : Math.max(1, Math.floor(fallback));
}
