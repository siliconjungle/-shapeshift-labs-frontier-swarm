import assert from 'node:assert';
import {
  checkSwarmOwnership,
  createSwarmManifest,
  createSwarmPlan,
  createSwarmProof,
  decodeSwarmJsonl,
  defineSwarmTasks,
  encodeSwarmJsonl,
  resolveSwarmCompute,
  validateSwarmManifest
} from '../dist/index.js';

const args = parseArgs(process.argv.slice(2));
const cases = readPositiveInt(args.cases, 300);
let seed = readPositiveInt(args.seed, 0x51a77e);
let checked = 0;

for (let i = 0; i < cases; i += 1) {
  const manifest = createSwarmManifest(makeManifest(i));
  const validation = validateSwarmManifest(manifest);
  assert.strictEqual(validation.valid, true);
  const tasks = defineSwarmTasks(makeTasks(i));
  const plan = createSwarmPlan(manifest, tasks, {
    limit: 1 + nextInt(tasks.length),
    includeCompleted: maybe(),
    selectors: maybe() ? ['task'] : []
  });
  assert.ok(plan.jobs.length <= tasks.length);
  for (const job of plan.jobs) {
    assert.strictEqual(resolveSwarmCompute(manifest, job.task).id, job.compute.id);
    const report = checkSwarmOwnership(job, job.task.targetRefs);
    assert.ok(Array.isArray(report.violations));
  }
  const jsonl = encodeSwarmJsonl([plan, createSwarmProof(plan)]);
  assert.strictEqual(decodeSwarmJsonl(jsonl).length, 2);
  checked += 1;
}

console.log('frontier-swarm fuzz ok: ' + checked + ' cases');

function makeManifest(index) {
  const compute = [
    { id: 'deep', kind: 'codex', model: 'gpt-5.5', reasoningEffort: 'xhigh' },
    { id: 'fast', kind: 'codex', model: 'gpt-5.4-mini', reasoningEffort: 'medium' }
  ];
  return {
    id: 'swarm-' + index,
    compute,
    layers: [
      { id: 'parent', childCompute: { implementation: maybe() ? 'deep' : 'fast', evidence: 'fast' } },
      { id: 'implementation', parentId: 'parent' },
      { id: 'evidence', parentId: 'parent' }
    ],
    lanes: [
      { id: 'runtime', layer: 'implementation', allowedWrites: ['src/runtime/**'], evidencePrefix: 'evidence/runtime/' },
      { id: 'tests', layer: 'evidence', allowedWrites: ['test/**'], evidencePrefix: 'evidence/tests/' }
    ],
    policy: { defaultCompute: 'fast', defaultConcurrency: 2 }
  };
}

function makeTasks(index) {
  const count = 2 + nextInt(12);
  const tasks = [];
  for (let i = 0; i < count; i += 1) {
    const lane = maybe() ? 'runtime' : 'tests';
    tasks.push({
      id: 'task-' + index + '-' + i,
      lane,
      status: maybe() ? 'open' : 'planned',
      priority: nextInt(100),
      targetRefs: [lane === 'runtime' ? `src/runtime/file-${i}.ts` : `test/file-${i}.mjs`],
      acceptance: ['case ' + i + ' passes']
    });
  }
  return tasks;
}

function maybe() {
  return (next() & 1) === 1;
}

function nextInt(max) {
  return next() % Math.max(1, max);
}

function next() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed;
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--cases') out.cases = argv[++i];
    else if (argv[i] === '--seed') out.seed = argv[++i];
  }
  return out;
}

function readPositiveInt(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}
