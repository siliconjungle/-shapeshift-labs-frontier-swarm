import { cloneJsonValue, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { createCoordinatorTraceSummary, scoreCoordinatorMergeJob } from './coordinator-scoring.js';
import {
  averageScore,
  coordinatorJobLiveness,
  createCoordinatorDuplicateGroups,
  createCoordinatorSourceCitations,
  groupIds,
  groupObjects,
  normalizeCoordinatorProcesses,
  primaryEvidencePath
} from './coordinator-dashboard-helpers.js';
import {
  FRONTIER_SWARM_COORDINATOR_DASHBOARD_KIND,
  FRONTIER_SWARM_COORDINATOR_DASHBOARD_VERSION
} from './coordinator-dashboard-types.js';
import {
  createSwarmEvidenceIndex,
  createSwarmMergeBundle,
  createSwarmMergeIndex,
  createSwarmQueueOverlay,
  createSwarmTraceIndex
} from './index.js';
import type {
  FrontierSwarmCoordinatorAdmissionStatus,
  FrontierSwarmCoordinatorDashboard,
  FrontierSwarmCoordinatorDashboardInput,
  FrontierSwarmCoordinatorDashboardQuery,
  FrontierSwarmCoordinatorDashboardQueryResult,
  FrontierSwarmCoordinatorDuplicateGroup
} from './coordinator-dashboard-types.js';
import type { FrontierSwarmSemanticImportSummary } from './index.js';

export function createSwarmCoordinatorDashboard(input: FrontierSwarmCoordinatorDashboardInput = {}): FrontierSwarmCoordinatorDashboard {
  const generatedAt = input.generatedAt ?? Date.now();
  const runId = input.run?.id ?? input.mergeIndex?.runId ?? input.queueOverlay?.runId;
  const planId = input.plan?.id ?? input.mergeIndex?.planId;
  const bundles = input.bundles ?? input.run?.results.map((result) => createSwarmMergeBundle({
    runId,
    planId,
    job: input.plan?.jobs.find((job) => job.id === result.jobId),
    result,
    generatedAt
  })) ?? [];
  const mergeIndex = input.mergeIndex ?? (bundles.length ? createSwarmMergeIndex({ runId, planId, bundles, generatedAt }) : undefined);
  const queueOverlay = input.queueOverlay ?? (bundles.length ? createSwarmQueueOverlay({ runId, bundles, generatedAt }) : undefined);
  const evidenceIndex = input.evidenceIndex ?? (input.run ? createSwarmEvidenceIndex({ run: input.run, generatedAt }) : undefined);
  const traceIndex = input.traceIndex ?? (bundles.some((bundle) => bundle.traceShards.length > 0) ? createSwarmTraceIndex({ bundles, generatedAt }) : undefined);
  const admission = input.admission;
  const jobsById = new Map((input.plan?.jobs ?? []).map((job) => [job.id, job]));
  const resultsById = new Map((input.run?.results ?? []).map((result) => [result.jobId, result]));
  const entriesById = new Map((mergeIndex?.entries ?? []).map((entry) => [entry.jobId, entry]));
  const bundlesById = new Map(bundles.map((bundle) => [bundle.jobId, bundle]));
  const processes = normalizeCoordinatorProcesses(input.processes ?? []);
  const processesByJob = groupObjects(processes.filter((process) => process.jobId), (process) => process.jobId as string);
  const duplicateGroups = createCoordinatorDuplicateGroups(mergeIndex?.entries ?? []);
  const duplicateByJob = createDuplicateJobMap(duplicateGroups);
  const admissionDeferred = new Map((admission?.deferred ?? []).map((entry) => [entry.jobId, entry.reasons]));
  const admitted = new Set(admission?.admitted ?? []);
  const jobIds = uniqueStrings([
    ...(input.plan?.jobs ?? []).map((job) => job.id),
    ...(input.run?.results ?? []).map((result) => result.jobId),
    ...(mergeIndex?.entries ?? []).map((entry) => entry.jobId),
    ...processes.map((process) => process.jobId)
  ]).sort();
  const jobs = jobIds.map((jobId) => {
    const planJob = jobsById.get(jobId);
    const result = resultsById.get(jobId);
    const entry = entriesById.get(jobId);
    const bundle = bundlesById.get(jobId);
    const traceShards = traceIndex?.byJobId[jobId] ?? bundle?.traceShards ?? [];
    const processList = processesByJob[jobId] ?? [];
    const duplicateGroup = duplicateByJob.get(jobId);
    const admissionReasons = admissionDeferred.get(jobId) ?? [];
    const admissionStatus: FrontierSwarmCoordinatorAdmissionStatus = admitted.has(jobId)
      ? 'admitted'
      : admissionReasons.length
        ? 'deferred'
        : entry?.autoMergeable
          ? 'not-admissible'
          : 'unknown';
    const score = scoreCoordinatorMergeJob(entry, bundle, evidenceIndex?.byJobId[jobId]?.length ?? 0, duplicateGroup, admissionStatus, admissionReasons, traceShards);
    const evidencePaths = uniqueStrings([...(entry?.evidencePaths ?? []), ...(result?.evidencePaths ?? []), ...(bundle?.evidencePaths ?? [])]);
    const changedRegions = uniqueStrings([...(entry?.changedRegions ?? []), ...(result?.changedRegions ?? []), ...(bundle?.changedRegions ?? [])]);
    return {
      jobId,
      ...(entry?.taskId ?? result?.queueItemIds[0] ?? planJob?.taskId ? { taskId: entry?.taskId ?? result?.queueItemIds[0] ?? planJob?.taskId } : {}),
      ...(entry?.lane ?? planJob?.lane ? { lane: entry?.lane ?? planJob?.lane } : {}),
      ...(entry?.title ?? planJob?.title ? { title: entry?.title ?? planJob?.title } : {}),
      status: entry?.status ?? result?.status ?? planJob?.status ?? 'planned',
      liveness: coordinatorJobLiveness(result, entry, processList),
      mergeReadiness: entry?.mergeReadiness ?? result?.mergeReadiness ?? 'blocked',
      disposition: entry?.disposition ?? result?.mergeDisposition ?? 'blocked',
      riskLevel: entry?.riskLevel ?? result?.riskLevel ?? 'unknown',
      mergeScore: score.score,
      mergeScoreReasons: score.reasons,
      admissionStatus,
      admissionReasons,
      staleAgainstHead: Boolean(entry?.staleAgainstHead || bundle?.staleAgainstHead),
      ...(duplicateGroup ? { duplicateGroupId: duplicateGroup.id, ...(duplicateGroup.jobIds[0] !== jobId ? { duplicateOf: duplicateGroup.jobIds[0] } : {}) } : {}),
      changedPaths: uniqueStrings([...(entry?.changedPaths ?? []), ...(result?.changedPaths ?? []), ...(bundle?.changedPaths ?? [])]),
      changedRegions,
      semanticRegions: changedRegions,
      ownershipViolations: uniqueStrings([...(entry?.ownershipViolations ?? []), ...(result?.ownershipViolations ?? []), ...(bundle?.ownershipViolations ?? [])]),
      ...(entry?.patchPath ?? result?.patchPath ?? bundle?.patchPath ? { patchPath: entry?.patchPath ?? result?.patchPath ?? bundle?.patchPath } : {}),
      evidencePaths,
      ...(primaryEvidencePath(evidencePaths) ? { primaryEvidencePath: primaryEvidencePath(evidencePaths) } : {}),
      sourceCitations: createCoordinatorSourceCitations(entry, evidenceIndex),
      tests: {
        passed: bundle?.commandsPassed.length ?? result?.verification.filter((test) => test.status === 0).length ?? 0,
        failed: bundle?.commandsFailed.length ?? result?.verification.filter((test) => test.status !== undefined && test.status !== 0).length ?? 0,
        requiredFailed: bundle?.commandsFailed.length ?? result?.verification.filter((test) => test.required !== false && test.status !== undefined && test.status !== 0).length ?? 0
      },
      ...(entry?.semanticImport ?? result?.semanticImport ?? bundle?.semanticImport ? {
        semanticImport: cloneJsonValue(entry?.semanticImport ?? result?.semanticImport ?? bundle?.semanticImport) as FrontierSwarmSemanticImportSummary
      } : {}),
      ...(traceShards.length ? { traceSummary: createCoordinatorTraceSummary(traceShards) } : {}),
      generatedAt
    };
  }).sort((left, right) => right.mergeScore - left.mergeScore || left.jobId.localeCompare(right.jobId));
  return createDashboardResult(input, { runId, planId, generatedAt, jobs, duplicateGroups, processes, mergeIndex, queueOverlay, evidenceIndex, traceIndex, admission });
}

export function querySwarmCoordinatorDashboard(
  dashboard: FrontierSwarmCoordinatorDashboard,
  query: FrontierSwarmCoordinatorDashboardQuery = {}
): FrontierSwarmCoordinatorDashboardQueryResult {
  const jobs = dashboard.jobs.filter((job) => (
    (query.jobId === undefined || job.jobId === query.jobId)
    && (query.lane === undefined || job.lane === query.lane)
    && (query.disposition === undefined || job.disposition === query.disposition)
    && (query.liveness === undefined || job.liveness === query.liveness)
    && (query.admissionStatus === undefined || job.admissionStatus === query.admissionStatus)
    && (query.pathIncludes === undefined || job.changedPaths.concat(job.evidencePaths).some((entry) => entry.includes(query.pathIncludes as string)))
    && (query.region === undefined || job.changedRegions.includes(query.region) || job.semanticRegions.includes(query.region))
    && (query.hasSemanticImport === undefined || Boolean(job.semanticImport && job.semanticImport.total > 0) === query.hasSemanticImport)
    && (query.hasSemanticRegions === undefined || (job.semanticRegions.length > 0) === query.hasSemanticRegions)
    && (query.hasTraceShards === undefined || Boolean(job.traceSummary && job.traceSummary.shardCount > 0) === query.hasTraceShards)
    && (query.traceSubject === undefined || (dashboard.traceIndex?.bySubject[query.traceSubject] ?? []).some((shard) => shard.jobId === job.jobId))
    && (query.traceRegion === undefined || (dashboard.traceIndex?.byRegion[query.traceRegion] ?? []).some((shard) => shard.jobId === job.jobId))
    && (query.staleAgainstHead === undefined || job.staleAgainstHead === query.staleAgainstHead)
    && (query.duplicateOnly !== true || Boolean(job.duplicateGroupId))
    && (query.minMergeScore === undefined || job.mergeScore >= query.minMergeScore)
    && (query.maxMergeScore === undefined || job.mergeScore <= query.maxMergeScore)
  ));
  return { jobs, summary: { jobCount: jobs.length, averageMergeScore: averageScore(jobs.map((job) => job.mergeScore)) } };
}

function createDuplicateJobMap(groups: readonly FrontierSwarmCoordinatorDuplicateGroup[]): Map<string, FrontierSwarmCoordinatorDuplicateGroup> {
  const duplicateByJob = new Map<string, FrontierSwarmCoordinatorDuplicateGroup>();
  for (const group of groups) {
    for (const jobId of group.jobIds) duplicateByJob.set(jobId, group);
  }
  return duplicateByJob;
}

function createDashboardResult(
  input: FrontierSwarmCoordinatorDashboardInput,
  state: Omit<FrontierSwarmCoordinatorDashboard, 'kind' | 'version' | 'id' | 'byLane' | 'byDisposition' | 'byLiveness' | 'summary' | 'metadata'>
): FrontierSwarmCoordinatorDashboard {
  const byLane = groupIds(state.jobs, (job) => job.lane ?? 'unassigned');
  const byDisposition = groupIds(state.jobs, (job) => job.disposition);
  const byLiveness = groupIds(state.jobs, (job) => job.liveness);
  return {
    kind: FRONTIER_SWARM_COORDINATOR_DASHBOARD_KIND,
    version: FRONTIER_SWARM_COORDINATOR_DASHBOARD_VERSION,
    id: input.id ?? 'swarm-coordinator-dashboard:' + stableHash([state.runId, state.planId, state.jobs, state.duplicateGroups, state.generatedAt]),
    ...(state.runId ? { runId: state.runId } : {}),
    ...(state.planId ? { planId: state.planId } : {}),
    generatedAt: state.generatedAt,
    jobs: state.jobs,
    duplicateGroups: state.duplicateGroups,
    processes: state.processes,
    byLane,
    byDisposition,
    byLiveness,
    ...(state.mergeIndex ? { mergeIndex: state.mergeIndex } : {}),
    ...(state.queueOverlay ? { queueOverlay: state.queueOverlay } : {}),
    ...(state.evidenceIndex ? { evidenceIndex: state.evidenceIndex } : {}),
    ...(state.traceIndex ? { traceIndex: state.traceIndex } : {}),
    ...(state.admission ? { admission: state.admission } : {}),
    summary: {
      jobCount: state.jobs.length,
      readyToApplyCount: state.jobs.filter((job) => job.disposition === 'auto-mergeable' && job.admissionStatus !== 'deferred').length,
      needsHumanPortCount: state.jobs.filter((job) => job.disposition === 'needs-port').length,
      failedEvidenceCount: state.jobs.filter((job) => job.disposition === 'rejected' || job.disposition === 'blocked' || job.tests.requiredFailed > 0).length,
      staleAgainstHeadCount: state.jobs.filter((job) => job.staleAgainstHead).length,
      duplicateGroupCount: state.duplicateGroups.length,
      semanticSidecarCount: state.jobs.filter((job) => job.semanticImport && job.semanticImport.total > 0).length,
      semanticRegionCount: state.jobs.reduce((total, job) => total + job.semanticRegions.length, 0),
      traceShardCount: state.traceIndex?.summary.shardCount ?? 0,
      traceDivergenceCount: state.traceIndex?.summary.divergenceCount ?? 0,
      executableOwnershipRegionCount: state.traceIndex?.summary.executableOwnershipRegionCount ?? 0,
      averageMergeScore: averageScore(state.jobs.map((job) => job.mergeScore))
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
