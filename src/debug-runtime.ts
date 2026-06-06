import { createSwarmObservabilityPoint } from './trace-runtime.js';
import { FRONTIER_SWARM_DEBUG_HANDOFF_KIND, FRONTIER_SWARM_DEBUG_HANDOFF_VERSION, FRONTIER_SWARM_WATCHPOINT_PLAN_KIND, FRONTIER_SWARM_WATCHPOINT_PLAN_VERSION } from './constants.js';
import { isSwarmObservabilityPoint } from './trace-helpers.js';
import { normalizeParityComparator, normalizeWatchpoint } from './oracle-helpers.js';
import { positiveNumber, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmCommand, FrontierSwarmCommandInput, FrontierSwarmDebugHandoff, FrontierSwarmDebugHandoffInput, FrontierSwarmNamedRef, FrontierSwarmNamedRefInput, FrontierSwarmWatchpointPlan, FrontierSwarmWatchpointPlanInput } from './types.js';

export function createSwarmWatchpointPlan(input: FrontierSwarmWatchpointPlanInput = {}): FrontierSwarmWatchpointPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const watchpoints = (input.watchpoints ?? []).map(normalizeWatchpoint);
  const commands = normalizeCommands(input.commands ?? []);
  return {
    kind: FRONTIER_SWARM_WATCHPOINT_PLAN_KIND,
    version: FRONTIER_SWARM_WATCHPOINT_PLAN_VERSION,
    id: input.id ?? 'swarm-watchpoint-plan:' + stableHash([input.subject, watchpoints, commands, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.subject ?? 'watchpoint plan'),
    ...(input.subject ? { subject: input.subject } : {}),
    matchMode: input.matchMode ?? 'all',
    generatedAt,
    watchpoints,
    commands,
    replayBundleIds: uniqueStrings(input.replayBundleIds ?? []),
    divergenceReportIds: uniqueStrings(input.divergenceReportIds ?? []),
    summary: {
      watchpointCount: watchpoints.length,
      commandCount: commands.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function createSwarmDebugHandoff(input: FrontierSwarmDebugHandoffInput = {}): FrontierSwarmDebugHandoff {
  const generatedAt = input.generatedAt ?? Date.now();
  const focus = input.focus ? (isSwarmObservabilityPoint(input.focus) ? input.focus : createSwarmObservabilityPoint(input.focus)) : undefined;
  return {
    kind: FRONTIER_SWARM_DEBUG_HANDOFF_KIND,
    version: FRONTIER_SWARM_DEBUG_HANDOFF_VERSION,
    id: input.id ?? 'swarm-debug-handoff:' + stableHash([input.subject, focus, input.replayBundleIds, input.divergenceReportIds, input.watchpointPlanIds, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.subject ?? 'debug handoff'),
    status: input.status ?? 'ready',
    ...(input.subject ? { subject: input.subject } : {}),
    ...(focus ? { focus } : {}),
    replayBundleIds: uniqueStrings(input.replayBundleIds ?? []),
    divergenceReportIds: uniqueStrings(input.divergenceReportIds ?? []),
    watchpointPlanIds: uniqueStrings(input.watchpointPlanIds ?? []),
    commands: normalizeCommands(input.commands ?? []),
    files: normalizeNamedRefs(input.files ?? [], 'file'),
    artifacts: normalizeNamedRefs(input.artifacts ?? [], 'artifact'),
    comparisons: (input.comparisons ?? []).map(normalizeParityComparator),
    ...(toJsonObject(input.environment) ? { environment: toJsonObject(input.environment) } : {}),
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function normalizeCommands(input: readonly (string | FrontierSwarmCommandInput)[]): FrontierSwarmCommand[] {
  return input.map((entry) => {
    if (typeof entry === 'string') {
      return { name: entry, command: entry, args: [], required: true };
    }
    return {
      name: entry.name ?? [entry.command, ...(entry.args ?? [])].join(' '),
      command: entry.command,
      args: [...(entry.args ?? [])],
      required: entry.required ?? true,
      ...(entry.cwd ? { cwd: entry.cwd } : {}),
      ...(toJsonObject(entry.metadata) ? { metadata: toJsonObject(entry.metadata) } : {})
    };
  });
}
function titleFromId(id: string): string {
  const parts = String(id).split(/[.:/_-]+/).filter(Boolean);
  return parts.length ? parts.map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ') : String(id);
}
function normalizeNamedRefs(input: readonly (string | FrontierSwarmNamedRefInput)[], fallbackKind: string): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, fallbackKind)).sort((left, right) => left.id.localeCompare(right.id));
}
function normalizeNamedRef(input: string | number | FrontierSwarmNamedRefInput, fallbackKind: string): FrontierSwarmNamedRef {
  if (typeof input === 'string' || typeof input === 'number') {
    const value = String(input);
    return { id: value, kind: fallbackKind, path: value, tags: [] };
  }
  const path = input.path ?? input.uri;
  const id = input.id ?? path ?? stableHash(input);
  return {
    id,
    kind: input.kind ?? fallbackKind,
    ...(input.path ? { path: input.path } : {}),
    ...(input.uri ? { uri: input.uri } : {}),
    ...(input.role ? { role: input.role } : {}),
    ...(input.hash ? { hash: input.hash } : {}),
    ...(positiveNumber(input.bytes) ? { bytes: Math.floor(input.bytes as number) } : {}),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
