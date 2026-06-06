import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_MANIFEST_KIND,
  FRONTIER_SWARM_MANIFEST_VERSION
} from './constants.js';
import type {
  FrontierSwarmComputeKind,
  FrontierSwarmPolicyMode,
  FrontierSwarmReasoningEffort
} from './status-types.js';

export interface FrontierSwarmComputeInput {
  id: string;
  kind?: FrontierSwarmComputeKind;
  title?: string;
  model?: string;
  reasoningEffort?: FrontierSwarmReasoningEffort;
  serviceTier?: string;
  profile?: string;
  sandbox?: string;
  approval?: string;
  maxConcurrency?: number;
  timeoutMs?: number;
  metadata?: unknown;
}

export interface FrontierSwarmCompute {
  id: string;
  kind: FrontierSwarmComputeKind;
  title?: string;
  model?: string;
  reasoningEffort?: FrontierSwarmReasoningEffort;
  serviceTier?: string;
  profile?: string;
  sandbox?: string;
  approval?: string;
  maxConcurrency?: number;
  timeoutMs?: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmLayerInput {
  id: string;
  title?: string;
  description?: string;
  parentId?: string;
  compute?: string;
  defaultCompute?: string;
  childCompute?: Record<string, string>;
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmLayer {
  id: string;
  title: string;
  description?: string;
  parentId?: string;
  compute?: string;
  defaultCompute?: string;
  childCompute: Record<string, string>;
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmOwnershipRegionInput {
  id: string;
  title?: string;
  description?: string;
  globs?: readonly string[];
  paths?: readonly string[];
  selectors?: readonly string[];
  owner?: string;
  metadata?: unknown;
}

export interface FrontierSwarmOwnershipRegion {
  id: string;
  title: string;
  description?: string;
  globs: string[];
  selectors: string[];
  owner?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmLaneInput {
  id: string;
  title?: string;
  description?: string;
  layer?: string;
  compute?: string;
  allowedWrites?: readonly string[];
  allowedGlobs?: readonly string[];
  sharedReadOnly?: readonly string[];
  neverEdit?: readonly string[];
  ownershipRegions?: readonly FrontierSwarmOwnershipRegionInput[];
  capabilities?: readonly string[];
  resourceRequirements?: FrontierSwarmResourceRequirementsInput;
  worktreePath?: string;
  evidencePrefix?: string;
  evidenceOutDirPrefix?: string;
  concurrencyKey?: string;
  maxConcurrency?: number;
  handoffCommands?: readonly (string | FrontierSwarmCommandInput)[];
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmLane {
  id: string;
  title: string;
  description?: string;
  layer?: string;
  compute?: string;
  allowedWrites: string[];
  sharedReadOnly: string[];
  neverEdit: string[];
  ownershipRegions: FrontierSwarmOwnershipRegion[];
  capabilities: string[];
  resourceRequirements?: FrontierSwarmResourceRequirements;
  worktreePath?: string;
  evidencePrefix?: string;
  concurrencyKey: string;
  maxConcurrency?: number;
  handoffCommands: FrontierSwarmCommand[];
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmCommandInput {
  name?: string;
  command: string;
  args?: readonly string[];
  required?: boolean;
  cwd?: string;
  metadata?: unknown;
}

export interface FrontierSwarmCommand {
  name: string;
  command: string;
  args: string[];
  required: boolean;
  cwd?: string;
  metadata?: JsonObject;
}

export interface FrontierSwarmBrowserResourceInput {
  required?: boolean;
  portPool?: readonly (string | number)[];
  profileDir?: string;
  profileDirPrefix?: string;
  maxConcurrency?: number;
  headless?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmBrowserResource {
  required: boolean;
  portPool: string[];
  profileDir?: string;
  profileDirPrefix?: string;
  maxConcurrency?: number;
  headless?: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmResourceRequirementsInput {
  capabilities?: readonly string[];
  resources?: Record<string, number>;
  browser?: FrontierSwarmBrowserResourceInput;
  metadata?: unknown;
}

export interface FrontierSwarmResourceRequirements {
  capabilities: string[];
  resources: Record<string, number>;
  browser?: FrontierSwarmBrowserResource;
  metadata?: JsonObject;
}

export interface FrontierSwarmPolicyInput {
  mode?: FrontierSwarmPolicyMode;
  defaultConcurrency?: number;
  defaultCompute?: string;
  defaultLayer?: string;
  completedStatuses?: readonly string[];
  sharedReadOnly?: readonly string[];
  neverEditWithoutParent?: readonly string[];
  requireCleanWorktree?: boolean;
  metadata?: unknown;
}

export interface FrontierSwarmPolicy {
  mode: FrontierSwarmPolicyMode;
  defaultConcurrency: number;
  defaultCompute: string;
  defaultLayer?: string;
  completedStatuses: string[];
  sharedReadOnly: string[];
  neverEditWithoutParent: string[];
  requireCleanWorktree: boolean;
  metadata?: JsonObject;
}

export interface FrontierSwarmManifestInput {
  id?: string;
  title?: string;
  description?: string;
  package?: string;
  feature?: string;
  owner?: string;
  compute?: readonly FrontierSwarmComputeInput[];
  layers?: readonly FrontierSwarmLayerInput[];
  lanes?: readonly FrontierSwarmLaneInput[];
  policy?: FrontierSwarmPolicyInput;
  resources?: readonly string[];
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmManifest {
  kind: typeof FRONTIER_SWARM_MANIFEST_KIND;
  version: typeof FRONTIER_SWARM_MANIFEST_VERSION;
  id: string;
  title: string;
  description?: string;
  package?: string;
  feature?: string;
  owner?: string;
  compute: FrontierSwarmCompute[];
  layers: FrontierSwarmLayer[];
  lanes: FrontierSwarmLane[];
  policy: FrontierSwarmPolicy;
  resources: string[];
  tags: string[];
  metadata?: JsonObject;
  summary: FrontierSwarmSummary;
}

export interface FrontierSwarmSummary {
  computeCount: number;
  layerCount: number;
  laneCount: number;
  taskCount?: number;
  jobCount?: number;
  completedCount?: number;
  blockedCount?: number;
  failedCount?: number;
  ownershipViolationCount?: number;
}
