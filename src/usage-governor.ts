import type { JsonObject } from '@shapeshift-labs/frontier';
import { positiveNumber, stableHash, toJsonObject, uniqueStrings } from './internal.js';

export const FRONTIER_SWARM_USAGE_GOVERNOR_KIND = 'frontier.swarm.usage-governor';
export const FRONTIER_SWARM_USAGE_GOVERNOR_VERSION = 1;

export interface FrontierSwarmUsageGovernorInput {
  id?: string;
  maxWorkers?: number;
  maxTokensByLane?: Record<string, number>;
  maxCostUsd?: number;
  retryBudget?: number;
  stopConditions?: readonly string[];
  preferStaticWhenLowBudget?: boolean;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmUsageGovernor {
  kind: typeof FRONTIER_SWARM_USAGE_GOVERNOR_KIND;
  version: typeof FRONTIER_SWARM_USAGE_GOVERNOR_VERSION;
  id: string;
  generatedAt: number;
  maxWorkers?: number;
  maxTokensByLane: Record<string, number>;
  maxCostUsd?: number;
  retryBudget: number;
  stopConditions: string[];
  preferStaticWhenLowBudget: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmUsageGovernorDecision {
  ok: boolean;
  reasons: string[];
  recommendedMaxWorkers?: number;
  preferStatic: boolean;
}

export function createSwarmUsageGovernor(input: FrontierSwarmUsageGovernorInput = {}): FrontierSwarmUsageGovernor {
  const generatedAt = input.generatedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_USAGE_GOVERNOR_KIND,
    version: FRONTIER_SWARM_USAGE_GOVERNOR_VERSION,
    id: input.id ?? 'swarm-usage-governor:' + stableHash([input.maxWorkers, input.maxTokensByLane, input.maxCostUsd, input.retryBudget, generatedAt]),
    generatedAt,
    ...(positiveNumber(input.maxWorkers) ? { maxWorkers: Math.floor(input.maxWorkers as number) } : {}),
    maxTokensByLane: { ...(input.maxTokensByLane ?? {}) },
    ...(positiveNumber(input.maxCostUsd) ? { maxCostUsd: input.maxCostUsd as number } : {}),
    retryBudget: Math.max(0, Math.floor(input.retryBudget ?? 0)),
    stopConditions: uniqueStrings(input.stopConditions ?? []),
    preferStaticWhenLowBudget: input.preferStaticWhenLowBudget ?? true,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function checkSwarmUsageGovernor(
  governorInput: FrontierSwarmUsageGovernor | FrontierSwarmUsageGovernorInput,
  usage: { activeWorkers?: number; costUsd?: number; tokensByLane?: Record<string, number>; retriesUsed?: number } = {}
): FrontierSwarmUsageGovernorDecision {
  const governor = isSwarmUsageGovernor(governorInput) ? governorInput : createSwarmUsageGovernor(governorInput);
  const reasons: string[] = [];
  if (governor.maxWorkers !== undefined && (usage.activeWorkers ?? 0) > governor.maxWorkers) reasons.push('max-workers');
  if (governor.maxCostUsd !== undefined && (usage.costUsd ?? 0) > governor.maxCostUsd) reasons.push('max-cost-usd');
  if ((usage.retriesUsed ?? 0) > governor.retryBudget) reasons.push('retry-budget');
  for (const [lane, maxTokens] of Object.entries(governor.maxTokensByLane)) {
    if ((usage.tokensByLane?.[lane] ?? 0) > maxTokens) reasons.push(`max-tokens:${lane}`);
  }
  return {
    ok: reasons.length === 0,
    reasons,
    ...(governor.maxWorkers !== undefined ? { recommendedMaxWorkers: Math.max(1, governor.maxWorkers - (reasons.length ? 1 : 0)) } : {}),
    preferStatic: governor.preferStaticWhenLowBudget && reasons.some((reason) => reason.startsWith('max-tokens') || reason === 'max-cost-usd')
  };
}

function isSwarmUsageGovernor(value: unknown): value is FrontierSwarmUsageGovernor {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_USAGE_GOVERNOR_KIND;
}
