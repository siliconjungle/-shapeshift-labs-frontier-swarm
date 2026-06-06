import { cloneJsonValue, stableHash, toJsonObject } from './internal.js';
import type {
  FrontierSwarmDerivedQueueStatus,
  FrontierSwarmDerivedQueueStatusInput,
  FrontierSwarmJobResult,
  FrontierSwarmJobResultInput,
  FrontierSwarmMergeBundle,
  FrontierSwarmQueueJob,
  FrontierSwarmQueueJobStatus,
  FrontierSwarmQueueOverlay,
  FrontierSwarmQueueOverlayEntry,
  FrontierSwarmQueueOverlayInput,
  FrontierSwarmQueueOverlayStatus,
  FrontierSwarmSemanticImportSummary
} from './index.js';

export interface FrontierSwarmQueueOverlayDeps {
  normalizeResult(input: FrontierSwarmJobResultInput): FrontierSwarmJobResult;
}

export function createSwarmQueueOverlay(
  input: FrontierSwarmQueueOverlayInput = {},
  deps: FrontierSwarmQueueOverlayDeps
): FrontierSwarmQueueOverlay {
  const generatedAt = input.generatedAt ?? Date.now();
  const entries: FrontierSwarmQueueOverlayEntry[] = [];
  for (const bundle of input.bundles ?? []) {
    const status = queueOverlayStatusFromBundle(bundle);
    const queueItemIds = bundle.queueItemIds.length ? bundle.queueItemIds : [bundle.taskId ?? bundle.jobId];
    for (const queueItemId of queueItemIds) {
      entries.push({
        queueItemId,
        jobId: bundle.jobId,
        status,
        mergeReadiness: bundle.mergeReadiness,
        disposition: bundle.disposition,
        riskLevel: bundle.riskLevel,
        ...(bundle.patchPath ? { patchPath: bundle.patchPath } : {}),
        evidencePaths: [...bundle.evidencePaths],
        changedPaths: [...bundle.changedPaths],
        changedRegions: [...bundle.changedRegions],
        reasons: [...bundle.reasons],
        ...(bundle.semanticImport ? { semanticImport: cloneJsonValue(bundle.semanticImport) as FrontierSwarmSemanticImportSummary } : {}),
        generatedAt: bundle.generatedAt
      });
    }
  }
  for (const raw of input.results ?? []) {
    const result = isSwarmJobResult(raw) ? cloneJsonValue(raw) as FrontierSwarmJobResult : deps.normalizeResult(raw);
    const queueItemIds = result.queueItemIds.length ? result.queueItemIds : [result.jobId];
    for (const queueItemId of queueItemIds) {
      entries.push({
        queueItemId,
        jobId: result.jobId,
        status: queueOverlayStatusFromResult(result),
        mergeReadiness: result.mergeReadiness,
        disposition: result.mergeDisposition,
        riskLevel: result.riskLevel,
        ...(result.patchPath ? { patchPath: result.patchPath } : {}),
        evidencePaths: [...result.evidencePaths],
        changedPaths: [...result.changedPaths],
        changedRegions: [...result.changedRegions],
        reasons: result.error ? [result.error] : [],
        ...(result.semanticImport ? { semanticImport: cloneJsonValue(result.semanticImport) as FrontierSwarmSemanticImportSummary } : {}),
        generatedAt
      });
    }
  }
  const byQueueItemId = groupOverlayEntries(entries);
  return {
    kind: 'frontier.swarm.queue-overlay',
    version: 1,
    id: input.id ?? 'swarm-queue-overlay:' + stableHash([input.runId, entries, generatedAt]),
    ...(input.runId ? { runId: input.runId } : {}),
    generatedAt,
    entries,
    byQueueItemId,
    summary: {
      entryCount: entries.length,
      queueItemCount: Object.keys(byQueueItemId).length,
      readyToApplyCount: entries.filter((entry) => entry.status === 'ready-to-apply').length,
      needsHumanPortCount: entries.filter((entry) => entry.status === 'needs-human-port').length,
      failedEvidenceCount: entries.filter((entry) => entry.status === 'failed-evidence').length,
      staleAgainstHeadCount: entries.filter((entry) => entry.status === 'stale-against-head').length,
      discoveryOnlyCount: entries.filter((entry) => entry.status === 'discovery-only').length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function deriveSwarmQueueStatus(input: FrontierSwarmDerivedQueueStatusInput): FrontierSwarmDerivedQueueStatus {
  const generatedAt = input.generatedAt ?? Date.now();
  const latestByQueueItem = new Map<string, FrontierSwarmQueueOverlayEntry>();
  for (const overlay of input.overlays ?? []) {
    for (const entry of overlay.entries) {
      const existing = latestByQueueItem.get(entry.queueItemId);
      if (!existing || entry.generatedAt >= existing.generatedAt) latestByQueueItem.set(entry.queueItemId, entry);
    }
  }
  const jobs = input.snapshot.jobs.map((job) => {
    const overlay = latestByQueueItem.get(job.taskId ?? job.jobId) ?? latestByQueueItem.get(job.jobId);
    if (!overlay) return cloneJsonValue(job) as FrontierSwarmQueueJob;
    return {
      ...cloneJsonValue(job) as FrontierSwarmQueueJob,
      status: queueJobStatusFromOverlay(overlay),
      lastError: overlay.status === 'failed-evidence' || overlay.status === 'stale-against-head' ? overlay.reasons.join(', ') : job.lastError,
      metadata: toJsonObject({
        ...(job.metadata ?? {}),
        overlayStatus: overlay.status,
        mergeDisposition: overlay.disposition,
        mergeReadiness: overlay.mergeReadiness,
        ...(overlay.semanticImport ? { semanticImport: overlay.semanticImport } : {}),
        evidencePaths: overlay.evidencePaths
      })
    };
  });
  const byStatus = groupIds(jobs, (job) => job.status);
  return {
    generatedAt,
    jobs,
    byStatus,
    summary: {
      jobCount: jobs.length,
      leaseCount: input.snapshot.leases.length,
      readyCount: byStatus.ready?.length ?? 0,
      leasedCount: byStatus.leased?.length ?? 0,
      completedCount: byStatus.completed?.length ?? 0,
      failedCount: byStatus.failed?.length ?? 0,
      deadLetterCount: byStatus['dead-letter']?.length ?? 0
    }
  };
}

function isSwarmJobResult(value: FrontierSwarmJobResult | FrontierSwarmJobResultInput): value is FrontierSwarmJobResult {
  return Array.isArray((value as FrontierSwarmJobResult).changedPaths)
    && Array.isArray((value as FrontierSwarmJobResult).changedRegions)
    && Array.isArray((value as FrontierSwarmJobResult).verification)
    && Array.isArray((value as FrontierSwarmJobResult).queueItemIds)
    && typeof (value as FrontierSwarmJobResult).riskLevel === 'string'
    && typeof (value as FrontierSwarmJobResult).mergeDisposition === 'string';
}

function queueOverlayStatusFromBundle(bundle: FrontierSwarmMergeBundle): FrontierSwarmQueueOverlayStatus {
  if (bundle.staleAgainstHead || bundle.disposition === 'stale-against-head') return 'stale-against-head';
  if (bundle.disposition === 'rejected' || bundle.disposition === 'blocked' || bundle.status === 'failed' || bundle.commandsFailed.length > 0) {
    return 'failed-evidence';
  }
  if (bundle.disposition === 'auto-mergeable' && bundle.autoMergeable) return 'ready-to-apply';
  if (bundle.disposition === 'needs-port') return 'needs-human-port';
  if (bundle.disposition === 'discovery-only') return 'discovery-only';
  if (bundle.mergeReadiness === 'blocked') return 'blocked';
  if (bundle.mergeReadiness === 'rejected') return 'rejected';
  return 'unknown';
}

function queueOverlayStatusFromResult(result: FrontierSwarmJobResult): FrontierSwarmQueueOverlayStatus {
  if (result.mergeDisposition === 'stale-against-head') return 'stale-against-head';
  if (result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0 || result.ownershipViolations.length > 0) return 'failed-evidence';
  if (result.mergeDisposition === 'auto-mergeable') return 'ready-to-apply';
  if (result.mergeDisposition === 'needs-port') return 'needs-human-port';
  if (result.mergeDisposition === 'discovery-only') return 'discovery-only';
  if (result.status === 'blocked') return 'blocked';
  return 'unknown';
}

function queueJobStatusFromOverlay(entry: FrontierSwarmQueueOverlayEntry): FrontierSwarmQueueJobStatus {
  if (entry.status === 'ready-to-apply' || entry.status === 'discovery-only') return 'completed';
  if (entry.status === 'needs-human-port') return 'blocked';
  if (entry.status === 'failed-evidence' || entry.status === 'rejected' || entry.status === 'stale-against-head') return 'failed';
  if (entry.status === 'blocked') return 'blocked';
  return 'completed';
}

function groupOverlayEntries(entries: readonly FrontierSwarmQueueOverlayEntry[]): Record<string, FrontierSwarmQueueOverlayEntry[]> {
  const out: Record<string, FrontierSwarmQueueOverlayEntry[]> = {};
  for (const entry of entries) out[entry.queueItemId] = [...(out[entry.queueItemId] ?? []), entry];
  for (const key of Object.keys(out)) {
    out[key] = [...(out[key] ?? [])].sort((left, right) => right.generatedAt - left.generatedAt || left.jobId.localeCompare(right.jobId));
  }
  return out;
}

function groupIds<T extends { jobId?: string; id?: string }>(items: readonly T[], key: (item: T) => string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const item of items) {
    const id = item.jobId ?? item.id;
    if (!id) continue;
    const group = key(item);
    out[group] = [...(out[group] ?? []), id];
  }
  return out;
}
