import assert from 'node:assert';
import {
  checkSwarmUsageGovernor,
  createSwarmAdaptiveLoadPlan,
  createSwarmArtifactRoutingPlan,
  createSwarmAutoReviewReport,
  createSwarmBlackboard,
  createSwarmCoordinatorDashboard,
  createSwarmFixtureCatalog,
  createSwarmMergeBundle,
  createSwarmPlan,
  createSwarmProgressModel,
  createSwarmRebaseReport,
  createSwarmReferenceOraclePlan,
  createSwarmReferenceOracleResponse,
  createSwarmSchedule,
  createSwarmScheduleInputFromAdaptiveLoadPlan,
  createSwarmSchedulerRecommendations,
  createSwarmUsageGovernor,
  querySwarmBlackboard,
  querySwarmCoordinatorDashboard
} from './api.mjs';
import { manifest, plan } from './fixtures/manifest.mjs';
import {
  admission,
  pathFallbackIndex,
  regionBundleA,
  regionBundleB,
  unregionedBundle
} from './fixtures/merge.mjs';
import {
  divergenceReport,
  evidenceIndex,
  evidenceRun,
  traceIndex,
  tracedRegionBundle
} from './fixtures/oracle.mjs';

const coordinatorDashboard = createSwarmCoordinatorDashboard({
  plan,
  run: evidenceRun,
  bundles: [tracedRegionBundle, regionBundleB, unregionedBundle],
  mergeIndex: pathFallbackIndex,
  evidenceIndex,
  admission,
  processes: [
    { pid: 101, role: 'codex', jobId: regionBundleA.jobId, status: 'missing', startedAt: 1 },
    { pid: 102, role: 'codex', jobId: 'running-job', status: 'running', startedAt: 2 }
  ],
  generatedAt: 7950
});
assert.strictEqual(coordinatorDashboard.kind, 'frontier.swarm.coordinator-dashboard');
assert.strictEqual(coordinatorDashboard.summary.duplicateGroupCount, 1);
assert.strictEqual(coordinatorDashboard.summary.traceShardCount, 1);
assert.strictEqual(coordinatorDashboard.summary.executableOwnershipRegionCount, 1);
assert.ok(coordinatorDashboard.jobs.some((job) => job.jobId === regionBundleA.jobId && job.duplicateGroupId));
assert.ok(coordinatorDashboard.jobs.some((job) => job.jobId === 'running-job' && job.liveness === 'running'));
assert.strictEqual(querySwarmCoordinatorDashboard(coordinatorDashboard, { hasTraceShards: true }).summary.jobCount, 1);
assert.strictEqual(querySwarmCoordinatorDashboard(coordinatorDashboard, { traceRegion: 'content.docs' }).jobs[0].jobId, regionBundleA.jobId);
assert.ok(querySwarmCoordinatorDashboard(coordinatorDashboard, { pathIncludes: 'runtime-website-content' }).summary.jobCount >= 2);
assert.ok(querySwarmCoordinatorDashboard(coordinatorDashboard, { duplicateOnly: true }).jobs.every((job) => job.duplicateGroupId));
assert.ok(querySwarmCoordinatorDashboard(coordinatorDashboard, { maxMergeScore: 70 }).summary.jobCount >= 1);

const blackboard = createSwarmBlackboard({
  runId: evidenceRun.id,
  entries: [
    { kind: 'fact', topic: 'known-divergence', text: 'candidate diverges at operation 42', sourceIds: [divergenceReport.id], tags: ['timing'] },
    { kind: 'ownership', topic: 'active-lease', text: 'runtime owns src/runtime.ts', owner: 'runtime-worker', paths: ['src/runtime.ts'] }
  ],
  generatedAt: 8000
});
assert.strictEqual(querySwarmBlackboard(blackboard, { kind: 'fact', tag: 'timing' }).summary.entryCount, 1);
assert.strictEqual(querySwarmBlackboard(blackboard, { owner: 'runtime-worker' }).entries[0].topic, 'active-lease');

const referencePlan = createSwarmReferenceOraclePlan({
  serviceId: 'library-parity',
  subject: 'parser-port',
  fixtureId: 'logged-in-user',
  targets: [
    { id: 'legacy', role: 'reference', command: 'node legacy.mjs' },
    { id: 'candidate', role: 'port', command: { command: 'node', args: ['candidate.mjs'] } }
  ],
  watchpoints: [{ path: '/result', operator: 'changes' }],
  artifactKinds: ['trace'],
  generatedAt: 8100
});
assert.strictEqual(referencePlan.targets[1].command.args[0], 'candidate.mjs');
const referenceResponse = createSwarmReferenceOracleResponse({
  planId: referencePlan.id,
  targetResults: [{ targetId: 'candidate', status: 'failed', artifacts: [{ path: 'candidate.trace.jsonl' }] }],
  divergence: { expected: 'legacy', actual: 'candidate', operationIndex: 7 },
  generatedAt: 8200
});
assert.strictEqual(referenceResponse.status, 'failed');

const routingPlan = createSwarmArtifactRoutingPlan({
  bundles: [regionBundleA],
  artifacts: [{ path: 'agent-runs/debug/changes.patch', kind: 'patch' }],
  hints: [{ artifactKind: 'json', bucket: 'discovery-only', reason: 'status artifact' }],
  generatedAt: 8300
});
assert.ok(routingPlan.summary.routeCount >= 1);
assert.ok(routingPlan.byBucket['ready-to-apply'].includes('agent-runs/debug/changes.patch'));

const resourcePlan = createSwarmPlan(manifest, [
  { id: 'browser-a', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] },
  { id: 'browser-b', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] }
], { maxReadyJobs: 4, resourceQuotas: { browser: 1, 'browser-port': 1 } });
const resourceSchedule = createSwarmSchedule(resourcePlan);
assert.strictEqual(resourceSchedule.ready.length, 1);
assert.ok(resourceSchedule.blocked[0].reasons.includes('resource-capacity:browser'));
const schedulerRecommendations = createSwarmSchedulerRecommendations({ schedule: resourceSchedule, generatedAt: 8400 });
assert.ok(schedulerRecommendations.recommendations.some((entry) => entry.reason === 'resource-capacity:browser'));
const adaptiveLoadPlan = createSwarmAdaptiveLoadPlan({
  plan: resourcePlan,
  schedule: resourceSchedule,
  mode: 'balanced',
  maxLimits: { maxReadyJobs: 4, resourceQuotas: { browser: 2, 'browser-port': 2 } },
  currentLimits: { maxReadyJobs: 4, resourceQuotas: { browser: 2, 'browser-port': 2 } },
  observations: [
    { kind: 'semantic-empty', jobId: resourcePlan.jobs[0].id, lane: 'harness', reason: 'semantic import expected but empty' },
    { kind: 'log-noise', lane: 'harness', value: 250000, reason: 'worker log exceeded compact-review threshold' }
  ],
  generatedAt: 8450
});
assert.strictEqual(adaptiveLoadPlan.kind, 'frontier.swarm.adaptive-load-plan');
assert.ok(adaptiveLoadPlan.summary.reducedCount >= 1);
assert.ok(adaptiveLoadPlan.observations.some((entry) => entry.kind === 'resource-capacity'));
assert.ok((adaptiveLoadPlan.effectiveLimits.maxReadyJobs ?? 4) < 4);
const adaptiveSchedule = createSwarmSchedule(createSwarmScheduleInputFromAdaptiveLoadPlan(resourcePlan, adaptiveLoadPlan));
assert.ok(adaptiveSchedule.ready.length <= resourceSchedule.ready.length);

const laneCapacityPlan = createSwarmPlan(manifest, [
  { id: 'runtime-a', lane: 'runtime', targetRefs: ['inkwell/apps/web/src/runtime/a.ts'] },
  { id: 'runtime-b', lane: 'runtime', targetRefs: ['inkwell/apps/web/src/runtime/b.ts'] }
], { maxReadyJobs: 4, maxLaneConcurrency: { runtime: 1 } });
const laneCapacitySchedule = createSwarmSchedule(laneCapacityPlan);
assert.ok(laneCapacitySchedule.blocked[0].reasons.includes('lane-capacity'));
const laneCapacityAdaptive = createSwarmAdaptiveLoadPlan({
  plan: laneCapacityPlan,
  schedule: laneCapacitySchedule,
  mode: 'balanced',
  maxLimits: { maxReadyJobs: 4, maxLaneConcurrency: { runtime: 3 } },
  currentLimits: { maxReadyJobs: 4, maxLaneConcurrency: { runtime: 3 } },
  generatedAt: 8455
});
assert.ok(laneCapacityAdaptive.observations.some((entry) => entry.kind === 'lane-capacity'));
assert.strictEqual(laneCapacityAdaptive.effectiveLimits.maxLaneConcurrency.runtime, 3);
assert.ok(laneCapacityAdaptive.decisions.some((entry) => entry.action === 'hold' && entry.target === 'lane' && entry.key === 'runtime'));
const observeOnlyAdaptiveLoadPlan = createSwarmAdaptiveLoadPlan({
  plan: resourcePlan,
  schedule: resourceSchedule,
  mode: 'observe',
  maxLimits: { maxReadyJobs: 4 },
  currentLimits: { maxReadyJobs: 4 },
  observations: [{ kind: 'semantic-empty', jobId: resourcePlan.jobs[0].id }],
  generatedAt: 8460
});
assert.strictEqual(observeOnlyAdaptiveLoadPlan.effectiveLimits.maxReadyJobs, 4);
assert.ok(observeOnlyAdaptiveLoadPlan.decisions.every((entry) => entry.action === 'observe'));

const semanticWeakAdaptiveLoadPlan = createSwarmAdaptiveLoadPlan({
  plan: resourcePlan,
  schedule: resourceSchedule,
  mode: 'balanced',
  maxLimits: { maxReadyJobs: 4 },
  currentLimits: { maxReadyJobs: 4 },
  observations: [{
    kind: 'semantic-weak',
    severity: 'warning',
    jobId: resourcePlan.jobs[0].id,
    reason: 'semantic auto-merge precision fell below landed threshold'
  }],
  generatedAt: 8465
});
assert.ok((semanticWeakAdaptiveLoadPlan.effectiveLimits.maxReadyJobs ?? 4) < 4);
assert.ok(semanticWeakAdaptiveLoadPlan.decisions.some((entry) => entry.reason.includes('semantic auto-merge')));

const fixtureCatalog = createSwarmFixtureCatalog({
  fixtures: [
    { id: 'logged-in-creator', state: { user: 'creator' }, tags: ['auth', 'creator'], setupCommands: ['node fixture.mjs'] },
    { id: 'admin-user', tags: ['auth', 'admin'] }
  ],
  generatedAt: 8500
});
assert.deepStrictEqual([...fixtureCatalog.byTag.auth].sort(), ['logged-in-creator', 'admin-user'].sort());

const progressModel = createSwarmProgressModel({
  items: [
    { id: 'route-home', surface: 'route', status: 'implemented' },
    { id: 'route-home-parity', surface: 'route', status: 'functional-verified', evidencePaths: ['evidence.json'] },
    { id: 'route-home-accepted', surface: 'route', status: 'accepted' }
  ],
  generatedAt: 8600
});
assert.strictEqual(progressModel.summary.acceptedCount, 1);

const autoReview = createSwarmAutoReviewReport({
  bundles: [createSwarmMergeBundle({
    job: plan.jobs[0],
    result: { jobId: plan.jobs[0].id, status: 'completed', changedPaths: ['src/runtime.ts'] }
  })],
  generatedAt: 8700
});
assert.ok(autoReview.findings.some((finding) => finding.kind === 'missing-evidence'));

const rebaseReport = createSwarmRebaseReport({ mergeIndex: pathFallbackIndex, currentHead: 'HEAD', generatedAt: 8800 });
assert.ok(rebaseReport.summary.conflictCount >= 1);

const usageGovernor = createSwarmUsageGovernor({
  maxWorkers: 20,
  maxTokensByLane: { browser: 1000 },
  maxCostUsd: 5,
  retryBudget: 2,
  generatedAt: 8900
});
const usageDecision = checkSwarmUsageGovernor(usageGovernor, { activeWorkers: 21, tokensByLane: { browser: 2000 }, retriesUsed: 1 });
assert.strictEqual(usageDecision.ok, false);
assert.strictEqual(usageDecision.preferStatic, true);
