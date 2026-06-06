import { cloneJsonValue, positiveNumber, stableHash, stableStringify, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmNamedRef, FrontierSwarmNamedRefInput, FrontierSwarmParityComparator, FrontierSwarmParityComparatorInput, FrontierSwarmParityOracleStatus, FrontierSwarmWatchpoint, FrontierSwarmWatchpointInput } from './types.js';
import type { JsonValue } from '@shapeshift-labs/frontier';

export function normalizeSeedRefs(input: readonly (string | number | FrontierSwarmNamedRefInput)[]): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, 'seed')).sort((left, right) => left.id.localeCompare(right.id));
}
export function normalizeParityComparator(input: FrontierSwarmParityComparatorInput): FrontierSwarmParityComparator {
  const title = input.title ?? titleFromId(input.id ?? input.path ?? 'comparator');
  return {
    id: input.id ?? 'swarm-parity-comparator:' + stableHash([title, input.status, input.expected, input.actual, input.path, input.operationIndex]),
    title,
    status: input.status ?? (input.expected !== undefined && input.actual !== undefined && stableStringify(input.expected) === stableStringify(input.actual) ? 'passed' : 'unknown'),
    ...(input.expected !== undefined ? { expected: toJsonValue(input.expected) } : {}),
    ...(input.actual !== undefined ? { actual: toJsonValue(input.actual) } : {}),
    ...(input.path ? { path: input.path } : {}),
    ...(input.operationIndex !== undefined ? { operationIndex: Math.max(0, Math.floor(input.operationIndex)) } : {}),
    evidenceRefs: normalizeNamedRefs(input.evidenceRefs ?? [], 'evidence'),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function inferParityStatus(comparators: readonly FrontierSwarmParityComparator[]): FrontierSwarmParityOracleStatus {
  if (comparators.some((comparator) => comparator.status === 'failed')) return 'failed';
  if (comparators.some((comparator) => comparator.status === 'blocked')) return 'blocked';
  if (comparators.length > 0 && comparators.every((comparator) => comparator.status === 'passed')) return 'passed';
  return 'pending';
}
export function normalizeWatchpoint(input: FrontierSwarmWatchpointInput): FrontierSwarmWatchpoint {
  const title = input.title ?? titleFromId(input.id ?? input.path ?? input.selector ?? input.target ?? 'watchpoint');
  return {
    id: input.id ?? 'swarm-watchpoint:' + stableHash([input.target, input.path, input.selector, input.operator, input.value, input.action]),
    title,
    ...(input.target ? { target: input.target } : {}),
    ...(input.path ? { path: input.path } : {}),
    ...(input.selector ? { selector: input.selector } : {}),
    operator: input.operator ?? 'changed',
    ...(input.value !== undefined ? { value: toJsonValue(input.value) } : {}),
    action: input.action ?? 'capture',
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
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
function titleFromId(id: string): string {
  const parts = String(id).split(/[.:/_-]+/).filter(Boolean);
  return parts.length ? parts.map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ') : String(id);
}
function toJsonValue(value: unknown): JsonValue {
  if (value === undefined) return null;
  return cloneJsonValue(value) as JsonValue;
}
function normalizeNamedRefs(input: readonly (string | FrontierSwarmNamedRefInput)[], fallbackKind: string): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, fallbackKind)).sort((left, right) => left.id.localeCompare(right.id));
}
