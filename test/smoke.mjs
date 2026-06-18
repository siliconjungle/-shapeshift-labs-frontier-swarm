import assert from 'node:assert';
import {
  FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_KIND,
  FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID,
  checkSwarmOwnership,
  classifySwarmMergeDisposition,
  classifySwarmMergeReadiness,
  completeSwarmJob,
  compileSwarm,
  checkSwarmBudget,
  checkSwarmInstrumentationBudget,
  checkSwarmUsageGovernor,
  createSwarmArtifactIndex,
  createSwarmArtifactRoutingPlan,
  createSwarmAutoReviewReport,
  createSwarmBlackboard,
  createSwarmBottleneckReport,
  createSwarmCoordinatorAgentDrainWork,
  createSwarmContextPack,
  createSwarmDebugHandoff,
  createSwarmDivergenceReport,
  createSwarmEventStream,
  createSwarmEvidenceIndex,
  createSwarmFixtureCatalog,
  createSwarmInstrumentationBudget,
  createSwarmLeases,
  createSwarmHotspotReport,
  createSwarmHierarchicalMergeQueue,
  createSwarmLanePlaybook,
  createSwarmMergeAdmission,
  createSwarmManifest,
  createSwarmMergeBundle,
  createSwarmMergeIndex,
  createSwarmOracleCorpus,
  createSwarmPatchStackPlan,
  createSwarmParityOracle,
  createSwarmProgressModel,
  createSwarmRebaseReport,
  createSwarmReferenceOraclePlan,
  createSwarmReferenceOracleResponse,
  createSwarmReplayBundle,
  createSwarmMergePlan,
  createSwarmPlan,
  createSwarmProof,
  createSwarmQueueOverlay,
  createSwarmQueueSnapshot,
  createSwarmReviewPlan,
  createSwarmReviewerLanePlan,
  createSwarmRunStoreShards,
  createSwarmRunCheckpoint,
  createSwarmRun,
  createSwarmSchedule,
  createSwarmSchedulerRecommendations,
  createSwarmTaskSelection,
  createSwarmUsageGovernor,
  createSwarmWatchpointPlan,
  decodeSwarmJsonl,
  decomposeSwarmFeature,
  defineSwarmManifest,
  defineSwarmTasks,
  encodeSwarmJsonl,
  deriveSwarmQueueStatus,
  matchesGlob,
  querySwarmBlackboard,
  querySwarmEvidenceIndex,
  recordSwarmEvent,
  renewSwarmLease,
  resolveSwarmChangedRegions,
  checkSwarmRegionOwnership,
  resolveSwarmCompute,
  routeSwarmEventToMailboxes,
  summarizeSwarmCoordinatorAgentDrainWork,
  validateSwarmManifest
} from '../dist/index.js';

const manifest = defineSwarmManifest({
  id: 'inkwell.swarm',
  package: '@app/inkwell',
  compute: [
    { id: 'deep', kind: 'codex', model: 'gpt-5.5', reasoningEffort: 'xhigh', sandbox: 'workspace-write', approval: 'never' },
    { id: 'fast', kind: 'codex', model: 'gpt-5.4-mini', reasoningEffort: 'medium' }
  ],
  layers: [
    { id: 'parent', childCompute: { implementation: 'deep', evidence: 'fast' } },
    { id: 'implementation', parentId: 'parent' },
    { id: 'evidence', parentId: 'parent' }
  ],
  lanes: [
    {
      id: 'runtime',
      layer: 'implementation',
      allowedWrites: ['inkwell/apps/web/src/runtime/**'],
      sharedReadOnly: ['inkwell/features/**'],
      ownershipRegions: [
        {
          id: 'content.docs',
          globs: ['inkwell/apps/web/src/runtime/runtime-website-content.ts'],
          selectors: ['content.docs.*']
        }
      ],
      evidencePrefix: 'inkwell/.frontier/evidence/runtime/',
      worktreePath: '../json-diff-inkwell-runtime',
      handoffCommands: [{ name: 'lint', command: 'npm', args: ['run', 'inkwell:lint'] }]
    },
    {
      id: 'harness',
      layer: 'evidence',
      allowedWrites: ['inkwell/e2e.mjs'],
      evidencePrefix: 'inkwell/.frontier/evidence/harness/',
      capabilities: ['browser.playwright'],
      resourceRequirements: {
        resources: { browser: 1 },
        browser: {
          required: true,
          portPool: [4177, 4178],
          profileDirPrefix: 'agent-runs/browser-profiles/',
          maxConcurrency: 1
        }
      }
    }
  ],
  policy: {
    defaultCompute: 'fast',
    defaultConcurrency: 4,
    sharedReadOnly: ['README.md'],
    neverEditWithoutParent: ['package.json']
  }
});

assert.strictEqual(createSwarmManifest().compute[0].id, FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID);
assert.strictEqual(validateSwarmManifest(manifest).valid, true);
assert.strictEqual(compileSwarm(manifest).lanesById.get('runtime').layer, 'implementation');

const tasks = defineSwarmTasks([
  {
    id: 'runtime-action-parity',
    lane: 'runtime',
    title: 'Runtime action parity',
    objective: 'Port runtime action behavior.',
    targetRefs: ['inkwell/apps/web/src/runtime/runtime.ts'],
    sourceRefs: ['/legacy/runtime.js'],
    ownershipRegions: [
      {
        id: 'runtime.actions',
        globs: ['inkwell/apps/web/src/runtime/runtime.ts'],
        selectors: ['runtime.actions.*']
      }
    ],
    changedRegions: ['runtime.actions'],
    acceptanceChecks: [{ description: 'runtime action evidence passes' }],
    verification: [{ command: 'node', args: ['inkwell/parity-shards.mjs', '--selector', 'runtime'] }]
  },
  {
    id: 'harness-evidence',
    lane: 'harness',
    status: 'open',
    targetRefs: ['inkwell/e2e.mjs']
  },
  {
    id: 'verified-item',
    lane: 'runtime',
    status: 'verified',
    targetRefs: ['inkwell/apps/web/src/runtime/verified.ts']
  }
]);

assert.strictEqual(resolveSwarmCompute(manifest, tasks[0]).id, 'deep');
assert.strictEqual(resolveSwarmCompute(manifest, tasks[1]).id, 'fast');

const plan = createSwarmPlan(manifest, tasks, { limit: 8, selectors: ['runtime'] });
assert.strictEqual(plan.jobs.length, 1);
assert.strictEqual(plan.jobs[0].compute.id, 'deep');
assert.strictEqual(plan.jobs[0].verification[0].command, 'node');
assert.ok(plan.jobs[0].allowedWrites.includes('inkwell/.frontier/evidence/runtime/runtime-action-parity/**'));
assert.ok(plan.jobs[0].ownedRegions.includes('runtime.actions'));
assert.deepStrictEqual(resolveSwarmChangedRegions(plan.jobs[0], ['inkwell/apps/web/src/runtime/runtime.ts']), ['runtime.actions']);
assert.strictEqual(plan.summary.jobCount, 1);

const selection = createSwarmTaskSelection(manifest, tasks, {
  workKinds: ['agent-task'],
  selectors: ['runtime'],
  limit: 2,
  assignSelectionPriority: true,
  priority: { statuses: { open: 0 }, workKinds: { 'agent-task': 0 } }
});
assert.strictEqual(selection.entries.length, 1);
assert.strictEqual(selection.tasks[0].priority, 0);
assert.deepStrictEqual(selection.summary.byLane, { runtime: 1 });

const warningSelection = createSwarmTaskSelection(manifest, [{
  id: 'off-lane',
  lane: 'runtime',
  targetRefs: ['inkwell/apps/web/src/components/off-lane.tsx']
}], { includeOwnershipWarnings: true });
assert.strictEqual(warningSelection.entries.length, 1);
assert.strictEqual(warningSelection.summary.ownershipWarningCount, 1);
assert.strictEqual(createSwarmTaskSelection(manifest, warningSelection.tasks).entries.length, 0);

const spreadSelection = createSwarmTaskSelection(manifest, [
  { id: 'runtime-a', lane: 'runtime', targetRefs: ['inkwell/apps/web/src/runtime/a.ts'] },
  { id: 'runtime-b', lane: 'runtime', targetRefs: ['inkwell/apps/web/src/runtime/b.ts'] },
  { id: 'harness-a', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] },
  { id: 'harness-b', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] }
], { spreadLanes: true, limit: 4 });
assert.deepStrictEqual(spreadSelection.entries.map((entry) => entry.task.id), ['harness-a', 'runtime-a', 'harness-b', 'runtime-b']);

const stream = createSwarmEventStream({ runId: 'run-1', root: 'agent-runs/run-1/streams', lanes: manifest.lanes });
assert.strictEqual(stream.summary.mailboxCount, 3);
assert.strictEqual(stream.lanes.runtime.path, 'agent-runs/run-1/streams/lanes/runtime.jsonl');
assert.deepStrictEqual(
  routeSwarmEventToMailboxes(stream, { type: 'agent.evidence', lane: 'runtime' }).map((mailbox) => mailbox.scope),
  ['global', 'lane']
);

const browserPlan = createSwarmPlan(manifest, [{
  id: 'browser-smoke',
  lane: 'harness',
  targetRefs: ['inkwell/e2e.mjs'],
  capabilities: ['dom.assertions']
}], { includeCompleted: true });
assert.strictEqual(browserPlan.limits.maxLaneConcurrency.harness, 1);
assert.ok(browserPlan.jobs[0].capabilities.includes('browser.playwright'));
assert.ok(browserPlan.jobs[0].capabilities.includes('dom.assertions'));
assert.deepStrictEqual(browserPlan.jobs[0].resourceRequirements.browser.portPool, ['4177', '4178']);

const allPlan = createSwarmPlan(manifest, tasks, { includeCompleted: true });
assert.strictEqual(allPlan.jobs.length, 3);
assert.strictEqual(createSwarmPlan(manifest, tasks).jobs.length, 2);
assert.deepStrictEqual(createSwarmPlan(manifest, [{
  id: 'child-task',
  lane: 'runtime',
  dependsOn: ['missing-parent'],
  targetRefs: ['inkwell/apps/web/src/runtime/child.ts']
}]).validation.issues.map((issue) => issue.code), ['missing-job-dependency', 'missing-task-dependency']);

assert.strictEqual(matchesGlob('inkwell/apps/web/src/runtime/runtime.ts', 'inkwell/apps/web/src/runtime/**'), true);
const ownership = checkSwarmOwnership(plan.jobs[0], [
  'inkwell/apps/web/src/runtime/runtime.ts',
  'inkwell/apps/web/src/components/WebsiteHomePage.tsx'
]);
assert.strictEqual(ownership.ok, false);
assert.deepStrictEqual(ownership.violations, ['inkwell/apps/web/src/components/WebsiteHomePage.tsx']);

let run = createSwarmRun({ plan, startedAt: 10 });
run = recordSwarmEvent(run, { type: 'agent.scheduled', jobId: plan.jobs[0].id, lane: 'runtime', at: 11 });
assert.strictEqual(run.events.length, 1);
run = completeSwarmJob(run, {
  jobId: plan.jobs[0].id,
  exitCode: 0,
  status: 'completed',
  startedAt: 12,
  finishedAt: 18,
  changedPaths: ['inkwell/apps/web/src/runtime/runtime.ts'],
  evidencePaths: ['inkwell/.frontier/evidence/runtime/runtime-action-parity/evidence.json']
});
assert.strictEqual(run.status, 'completed');
assert.strictEqual(run.summary.completedCount, 1);

const jsonl = encodeSwarmJsonl([plan, run]);
assert.strictEqual(decodeSwarmJsonl(jsonl).length, 2);
assert.ok(createSwarmProof(run, { generatedAt: 20, validation: plan.validation }).hash.length > 0);

const invalid = validateSwarmManifest({
  compute: [{ id: 'known' }],
  layers: [{ id: 'parent', childCompute: { child: 'missing' } }, { id: 'child', parentId: 'parent' }],
  policy: { defaultCompute: 'known' }
});
assert.strictEqual(invalid.valid, false);

const scaleTasks = defineSwarmTasks(Array.from({ length: 1000 }, (_, index) => ({
  id: `scale-${index}`,
  lane: index % 2 === 0 ? 'runtime' : 'harness',
  dependsOn: index % 10 === 0 ? [] : [`scale-${index - 1}`],
  targetRefs: [index % 2 === 0 ? `inkwell/apps/web/src/runtime/${index}.ts` : `inkwell/e2e-${index}.mjs`],
  concurrencyKey: `surface-${index % 25}`,
  budget: { maxInputTokens: 2000, maxOutputTokens: 1000, maxDurationMs: 60000, maxRetries: 1 },
  review: { sampleRate: 0.05, requiredReviewers: 1, reviewerPool: ['reviewer-a', 'reviewer-b'] }
})));
const scalePlan = createSwarmPlan(manifest, scaleTasks, {
  includeCompleted: true,
  maxReadyJobs: 40,
  maxLaneConcurrency: { runtime: 100, harness: 100 },
  maxConcurrencyKeyConcurrency: Object.fromEntries(Array.from({ length: 25 }, (_, index) => [`surface-${index}`, 10])),
  maxComputeConcurrency: { deep: 50, fast: 50 }
});
assert.strictEqual(scalePlan.jobs.length, 1000);
assert.strictEqual(scalePlan.graph.roots.length, 100);
assert.strictEqual(scalePlan.graph.edges.length, 900);
assert.strictEqual(scalePlan.validation.valid, true);

const scaleSchedule = createSwarmSchedule(scalePlan);
assert.strictEqual(scaleSchedule.ready.length, 40);
assert.ok(scaleSchedule.blocked.length > 0);
const leases = createSwarmLeases({ schedule: scaleSchedule, workerId: 'worker-1', now: 1000, leaseMs: 5000, count: 5 });
assert.strictEqual(leases.length, 5);
assert.strictEqual(leases[0].expiresAt, 6000);
assert.strictEqual(new Set(leases.map((lease) => lease.fencingToken)).size, 5);
assert.strictEqual(renewSwarmLease({ lease: leases[0], now: 7000, leaseMs: 5000 }).expiresAt, 12000);

const firstScaleJob = scalePlan.jobs[0];
const budgetDecision = checkSwarmBudget(firstScaleJob, { inputTokens: 2500, outputTokens: 10, durationMs: 20, attempts: 1 });
assert.strictEqual(budgetDecision.ok, false);
assert.deepStrictEqual(budgetDecision.violations, ['max-input-tokens']);

let scaleRun = createSwarmRun({ plan: scalePlan, startedAt: 2000 });
scaleRun = completeSwarmJob(scaleRun, {
  jobId: firstScaleJob.id,
  status: 'completed',
  changedPaths: [firstScaleJob.task.targetRefs[0]],
  evidencePaths: ['agent-runs/scale/evidence.json']
});
assert.strictEqual(scaleRun.results[0].mergeReadiness, 'patch-candidate');
assert.strictEqual(classifySwarmMergeReadiness({ jobId: 'discovery', status: 'completed', changedPaths: [] }), 'discovery-only');
assert.strictEqual(classifySwarmMergeDisposition({ jobId: 'verified', status: 'verified', changedPaths: ['src/runtime/a.ts'], verification: [{ status: 0 }] }), 'auto-mergeable');
const mergeBundle = createSwarmMergeBundle({
  runId: scaleRun.id,
  planId: scalePlan.id,
  job: firstScaleJob,
  result: scaleRun.results[0],
  patchPath: 'agent-runs/scale/changes.patch',
  queueItemIds: [firstScaleJob.taskId],
  riskLevel: 'low'
});
assert.strictEqual(mergeBundle.disposition, 'needs-port');
assert.strictEqual(mergeBundle.patchPath, 'agent-runs/scale/changes.patch');
assert.deepStrictEqual(mergeBundle.queueItemIds, [firstScaleJob.taskId]);
const queueSnapshot = createSwarmQueueSnapshot({ plan: scalePlan, run: scaleRun, leases, generatedAt: 8000 });
assert.strictEqual(queueSnapshot.summary.jobCount, 1000);
assert.strictEqual(queueSnapshot.summary.leaseCount, 5);
assert.strictEqual(queueSnapshot.summary.leasedCount, 4);
assert.strictEqual(queueSnapshot.summary.completedCount, 1);
const queueOverlay = createSwarmQueueOverlay({ runId: scaleRun.id, bundles: [mergeBundle], generatedAt: 8100 });
assert.strictEqual(queueOverlay.summary.needsHumanPortCount, 1);
const derivedQueue = deriveSwarmQueueStatus({ snapshot: queueSnapshot, overlays: [queueOverlay], generatedAt: 8200 });
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).status, 'blocked');
const checkpoint = createSwarmRunCheckpoint({ run: scaleRun, sequence: 1, savedAt: 9000 });
assert.strictEqual(checkpoint.runId, scaleRun.id);
assert.strictEqual(checkpoint.resultCount, 1);
const artifactIndex = createSwarmArtifactIndex({
  run: scaleRun,
  artifacts: [{ jobId: firstScaleJob.id, path: 'agent-runs/scale/timeline.jsonl', kind: 'timeline', bytes: 128 }],
  generatedAt: 3000
});
assert.strictEqual(artifactIndex.summary.artifactCount, 2);
assert.strictEqual(artifactIndex.byKind.evidence.length, 1);

const reviewPlan = createSwarmReviewPlan({
  plan: scalePlan,
  run: scaleRun,
  budgetDecisions: [budgetDecision],
  reviewers: ['fallback-reviewer'],
  generatedAt: 4000,
  sampleSalt: 'stable'
});
assert.ok(reviewPlan.assignments.some((assignment) => assignment.jobId === firstScaleJob.id && assignment.reason === 'budget'));

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
const mergePlan = createSwarmMergePlan({ plan: scalePlan, run: conflictRun, generatedAt: 6000 });
assert.ok(mergePlan.blocked.some((blocker) => blocker.reasons.includes('conflicting-changes')));

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
const explicitRegionMergePlan = createSwarmMergePlan({ plan: scalePlan, run: explicitRegionRun, generatedAt: 6060 });
assert.ok(explicitRegionMergePlan.ready.includes(scalePlan.jobs[2].id));
assert.ok(explicitRegionMergePlan.ready.includes(scalePlan.jobs[4].id));
assert.deepStrictEqual(
  explicitRegionMergePlan.blocked.filter((blocker) => [scalePlan.jobs[2].id, scalePlan.jobs[4].id].includes(blocker.jobId)),
  []
);

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
const incompleteRegionMergePlan = createSwarmMergePlan({ plan: scalePlan, run: incompleteRegionRun, generatedAt: 6080 });
const incompleteRegionBlockers = incompleteRegionMergePlan.blocked.filter((blocker) => [scalePlan.jobs[2].id, scalePlan.jobs[6].id].includes(blocker.jobId));
assert.deepStrictEqual(incompleteRegionBlockers.map((blocker) => blocker.jobId).sort(), [scalePlan.jobs[2].id, scalePlan.jobs[6].id].sort());
assert.ok(incompleteRegionBlockers.every((blocker) => blocker.reasons.includes('conflicting-changes')));

const regionOwnership = checkSwarmRegionOwnership(plan.jobs[0], {
  changedPaths: ['inkwell/apps/web/src/runtime/runtime.ts'],
  changedRegions: ['runtime.actions']
});
assert.strictEqual(regionOwnership.ok, true);
const badRegionOwnership = checkSwarmRegionOwnership(plan.jobs[0], {
  changedPaths: ['inkwell/apps/web/src/runtime/runtime.ts'],
  changedRegions: ['content.legal']
});
assert.strictEqual(badRegionOwnership.ok, false);
assert.deepStrictEqual(badRegionOwnership.regionViolations, ['content.legal']);

const regionBundleA = createSwarmMergeBundle({
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
const regionBundleB = createSwarmMergeBundle({
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
const unregionedBundle = createSwarmMergeBundle({
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
const sameRegionJob = scalePlan.jobs[14];
const crossScopeJob = scalePlan.jobs[16];
const highRiskJob = scalePlan.jobs[18];
assert.ok(sameRegionJob && crossScopeJob && highRiskJob);
const sameRegionBundle = createSwarmMergeBundle({
  job: sameRegionJob,
  result: {
    jobId: sameRegionJob.id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/same-region/changes.patch',
  riskLevel: 'low'
});
const crossScopeBundle = createSwarmMergeBundle({
  job: crossScopeJob,
  result: {
    jobId: crossScopeJob.id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs', 'content.legal'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/cross-scope/changes.patch',
  riskLevel: 'low'
});
const highRiskBundle = createSwarmMergeBundle({
  job: highRiskJob,
  result: {
    jobId: highRiskJob.id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/high-risk/changes.patch',
  riskLevel: 'high'
});
const regionIndex = createSwarmMergeIndex({ bundles: [regionBundleA, regionBundleB], generatedAt: 6100 });
assert.strictEqual(regionIndex.summary.conflictCount, 0);
assert.strictEqual(regionIndex.summary.readyToApplyCount, 2);
const sameRegionIndex = createSwarmMergeIndex({ bundles: [regionBundleA, sameRegionBundle], generatedAt: 6150 });
assert.strictEqual(sameRegionIndex.summary.conflictCount, 1);
assert.deepStrictEqual(sameRegionIndex.entries.find((entry) => entry.jobId === sameRegionBundle.jobId).conflictingJobIds, [regionBundleA.jobId]);
const crossScopeIndex = createSwarmMergeIndex({ bundles: [crossScopeBundle], generatedAt: 6160 });
assert.strictEqual(crossScopeIndex.summary.conflictCount, 0);
const highRiskIndex = createSwarmMergeIndex({ bundles: [highRiskBundle], generatedAt: 6170 });
assert.strictEqual(highRiskIndex.summary.readyToApplyCount, 1);
const pathFallbackIndex = createSwarmMergeIndex({ bundles: [regionBundleA, unregionedBundle], generatedAt: 6200 });
assert.strictEqual(pathFallbackIndex.summary.conflictCount, 1);
assert.deepStrictEqual(pathFallbackIndex.entries.find((entry) => entry.jobId === regionBundleA.jobId).conflictingJobIds, [unregionedBundle.jobId]);
const hotspotReport = createSwarmHotspotReport({ bundles: [regionBundleA, regionBundleB, unregionedBundle], threshold: 2, generatedAt: 6300 });
assert.strictEqual(hotspotReport.summary.hotspotCount, 1);
assert.ok(hotspotReport.recommendations.some((entry) => entry.path === 'src/hot/runtime-website-content.ts'));
const reviewerLane = createSwarmReviewerLanePlan({ index: pathFallbackIndex, reviewerLane: 'merge-review', reviewers: ['reviewer-a'], generatedAt: 6400 });
assert.ok(reviewerLane.tasks.every((task) => task.lane === 'merge-review'));
const runStoreShards = createSwarmRunStoreShards({ plan: scalePlan, root: 'agent-runs/sharded', shardSize: 200, groupBy: 'lane', generatedAt: 6500 });
assert.strictEqual(runStoreShards.summary.jobCount, 1000);
assert.ok(runStoreShards.summary.shardCount > 1);
const admission = createSwarmMergeAdmission({ index: regionIndex, maxReady: 1, maxChangedPaths: 2, maxChangedRegions: 2, generatedAt: 6600 });
assert.deepStrictEqual(admission.admitted, [regionBundleA.jobId]);
assert.strictEqual(admission.deferred[0].reasons.includes('max-ready'), true);
const admissionReviewerLane = createSwarmReviewerLanePlan({ index: regionIndex, admission, reviewerLane: 'merge-review', generatedAt: 6700 });
assert.ok(admissionReviewerLane.assignments.some((assignment) => assignment.jobId === regionBundleB.jobId && assignment.reasons.includes('max-ready')));
const contextPack = createSwarmContextPack({
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
assert.ok(contextPack.files.includes(firstScaleJob.task.targetRefs[0]));
assert.ok(contextPack.expectedEvidence.includes('evidence/commands.md'));
assert.ok(contextPack.exclusions.includes('node_modules'));
assert.strictEqual(contextPack.commands[0].command, 'npm');
assert.strictEqual(contextPack.oracleCommands[1].command, 'node');
const oracleCorpus = createSwarmOracleCorpus({
  id: 'generic-oracles',
  artifacts: [
    { id: 'api-trace', path: 'oracles/api-trace.jsonl', kind: 'trace', tags: ['api', 'deterministic'], command: 'node oracle.mjs' },
    { id: 'ui-trace', path: 'oracles/ui-trace.jsonl', kind: 'trace', tags: ['ui'] }
  ],
  generatedAt: 6900
});
assert.deepStrictEqual(oracleCorpus.byKind.trace, ['api-trace', 'ui-trace']);
assert.deepStrictEqual(oracleCorpus.byTag.deterministic, ['api-trace']);
const lanePlaybook = createSwarmLanePlaybook({
  lane: 'runtime',
  successfulBundles: [regionBundleA, regionBundleB],
  notes: ['Prefer the focused oracle before global smoke.'],
  commands: ['npm test'],
  avoidInvestigating: ['generated dist'],
  generatedAt: 7000
});
assert.deepStrictEqual(lanePlaybook.changedRegions, ['content.docs', 'content.legal']);
const patchStackPlan = createSwarmPatchStackPlan({ index: pathFallbackIndex, maxStackSize: 4, generatedAt: 7100 });
assert.strictEqual(patchStackPlan.summary.jobCount, 2);
assert.ok(patchStackPlan.stacks.some((stack) => stack.conflicts.length === 1));
const defaultHierarchicalQueue = createSwarmHierarchicalMergeQueue({ index: regionIndex, generatedAt: 7190 });
assert.strictEqual(defaultHierarchicalQueue.summary.applyLocalCount, 2);
const hierarchicalQueue = createSwarmHierarchicalMergeQueue({ index: regionIndex, admission, generatedAt: 7200 });
assert.strictEqual(hierarchicalQueue.summary.applyLocalCount, 1);
assert.strictEqual(hierarchicalQueue.summary.queueLocalCount, 1);
assert.strictEqual(hierarchicalQueue.summary.promoteCount, 0);
assert.deepStrictEqual(hierarchicalQueue.summary.admissionPressure, {
  applyLocalCount: 1,
  applyLocalQueueItemCount: 1,
  queueLocalCount: 1,
  queueLocalQueueItemCount: 1,
  promoteUpwardCount: 0,
  promoteUpwardQueueItemCount: 0,
  rerunCount: 0,
  rerunQueueItemCount: 0,
  rejectedCount: 0,
  rejectedQueueItemCount: 0,
  recordOnlyCount: 0,
  recordOnlyQueueItemCount: 0,
  trueBlockCount: 0,
  trueBlockQueueItemCount: 0
});
assert.strictEqual(hierarchicalQueue.scopes.filter((scope) => scope.kind === 'semantic-region').length, 2);
assert.strictEqual(hierarchicalQueue.scopes.some((scope) => scope.kind === 'custom'), false);
assert.strictEqual(
  hierarchicalQueue.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId).action,
  'apply-local'
);
assert.deepStrictEqual(
  hierarchicalQueue.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId).queueItemIds,
  regionBundleA.queueItemIds
);
assert.strictEqual(
  hierarchicalQueue.assignments.find((assignment) => assignment.jobId === regionBundleB.jobId).action,
  'queue-local'
);
const sameRegionQueue = createSwarmHierarchicalMergeQueue({ index: sameRegionIndex, generatedAt: 7250 });
assert.strictEqual(sameRegionQueue.summary.queueLocalCount, 2);
assert.strictEqual(sameRegionQueue.summary.promoteCount, 0);
assert.strictEqual(new Set(sameRegionQueue.assignments.map((assignment) => assignment.scopeId)).size, 1);
assert.ok(sameRegionQueue.assignments.every((assignment) => assignment.reasons.includes('same-lease-scope-conflict')));
assert.strictEqual(new Set(sameRegionQueue.assignments.map((assignment) => assignment.leaseKey)).size, 1);
const crossScopeQueue = createSwarmHierarchicalMergeQueue({ index: crossScopeIndex, generatedAt: 7260 });
const crossScopeAssignment = crossScopeQueue.assignments.find((assignment) => assignment.jobId === crossScopeBundle.jobId);
assert.strictEqual(crossScopeAssignment.action, 'promote');
assert.strictEqual(crossScopeAssignment.promoteToScopeId, 'root');
assert.ok(crossScopeAssignment.reasons.includes('cross-scope-change'));
const highRiskQueue = createSwarmHierarchicalMergeQueue({ index: highRiskIndex, generatedAt: 7270 });
const highRiskAssignment = highRiskQueue.assignments.find((assignment) => assignment.jobId === highRiskBundle.jobId);
assert.strictEqual(highRiskAssignment.action, 'promote');
assert.strictEqual(highRiskAssignment.promoteToScopeId, 'root');
assert.ok(highRiskAssignment.reasons.includes('high-risk'));
const conflictQueue = createSwarmHierarchicalMergeQueue({ index: pathFallbackIndex, generatedAt: 7300 });
assert.strictEqual(conflictQueue.summary.promoteCount, 2);
assert.deepStrictEqual(conflictQueue.promotions.map((promotion) => promotion.toScopeId), ['root', 'root']);
assert.ok(conflictQueue.byAction.promote.includes(regionBundleA.jobId));
assert.ok(conflictQueue.byScope['lane:runtime'] === undefined);
assert.ok(conflictQueue.scopes.some((scope) => scope.kind === 'root'));
assert.ok(conflictQueue.scopes.some((scope) => scope.kind === 'lane'));
assert.ok(conflictQueue.scopes.some((scope) => scope.kind === 'semantic-region'));
assert.ok(conflictQueue.scopes.some((scope) => scope.kind === 'path'));
assert.strictEqual(conflictQueue.scopes.some((scope) => scope.kind === 'custom'), false);
const customScopeQueue = createSwarmHierarchicalMergeQueue({
  index: regionIndex,
  scopes: [{
    id: 'scope:shared-runtime',
    parentId: 'root',
    title: 'Shared runtime queue',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs'],
    leaseKey: 'merge:scope:shared-runtime',
    metadata: { ownerKind: 'adapter-defined' }
  }],
  generatedAt: 7350
});
const customScope = customScopeQueue.scopes.find((scope) => scope.id === 'scope:shared-runtime');
assert.ok(customScope);
assert.strictEqual(customScope.kind, 'custom');
assert.strictEqual(customScope.leaseKey, 'merge:scope:shared-runtime');
assert.deepStrictEqual(customScope.changedPaths, ['src/hot/runtime-website-content.ts']);
assert.deepStrictEqual(customScope.changedRegions, ['content.docs']);
assert.deepStrictEqual(customScope.metadata, { ownerKind: 'adapter-defined' });
assert.deepStrictEqual(customScope.jobIds, []);
assert.ok(customScopeQueue.assignments.every((assignment) => assignment.scopeId.startsWith('semantic-region:')));
const sameLaneRuntimeJob = scalePlan.jobs.find((job) => job.id !== regionBundleA.jobId && job.lane === 'runtime');
assert.ok(sameLaneRuntimeJob);
const sameLaneUnregionedBundle = createSwarmMergeBundle({
  job: sameLaneRuntimeJob,
  result: {
    jobId: sameLaneRuntimeJob.id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/d/changes.patch',
  riskLevel: 'low'
});
const sameLaneConflictQueue = createSwarmHierarchicalMergeQueue({
  index: createSwarmMergeIndex({ bundles: [regionBundleA, sameLaneUnregionedBundle], generatedAt: 7400 }),
  generatedAt: 7500
});
assert.deepStrictEqual(sameLaneConflictQueue.promotions.map((promotion) => promotion.toScopeId), ['lane:runtime', 'lane:runtime']);
const terminalJobs = [scalePlan.jobs[8], scalePlan.jobs[9], scalePlan.jobs[10], scalePlan.jobs[11], scalePlan.jobs[12]];
assert.ok(terminalJobs.every(Boolean));
const terminalBundleStale = createSwarmMergeBundle({
  job: terminalJobs[0],
  result: {
    jobId: terminalJobs[0].id,
    status: 'verified',
    changedPaths: ['src/terminal/stale.ts'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/terminal/stale.patch',
  riskLevel: 'low',
  staleAgainstHead: true
});
const terminalBundleRejected = createSwarmMergeBundle({
  job: terminalJobs[1],
  result: {
    jobId: terminalJobs[1].id,
    status: 'failed',
    changedPaths: ['src/terminal/rejected.ts'],
    verification: [{ status: 1 }]
  },
  patchPath: 'agent-runs/terminal/rejected.patch',
  riskLevel: 'high'
});
const terminalBundleDiscovery = createSwarmMergeBundle({
  job: terminalJobs[2],
  result: {
    jobId: terminalJobs[2].id,
    status: 'completed',
    changedPaths: []
  },
  riskLevel: 'low'
});
const terminalBundleBlocked = createSwarmMergeBundle({
  job: terminalJobs[3],
  result: {
    jobId: terminalJobs[3].id,
    status: 'blocked',
    changedPaths: ['src/terminal/blocker.ts']
  },
  riskLevel: 'high'
});
const terminalBundleCoordinatorReview = createSwarmMergeBundle({
  job: terminalJobs[4],
  result: {
    jobId: terminalJobs[4].id,
    status: 'completed',
    changedPaths: ['src/terminal/coordinator-review.ts']
  },
  patchPath: 'agent-runs/terminal/coordinator-review.patch',
  riskLevel: 'medium'
});
const terminalQueue = createSwarmHierarchicalMergeQueue({
  index: createSwarmMergeIndex({
    bundles: [
      terminalBundleStale,
      terminalBundleRejected,
      terminalBundleDiscovery,
      terminalBundleBlocked,
      terminalBundleCoordinatorReview
    ],
    generatedAt: 7550
  }),
  generatedAt: 7560
});
assert.strictEqual(terminalQueue.summary.rerunCount, 1);
assert.strictEqual(terminalQueue.summary.rejectCount, 1);
assert.strictEqual(terminalQueue.summary.recordOnlyCount, 1);
assert.strictEqual(terminalQueue.summary.blockCount, 1);
assert.strictEqual(terminalQueue.summary.promoteCount, 1);
assert.deepStrictEqual(terminalQueue.summary.admissionPressure, {
  applyLocalCount: 0,
  applyLocalQueueItemCount: 0,
  queueLocalCount: 0,
  queueLocalQueueItemCount: 0,
  promoteUpwardCount: 1,
  promoteUpwardQueueItemCount: 1,
  rerunCount: 1,
  rerunQueueItemCount: 1,
  rejectedCount: 1,
  rejectedQueueItemCount: 1,
  recordOnlyCount: 1,
  recordOnlyQueueItemCount: 1,
  trueBlockCount: 1,
  trueBlockQueueItemCount: 1
});
assert.deepStrictEqual(terminalQueue.byAction.block, [terminalBundleBlocked.jobId]);
assert.deepStrictEqual(terminalQueue.byAction.promote, [terminalBundleCoordinatorReview.jobId]);
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleStale.jobId).action, 'rerun');
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleRejected.jobId).action, 'reject');
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleDiscovery.jobId).action, 'record-only');
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleBlocked.jobId).action, 'block');
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleCoordinatorReview.jobId).action, 'promote');
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleStale.jobId).reasons.includes('stale-against-head'));
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleRejected.jobId).reasons.includes('failed-or-invalid-evidence'));
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleDiscovery.jobId).reasons.includes('discovery-only'));
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleBlocked.jobId).reasons.includes('true-blocker'));
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleCoordinatorReview.jobId).reasons.includes('coordinator-queue-required'));
assert.ok(terminalQueue.promotions.find((promotion) => promotion.jobId === terminalBundleCoordinatorReview.jobId).reasons.includes('coordinator-queue-required'));

const coordinatorDrainWork = createSwarmCoordinatorAgentDrainWork({
  queue: hierarchicalQueue,
  coordinatorId: 'coordinator-1',
  generatedAt: 7570
});
assert.strictEqual(coordinatorDrainWork.kind, FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_KIND);
assert.strictEqual(coordinatorDrainWork.queueId, hierarchicalQueue.id);
assert.strictEqual(coordinatorDrainWork.coordinatorId, 'coordinator-1');
assert.strictEqual(coordinatorDrainWork.summary.appliedCount, 1);
assert.strictEqual(coordinatorDrainWork.summary.queuedCount, 1);
assert.strictEqual(coordinatorDrainWork.summary.terminalCount, 1);
assert.strictEqual(coordinatorDrainWork.summary.nonTerminalCount, 1);
const coordinatorDrainSummary = summarizeSwarmCoordinatorAgentDrainWork(coordinatorDrainWork);
assert.deepStrictEqual(coordinatorDrainSummary, {
  leaseCount: coordinatorDrainWork.leases.length,
  assignmentCount: 2,
  activeAssignmentCount: 1,
  terminalCount: 1,
  promotedWorkCount: 0,
  blockerCount: 0,
  queueItemCount: 2,
  activeQueueItemCount: 1,
  terminalQueueItemCount: 1,
  promotedQueueItemCount: 0,
  blockerQueueItemCount: 0,
  admissionPressure: {
    applyLocalCount: 1,
    applyLocalQueueItemCount: 1,
    queueLocalCount: 1,
    queueLocalQueueItemCount: 1,
    promoteUpwardCount: 0,
    promoteUpwardQueueItemCount: 0,
    rerunCount: 0,
    rerunQueueItemCount: 0,
    rejectedCount: 0,
    rejectedQueueItemCount: 0,
    recordOnlyCount: 0,
    recordOnlyQueueItemCount: 0,
    trueBlockCount: 0,
    trueBlockQueueItemCount: 0
  }
});
assert.strictEqual(coordinatorDrainWork.summary.activeAssignmentCount, coordinatorDrainSummary.activeAssignmentCount);
assert.strictEqual(coordinatorDrainWork.summary.queueItemCount, coordinatorDrainSummary.queueItemCount);
assert.deepStrictEqual(coordinatorDrainWork.summary.admissionPressure, coordinatorDrainSummary.admissionPressure);
assert.deepStrictEqual(coordinatorDrainWork.activeAssignments.map((assignment) => assignment.jobId), [regionBundleB.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byAction['apply-local'], [regionBundleA.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byAction['queue-local'], [regionBundleB.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byDecision.applied, [regionBundleA.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byDecision.queued, [regionBundleB.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byClassification.terminal, [regionBundleA.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byClassification['non-terminal'], [regionBundleB.jobId]);
const drainApply = coordinatorDrainWork.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId);
assert.strictEqual(drainApply.assignedAction, 'apply-local');
assert.strictEqual(drainApply.decision, 'applied');
assert.strictEqual(drainApply.classification, 'terminal');
assert.strictEqual(drainApply.terminal, true);
assert.deepStrictEqual(drainApply.queueItemIds, regionBundleA.queueItemIds);
assert.ok(drainApply.leaseId.startsWith('swarm-coordinator-agent-drain-lease:'));
assert.ok(drainApply.leaseScope.startsWith('merge:semantic:'));
assert.strictEqual(drainApply.queueId, hierarchicalQueue.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId).scopeId);
assert.deepStrictEqual(
  coordinatorDrainWork.terminalDecisions.find((decision) => decision.jobId === regionBundleA.jobId).queueItemIds,
  regionBundleA.queueItemIds
);
assert.strictEqual(
  coordinatorDrainWork.terminalDecisions.find((decision) => decision.jobId === regionBundleA.jobId).leaseScope,
  drainApply.leaseScope
);
assert.deepStrictEqual(coordinatorDrainWork.byLeaseScope[drainApply.leaseScope], [regionBundleA.jobId]);
const drainQueue = coordinatorDrainWork.assignments.find((assignment) => assignment.jobId === regionBundleB.jobId);
assert.strictEqual(drainQueue.assignedAction, 'queue-local');
assert.strictEqual(drainQueue.decision, 'queued');
assert.strictEqual(drainQueue.classification, 'non-terminal');
assert.strictEqual(drainQueue.terminal, false);
assert.deepStrictEqual(drainQueue.queueItemIds, regionBundleB.queueItemIds);
assert.ok(drainQueue.reasons.includes('max-ready'));
assert.strictEqual(coordinatorDrainWork.activeAssignments[0].leaseScope, drainQueue.leaseScope);
assert.deepStrictEqual(coordinatorDrainWork.byLeaseScope[drainQueue.leaseScope], [regionBundleB.jobId]);
const stableCoordinatorDrainWork = createSwarmCoordinatorAgentDrainWork({
  queue: createSwarmHierarchicalMergeQueue({ index: regionIndex, admission, generatedAt: 7201 }),
  coordinatorId: 'coordinator-1',
  generatedAt: 7571
});
assert.deepStrictEqual(
  coordinatorDrainWork.leases.map((lease) => [lease.queueId, lease.id, lease.leaseScope]),
  stableCoordinatorDrainWork.leases.map((lease) => [lease.queueId, lease.id, lease.leaseScope])
);

const promoteDrainWork = createSwarmCoordinatorAgentDrainWork({ queue: conflictQueue, generatedAt: 7580 });
const promoteQueueJobIds = conflictQueue.assignments.map((assignment) => assignment.jobId);
assert.strictEqual(promoteDrainWork.summary.escalatedCount, 2);
assert.strictEqual(promoteDrainWork.summary.nonTerminalCount, 2);
assert.strictEqual(promoteDrainWork.summary.promotedWorkCount, 2);
assert.deepStrictEqual(promoteDrainWork.activeAssignments.map((assignment) => assignment.jobId), promoteQueueJobIds);
assert.deepStrictEqual(promoteDrainWork.byDecision.escalated, promoteQueueJobIds);
const promoteDrainSummary = summarizeSwarmCoordinatorAgentDrainWork(promoteDrainWork);
assert.strictEqual(promoteDrainSummary.activeAssignmentCount, 2);
assert.strictEqual(promoteDrainSummary.promotedWorkCount, 2);
assert.strictEqual(promoteDrainSummary.promotedQueueItemCount, 2);
assert.strictEqual(promoteDrainSummary.admissionPressure.promoteUpwardCount, 2);
assert.strictEqual(promoteDrainSummary.admissionPressure.promoteUpwardQueueItemCount, 2);
assert.strictEqual(promoteDrainWork.summary.promotedQueueItemCount, promoteDrainSummary.promotedQueueItemCount);
const drainPromote = promoteDrainWork.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId);
assert.strictEqual(drainPromote.assignedAction, 'promote');
assert.strictEqual(drainPromote.decision, 'escalated');
assert.strictEqual(drainPromote.classification, 'non-terminal');
assert.strictEqual(drainPromote.parentQueueId, 'root');
assert.strictEqual(drainPromote.promoteToQueueId, 'root');
const drainPromoteLease = promoteDrainWork.leases.find((lease) => lease.queueId === drainPromote.parentQueueId);
assert.strictEqual(drainPromote.leaseId, drainPromoteLease.id);
assert.strictEqual(drainPromote.leaseScope, drainPromoteLease.leaseScope);
assert.deepStrictEqual(promoteDrainWork.byLeaseScope[drainPromoteLease.leaseScope], promoteQueueJobIds);
assert.ok(drainPromoteLease.actions.promote.includes(regionBundleA.jobId));
assert.ok(drainPromoteLease.jobIds.includes(regionBundleA.jobId));
assert.ok(promoteDrainWork.promotedWork.some((entry) => (
  entry.jobId === regionBundleA.jobId
  && entry.parentQueueId === 'root'
  && entry.leaseId === drainPromoteLease.id
  && entry.leaseScope === drainPromoteLease.leaseScope
  && entry.queueItemIds.join('\n') === regionBundleA.queueItemIds.join('\n')
)));

const terminalDrainWork = createSwarmCoordinatorAgentDrainWork({ queue: terminalQueue, generatedAt: 7590 });
assert.strictEqual(terminalDrainWork.summary.terminalCount, 4);
assert.strictEqual(terminalDrainWork.summary.escalatedCount, 1);
assert.strictEqual(terminalDrainWork.summary.rerunCount, 1);
assert.strictEqual(terminalDrainWork.summary.rejectedCount, 1);
assert.strictEqual(terminalDrainWork.summary.recordedCount, 1);
assert.strictEqual(terminalDrainWork.summary.blockedCount, 1);
assert.strictEqual(terminalDrainWork.summary.nonTerminalCount, 1);
assert.deepStrictEqual(terminalDrainWork.activeAssignments.map((assignment) => assignment.jobId), [terminalBundleCoordinatorReview.jobId]);
const terminalDrainSummary = summarizeSwarmCoordinatorAgentDrainWork(terminalDrainWork);
assert.deepStrictEqual(terminalDrainSummary, {
  leaseCount: terminalDrainWork.leases.length,
  assignmentCount: 5,
  activeAssignmentCount: 1,
  terminalCount: 4,
  promotedWorkCount: 1,
  blockerCount: 1,
  queueItemCount: 5,
  activeQueueItemCount: 1,
  terminalQueueItemCount: 4,
  promotedQueueItemCount: 1,
  blockerQueueItemCount: 1,
  admissionPressure: {
    applyLocalCount: 0,
    applyLocalQueueItemCount: 0,
    queueLocalCount: 0,
    queueLocalQueueItemCount: 0,
    promoteUpwardCount: 1,
    promoteUpwardQueueItemCount: 1,
    rerunCount: 1,
    rerunQueueItemCount: 1,
    rejectedCount: 1,
    rejectedQueueItemCount: 1,
    recordOnlyCount: 1,
    recordOnlyQueueItemCount: 1,
    trueBlockCount: 1,
    trueBlockQueueItemCount: 1
  }
});
assert.strictEqual(terminalDrainWork.summary.activeAssignmentCount, terminalDrainSummary.activeAssignmentCount);
assert.strictEqual(terminalDrainWork.summary.blockerCount, terminalDrainSummary.blockerCount);
assert.strictEqual(terminalDrainWork.summary.blockerQueueItemCount, terminalDrainSummary.blockerQueueItemCount);
assert.deepStrictEqual(terminalDrainWork.summary.admissionPressure, terminalDrainSummary.admissionPressure);
assert.deepStrictEqual(
  summarizeSwarmCoordinatorAgentDrainWork(JSON.parse(JSON.stringify(terminalDrainWork))),
  terminalDrainSummary
);
const drainRerun = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleStale.jobId);
const drainReject = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleRejected.jobId);
const drainRecordOnly = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleDiscovery.jobId);
const drainBlock = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleBlocked.jobId);
assert.deepStrictEqual(
  [drainRerun.decision, drainReject.decision, drainRecordOnly.decision, drainBlock.decision],
  ['rerun', 'rejected', 'recorded', 'blocked']
);
assert.ok([drainRerun, drainReject, drainRecordOnly, drainBlock].every((assignment) => assignment.classification === 'terminal' && assignment.terminal === true));
assert.strictEqual(drainBlock.assignedAction, 'block');
assert.ok(drainBlock.reasons.includes('true-blocker'));
assert.deepStrictEqual(terminalDrainWork.blockers.map((decision) => decision.jobId), [terminalBundleBlocked.jobId]);
assert.strictEqual(terminalDrainWork.blockers[0].leaseScope, drainBlock.leaseScope);
assert.deepStrictEqual(terminalDrainWork.byDecision.blocked, [terminalBundleBlocked.jobId]);
const drainCoordinatorReview = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleCoordinatorReview.jobId);
assert.strictEqual(drainCoordinatorReview.assignedAction, 'promote');
assert.strictEqual(drainCoordinatorReview.decision, 'escalated');
assert.strictEqual(drainCoordinatorReview.classification, 'non-terminal');
assert.strictEqual(drainCoordinatorReview.terminal, false);

const decomposed = decomposeSwarmFeature({
  featureId: 'feature-x',
  objective: 'Implement feature x',
  lanes: ['runtime', 'harness'],
  files: ['src/runtime/action.ts', 'test/harness.mjs'],
  reviewers: ['reviewer-a'],
  checks: [{ command: 'npm', args: ['test'] }]
});
assert.strictEqual(decomposed.length, 2);
assert.ok(decomposed[0].verification?.length);

const replayBundle = createSwarmReplayBundle({
  id: 'replay-api-divergence',
  subject: 'library-port',
  commands: [{ name: 'replay', command: 'node', args: ['replay.mjs'] }],
  inputs: [{ path: 'fixtures/request.json', kind: 'fixture' }],
  artifacts: [{ path: 'agent-runs/replay/trace.jsonl', kind: 'trace' }],
  sourceRefs: ['legacy/runtime.js'],
  seeds: ['case-42'],
  expectedEvidence: ['trace.jsonl'],
  generatedAt: 7200
});
assert.strictEqual(replayBundle.summary.commandCount, 1);
assert.strictEqual(replayBundle.seeds[0].kind, 'seed');

const parityOracle = createSwarmParityOracle({
  id: 'parity-library-port',
  subject: 'library-port',
  referenceCommands: ['node legacy.mjs'],
  testCommands: ['node candidate.mjs'],
  comparators: [
    { id: 'state-match', status: 'failed', expected: { ok: true }, actual: { ok: false }, path: '/ok', operationIndex: 42 }
  ],
  replayBundleIds: [replayBundle.id],
  generatedAt: 7300
});
assert.strictEqual(parityOracle.status, 'failed');
assert.strictEqual(parityOracle.summary.failedCount, 1);

const divergenceReport = createSwarmDivergenceReport({
  id: 'divergence-state',
  subject: 'library-port',
  observabilityPoints: [
    { id: 'point-late', operationIndex: 50, path: '/ok', after: false },
    { id: 'point-early', operationIndex: 42, path: '/ok', before: true, after: false }
  ],
  expected: true,
  actual: false,
  traceRefs: [{ path: 'agent-runs/replay/trace.jsonl' }],
  replayBundleIds: [replayBundle.id],
  generatedAt: 7400
});
assert.strictEqual(divergenceReport.operationIndex, 42);
assert.strictEqual(divergenceReport.divergesAt, '/ok');

const watchpointPlan = createSwarmWatchpointPlan({
  subject: 'library-port',
  watchpoints: [{ path: '/ok', operator: 'changes', action: 'break' }],
  commands: ['node inspect.mjs'],
  replayBundleIds: [replayBundle.id],
  divergenceReportIds: [divergenceReport.id],
  generatedAt: 7500
});
assert.strictEqual(watchpointPlan.watchpoints[0].action, 'break');

const debugHandoff = createSwarmDebugHandoff({
  subject: 'library-port',
  focus: divergenceReport.observabilityPoints[0],
  replayBundleIds: [replayBundle.id],
  divergenceReportIds: [divergenceReport.id],
  watchpointPlanIds: [watchpointPlan.id],
  files: [{ path: 'src/runtime.ts', kind: 'source' }],
  comparisons: parityOracle.comparators,
  generatedAt: 7600
});
assert.strictEqual(debugHandoff.status, 'ready');
assert.strictEqual(debugHandoff.comparisons[0].path, '/ok');

const instrumentationBudget = createSwarmInstrumentationBudget({
  id: 'browser-evidence-budget',
  lane: 'harness',
  maxEvents: 10,
  maxBytes: 1024,
  maxOverheadRatio: 0.2,
  captureKinds: ['trace', 'log'],
  generatedAt: 7700
});
assert.strictEqual(checkSwarmInstrumentationBudget(instrumentationBudget, { events: 11, captureKinds: ['trace'] }).ok, false);

const bottleneckReport = createSwarmBottleneckReport({
  sources: [{
    jobId: 'debug-job',
    text: 'trace logging overhead made the harness slow',
    evidencePaths: ['agent-runs/debug/evidence.json'],
    changedPaths: ['src/runtime.ts']
  }],
  generatedAt: 7800
});
assert.strictEqual(bottleneckReport.classifications[0].kind, 'instrumentation-overhead');

const evidenceRun = createSwarmRun({
  plan,
  results: [{
    jobId: plan.jobs[0].id,
    status: 'verified',
    evidencePaths: ['agent-runs/runtime/evidence.json', 'agent-runs/runtime/trace.jsonl'],
    queueItemIds: ['runtime-action-parity']
  }]
});
const evidenceIndex = createSwarmEvidenceIndex({
  run: evidenceRun,
  entries: [{ topic: 'apu-port-timing', path: 'agent-runs/runtime/notes.md', tags: ['timing'], confidence: 0.9 }],
  generatedAt: 7900
});
assert.strictEqual(querySwarmEvidenceIndex(evidenceIndex, { pathIncludes: 'trace' }).summary.entryCount, 1);
assert.strictEqual(querySwarmEvidenceIndex(evidenceIndex, { topic: 'apu-port-timing', minConfidence: 0.8 }).summary.entryCount, 1);

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
