import type { JsonObject } from '@shapeshift-labs/frontier';
import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { groupObjects } from './record-helpers.js';
import type { FrontierSwarmConfidence } from './index.js';

export const FRONTIER_SWARM_BLACKBOARD_KIND = 'frontier.swarm.blackboard';
export const FRONTIER_SWARM_BLACKBOARD_VERSION = 1;

export type FrontierSwarmBlackboardEntryKind = 'fact' | 'divergence' | 'rejected-theory' | 'ownership' | 'decision' | string;

export interface FrontierSwarmBlackboardEntryInput {
  id?: string;
  kind?: FrontierSwarmBlackboardEntryKind;
  topic?: string;
  status?: string;
  text?: string;
  lane?: string;
  jobId?: string;
  owner?: string;
  confidence?: FrontierSwarmConfidence;
  sourceIds?: readonly string[];
  paths?: readonly string[];
  tags?: readonly string[];
  supersedes?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBlackboardEntry {
  id: string;
  kind: FrontierSwarmBlackboardEntryKind;
  topic: string;
  status: string;
  text: string;
  lane?: string;
  jobId?: string;
  owner?: string;
  confidence: FrontierSwarmConfidence;
  sourceIds: string[];
  paths: string[];
  tags: string[];
  supersedes: string[];
  generatedAt: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmBlackboardInput {
  id?: string;
  runId?: string;
  entries?: readonly FrontierSwarmBlackboardEntryInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBlackboard {
  kind: typeof FRONTIER_SWARM_BLACKBOARD_KIND;
  version: typeof FRONTIER_SWARM_BLACKBOARD_VERSION;
  id: string;
  runId?: string;
  generatedAt: number;
  entries: FrontierSwarmBlackboardEntry[];
  byTopic: Record<string, FrontierSwarmBlackboardEntry[]>;
  byKind: Record<string, FrontierSwarmBlackboardEntry[]>;
  summary: {
    entryCount: number;
    topicCount: number;
    kindCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmBlackboardQuery {
  kind?: FrontierSwarmBlackboardEntryKind;
  topic?: string;
  status?: string;
  lane?: string;
  jobId?: string;
  owner?: string;
  tag?: string;
  textIncludes?: string;
}

export interface FrontierSwarmBlackboardQueryResult {
  entries: FrontierSwarmBlackboardEntry[];
  summary: { entryCount: number };
}

export function createSwarmBlackboard(input: FrontierSwarmBlackboardInput = {}): FrontierSwarmBlackboard {
  const generatedAt = input.generatedAt ?? Date.now();
  const entries = (input.entries ?? []).map((entry) => normalizeBlackboardEntry({ ...entry, generatedAt: entry.generatedAt ?? generatedAt }));
  const byTopic = groupObjects(entries, (entry) => entry.topic);
  const byKind = groupObjects(entries, (entry) => entry.kind);
  return {
    kind: FRONTIER_SWARM_BLACKBOARD_KIND,
    version: FRONTIER_SWARM_BLACKBOARD_VERSION,
    id: input.id ?? 'swarm-blackboard:' + stableHash([input.runId, entries, generatedAt]),
    ...(input.runId ? { runId: input.runId } : {}),
    generatedAt,
    entries,
    byTopic,
    byKind,
    summary: {
      entryCount: entries.length,
      topicCount: Object.keys(byTopic).length,
      kindCount: Object.keys(byKind).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function querySwarmBlackboard(blackboard: FrontierSwarmBlackboard, query: FrontierSwarmBlackboardQuery = {}): FrontierSwarmBlackboardQueryResult {
  const textIncludes = query.textIncludes?.toLowerCase();
  const entries = blackboard.entries.filter((entry) => (
    (query.kind === undefined || entry.kind === query.kind)
    && (query.topic === undefined || entry.topic === query.topic)
    && (query.status === undefined || entry.status === query.status)
    && (query.lane === undefined || entry.lane === query.lane)
    && (query.jobId === undefined || entry.jobId === query.jobId)
    && (query.owner === undefined || entry.owner === query.owner)
    && (query.tag === undefined || entry.tags.includes(query.tag))
    && (textIncludes === undefined || entry.text.toLowerCase().includes(textIncludes))
  ));
  return { entries, summary: { entryCount: entries.length } };
}

function normalizeBlackboardEntry(input: FrontierSwarmBlackboardEntryInput): FrontierSwarmBlackboardEntry {
  const generatedAt = input.generatedAt ?? Date.now();
  const topic = input.topic ?? input.kind ?? 'general';
  return {
    id: input.id ?? 'swarm-blackboard-entry:' + stableHash([input.kind, topic, input.text, input.sourceIds, generatedAt]),
    kind: input.kind ?? 'fact',
    topic,
    status: input.status ?? 'fresh',
    text: input.text ?? '',
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.owner ? { owner: input.owner } : {}),
    confidence: input.confidence ?? 'medium',
    sourceIds: uniqueStrings(input.sourceIds ?? []),
    paths: uniqueStrings(input.paths ?? []),
    tags: uniqueStrings(input.tags ?? []),
    supersedes: uniqueStrings(input.supersedes ?? []),
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
