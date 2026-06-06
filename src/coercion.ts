import type { JsonValue } from '@shapeshift-labs/frontier';
import { cloneJsonValue, toJsonObject } from './internal.js';
import type { FrontierSwarmLane, FrontierSwarmLaneInput } from './index.js';

export function readLaneId(value: string | FrontierSwarmLaneInput | FrontierSwarmLane): string {
  return typeof value === 'string' ? value : value.id;
}

export function joinPathParts(...parts: readonly string[]): string {
  const first = parts[0] ? String(parts[0]) : '';
  const prefix = first.startsWith('/') ? '/' : '';
  return prefix + parts
    .map((part, index) => String(part).replace(index === 0 ? /\/+$/g : /^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
}

export function normalizeId(value: string, label: string): string {
  const id = String(value || '').trim();
  if (!id) throw new Error(`Missing ${label}`);
  return id;
}

export function titleFromId(id: string): string {
  const parts = String(id).split(/[.:/_-]+/).filter(Boolean);
  return parts.length ? parts.map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ') : String(id);
}

export function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((entry) => String(entry ?? '').trim()).filter(Boolean) : [];
}

export function toJsonValue(value: unknown): JsonValue {
  if (value === undefined) return null;
  return cloneJsonValue(value) as JsonValue;
}

export function stringifyError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function normalizeCounterRecord(input: unknown): Record<string, number> {
  const object = toJsonObject(input);
  if (!object) return {};
  const entries = Object.entries(object)
    .map(([key, value]) => [key, nonNegativeCount(value)] as const)
    .filter(([, value]) => value > 0)
    .sort(([left], [right]) => left.localeCompare(right));
  return Object.fromEntries(entries);
}

export function nonNegativeCount(value: unknown): number {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
}
