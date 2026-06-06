import assert from 'node:assert';
import {
  admission,
  admissionReviewerLane,
  badRegionOwnership,
  contextPack,
  decomposed,
  explicitRegionMergePlan,
  hotspotReport,
  incompleteRegionBlockers,
  lanePlaybook,
  mergePlan,
  oracleCorpus,
  patchStackPlan,
  pathFallbackIndex,
  regionBundleA,
  regionBundleB,
  regionIndex,
  regionOwnership,
  reviewerLane,
  runStoreShards,
  unregionedBundle
} from './fixtures/merge.mjs';
import { firstScaleJob, scalePlan } from './fixtures/scale.mjs';

assert.ok(mergePlan.blocked.some((blocker) => blocker.reasons.includes('conflicting-changes')));
assert.ok(explicitRegionMergePlan.ready.includes(scalePlan.jobs[2].id));
assert.ok(explicitRegionMergePlan.ready.includes(scalePlan.jobs[4].id));
assert.deepStrictEqual(
  explicitRegionMergePlan.blocked.filter((blocker) => [scalePlan.jobs[2].id, scalePlan.jobs[4].id].includes(blocker.jobId)),
  []
);
assert.deepStrictEqual(incompleteRegionBlockers.map((blocker) => blocker.jobId).sort(), [scalePlan.jobs[2].id, scalePlan.jobs[6].id].sort());
assert.ok(incompleteRegionBlockers.every((blocker) => blocker.reasons.includes('conflicting-changes')));
assert.strictEqual(regionOwnership.ok, true);
assert.strictEqual(badRegionOwnership.ok, false);
assert.deepStrictEqual(badRegionOwnership.regionViolations, ['content.legal']);
assert.strictEqual(regionIndex.summary.conflictCount, 0);
assert.strictEqual(regionIndex.summary.readyToApplyCount, 2);
assert.strictEqual(pathFallbackIndex.summary.conflictCount, 1);
assert.deepStrictEqual(pathFallbackIndex.entries.find((entry) => entry.jobId === regionBundleA.jobId).conflictingJobIds, [unregionedBundle.jobId]);
assert.strictEqual(hotspotReport.summary.hotspotCount, 1);
assert.ok(hotspotReport.recommendations.some((entry) => entry.path === 'src/hot/runtime-website-content.ts'));
assert.ok(reviewerLane.tasks.every((task) => task.lane === 'merge-review'));
assert.strictEqual(runStoreShards.summary.jobCount, 1000);
assert.ok(runStoreShards.summary.shardCount > 1);
assert.deepStrictEqual(admission.admitted, [regionBundleA.jobId]);
assert.strictEqual(admission.deferred[0].reasons.includes('max-ready'), true);
assert.ok(admissionReviewerLane.assignments.some((assignment) => assignment.jobId === regionBundleB.jobId && assignment.reasons.includes('max-ready')));
assert.ok(contextPack.files.includes(firstScaleJob.task.targetRefs[0]));
assert.ok(contextPack.expectedEvidence.includes('evidence/commands.md'));
assert.ok(contextPack.exclusions.includes('node_modules'));
assert.strictEqual(contextPack.commands[0].command, 'npm');
assert.strictEqual(contextPack.oracleCommands[1].command, 'node');
assert.deepStrictEqual(oracleCorpus.byKind.trace, ['api-trace', 'ui-trace']);
assert.deepStrictEqual(oracleCorpus.byTag.deterministic, ['api-trace']);
assert.deepStrictEqual(lanePlaybook.changedRegions, ['content.docs', 'content.legal']);
assert.strictEqual(patchStackPlan.summary.jobCount, 2);
assert.ok(patchStackPlan.stacks.some((stack) => stack.conflicts.length === 1));
assert.strictEqual(decomposed.length, 2);
assert.ok(decomposed[0].verification?.length);
