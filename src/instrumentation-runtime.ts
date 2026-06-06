import { FRONTIER_SWARM_BOTTLENECK_REPORT_KIND, FRONTIER_SWARM_BOTTLENECK_REPORT_VERSION, FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND, FRONTIER_SWARM_INSTRUMENTATION_BUDGET_VERSION } from './constants.js';
import { isSwarmInstrumentationBudget, normalizeBottleneckSource, routeForBottleneck } from './diagnostic-helpers.js';
import { positiveNumber, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmBottleneckClassification, FrontierSwarmBottleneckKind, FrontierSwarmBottleneckReport, FrontierSwarmBottleneckReportInput, FrontierSwarmBottleneckSource, FrontierSwarmConfidence, FrontierSwarmInstrumentationBudget, FrontierSwarmInstrumentationBudgetDecision, FrontierSwarmInstrumentationBudgetInput, FrontierSwarmInstrumentationUsageInput, FrontierSwarmJobResultInput, FrontierSwarmMergeBundle } from './types.js';

export function createSwarmInstrumentationBudget(input: FrontierSwarmInstrumentationBudgetInput = {}): FrontierSwarmInstrumentationBudget {
  const generatedAt = input.generatedAt ?? Date.now();
  return {
    kind: FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND,
    version: FRONTIER_SWARM_INSTRUMENTATION_BUDGET_VERSION,
    id: input.id ?? 'swarm-instrumentation-budget:' + stableHash([input.lane, input.maxEvents, input.maxBytes, input.maxDurationMs, input.maxOverheadRatio, generatedAt]),
    title: input.title ?? titleFromId(input.id ?? input.lane ?? 'instrumentation budget'),
    ...(input.lane ? { lane: input.lane } : {}),
    generatedAt,
    ...(positiveNumber(input.maxEvents) ? { maxEvents: Math.floor(input.maxEvents as number) } : {}),
    ...(positiveNumber(input.maxBytes) ? { maxBytes: Math.floor(input.maxBytes as number) } : {}),
    ...(positiveNumber(input.maxDurationMs) ? { maxDurationMs: Math.floor(input.maxDurationMs as number) } : {}),
    ...(positiveNumber(input.maxOverheadRatio) ? { maxOverheadRatio: input.maxOverheadRatio as number } : {}),
    captureKinds: uniqueStrings(input.captureKinds ?? []),
    sampling: {
      mode: input.sampling?.mode ?? 'adaptive',
      ...(positiveNumber(input.sampling?.rate) ? { rate: input.sampling?.rate as number } : {}),
      ...(toJsonObject(input.sampling?.metadata) ? { metadata: toJsonObject(input.sampling?.metadata) } : {})
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function checkSwarmInstrumentationBudget(
  budgetInput: FrontierSwarmInstrumentationBudget | FrontierSwarmInstrumentationBudgetInput,
  usageInput: FrontierSwarmInstrumentationUsageInput = {}
): FrontierSwarmInstrumentationBudgetDecision {
  const budget = isSwarmInstrumentationBudget(budgetInput) ? budgetInput : createSwarmInstrumentationBudget(budgetInput);
  const usage = {
    events: Math.max(0, Math.floor(usageInput.events ?? 0)),
    bytes: Math.max(0, Math.floor(usageInput.bytes ?? 0)),
    durationMs: Math.max(0, Math.floor(usageInput.durationMs ?? 0)),
    overheadRatio: Math.max(0, usageInput.overheadRatio ?? 0),
    captureKinds: uniqueStrings(usageInput.captureKinds ?? []),
    ...(toJsonObject(usageInput.metadata) ? { metadata: toJsonObject(usageInput.metadata) } : {})
  };
  const violations: string[] = [];
  if (budget.maxEvents !== undefined && usage.events > budget.maxEvents) violations.push('max-events');
  if (budget.maxBytes !== undefined && usage.bytes > budget.maxBytes) violations.push('max-bytes');
  if (budget.maxDurationMs !== undefined && usage.durationMs > budget.maxDurationMs) violations.push('max-duration-ms');
  if (budget.maxOverheadRatio !== undefined && usage.overheadRatio > budget.maxOverheadRatio) violations.push('max-overhead-ratio');
  for (const kind of usage.captureKinds.filter((kind) => budget.captureKinds.length > 0 && !budget.captureKinds.includes(kind))) {
    violations.push(`capture-kind:${kind}`);
  }
  return { ok: violations.length === 0, budgetId: budget.id, usage, violations: uniqueStrings(violations) };
}
export function classifySwarmBottleneck(input: FrontierSwarmBottleneckSource | FrontierSwarmJobResultInput | FrontierSwarmMergeBundle): FrontierSwarmBottleneckClassification {
  const source = normalizeBottleneckSource(input);
  const text = [source.text, source.status, ...(source.reasons ?? []), ...(source.evidencePaths ?? []), ...(source.changedPaths ?? [])].join(' ').toLowerCase();
  const verification = source.verification ?? [];
  let kind: FrontierSwarmBottleneckKind = 'queue';
  let confidence: FrontierSwarmConfidence = 'medium';
  if (/missing.*oracle|no oracle|needs-fixture|fixture/.test(text)) kind = 'missing-oracle';
  else if (/flaky|timeout|browser|playwright|chrome|port/.test(text)) kind = 'flaky-harness';
  else if (/instrument|logging|trace|telemetry|overhead/.test(text)) kind = 'instrumentation-overhead';
  else if (/merge|conflict|review|needs-port|ownership/.test(text)) kind = 'merge-review';
  else if (/dependency|depends|blocked/.test(text)) kind = 'blocked-dependency';
  else if (/perf|slow|latency|throughput|cpu|memory|resource-capacity/.test(text)) kind = 'performance';
  else if (/diverg|correct|parity|oracle failed|regression/.test(text)) kind = 'correctness';
  if (verification.some((entry) => entry.status !== undefined && entry.status !== 0 && entry.required !== false)) confidence = 'high';
  if ((source.evidencePaths?.length ?? 0) === 0 && (source.changedPaths?.length ?? 0) > 0) confidence = 'low';
  return {
    kind,
    confidence,
    reasons: uniqueStrings([kind, ...(source.reasons ?? []), ...verification.filter((entry) => entry.status !== undefined && entry.status !== 0).map((entry) => entry.name ?? 'failed-verification')]),
    route: routeForBottleneck(kind, source.lane)
  };
}
export function createSwarmBottleneckReport(input: FrontierSwarmBottleneckReportInput = {}): FrontierSwarmBottleneckReport {
  const generatedAt = input.generatedAt ?? Date.now();
  const classifications = (input.sources ?? []).map(classifySwarmBottleneck);
  const byKind = groupObjects(classifications, (classification) => classification.kind);
  return {
    kind: FRONTIER_SWARM_BOTTLENECK_REPORT_KIND,
    version: FRONTIER_SWARM_BOTTLENECK_REPORT_VERSION,
    id: input.id ?? 'swarm-bottleneck-report:' + stableHash([classifications, generatedAt]),
    generatedAt,
    classifications,
    byKind,
    summary: {
      sourceCount: input.sources?.length ?? 0,
      kindCount: Object.keys(byKind).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function titleFromId(id: string): string {
  const parts = String(id).split(/[.:/_-]+/).filter(Boolean);
  return parts.length ? parts.map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ') : String(id);
}
function groupObjects<T>(items: readonly T[], key: (item: T) => string): Record<string, T[]> {
  const out: Record<string, T[]> = {};
  for (const item of items) {
    const group = key(item);
    out[group] = [...(out[group] ?? []), item];
  }
  return out;
}
