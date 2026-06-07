import assert from 'node:assert';
import {
  classifySwarmMergeDisposition,
  classifySwarmMergeReadiness,
  renewSwarmLease
} from './api.mjs';
import {
  artifactIndex,
  budgetDecision,
  checkpoint,
  derivedQueue,
  firstScaleJob,
  leases,
  mergeBundle,
  queueOverlay,
  queueSnapshot,
  reviewPlan,
  scalePlan,
  scaleRun,
  scaleSchedule
} from './fixtures/scale.mjs';

assert.strictEqual(scalePlan.jobs.length, 1000);
assert.strictEqual(scalePlan.graph.roots.length, 100);
assert.strictEqual(scalePlan.graph.edges.length, 900);
assert.strictEqual(scalePlan.validation.valid, true);
assert.strictEqual(scaleSchedule.ready.length, 40);
assert.ok(scaleSchedule.blocked.length > 0);
assert.strictEqual(leases.length, 5);
assert.strictEqual(leases[0].expiresAt, 6000);
assert.strictEqual(new Set(leases.map((lease) => lease.fencingToken)).size, 5);
assert.strictEqual(renewSwarmLease({ lease: leases[0], now: 7000, leaseMs: 5000 }).expiresAt, 12000);
assert.strictEqual(budgetDecision.ok, false);
assert.deepStrictEqual(budgetDecision.violations, ['max-input-tokens']);
assert.strictEqual(scaleRun.results[0].mergeReadiness, 'patch-candidate');
assert.strictEqual(scaleRun.results[0].semanticImport.semanticIndex.symbols, 2);
assert.strictEqual(scaleRun.results[0].semanticImport.dependencies.calls, 1);
assert.strictEqual(scaleRun.results[0].semanticImport.proofSpec.obligations, 1);
assert.strictEqual(scaleRun.results[0].semanticImport.paradigmSemantics.hasStackSemantics, true);
assert.deepStrictEqual(scaleRun.results[0].semanticImport.proofSpec.contractKinds, ['postcondition']);
assert.strictEqual(classifySwarmMergeReadiness({ jobId: 'discovery', status: 'completed', changedPaths: [] }), 'discovery-only');
assert.strictEqual(classifySwarmMergeDisposition({ jobId: 'verified', status: 'verified', changedPaths: ['src/runtime/a.ts'], verification: [{ status: 0 }] }), 'auto-mergeable');
assert.strictEqual(mergeBundle.disposition, 'needs-port');
assert.strictEqual(mergeBundle.patchPath, 'agent-runs/scale/changes.patch');
assert.deepStrictEqual(mergeBundle.queueItemIds, [firstScaleJob.taskId]);
assert.strictEqual(mergeBundle.semanticImport.semanticSidecars.ownershipRegions, 2);
assert.deepStrictEqual(mergeBundle.semanticImport.dependencies.predicates, ['calls', 'uses']);
assert.strictEqual(mergeBundle.semanticImport.proofSpec.discharged, 1);
assert.strictEqual(mergeBundle.semanticImport.paradigmSemantics.loweringRecords, 1);
assert.strictEqual(mergeBundle.semanticImport.nativeCompiles.preserved, 1);
assert.strictEqual(queueSnapshot.summary.jobCount, 1000);
assert.strictEqual(queueSnapshot.summary.leaseCount, 5);
assert.strictEqual(queueSnapshot.summary.leasedCount, 4);
assert.strictEqual(queueSnapshot.summary.completedCount, 1);
assert.strictEqual(queueOverlay.summary.needsHumanPortCount, 1);
assert.strictEqual(queueOverlay.entries[0].semanticImport.sourceProjections.needsReview, 1);
assert.strictEqual(queueOverlay.entries[0].semanticImport.dependencies.total, 2);
assert.strictEqual(queueOverlay.entries[0].semanticImport.proofSpec.obligations, 1);
assert.strictEqual(queueOverlay.entries[0].semanticImport.paradigmSemantics.hasLogicSemantics, true);
assert.strictEqual(queueOverlay.entries[0].semanticImport.nativeCompiles.emitted, 1);
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).status, 'blocked');
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).metadata.semanticImport.sourceProjections.stubs, 1);
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).metadata.semanticImport.proofSpec.discharged, 1);
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).metadata.semanticImport.paradigmSemantics.hasLowering, true);
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).metadata.semanticImport.nativeCompiles.preserved, 1);
assert.strictEqual(checkpoint.runId, scaleRun.id);
assert.strictEqual(checkpoint.resultCount, 1);
assert.strictEqual(artifactIndex.summary.artifactCount, 2);
assert.strictEqual(artifactIndex.byKind.evidence.length, 1);
assert.ok(reviewPlan.assignments.some((assignment) => assignment.jobId === firstScaleJob.id && assignment.reason === 'budget'));
