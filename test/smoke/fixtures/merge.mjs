import {
  checkSwarmRegionOwnership,
  completeSwarmJob,
  createSwarmContextPack,
  createSwarmHotspotReport,
  createSwarmLanePlaybook,
  createSwarmMergeAdmission,
  createSwarmMergeBundle,
  createSwarmMergeIndex,
  createSwarmMergePlan,
  createSwarmOracleCorpus,
  createSwarmPatchStackPlan,
  createSwarmReviewerLanePlan,
  createSwarmRun,
  createSwarmRunStoreShards,
  decomposeSwarmFeature
} from '../api.mjs';
import { plan } from './manifest.mjs';
import { firstScaleJob, leases, scalePlan } from './scale.mjs';

let conflictRun = createSwarmRun({ plan: scalePlan, startedAt: 5000 });
conflictRun = completeSwarmJob(conflictRun, {
  jobId: scalePlan.jobs[0].id,
  status: 'completed',
  changedPaths: ['shared/file.ts']
});
conflictRun = completeSwarmJob(conflictRun, {
  jobId: scalePlan.jobs[10].id,
  status: 'completed',
  changedPaths: ['shared/file.ts']
});
export const mergePlan = createSwarmMergePlan({ plan: scalePlan, run: conflictRun, generatedAt: 6000 });

let explicitRegionRun = createSwarmRun({ plan: scalePlan, startedAt: 6050 });
explicitRegionRun = completeSwarmJob(explicitRegionRun, {
  jobId: scalePlan.jobs[2].id,
  status: 'completed',
  changedPaths: ['src/hot/runtime-website-content.ts'],
  changedRegions: ['content.docs']
});
explicitRegionRun = completeSwarmJob(explicitRegionRun, {
  jobId: scalePlan.jobs[4].id,
  status: 'completed',
  changedPaths: ['src/hot/runtime-website-content.ts'],
  changedRegions: ['content.legal']
});
export const explicitRegionMergePlan = createSwarmMergePlan({ plan: scalePlan, run: explicitRegionRun, generatedAt: 6060 });

let incompleteRegionRun = createSwarmRun({ plan: scalePlan, startedAt: 6070 });
incompleteRegionRun = completeSwarmJob(incompleteRegionRun, {
  jobId: scalePlan.jobs[2].id,
  status: 'completed',
  changedPaths: ['src/hot/runtime-website-content.ts'],
  changedRegions: ['content.docs']
});
incompleteRegionRun = completeSwarmJob(incompleteRegionRun, {
  jobId: scalePlan.jobs[6].id,
  status: 'completed',
  changedPaths: ['src/hot/runtime-website-content.ts']
});
export const incompleteRegionMergePlan = createSwarmMergePlan({ plan: scalePlan, run: incompleteRegionRun, generatedAt: 6080 });
export const incompleteRegionBlockers = incompleteRegionMergePlan.blocked.filter((blocker) => [scalePlan.jobs[2].id, scalePlan.jobs[6].id].includes(blocker.jobId));

export const regionOwnership = checkSwarmRegionOwnership(plan.jobs[0], {
  changedPaths: ['inkwell/apps/web/src/runtime/runtime.ts'],
  changedRegions: ['runtime.actions']
});
export const badRegionOwnership = checkSwarmRegionOwnership(plan.jobs[0], {
  changedPaths: ['inkwell/apps/web/src/runtime/runtime.ts'],
  changedRegions: ['content.legal']
});

export const regionBundleA = createSwarmMergeBundle({
  job: scalePlan.jobs[2],
  result: {
    jobId: scalePlan.jobs[2].id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/a/changes.patch',
  riskLevel: 'low'
});
export const regionBundleB = createSwarmMergeBundle({
  job: scalePlan.jobs[4],
  result: {
    jobId: scalePlan.jobs[4].id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.legal'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/b/changes.patch',
  riskLevel: 'low'
});
export const unregionedBundle = createSwarmMergeBundle({
  job: scalePlan.jobs[6],
  result: {
    jobId: scalePlan.jobs[6].id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/c/changes.patch',
  riskLevel: 'low'
});

export const regionIndex = createSwarmMergeIndex({ bundles: [regionBundleA, regionBundleB], generatedAt: 6100 });
export const pathFallbackIndex = createSwarmMergeIndex({ bundles: [regionBundleA, unregionedBundle], generatedAt: 6200 });
export const hotspotReport = createSwarmHotspotReport({ bundles: [regionBundleA, regionBundleB, unregionedBundle], threshold: 2, generatedAt: 6300 });
export const reviewerLane = createSwarmReviewerLanePlan({ index: pathFallbackIndex, reviewerLane: 'merge-review', reviewers: ['reviewer-a'], generatedAt: 6400 });
export const runStoreShards = createSwarmRunStoreShards({ plan: scalePlan, root: 'agent-runs/sharded', shardSize: 200, groupBy: 'lane', generatedAt: 6500 });
export const admission = createSwarmMergeAdmission({ index: regionIndex, maxReady: 1, maxChangedPaths: 2, maxChangedRegions: 2, generatedAt: 6600 });
export const admissionReviewerLane = createSwarmReviewerLanePlan({ index: regionIndex, admission, reviewerLane: 'merge-review', generatedAt: 6700 });
export const contextPack = createSwarmContextPack({
  job: firstScaleJob,
  files: ['docs/architecture.md'],
  apiMap: { runtime: ['createSwarmPlan', 'createSwarmRun'] },
  knownFailures: ['global smoke fails on stale fixture'],
  commands: [{ command: 'npm', args: ['run', 'focused-gate'] }],
  oracleCommands: [{ command: 'node', args: ['oracle.mjs'] }],
  expectedEvidence: ['evidence/commands.md'],
  exclusions: ['dist', 'node_modules'],
  avoidInvestigating: ['unrelated renderer rewrite'],
  playbookIds: ['runtime-playbook'],
  generatedAt: 6800
});
export const oracleCorpus = createSwarmOracleCorpus({
  id: 'generic-oracles',
  artifacts: [
    { id: 'api-trace', path: 'oracles/api-trace.jsonl', kind: 'trace', tags: ['api', 'deterministic'], command: 'node oracle.mjs' },
    { id: 'ui-trace', path: 'oracles/ui-trace.jsonl', kind: 'trace', tags: ['ui'] }
  ],
  generatedAt: 6900
});
export const lanePlaybook = createSwarmLanePlaybook({
  lane: 'runtime',
  successfulBundles: [regionBundleA, regionBundleB],
  notes: ['Prefer the focused oracle before global smoke.'],
  commands: ['npm test'],
  avoidInvestigating: ['generated dist'],
  generatedAt: 7000
});
export const patchStackPlan = createSwarmPatchStackPlan({ index: pathFallbackIndex, maxStackSize: 4, generatedAt: 7100 });
export const decomposed = decomposeSwarmFeature({
  featureId: 'feature-x',
  objective: 'Implement feature x',
  lanes: ['runtime', 'harness'],
  files: ['src/runtime/action.ts', 'test/harness.mjs'],
  reviewers: ['reviewer-a'],
  checks: [{ command: 'npm', args: ['test'] }]
});

export { leases };
