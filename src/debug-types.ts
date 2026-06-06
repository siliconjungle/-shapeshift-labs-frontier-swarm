import type {
  JsonObject,
  JsonValue
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_BOTTLENECK_REPORT_KIND,
  FRONTIER_SWARM_BOTTLENECK_REPORT_VERSION,
  FRONTIER_SWARM_DEBUG_HANDOFF_KIND,
  FRONTIER_SWARM_DEBUG_HANDOFF_VERSION,
  FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND,
  FRONTIER_SWARM_INSTRUMENTATION_BUDGET_VERSION,
  FRONTIER_SWARM_WATCHPOINT_PLAN_KIND,
  FRONTIER_SWARM_WATCHPOINT_PLAN_VERSION
} from './constants.js';
import type {
  FrontierSwarmNamedRef,
  FrontierSwarmNamedRefInput
} from './context-types.js';
import type {
  FrontierSwarmCommand,
  FrontierSwarmCommandInput
} from './manifest-types.js';
import type {
  FrontierSwarmMergeBundle
} from './merge-types.js';
import type {
  FrontierSwarmObservabilityPoint,
  FrontierSwarmObservabilityPointInput,
  FrontierSwarmParityComparator,
  FrontierSwarmParityComparatorInput
} from './observability-types.js';
import type {
  FrontierSwarmJobResultInput,
  FrontierSwarmVerificationResultInput
} from './result-types.js';
import type {
  FrontierSwarmBottleneckKind,
  FrontierSwarmConfidence,
  FrontierSwarmWatchpointAction
} from './status-types.js';

export interface FrontierSwarmWatchpointInput {
  id?: string;
  title?: string;
  target?: string;
  path?: string;
  selector?: string;
  operator?: string;
  value?: unknown;
  action?: FrontierSwarmWatchpointAction;
  metadata?: unknown;
}

export interface FrontierSwarmWatchpoint {
  id: string;
  title: string;
  target?: string;
  path?: string;
  selector?: string;
  operator: string;
  value?: JsonValue;
  action: FrontierSwarmWatchpointAction;
  metadata?: JsonObject;
}

export interface FrontierSwarmWatchpointPlanInput {
  id?: string;
  title?: string;
  subject?: string;
  matchMode?: 'all' | 'any' | string;
  watchpoints?: readonly FrontierSwarmWatchpointInput[];
  commands?: readonly (string | FrontierSwarmCommandInput)[];
  replayBundleIds?: readonly string[];
  divergenceReportIds?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmWatchpointPlan {
  kind: typeof FRONTIER_SWARM_WATCHPOINT_PLAN_KIND;
  version: typeof FRONTIER_SWARM_WATCHPOINT_PLAN_VERSION;
  id: string;
  title: string;
  subject?: string;
  matchMode: string;
  generatedAt: number;
  watchpoints: FrontierSwarmWatchpoint[];
  commands: FrontierSwarmCommand[];
  replayBundleIds: string[];
  divergenceReportIds: string[];
  summary: {
    watchpointCount: number;
    commandCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmDebugHandoffInput {
  id?: string;
  title?: string;
  status?: 'ready' | 'needs-review' | 'blocked' | 'failed' | string;
  subject?: string;
  focus?: FrontierSwarmObservabilityPointInput | FrontierSwarmObservabilityPoint;
  replayBundleIds?: readonly string[];
  divergenceReportIds?: readonly string[];
  watchpointPlanIds?: readonly string[];
  commands?: readonly (string | FrontierSwarmCommandInput)[];
  files?: readonly FrontierSwarmNamedRefInput[];
  artifacts?: readonly FrontierSwarmNamedRefInput[];
  comparisons?: readonly FrontierSwarmParityComparatorInput[];
  environment?: unknown;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmDebugHandoff {
  kind: typeof FRONTIER_SWARM_DEBUG_HANDOFF_KIND;
  version: typeof FRONTIER_SWARM_DEBUG_HANDOFF_VERSION;
  id: string;
  title: string;
  status: string;
  subject?: string;
  focus?: FrontierSwarmObservabilityPoint;
  replayBundleIds: string[];
  divergenceReportIds: string[];
  watchpointPlanIds: string[];
  commands: FrontierSwarmCommand[];
  files: FrontierSwarmNamedRef[];
  artifacts: FrontierSwarmNamedRef[];
  comparisons: FrontierSwarmParityComparator[];
  environment?: JsonObject;
  generatedAt: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmInstrumentationBudgetInput {
  id?: string;
  title?: string;
  lane?: string;
  maxEvents?: number;
  maxBytes?: number;
  maxDurationMs?: number;
  maxOverheadRatio?: number;
  captureKinds?: readonly string[];
  sampling?: { mode?: string; rate?: number; metadata?: unknown };
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmInstrumentationBudget {
  kind: typeof FRONTIER_SWARM_INSTRUMENTATION_BUDGET_KIND;
  version: typeof FRONTIER_SWARM_INSTRUMENTATION_BUDGET_VERSION;
  id: string;
  title: string;
  lane?: string;
  generatedAt: number;
  maxEvents?: number;
  maxBytes?: number;
  maxDurationMs?: number;
  maxOverheadRatio?: number;
  captureKinds: string[];
  sampling: { mode: string; rate?: number; metadata?: JsonObject };
  metadata?: JsonObject;
}

export interface FrontierSwarmInstrumentationUsageInput {
  events?: number;
  bytes?: number;
  durationMs?: number;
  overheadRatio?: number;
  captureKinds?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmInstrumentationBudgetDecision {
  ok: boolean;
  budgetId: string;
  usage: {
    events: number;
    bytes: number;
    durationMs: number;
    overheadRatio: number;
    captureKinds: string[];
    metadata?: JsonObject;
  };
  violations: string[];
}

export interface FrontierSwarmBottleneckSource {
  jobId?: string;
  lane?: string;
  text?: string;
  status?: string;
  reasons?: readonly string[];
  verification?: readonly FrontierSwarmVerificationResultInput[];
  evidencePaths?: readonly string[];
  changedPaths?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmBottleneckClassification {
  kind: FrontierSwarmBottleneckKind;
  confidence: FrontierSwarmConfidence;
  reasons: string[];
  route: {
    lane?: string;
    workKind?: string;
    priority?: number;
  };
}

export interface FrontierSwarmBottleneckReportInput {
  id?: string;
  sources?: readonly (FrontierSwarmBottleneckSource | FrontierSwarmJobResultInput | FrontierSwarmMergeBundle)[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmBottleneckReport {
  kind: typeof FRONTIER_SWARM_BOTTLENECK_REPORT_KIND;
  version: typeof FRONTIER_SWARM_BOTTLENECK_REPORT_VERSION;
  id: string;
  generatedAt: number;
  classifications: FrontierSwarmBottleneckClassification[];
  byKind: Record<string, FrontierSwarmBottleneckClassification[]>;
  summary: {
    sourceCount: number;
    kindCount: number;
  };
  metadata?: JsonObject;
}
