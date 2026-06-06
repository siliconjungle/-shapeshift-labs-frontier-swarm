import {
  createSwarmBottleneckReport,
  createSwarmDebugHandoff,
  createSwarmDivergenceReport,
  createSwarmEvidenceIndex,
  createSwarmInstrumentationBudget,
  createSwarmMergeBundle,
  createSwarmParityOracle,
  createSwarmReplayBundle,
  createSwarmRun,
  createSwarmTraceIndex,
  createSwarmTraceShard,
  createSwarmWatchpointPlan
} from '../api.mjs';
import { plan } from './manifest.mjs';
import { regionBundleA } from './merge.mjs';
import { scalePlan } from './scale.mjs';

export const replayBundle = createSwarmReplayBundle({
  id: 'replay-api-divergence',
  subject: 'library-port',
  commands: [{ name: 'replay', command: 'node', args: ['replay.mjs'] }],
  inputs: [{ path: 'fixtures/request.json', kind: 'fixture' }],
  artifacts: [{ path: 'agent-runs/replay/trace.jsonl', kind: 'trace' }],
  sourceRefs: ['legacy/runtime.js'],
  seeds: ['case-42'],
  expectedEvidence: ['trace.jsonl'],
  generatedAt: 7200
});
export const parityOracle = createSwarmParityOracle({
  id: 'parity-library-port',
  subject: 'library-port',
  referenceCommands: ['node legacy.mjs'],
  testCommands: ['node candidate.mjs'],
  comparators: [
    { id: 'state-match', status: 'failed', expected: { ok: true }, actual: { ok: false }, path: '/ok', operationIndex: 42 }
  ],
  replayBundleIds: [replayBundle.id],
  generatedAt: 7300
});
export const divergenceReport = createSwarmDivergenceReport({
  id: 'divergence-state',
  subject: 'library-port',
  observabilityPoints: [
    { id: 'point-late', operationIndex: 50, path: '/ok', after: false },
    { id: 'point-early', operationIndex: 42, path: '/ok', before: true, after: false }
  ],
  expected: true,
  actual: false,
  traceRefs: [{ path: 'agent-runs/replay/trace.jsonl' }],
  replayBundleIds: [replayBundle.id],
  generatedAt: 7400
});
export const watchpointPlan = createSwarmWatchpointPlan({
  subject: 'library-port',
  watchpoints: [{ path: '/ok', operator: 'changes', action: 'break' }],
  commands: ['node inspect.mjs'],
  replayBundleIds: [replayBundle.id],
  divergenceReportIds: [divergenceReport.id],
  generatedAt: 7500
});
export const debugHandoff = createSwarmDebugHandoff({
  subject: 'library-port',
  focus: divergenceReport.observabilityPoints[0],
  replayBundleIds: [replayBundle.id],
  divergenceReportIds: [divergenceReport.id],
  watchpointPlanIds: [watchpointPlan.id],
  files: [{ path: 'src/runtime.ts', kind: 'source' }],
  comparisons: parityOracle.comparators,
  generatedAt: 7600
});
export const instrumentationBudget = createSwarmInstrumentationBudget({
  id: 'browser-evidence-budget',
  lane: 'harness',
  maxEvents: 10,
  maxBytes: 1024,
  maxOverheadRatio: 0.2,
  captureKinds: ['trace', 'log'],
  generatedAt: 7700
});
export const bottleneckReport = createSwarmBottleneckReport({
  sources: [{
    jobId: 'debug-job',
    text: 'trace logging overhead made the harness slow',
    evidencePaths: ['agent-runs/debug/evidence.json'],
    changedPaths: ['src/runtime.ts']
  }],
  generatedAt: 7800
});
export const evidenceRun = createSwarmRun({
  plan,
  results: [{
    jobId: plan.jobs[0].id,
    status: 'verified',
    evidencePaths: ['agent-runs/runtime/evidence.json', 'agent-runs/runtime/trace.jsonl'],
    queueItemIds: ['runtime-action-parity']
  }]
});
export const evidenceIndex = createSwarmEvidenceIndex({
  run: evidenceRun,
  entries: [{ topic: 'apu-port-timing', path: 'agent-runs/runtime/notes.md', tags: ['timing'], confidence: 0.9 }],
  generatedAt: 7900
});
export const traceShard = createSwarmTraceShard({
  jobId: regionBundleA.jobId,
  lane: regionBundleA.lane,
  subject: 'library-port',
  divergence: divergenceReport,
  rowWindows: [{ start: 40, end: 44, rowCount: 5, firstDivergenceAt: 42, deltaFields: ['state.ok'] }],
  hypotheses: [{
    sourcePath: 'src/hot/runtime-website-content.ts',
    line: 12,
    symbol: 'computeRuntimeState',
    region: 'content.docs',
    confidence: 'high',
    reason: 'trace diverges immediately after docs state projection'
  }],
  executableOwnershipRegions: [{
    id: 'content.docs',
    sourcePath: 'src/hot/runtime-website-content.ts',
    symbol: 'computeRuntimeState',
    selectors: ['content.docs.*'],
    affectedTests: ['node parity.mjs --selector content.docs'],
    conflictingAssumptions: ['runtime state projection is synchronous'],
    riskLevel: 'medium'
  }],
  focusedTests: [{ command: 'node', args: ['parity.mjs', '--selector', 'content.docs'] }],
  referenceEvidence: [{ path: 'agent-runs/replay/reference-trace.jsonl', kind: 'trace' }],
  generatedAt: 7910
});
export const tracedRegionBundle = createSwarmMergeBundle({
  job: scalePlan.jobs[2],
  result: {
    jobId: scalePlan.jobs[2].id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/a/changes.patch',
  riskLevel: 'low',
  traceShards: [traceShard]
});
export const traceIndex = createSwarmTraceIndex({ bundles: [tracedRegionBundle], generatedAt: 7920 });
