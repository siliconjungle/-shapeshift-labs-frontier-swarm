import assert from 'node:assert';
import {
  FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID,
  checkSwarmOwnership,
  completeSwarmJob,
  compileSwarm,
  createSwarmEventStream,
  createSwarmManifest,
  createSwarmPlan,
  createSwarmProof,
  createSwarmRun,
  createSwarmTaskSelection,
  decodeSwarmJsonl,
  encodeSwarmJsonl,
  matchesGlob,
  recordSwarmEvent,
  resolveSwarmChangedRegions,
  resolveSwarmCompute,
  routeSwarmEventToMailboxes,
  validateSwarmManifest
} from './api.mjs';
import { manifest, plan, tasks } from './fixtures/manifest.mjs';

assert.strictEqual(createSwarmManifest().compute[0].id, FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID);
assert.strictEqual(validateSwarmManifest(manifest).valid, true);
assert.strictEqual(compileSwarm(manifest).lanesById.get('runtime').layer, 'implementation');
assert.strictEqual(resolveSwarmCompute(manifest, tasks[0]).id, 'deep');
assert.strictEqual(resolveSwarmCompute(manifest, tasks[1]).id, 'fast');
assert.strictEqual(plan.jobs.length, 1);
assert.strictEqual(plan.jobs[0].compute.id, 'deep');
assert.strictEqual(plan.jobs[0].verification[0].command, 'node');
assert.ok(plan.jobs[0].allowedWrites.includes('inkwell/.frontier/evidence/runtime/runtime-action-parity/**'));
assert.ok(plan.jobs[0].ownedRegions.includes('runtime.actions'));
assert.deepStrictEqual(resolveSwarmChangedRegions(plan.jobs[0], ['inkwell/apps/web/src/runtime/runtime.ts']), ['runtime.actions']);
assert.strictEqual(plan.summary.jobCount, 1);

const selection = createSwarmTaskSelection(manifest, tasks, {
  workKinds: ['agent-task'],
  selectors: ['runtime'],
  limit: 2,
  assignSelectionPriority: true,
  priority: { statuses: { open: 0 }, workKinds: { 'agent-task': 0 } }
});
assert.strictEqual(selection.entries.length, 1);
assert.strictEqual(selection.tasks[0].priority, 0);
assert.deepStrictEqual(selection.summary.byLane, { runtime: 1 });

const warningSelection = createSwarmTaskSelection(manifest, [{
  id: 'off-lane',
  lane: 'runtime',
  targetRefs: ['inkwell/apps/web/src/components/off-lane.tsx']
}], { includeOwnershipWarnings: true });
assert.strictEqual(warningSelection.entries.length, 1);
assert.strictEqual(warningSelection.summary.ownershipWarningCount, 1);
assert.strictEqual(createSwarmTaskSelection(manifest, warningSelection.tasks).entries.length, 0);

const spreadSelection = createSwarmTaskSelection(manifest, [
  { id: 'runtime-a', lane: 'runtime', targetRefs: ['inkwell/apps/web/src/runtime/a.ts'] },
  { id: 'runtime-b', lane: 'runtime', targetRefs: ['inkwell/apps/web/src/runtime/b.ts'] },
  { id: 'harness-a', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] },
  { id: 'harness-b', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] }
], { spreadLanes: true, limit: 4 });
assert.deepStrictEqual(spreadSelection.entries.map((entry) => entry.task.id), ['harness-a', 'runtime-a', 'harness-b', 'runtime-b']);

const stream = createSwarmEventStream({ runId: 'run-1', root: 'agent-runs/run-1/streams', lanes: manifest.lanes });
assert.strictEqual(stream.summary.mailboxCount, 3);
assert.strictEqual(stream.lanes.runtime.path, 'agent-runs/run-1/streams/lanes/runtime.jsonl');
assert.deepStrictEqual(
  routeSwarmEventToMailboxes(stream, { type: 'agent.evidence', lane: 'runtime' }).map((mailbox) => mailbox.scope),
  ['global', 'lane']
);

const browserPlan = createSwarmPlan(manifest, [{
  id: 'browser-smoke',
  lane: 'harness',
  targetRefs: ['inkwell/e2e.mjs'],
  capabilities: ['dom.assertions']
}], { includeCompleted: true });
assert.strictEqual(browserPlan.limits.maxLaneConcurrency.harness, 1);
assert.ok(browserPlan.jobs[0].capabilities.includes('browser.playwright'));
assert.ok(browserPlan.jobs[0].capabilities.includes('dom.assertions'));
assert.deepStrictEqual(browserPlan.jobs[0].resourceRequirements.browser.portPool, ['4177', '4178']);

const allPlan = createSwarmPlan(manifest, tasks, { includeCompleted: true });
assert.strictEqual(allPlan.jobs.length, 3);
assert.strictEqual(createSwarmPlan(manifest, tasks).jobs.length, 2);
assert.deepStrictEqual(createSwarmPlan(manifest, [{
  id: 'child-task',
  lane: 'runtime',
  dependsOn: ['missing-parent'],
  targetRefs: ['inkwell/apps/web/src/runtime/child.ts']
}]).validation.issues.map((issue) => issue.code), ['missing-job-dependency', 'missing-task-dependency']);

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
