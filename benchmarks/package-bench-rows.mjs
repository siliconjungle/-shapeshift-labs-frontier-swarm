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
  createSwarmPayoffVector,
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
  createSwarmStrategyTournament,
  createSwarmTraceIndex,
  decodeSwarmJsonl,
  defineSwarmTasks,
  encodeSwarmJsonl,
  querySwarmTraceIndex,
  routeSwarmEventToMailboxes,
  resolveSwarmCompute,
  validateSwarmManifest
} from '../dist/index.js';
import {
  makeBenchBundles,
  makeBenchManifest,
  makeBenchTasks,
  makeBenchTraceBundles
} from './package-bench-fixtures.mjs';

export function createPackageBenchRows({ taskCount, measure }) {
  const manifest = createSwarmManifest(makeBenchManifest());
  const tasks = defineSwarmTasks(makeBenchTasks(taskCount));
  let plan = createSwarmPlan(manifest, tasks, { limit: 64 });
  let run = createSwarmRun({ plan });
  let jsonl = encodeSwarmJsonl([plan, run]);
  let cursor = 0;
  let schedule = createSwarmSchedule({ plan, maxReadyJobs: 128 });
  let leases = createSwarmLeases({ schedule, workerId: 'bench-worker', now: 1000, leaseMs: 60000, count: 16 });
  let eventStream = createSwarmEventStream({ runId: 'bench', root: 'agent-runs/bench/streams', lanes: manifest.lanes });
  let bundles = makeBenchBundles(plan, 32);
  let mergeIndex = createSwarmMergeIndex({ bundles });

  return [
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
      bundles = makeBenchBundles(plan, 32);
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
    measure('trace-index-' + taskCount, 16, () => {
      const traceBundles = makeBenchTraceBundles(plan, 24, cursor++);
      const traceIndex = createSwarmTraceIndex({ bundles: traceBundles, generatedAt: 7000 + cursor++ });
      const query = querySwarmTraceIndex(traceIndex, { region: 'region.2', textIncludes: 'benchSymbol' });
      return traceIndex.summary.shardCount + traceIndex.summary.executableOwnershipRegionCount + query.summary.shardCount;
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
    measure('strategy-tournament-' + taskCount, 16, () => createSwarmStrategyTournament({
      strategies: [{ id: 'search' }, { id: 'verify' }, { id: 'review' }],
      games: [{ id: 'merge-admission' }, { id: 'projection-route' }],
      matches: Array.from({ length: 24 }, (_, index) => ({
        payoff: createSwarmPayoffVector({
          strategyId: ['search', 'verify', 'review'][index % 3],
          gameId: index % 2 === 0 ? 'merge-admission' : 'projection-route',
          outcome: index % 5 === 0 ? 'undefined' : index % 3 === 0 ? 'candidate' : 'verified',
          components: {
            correctness: (index % 10) / 10,
            evidence: ((index + 3) % 10) / 10,
            reviewCost: { value: ((index + 5) % 10) / 10, direction: 'minimize', weight: 0.5 }
          },
          search: { attempts: index + 1, durationMs: 1000 + index * 10, tokens: 2000 + index * 100 },
          certificate: { commands: ['npm test'], durationMs: 500 + index }
        })
      })),
      generatedAt: 9000 + cursor++
    }).standings.length),
    measure('event-route-' + taskCount, 64, () => {
      eventStream = createSwarmEventStream({ runId: 'bench', root: 'agent-runs/bench/streams', lanes: manifest.lanes });
      return routeSwarmEventToMailboxes(eventStream, { type: 'agent.evidence', jobId: plan.jobs[cursor++ % plan.jobs.length].id, lane: 'runtime' }).length;
    })
  ];
}
