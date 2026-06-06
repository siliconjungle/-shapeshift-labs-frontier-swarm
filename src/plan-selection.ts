import { matchesGlob } from './internal.js';
import type { FrontierSwarmManifest, FrontierSwarmTask } from './index.js';
import type {
  FrontierSwarmPlanFilter,
  FrontierSwarmSelectionPriorityInput,
  FrontierSwarmTaskSelectionEntry,
  FrontierSwarmTaskSelectionSummary
} from './plan.js';

export function selectPlanTasks(manifest: FrontierSwarmManifest, tasks: readonly FrontierSwarmTask[], options: FrontierSwarmPlanFilter): FrontierSwarmTask[] {
  const lanes = new Set(options.lanes ?? []);
  const layers = new Set(options.layers ?? []);
  const statuses = new Set(options.statuses ?? []);
  const selectors = (options.selectors ?? []).map((selector) => selector.toLowerCase());
  const completed = new Set(manifest.policy.completedStatuses);
  const limit = options.limit === undefined ? tasks.length : Math.max(0, Math.floor(options.limit));
  return tasks
    .filter((task) => !task.lane || manifest.lanes.some((lane) => lane.id === task.lane))
    .filter((task) => lanes.size === 0 || (task.lane !== undefined && lanes.has(task.lane)))
    .filter((task) => layers.size === 0 || taskLayer(manifest, task) !== undefined && layers.has(taskLayer(manifest, task) as string))
    .filter((task) => statuses.size === 0 || statuses.has(task.status))
    .filter((task) => options.includeCompleted || !completed.has(task.status))
    .filter((task) => selectors.length === 0 || selectors.some((selector) => searchableTask(task).includes(selector)))
    .sort((left, right) => left.priority - right.priority || left.id.localeCompare(right.id))
    .slice(0, limit);
}

export function createPlanSelectionEntry(
  manifest: FrontierSwarmManifest,
  task: FrontierSwarmTask,
  priority?: FrontierSwarmSelectionPriorityInput
): FrontierSwarmTaskSelectionEntry {
  const lane = task.lane ? manifest.lanes.find((entry) => entry.id === task.lane) : undefined;
  return {
    task,
    ...(lane ? { lane } : {}),
    ownershipWarnings: selectionOwnershipWarnings(task, lane),
    selectionPriority: selectionPriority(task, priority)
  };
}

export function roundRobinPlanSelectionByLane(entries: readonly FrontierSwarmTaskSelectionEntry[]): FrontierSwarmTaskSelectionEntry[] {
  const groups = new Map<string, FrontierSwarmTaskSelectionEntry[]>();
  for (const entry of entries) groups.set(entry.task.lane ?? 'unassigned', [...(groups.get(entry.task.lane ?? 'unassigned') ?? []), entry]);
  const selected: FrontierSwarmTaskSelectionEntry[] = [];
  while (Array.from(groups.values()).some((group) => group.length > 0)) {
    for (const group of groups.values()) {
      const next = group.shift();
      if (next) selected.push(next);
    }
  }
  return selected;
}

export function summarizePlanTaskSelection(entries: readonly FrontierSwarmTaskSelectionEntry[]): FrontierSwarmTaskSelectionSummary {
  return entries.reduce<FrontierSwarmTaskSelectionSummary>((summary, entry) => {
    const lane = entry.task.lane ?? 'unassigned';
    summary.total += 1;
    summary.byLane[lane] = (summary.byLane[lane] ?? 0) + 1;
    summary.byWorkKind[entry.task.workKind] = (summary.byWorkKind[entry.task.workKind] ?? 0) + 1;
    summary.ownershipWarningCount += entry.ownershipWarnings.length;
    return summary;
  }, { total: 0, byLane: {}, byWorkKind: {}, ownershipWarningCount: 0 });
}

function searchableTask(task: FrontierSwarmTask): string {
  return [
    task.id,
    task.title,
    task.objective,
    task.description,
    task.workKind,
    task.status,
    task.lane,
    task.layer,
    task.compute,
    ...task.sourceRefs,
    ...task.targetRefs,
    ...task.tags
  ].filter(Boolean).join(' ').toLowerCase();
}

function selectionOwnershipWarnings(task: FrontierSwarmTask, lane: FrontierSwarmTaskSelectionEntry['lane']): string[] {
  if (!lane || lane.allowedWrites.length === 0) return [];
  return task.targetRefs
    .filter((file) => !lane.allowedWrites.some((glob) => matchesGlob(file, glob)))
    .map((file) => `${file} is outside allowed write globs for ${lane.id}`);
}

function selectionPriority(task: FrontierSwarmTask, input?: FrontierSwarmSelectionPriorityInput): number {
  const statusRank = (input?.statuses ?? {})[task.status] ?? input?.defaultStatusRank ?? 100;
  const workKindRank = (input?.workKinds ?? {})[task.workKind] ?? input?.defaultWorkKindRank ?? 100;
  return statusRank * (input?.statusWeight ?? 1000) + workKindRank * (input?.workKindWeight ?? 1);
}

function taskLayer(manifest: FrontierSwarmManifest, task: FrontierSwarmTask): string | undefined {
  if (task.layer) return task.layer;
  const lane = task.lane ? manifest.lanes.find((entry) => entry.id === task.lane) : undefined;
  return lane?.layer ?? manifest.policy.defaultLayer;
}
