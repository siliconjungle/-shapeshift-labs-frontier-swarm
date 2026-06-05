import assert from 'node:assert';
import {
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
  createSwarmAdaptiveLoadPlan,
  createSwarmAutoReviewReport,
  createSwarmBlackboard,
  createSwarmBottleneckReport,
  createSwarmCoordinatorDashboard,
  createSwarmContextPack,
  createSwarmDebugHandoff,
  createSwarmDivergenceReport,
  createSwarmEventStream,
  createSwarmEvidenceIndex,
  createSwarmFixtureCatalog,
  createSwarmInstrumentationBudget,
  createSwarmLeases,
  createSwarmHotspotReport,
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
  createSwarmScheduleInputFromAdaptiveLoadPlan,
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
  querySwarmCoordinatorDashboard,
  querySwarmEvidenceIndex,
  recordSwarmEvent,
  renewSwarmLease,
  resolveSwarmChangedRegions,
  checkSwarmRegionOwnership,
  resolveSwarmCompute,
  routeSwarmEventToMailboxes,
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
  evidencePaths: ['agent-runs/scale/evidence.json'],
  semanticImport: {
    total: 1,
    imported: 1,
    semanticIndex: { symbols: 2, facts: 1 },
    semanticSidecars: { total: 1, ownershipRegions: 2, patchHints: 1 },
    sourceProjections: { total: 1, stubs: 1, needsReview: 1 },
    nativeCompiles: { total: 1, emitted: 1, preserved: 1, needsReview: 1 },
    readiness: { 'ready-with-losses': 1 }
  }
});
assert.strictEqual(scaleRun.results[0].mergeReadiness, 'patch-candidate');
assert.strictEqual(scaleRun.results[0].semanticImport.semanticIndex.symbols, 2);
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
assert.strictEqual(mergeBundle.semanticImport.semanticSidecars.ownershipRegions, 2);
assert.strictEqual(mergeBundle.semanticImport.nativeCompiles.preserved, 1);
const queueSnapshot = createSwarmQueueSnapshot({ plan: scalePlan, run: scaleRun, leases, generatedAt: 8000 });
assert.strictEqual(queueSnapshot.summary.jobCount, 1000);
assert.strictEqual(queueSnapshot.summary.leaseCount, 5);
assert.strictEqual(queueSnapshot.summary.leasedCount, 4);
assert.strictEqual(queueSnapshot.summary.completedCount, 1);
const queueOverlay = createSwarmQueueOverlay({ runId: scaleRun.id, bundles: [mergeBundle], generatedAt: 8100 });
assert.strictEqual(queueOverlay.summary.needsHumanPortCount, 1);
assert.strictEqual(queueOverlay.entries[0].semanticImport.sourceProjections.needsReview, 1);
assert.strictEqual(queueOverlay.entries[0].semanticImport.nativeCompiles.emitted, 1);
const derivedQueue = deriveSwarmQueueStatus({ snapshot: queueSnapshot, overlays: [queueOverlay], generatedAt: 8200 });
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).status, 'blocked');
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).metadata.semanticImport.sourceProjections.stubs, 1);
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).metadata.semanticImport.nativeCompiles.preserved, 1);
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
const regionIndex = createSwarmMergeIndex({ bundles: [regionBundleA, regionBundleB], generatedAt: 6100 });
assert.strictEqual(regionIndex.summary.conflictCount, 0);
assert.strictEqual(regionIndex.summary.readyToApplyCount, 2);
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

const coordinatorDashboard = createSwarmCoordinatorDashboard({
  plan,
  run: evidenceRun,
  bundles: [regionBundleA, regionBundleB, unregionedBundle],
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
assert.ok(coordinatorDashboard.jobs.some((job) => job.jobId === regionBundleA.jobId && job.duplicateGroupId));
assert.ok(coordinatorDashboard.jobs.some((job) => job.jobId === 'running-job' && job.liveness === 'running'));
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
