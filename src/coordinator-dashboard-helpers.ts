import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type {
  FrontierSwarmCoordinatorDuplicateGroup,
  FrontierSwarmCoordinatorLiveness,
  FrontierSwarmCoordinatorProcess,
  FrontierSwarmCoordinatorProcessInput,
  FrontierSwarmCoordinatorSourceCitation
} from './coordinator-dashboard-types.js';
import type { FrontierSwarmEvidenceIndex, FrontierSwarmJobResult, FrontierSwarmMergeIndexEntry } from './index.js';

export function normalizeCoordinatorProcesses(input: readonly FrontierSwarmCoordinatorProcessInput[]): FrontierSwarmCoordinatorProcess[] {
  return input.map((entry) => ({
    ...(entry.pid !== undefined ? { pid: Math.floor(entry.pid) } : {}),
    role: entry.role ?? 'worker',
    ...(entry.jobId ? { jobId: entry.jobId } : {}),
    ...(entry.runId ? { runId: entry.runId } : {}),
    status: entry.status ?? 'unknown',
    ...(entry.startedAt !== undefined ? { startedAt: entry.startedAt } : {}),
    ...(entry.lastSeenAt !== undefined ? { lastSeenAt: entry.lastSeenAt } : {}),
    command: [...(entry.command ?? [])],
    ...(toJsonObject(entry.metadata) ? { metadata: toJsonObject(entry.metadata) } : {})
  })).sort((left, right) => (left.jobId ?? '').localeCompare(right.jobId ?? '') || (left.pid ?? 0) - (right.pid ?? 0));
}

export function createCoordinatorDuplicateGroups(entries: readonly FrontierSwarmMergeIndexEntry[]): FrontierSwarmCoordinatorDuplicateGroup[] {
  const groups = new Map<string, FrontierSwarmMergeIndexEntry[]>();
  for (const entry of entries) {
    for (const key of coordinatorDuplicateKeys(entry)) groups.set(key, [...(groups.get(key) ?? []), entry]);
  }
  return Array.from(groups.entries())
    .filter(([, groupEntries]) => groupEntries.length > 1)
    .map(([key, groupEntries]) => {
      const jobIds = groupEntries.map((entry) => entry.jobId).sort();
      return {
        id: 'swarm-duplicate-group:' + stableHash([key, jobIds]),
        key,
        jobIds,
        reason: key.startsWith('queue:') ? 'same-queue-item' : key.startsWith('region:') ? 'same-semantic-region' : 'same-changed-paths'
      };
    })
    .sort((left, right) => left.key.localeCompare(right.key));
}

export function coordinatorJobLiveness(
  result: FrontierSwarmJobResult | undefined,
  entry: FrontierSwarmMergeIndexEntry | undefined,
  processes: readonly FrontierSwarmCoordinatorProcess[]
): FrontierSwarmCoordinatorLiveness {
  if (result || entry) return 'finished';
  if (processes.some((process) => process.status === 'running')) return 'running';
  if (processes.some((process) => process.status === 'missing')) return 'missing';
  return 'unknown';
}

export function primaryEvidencePath(paths: readonly string[]): string | undefined {
  return paths.find((entry) => entry.endsWith('/evidence.json') || entry === 'evidence.json')
    ?? paths.find((entry) => entry.endsWith('/merge.json') || entry === 'merge.json')
    ?? paths.find((entry) => entry.endsWith('/last-message.md') || entry.endsWith('/last.md'))
    ?? paths[0];
}

export function createCoordinatorSourceCitations(
  entry: FrontierSwarmMergeIndexEntry | undefined,
  evidenceIndex: FrontierSwarmEvidenceIndex | undefined
): FrontierSwarmCoordinatorSourceCitation[] {
  const citations: FrontierSwarmCoordinatorSourceCitation[] = [];
  for (const file of entry?.changedPaths ?? []) citations.push({ path: file, kind: 'changed-source' });
  for (const region of entry?.changedRegions ?? []) citations.push({ path: region, kind: 'semantic-region', region });
  for (const evidence of evidenceIndex?.byJobId[entry?.jobId ?? ''] ?? []) {
    if (!evidence.path) continue;
    citations.push({
      path: evidence.path,
      kind: evidence.kind,
      ...(evidence.topic ? { symbol: evidence.topic } : {}),
      confidence: evidence.confidence,
      ...(Object.keys(evidence.facets).length ? { metadata: { facets: evidence.facets } } : {})
    });
  }
  const seen = new Set<string>();
  return citations.filter((citation) => {
    const key = `${citation.kind}:${citation.path}:${citation.symbol ?? ''}:${citation.region ?? ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).sort((left, right) => left.kind.localeCompare(right.kind) || left.path.localeCompare(right.path));
}

export function averageScore(scores: readonly number[]): number {
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

export function groupIds<T extends { jobId?: string; id?: string }>(items: readonly T[], key: (item: T) => string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const item of items) {
    const group = key(item);
    out[group] = [...(out[group] ?? []), item.jobId ?? item.id ?? 'unknown'];
  }
  return out;
}

export function groupObjects<T>(items: readonly T[], key: (item: T) => string): Record<string, T[]> {
  const out: Record<string, T[]> = {};
  for (const item of items) {
    const group = key(item);
    out[group] = [...(out[group] ?? []), item];
  }
  return out;
}

function coordinatorDuplicateKeys(entry: FrontierSwarmMergeIndexEntry): string[] {
  const keys: string[] = [];
  if (entry.queueItemIds.length) keys.push(`queue:${entry.queueItemIds.slice().sort().join('|')}`);
  if (entry.changedRegions.length) keys.push(`region:${entry.changedRegions.slice().sort().join('|')}`);
  if (entry.changedPaths.length) keys.push(`path:${entry.changedPaths.slice().sort().join('|')}`);
  return keys;
}
