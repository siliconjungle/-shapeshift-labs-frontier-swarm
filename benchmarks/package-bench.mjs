import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import {
  checkSwarmOwnership,
  createSwarmManifest,
  createSwarmPlan,
  createSwarmProof,
  createSwarmRun,
  decodeSwarmJsonl,
  defineSwarmTasks,
  encodeSwarmJsonl,
  resolveSwarmCompute,
  validateSwarmManifest
} from '../dist/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(__dirname, '..');
const repoRoot = path.basename(path.dirname(packageDir)) === 'packages'
  ? path.resolve(packageDir, '..', '..')
  : packageDir;
const args = parseArgs(process.argv.slice(2));
const taskCount = readPositiveInt(args.tasks, 1000);
const rounds = readPositiveInt(args.rounds, 30);
const outPath = args.out ? path.resolve(repoRoot, args.out) : null;

const manifest = createSwarmManifest(makeManifest());
const tasks = defineSwarmTasks(makeTasks(taskCount));
let plan = createSwarmPlan(manifest, tasks, { limit: 64 });
let run = createSwarmRun({ plan });
let jsonl = encodeSwarmJsonl([plan, run]);
let cursor = 0;

const rows = [
  measure('create-plan-' + taskCount, 8, () => {
    plan = createSwarmPlan(manifest, tasks, { limit: 64, selectors: ['task'] });
    return plan.jobs.length;
  }),
  measure('validate-manifest', 32, () => validateSwarmManifest(manifest).issues.length),
  measure('resolve-compute-' + taskCount, 64, () => resolveSwarmCompute(manifest, tasks[cursor++ % tasks.length]).id.length),
  measure('ownership-check-' + taskCount, 64, () => checkSwarmOwnership(plan.jobs[cursor++ % plan.jobs.length], ['src/runtime/file.ts']).violations.length),
  measure('create-run-' + taskCount, 16, () => {
    run = createSwarmRun({ plan });
    return run.jobs.length;
  }),
  measure('jsonl-encode', 16, () => {
    jsonl = encodeSwarmJsonl([plan, run]);
    return jsonl.length;
  }),
  measure('jsonl-decode', 16, () => decodeSwarmJsonl(jsonl).length),
  measure('proof', 16, () => createSwarmProof(plan).hash.length)
];

const report = {
  package: '@shapeshift-labs/frontier-swarm',
  version: readPackageVersion(),
  generatedAt: new Date().toISOString(),
  node: process.version,
  platform: process.platform + ' ' + process.arch,
  taskCount,
  rounds,
  rows
};

if (outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
}

console.log(report.package + ' package benchmark');
console.log('Node ' + report.node + ' on ' + report.platform + ', tasks=' + taskCount + ', rounds=' + rounds);
console.log('These are Frontier-only package measurements, not competitor comparisons.');
console.log('');
console.log(padRight('Fixture', 30) + padLeft('Median', 12) + padLeft('p95', 12));
for (const row of rows) {
  console.log(padRight(row.fixture, 30) + padLeft(formatUs(row.medianUs), 12) + padLeft(formatUs(row.p95Us), 12));
}
if (outPath) console.log('\nwrote ' + path.relative(repoRoot, outPath));

function makeManifest() {
  return {
    compute: [
      { id: 'deep', kind: 'codex', model: 'gpt-5.5', reasoningEffort: 'xhigh' },
      { id: 'fast', kind: 'codex', model: 'gpt-5.4-mini', reasoningEffort: 'medium' }
    ],
    layers: [
      { id: 'parent', childCompute: { implementation: 'deep', evidence: 'fast' } },
      { id: 'implementation', parentId: 'parent' },
      { id: 'evidence', parentId: 'parent' }
    ],
    lanes: [
      { id: 'runtime', layer: 'implementation', allowedWrites: ['src/runtime/**'], evidencePrefix: 'evidence/runtime/' },
      { id: 'tests', layer: 'evidence', allowedWrites: ['test/**'], evidencePrefix: 'evidence/tests/' }
    ],
    policy: { defaultCompute: 'fast' }
  };
}

function makeTasks(count) {
  const tasks = [];
  for (let i = 0; i < count; i += 1) {
    const lane = i % 3 === 0 ? 'tests' : 'runtime';
    tasks.push({
      id: 'task-' + i,
      lane,
      priority: i % 100,
      targetRefs: [lane === 'tests' ? `test/file-${i}.mjs` : `src/runtime/file-${i}.ts`],
      acceptance: ['task ' + i + ' passes']
    });
  }
  return tasks;
}

function measure(fixture, operationsPerRound, fn) {
  const samples = [];
  let checksum = 0;
  for (let round = 0; round < rounds; round += 1) {
    const start = performance.now();
    for (let op = 0; op < operationsPerRound; op += 1) checksum += Number(fn()) || 0;
    const elapsed = performance.now() - start;
    samples.push((elapsed * 1000) / operationsPerRound);
  }
  samples.sort((a, b) => a - b);
  return {
    fixture,
    operationsPerRound,
    medianUs: percentile(samples, 0.5),
    p95Us: percentile(samples, 0.95),
    checksum
  };
}

function percentile(sorted, pct) {
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * pct))];
}

function formatUs(value) {
  if (value >= 1000) return (value / 1000).toFixed(2) + 'ms';
  return value.toFixed(2) + 'us';
}

function padRight(value, size) {
  return String(value).padEnd(size);
}

function padLeft(value, size) {
  return String(value).padStart(size);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--out') out.out = argv[++i];
    else if (argv[i] === '--tasks') out.tasks = argv[++i];
    else if (argv[i] === '--rounds') out.rounds = argv[++i];
  }
  return out;
}

function readPositiveInt(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function readPackageVersion() {
  return JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8')).version;
}
