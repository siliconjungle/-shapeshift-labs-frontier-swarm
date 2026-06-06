import { cloneJsonValue, matchesGlob, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type {
  FrontierSwarmJob,
  FrontierSwarmJobResult,
  FrontierSwarmJobResultInput,
  FrontierSwarmMergeBundle,
  FrontierSwarmMergeBundleInput,
  FrontierSwarmMergeDisposition,
  FrontierSwarmMergeReadiness,
  FrontierSwarmRiskLevel,
  FrontierSwarmSemanticImportSummary,
  FrontierSwarmTraceShard,
  FrontierSwarmTraceShardInput
} from './index.js';

export interface FrontierSwarmMergeBundleDeps {
  normalizeResult(input: FrontierSwarmJobResultInput): FrontierSwarmJobResult;
  normalizeSemanticImportSummary(input: unknown): FrontierSwarmSemanticImportSummary | undefined;
  createSwarmTraceShard(input?: FrontierSwarmTraceShardInput): FrontierSwarmTraceShard;
  resolveSwarmChangedRegions(job: FrontierSwarmJob, changedPaths: readonly string[]): string[];
}

export function classifySwarmMergeReadiness(result: FrontierSwarmJobResultInput | FrontierSwarmJobResult): FrontierSwarmMergeReadiness {
  if (result.mergeReadiness) return result.mergeReadiness;
  if (result.status === 'blocked') return 'blocked';
  if (result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0) return 'rejected';
  const changedPaths = result.changedPaths ?? [];
  if (changedPaths.length === 0) return 'discovery-only';
  const ownershipViolations = result.ownershipViolations ?? [];
  if (ownershipViolations.length) return 'rejected';
  const verification = result.verification ?? [];
  const failedRequired = verification.some((entry) => entry.required !== false && entry.status !== 0);
  if (failedRequired) return 'patch-candidate';
  return verification.length > 0 || result.status === 'verified' ? 'verified-patch' : 'patch-candidate';
}

export function classifySwarmMergeDisposition(
  result: FrontierSwarmJobResultInput | FrontierSwarmJobResult,
  input: { staleAgainstHead?: boolean } = {}
): FrontierSwarmMergeDisposition {
  if (result.mergeDisposition) return result.mergeDisposition;
  if (input.staleAgainstHead) return 'stale-against-head';
  const readiness = classifySwarmMergeReadiness(result);
  if (readiness === 'discovery-only') return 'discovery-only';
  if (readiness === 'blocked') return 'blocked';
  if (readiness === 'rejected') return 'rejected';
  if (readiness === 'verified-patch') return 'auto-mergeable';
  return 'needs-port';
}

export function createSwarmMergeBundle(
  input: FrontierSwarmMergeBundleInput,
  deps: FrontierSwarmMergeBundleDeps
): FrontierSwarmMergeBundle {
  const generatedAt = input.generatedAt ?? Date.now();
  const result = isSwarmJobResult(input.result) ? cloneJsonValue(input.result) as FrontierSwarmJobResult : deps.normalizeResult(input.result);
  const job = input.job;
  const inputMetadata = toJsonObject(input.metadata);
  const semanticImport = deps.normalizeSemanticImportSummary(input.semanticImport ?? result.semanticImport ?? inputMetadata?.semanticImport);
  const changedPaths = uniqueStrings(result.changedPaths);
  const changedRegions = uniqueStrings([
    ...result.changedRegions,
    ...(job ? deps.resolveSwarmChangedRegions(job, changedPaths) : [])
  ]);
  const evidencePaths = uniqueStrings([...(result.evidencePaths ?? []), ...(input.evidencePaths ?? [])]);
  const queueItemIds = uniqueStrings([...(result.queueItemIds ?? []), ...(input.queueItemIds ?? []), ...(job ? [job.taskId] : [])]);
  const disposition = input.disposition ?? classifySwarmMergeDisposition(result, { staleAgainstHead: input.staleAgainstHead });
  const commandsPassed = result.verification.filter((entry) => entry.status === 0 || entry.required === false && entry.status === undefined);
  const commandsFailed = result.verification.filter((entry) => entry.status !== undefined && entry.status !== 0 && entry.required !== false);
  const ownedFilesTouched = job ? changedPaths.filter((file) => job.allowedWrites.some((glob) => matchesGlob(file, glob))) : changedPaths;
  const traceShards = [
    ...(input.traceShards ?? []),
    ...traceShardInputsFromUnknown(result.metadata?.traceShards),
    ...traceShardInputsFromUnknown(inputMetadata?.traceShards)
  ].map((shard) => normalizeTraceShardForBundle(shard, result, job, generatedAt, deps));
  const reasons = mergeBundleReasons(result, disposition, input.staleAgainstHead ?? false);
  return {
    kind: 'frontier.swarm.merge-bundle',
    version: 1,
    id: input.id ?? 'swarm-merge-bundle:' + stableHash([input.runId, input.planId, result.jobId, changedPaths, changedRegions, disposition, generatedAt]),
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.planId ? { planId: input.planId } : {}),
    jobId: result.jobId,
    ...(job ? { taskId: job.taskId, lane: job.lane, title: job.title } : {}),
    generatedAt,
    status: result.status,
    mergeReadiness: result.mergeReadiness,
    disposition,
    riskLevel: input.riskLevel ?? result.riskLevel ?? inferMergeRisk(result, disposition),
    autoMergeable: disposition === 'auto-mergeable' && reasons.length === 0,
    changedPaths,
    changedRegions,
    ownedFilesTouched,
    allowedWrites: job ? [...job.allowedWrites] : [],
    ownershipViolations: [...result.ownershipViolations],
    ...(input.patchPath ?? result.patchPath ? { patchPath: input.patchPath ?? result.patchPath } : {}),
    ...(input.patchHash ? { patchHash: input.patchHash } : {}),
    evidencePaths,
    commandsPassed,
    commandsFailed,
    queueItemIds,
    ...(input.branchName ? { branchName: input.branchName } : {}),
    ...(input.commit ? { commit: input.commit } : {}),
    staleAgainstHead: input.staleAgainstHead ?? false,
    reasons,
    ...(semanticImport ? { semanticImport } : {}),
    traceShards,
    ...(inputMetadata ? { metadata: inputMetadata } : {})
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

function traceShardInputsFromUnknown(value: unknown): (FrontierSwarmTraceShard | FrontierSwarmTraceShardInput)[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is FrontierSwarmTraceShard | FrontierSwarmTraceShardInput => !!entry && typeof entry === 'object');
}

function normalizeTraceShardForBundle(
  shard: FrontierSwarmTraceShard | FrontierSwarmTraceShardInput,
  result: FrontierSwarmJobResult,
  job: FrontierSwarmJob | undefined,
  generatedAt: number,
  deps: FrontierSwarmMergeBundleDeps
): FrontierSwarmTraceShard {
  return deps.createSwarmTraceShard({
    ...cloneJsonValue(shard),
    jobId: shard.jobId ?? result.jobId,
    lane: shard.lane ?? job?.lane,
    generatedAt: shard.generatedAt ?? generatedAt
  });
}

function mergeBundleReasons(
  result: FrontierSwarmJobResult,
  disposition: FrontierSwarmMergeDisposition,
  staleAgainstHead: boolean
): string[] {
  const reasons: string[] = [];
  if (staleAgainstHead) reasons.push('stale-against-head');
  if (result.status === 'blocked') reasons.push('blocked');
  if (result.status === 'failed') reasons.push('failed');
  if (result.ownershipViolations.length) reasons.push('ownership-violations');
  if (result.verification.some((entry) => entry.required !== false && entry.status !== 0)) reasons.push('failed-verification');
  if (disposition === 'needs-port') reasons.push('needs-human-port');
  if (disposition === 'rejected') reasons.push('rejected');
  return uniqueStrings(reasons);
}

function inferMergeRisk(result: FrontierSwarmJobResult, disposition: FrontierSwarmMergeDisposition): FrontierSwarmRiskLevel {
  if (disposition === 'discovery-only') return 'low';
  if (disposition === 'rejected' || disposition === 'blocked' || disposition === 'stale-against-head') return 'high';
  if (result.changedPaths.length <= 2 && result.ownershipViolations.length === 0) return 'low';
  if (result.changedPaths.length <= 8) return 'medium';
  return 'high';
}
