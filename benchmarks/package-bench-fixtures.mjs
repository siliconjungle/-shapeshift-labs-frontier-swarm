import {
  createSwarmMergeBundle,
  createSwarmTraceShard
} from '../dist/index.js';

export function makeBenchManifest() {
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

export function makeBenchTasks(count) {
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

export function makeBenchBundles(plan, count) {
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

export function makeBenchTraceBundles(plan, count, offset = 0) {
  const bundles = [];
  for (let i = 0; i < Math.min(count, plan.jobs.length); i += 1) {
    const job = plan.jobs[(i + offset) % plan.jobs.length];
    const region = `region.${i % 8}`;
    const traceShard = createSwarmTraceShard({
      jobId: job.id,
      lane: job.lane,
      subject: 'bench-trace',
      rowWindows: [{ start: i * 10, end: i * 10 + 4, rowCount: 5, firstDivergenceAt: i % 5 === 0 ? i * 10 + 2 : undefined, deltaFields: ['state.value'] }],
      hypotheses: [{ sourcePath: job.task.targetRefs[0], symbol: `benchSymbol${i}`, region, confidence: i % 5 === 0 ? 'high' : 'medium' }],
      executableOwnershipRegions: [{
        id: region,
        sourcePath: job.task.targetRefs[0],
        symbol: `benchSymbol${i}`,
        selectors: [`${region}.*`],
        affectedTests: ['node trace-gate.mjs'],
        riskLevel: i % 5 === 0 ? 'medium' : 'low'
      }],
      focusedTests: ['node trace-gate.mjs'],
      referenceEvidence: [{ path: `agent-runs/bench/${job.id}/reference-trace.jsonl`, kind: 'trace' }]
    });
    bundles.push(createSwarmMergeBundle({
      job,
      result: {
        jobId: job.id,
        status: 'verified',
        changedPaths: [job.task.targetRefs[0] ?? `src/runtime/file-${i}.ts`],
        changedRegions: [region],
        verification: [{ status: 0 }]
      },
      patchPath: `agent-runs/bench/${job.id}/changes.patch`,
      traceShards: [traceShard]
    }));
  }
  return bundles;
}
