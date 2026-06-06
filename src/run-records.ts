import { cloneJsonValue, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import {
  FRONTIER_SWARM_EVENT_STREAM_KIND,
  FRONTIER_SWARM_EVENT_STREAM_VERSION,
  FRONTIER_SWARM_MAILBOX_KIND,
  FRONTIER_SWARM_MAILBOX_VERSION,
  FRONTIER_SWARM_RUN_KIND,
  FRONTIER_SWARM_RUN_VERSION
} from './constants.js';
import { joinPathParts, readLaneId } from './coercion.js';
import { normalizeEvent, normalizeResult } from './run-normalization.js';
import type {
  FrontierSwarmEvent,
  FrontierSwarmEventInput,
  FrontierSwarmEventStream,
  FrontierSwarmEventStreamInput,
  FrontierSwarmJob,
  FrontierSwarmJobResult,
  FrontierSwarmJobResultInput,
  FrontierSwarmMailbox,
  FrontierSwarmMailboxInput,
  FrontierSwarmRun,
  FrontierSwarmRunInput,
  FrontierSwarmSummary
} from './index.js';

const DEFAULT_SWARM_EVENT_TYPES = [
  'swarm.started',
  'swarm.finished',
  'agent.scheduled',
  'agent.finished',
  'agent.handoff',
  'agent.blocked',
  'agent.ownership-request',
  'agent.evidence',
  'review.requested',
  'review.completed',
  'merge.proposed'
];

export function createSwarmRun(input: FrontierSwarmRunInput): FrontierSwarmRun {
  const results = (input.results ?? []).map(normalizeResult);
  const events = (input.events ?? []).map((event) => normalizeEvent({ ...event, runId: event.runId ?? input.id ?? input.plan.runId }));
  const run: FrontierSwarmRun = {
    kind: FRONTIER_SWARM_RUN_KIND,
    version: FRONTIER_SWARM_RUN_VERSION,
    id: input.id ?? input.plan.runId,
    planId: input.plan.id,
    manifestId: input.plan.manifestId,
    startedAt: input.startedAt ?? Date.now(),
    status: input.status ?? 'planned',
    jobs: input.plan.jobs.map((job) => cloneJsonValue(job) as FrontierSwarmJob),
    events,
    results,
    summary: summarizeRun(input.plan.jobs, results),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
  return run;
}

export function recordSwarmEvent(runInput: FrontierSwarmRun, eventInput: FrontierSwarmEventInput): FrontierSwarmRun {
  const run = cloneJsonValue(runInput) as FrontierSwarmRun;
  run.events = run.events.concat(normalizeEvent({ ...eventInput, runId: eventInput.runId ?? run.id }));
  return run;
}

export function createSwarmMailbox(input: FrontierSwarmMailboxInput = {}): FrontierSwarmMailbox {
  const scope = input.scope ?? (input.lane ? 'lane' : input.jobId ? 'job' : 'global');
  const eventTypes = uniqueStrings(input.eventTypes ?? DEFAULT_SWARM_EVENT_TYPES);
  return {
    kind: FRONTIER_SWARM_MAILBOX_KIND,
    version: FRONTIER_SWARM_MAILBOX_VERSION,
    id: input.id ?? 'swarm-mailbox:' + stableHash([input.runId, scope, input.lane, input.jobId, input.path, eventTypes]),
    ...(input.runId ? { runId: input.runId } : {}),
    scope,
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.path ? { path: input.path } : {}),
    eventTypes,
    appendOnly: input.appendOnly ?? true,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmEventStream(input: FrontierSwarmEventStreamInput = {}): FrontierSwarmEventStream {
  const laneIds = uniqueStrings((input.lanes ?? []).map(readLaneId));
  const eventTypes = uniqueStrings(input.eventTypes ?? DEFAULT_SWARM_EVENT_TYPES);
  const appendOnly = input.appendOnly ?? true;
  const global = createSwarmMailbox({
    runId: input.runId,
    scope: 'global',
    path: input.root ? joinPathParts(input.root, 'global.jsonl') : undefined,
    eventTypes,
    appendOnly
  });
  const lanes = Object.fromEntries(laneIds.map((lane) => [lane, createSwarmMailbox({
    runId: input.runId,
    scope: 'lane',
    lane,
    path: input.root ? joinPathParts(input.root, 'lanes', `${lane}.jsonl`) : undefined,
    eventTypes,
    appendOnly
  })]));
  return {
    kind: FRONTIER_SWARM_EVENT_STREAM_KIND,
    version: FRONTIER_SWARM_EVENT_STREAM_VERSION,
    id: input.id ?? 'swarm-event-stream:' + stableHash([input.runId, input.root, laneIds, eventTypes]),
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.root ? { root: input.root } : {}),
    appendOnly,
    global,
    lanes,
    eventTypes,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {}),
    summary: {
      mailboxCount: 1 + laneIds.length,
      laneCount: laneIds.length,
      eventTypeCount: eventTypes.length
    }
  };
}

export function routeSwarmEventToMailboxes(
  stream: FrontierSwarmEventStream,
  eventInput: FrontierSwarmEvent | FrontierSwarmEventInput
): FrontierSwarmMailbox[] {
  const event = isSwarmEvent(eventInput) ? eventInput : normalizeEvent(eventInput);
  const mailboxes = [stream.global];
  if (event.lane && stream.lanes[event.lane]) mailboxes.push(stream.lanes[event.lane]);
  return mailboxes;
}

export function completeSwarmJob(runInput: FrontierSwarmRun, resultInput: FrontierSwarmJobResultInput): FrontierSwarmRun {
  const run = cloneJsonValue(runInput) as FrontierSwarmRun;
  const result = normalizeResult(resultInput);
  const resultIndex = run.results.findIndex((entry) => entry.jobId === result.jobId);
  if (resultIndex >= 0) run.results[resultIndex] = result;
  else run.results.push(result);
  run.jobs = run.jobs.map((job) => job.id === result.jobId ? { ...job, status: result.status } : job);
  run.summary = summarizeRun(run.jobs, run.results);
  if (run.results.length >= run.jobs.length && run.summary.failedCount === 0 && run.summary.blockedCount === 0) {
    run.status = 'completed';
    run.finishedAt = result.finishedAt ?? Date.now();
  } else if (run.summary.failedCount && run.summary.failedCount > 0) {
    run.status = 'failed';
  }
  return run;
}

function summarizeJobs(jobs: readonly FrontierSwarmJob[]): FrontierSwarmSummary {
  return {
    computeCount: new Set(jobs.map((job) => job.compute.id)).size,
    layerCount: new Set(jobs.map((job) => job.layer).filter((layer): layer is string => !!layer)).size,
    laneCount: new Set(jobs.map((job) => job.lane)).size,
    taskCount: jobs.length,
    jobCount: jobs.length,
    ownershipViolationCount: jobs.reduce((total, job) => total + job.ownershipWarnings.length, 0)
  };
}

function summarizeRun(jobs: readonly FrontierSwarmJob[], results: readonly FrontierSwarmJobResult[]): FrontierSwarmSummary {
  const ownershipViolationCount = results.reduce((total, result) => total + result.ownershipViolations.length, 0);
  return {
    ...summarizeJobs(jobs),
    completedCount: results.filter((result) => result.status === 'completed' || result.status === 'verified').length,
    blockedCount: results.filter((result) => result.status === 'blocked').length,
    failedCount: results.filter((result) => result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0).length,
    ownershipViolationCount
  };
}

function isSwarmEvent(value: unknown): value is FrontierSwarmEvent {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === 'frontier.swarm.event';
}
