import type {
  JsonObject,
  JsonValue
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_KIND,
  FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_VERSION,
  FRONTIER_SWARM_FIXTURE_CATALOG_KIND,
  FRONTIER_SWARM_FIXTURE_CATALOG_VERSION,
  FRONTIER_SWARM_PROGRESS_MODEL_KIND,
  FRONTIER_SWARM_PROGRESS_MODEL_VERSION,
  FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_KIND,
  FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_VERSION,
  FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_KIND,
  FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_VERSION
} from './constants.js';
import type {
  FrontierSwarmNamedRef,
  FrontierSwarmNamedRefInput
} from './context-types.js';
import type {
  FrontierSwarmWatchpoint,
  FrontierSwarmWatchpointInput
} from './debug-types.js';
import type {
  FrontierSwarmCommand,
  FrontierSwarmCommandInput
} from './manifest-types.js';
import type {
  FrontierSwarmMergeBundle
} from './merge-types.js';
import type {
  FrontierSwarmDivergenceReport,
  FrontierSwarmDivergenceReportInput
} from './observability-types.js';
import type {
  FrontierSwarmParityOracleStatus,
  FrontierSwarmProgressStatus,
  FrontierSwarmQueueOverlayStatus
} from './status-types.js';

export interface FrontierSwarmReferenceOraclePlanInput {
  id?: string;
  serviceId?: string;
  subject?: string;
  fixtureId?: string;
  targets?: readonly { id: string; role?: string; command?: string | FrontierSwarmCommandInput; metadata?: unknown }[];
  window?: { start?: number; end?: number; focus?: string; metadata?: unknown };
  watchpoints?: readonly FrontierSwarmWatchpointInput[];
  artifactKinds?: readonly string[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmReferenceOraclePlan {
  kind: typeof FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_KIND;
  version: typeof FRONTIER_SWARM_REFERENCE_ORACLE_PLAN_VERSION;
  id: string;
  serviceId?: string;
  subject?: string;
  fixtureId?: string;
  generatedAt: number;
  targets: { id: string; role: string; command?: FrontierSwarmCommand; metadata?: JsonObject }[];
  window?: { start?: number; end?: number; focus?: string; metadata?: JsonObject };
  watchpoints: FrontierSwarmWatchpoint[];
  artifactKinds: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmReferenceOracleResponseInput {
  id?: string;
  planId?: string;
  status?: FrontierSwarmParityOracleStatus;
  subject?: string;
  targetResults?: readonly { targetId: string; status?: FrontierSwarmParityOracleStatus; artifacts?: readonly FrontierSwarmNamedRefInput[]; metadata?: unknown }[];
  divergence?: FrontierSwarmDivergenceReportInput;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmReferenceOracleResponse {
  kind: typeof FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_KIND;
  version: typeof FRONTIER_SWARM_REFERENCE_ORACLE_RESPONSE_VERSION;
  id: string;
  planId?: string;
  status: FrontierSwarmParityOracleStatus;
  subject?: string;
  generatedAt: number;
  targetResults: { targetId: string; status: FrontierSwarmParityOracleStatus; artifacts: FrontierSwarmNamedRef[]; metadata?: JsonObject }[];
  divergence?: FrontierSwarmDivergenceReport;
  metadata?: JsonObject;
}

export interface FrontierSwarmRoutingHintInput {
  artifactKind?: string;
  pathPattern?: string;
  lane?: string;
  bucket?: FrontierSwarmQueueOverlayStatus;
  reason?: string;
  metadata?: unknown;
}

export interface FrontierSwarmRoutingHint {
  artifactKind?: string;
  pathPattern?: string;
  lane?: string;
  bucket: FrontierSwarmQueueOverlayStatus;
  reason: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmArtifactRoutingPlanInput {
  id?: string;
  bundles?: readonly FrontierSwarmMergeBundle[];
  artifacts?: readonly FrontierSwarmNamedRefInput[];
  hints?: readonly FrontierSwarmRoutingHintInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmArtifactRoutingPlan {
  kind: typeof FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_KIND;
  version: typeof FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_VERSION;
  id: string;
  generatedAt: number;
  routes: { artifact: FrontierSwarmNamedRef; bucket: FrontierSwarmQueueOverlayStatus; lane?: string; reasons: string[] }[];
  byBucket: Record<string, string[]>;
  summary: { routeCount: number; bucketCount: number };
  metadata?: JsonObject;
}

export interface FrontierSwarmFixtureInput {
  id: string;
  title?: string;
  description?: string;
  state?: unknown;
  artifacts?: readonly FrontierSwarmNamedRefInput[];
  setupCommands?: readonly (string | FrontierSwarmCommandInput)[];
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmFixture {
  id: string;
  title: string;
  description?: string;
  state?: JsonValue;
  artifacts: FrontierSwarmNamedRef[];
  setupCommands: FrontierSwarmCommand[];
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmFixtureCatalogInput {
  id?: string;
  fixtures?: readonly FrontierSwarmFixtureInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmFixtureCatalog {
  kind: typeof FRONTIER_SWARM_FIXTURE_CATALOG_KIND;
  version: typeof FRONTIER_SWARM_FIXTURE_CATALOG_VERSION;
  id: string;
  generatedAt: number;
  fixtures: FrontierSwarmFixture[];
  byTag: Record<string, string[]>;
  summary: { fixtureCount: number; tagCount: number };
  metadata?: JsonObject;
}

export interface FrontierSwarmProgressItemInput {
  id: string;
  surface?: string;
  status?: FrontierSwarmProgressStatus;
  evidencePaths?: readonly string[];
  blockers?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmProgressItem {
  id: string;
  surface?: string;
  status: FrontierSwarmProgressStatus;
  evidencePaths: string[];
  blockers: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmProgressModelInput {
  id?: string;
  items?: readonly FrontierSwarmProgressItemInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmProgressModel {
  kind: typeof FRONTIER_SWARM_PROGRESS_MODEL_KIND;
  version: typeof FRONTIER_SWARM_PROGRESS_MODEL_VERSION;
  id: string;
  generatedAt: number;
  items: FrontierSwarmProgressItem[];
  byStatus: Record<string, string[]>;
  summary: { itemCount: number; acceptedCount: number; blockedCount: number };
  metadata?: JsonObject;
}
