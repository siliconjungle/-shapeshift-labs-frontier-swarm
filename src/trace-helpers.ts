import { FRONTIER_SWARM_DIVERGENCE_REPORT_KIND, FRONTIER_SWARM_OBSERVABILITY_POINT_KIND, FRONTIER_SWARM_TRACE_SHARD_KIND } from './constants.js';
import { positiveNumber, stableHash, stableStringify, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmCommand, FrontierSwarmCommandInput, FrontierSwarmConfidence, FrontierSwarmDivergenceReport, FrontierSwarmExecutableOwnershipRegion, FrontierSwarmExecutableOwnershipRegionInput, FrontierSwarmNamedRef, FrontierSwarmNamedRefInput, FrontierSwarmObservabilityPoint, FrontierSwarmTraceHypothesis, FrontierSwarmTraceHypothesisInput, FrontierSwarmTraceIndex, FrontierSwarmTraceRowWindow, FrontierSwarmTraceRowWindowInput, FrontierSwarmTraceShard } from './types.js';

export function isSwarmObservabilityPoint(value: unknown): value is FrontierSwarmObservabilityPoint {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_OBSERVABILITY_POINT_KIND;
}
export function isSwarmDivergenceReport(value: unknown): value is FrontierSwarmDivergenceReport {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_DIVERGENCE_REPORT_KIND;
}
export function isSwarmTraceShard(value: unknown): value is FrontierSwarmTraceShard {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_TRACE_SHARD_KIND;
}
export function normalizeTraceRowWindow(input: FrontierSwarmTraceRowWindowInput, generatedAt: number): FrontierSwarmTraceRowWindow {
  const start = Number.isFinite(input.start) ? Math.floor(input.start as number) : undefined;
  const end = Number.isFinite(input.end) ? Math.floor(input.end as number) : undefined;
  const rowCount = Number.isFinite(input.rowCount) ? Math.max(0, Math.floor(input.rowCount as number)) : undefined;
  const firstDivergenceAt = Number.isFinite(input.firstDivergenceAt) ? Math.floor(input.firstDivergenceAt as number) : undefined;
  const deltaFields = uniqueStrings(input.deltaFields ?? []);
  const id = input.id ?? 'swarm-trace-window:' + stableHash([start, end, rowCount, firstDivergenceAt, deltaFields, generatedAt]);
  return {
    id,
    title: input.title ?? titleFromId(id),
    ...(start !== undefined ? { start } : {}),
    ...(end !== undefined ? { end } : {}),
    ...(rowCount !== undefined ? { rowCount } : {}),
    ...(firstDivergenceAt !== undefined ? { firstDivergenceAt } : {}),
    deltaFields,
    evidenceRefs: normalizeNamedRefs(input.evidenceRefs ?? [], 'trace-window-evidence'),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function normalizeTraceHypothesis(input: FrontierSwarmTraceHypothesisInput, generatedAt: number): FrontierSwarmTraceHypothesis {
  const line = Number.isFinite(input.line) ? Math.max(1, Math.floor(input.line as number)) : undefined;
  const id = input.id ?? 'swarm-trace-hypothesis:' + stableHash([
    input.sourcePath,
    line,
    input.symbol,
    input.region,
    input.reason,
    generatedAt
  ]);
  return {
    id,
    title: input.title ?? titleFromId(input.symbol ?? input.region ?? id),
    ...(input.sourcePath ? { sourcePath: input.sourcePath } : {}),
    ...(line !== undefined ? { line } : {}),
    ...(input.symbol ? { symbol: input.symbol } : {}),
    ...(input.region ? { region: input.region } : {}),
    confidence: input.confidence ?? 'medium',
    ...(input.reason ? { reason: input.reason } : {}),
    evidenceRefs: normalizeNamedRefs(input.evidenceRefs ?? [], 'trace-hypothesis-evidence'),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function normalizeExecutableOwnershipRegion(input: FrontierSwarmExecutableOwnershipRegionInput): FrontierSwarmExecutableOwnershipRegion {
  return {
    id: normalizeId(input.id, 'executable ownership region id'),
    kind: input.kind ?? 'semantic-region',
    ...(input.sourcePath ? { sourcePath: input.sourcePath } : {}),
    ...(input.symbol ? { symbol: input.symbol } : {}),
    selectors: uniqueStrings(input.selectors ?? []),
    affectedTests: normalizeCommands(input.affectedTests ?? []),
    conflictingAssumptions: uniqueStrings(input.conflictingAssumptions ?? []),
    traceRefs: normalizeNamedRefs(input.traceRefs ?? [], 'trace'),
    riskLevel: input.riskLevel ?? 'unknown',
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function summarizeTraceShards(shards: readonly {
  rowWindows: readonly unknown[];
  hypotheses: readonly unknown[];
  executableOwnershipRegions: readonly unknown[];
  focusedTests: readonly unknown[];
  referenceEvidence: readonly unknown[];
  divergence?: unknown;
}[]): FrontierSwarmTraceShard['summary'] & FrontierSwarmTraceIndex['summary'] {
  const rowWindowCount = shards.reduce((total, shard) => total + shard.rowWindows.length, 0);
  const hypothesisCount = shards.reduce((total, shard) => total + shard.hypotheses.length, 0);
  const executableOwnershipRegionCount = shards.reduce((total, shard) => total + shard.executableOwnershipRegions.length, 0);
  const focusedTestCount = shards.reduce((total, shard) => total + shard.focusedTests.length, 0);
  const referenceEvidenceCount = shards.reduce((total, shard) => total + shard.referenceEvidence.length, 0);
  const divergenceCount = shards.filter((shard) => Boolean(shard.divergence)).length;
  return {
    shardCount: shards.length,
    rowWindowCount,
    hypothesisCount,
    executableOwnershipRegionCount,
    focusedTestCount,
    referenceEvidenceCount,
    divergenceCount,
    hasDivergence: divergenceCount > 0
  };
}
export function groupTraceShardsByMany(shards: readonly FrontierSwarmTraceShard[], key: (shard: FrontierSwarmTraceShard) => readonly string[]): Record<string, FrontierSwarmTraceShard[]> {
  const out: Record<string, FrontierSwarmTraceShard[]> = {};
  for (const shard of shards) {
    for (const value of key(shard)) out[value] = [...(out[value] ?? []), shard];
  }
  return out;
}
export function traceShardRegions(shard: FrontierSwarmTraceShard): string[] {
  return uniqueStrings([
    ...shard.hypotheses.map((hypothesis) => hypothesis.region),
    ...shard.executableOwnershipRegions.flatMap((region) => [region.id, ...region.selectors])
  ]);
}
export function traceShardSourcePaths(shard: FrontierSwarmTraceShard): string[] {
  return uniqueStrings([
    ...shard.hypotheses.map((hypothesis) => hypothesis.sourcePath),
    ...shard.executableOwnershipRegions.map((region) => region.sourcePath)
  ]);
}
export function traceShardMaxConfidence(shard: FrontierSwarmTraceShard): number {
  return Math.max(
    ...[
      shard.divergence ? confidenceWeight(shard.divergence.confidence) : 0,
      ...shard.hypotheses.map((hypothesis) => confidenceWeight(hypothesis.confidence))
    ]
  );
}
export function traceShardSearchText(shard: FrontierSwarmTraceShard): string {
  return stableStringify({
    id: shard.id,
    jobId: shard.jobId,
    lane: shard.lane,
    subject: shard.subject,
    status: shard.status,
    divergence: shard.divergence,
    rowWindows: shard.rowWindows,
    hypotheses: shard.hypotheses,
    executableOwnershipRegions: shard.executableOwnershipRegions
  }).toLowerCase();
}
export function confidenceWeight(confidence: FrontierSwarmConfidence): number {
  if (confidence === 'high') return 1;
  if (confidence === 'medium') return 0.65;
  if (confidence === 'low') return 0.35;
  return 0.5;
}
function titleFromId(id: string): string {
  const parts = String(id).split(/[.:/_-]+/).filter(Boolean);
  return parts.length ? parts.map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ') : String(id);
}
function normalizeNamedRefs(input: readonly (string | FrontierSwarmNamedRefInput)[], fallbackKind: string): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, fallbackKind)).sort((left, right) => left.id.localeCompare(right.id));
}
function normalizeId(value: string, label: string): string {
  const id = String(value || '').trim();
  if (!id) throw new Error(`Missing ${label}`);
  return id;
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
