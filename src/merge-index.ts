import { cloneJsonValue, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type {
  FrontierSwarmJobResult,
  FrontierSwarmMergeBundle,
  FrontierSwarmMergeConflict,
  FrontierSwarmMergeIndex,
  FrontierSwarmMergeIndexEntry,
  FrontierSwarmMergeIndexInput,
  FrontierSwarmSemanticImportSummary
} from './index.js';

export function createSwarmMergeIndex(input: FrontierSwarmMergeIndexInput): FrontierSwarmMergeIndex {
  const generatedAt = input.generatedAt ?? Date.now();
  const entries: FrontierSwarmMergeIndexEntry[] = input.bundles.map((bundle) => {
    const patchStatus = input.patchStatuses?.[bundle.jobId] ?? (bundle.staleAgainstHead ? 'stale' : bundle.patchPath ? 'unknown' : 'missing');
    const staleAgainstHead = bundle.staleAgainstHead || patchStatus === 'stale' || patchStatus === 'failed-check';
    return {
      jobId: bundle.jobId,
      ...(bundle.taskId ? { taskId: bundle.taskId } : {}),
      ...(bundle.lane ? { lane: bundle.lane } : {}),
      ...(bundle.title ? { title: bundle.title } : {}),
      status: bundle.status,
      mergeReadiness: bundle.mergeReadiness,
      disposition: staleAgainstHead ? 'stale-against-head' : bundle.disposition,
      riskLevel: bundle.riskLevel,
      patchStatus,
      staleAgainstHead,
      autoMergeable: bundle.autoMergeable && !staleAgainstHead,
      changedPaths: [...bundle.changedPaths],
      changedRegions: [...bundle.changedRegions],
      conflictKeys: mergeIndexConflictKeys(bundle),
      conflictingJobIds: [],
      ownedFilesTouched: [...bundle.ownedFilesTouched],
      ownershipViolations: [...bundle.ownershipViolations],
      ...(bundle.patchPath ? { patchPath: bundle.patchPath } : {}),
      ...(bundle.patchHash ? { patchHash: bundle.patchHash } : {}),
      evidencePaths: [...bundle.evidencePaths],
      queueItemIds: [...bundle.queueItemIds],
      reasons: uniqueStrings([...bundle.reasons, ...(staleAgainstHead ? ['stale-against-head'] : [])]),
      ...(bundle.semanticImport ? { semanticImport: cloneJsonValue(bundle.semanticImport) as FrontierSwarmSemanticImportSummary } : {}),
      generatedAt: bundle.generatedAt
    };
  });
  const conflicts = createMergeIndexConflicts(entries);
  const conflictsByJob = new Map<string, Set<string>>();
  for (const conflict of conflicts) {
    for (const jobId of conflict.jobIds) {
      const set = conflictsByJob.get(jobId) ?? new Set<string>();
      for (const other of conflict.jobIds) if (other !== jobId) set.add(other);
      conflictsByJob.set(jobId, set);
    }
  }
  const indexed = entries.map((entry) => ({
    ...entry,
    conflictingJobIds: Array.from(conflictsByJob.get(entry.jobId) ?? []).sort()
  }));
  const byDisposition = groupJobIdsBy(indexed, (entry) => entry.disposition);
  const byPath = groupJobIdsByMany(indexed, (entry) => entry.changedPaths);
  const byRegion = groupJobIdsByMany(indexed, (entry) => entry.changedRegions);
  return {
    kind: 'frontier.swarm.merge-index',
    version: 1,
    id: input.id ?? 'swarm-merge-index:' + stableHash([input.runId, input.planId, indexed, conflicts, generatedAt]),
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.planId ? { planId: input.planId } : {}),
    generatedAt,
    entries: indexed,
    conflicts,
    byDisposition,
    byPath,
    byRegion,
    summary: {
      entryCount: indexed.length,
      readyToApplyCount: indexed.filter((entry) => entry.disposition === 'auto-mergeable' && entry.autoMergeable && !entry.conflictingJobIds.length).length,
      needsHumanPortCount: indexed.filter((entry) => entry.disposition === 'needs-port').length,
      failedEvidenceCount: indexed.filter((entry) => entry.disposition === 'rejected' || entry.disposition === 'blocked' || entry.ownershipViolations.length > 0).length,
      staleAgainstHeadCount: indexed.filter((entry) => entry.staleAgainstHead || entry.disposition === 'stale-against-head').length,
      discoveryOnlyCount: indexed.filter((entry) => entry.disposition === 'discovery-only').length,
      conflictCount: conflicts.length,
      conflictedJobCount: conflictsByJob.size
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function mergeIndexConflictKeys(bundle: FrontierSwarmMergeBundle): string[] {
  return bundle.changedRegions.length
    ? bundle.changedRegions.map((region) => `region:${region}`).sort()
    : bundle.changedPaths.map((file) => `path:${file}`).sort();
}

function createMergeIndexConflicts(entries: readonly FrontierSwarmMergeIndexEntry[]): FrontierSwarmMergeConflict[] {
  const conflicts: FrontierSwarmMergeConflict[] = [];
  for (let leftIndex = 0; leftIndex < entries.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < entries.length; rightIndex += 1) {
      const left = entries[leftIndex];
      const right = entries[rightIndex];
      if (!left || !right) continue;
      const keys = pairConflictKeys(left, right);
      for (const key of keys) {
        const kind = key.startsWith('region:') ? 'region' as const : 'path' as const;
        const value = key.slice(key.indexOf(':') + 1);
        conflicts.push({
          jobIds: [left.jobId, right.jobId].sort(),
          key,
          kind,
          ...(kind === 'region' ? { region: value } : { path: value })
        });
      }
    }
  }
  const deduped = new Map<string, FrontierSwarmMergeConflict>();
  for (const conflict of conflicts) deduped.set(`${conflict.key}:${conflict.jobIds.join(',')}`, conflict);
  return Array.from(deduped.values()).sort((left, right) => left.key.localeCompare(right.key) || left.jobIds.join(',').localeCompare(right.jobIds.join(',')));
}

function pairConflictKeys(
  left: Pick<FrontierSwarmJobResult | FrontierSwarmMergeIndexEntry, 'changedPaths' | 'changedRegions'>,
  right: Pick<FrontierSwarmJobResult | FrontierSwarmMergeIndexEntry, 'changedPaths' | 'changedRegions'>
): string[] {
  if (left.changedRegions.length > 0 && right.changedRegions.length > 0) {
    const rightRegions = new Set(right.changedRegions);
    return left.changedRegions.filter((region) => rightRegions.has(region)).map((region) => `region:${region}`).sort();
  }
  const rightPaths = new Set(right.changedPaths);
  return left.changedPaths.filter((file) => rightPaths.has(file)).map((file) => `path:${file}`).sort();
}

function groupJobIdsBy<T extends { jobId: string }>(items: readonly T[], key: (item: T) => string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const item of items) out[key(item)] = uniqueStrings([...(out[key(item)] ?? []), item.jobId]);
  return out;
}

function groupJobIdsByMany<T extends { jobId: string }>(items: readonly T[], key: (item: T) => readonly string[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const item of items) {
    for (const value of key(item)) out[value] = uniqueStrings([...(out[value] ?? []), item.jobId]);
  }
  return out;
}
