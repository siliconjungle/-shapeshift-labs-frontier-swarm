import {
  checkSwarmBudget,
  completeSwarmJob,
  createSwarmArtifactIndex,
  createSwarmLeases,
  createSwarmMergeBundle,
  createSwarmQueueOverlay,
  createSwarmQueueSnapshot,
  createSwarmReviewPlan,
  createSwarmRun,
  createSwarmRunCheckpoint,
  createSwarmSchedule,
  createSwarmPlan,
  defineSwarmTasks,
  deriveSwarmQueueStatus
} from '../api.mjs';
import { manifest } from './manifest.mjs';

export const scaleTasks = defineSwarmTasks(Array.from({ length: 1000 }, (_, index) => ({
  id: `scale-${index}`,
  lane: index % 2 === 0 ? 'runtime' : 'harness',
  dependsOn: index % 10 === 0 ? [] : [`scale-${index - 1}`],
  targetRefs: [index % 2 === 0 ? `inkwell/apps/web/src/runtime/${index}.ts` : `inkwell/e2e-${index}.mjs`],
  concurrencyKey: `surface-${index % 25}`,
  budget: { maxInputTokens: 2000, maxOutputTokens: 1000, maxDurationMs: 60000, maxRetries: 1 },
  review: { sampleRate: 0.05, requiredReviewers: 1, reviewerPool: ['reviewer-a', 'reviewer-b'] }
})));

export const scalePlan = createSwarmPlan(manifest, scaleTasks, {
  includeCompleted: true,
  maxReadyJobs: 40,
  maxLaneConcurrency: { runtime: 100, harness: 100 },
  maxConcurrencyKeyConcurrency: Object.fromEntries(Array.from({ length: 25 }, (_, index) => [`surface-${index}`, 10])),
  maxComputeConcurrency: { deep: 50, fast: 50 }
});

export const scaleSchedule = createSwarmSchedule(scalePlan);
export const leases = createSwarmLeases({ schedule: scaleSchedule, workerId: 'worker-1', now: 1000, leaseMs: 5000, count: 5 });
export const firstScaleJob = scalePlan.jobs[0];
export const budgetDecision = checkSwarmBudget(firstScaleJob, { inputTokens: 2500, outputTokens: 10, durationMs: 20, attempts: 1 });

let completedScaleRun = createSwarmRun({ plan: scalePlan, startedAt: 2000 });
completedScaleRun = completeSwarmJob(completedScaleRun, {
  jobId: firstScaleJob.id,
  status: 'completed',
  changedPaths: [firstScaleJob.task.targetRefs[0]],
  evidencePaths: ['agent-runs/scale/evidence.json'],
  semanticImport: {
    total: 1,
    imported: 1,
    semanticIndex: { symbols: 2, facts: 1 },
    dependencies: { total: 2, calls: 1, uses: 1, byPredicate: { calls: 1, uses: 1 }, predicates: ['calls', 'uses'], sourceSymbolIds: ['symbol:action'], targetSymbolIds: ['symbol:helper'] },
    semanticSidecars: { total: 1, ownershipRegions: 2, patchHints: 1 },
    proofSpec: { total: 2, obligations: 1, discharged: 1, contractKinds: ['postcondition'], byStatus: { discharged: 1 } },
    paradigmSemantics: { total: 3, groups: ['logicPrograms', 'stackEffects', 'loweringRecords'], kinds: ['hornClause', 'concatenativeStackEffect', 'frontierToTarget'], logicPrograms: 1, stackEffects: 1, loweringRecords: 1, hasLogicSemantics: true, hasStackSemantics: true, hasLowering: true },
    sourceProjections: { total: 1, stubs: 1, needsReview: 1 },
    nativeCompiles: { total: 1, emitted: 1, preserved: 1, needsReview: 1 },
    readiness: { 'ready-with-losses': 1 }
  }
});
export const scaleRun = completedScaleRun;

export const mergeBundle = createSwarmMergeBundle({
  runId: scaleRun.id,
  planId: scalePlan.id,
  job: firstScaleJob,
  result: scaleRun.results[0],
  patchPath: 'agent-runs/scale/changes.patch',
  queueItemIds: [firstScaleJob.taskId],
  riskLevel: 'low'
});

export const queueSnapshot = createSwarmQueueSnapshot({ plan: scalePlan, run: scaleRun, leases, generatedAt: 8000 });
export const queueOverlay = createSwarmQueueOverlay({ runId: scaleRun.id, bundles: [mergeBundle], generatedAt: 8100 });
export const derivedQueue = deriveSwarmQueueStatus({ snapshot: queueSnapshot, overlays: [queueOverlay], generatedAt: 8200 });
export const checkpoint = createSwarmRunCheckpoint({ run: scaleRun, sequence: 1, savedAt: 9000 });
export const artifactIndex = createSwarmArtifactIndex({
  run: scaleRun,
  artifacts: [{ jobId: firstScaleJob.id, path: 'agent-runs/scale/timeline.jsonl', kind: 'timeline', bytes: 128 }],
  generatedAt: 3000
});
export const reviewPlan = createSwarmReviewPlan({
  plan: scalePlan,
  run: scaleRun,
  budgetDecisions: [budgetDecision],
  reviewers: ['fallback-reviewer'],
  generatedAt: 4000,
  sampleSalt: 'stable'
});
