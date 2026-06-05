import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import {
  checkSwarmOwnership,
  createSwarmAdaptiveLoadPlan,
  createSwarmContextPack,
  createSwarmHotspotReport,
  createSwarmLanePlaybook,
  createSwarmMergeAdmission,
  createSwarmManifest,
  createSwarmEventStream,
  createSwarmLeases,
  createSwarmMergeBundle,
  createSwarmMergeIndex,
  createSwarmOracleCorpus,
  createSwarmPatchStackPlan,
  createSwarmReplayBundle,
  createSwarmParityOracle,
  createSwarmDivergenceReport,
  createSwarmWatchpointPlan,
  createSwarmDebugHandoff,
  createSwarmEvidenceIndex,
  createSwarmBlackboard,
  createSwarmBottleneckReport,
  createSwarmFixtureCatalog,
  createSwarmProgressModel,
  createSwarmPlan,
  createSwarmProof,
  createSwarmQueueOverlay,
  createSwarmQueueSnapshot,
  createSwarmRun,
  createSwarmRunCheckpoint,
  createSwarmSchedule,
  decodeSwarmJsonl,
  defineSwarmTasks,
  encodeSwarmJsonl,
  routeSwarmEventToMailboxes,
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
let schedule = createSwarmSchedule({ plan, maxReadyJobs: 128 });
let leases = createSwarmLeases({ schedule, workerId: 'bench-worker', now: 1000, leaseMs: 60000, count: 16 });
let eventStream = createSwarmEventStream({ runId: 'bench', root: 'agent-runs/bench/streams', lanes: manifest.lanes });
let bundles = makeBundles(plan, 32);
let mergeIndex = createSwarmMergeIndex({ bundles });

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
  measure('proof', 16, () => createSwarmProof(plan).hash.length),
  measure('schedule-lease-' + taskCount, 8, () => {
    schedule = createSwarmSchedule({ plan, maxReadyJobs: 128, maxComputeConcurrency: { fast: 64, deep: 32 } });
    leases = createSwarmLeases({ schedule, workerId: 'bench-worker', now: 1000 + cursor++, leaseMs: 60000, count: 16 });
    return schedule.ready.length + leases.length;
  }),
  measure('adaptive-load-' + taskCount, 8, () => createSwarmAdaptiveLoadPlan({
    plan,
    schedule,
    mode: 'balanced',
    maxLimits: { maxReadyJobs: 128 },
    currentLimits: { maxReadyJobs: 64 },
    observations: [
      { kind: 'semantic-empty', jobId: plan.jobs[cursor % plan.jobs.length].id, lane: plan.jobs[cursor % plan.jobs.length].lane },
      { kind: 'log-noise', lane: 'runtime', value: 200000 }
    ],
    generatedAt: 1500 + cursor++
  }).summary.decisionCount),
  measure('queue-snapshot-' + taskCount, 8, () => {
    const snapshot = createSwarmQueueSnapshot({ plan, run, leases, generatedAt: 2000 + cursor++ });
    return snapshot.summary.jobCount + snapshot.summary.leaseCount;
  }),
  measure('run-checkpoint-' + taskCount, 16, () => createSwarmRunCheckpoint({ run, sequence: cursor++ }).hash.length),
  measure('merge-bundle-' + taskCount, 32, () => createSwarmMergeBundle({
    job: plan.jobs[cursor % plan.jobs.length],
    result: {
      jobId: plan.jobs[cursor++ % plan.jobs.length].id,
      status: 'completed',
      changedPaths: ['src/runtime/file.ts'],
      verification: [{ status: 0 }]
    },
    patchPath: 'agent-runs/bench/changes.patch'
  }).id.length),
  measure('queue-overlay-' + taskCount, 16, () => createSwarmQueueOverlay({ bundles, generatedAt: 3000 + cursor++ }).summary.entryCount),
  measure('merge-index-' + taskCount, 8, () => {
    bundles = makeBundles(plan, 32);
    mergeIndex = createSwarmMergeIndex({ bundles, generatedAt: 4000 + cursor++ });
    return mergeIndex.summary.entryCount + mergeIndex.summary.conflictCount;
  }),
  measure('merge-admission-' + taskCount, 16, () => createSwarmMergeAdmission({ index: mergeIndex, maxReady: 8, maxChangedPaths: 16 }).summary.admittedCount),
  measure('hotspot-report-' + taskCount, 16, () => createSwarmHotspotReport({ bundles, threshold: 3 }).summary.recommendationCount),
  measure('context-pack-' + taskCount, 32, () => createSwarmContextPack({
    job: plan.jobs[cursor % plan.jobs.length],
    files: ['src/runtime/file.ts', 'test/runtime-smoke.mjs'],
    apiMap: {
      runtime: ['createRuntime', 'stepRuntime'],
      tests: ['runtime smoke gate']
    },
    knownFailures: ['shared renderer gate is noisy on old snapshots'],
    oracleCommands: [{ name: 'focused-gate', command: 'npm', args: ['test'], required: true }],
    evidenceSchema: { type: 'object', required: ['ok', 'commands'] },
    avoidInvestigating: ['unrelated route snapshots'],
    playbookIds: ['runtime-playbook']
  }).files.length),
  measure('oracle-corpus-' + taskCount, 32, () => createSwarmOracleCorpus({
    artifacts: [
      { id: 'trace-runtime', path: 'oracles/runtime-trace.jsonl', kind: 'trace', tags: ['runtime', 'reference'], hash: 'fnv1a32:trace' },
      { id: 'snapshot-routing', path: 'oracles/routing-snapshot.json', kind: 'snapshot', tags: ['routing', 'reference'] }
    ]
  }).summary.artifactCount),
  measure('replay-debug-evidence-' + taskCount, 16, () => {
    const replay = createSwarmReplayBundle({
      commands: ['node replay.mjs'],
      artifacts: [{ path: 'agent-runs/bench/trace.jsonl', kind: 'trace' }],
      expectedEvidence: ['trace.jsonl']
    });
    const parity = createSwarmParityOracle({
      comparators: [{ status: 'failed', expected: 1, actual: 2, operationIndex: cursor++ }]
    });
    const divergence = createSwarmDivergenceReport({
      replayBundleIds: [replay.id],
      observabilityPoints: [{ operationIndex: cursor, path: '/value' }],
      expected: 1,
      actual: 2
    });
    const watch = createSwarmWatchpointPlan({ watchpoints: [{ path: '/value', operator: 'changes' }] });
    const handoff = createSwarmDebugHandoff({
      replayBundleIds: [replay.id],
      divergenceReportIds: [divergence.id],
      watchpointPlanIds: [watch.id],
      comparisons: parity.comparators
    });
    const evidence = createSwarmEvidenceIndex({ entries: [{ topic: 'bench', path: 'agent-runs/bench/evidence.json' }] });
    const blackboard = createSwarmBlackboard({ entries: [{ topic: 'bench', text: 'divergence found', sourceIds: [divergence.id] }] });
    const bottleneck = createSwarmBottleneckReport({ sources: [{ text: 'merge review bottleneck', changedPaths: ['src/runtime.ts'] }] });
    const fixtures = createSwarmFixtureCatalog({ fixtures: [{ id: 'logged-in', tags: ['auth'] }] });
    const progress = createSwarmProgressModel({ items: [{ id: 'bench', status: 'accepted' }] });
    return handoff.commands.length + evidence.summary.entryCount + blackboard.summary.entryCount + bottleneck.summary.kindCount + fixtures.summary.fixtureCount + progress.summary.acceptedCount;
  }),
  measure('lane-playbook-' + taskCount, 16, () => createSwarmLanePlaybook({
    lane: 'runtime',
    successfulBundles: bundles,
    notes: ['prefer narrow patches with focused evidence'],
    commands: [{ name: 'runtime-smoke', command: 'npm', args: ['test'], required: true }],
    avoidInvestigating: ['generated fixtures unless task owns them'],
    evidencePatterns: ['evidence.json', 'commands.md']
  }).successfulJobIds.length),
  measure('patch-stack-plan-' + taskCount, 16, () => createSwarmPatchStackPlan({
    index: mergeIndex,
    maxStackSize: 8
  }).summary.stackCount),
  measure('event-route-' + taskCount, 64, () => {
    eventStream = createSwarmEventStream({ runId: 'bench', root: 'agent-runs/bench/streams', lanes: manifest.lanes });
    return routeSwarmEventToMailboxes(eventStream, { type: 'agent.evidence', jobId: plan.jobs[cursor++ % plan.jobs.length].id, lane: 'runtime' }).length;
  })
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

function makeBundles(plan, count) {
  const bundles = [];
  for (let i = 0; i < Math.min(count, plan.jobs.length); i += 1) {
    const job = plan.jobs[i];
    bundles.push(createSwarmMergeBundle({
      job,
      result: {
        jobId: job.id,
        status: 'verified',
        changedPaths: [job.task.targetRefs[0] ?? `src/runtime/file-${i}.ts`],
        changedRegions: i % 2 === 0 ? [`region.${i}`] : [],
        verification: [{ status: 0 }]
      },
      patchPath: `agent-runs/bench/${job.id}/changes.patch`
    }));
  }
  return bundles;
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
