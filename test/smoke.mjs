import assert from 'node:assert';
import {
  FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID,
  checkSwarmOwnership,
  completeSwarmJob,
  compileSwarm,
  createSwarmManifest,
  createSwarmPlan,
  createSwarmProof,
  createSwarmRun,
  decodeSwarmJsonl,
  defineSwarmManifest,
  defineSwarmTasks,
  encodeSwarmJsonl,
  matchesGlob,
  recordSwarmEvent,
  resolveSwarmCompute,
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
      evidencePrefix: 'inkwell/.frontier/evidence/runtime/',
      worktreePath: '../json-diff-inkwell-runtime',
      handoffCommands: [{ name: 'lint', command: 'npm', args: ['run', 'inkwell:lint'] }]
    },
    {
      id: 'harness',
      layer: 'evidence',
      allowedWrites: ['inkwell/e2e.mjs'],
      evidencePrefix: 'inkwell/.frontier/evidence/harness/'
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
assert.strictEqual(plan.summary.jobCount, 1);

const allPlan = createSwarmPlan(manifest, tasks, { includeCompleted: true });
assert.strictEqual(allPlan.jobs.length, 3);
assert.strictEqual(createSwarmPlan(manifest, tasks).jobs.length, 2);

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
