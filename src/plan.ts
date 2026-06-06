import type { JsonObject } from '@shapeshift-labs/frontier';
import { stableHash, toJsonObject } from './internal.js';
import { compileSwarm, defineSwarmTasks } from './index.js';
import {
  createPlanJob,
  createPlanJobGraph,
  normalizePlanScheduleLimits,
  normalizePlanTaskInput,
  normalizePlanTaskList,
  resolvePlanTaskCompute,
  summarizePlanJobs,
  validatePlanTasksForManifest
} from './plan-helpers.js';
import {
  createPlanSelectionEntry,
  roundRobinPlanSelectionByLane,
  selectPlanTasks,
  summarizePlanTaskSelection
} from './plan-selection.js';
import type {
  FrontierSwarmBudget,
  FrontierSwarmCommand,
  FrontierSwarmCompiled,
  FrontierSwarmCompute,
  FrontierSwarmJobStatus,
  FrontierSwarmLane,
  FrontierSwarmManifest,
  FrontierSwarmManifestInput,
  FrontierSwarmOwnershipRegion,
  FrontierSwarmResourceRequirements,
  FrontierSwarmReviewPolicy,
  FrontierSwarmSummary,
  FrontierSwarmTask,
  FrontierSwarmTaskInput,
  FrontierSwarmTaskSetInput,
  FrontierSwarmValidation,
  FrontierSwarmValidationIssue
} from './index.js';

export const FRONTIER_SWARM_PLAN_KIND = 'frontier.swarm.plan';
export const FRONTIER_SWARM_PLAN_VERSION = 1;

export interface FrontierSwarmPlanFilter {
  lanes?: readonly string[];
  layers?: readonly string[];
  statuses?: readonly string[];
  selectors?: readonly string[];
  includeCompleted?: boolean;
  limit?: number;
  compute?: string;
}

export interface FrontierSwarmSelectionPriorityInput {
  statuses?: Record<string, number>;
  workKinds?: Record<string, number>;
  defaultStatusRank?: number;
  defaultWorkKindRank?: number;
  statusWeight?: number;
  workKindWeight?: number;
}

export interface FrontierSwarmTaskSelectionInput extends FrontierSwarmPlanFilter {
  workKinds?: readonly string[];
  spreadLanes?: boolean;
  includeOwnershipWarnings?: boolean;
  assignSelectionPriority?: boolean;
  priority?: FrontierSwarmSelectionPriorityInput;
}

export interface FrontierSwarmTaskSelectionEntry {
  task: FrontierSwarmTask;
  lane?: FrontierSwarmLane;
  ownershipWarnings: string[];
  selectionPriority: number;
}

export interface FrontierSwarmTaskSelectionSummary {
  total: number;
  byLane: Record<string, number>;
  byWorkKind: Record<string, number>;
  ownershipWarningCount: number;
}

export interface FrontierSwarmTaskSelection {
  tasks: FrontierSwarmTask[];
  entries: FrontierSwarmTaskSelectionEntry[];
  summary: FrontierSwarmTaskSelectionSummary;
}

export interface FrontierSwarmPlanInput extends FrontierSwarmPlanFilter {
  id?: string;
  runId?: string;
  now?: number;
  maxReadyJobs?: number;
  maxLaneConcurrency?: Record<string, number>;
  maxConcurrencyKeyConcurrency?: Record<string, number>;
  maxComputeConcurrency?: Record<string, number>;
  resourceQuotas?: Record<string, number>;
  metadata?: unknown;
}

export interface FrontierSwarmPlan {
  kind: typeof FRONTIER_SWARM_PLAN_KIND;
  version: typeof FRONTIER_SWARM_PLAN_VERSION;
  id: string;
  runId: string;
  manifestId: string;
  createdAt: number;
  filters: FrontierSwarmPlanFilter;
  limits: FrontierSwarmScheduleLimits;
  validation: FrontierSwarmValidation;
  jobs: FrontierSwarmJob[];
  graph: FrontierSwarmJobGraph;
  summary: FrontierSwarmSummary;
  metadata?: JsonObject;
}

export interface FrontierSwarmScheduleLimits {
  maxReadyJobs?: number;
  maxLaneConcurrency: Record<string, number>;
  maxConcurrencyKeyConcurrency: Record<string, number>;
  maxComputeConcurrency: Record<string, number>;
  resourceQuotas: Record<string, number>;
}

export interface FrontierSwarmJob {
  id: string;
  taskId: string;
  title: string;
  lane: string;
  layer?: string;
  compute: FrontierSwarmCompute;
  status: FrontierSwarmJobStatus;
  priority: number;
  task: FrontierSwarmTask;
  allowedWrites: string[];
  sharedReadOnly: string[];
  neverEdit: string[];
  ownershipRegions: FrontierSwarmOwnershipRegion[];
  ownedRegions: string[];
  changedRegions: string[];
  capabilities: string[];
  resourceRequirements?: FrontierSwarmResourceRequirements;
  worktreePath?: string;
  evidencePrefix?: string;
  concurrencyKey: string;
  ownershipWarnings: string[];
  verification: FrontierSwarmCommand[];
  acceptance: string[];
  dependsOn: string[];
  budget?: FrontierSwarmBudget;
  review: FrontierSwarmReviewPolicy;
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmJobGraph {
  nodes: string[];
  edges: FrontierSwarmJobGraphEdge[];
  dependentsByJobId: Record<string, string[]>;
  dependenciesByJobId: Record<string, string[]>;
  roots: string[];
  leaves: string[];
  issues: FrontierSwarmValidationIssue[];
}

export interface FrontierSwarmJobGraphEdge {
  from: string;
  to: string;
  type: 'depends-on' | 'parent-task';
}

export function createSwarmPlan(
  manifestInput: FrontierSwarmManifest | FrontierSwarmManifestInput,
  taskInput: readonly FrontierSwarmTaskInput[] | FrontierSwarmTaskSetInput | readonly FrontierSwarmTask[],
  options: FrontierSwarmPlanInput = {}
): FrontierSwarmPlan {
  const compiled = compileSwarm(manifestInput);
  const tasks = normalizePlanTaskList(taskInput, defineSwarmTasks);
  const jobs = selectPlanTasks(compiled.manifest, tasks, options).map((task) => createPlanJob(compiled, task, options));
  const id = options.id ?? 'swarm-plan:' + stableHash([compiled.manifest.id, jobs.map((job) => job.id), options]);
  const graph = createPlanJobGraph(jobs);
  const validation = validatePlanTasksForManifest(compiled, tasks, graph);
  return {
    kind: FRONTIER_SWARM_PLAN_KIND,
    version: FRONTIER_SWARM_PLAN_VERSION,
    id,
    runId: options.runId ?? id.replace(/^swarm-plan:/, 'swarm-run:'),
    manifestId: compiled.manifest.id,
    createdAt: options.now ?? Date.now(),
    filters: {
      lanes: options.lanes ? [...options.lanes] : undefined,
      layers: options.layers ? [...options.layers] : undefined,
      statuses: options.statuses ? [...options.statuses] : undefined,
      selectors: options.selectors ? [...options.selectors] : undefined,
      includeCompleted: options.includeCompleted,
      limit: options.limit,
      compute: options.compute
    },
    limits: normalizePlanScheduleLimits(compiled.manifest, options),
    validation,
    jobs,
    graph,
    summary: summarizePlanJobs(jobs),
    ...(toJsonObject(options.metadata) ? { metadata: toJsonObject(options.metadata) } : {})
  };
}

export function createSwarmTaskSelection(
  manifestInput: FrontierSwarmManifest | FrontierSwarmManifestInput,
  taskInput: readonly FrontierSwarmTaskInput[] | FrontierSwarmTaskSetInput | readonly FrontierSwarmTask[],
  options: FrontierSwarmTaskSelectionInput = {}
): FrontierSwarmTaskSelection {
  const manifest = compileSwarm(manifestInput).manifest;
  const tasks = normalizePlanTaskList(taskInput, defineSwarmTasks);
  const workKinds = new Set(options.workKinds ?? []);
  const limit = options.limit === undefined ? tasks.length : Math.max(0, Math.floor(options.limit));
  const candidates = selectPlanTasks(manifest, tasks, { ...options, limit: undefined })
    .filter((task) => workKinds.size === 0 || workKinds.has(task.workKind))
    .map((task) => createPlanSelectionEntry(manifest, task, options.priority))
    .filter((entry) => options.includeOwnershipWarnings || entry.ownershipWarnings.length === 0)
    .sort((left, right) => (
      left.selectionPriority - right.selectionPriority
      || left.task.priority - right.task.priority
      || left.task.id.localeCompare(right.task.id)
    ));
  const ordered = options.spreadLanes ? roundRobinPlanSelectionByLane(candidates) : candidates;
  const entries = ordered.slice(0, limit).map((entry, index) => {
    if (!options.assignSelectionPriority) return entry;
    return { ...entry, task: { ...entry.task, priority: index } };
  });
  return {
    tasks: entries.map((entry) => entry.task),
    entries,
    summary: summarizePlanTaskSelection(entries)
  };
}

export function resolveSwarmCompute(
  manifestInput: FrontierSwarmManifest | FrontierSwarmManifestInput,
  taskInput: FrontierSwarmTask | FrontierSwarmTaskInput
): FrontierSwarmCompute {
  const compiled: FrontierSwarmCompiled = compileSwarm(manifestInput);
  const task = normalizePlanTaskInput(taskInput, defineSwarmTasks);
  return resolvePlanTaskCompute(compiled, task);
}
