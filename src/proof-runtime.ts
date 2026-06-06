import { cloneJsonValue, stableHash, toJsonObject } from './internal.js';
import { FRONTIER_SWARM_ARTIFACT_INDEX_KIND, FRONTIER_SWARM_ARTIFACT_INDEX_VERSION, FRONTIER_SWARM_PROOF_KIND, FRONTIER_SWARM_PROOF_VERSION, FRONTIER_SWARM_QUEUE_SNAPSHOT_KIND, FRONTIER_SWARM_QUEUE_SNAPSHOT_VERSION, FRONTIER_SWARM_RUN_CHECKPOINT_KIND, FRONTIER_SWARM_RUN_CHECKPOINT_VERSION } from './constants.js';
import { normalizeArtifact } from './merge-plan-helpers.js';
import { normalizeQueueJob, queueJobsFromPlan } from './run-normalization.js';
import type { FrontierSwarmArtifact, FrontierSwarmArtifactIndex, FrontierSwarmArtifactInput, FrontierSwarmBudgetDecision, FrontierSwarmManifest, FrontierSwarmProof, FrontierSwarmQueueSnapshot, FrontierSwarmQueueSnapshotInput, FrontierSwarmRun, FrontierSwarmRunCheckpoint, FrontierSwarmRunCheckpointInput, FrontierSwarmUsage, FrontierSwarmUsageInput, FrontierSwarmValidation } from './types.js';
import type { FrontierSwarmJob, FrontierSwarmPlan } from './plan.js';
import type { FrontierSwarmLease } from './leases.js';

export function createSwarmProof(
  input: FrontierSwarmManifest | FrontierSwarmPlan | FrontierSwarmRun,
  options: { generatedAt?: number; validation?: FrontierSwarmValidation; metadata?: unknown } = {}
): FrontierSwarmProof {
  const manifestId = 'manifestId' in input ? input.manifestId : input.id;
  const summary = input.summary;
  const generatedAt = options.generatedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_PROOF_KIND,
    version: FRONTIER_SWARM_PROOF_VERSION,
    id: 'swarm-proof:' + stableHash([manifestId, summary, generatedAt]),
    manifestId,
    generatedAt,
    hash: stableHash([input, options.validation, options.metadata]),
    summary,
    ...(options.validation ? { validation: options.validation } : {}),
    ...(toJsonObject(options.metadata) ? { metadata: toJsonObject(options.metadata) } : {})
  };
}
export function createSwarmQueueSnapshot(input: FrontierSwarmQueueSnapshotInput): FrontierSwarmQueueSnapshot {
  const generatedAt = input.generatedAt ?? Date.now();
  const leases = [...(input.leases ?? [])].map((lease) => cloneJsonValue(lease) as FrontierSwarmLease);
  const jobs = (input.jobs ? input.jobs.map(normalizeQueueJob) : queueJobsFromPlan(input.plan, input.run, leases)).sort((left, right) => (
    left.priority - right.priority
    || left.jobId.localeCompare(right.jobId)
  ));
  const byStatus = groupIds(jobs, (job) => job.status);
  const byLane = groupIds(jobs, (job) => job.lane ?? 'unassigned');
  return {
    kind: FRONTIER_SWARM_QUEUE_SNAPSHOT_KIND,
    version: FRONTIER_SWARM_QUEUE_SNAPSHOT_VERSION,
    id: input.id ?? 'swarm-queue-snapshot:' + stableHash([input.plan.id, input.run?.id, jobs, leases, generatedAt]),
    planId: input.plan.id,
    runId: input.run?.id ?? input.plan.runId,
    generatedAt,
    jobs,
    byStatus,
    byLane,
    leases,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {}),
    summary: {
      jobCount: jobs.length,
      leaseCount: leases.length,
      readyCount: byStatus.ready?.length ?? 0,
      leasedCount: byStatus.leased?.length ?? 0,
      completedCount: byStatus.completed?.length ?? 0,
      failedCount: byStatus.failed?.length ?? 0,
      deadLetterCount: byStatus['dead-letter']?.length ?? 0
    }
  };
}
export function createSwarmRunCheckpoint(input: FrontierSwarmRun | FrontierSwarmRunCheckpointInput): FrontierSwarmRunCheckpoint {
  const run = 'kind' in input ? input : input.run;
  const sequence = 'kind' in input ? run.events.length + run.results.length : input.sequence ?? run.events.length + run.results.length;
  const savedAt = 'kind' in input ? Date.now() : input.savedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_RUN_CHECKPOINT_KIND,
    version: FRONTIER_SWARM_RUN_CHECKPOINT_VERSION,
    id: 'swarm-run-checkpoint:' + stableHash([run.id, sequence, savedAt, run.summary]),
    runId: run.id,
    planId: run.planId,
    sequence,
    savedAt,
    status: run.status,
    eventCount: run.events.length,
    resultCount: run.results.length,
    hash: stableHash(run),
    ...(!('kind' in input) && toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function checkSwarmBudget(job: FrontierSwarmJob, usageInput: FrontierSwarmUsageInput): FrontierSwarmBudgetDecision {
  const usage = normalizeUsage(usageInput);
  const budget = job.budget;
  const violations: string[] = [];
  if (budget?.maxCostUsd !== undefined && usage.costUsd > budget.maxCostUsd) violations.push('max-cost-usd');
  if (budget?.maxInputTokens !== undefined && usage.inputTokens > budget.maxInputTokens) violations.push('max-input-tokens');
  if (budget?.maxOutputTokens !== undefined && usage.outputTokens > budget.maxOutputTokens) violations.push('max-output-tokens');
  if (budget?.maxDurationMs !== undefined && usage.durationMs > budget.maxDurationMs) violations.push('max-duration-ms');
  if (budget && usage.attempts > budget.maxRetries + 1) violations.push('max-retries');
  return { ok: violations.length === 0, jobId: job.id, usage, ...(budget ? { budget } : {}), violations };
}
export function createSwarmArtifactIndex(input: FrontierSwarmRun | { run?: FrontierSwarmRun; artifacts?: readonly FrontierSwarmArtifactInput[]; generatedAt?: number }): FrontierSwarmArtifactIndex {
  const run = 'kind' in input ? input : input.run;
  const generatedAt = 'kind' in input ? Date.now() : input.generatedAt ?? Date.now();
  const explicit = 'kind' in input ? [] : input.artifacts ?? [];
  const artifacts = [
    ...(run?.results ?? []).flatMap((result) => result.evidencePaths.map((evidencePath) => normalizeArtifact({ jobId: result.jobId, path: evidencePath, kind: 'evidence' }))),
    ...explicit.map(normalizeArtifact)
  ].sort((left, right) => left.jobId.localeCompare(right.jobId) || left.path.localeCompare(right.path));
  const byJobId = groupArtifacts(artifacts, (artifact) => artifact.jobId);
  const byKind = groupArtifacts(artifacts, (artifact) => artifact.kind);
  return {
    kind: FRONTIER_SWARM_ARTIFACT_INDEX_KIND,
    version: FRONTIER_SWARM_ARTIFACT_INDEX_VERSION,
    id: 'swarm-artifact-index:' + stableHash([artifacts, generatedAt]),
    generatedAt,
    artifacts,
    byJobId,
    byKind,
    summary: {
      artifactCount: artifacts.length,
      jobCount: Object.keys(byJobId).length,
      kindCount: Object.keys(byKind).length,
      totalBytes: artifacts.reduce((total, artifact) => total + (artifact.bytes ?? 0), 0)
    }
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
function normalizeUsage(input: FrontierSwarmUsageInput): FrontierSwarmUsage {
  return {
    costUsd: Math.max(0, input.costUsd ?? 0),
    inputTokens: Math.max(0, Math.floor(input.inputTokens ?? 0)),
    outputTokens: Math.max(0, Math.floor(input.outputTokens ?? 0)),
    durationMs: Math.max(0, Math.floor(input.durationMs ?? 0)),
    attempts: Math.max(1, Math.floor(input.attempts ?? 1)),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function groupArtifacts(artifacts: readonly FrontierSwarmArtifact[], key: (artifact: FrontierSwarmArtifact) => string): Record<string, FrontierSwarmArtifact[]> {
  const out: Record<string, FrontierSwarmArtifact[]> = {};
  for (const artifact of artifacts) {
    const group = key(artifact);
    out[group] = [...(out[group] ?? []), artifact];
  }
  return out;
}
