import { positiveNumber, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmArtifact, FrontierSwarmArtifactInput, FrontierSwarmBudgetDecision, FrontierSwarmJobResult, FrontierSwarmMergeGroup, FrontierSwarmMergeIndexEntry, FrontierSwarmReviewAssignment, FrontierSwarmRiskLevel } from './types.js';
import type { FrontierSwarmJob } from './plan.js';

export function normalizeArtifact(input: FrontierSwarmArtifactInput): FrontierSwarmArtifact {
  return {
    jobId: normalizeId(input.jobId, 'artifact job id'),
    path: normalizeId(input.path, 'artifact path'),
    kind: input.kind ?? 'artifact',
    ...(positiveNumber(input.bytes) ? { bytes: Math.floor(input.bytes as number) } : {}),
    ...(input.hash ? { hash: input.hash } : {}),
    ...(input.producedAt !== undefined ? { producedAt: input.producedAt } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function reviewReason(
  job: FrontierSwarmJob,
  result: FrontierSwarmJobResult | undefined,
  budget: FrontierSwarmBudgetDecision | undefined,
  sampleSalt: string
): FrontierSwarmReviewAssignment['reason'] | undefined {
  if (result?.ownershipViolations.length) return 'violations';
  if (result?.status === 'failed' || result?.exitCode !== undefined && result.exitCode !== 0) return 'failed';
  if (budget && !budget.ok) return 'budget';
  if (job.review.alwaysReview) return 'always-review';
  if (job.review.sampleRate > 0 && deterministicUnitInterval([sampleSalt, job.id]) < job.review.sampleRate) return 'sampled';
  return undefined;
}
export function selectReviewers(pool: readonly string[], required: number, salt: string): string[] {
  if (required <= 0 || pool.length === 0) return [];
  const sorted = [...uniqueStrings(pool)].sort((left, right) => stableHash([salt, left]).localeCompare(stableHash([salt, right])));
  return sorted.slice(0, Math.min(required, sorted.length));
}
export function conflictMap(results: readonly FrontierSwarmJobResult[]): Map<string, Set<string>> {
  const conflicts = new Map<string, Set<string>>();
  for (let leftIndex = 0; leftIndex < results.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < results.length; rightIndex += 1) {
      const left = results[leftIndex];
      const right = results[rightIndex];
      if (!left || !right || pairConflictKeys(left, right).length === 0) continue;
      const leftConflicts = conflicts.get(left.jobId) ?? new Set<string>();
      const rightConflicts = conflicts.get(right.jobId) ?? new Set<string>();
      leftConflicts.add(right.jobId);
      rightConflicts.add(left.jobId);
      conflicts.set(left.jobId, leftConflicts);
      conflicts.set(right.jobId, rightConflicts);
    }
  }
  return conflicts;
}
export function groupMergeReadyJobs(ready: readonly string[], results: readonly FrontierSwarmJobResult[]): FrontierSwarmMergeGroup[] {
  const byJob = new Map(results.map((result) => [result.jobId, result]));
  return ready.map((jobId) => {
    const changedPaths = [...(byJob.get(jobId)?.changedPaths ?? [])].sort();
    return {
      id: 'merge-group:' + stableHash([jobId, changedPaths]),
      jobIds: [jobId],
      changedPaths
    };
  });
}
export function patchStackKey(entry: FrontierSwarmMergeIndexEntry): string {
  const lane = entry.lane ?? 'unassigned';
  if (entry.changedRegions.length) return `${lane}:${entry.changedRegions[0]}`;
  const firstPath = entry.changedPaths[0] ?? 'evidence-only';
  return `${lane}:${firstPath.split('/').slice(0, 2).join('/') || firstPath}`;
}
export function riskRank(risk: FrontierSwarmRiskLevel): number {
  if (risk === 'low') return 0;
  if (risk === 'medium') return 1;
  if (risk === 'unknown') return 2;
  if (risk === 'high') return 3;
  return 4;
}
export function deterministicUnitInterval(value: unknown): number {
  const hex = stableHash(value).split(':')[1] ?? '0';
  return parseInt(hex, 16) / 0xffffffff;
}
function normalizeId(value: string, label: string): string {
  const id = String(value || '').trim();
  if (!id) throw new Error(`Missing ${label}`);
  return id;
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
