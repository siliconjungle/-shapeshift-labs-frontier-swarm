import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmSchedule } from './scheduler.js';
import type { FrontierSwarmCoordinatorDashboard } from './coordinator-dashboard-types.js';
import type {
  FrontierSwarmAdaptiveDecisionTarget,
  FrontierSwarmAdaptiveObservation,
  FrontierSwarmAdaptiveObservationInput,
  FrontierSwarmAdaptiveObservationKind,
  FrontierSwarmAdaptiveObservationSeverity
} from './adaptive-load-types.js';
import type { FrontierSwarmMergeAdmission, FrontierSwarmMergeIndex, FrontierSwarmRun, FrontierSwarmSemanticImportSummary } from './index.js';

export function normalizeAdaptiveObservations(
  input: readonly FrontierSwarmAdaptiveObservationInput[],
  generatedAt: number
): FrontierSwarmAdaptiveObservation[] {
  const out: FrontierSwarmAdaptiveObservation[] = [];
  input.forEach((entry, index) => {
    const reasons = uniqueStrings([...(entry.reason ? [entry.reason] : []), ...(entry.reasons ?? [])]);
    const at = entry.at ?? generatedAt;
    out.push({
      id: entry.id ?? 'swarm-adaptive-observation:' + stableHash([entry.kind, entry.jobId, entry.lane, entry.resource, reasons, index, at]),
      kind: entry.kind,
      severity: entry.severity ?? adaptiveDefaultSeverity(entry.kind),
      at,
      value: Number.isFinite(entry.value) ? Number(entry.value) : 1,
      ...(entry.jobId ? { jobId: entry.jobId } : {}),
      ...(entry.taskId ? { taskId: entry.taskId } : {}),
      ...(entry.lane ? { lane: entry.lane } : {}),
      ...(entry.compute ? { compute: entry.compute } : {}),
      ...(entry.concurrencyKey ? { concurrencyKey: entry.concurrencyKey } : {}),
      ...(entry.resource ? { resource: entry.resource } : {}),
      ...(entry.path ? { path: entry.path } : {}),
      ...(entry.region ? { region: entry.region } : {}),
      reasons: reasons.length ? reasons : [entry.kind],
      ...(toJsonObject(entry.metadata) ? { metadata: toJsonObject(entry.metadata) } : {})
    });
  });
  return dedupeAdaptiveObservations(out);
}

export function deriveAdaptiveScheduleObservations(schedule: FrontierSwarmSchedule | undefined, at: number): FrontierSwarmAdaptiveObservationInput[] {
  if (!schedule) return [];
  const observations: FrontierSwarmAdaptiveObservationInput[] = [];
  for (const blocked of schedule.blocked) {
    for (const reason of blocked.reasons) {
      if (reason === 'waiting-for-dependencies') continue;
      const resource = reason.startsWith('resource-capacity:') ? reason.slice('resource-capacity:'.length) : undefined;
      observations.push({
        kind: resource ? 'resource-capacity' : reason as FrontierSwarmAdaptiveObservationKind,
        severity: reason === 'ready-capacity' ? 'info' : 'warning',
        at,
        jobId: blocked.jobId,
        taskId: blocked.taskId,
        lane: blocked.lane,
        compute: blocked.compute,
        concurrencyKey: blocked.concurrencyKey,
        ...(resource ? { resource } : {}),
        reason
      });
    }
  }
  return observations;
}

export function deriveAdaptiveRunObservations(run: FrontierSwarmRun | undefined, at: number): FrontierSwarmAdaptiveObservationInput[] {
  if (!run) return [];
  const observations: FrontierSwarmAdaptiveObservationInput[] = [];
  for (const result of run.results) {
    if (result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0 || result.verification.some((entry) => entry.required !== false && entry.status !== undefined && entry.status !== 0)) {
      observations.push({ kind: 'evidence-failure', severity: 'error', at, jobId: result.jobId, reason: 'worker failed or required evidence command failed' });
    }
    if (result.mergeDisposition === 'discovery-only' || result.mergeReadiness === 'discovery-only') {
      observations.push({ kind: 'discovery-only-output', severity: 'info', at, jobId: result.jobId, reason: 'worker produced discovery output instead of a mergeable patch' });
    }
    if (semanticSummaryIsEmpty(result.semanticImport)) {
      observations.push({ kind: 'semantic-empty', severity: 'warning', at, jobId: result.jobId, reason: 'semantic import emitted no selected/imported files or symbols' });
    } else if (semanticSummaryIsWeak(result.semanticImport)) {
      observations.push({ kind: 'semantic-weak', severity: 'info', at, jobId: result.jobId, reason: 'semantic import has limited source maps, regions, or patch hints' });
    }
    if (result.durationMs !== undefined && result.durationMs > 900000) {
      observations.push({ kind: 'slow-job', severity: 'warning', at, jobId: result.jobId, value: result.durationMs, reason: 'worker duration exceeded adaptive slow-job threshold' });
    }
    if ((result.status === 'completed' || result.status === 'verified') && result.exitCode === 0 && result.changedPaths.length > 0 && result.mergeDisposition !== 'discovery-only') {
      observations.push({ kind: 'healthy-throughput', severity: 'info', at, jobId: result.jobId, reason: 'worker completed with changed paths' });
    }
  }
  return observations;
}

export function deriveAdaptiveMergeIndexObservations(index: FrontierSwarmMergeIndex | undefined, at: number): FrontierSwarmAdaptiveObservationInput[] {
  if (!index) return [];
  const observations: FrontierSwarmAdaptiveObservationInput[] = [];
  for (const entry of index.entries) {
    if (entry.staleAgainstHead || entry.disposition === 'stale-against-head') {
      observations.push({ kind: 'stale-patch', severity: 'warning', at, jobId: entry.jobId, lane: entry.lane, path: entry.changedPaths[0], region: entry.changedRegions[0], reason: 'patch is stale against coordinator head' });
    }
    if (entry.conflictingJobIds.length) {
      observations.push({ kind: 'merge-conflict', severity: 'warning', at, jobId: entry.jobId, lane: entry.lane, path: entry.changedPaths[0], region: entry.changedRegions[0], value: entry.conflictingJobIds.length, reason: 'merge index found conflicting changed paths or regions' });
    }
    if (entry.disposition === 'discovery-only') {
      observations.push({ kind: 'discovery-only-output', severity: 'info', at, jobId: entry.jobId, lane: entry.lane, reason: 'merge index classified the bundle as discovery-only' });
    }
    if (semanticSummaryIsEmpty(entry.semanticImport)) {
      observations.push({ kind: 'semantic-empty', severity: 'warning', at, jobId: entry.jobId, lane: entry.lane, reason: 'semantic sidecar is present but empty' });
    } else if (semanticSummaryIsWeak(entry.semanticImport)) {
      observations.push({ kind: 'semantic-weak', severity: 'info', at, jobId: entry.jobId, lane: entry.lane, reason: 'semantic sidecar lacks merge-useful structure' });
    }
  }
  return observations;
}

export function deriveAdaptiveDashboardObservations(dashboard: FrontierSwarmCoordinatorDashboard | undefined, at: number): FrontierSwarmAdaptiveObservationInput[] {
  if (!dashboard) return [];
  const observations: FrontierSwarmAdaptiveObservationInput[] = [];
  for (const job of dashboard.jobs) {
    if (job.duplicateGroupId) {
      observations.push({ kind: 'duplicate-output', severity: 'info', at, jobId: job.jobId, lane: job.lane, path: job.changedPaths[0], region: job.changedRegions[0], reason: 'coordinator dashboard found duplicate worker output' });
    }
    if (job.tests.requiredFailed > 0) {
      observations.push({ kind: 'evidence-failure', severity: 'error', at, jobId: job.jobId, lane: job.lane, reason: 'dashboard shows required evidence failures' });
    }
    if (job.staleAgainstHead) {
      observations.push({ kind: 'stale-patch', severity: 'warning', at, jobId: job.jobId, lane: job.lane, path: job.changedPaths[0], reason: 'dashboard marks patch stale against head' });
    }
    if (semanticSummaryIsEmpty(job.semanticImport)) {
      observations.push({ kind: 'semantic-empty', severity: 'warning', at, jobId: job.jobId, lane: job.lane, reason: 'dashboard semantic import summary is empty' });
    }
  }
  return observations;
}

export function deriveAdaptiveAdmissionObservations(admission: FrontierSwarmMergeAdmission | undefined, at: number): FrontierSwarmAdaptiveObservationInput[] {
  if (!admission) return [];
  const observations: FrontierSwarmAdaptiveObservationInput[] = [];
  for (const deferral of admission.deferred) {
    for (const reason of deferral.reasons) {
      const kind: FrontierSwarmAdaptiveObservationKind = reason === 'stale-against-head'
        ? 'stale-patch'
        : reason === 'conflicting-changes'
          ? 'merge-conflict'
          : reason === 'not-auto-mergeable'
            ? 'discovery-only-output'
            : reason === 'max-ready'
              ? 'ready-capacity'
              : 'budget-pressure';
      observations.push({ kind, severity: kind === 'ready-capacity' ? 'info' : 'warning', at, jobId: deferral.jobId, reason: `merge admission deferred: ${reason}` });
    }
  }
  return observations;
}

export function adaptiveObservationShouldReduceReadyWindow(observation: FrontierSwarmAdaptiveObservation): boolean {
  return observation.kind === 'evidence-failure'
    || observation.kind === 'stale-patch'
    || observation.kind === 'browser-contention'
    || observation.kind === 'semantic-empty'
    || observation.kind === 'log-noise'
    || observation.kind === 'discovery-only-output'
    || observation.kind === 'budget-pressure'
    || observation.kind === 'slow-job';
}

export function adaptiveObservationIsCapacityBackpressure(observation: FrontierSwarmAdaptiveObservation): boolean {
  return observation.kind === 'resource-capacity'
    || observation.kind === 'lane-capacity'
    || observation.kind === 'concurrency-key-capacity'
    || observation.kind === 'compute-capacity';
}

export function adaptiveDecisionTargetForObservation(observation: FrontierSwarmAdaptiveObservation): FrontierSwarmAdaptiveDecisionTarget {
  if (observation.kind === 'resource-capacity' || observation.kind === 'browser-contention') return 'resource';
  if (observation.kind === 'lane-capacity') return 'lane';
  if (observation.kind === 'concurrency-key-capacity' || observation.kind === 'merge-conflict' || observation.kind === 'duplicate-output') return 'concurrency-key';
  if (observation.kind === 'compute-capacity') return 'compute';
  if (observation.lane) return 'lane';
  return 'max-ready-jobs';
}

export function adaptiveDecisionKeyForObservation(observation: FrontierSwarmAdaptiveObservation): string | undefined {
  const target = adaptiveDecisionTargetForObservation(observation);
  if (target === 'resource') return observation.resource ?? (observation.kind === 'browser-contention' ? 'browser' : undefined);
  if (target === 'lane') return observation.lane;
  if (target === 'concurrency-key') return observation.concurrencyKey ?? observation.region ?? observation.path;
  if (target === 'compute') return observation.compute;
  return undefined;
}

export function adaptiveObservationIsBottleneck(observation: FrontierSwarmAdaptiveObservation): boolean {
  if (observation.kind === 'healthy-throughput' || observation.kind === 'ready-capacity') return false;
  return observation.severity !== 'info'
    || observation.kind === 'merge-conflict'
    || observation.kind === 'stale-patch'
    || observation.kind === 'semantic-empty'
    || observation.kind === 'log-noise'
    || observation.kind === 'duplicate-output';
}

function adaptiveDefaultSeverity(kind: FrontierSwarmAdaptiveObservationKind): FrontierSwarmAdaptiveObservationSeverity {
  if (kind === 'evidence-failure' || kind === 'budget-pressure') return 'error';
  if (kind === 'merge-conflict' || kind === 'stale-patch' || kind === 'semantic-empty' || kind === 'browser-contention' || kind.endsWith('-capacity')) return 'warning';
  return 'info';
}

function semanticSummaryIsEmpty(summary: FrontierSwarmSemanticImportSummary | undefined): boolean {
  if (!summary) return false;
  return summary.total === 0
    || summary.selected === 0 && summary.eligible === 0 && summary.imported === 0 && summary.semanticIndex.symbols === 0 && summary.semanticSidecars.symbols === 0;
}

function semanticSummaryIsWeak(summary: FrontierSwarmSemanticImportSummary | undefined): boolean {
  if (!summary || semanticSummaryIsEmpty(summary)) return false;
  return summary.imported === 0
    || summary.semanticIndex.symbols === 0
    || summary.semanticSidecars.ownershipRegions === 0
    || summary.sourceMapMappingCount === 0
    || summary.proofSpec.failed > 0
    || summary.proofSpec.stale > 0
    || summary.proofSpec.open > 0
    || summary.proofSpec.unknown > 0;
}

function dedupeAdaptiveObservations(observations: readonly FrontierSwarmAdaptiveObservation[]): FrontierSwarmAdaptiveObservation[] {
  const byKey = new Map<string, FrontierSwarmAdaptiveObservation>();
  for (const observation of observations) {
    const key = [
      observation.kind,
      observation.jobId ?? '',
      observation.lane ?? '',
      observation.compute ?? '',
      observation.concurrencyKey ?? '',
      observation.resource ?? '',
      observation.path ?? '',
      observation.region ?? '',
      observation.reasons.join('|')
    ].join('\0');
    const existing = byKey.get(key);
    if (!existing || adaptiveSeverityRank(observation.severity) > adaptiveSeverityRank(existing.severity)) byKey.set(key, observation);
  }
  return Array.from(byKey.values()).sort((left, right) => adaptiveSeverityRank(right.severity) - adaptiveSeverityRank(left.severity) || left.kind.localeCompare(right.kind) || (left.jobId ?? '').localeCompare(right.jobId ?? ''));
}

function adaptiveSeverityRank(severity: FrontierSwarmAdaptiveObservationSeverity): number {
  if (severity === 'critical') return 4;
  if (severity === 'error') return 3;
  if (severity === 'warning') return 2;
  if (severity === 'info') return 1;
  return 0;
}
