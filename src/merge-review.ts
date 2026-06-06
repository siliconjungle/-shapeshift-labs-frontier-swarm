import { slug, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type {
  FrontierSwarmHotspotEntry,
  FrontierSwarmHotspotRecommendation,
  FrontierSwarmHotspotReport,
  FrontierSwarmHotspotReportInput,
  FrontierSwarmJobResult,
  FrontierSwarmJobResultInput,
  FrontierSwarmMergeIndexEntry,
  FrontierSwarmReviewerLanePlan,
  FrontierSwarmReviewerLanePlanInput
} from './index.js';

export interface FrontierSwarmMergeReviewDeps {
  normalizeResult(input: FrontierSwarmJobResultInput): FrontierSwarmJobResult;
}

export function createSwarmHotspotReport(
  input: FrontierSwarmHotspotReportInput = {},
  deps: FrontierSwarmMergeReviewDeps
): FrontierSwarmHotspotReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const threshold = Math.max(2, Math.floor(input.threshold ?? 3));
  const byPath = new Map<string, FrontierSwarmHotspotEntry>();
  for (const bundle of input.bundles ?? []) {
    for (const file of bundle.changedPaths) {
      const current = byPath.get(file) ?? emptyHotspotEntry(file);
      current.touchCount += 1;
      current.jobIds = uniqueStrings([...current.jobIds, bundle.jobId]);
      current.regions = uniqueStrings([...current.regions, ...bundle.changedRegions]);
      current.dispositions = uniqueStrings([...current.dispositions, bundle.disposition]);
      current.riskLevels = uniqueStrings([...current.riskLevels, bundle.riskLevel]);
      byPath.set(file, current);
    }
  }
  for (const raw of input.results ?? []) {
    const result = isSwarmJobResult(raw) ? raw : deps.normalizeResult(raw);
    for (const file of result.changedPaths) {
      const current = byPath.get(file) ?? emptyHotspotEntry(file);
      current.touchCount += 1;
      current.jobIds = uniqueStrings([...current.jobIds, result.jobId]);
      current.regions = uniqueStrings([...current.regions, ...result.changedRegions]);
      current.dispositions = uniqueStrings([...current.dispositions, result.mergeDisposition]);
      current.riskLevels = uniqueStrings([...current.riskLevels, result.riskLevel]);
      byPath.set(file, current);
    }
  }
  const entries = Array.from(byPath.values()).sort((left, right) => right.touchCount - left.touchCount || left.path.localeCompare(right.path));
  const recommendations: FrontierSwarmHotspotRecommendation[] = entries
    .filter((entry) => entry.touchCount >= threshold || entry.regions.length > 1)
    .map((entry) => ({
      path: entry.path,
      reason: entry.regions.length > 1 ? 'region-overlap' : 'hot-file',
      suggestedModuleId: suggestedModuleId(entry.path),
      suggestedOwnershipRegions: entry.regions.length ? entry.regions : [`${suggestedModuleId(entry.path)}.*`],
      jobIds: [...entry.jobIds]
    }));
  return {
    kind: 'frontier.swarm.hotspot-report',
    version: 1,
    id: input.id ?? 'swarm-hotspot-report:' + stableHash([entries, threshold, generatedAt]),
    generatedAt,
    threshold,
    entries,
    recommendations,
    summary: {
      pathCount: entries.length,
      hotspotCount: entries.filter((entry) => entry.touchCount >= threshold).length,
      recommendationCount: recommendations.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmReviewerLanePlan(input: FrontierSwarmReviewerLanePlanInput): FrontierSwarmReviewerLanePlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const reviewerLane = input.reviewerLane ?? 'review';
  const reviewers = uniqueStrings(input.reviewers ?? []);
  const deferralsByJob = new Map((input.admission?.deferred ?? []).map((entry) => [entry.jobId, entry.reasons]));
  const candidates = input.index.entries.filter((entry) => input.includeAutoMergeable
    || deferralsByJob.has(entry.jobId)
    || entry.conflictingJobIds.length > 0
    || entry.riskLevel === 'high'
    || entry.disposition !== 'auto-mergeable'
    || !entry.autoMergeable);
  const assignments = candidates.map((entry) => ({
    jobId: entry.jobId,
    reviewers: selectReviewers(reviewers, reviewers.length ? 1 : 0, entry.jobId),
    required: deferralsByJob.has(entry.jobId) || entry.conflictingJobIds.length > 0 || entry.riskLevel === 'high' || entry.disposition !== 'auto-mergeable',
    reasons: uniqueStrings([...reviewerLaneReasons(entry), ...(deferralsByJob.get(entry.jobId) ?? [])])
  }));
  const tasks = candidates.map((entry) => ({
    id: `review-${slug(entry.jobId)}`,
    lane: reviewerLane,
    kind: 'review',
    title: `Review ${entry.title ?? entry.jobId}`,
    objective: `Review swarm merge bundle ${entry.jobId}.`,
    sourceRefs: entry.evidencePaths,
    targetRefs: entry.changedPaths,
    ownedRegions: entry.changedRegions,
    acceptance: [
      'Review evidence, patch applicability, ownership, conflicts, and risk.',
      `Merge disposition: ${entry.disposition}.`
    ],
    metadata: {
      mergeJobId: entry.jobId,
      conflictingJobIds: entry.conflictingJobIds,
      reasons: uniqueStrings([...reviewerLaneReasons(entry), ...(deferralsByJob.get(entry.jobId) ?? [])])
    }
  }));
  return {
    kind: 'frontier.swarm.reviewer-lane-plan',
    version: 1,
    id: input.id ?? 'swarm-reviewer-lane-plan:' + stableHash([input.index.id, assignments, generatedAt]),
    mergeIndexId: input.index.id,
    generatedAt,
    reviewerLane,
    assignments,
    tasks,
    summary: {
      assignmentCount: assignments.length,
      taskCount: tasks.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function emptyHotspotEntry(path: string): FrontierSwarmHotspotEntry {
  return { path, touchCount: 0, jobIds: [], regions: [], dispositions: [], riskLevels: [] };
}

function isSwarmJobResult(value: FrontierSwarmJobResult | FrontierSwarmJobResultInput): value is FrontierSwarmJobResult {
  return Array.isArray((value as FrontierSwarmJobResult).changedPaths)
    && Array.isArray((value as FrontierSwarmJobResult).changedRegions)
    && Array.isArray((value as FrontierSwarmJobResult).verification)
    && Array.isArray((value as FrontierSwarmJobResult).queueItemIds)
    && typeof (value as FrontierSwarmJobResult).riskLevel === 'string'
    && typeof (value as FrontierSwarmJobResult).mergeDisposition === 'string';
}

function suggestedModuleId(file: string): string {
  const base = file.split('/').pop()?.replace(/\.[^.]+$/, '') ?? file;
  return slug(base).replace(/-/g, '.');
}

function selectReviewers(pool: readonly string[], required: number, salt: string): string[] {
  if (required <= 0 || pool.length === 0) return [];
  const sorted = [...uniqueStrings(pool)].sort((left, right) => stableHash([salt, left]).localeCompare(stableHash([salt, right])));
  return sorted.slice(0, Math.min(required, sorted.length));
}

function reviewerLaneReasons(entry: FrontierSwarmMergeIndexEntry): string[] {
  const reasons: string[] = [];
  if (entry.conflictingJobIds.length) reasons.push('conflicting-changes');
  if (entry.riskLevel === 'high') reasons.push('high-risk');
  if (entry.disposition !== 'auto-mergeable') reasons.push(entry.disposition);
  if (!entry.autoMergeable) reasons.push('not-auto-mergeable');
  if (entry.staleAgainstHead) reasons.push('stale-against-head');
  return uniqueStrings(reasons);
}
