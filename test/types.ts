import {
  createSwarmManifest,
  createSwarmContextPack,
  createSwarmEventStream,
  createSwarmOracleCorpus,
  createSwarmReplayBundle,
  createSwarmParityOracle,
  createSwarmDivergenceReport,
  createSwarmWatchpointPlan,
  createSwarmDebugHandoff,
  createSwarmInstrumentationBudget,
  checkSwarmInstrumentationBudget,
  createSwarmBottleneckReport,
  createSwarmEvidenceIndex,
  querySwarmEvidenceIndex,
  createSwarmBlackboard,
  querySwarmBlackboard,
  createSwarmCoordinatorDashboard,
  createSwarmAdaptiveLoadPlan,
  createSwarmScheduleInputFromAdaptiveLoadPlan,
  querySwarmCoordinatorDashboard,
  createSwarmReferenceOraclePlan,
  createSwarmReferenceOracleResponse,
  createSwarmArtifactRoutingPlan,
  createSwarmSchedulerRecommendations,
  createSwarmFixtureCatalog,
  createSwarmProgressModel,
  createSwarmAutoReviewReport,
  createSwarmRebaseReport,
  createSwarmUsageGovernor,
  checkSwarmUsageGovernor,
  createSwarmLanePlaybook,
  createSwarmPatchStackPlan,
  createSwarmSchedule,
  createSwarmLeases,
  createSwarmQueueSnapshot,
  createSwarmQueueOverlay,
  createSwarmReviewPlan,
  createSwarmMergeIndex,
  createSwarmMergeAdmission,
  createSwarmMergePlan,
  createSwarmMergeBundle,
  createSwarmRunStoreShards,
  createSwarmRunCheckpoint,
  checkSwarmBudget,
  createSwarmPlan,
  createSwarmRun,
  defineSwarmTasks,
  resolveSwarmCompute,
  type FrontierSwarmArtifactIndex,
  type FrontierSwarmArtifactRoutingPlan,
  type FrontierSwarmAutoReviewReport,
  type FrontierSwarmBlackboard,
  type FrontierSwarmBottleneckReport,
  type FrontierSwarmBudgetDecision,
  type FrontierSwarmCompute,
  type FrontierSwarmCoordinatorDashboard,
  type FrontierSwarmAdaptiveLoadPlan,
  type FrontierSwarmContextPack,
  type FrontierSwarmDebugHandoff,
  type FrontierSwarmDivergenceReport,
  type FrontierSwarmEvidenceIndex,
  type FrontierSwarmFixtureCatalog,
  type FrontierSwarmInstrumentationBudgetDecision,
  type FrontierSwarmInstrumentationBudget,
  type FrontierSwarmManifest,
  type FrontierSwarmOracleCorpus,
  type FrontierSwarmParityOracle,
  type FrontierSwarmProgressModel,
  type FrontierSwarmRebaseReport,
  type FrontierSwarmReferenceOraclePlan,
  type FrontierSwarmReferenceOracleResponse,
  type FrontierSwarmReplayBundle,
  type FrontierSwarmLanePlaybook,
  type FrontierSwarmPatchStackPlan,
  type FrontierSwarmMergeBundle,
  type FrontierSwarmMergeIndex,
  type FrontierSwarmMergeAdmission,
  type FrontierSwarmMergePlan,
  type FrontierSwarmPlan,
  type FrontierSwarmQueueOverlay,
  type FrontierSwarmQueueSnapshot,
  type FrontierSwarmRunStoreShards,
  type FrontierSwarmReviewPlan,
  type FrontierSwarmSchedule,
  type FrontierSwarmSchedulerRecommendations,
  type FrontierSwarmSemanticImportSummary,
  type FrontierSwarmEventStream,
  type FrontierSwarmTask,
  type FrontierSwarmUsageGovernor,
  type FrontierSwarmUsageGovernorDecision,
  type FrontierSwarmWatchpointPlan
} from '../dist/index.js';

const manifest: FrontierSwarmManifest = createSwarmManifest({
  compute: [{ id: 'deep', kind: 'codex', model: 'gpt-5.5', reasoningEffort: 'xhigh' }],
  lanes: [{ id: 'runtime', compute: 'deep', allowedWrites: ['src/runtime/**'] }],
  policy: { defaultCompute: 'deep' }
});

const tasks: FrontierSwarmTask[] = defineSwarmTasks([{
  id: 'runtime-port',
  lane: 'runtime',
  targetRefs: ['src/runtime/index.ts'],
  verification: [{ command: 'npm', args: ['test'] }]
}]);

const plan: FrontierSwarmPlan = createSwarmPlan(manifest, tasks);
const compute: FrontierSwarmCompute = resolveSwarmCompute(manifest, tasks[0]);
const schedule: FrontierSwarmSchedule = createSwarmSchedule(plan);
const leases = createSwarmLeases({ schedule, workerId: 'worker' });
const stream: FrontierSwarmEventStream = createSwarmEventStream({ lanes: manifest.lanes });
const queueSnapshot: FrontierSwarmQueueSnapshot = createSwarmQueueSnapshot({ plan, leases });
const budget: FrontierSwarmBudgetDecision = checkSwarmBudget(plan.jobs[0], { inputTokens: 1 });
const run = createSwarmRun({ plan, results: [{ jobId: plan.jobs[0].id, status: 'completed' }] });
const checkpoint = createSwarmRunCheckpoint(run);
const reviewPlan: FrontierSwarmReviewPlan = createSwarmReviewPlan({ plan, run, reviewers: ['reviewer'] });
const mergePlan: FrontierSwarmMergePlan = createSwarmMergePlan({ plan, run, reviewPlan });
const mergeBundle: FrontierSwarmMergeBundle = createSwarmMergeBundle({ job: plan.jobs[0], result: run.results[0] });
const semanticSummary: FrontierSwarmSemanticImportSummary = createSwarmMergeBundle({
  result: {
    jobId: 'semantic',
    status: 'completed',
    semanticImport: { total: 1, semanticSidecars: { ownershipRegions: 1 }, proofSpec: { obligations: 1, discharged: 1 }, paradigmSemantics: { loweringRecords: 1, hasLowering: true }, sourceProjections: { preserved: 1 }, nativeCompiles: { emitted: 1 } }
  }
}).semanticImport!;
semanticSummary.proofSpec.obligations satisfies number;
semanticSummary.paradigmSemantics.hasLowering satisfies boolean;
const queueOverlay: FrontierSwarmQueueOverlay = createSwarmQueueOverlay({ bundles: [mergeBundle] });
const mergeIndex: FrontierSwarmMergeIndex = createSwarmMergeIndex({ bundles: [mergeBundle] });
const admission: FrontierSwarmMergeAdmission = createSwarmMergeAdmission({ index: mergeIndex, maxReady: 1 });
const runStoreShards: FrontierSwarmRunStoreShards = createSwarmRunStoreShards({ plan });
const contextPack: FrontierSwarmContextPack = createSwarmContextPack({ job: plan.jobs[0] });
const oracleCorpus: FrontierSwarmOracleCorpus = createSwarmOracleCorpus({ artifacts: [{ id: 'oracle', path: 'oracle.json' }] });
const replayBundle: FrontierSwarmReplayBundle = createSwarmReplayBundle({ commands: ['node replay.mjs'] });
const parityOracle: FrontierSwarmParityOracle = createSwarmParityOracle({ comparators: [{ status: 'passed' }] });
const divergenceReport: FrontierSwarmDivergenceReport = createSwarmDivergenceReport({ observabilityPoints: [{ operationIndex: 1 }] });
const watchpointPlan: FrontierSwarmWatchpointPlan = createSwarmWatchpointPlan({ watchpoints: [{ path: '/value' }] });
const debugHandoff: FrontierSwarmDebugHandoff = createSwarmDebugHandoff({ replayBundleIds: [replayBundle.id] });
const instrumentationBudget: FrontierSwarmInstrumentationBudget = createSwarmInstrumentationBudget({ maxEvents: 10 });
const instrumentationDecision: FrontierSwarmInstrumentationBudgetDecision = checkSwarmInstrumentationBudget(instrumentationBudget, { events: 2 });
const bottleneckReport: FrontierSwarmBottleneckReport = createSwarmBottleneckReport({ sources: [{ text: 'merge conflict' }] });
const evidenceIndex: FrontierSwarmEvidenceIndex = createSwarmEvidenceIndex({ entries: [{ topic: 'timing', path: 'evidence.json' }] });
const blackboard: FrontierSwarmBlackboard = createSwarmBlackboard({ entries: [{ topic: 'fact', text: 'known divergence' }] });
const coordinatorDashboard: FrontierSwarmCoordinatorDashboard = createSwarmCoordinatorDashboard({ plan, run, mergeIndex, evidenceIndex });
const referencePlan: FrontierSwarmReferenceOraclePlan = createSwarmReferenceOraclePlan({ targets: [{ id: 'reference', role: 'reference' }] });
const referenceResponse: FrontierSwarmReferenceOracleResponse = createSwarmReferenceOracleResponse({ planId: referencePlan.id });
const artifactRoutingPlan: FrontierSwarmArtifactRoutingPlan = createSwarmArtifactRoutingPlan({ artifacts: [{ path: 'changes.patch' }] });
const schedulerRecommendations: FrontierSwarmSchedulerRecommendations = createSwarmSchedulerRecommendations({ schedule });
const fixtureCatalog: FrontierSwarmFixtureCatalog = createSwarmFixtureCatalog({ fixtures: [{ id: 'logged-in' }] });
const progressModel: FrontierSwarmProgressModel = createSwarmProgressModel({ items: [{ id: 'route', status: 'implemented' }] });
const autoReviewReport: FrontierSwarmAutoReviewReport = createSwarmAutoReviewReport({ bundles: [mergeBundle] });
const rebaseReport: FrontierSwarmRebaseReport = createSwarmRebaseReport({ mergeIndex });
const usageGovernor: FrontierSwarmUsageGovernor = createSwarmUsageGovernor({ maxWorkers: 20 });
const usageDecision: FrontierSwarmUsageGovernorDecision = checkSwarmUsageGovernor(usageGovernor, { activeWorkers: 1 });
const lanePlaybook: FrontierSwarmLanePlaybook = createSwarmLanePlaybook({ lane: 'runtime', successfulBundles: [mergeBundle] });
const patchStackPlan: FrontierSwarmPatchStackPlan = createSwarmPatchStackPlan({ index: mergeIndex });
const adaptiveLoadPlan: FrontierSwarmAdaptiveLoadPlan = createSwarmAdaptiveLoadPlan({
  plan,
  run,
  mergeIndex,
  mode: 'balanced',
  maxLimits: { maxReadyJobs: 4 },
  currentLimits: { maxReadyJobs: 4 },
  observations: [{ kind: 'semantic-empty', jobId: plan.jobs[0].id, lane: plan.jobs[0].lane }]
});
const adaptiveSchedule = createSwarmSchedule(createSwarmScheduleInputFromAdaptiveLoadPlan(plan, adaptiveLoadPlan, { run }));

plan.jobs[0].allowedWrites satisfies string[];
compute.model satisfies string | undefined;
schedule.ready satisfies readonly { jobId: string }[];
leases[0]?.token satisfies string | undefined;
stream.global.eventTypes satisfies string[];
queueSnapshot.summary.jobCount satisfies number;
checkpoint.hash satisfies string;
budget.ok satisfies boolean;
reviewPlan.assignments satisfies readonly { jobId: string }[];
mergePlan.ready satisfies string[];
mergeBundle.queueItemIds satisfies string[];
semanticSummary.semanticSidecars.ownershipRegions satisfies number;
semanticSummary.nativeCompiles.emitted satisfies number;
queueOverlay.entries satisfies readonly { queueItemId: string }[];
mergeIndex.entries satisfies readonly { jobId: string }[];
admission.admitted satisfies string[];
runStoreShards.shards satisfies readonly { path: string }[];
contextPack.files satisfies string[];
contextPack.commands satisfies readonly { command: string }[];
contextPack.oracleCommands satisfies readonly { command: string }[];
contextPack.expectedEvidence satisfies string[];
contextPack.exclusions satisfies string[];
oracleCorpus.artifacts satisfies readonly { id: string }[];
replayBundle.commands satisfies readonly { command: string }[];
parityOracle.comparators satisfies readonly { status: string }[];
divergenceReport.observabilityPoints satisfies readonly { id: string }[];
watchpointPlan.watchpoints satisfies readonly { action: string }[];
debugHandoff.replayBundleIds satisfies string[];
instrumentationBudget.captureKinds satisfies string[];
instrumentationDecision.ok satisfies boolean;
bottleneckReport.classifications satisfies readonly { kind: string }[];
querySwarmEvidenceIndex(evidenceIndex, { topic: 'timing' }).summary.entryCount satisfies number;
querySwarmBlackboard(blackboard, { topic: 'fact' }).summary.entryCount satisfies number;
querySwarmCoordinatorDashboard(coordinatorDashboard, { hasSemanticImport: false }).summary.jobCount satisfies number;
referencePlan.targets satisfies readonly { id: string }[];
referenceResponse.targetResults satisfies readonly { targetId: string }[];
artifactRoutingPlan.routes satisfies readonly { bucket: string }[];
schedulerRecommendations.recommendations satisfies readonly { action: string }[];
fixtureCatalog.fixtures satisfies readonly { id: string }[];
progressModel.byStatus satisfies Record<string, string[]>;
autoReviewReport.findings satisfies readonly { kind: string }[];
rebaseReport.entries satisfies readonly { status: string }[];
usageDecision.ok satisfies boolean;
lanePlaybook.successfulJobIds satisfies string[];
patchStackPlan.stacks satisfies readonly { jobIds: string[] }[];
adaptiveLoadPlan.effectiveLimits.maxReadyJobs satisfies number | undefined;
adaptiveSchedule.ready satisfies readonly { jobId: string }[];
({} as FrontierSwarmArtifactIndex).summary satisfies { artifactCount: number };
