import { evidenceKindFromPath, isSwarmRun, matchesFacetQuery, normalizeEvidenceIndexEntry } from './evidence-index-helpers.js';
import { FRONTIER_SWARM_EVIDENCE_INDEX_KIND, FRONTIER_SWARM_EVIDENCE_INDEX_VERSION } from './constants.js';
import { stableHash, toJsonObject } from './internal.js';
import type { FrontierSwarmEvidenceIndex, FrontierSwarmEvidenceIndexInput, FrontierSwarmEvidenceIndexQuery, FrontierSwarmEvidenceIndexQueryResult, FrontierSwarmRun } from './types.js';

export function createSwarmEvidenceIndex(input: FrontierSwarmRun | FrontierSwarmEvidenceIndexInput = {}): FrontierSwarmEvidenceIndex {
  const source = isSwarmRun(input) ? { run: input } : input;
  const generatedAt = source.generatedAt ?? Date.now();
  const runEntries = source.run?.results.flatMap((result) => result.evidencePaths.map((path) => normalizeEvidenceIndexEntry({
    jobId: result.jobId,
    queueItemId: result.queueItemIds[0],
    path,
    kind: evidenceKindFromPath(path),
    status: result.status,
    confidence: result.status === 'verified' || result.mergeReadiness === 'verified-patch' ? 1 : 0.65,
    generatedAt
  }))) ?? [];
  const entries = [...runEntries, ...(source.entries ?? []).map((entry) => normalizeEvidenceIndexEntry({ ...entry, generatedAt: entry.generatedAt ?? generatedAt }))];
  const byJobId = groupObjects(entries.filter((entry) => entry.jobId), (entry) => entry.jobId as string);
  const byTopic = groupObjects(entries.filter((entry) => entry.topic), (entry) => entry.topic as string);
  const byPath = groupObjects(entries.filter((entry) => entry.path), (entry) => entry.path as string);
  return {
    kind: FRONTIER_SWARM_EVIDENCE_INDEX_KIND,
    version: FRONTIER_SWARM_EVIDENCE_INDEX_VERSION,
    id: source.id ?? 'swarm-evidence-index:' + stableHash([source.run?.id, entries, generatedAt]),
    ...(source.run?.id ? { runId: source.run.id } : {}),
    generatedAt,
    entries,
    byJobId,
    byTopic,
    byPath,
    summary: {
      entryCount: entries.length,
      jobCount: Object.keys(byJobId).length,
      topicCount: Object.keys(byTopic).length,
      pathCount: Object.keys(byPath).length
    },
    ...(toJsonObject(source.metadata) ? { metadata: toJsonObject(source.metadata) } : {})
  };
}
export function querySwarmEvidenceIndex(index: FrontierSwarmEvidenceIndex, query: FrontierSwarmEvidenceIndexQuery = {}): FrontierSwarmEvidenceIndexQueryResult {
  const entries = index.entries.filter((entry) => (
    (query.jobId === undefined || entry.jobId === query.jobId)
    && (query.lane === undefined || entry.lane === query.lane)
    && (query.topic === undefined || entry.topic === query.topic)
    && (query.pathIncludes === undefined || (entry.path ?? '').includes(query.pathIncludes))
    && (query.kind === undefined || entry.kind === query.kind)
    && (query.status === undefined || entry.status === query.status)
    && (query.tag === undefined || entry.tags.includes(query.tag))
    && (query.minConfidence === undefined || entry.confidence >= query.minConfidence)
    && matchesFacetQuery(entry.facets, query.facet)
  ));
  return { entries, summary: { entryCount: entries.length } };
}
function groupObjects<T>(items: readonly T[], key: (item: T) => string): Record<string, T[]> {
  const out: Record<string, T[]> = {};
  for (const item of items) {
    const group = key(item);
    out[group] = [...(out[group] ?? []), item];
  }
  return out;
}
