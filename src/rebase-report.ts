import { FRONTIER_SWARM_REBASE_REPORT_KIND, FRONTIER_SWARM_REBASE_REPORT_VERSION } from './constants.js';
import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmRebaseReport, FrontierSwarmRebaseReportInput } from './types.js';

export function createSwarmRebaseReport(input: FrontierSwarmRebaseReportInput = {}): FrontierSwarmRebaseReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const fromIndex = input.mergeIndex?.entries.map((entry) => ({
    jobId: entry.jobId,
    status: entry.staleAgainstHead ? 'stale-evidence' : entry.conflictingJobIds.length ? 'semantic-overlap' : 'clean-apply',
    reasons: uniqueStrings([...entry.reasons, ...entry.conflictKeys])
  })) ?? [];
  const fromBundles = !input.mergeIndex && input.bundles ? input.bundles.map((bundle) => ({
    jobId: bundle.jobId,
    status: bundle.staleAgainstHead ? 'stale-evidence' : 'clean-apply',
    reasons: [...bundle.reasons]
  })) : [];
  const entries = [...fromIndex, ...fromBundles, ...(input.entries ?? [])].map((entry) => ({
    jobId: entry.jobId,
    status: entry.status ?? 'clean-apply',
    reasons: uniqueStrings(entry.reasons ?? []),
    ...('metadata' in entry && toJsonObject(entry.metadata) ? { metadata: toJsonObject(entry.metadata) } : {})
  }));
  const byStatus = groupIds(entries, (entry) => entry.status);
  return {
    kind: FRONTIER_SWARM_REBASE_REPORT_KIND,
    version: FRONTIER_SWARM_REBASE_REPORT_VERSION,
    id: input.id ?? 'swarm-rebase-report:' + stableHash([input.currentHead, entries, generatedAt]),
    ...(input.currentHead ? { currentHead: input.currentHead } : {}),
    generatedAt,
    entries,
    byStatus,
    summary: {
      entryCount: entries.length,
      cleanCount: byStatus['clean-apply']?.length ?? 0,
      conflictCount: (byStatus['textual-conflict']?.length ?? 0) + (byStatus['semantic-overlap']?.length ?? 0),
      staleCount: byStatus['stale-evidence']?.length ?? 0
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function groupIds<T extends { jobId?: string; id?: string }>(items: readonly T[], key: (item: T) => string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const item of items) {
    const group = key(item);
    const id = item.jobId ?? item.id;
    if (!id) continue;
    out[group] = [...(out[group] ?? []), id];
  }
  for (const ids of Object.values(out)) ids.sort();
  return out;
}
