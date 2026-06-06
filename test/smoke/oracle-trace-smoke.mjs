import assert from 'node:assert';
import {
  checkSwarmInstrumentationBudget,
  querySwarmEvidenceIndex,
  querySwarmTraceIndex
} from './api.mjs';
import {
  bottleneckReport,
  debugHandoff,
  divergenceReport,
  evidenceIndex,
  instrumentationBudget,
  parityOracle,
  replayBundle,
  traceIndex,
  traceShard,
  tracedRegionBundle,
  watchpointPlan
} from './fixtures/oracle.mjs';
import { regionBundleA } from './fixtures/merge.mjs';

assert.strictEqual(replayBundle.summary.commandCount, 1);
assert.strictEqual(replayBundle.seeds[0].kind, 'seed');
assert.strictEqual(parityOracle.status, 'failed');
assert.strictEqual(parityOracle.summary.failedCount, 1);
assert.strictEqual(divergenceReport.operationIndex, 42);
assert.strictEqual(divergenceReport.divergesAt, '/ok');
assert.strictEqual(watchpointPlan.watchpoints[0].action, 'break');
assert.strictEqual(debugHandoff.status, 'ready');
assert.strictEqual(debugHandoff.comparisons[0].path, '/ok');
assert.strictEqual(checkSwarmInstrumentationBudget(instrumentationBudget, { events: 11, captureKinds: ['trace'] }).ok, false);
assert.strictEqual(bottleneckReport.classifications[0].kind, 'instrumentation-overhead');
assert.strictEqual(querySwarmEvidenceIndex(evidenceIndex, { pathIncludes: 'trace' }).summary.entryCount, 1);
assert.strictEqual(querySwarmEvidenceIndex(evidenceIndex, { topic: 'apu-port-timing', minConfidence: 0.8 }).summary.entryCount, 1);
assert.strictEqual(traceShard.summary.hasDivergence, true);
assert.strictEqual(traceShard.summary.executableOwnershipRegionCount, 1);
assert.strictEqual(tracedRegionBundle.traceShards[0].jobId, regionBundleA.jobId);
assert.strictEqual(traceIndex.summary.shardCount, 1);
assert.strictEqual(traceIndex.byRegion['content.docs'].length, 1);
assert.strictEqual(querySwarmTraceIndex(traceIndex, { region: 'content.docs', minConfidence: 0.9 }).summary.shardCount, 1);
assert.strictEqual(querySwarmTraceIndex(traceIndex, { textIncludes: 'computeRuntimeState' }).summary.hypothesisCount, 1);
