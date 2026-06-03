import {
  createSwarmManifest,
  createSwarmContextPack,
  createSwarmEventStream,
  createSwarmOracleCorpus,
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
  type FrontierSwarmBudgetDecision,
  type FrontierSwarmCompute,
  type FrontierSwarmContextPack,
  type FrontierSwarmManifest,
  type FrontierSwarmOracleCorpus,
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
  type FrontierSwarmEventStream,
  type FrontierSwarmTask
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
const queueOverlay: FrontierSwarmQueueOverlay = createSwarmQueueOverlay({ bundles: [mergeBundle] });
const mergeIndex: FrontierSwarmMergeIndex = createSwarmMergeIndex({ bundles: [mergeBundle] });
const admission: FrontierSwarmMergeAdmission = createSwarmMergeAdmission({ index: mergeIndex, maxReady: 1 });
const runStoreShards: FrontierSwarmRunStoreShards = createSwarmRunStoreShards({ plan });
const contextPack: FrontierSwarmContextPack = createSwarmContextPack({ job: plan.jobs[0] });
const oracleCorpus: FrontierSwarmOracleCorpus = createSwarmOracleCorpus({ artifacts: [{ id: 'oracle', path: 'oracle.json' }] });
const lanePlaybook: FrontierSwarmLanePlaybook = createSwarmLanePlaybook({ lane: 'runtime', successfulBundles: [mergeBundle] });
const patchStackPlan: FrontierSwarmPatchStackPlan = createSwarmPatchStackPlan({ index: mergeIndex });

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
lanePlaybook.successfulJobIds satisfies string[];
patchStackPlan.stacks satisfies readonly { jobIds: string[] }[];
({} as FrontierSwarmArtifactIndex).summary satisfies { artifactCount: number };
