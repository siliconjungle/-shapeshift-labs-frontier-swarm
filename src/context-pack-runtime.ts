import { cloneJsonValue, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { FRONTIER_SWARM_CONTEXT_PACK_KIND, FRONTIER_SWARM_CONTEXT_PACK_VERSION, FRONTIER_SWARM_TASK_KIND } from './constants.js';
import { normalizeTask } from './manifest-normalization.js';
import type { FrontierSwarmCommand, FrontierSwarmCommandInput, FrontierSwarmContextPack, FrontierSwarmContextPackInput, FrontierSwarmTask } from './types.js';
import type { JsonValue } from '@shapeshift-labs/frontier';

export function createSwarmContextPack(input: FrontierSwarmContextPackInput = {}): FrontierSwarmContextPack {
  const generatedAt = input.generatedAt ?? Date.now();
  const task = input.job?.task ?? (input.task ? isSwarmTask(input.task) ? input.task : normalizeTask(input.task) : undefined);
  const files = uniqueStrings([
    ...(input.files ?? []),
    ...(input.job?.task.sourceRefs ?? []),
    ...(input.job?.task.targetRefs ?? []),
    ...(task?.sourceRefs ?? []),
    ...(task?.targetRefs ?? [])
  ]);
  const apiMap = Object.fromEntries(Object.entries(input.apiMap ?? {}).map(([key, values]) => [key, uniqueStrings(values)]));
  const commands = normalizeCommands([
    ...(input.commands ?? []),
    ...(input.oracleCommands ?? []),
    ...(input.job?.verification ?? [])
  ]);
  const expectedEvidence = uniqueStrings([
    ...(input.expectedEvidence ?? []),
    ...(input.job?.evidencePrefix ? [joinPathParts(input.job.evidencePrefix, 'evidence.json')] : [])
  ]);
  return {
    kind: FRONTIER_SWARM_CONTEXT_PACK_KIND,
    version: FRONTIER_SWARM_CONTEXT_PACK_VERSION,
    id: input.id ?? 'swarm-context-pack:' + stableHash([input.job?.id, task?.id, files, apiMap, generatedAt]),
    ...(input.job ? { jobId: input.job.id } : {}),
    ...(task ? { taskId: task.id } : {}),
    ...(input.job?.lane ?? task?.lane ? { lane: input.job?.lane ?? task?.lane } : {}),
    title: input.title ?? input.job?.title ?? task?.title ?? 'Swarm Context Pack',
    generatedAt,
    files,
    apiMap,
    knownFailures: uniqueStrings(input.knownFailures ?? []),
    commands,
    oracleCommands: commands,
    ...(input.evidenceSchema !== undefined ? { evidenceSchema: toJsonValue(input.evidenceSchema) } : {}),
    expectedEvidence,
    exclusions: uniqueStrings(input.exclusions ?? []),
    avoidInvestigating: uniqueStrings(input.avoidInvestigating ?? []),
    playbookIds: uniqueStrings(input.playbookIds ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function isSwarmTask(value: unknown): value is FrontierSwarmTask {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_TASK_KIND;
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
function joinPathParts(...parts: readonly string[]): string {
  const first = parts[0] ? String(parts[0]) : '';
  const prefix = first.startsWith('/') ? '/' : '';
  return prefix + parts
    .map((part, index) => String(part).replace(index === 0 ? /\/+$/g : /^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
}
function toJsonValue(value: unknown): JsonValue {
  if (value === undefined) return null;
  return cloneJsonValue(value) as JsonValue;
}
