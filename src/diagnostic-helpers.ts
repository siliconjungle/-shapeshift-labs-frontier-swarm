import { FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND, FRONTIER_SWARM_MERGE_BUNDLE_KIND } from './constants.js';
import type { FrontierSwarmBottleneckClassification, FrontierSwarmBottleneckKind, FrontierSwarmBottleneckSource, FrontierSwarmInstrumentationBudget, FrontierSwarmJobResultInput, FrontierSwarmMergeBundle } from './types.js';

export function normalizeBottleneckSource(input: FrontierSwarmBottleneckSource | FrontierSwarmJobResultInput | FrontierSwarmMergeBundle): FrontierSwarmBottleneckSource {
  if ((input as FrontierSwarmMergeBundle).kind === FRONTIER_SWARM_MERGE_BUNDLE_KIND) {
    const bundle = input as FrontierSwarmMergeBundle;
    return {
      jobId: bundle.jobId,
      lane: bundle.lane,
      status: bundle.status,
      reasons: bundle.reasons,
      evidencePaths: bundle.evidencePaths,
      changedPaths: bundle.changedPaths,
      text: bundle.title,
      metadata: bundle.metadata
    };
  }
  if ('text' in input || 'reasons' in input || 'lane' in input) return input as FrontierSwarmBottleneckSource;
  const result = input as FrontierSwarmJobResultInput;
  if (result.jobId) {
    return {
      jobId: result.jobId,
      status: result.status,
      reasons: result.error !== undefined ? [stringifyError(result.error)] : [],
      verification: result.verification,
      evidencePaths: result.evidencePaths,
      changedPaths: result.changedPaths,
      text: result.lastMessage,
      metadata: result.metadata
    };
  }
  return input as FrontierSwarmBottleneckSource;
}
export function routeForBottleneck(kind: FrontierSwarmBottleneckKind, lane?: string): FrontierSwarmBottleneckClassification['route'] {
  if (kind === 'missing-oracle') return { lane: lane ?? 'verification', workKind: 'oracle', priority: 20 };
  if (kind === 'flaky-harness') return { lane: lane ?? 'evidence', workKind: 'harness', priority: 25 };
  if (kind === 'merge-review') return { lane: lane ?? 'review', workKind: 'review', priority: 10 };
  if (kind === 'instrumentation-overhead') return { lane: lane ?? 'diagnostics', workKind: 'instrumentation', priority: 30 };
  if (kind === 'performance') return { lane: lane ?? 'performance', workKind: 'benchmark', priority: 35 };
  if (kind === 'correctness') return { lane: lane ?? 'implementation', workKind: 'debug', priority: 15 };
  return { ...(lane ? { lane } : {}), workKind: 'triage', priority: 50 };
}
export function isSwarmInstrumentationBudget(value: unknown): value is FrontierSwarmInstrumentationBudget {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND;
}
function stringifyError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
