import type {
  FrontierSwarmPayoffComponent,
  FrontierSwarmPayoffDirection,
  FrontierSwarmPayoffScoringPolicy,
  FrontierSwarmPayoffScoringPolicyInput,
  FrontierSwarmPayoffVector
} from './tournament-types.js';
import { stableHash, toJsonObject } from './internal.js';

export const DEFAULT_OUTCOME_MULTIPLIER: Record<string, number> = {
  verified: 1,
  accepted: 0.98,
  candidate: 0.82,
  discovery: 0.55,
  blocked: 0.35,
  timeout: 0.25,
  error: 0.2,
  rejected: 0.1,
  undefined: 0
};

export function normalizeScoringPolicy(input: FrontierSwarmPayoffScoringPolicyInput = {}): FrontierSwarmPayoffScoringPolicy {
  const components = Object.fromEntries(Object.entries(input.components ?? {}).sort(([left], [right]) => left.localeCompare(right)).map(([name, value]) => {
    const min = finite(value.min);
    const max = finite(value.max, 1);
    return [name, {
      weight: positive(value.weight, 1),
      direction: value.direction ?? 'maximize',
      min,
      max: max === min ? min + 1 : max,
      ...(value.unit ? { unit: value.unit } : {}),
      ...(value.description ? { description: value.description } : {}),
      ...(toJsonObject(value.metadata) ? { metadata: toJsonObject(value.metadata) } : {})
    }];
  }));
  const outcomeMultipliers = normalizeMultiplierRecord({
    ...DEFAULT_OUTCOME_MULTIPLIER,
    ...(input.outcomeMultipliers ?? {})
  });
  const costWeights = normalizeNumberRecord(input.costWeights);
  return {
    id: input.id ?? 'swarm-payoff-policy:' + stableHash([components, outcomeMultipliers, costWeights]),
    title: input.title ?? 'Swarm Payoff Scoring Policy',
    components,
    outcomeMultipliers,
    costWeights,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function scoreSwarmPayoffVector(
  input: Pick<FrontierSwarmPayoffVector, 'components' | 'penalties' | 'outcome'> & Partial<Pick<FrontierSwarmPayoffVector, 'costs' | 'search' | 'certificate'>>,
  policy: FrontierSwarmPayoffScoringPolicyInput | FrontierSwarmPayoffScoringPolicy = {}
): number {
  const scoringPolicy = normalizeScoringPolicy(policy);
  const weighted = Object.values(input.components).reduce((acc, component) => {
    return {
      value: acc.value + component.normalized * component.weight,
      weight: acc.weight + component.weight
    };
  }, { value: 0, weight: 0 });
  const base = weighted.weight > 0 ? weighted.value / weighted.weight : 0;
  const penalty = Object.values(input.penalties).reduce((sum, value) => sum + clamp01(value), 0);
  const costPenalty = policyCostPenalty(input, scoringPolicy);
  const multiplier = scoringPolicy.outcomeMultipliers[input.outcome] ?? scoringPolicy.outcomeMultipliers.candidate ?? DEFAULT_OUTCOME_MULTIPLIER.candidate;
  return Math.round(clamp01((base - Math.min(0.9, penalty + costPenalty)) * multiplier) * 10000) / 100;
}

export function normalizeComponentValue(value: number, direction: FrontierSwarmPayoffDirection, min = 0, max = 1): number {
  const span = max === min ? 1 : max - min;
  const normalized = clamp01((value - min) / span);
  return direction === 'minimize' ? 1 - normalized : normalized;
}

export function costFromPayoff(payoff: FrontierSwarmPayoffVector, kind: string): number {
  if (kind === 'search') return (payoff.search.attempts / 100) + (payoff.search.durationMs / 60000) + (payoff.search.tokens / 100000) + payoff.search.costUsd;
  if (kind === 'certificate') return (payoff.certificate?.durationMs ?? 0) / 60000;
  return payoff.costs[kind] ?? 0;
}

export function normalizeNumberRecord(input: Record<string, number> | undefined): Record<string, number> {
  const entries = Object.entries(input ?? {}).map(([key, value]) => [key, nonNegative(value)] as const);
  return Object.fromEntries(entries.sort(([left], [right]) => left.localeCompare(right)));
}

export function isVerifiedOutcome(outcome: string): boolean {
  return outcome === 'verified' || outcome === 'accepted';
}

export function isRejectedOutcome(outcome: string): boolean {
  return outcome === 'rejected' || outcome === 'error';
}

export function isUndefinedOutcome(outcome: string): boolean {
  return outcome === 'undefined' || outcome === 'timeout';
}

export function normalizeStringRecord(input: Record<string, string> | undefined): Record<string, string> {
  const entries = Object.entries(input ?? {}).map(([key, value]) => [key, String(value)] as const);
  return Object.fromEntries(entries.sort(([left], [right]) => left.localeCompare(right)));
}

export function meanComponentValues(components: readonly FrontierSwarmPayoffComponent[]): number {
  if (components.length === 0) return 0;
  return round2(components.reduce((sum, component) => sum + component.normalized, 0) / components.length);
}

export function clamp01(value: number | undefined): number {
  return Math.min(1, Math.max(0, finite(value)));
}

export function positive(value: number | undefined, fallback: number): number {
  const number = finite(value);
  return number > 0 ? number : fallback;
}

export function nonNegative(value: number | undefined): number {
  return Math.max(0, finite(value));
}

export function finite(value: number | undefined, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function normalizeMultiplierRecord(input: Record<string, number>): Record<string, number> {
  const entries = Object.entries(input).map(([key, value]) => [key, clamp01(value)] as const);
  return Object.fromEntries(entries.sort(([left], [right]) => left.localeCompare(right)));
}

function policyCostPenalty(
  input: Partial<Pick<FrontierSwarmPayoffVector, 'costs' | 'search' | 'certificate'>>,
  policy: FrontierSwarmPayoffScoringPolicy
): number {
  return Object.entries(policy.costWeights).reduce((sum, [kind, weight]) => {
    if (kind === 'search') return sum + costFromPartialPayoff(input, 'search') * weight;
    if (kind === 'certificate') return sum + costFromPartialPayoff(input, 'certificate') * weight;
    return sum + (input.costs?.[kind] ?? 0) * weight;
  }, 0);
}

function costFromPartialPayoff(
  payoff: Partial<Pick<FrontierSwarmPayoffVector, 'costs' | 'search' | 'certificate'>>,
  kind: string
): number {
  if (kind === 'search') {
    const search = payoff.search;
    if (!search) return 0;
    return (search.attempts / 100) + (search.durationMs / 60000) + (search.tokens / 100000) + search.costUsd;
  }
  if (kind === 'certificate') return (payoff.certificate?.durationMs ?? 0) / 60000;
  return payoff.costs?.[kind] ?? 0;
}
