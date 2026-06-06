import type {
  JsonObject,
  JsonValue
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_EVENT_KIND,
  FRONTIER_SWARM_EVENT_STREAM_KIND,
  FRONTIER_SWARM_EVENT_STREAM_VERSION,
  FRONTIER_SWARM_EVENT_VERSION,
  FRONTIER_SWARM_MAILBOX_KIND,
  FRONTIER_SWARM_MAILBOX_VERSION,
  FRONTIER_SWARM_RUN_KIND,
  FRONTIER_SWARM_RUN_VERSION
} from './constants.js';
import type {
  FrontierSwarmLane,
  FrontierSwarmLaneInput,
  FrontierSwarmSummary
} from './manifest-types.js';
import type {
  FrontierSwarmJob,
  FrontierSwarmPlan
} from './plan.js';
import type {
  FrontierSwarmJobResult,
  FrontierSwarmJobResultInput
} from './result-types.js';
import type {
  FrontierSwarmJobStatus
} from './status-types.js';

export interface FrontierSwarmRunInput {
  id?: string;
  plan: FrontierSwarmPlan;
  startedAt?: number;
  status?: FrontierSwarmJobStatus;
  events?: readonly FrontierSwarmEventInput[];
  results?: readonly FrontierSwarmJobResultInput[];
  metadata?: unknown;
}

export interface FrontierSwarmRun {
  kind: typeof FRONTIER_SWARM_RUN_KIND;
  version: typeof FRONTIER_SWARM_RUN_VERSION;
  id: string;
  planId: string;
  manifestId: string;
  startedAt: number;
  finishedAt?: number;
  status: FrontierSwarmJobStatus;
  jobs: FrontierSwarmJob[];
  events: FrontierSwarmEvent[];
  results: FrontierSwarmJobResult[];
  summary: FrontierSwarmSummary;
  metadata?: JsonObject;
}

export interface FrontierSwarmEventInput {
  id?: string;
  type: string;
  runId?: string;
  jobId?: string;
  taskId?: string;
  lane?: string;
  layer?: string;
  compute?: string;
  at?: number;
  message?: string;
  data?: unknown;
  metadata?: unknown;
}

export interface FrontierSwarmEvent {
  kind: typeof FRONTIER_SWARM_EVENT_KIND;
  version: typeof FRONTIER_SWARM_EVENT_VERSION;
  id: string;
  type: string;
  runId?: string;
  jobId?: string;
  taskId?: string;
  lane?: string;
  layer?: string;
  compute?: string;
  at: number;
  message?: string;
  data?: JsonValue;
  metadata?: JsonObject;
}

export type FrontierSwarmMailboxScope = 'global' | 'lane' | 'job' | string;

export interface FrontierSwarmMailboxInput {
  id?: string;
  runId?: string;
  scope?: FrontierSwarmMailboxScope;
  lane?: string;
  jobId?: string;
  path?: string;
  eventTypes?: readonly string[];
  appendOnly?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmMailbox {
  kind: typeof FRONTIER_SWARM_MAILBOX_KIND;
  version: typeof FRONTIER_SWARM_MAILBOX_VERSION;
  id: string;
  runId?: string;
  scope: FrontierSwarmMailboxScope;
  lane?: string;
  jobId?: string;
  path?: string;
  eventTypes: string[];
  appendOnly: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmEventStreamInput {
  id?: string;
  runId?: string;
  root?: string;
  lanes?: readonly (string | FrontierSwarmLaneInput | FrontierSwarmLane)[];
  eventTypes?: readonly string[];
  appendOnly?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmEventStream {
  kind: typeof FRONTIER_SWARM_EVENT_STREAM_KIND;
  version: typeof FRONTIER_SWARM_EVENT_STREAM_VERSION;
  id: string;
  runId?: string;
  root?: string;
  appendOnly: boolean;
  global: FrontierSwarmMailbox;
  lanes: Record<string, FrontierSwarmMailbox>;
  eventTypes: string[];
  metadata?: JsonObject;
  summary: {
    mailboxCount: number;
    laneCount: number;
    eventTypeCount: number;
  };
}
