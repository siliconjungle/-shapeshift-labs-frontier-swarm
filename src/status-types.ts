export type FrontierSwarmComputeKind = 'codex' | 'shell' | 'human' | 'external' | string;
export type FrontierSwarmReasoningEffort = 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | string;
export type FrontierSwarmPolicyMode = 'advisory' | 'hard-file-ownership' | string;
export type FrontierSwarmTaskStatus =
  | 'open'
  | 'planned'
  | 'running'
  | 'blocked'
  | 'failed'
  | 'completed'
  | 'verified'
  | string;
export type FrontierSwarmJobStatus =
  | 'planned'
  | 'scheduled'
  | 'running'
  | 'blocked'
  | 'failed'
  | 'completed'
  | 'verified'
  | string;
export type FrontierSwarmMergeReadiness =
  | 'discovery-only'
  | 'patch-candidate'
  | 'verified-patch'
  | 'rejected'
  | 'blocked'
  | string;
export type FrontierSwarmMergeDisposition =
  | 'auto-mergeable'
  | 'needs-port'
  | 'discovery-only'
  | 'rejected'
  | 'blocked'
  | 'stale-against-head'
  | string;
export type FrontierSwarmRiskLevel = 'low' | 'medium' | 'high' | 'unknown' | string;
export type FrontierSwarmPatchStatus = 'unknown' | 'applies' | 'missing' | 'stale' | 'failed-check' | string;
export type FrontierSwarmQueueOverlayStatus =
  | 'satisfied'
  | 'ready-to-apply'
  | 'needs-human-port'
  | 'failed-evidence'
  | 'stale-against-head'
  | 'discovery-only'
  | 'blocked'
  | 'rejected'
  | 'unknown'
  | string;
export type FrontierSwarmParityOracleStatus = 'pending' | 'passed' | 'failed' | 'blocked' | 'skipped' | string;
export type FrontierSwarmDivergenceSeverity = 'info' | 'warning' | 'error' | 'critical' | string;
export type FrontierSwarmTraceShardStatus = 'passed' | 'failed' | 'blocked' | 'unknown' | string;
export type FrontierSwarmWatchpointAction = 'break' | 'log' | 'capture' | 'handoff' | string;
export type FrontierSwarmBottleneckKind =
  | 'correctness'
  | 'performance'
  | 'instrumentation-overhead'
  | 'missing-oracle'
  | 'flaky-harness'
  | 'blocked-dependency'
  | 'merge-review'
  | 'resource-capacity'
  | 'budget'
  | 'queue'
  | string;
export type FrontierSwarmConfidence = 'low' | 'medium' | 'high' | string;
export type FrontierSwarmBlackboardEntryKind = 'fact' | 'divergence' | 'rejected-theory' | 'ownership' | 'decision' | string;
export type FrontierSwarmProgressStatus =
  | 'not-started'
  | 'declared'
  | 'implemented'
  | 'structure-verified'
  | 'visual-verified'
  | 'functional-verified'
  | 'collaboration-verified'
  | 'accepted'
  | 'rejected'
  | 'blocked'
  | string;
export type FrontierSwarmAutoReviewFindingKind =
  | 'stub-risk'
  | 'missing-evidence'
  | 'ownership-violation'
  | 'overlarge-patch'
  | 'weak-evidence'
  | 'strict-source-policy'
  | string;
export type FrontierSwarmRebaseStatus =
  | 'clean-apply'
  | 'textual-conflict'
  | 'semantic-overlap'
  | 'stale-evidence'
  | 'needs-rerun'
  | string;
export type FrontierSwarmCoordinatorLiveness = 'running' | 'finished' | 'missing' | 'unknown' | string;
export type FrontierSwarmCoordinatorAdmissionStatus = 'admitted' | 'deferred' | 'not-admissible' | 'unknown' | string;
export type FrontierSwarmAdaptiveMode = 'off' | 'observe' | 'conservative' | 'balanced' | 'aggressive' | string;
export type FrontierSwarmAdaptiveObservationKind =
  | 'resource-capacity'
  | 'lane-capacity'
  | 'concurrency-key-capacity'
  | 'compute-capacity'
  | 'ready-capacity'
  | 'evidence-failure'
  | 'merge-conflict'
  | 'stale-patch'
  | 'browser-contention'
  | 'semantic-empty'
  | 'semantic-weak'
  | 'log-noise'
  | 'discovery-only-output'
  | 'duplicate-output'
  | 'thin-tournament-sample'
  | 'budget-pressure'
  | 'slow-job'
  | 'healthy-throughput'
  | 'strategy-regression'
  | 'strategy-underperforming'
  | string;
export type FrontierSwarmAdaptiveObservationSeverity = 'info' | 'warning' | 'error' | 'critical' | string;
export type FrontierSwarmAdaptiveDecisionAction = 'observe' | 'decrease' | 'increase' | 'hold' | string;
export type FrontierSwarmAdaptiveDecisionTarget =
  | 'max-ready-jobs'
  | 'lane'
  | 'concurrency-key'
  | 'compute'
  | 'resource'
  | string;
