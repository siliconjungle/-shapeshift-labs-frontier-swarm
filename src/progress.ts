import type { JsonObject } from '@shapeshift-labs/frontier';
import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { groupIds } from './record-helpers.js';

export const FRONTIER_SWARM_PROGRESS_MODEL_KIND = 'frontier.swarm.progress-model';
export const FRONTIER_SWARM_PROGRESS_MODEL_VERSION = 1;

export type FrontierSwarmProgressStatus =
  | 'not-started'
  | 'declared'
  | 'implemented'
  | 'structure-verified'
  | 'visual-verified'
  | 'functional-verified'
  | 'collaboration-verified'
  | 'accepted'
  | 'rejected'
  | 'blocked'
  | string;

export interface FrontierSwarmProgressItemInput {
  id: string;
  surface?: string;
  status?: FrontierSwarmProgressStatus;
  evidencePaths?: readonly string[];
  blockers?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmProgressItem {
  id: string;
  surface?: string;
  status: FrontierSwarmProgressStatus;
  evidencePaths: string[];
  blockers: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmProgressModelInput {
  id?: string;
  items?: readonly FrontierSwarmProgressItemInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmProgressModel {
  kind: typeof FRONTIER_SWARM_PROGRESS_MODEL_KIND;
  version: typeof FRONTIER_SWARM_PROGRESS_MODEL_VERSION;
  id: string;
  generatedAt: number;
  items: FrontierSwarmProgressItem[];
  byStatus: Record<string, string[]>;
  summary: { itemCount: number; acceptedCount: number; blockedCount: number };
  metadata?: JsonObject;
}

export function createSwarmProgressModel(input: FrontierSwarmProgressModelInput = {}): FrontierSwarmProgressModel {
  const generatedAt = input.generatedAt ?? Date.now();
  const items = (input.items ?? []).map((item) => ({
    id: item.id,
    ...(item.surface ? { surface: item.surface } : {}),
    status: item.status ?? 'not-started',
    evidencePaths: uniqueStrings(item.evidencePaths ?? []),
    blockers: uniqueStrings(item.blockers ?? []),
    ...(toJsonObject(item.metadata) ? { metadata: toJsonObject(item.metadata) } : {})
  }));
  const byStatus = groupIds(items, (item) => item.status);
  return {
    kind: FRONTIER_SWARM_PROGRESS_MODEL_KIND,
    version: FRONTIER_SWARM_PROGRESS_MODEL_VERSION,
    id: input.id ?? 'swarm-progress-model:' + stableHash([items, generatedAt]),
    generatedAt,
    items,
    byStatus,
    summary: {
      itemCount: items.length,
      acceptedCount: byStatus.accepted?.length ?? 0,
      blockedCount: byStatus.blocked?.length ?? 0
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
