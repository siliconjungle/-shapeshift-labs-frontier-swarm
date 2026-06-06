import { FRONTIER_SWARM_RUN_KIND } from './constants.js';
import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmEvidenceFacetValue, FrontierSwarmEvidenceIndexEntry, FrontierSwarmEvidenceIndexEntryInput, FrontierSwarmNamedRef, FrontierSwarmQueueOverlayStatus, FrontierSwarmReferenceOraclePlan, FrontierSwarmReferenceOraclePlanInput, FrontierSwarmRoutingHint, FrontierSwarmRoutingHintInput, FrontierSwarmRun } from './types.js';

export function evidenceKindFromPath(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith('.patch') || lower.endsWith('.diff')) return 'patch';
  if (lower.endsWith('.jsonl')) return 'jsonl';
  if (lower.endsWith('.json')) return 'json';
  if (lower.includes('trace')) return 'trace';
  if (lower.includes('screenshot')) return 'screenshot';
  if (lower.includes('last-message')) return 'handoff';
  return 'evidence';
}
export function normalizeEvidenceIndexEntry(input: FrontierSwarmEvidenceIndexEntryInput): FrontierSwarmEvidenceIndexEntry {
  const generatedAt = input.generatedAt ?? Date.now();
  return {
    id: input.id ?? 'swarm-evidence-entry:' + stableHash([input.jobId, input.queueItemId, input.path, input.topic, input.kind, generatedAt]),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.queueItemId ? { queueItemId: input.queueItemId } : {}),
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.topic ? { topic: input.topic } : {}),
    ...(input.path ? { path: input.path } : {}),
    kind: input.kind ?? (input.path ? evidenceKindFromPath(input.path) : 'evidence'),
    status: input.status ?? 'unknown',
    confidence: clamp01(input.confidence ?? 0.5),
    tags: uniqueStrings(input.tags ?? []),
    facets: normalizeFacets(input.facets ?? {}),
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function matchesFacetQuery(facets: Record<string, FrontierSwarmEvidenceFacetValue>, query?: Record<string, FrontierSwarmEvidenceFacetValue>): boolean {
  if (!query) return true;
  return Object.entries(query).every(([key, value]) => facets[key] === value);
}
export function normalizeFacets(input: Record<string, FrontierSwarmEvidenceFacetValue>): Record<string, FrontierSwarmEvidenceFacetValue> {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value)));
}
export function normalizeReferenceWindow(input: NonNullable<FrontierSwarmReferenceOraclePlanInput['window']>): NonNullable<FrontierSwarmReferenceOraclePlan['window']> {
  return {
    ...(input.start !== undefined ? { start: Math.max(0, Math.floor(input.start)) } : {}),
    ...(input.end !== undefined ? { end: Math.max(0, Math.floor(input.end)) } : {}),
    ...(input.focus ? { focus: input.focus } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function normalizeRoutingHint(input: FrontierSwarmRoutingHintInput): FrontierSwarmRoutingHint {
  return {
    ...(input.artifactKind ? { artifactKind: input.artifactKind } : {}),
    ...(input.pathPattern ? { pathPattern: input.pathPattern } : {}),
    ...(input.lane ? { lane: input.lane } : {}),
    bucket: input.bucket ?? 'needs-human-port',
    reason: input.reason ?? 'matched-routing-hint',
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function defaultArtifactBucket(artifact: FrontierSwarmNamedRef): FrontierSwarmQueueOverlayStatus {
  if (artifact.kind === 'patch') return 'ready-to-apply';
  if (artifact.kind === 'handoff' || artifact.kind === 'trace' || artifact.kind === 'jsonl') return 'discovery-only';
  return 'needs-human-port';
}
export function isSwarmRun(value: unknown): value is FrontierSwarmRun {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_RUN_KIND;
}
function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}
