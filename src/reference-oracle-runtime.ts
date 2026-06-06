import { createSwarmDivergenceReport } from './trace-runtime.js';
import { FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_KIND, FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_VERSION, FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_KIND, FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_VERSION } from './constants.js';
import { normalizeReferenceWindow } from './evidence-index-helpers.js';
import { normalizeWatchpoint } from './oracle-helpers.js';
import { positiveNumber, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmCommand, FrontierSwarmCommandInput, FrontierSwarmNamedRef, FrontierSwarmNamedRefInput, FrontierSwarmReferenceOraclePlan, FrontierSwarmReferenceOraclePlanInput, FrontierSwarmReferenceOracleResponse, FrontierSwarmReferenceOracleResponseInput } from './types.js';

export function createSwarmReferenceOraclePlan(input: FrontierSwarmReferenceOraclePlanInput = {}): FrontierSwarmReferenceOraclePlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const targets = (input.targets ?? []).map((target) => ({
    id: target.id,
    role: target.role ?? 'candidate',
    ...(target.command ? { command: normalizeCommand(target.command) } : {}),
    ...(toJsonObject(target.metadata) ? { metadata: toJsonObject(target.metadata) } : {})
  }));
  return {
    kind: FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_KIND,
    version: FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_VERSION,
    id: input.id ?? 'swarm-reference-oracle-plan:' + stableHash([input.serviceId, input.subject, input.fixtureId, targets, input.window, generatedAt]),
    ...(input.serviceId ? { serviceId: input.serviceId } : {}),
    ...(input.subject ? { subject: input.subject } : {}),
    ...(input.fixtureId ? { fixtureId: input.fixtureId } : {}),
    generatedAt,
    targets,
    ...(input.window ? { window: normalizeReferenceWindow(input.window) } : {}),
    watchpoints: (input.watchpoints ?? []).map(normalizeWatchpoint),
    artifactKinds: uniqueStrings(input.artifactKinds ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function createSwarmReferenceOracleResponse(input: FrontierSwarmReferenceOracleResponseInput = {}): FrontierSwarmReferenceOracleResponse {
  const generatedAt = input.generatedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_KIND,
    version: FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_VERSION,
    id: input.id ?? 'swarm-reference-oracle-response:' + stableHash([input.planId, input.status, input.targetResults, input.divergence, generatedAt]),
    ...(input.planId ? { planId: input.planId } : {}),
    status: input.status ?? (input.divergence ? 'failed' : 'pending'),
    ...(input.subject ? { subject: input.subject } : {}),
    generatedAt,
    targetResults: (input.targetResults ?? []).map((target) => ({
      targetId: target.targetId,
      status: target.status ?? 'pending',
      artifacts: normalizeNamedRefs(target.artifacts ?? [], 'reference-oracle-artifact'),
      ...(toJsonObject(target.metadata) ? { metadata: toJsonObject(target.metadata) } : {})
    })),
    ...(input.divergence ? { divergence: createSwarmDivergenceReport(input.divergence) } : {}),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function normalizeCommand(input: string | FrontierSwarmCommandInput): FrontierSwarmCommand {
  return normalizeCommands([input])[0] as FrontierSwarmCommand;
}
function normalizeNamedRefs(input: readonly (string | FrontierSwarmNamedRefInput)[], fallbackKind: string): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, fallbackKind)).sort((left, right) => left.id.localeCompare(right.id));
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
