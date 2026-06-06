import { FRONTIER_SWARM_EVENT_KIND, FRONTIER_SWARM_EVENT_VERSION } from './constants.js';
import { stringifyError, toJsonValue } from './coercion.js';
import { cloneJsonValue, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { classifySwarmMergeDisposition, classifySwarmMergeReadiness } from './merge-classification.js';
import { normalizeSemanticImportSummary } from './semantic-normalization.js';
import type { FrontierSwarmLease } from './leases.js';
import type { FrontierSwarmJob, FrontierSwarmPlan } from './plan.js';
import type {
  FrontierSwarmEvent,
  FrontierSwarmEventInput,
  FrontierSwarmJobResult,
  FrontierSwarmJobResultInput,
  FrontierSwarmQueueJob,
  FrontierSwarmQueueJobInput,
  FrontierSwarmQueueJobStatus,
  FrontierSwarmRun,
  FrontierSwarmVerificationResult,
  FrontierSwarmVerificationResultInput
} from './index.js';

export function normalizeEvent(input: FrontierSwarmEventInput): FrontierSwarmEvent {
  const at = input.at ?? Date.now();
  return {
    kind: FRONTIER_SWARM_EVENT_KIND,
    version: FRONTIER_SWARM_EVENT_VERSION,
    id: input.id ?? 'swarm-event:' + stableHash([input.type, input.runId, input.jobId, at, input.data]),
    type: input.type,
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.taskId ? { taskId: input.taskId } : {}),
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.layer ? { layer: input.layer } : {}),
    ...(input.compute ? { compute: input.compute } : {}),
    at,
    ...(input.message ? { message: input.message } : {}),
    ...(input.data !== undefined ? { data: toJsonValue(input.data) } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function normalizeQueueJob(input: FrontierSwarmQueueJobInput): FrontierSwarmQueueJob {
  return {
    jobId: input.jobId,
    ...(input.taskId ? { taskId: input.taskId } : {}),
    ...(input.runId ? { runId: input.runId } : {}),
    status: input.status ?? 'ready',
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.compute ? { compute: input.compute } : {}),
    ...(input.concurrencyKey ? { concurrencyKey: input.concurrencyKey } : {}),
    priority: input.priority ?? 100,
    attempts: Math.max(0, Math.floor(input.attempts ?? 0)),
    maxAttempts: Math.max(1, Math.floor(input.maxAttempts ?? 1)),
    ...(input.availableAt !== undefined ? { availableAt: input.availableAt } : {}),
    ...(input.lease ? { lease: cloneJsonValue(input.lease) as FrontierSwarmLease } : {}),
    ...(input.lastError ? { lastError: input.lastError } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function queueJobsFromPlan(
  plan: FrontierSwarmPlan,
  run: FrontierSwarmRun | undefined,
  leases: readonly FrontierSwarmLease[]
): FrontierSwarmQueueJob[] {
  const resultsByJob = new Map((run?.results ?? []).map((result) => [result.jobId, result]));
  const activeLeases = new Map(leases.filter((lease) => lease.status === 'active').map((lease) => [lease.jobId, lease]));
  return plan.jobs.map((job) => {
    const result = resultsByJob.get(job.id);
    const lease = activeLeases.get(job.id);
    const failed = result?.status === 'failed' || result?.exitCode !== undefined && result.exitCode !== 0;
    const completed = result?.status === 'completed' || result?.status === 'verified';
    const status: FrontierSwarmQueueJobStatus = completed
      ? 'completed'
      : failed
        ? 'failed'
        : lease
          ? 'leased'
          : job.status === 'running'
            ? 'running'
            : 'ready';
    return normalizeQueueJob({
      jobId: job.id,
      taskId: job.taskId,
      runId: run?.id ?? plan.runId,
      status,
      lane: job.lane,
      compute: job.compute.id,
      concurrencyKey: job.concurrencyKey,
      priority: job.priority,
      attempts: result?.metadata && typeof result.metadata.attempts === 'number' ? result.metadata.attempts : undefined,
      maxAttempts: job.budget?.maxRetries !== undefined ? job.budget.maxRetries + 1 : 1,
      lease,
      lastError: result?.error
    });
  });
}

export function normalizeResult(input: FrontierSwarmJobResultInput): FrontierSwarmJobResult {
  const startedAt = input.startedAt;
  const finishedAt = input.finishedAt;
  const status = input.status ?? (input.exitCode === 0 || input.exitCode === undefined ? 'completed' : 'failed');
  const inputMetadata = toJsonObject(input.metadata);
  const semanticImport = normalizeSemanticImportSummary(input.semanticImport ?? inputMetadata?.semanticImport);
  return {
    jobId: input.jobId,
    status,
    mergeReadiness: classifySwarmMergeReadiness({ ...input, status }),
    ...(startedAt !== undefined ? { startedAt } : {}),
    ...(finishedAt !== undefined ? { finishedAt } : {}),
    ...(startedAt !== undefined && finishedAt !== undefined ? { durationMs: Math.max(0, finishedAt - startedAt) } : {}),
    ...(input.exitCode !== undefined ? { exitCode: input.exitCode } : {}),
    ...(input.signal ? { signal: input.signal } : {}),
    changedPaths: uniqueStrings(input.changedPaths ?? []),
    changedRegions: uniqueStrings(input.changedRegions ?? []),
    ownershipViolations: uniqueStrings(input.ownershipViolations ?? []),
    evidencePaths: uniqueStrings(input.evidencePaths ?? []),
    ...(input.patchPath ? { patchPath: input.patchPath } : {}),
    queueItemIds: uniqueStrings(input.queueItemIds ?? []),
    riskLevel: input.riskLevel ?? 'unknown',
    mergeDisposition: input.mergeDisposition ?? classifySwarmMergeDisposition({ ...input, status }),
    verification: (input.verification ?? []).map(normalizeVerificationResult),
    ...(semanticImport ? { semanticImport } : {}),
    ...(input.lastMessage ? { lastMessage: input.lastMessage } : {}),
    ...(input.error !== undefined ? { error: stringifyError(input.error) } : {}),
    ...(inputMetadata ? { metadata: inputMetadata } : {})
  };
}

export function isSwarmJobResult(value: FrontierSwarmJobResult | FrontierSwarmJobResultInput): value is FrontierSwarmJobResult {
  return Array.isArray((value as FrontierSwarmJobResult).changedPaths)
    && Array.isArray((value as FrontierSwarmJobResult).changedRegions)
    && Array.isArray((value as FrontierSwarmJobResult).verification)
    && Array.isArray((value as FrontierSwarmJobResult).queueItemIds)
    && typeof (value as FrontierSwarmJobResult).riskLevel === 'string'
    && typeof (value as FrontierSwarmJobResult).mergeDisposition === 'string';
}

function normalizeVerificationResult(input: FrontierSwarmVerificationResultInput): FrontierSwarmVerificationResult {
  return {
    name: input.name ?? ((input.command ?? []).join(' ') || 'verification'),
    command: [...(input.command ?? [])],
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.durationMs !== undefined ? { durationMs: input.durationMs } : {}),
    stdoutTail: [...(input.stdoutTail ?? [])],
    stderrTail: [...(input.stderrTail ?? [])],
    required: input.required ?? true,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
