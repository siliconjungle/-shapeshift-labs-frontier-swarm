import {
  createSwarmManifest,
  createSwarmEventStream,
  createSwarmSchedule,
  createSwarmLeases,
  createSwarmQueueSnapshot,
  createSwarmReviewPlan,
  createSwarmMergePlan,
  createSwarmMergeBundle,
  createSwarmRunCheckpoint,
  checkSwarmBudget,
  createSwarmPlan,
  createSwarmRun,
  defineSwarmTasks,
  resolveSwarmCompute,
  type FrontierSwarmArtifactIndex,
  type FrontierSwarmBudgetDecision,
  type FrontierSwarmCompute,
  type FrontierSwarmManifest,
  type FrontierSwarmMergeBundle,
  type FrontierSwarmMergePlan,
  type FrontierSwarmPlan,
  type FrontierSwarmQueueSnapshot,
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
({} as FrontierSwarmArtifactIndex).summary satisfies { artifactCount: number };
