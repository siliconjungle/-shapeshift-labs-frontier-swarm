import { conflictMap, groupMergeReadyJobs, reviewReason, selectReviewers } from './merge-plan-helpers.js';
import { FRONTIER_SWARM_MERGE_PLAN_KIND, FRONTIER_SWARM_MERGE_PLAN_VERSION, FRONTIER_SWARM_REVIEW_PLAN_KIND, FRONTIER_SWARM_REVIEW_PLAN_VERSION } from './constants.js';
import { slug, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmDecomposeInput, FrontierSwarmMergeBlocker, FrontierSwarmMergePlan, FrontierSwarmMergePlanInput, FrontierSwarmReviewAssignment, FrontierSwarmReviewPlan, FrontierSwarmReviewPlanInput, FrontierSwarmTaskInput } from './types.js';
import type { JsonValue } from '@shapeshift-labs/frontier';

export function createSwarmReviewPlan(input: FrontierSwarmReviewPlanInput): FrontierSwarmReviewPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const resultsByJob = new Map((input.run?.results ?? []).map((result) => [result.jobId, result]));
  const budgetsByJob = new Map((input.budgetDecisions ?? []).map((decision) => [decision.jobId, decision]));
  const assignments: FrontierSwarmReviewAssignment[] = [];
  for (const job of input.plan.jobs) {
    const result = resultsByJob.get(job.id);
    const budget = budgetsByJob.get(job.id);
    const reason = reviewReason(job, result, budget, input.sampleSalt ?? input.plan.id);
    if (!reason) continue;
    const pool = job.review.reviewerPool.length ? job.review.reviewerPool : [...(input.reviewers ?? [])];
    assignments.push({
      jobId: job.id,
      taskId: job.taskId,
      reviewers: selectReviewers(pool, job.review.requiredReviewers, job.id),
      required: job.review.alwaysReview || reason === 'violations' || reason === 'failed' || reason === 'budget',
      reason
    });
  }
  return {
    kind: FRONTIER_SWARM_REVIEW_PLAN_KIND,
    version: FRONTIER_SWARM_REVIEW_PLAN_VERSION,
    id: 'swarm-review-plan:' + stableHash([input.plan.id, assignments, generatedAt]),
    planId: input.plan.id,
    generatedAt,
    assignments,
    summary: {
      assignmentCount: assignments.length,
      requiredCount: assignments.filter((assignment) => assignment.required).length,
      sampledCount: assignments.filter((assignment) => assignment.reason === 'sampled').length
    }
  };
}
export function createSwarmMergePlan(input: FrontierSwarmMergePlanInput): FrontierSwarmMergePlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const resultsByJob = new Map(input.run.results.map((result) => [result.jobId, result]));
  const reviewRequired = new Set((input.reviewPlan?.assignments ?? []).filter((assignment) => assignment.required).map((assignment) => assignment.jobId));
  const conflicts = conflictMap(input.run.results);
  const ready: string[] = [];
  const blocked: FrontierSwarmMergeBlocker[] = [];
  for (const job of input.plan.jobs) {
    const result = resultsByJob.get(job.id);
    const reasons: string[] = [];
    if (!result || result.status !== 'completed' && result.status !== 'verified') reasons.push('not-completed');
    if (result?.ownershipViolations.length) reasons.push('ownership-violations');
    if (reviewRequired.has(job.id)) reasons.push('review-required');
    const conflictingJobIds = Array.from(conflicts.get(job.id) ?? []).sort();
    if (conflictingJobIds.length) reasons.push('conflicting-changes');
    if (reasons.length) blocked.push({ jobId: job.id, reasons: uniqueStrings(reasons), conflictingJobIds });
    else ready.push(job.id);
  }
  const groups = groupMergeReadyJobs(ready, input.run.results);
  return {
    kind: FRONTIER_SWARM_MERGE_PLAN_KIND,
    version: FRONTIER_SWARM_MERGE_PLAN_VERSION,
    id: 'swarm-merge-plan:' + stableHash([input.plan.id, ready, blocked, generatedAt]),
    planId: input.plan.id,
    generatedAt,
    ready,
    blocked,
    groups,
    summary: { readyCount: ready.length, blockedCount: blocked.length, groupCount: groups.length }
  };
}
export function decomposeSwarmFeature(input: FrontierSwarmDecomposeInput): FrontierSwarmTaskInput[] {
  const filesByLane = new Map<string, string[]>();
  const lanes = input.lanes.length ? [...input.lanes] : ['implementation'];
  for (const lane of lanes) filesByLane.set(lane, []);
  for (const file of input.files ?? []) {
    const selected = lanes.find((lane) => file.toLowerCase().includes(lane.toLowerCase())) ?? lanes[filesByLane.size ? stableHash(file).charCodeAt(10) % lanes.length : 0];
    filesByLane.get(selected)?.push(file);
  }
  return lanes.map((lane, index) => ({
    id: `${input.featureId}-${slug(lane)}`,
    lane,
    title: `${titleFromId(lane)} for ${input.featureId}`,
    objective: input.objective,
    priority: 100 + index,
    targetRefs: filesByLane.get(lane) ?? [],
    verification: input.checks ?? [],
    review: input.reviewers?.length ? { requiredReviewers: 1, reviewerPool: input.reviewers } : undefined,
    metadata: toJsonObject(input.metadata)
  }));
}
export function encodeSwarmJsonl(records: readonly unknown[]): string {
  return records.map((record) => JSON.stringify(record)).join('\n') + (records.length ? '\n' : '');
}
export function decodeSwarmJsonl(jsonl: string): JsonValue[] {
  return jsonl.split(/\r?\n/).filter((line) => line.trim().length > 0).map((line) => JSON.parse(line) as JsonValue);
}
function titleFromId(id: string): string {
  const parts = String(id).split(/[.:/_-]+/).filter(Boolean);
  return parts.length ? parts.map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ') : String(id);
}
