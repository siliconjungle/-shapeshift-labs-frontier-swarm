import { FRONTIER_SWARM_ORACLE_CORPUS_KIND, FRONTIER_SWARM_ORACLE_CORPUS_VERSION, FRONTIER_SWARM_PARITY_ORACLE_KIND, FRONTIER_SWARM_PARITY_ORACLE_VERSION, FRONTIER_SWARM_REPLAY_BUNDLE_KIND, FRONTIER_SWARM_REPLAY_BUNDLE_VERSION } from './constants.js';
import { inferParityStatus, normalizeParityComparator, normalizeSeedRefs } from './oracle-helpers.js';
import { positiveNumber, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmCommand, FrontierSwarmCommandInput, FrontierSwarmNamedRef, FrontierSwarmNamedRefInput, FrontierSwarmOracleArtifact, FrontierSwarmOracleArtifactInput, FrontierSwarmOracleCorpus, FrontierSwarmOracleCorpusInput, FrontierSwarmParityOracle, FrontierSwarmParityOracleInput, FrontierSwarmReplayBundle, FrontierSwarmReplayBundleInput } from './types.js';

export function createSwarmOracleCorpus(input: FrontierSwarmOracleCorpusInput = {}): FrontierSwarmOracleCorpus {
  const generatedAt = input.generatedAt ?? Date.now();
  const artifacts = (input.artifacts ?? []).map(normalizeOracleArtifact).sort((left, right) => left.id.localeCompare(right.id));
  const byKind = groupArtifactIdsBy(artifacts, (artifact) => [artifact.kind]);
  const byTag = groupArtifactIdsBy(artifacts, (artifact) => artifact.tags);
  return {
    kind: FRONTIER_SWARM_ORACLE_CORPUS_KIND,
    version: FRONTIER_SWARM_ORACLE_CORPUS_VERSION,
    id: input.id ?? 'swarm-oracle-corpus:' + stableHash([artifacts, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? 'oracle corpus'),
    generatedAt,
    artifacts,
    byKind,
    byTag,
    summary: {
      artifactCount: artifacts.length,
      kindCount: Object.keys(byKind).length,
      tagCount: Object.keys(byTag).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function createSwarmReplayBundle(input: FrontierSwarmReplayBundleInput = {}): FrontierSwarmReplayBundle {
  const generatedAt = input.generatedAt ?? Date.now();
  const commands = normalizeCommands(input.commands ?? []);
  const inputs = normalizeNamedRefs(input.inputs ?? [], 'input');
  const artifacts = normalizeNamedRefs(input.artifacts ?? [], 'artifact');
  const sourceRefs = normalizeNamedRefs(input.sourceRefs ?? [], 'source');
  const seeds = normalizeSeedRefs(input.seeds ?? []);
  const expectedEvidence = uniqueStrings(input.expectedEvidence ?? []);
  const title = input.title ?? titleFromId(input.id ?? input.subject ?? 'replay bundle');
  return {
    kind: FRONTIER_SWARM_REPLAY_BUNDLE_KIND,
    version: FRONTIER_SWARM_REPLAY_BUNDLE_VERSION,
    id: input.id ?? 'swarm-replay-bundle:' + stableHash([title, input.subject, commands, inputs, artifacts, sourceRefs, seeds, expectedEvidence, generatedAt]),
    title,
    ...(input.subject ? { subject: input.subject } : {}),
    generatedAt,
    commands,
    inputs,
    artifacts,
    sourceRefs,
    seeds,
    ...(toJsonObject(input.environment) ? { environment: toJsonObject(input.environment) } : {}),
    expectedEvidence,
    summary: {
      commandCount: commands.length,
      inputCount: inputs.length,
      artifactCount: artifacts.length,
      sourceRefCount: sourceRefs.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function createSwarmParityOracle(input: FrontierSwarmParityOracleInput = {}): FrontierSwarmParityOracle {
  const generatedAt = input.generatedAt ?? Date.now();
  const referenceCommands = normalizeCommands(input.referenceCommands ?? []);
  const testCommands = normalizeCommands(input.testCommands ?? []);
  const comparators = (input.comparators ?? []).map(normalizeParityComparator);
  const artifacts = normalizeNamedRefs(input.artifacts ?? [], 'parity-artifact');
  const status = input.status ?? inferParityStatus(comparators);
  return {
    kind: FRONTIER_SWARM_PARITY_ORACLE_KIND,
    version: FRONTIER_SWARM_PARITY_ORACLE_VERSION,
    id: input.id ?? 'swarm-parity-oracle:' + stableHash([input.title, input.subject, referenceCommands, testCommands, comparators, artifacts, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.subject ?? 'parity oracle'),
    status,
    ...(input.subject ? { subject: input.subject } : {}),
    generatedAt,
    referenceCommands,
    testCommands,
    comparators,
    artifacts,
    replayBundleIds: uniqueStrings(input.replayBundleIds ?? []),
    summary: {
      comparatorCount: comparators.length,
      passedCount: comparators.filter((comparator) => comparator.status === 'passed').length,
      failedCount: comparators.filter((comparator) => comparator.status === 'failed').length,
      blockedCount: comparators.filter((comparator) => comparator.status === 'blocked').length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function normalizeOracleArtifact(input: FrontierSwarmOracleArtifactInput): FrontierSwarmOracleArtifact {
  return {
    id: normalizeId(input.id, 'oracle artifact id'),
    path: normalizeId(input.path, 'oracle artifact path'),
    kind: input.kind ?? 'oracle',
    ...(input.command ? { command: typeof input.command === 'string' ? normalizeCommands([input.command])[0] : normalizeCommands([input.command])[0] } : {}),
    ...(input.hash ? { hash: input.hash } : {}),
    ...(input.sourceRef ? { sourceRef: input.sourceRef } : {}),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function groupArtifactIdsBy(artifacts: readonly FrontierSwarmOracleArtifact[], key: (artifact: FrontierSwarmOracleArtifact) => readonly string[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const artifact of artifacts) {
    for (const value of key(artifact)) out[value] = uniqueStrings([...(out[value] ?? []), artifact.id]);
  }
  return out;
}
function titleFromId(id: string): string {
  const parts = String(id).split(/[.:/_-]+/).filter(Boolean);
  return parts.length ? parts.map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ') : String(id);
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
function normalizeNamedRefs(input: readonly (string | FrontierSwarmNamedRefInput)[], fallbackKind: string): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, fallbackKind)).sort((left, right) => left.id.localeCompare(right.id));
}
function normalizeId(value: string, label: string): string {
  const id = String(value || '').trim();
  if (!id) throw new Error(`Missing ${label}`);
  return id;
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
