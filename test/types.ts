import {
  createSwarmManifest,
  createSwarmPlan,
  defineSwarmTasks,
  resolveSwarmCompute,
  type FrontierSwarmCompute,
  type FrontierSwarmManifest,
  type FrontierSwarmPlan,
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

plan.jobs[0].allowedWrites satisfies string[];
compute.model satisfies string | undefined;
