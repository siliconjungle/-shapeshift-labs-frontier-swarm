import { cloneJsonValue, positiveNumber, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { FRONTIER_SWARM_DIVERGENCE_REPORT_KIND, FRONTIER_SWARM_DIVERGENCE_REPORT_VERSION, FRONTIER_SWARM_OBSERVABILITY_POINT_KIND, FRONTIER_SWARM_OBSERVABILITY_POINT_VERSION, FRONTIER_SWARM_TRACE_INDEX_KIND, FRONTIER_SWARM_TRACE_INDEX_VERSION, FRONTIER_SWARM_TRACE_SHARD_KIND, FRONTIER_SWARM_TRACE_SHARD_VERSION } from './constants.js';
import { groupTraceShardsByMany, isSwarmDivergenceReport, isSwarmObservabilityPoint, isSwarmTraceShard, normalizeExecutableOwnershipRegion, normalizeTraceHypothesis, normalizeTraceRowWindow, summarizeTraceShards, traceShardMaxConfidence, traceShardRegions, traceShardSearchText, traceShardSourcePaths } from './trace-helpers.js';
import type { FrontierSwarmCommand, FrontierSwarmCommandInput, FrontierSwarmDivergenceReport, FrontierSwarmDivergenceReportInput, FrontierSwarmNamedRef, FrontierSwarmNamedRefInput, FrontierSwarmObservabilityPoint, FrontierSwarmObservabilityPointInput, FrontierSwarmTraceIndex, FrontierSwarmTraceIndexInput, FrontierSwarmTraceIndexQuery, FrontierSwarmTraceIndexQueryResult, FrontierSwarmTraceShard, FrontierSwarmTraceShardInput } from './types.js';
import type { JsonValue } from '@shapeshift-labs/frontier';

export function createSwarmObservabilityPoint(input: FrontierSwarmObservabilityPointInput = {}): FrontierSwarmObservabilityPoint {
  const eventRefs = normalizeNamedRefs(input.eventRefs ?? [], 'event');
  return {
    kind: FRONTIER_SWARM_OBSERVABILITY_POINT_KIND,
    version: FRONTIER_SWARM_OBSERVABILITY_POINT_VERSION,
    id: input.id ?? 'swarm-observability-point:' + stableHash([input.subject, input.scope, input.operationIndex, input.at, input.path, input.selector, eventRefs]),
    ...(input.subject ? { subject: input.subject } : {}),
    ...(input.scope ? { scope: input.scope } : {}),
    ...(input.operationIndex !== undefined ? { operationIndex: Math.max(0, Math.floor(input.operationIndex)) } : {}),
    ...(input.at !== undefined ? { at: input.at } : {}),
    ...(input.path ? { path: input.path } : {}),
    ...(input.selector ? { selector: input.selector } : {}),
    ...(input.before !== undefined ? { before: toJsonValue(input.before) } : {}),
    ...(input.after !== undefined ? { after: toJsonValue(input.after) } : {}),
    eventRefs,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function createSwarmDivergenceReport(input: FrontierSwarmDivergenceReportInput = {}): FrontierSwarmDivergenceReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const observabilityPoints = (input.observabilityPoints ?? []).map((point) => isSwarmObservabilityPoint(point) ? point : createSwarmObservabilityPoint(point));
  const earliest = observabilityPoints
    .filter((point) => point.operationIndex !== undefined)
    .sort((left, right) => (left.operationIndex as number) - (right.operationIndex as number))[0];
  const divergesAt = input.divergesAt ?? earliest?.path;
  const operationIndex = input.operationIndex ?? earliest?.operationIndex;
  return {
    kind: FRONTIER_SWARM_DIVERGENCE_REPORT_KIND,
    version: FRONTIER_SWARM_DIVERGENCE_REPORT_VERSION,
    id: input.id ?? 'swarm-divergence-report:' + stableHash([input.subject, input.divergesAt, input.operationIndex, observabilityPoints, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.subject ?? 'divergence report'),
    status: input.status ?? 'failed',
    severity: input.severity ?? 'error',
    ...(input.subject ? { subject: input.subject } : {}),
    confidence: input.confidence ?? 'medium',
    ...(divergesAt ? { divergesAt } : {}),
    ...(operationIndex !== undefined ? { operationIndex } : {}),
    ...(input.expected !== undefined ? { expected: toJsonValue(input.expected) } : {}),
    ...(input.actual !== undefined ? { actual: toJsonValue(input.actual) } : {}),
    observabilityPoints,
    traceRefs: normalizeNamedRefs(input.traceRefs ?? [], 'trace'),
    replayBundleIds: uniqueStrings(input.replayBundleIds ?? []),
    evidenceRefs: normalizeNamedRefs(input.evidenceRefs ?? [], 'evidence'),
    generatedAt,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function createSwarmTraceShard(input: FrontierSwarmTraceShardInput = {}): FrontierSwarmTraceShard {
  const generatedAt = input.generatedAt ?? Date.now();
  const divergence = input.divergence
    ? isSwarmDivergenceReport(input.divergence)
      ? cloneJsonValue(input.divergence) as FrontierSwarmDivergenceReport
      : createSwarmDivergenceReport(input.divergence)
    : undefined;
  const rowWindows = (input.rowWindows ?? []).map((window) => normalizeTraceRowWindow(window, generatedAt));
  const hypotheses = (input.hypotheses ?? []).map((hypothesis) => normalizeTraceHypothesis(hypothesis, generatedAt));
  const executableOwnershipRegions = (input.executableOwnershipRegions ?? []).map(normalizeExecutableOwnershipRegion);
  const focusedTests = normalizeCommands(input.focusedTests ?? []);
  const referenceEvidence = normalizeNamedRefs(input.referenceEvidence ?? [], 'reference-evidence');
  const traceRefs = normalizeNamedRefs(input.traceRefs ?? [], 'trace');
  const status = input.status ?? (divergence && divergence.status === 'failed' ? 'failed' : focusedTests.length || rowWindows.length || hypotheses.length ? 'passed' : 'unknown');
  const id = input.id ?? 'swarm-trace-shard:' + stableHash([
    input.jobId,
    input.lane,
    input.subject ?? divergence?.subject,
    status,
    divergence?.id,
    rowWindows,
    hypotheses,
    executableOwnershipRegions,
    generatedAt
  ]);
  return {
    kind: FRONTIER_SWARM_TRACE_SHARD_KIND,
    version: FRONTIER_SWARM_TRACE_SHARD_VERSION,
    id,
    ...(input.jobId ? { jobId: input.jobId } : {}),
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.subject ?? divergence?.subject ? { subject: input.subject ?? divergence?.subject } : {}),
    status,
    traceRefs,
    ...(divergence ? { divergence } : {}),
    rowWindows,
    hypotheses,
    executableOwnershipRegions,
    focusedTests,
    referenceEvidence,
    generatedAt,
    summary: summarizeTraceShards([{ rowWindows, hypotheses, executableOwnershipRegions, focusedTests, referenceEvidence, divergence }]),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function createSwarmTraceIndex(input: FrontierSwarmTraceIndexInput = {}): FrontierSwarmTraceIndex {
  const generatedAt = input.generatedAt ?? Date.now();
  const shards = [
    ...(input.shards ?? []).map((shard) => isSwarmTraceShard(shard) ? cloneJsonValue(shard) as FrontierSwarmTraceShard : createSwarmTraceShard({ ...shard, generatedAt: shard.generatedAt ?? generatedAt })),
    ...(input.bundles ?? []).flatMap((bundle) => bundle.traceShards)
  ];
  const uniqueById = new Map<string, FrontierSwarmTraceShard>();
  for (const shard of shards) uniqueById.set(shard.id, shard);
  const indexed = Array.from(uniqueById.values()).sort((left, right) => left.id.localeCompare(right.id));
  return {
    kind: FRONTIER_SWARM_TRACE_INDEX_KIND,
    version: FRONTIER_SWARM_TRACE_INDEX_VERSION,
    id: input.id ?? 'swarm-trace-index:' + stableHash([indexed.map((shard) => shard.id), generatedAt]),
    generatedAt,
    shards: indexed,
    byJobId: groupObjects(indexed.filter((shard) => shard.jobId), (shard) => shard.jobId as string),
    bySubject: groupObjects(indexed.filter((shard) => shard.subject), (shard) => shard.subject as string),
    byRegion: groupTraceShardsByMany(indexed, traceShardRegions),
    bySourcePath: groupTraceShardsByMany(indexed, traceShardSourcePaths),
    summary: summarizeTraceShards(indexed),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function querySwarmTraceIndex(
  index: FrontierSwarmTraceIndex,
  query: FrontierSwarmTraceIndexQuery = {}
): FrontierSwarmTraceIndexQueryResult {
  const needles = query.textIncludes ? [query.textIncludes.toLowerCase()] : [];
  const minConfidence = query.minConfidence ?? 0;
  const shards = index.shards.filter((shard) => (
    (query.jobId === undefined || shard.jobId === query.jobId)
    && (query.lane === undefined || shard.lane === query.lane)
    && (query.subject === undefined || shard.subject === query.subject)
    && (query.status === undefined || shard.status === query.status)
    && (query.region === undefined || traceShardRegions(shard).includes(query.region))
    && (query.sourcePath === undefined || traceShardSourcePaths(shard).some((path) => path.includes(query.sourcePath as string)))
    && (query.hasDivergence === undefined || Boolean(shard.divergence) === query.hasDivergence)
    && (query.minConfidence === undefined || traceShardMaxConfidence(shard) >= minConfidence)
    && (needles.length === 0 || needles.some((needle) => traceShardSearchText(shard).includes(needle)))
  ));
  return {
    shards,
    summary: {
      shardCount: shards.length,
      rowWindowCount: shards.reduce((total, shard) => total + shard.rowWindows.length, 0),
      hypothesisCount: shards.reduce((total, shard) => total + shard.hypotheses.length, 0),
      executableOwnershipRegionCount: shards.reduce((total, shard) => total + shard.executableOwnershipRegions.length, 0)
    }
  };
}
function normalizeNamedRefs(input: readonly (string | FrontierSwarmNamedRefInput)[], fallbackKind: string): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, fallbackKind)).sort((left, right) => left.id.localeCompare(right.id));
}
function toJsonValue(value: unknown): JsonValue {
  if (value === undefined) return null;
  return cloneJsonValue(value) as JsonValue;
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
function groupObjects<T>(items: readonly T[], key: (item: T) => string): Record<string, T[]> {
  const out: Record<string, T[]> = {};
  for (const item of items) {
    const group = key(item);
    out[group] = [...(out[group] ?? []), item];
  }
  return out;
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
