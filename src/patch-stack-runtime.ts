import { createSwarmHotspotReport } from './merge-wrappers.js';
import { FRONTIER_SWARM_LANE_PLAYBOOK_KIND, FRONTIER_SWARM_LANE_PLAYBOOK_VERSION, FRONTIER_SWARM_PATCH_STACK_PLAN_KIND, FRONTIER_SWARM_PATCH_STACK_PLAN_VERSION } from './constants.js';
import { patchStackKey, riskRank } from './merge-plan-helpers.js';
import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmCommand, FrontierSwarmCommandInput, FrontierSwarmLanePlaybook, FrontierSwarmLanePlaybookInput, FrontierSwarmMergeIndexEntry, FrontierSwarmPatchStack, FrontierSwarmPatchStackPlan, FrontierSwarmPatchStackPlanInput } from './types.js';

export function createSwarmLanePlaybook(input: FrontierSwarmLanePlaybookInput): FrontierSwarmLanePlaybook {
  const generatedAt = input.generatedAt ?? Date.now();
  const successful = (input.successfulBundles ?? []).filter((bundle) => bundle.status === 'completed' || bundle.status === 'verified' || bundle.autoMergeable);
  const hotPaths = createSwarmHotspotReport({ bundles: successful, threshold: 2, generatedAt }).entries
    .filter((entry) => entry.touchCount >= 2)
    .map((entry) => entry.path);
  return {
    kind: FRONTIER_SWARM_LANE_PLAYBOOK_KIND,
    version: FRONTIER_SWARM_LANE_PLAYBOOK_VERSION,
    id: input.id ?? 'swarm-lane-playbook:' + stableHash([input.lane, successful.map((bundle) => bundle.jobId), input.notes, generatedAt]),
    lane: normalizeId(input.lane, 'playbook lane'),
    title: input.title ?? `${titleFromId(input.lane)} Playbook`,
    generatedAt,
    notes: uniqueStrings(input.notes ?? []),
    commands: normalizeCommands(input.commands ?? []),
    avoidInvestigating: uniqueStrings(input.avoidInvestigating ?? []),
    evidencePatterns: uniqueStrings(input.evidencePatterns ?? successful.flatMap((bundle) => bundle.evidencePaths)),
    successfulJobIds: uniqueStrings(successful.map((bundle) => bundle.jobId)),
    hotPaths,
    changedRegions: uniqueStrings(successful.flatMap((bundle) => bundle.changedRegions)),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
export function createSwarmPatchStackPlan(input: FrontierSwarmPatchStackPlanInput): FrontierSwarmPatchStackPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const maxStackSize = Math.max(1, Math.floor(input.maxStackSize ?? 8));
  const groups = new Map<string, FrontierSwarmMergeIndexEntry[]>();
  for (const entry of input.index.entries) {
    const key = patchStackKey(entry);
    groups.set(key, [...(groups.get(key) ?? []), entry]);
  }
  const stacks: FrontierSwarmPatchStack[] = [];
  for (const [key, entries] of Array.from(groups.entries()).sort((left, right) => left[0].localeCompare(right[0]))) {
    const sorted = [...entries].sort((left, right) => riskRank(left.riskLevel) - riskRank(right.riskLevel) || left.jobId.localeCompare(right.jobId));
    for (let index = 0; index < sorted.length; index += maxStackSize) {
      const slice = sorted.slice(index, index + maxStackSize);
      const jobIds = slice.map((entry) => entry.jobId);
      const conflicts = input.index.conflicts.filter((conflict) => conflict.jobIds.some((jobId) => jobIds.includes(jobId)));
      stacks.push({
        id: 'swarm-patch-stack:' + stableHash([input.index.id, key, index, jobIds]),
        title: titleFromId(key),
        ...(slice[0]?.lane ? { lane: slice[0].lane } : {}),
        jobIds,
        changedPaths: uniqueStrings(slice.flatMap((entry) => entry.changedPaths)),
        changedRegions: uniqueStrings(slice.flatMap((entry) => entry.changedRegions)),
        riskLevels: uniqueStrings(slice.map((entry) => entry.riskLevel)),
        dispositions: uniqueStrings(slice.map((entry) => entry.disposition)),
        conflicts,
        gateHints: uniqueStrings(slice.flatMap((entry) => entry.evidencePaths.filter((file) => file.endsWith('.json') || file.endsWith('.jsonl'))))
      });
    }
  }
  return {
    kind: FRONTIER_SWARM_PATCH_STACK_PLAN_KIND,
    version: FRONTIER_SWARM_PATCH_STACK_PLAN_VERSION,
    id: input.id ?? 'swarm-patch-stack-plan:' + stableHash([input.index.id, stacks, generatedAt]),
    mergeIndexId: input.index.id,
    generatedAt,
    stacks,
    summary: {
      stackCount: stacks.length,
      jobCount: input.index.entries.length,
      conflictedStackCount: stacks.filter((stack) => stack.conflicts.length > 0).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function normalizeId(value: string, label: string): string {
  const id = String(value || '').trim();
  if (!id) throw new Error(`Missing ${label}`);
  return id;
}
function titleFromId(id: string): string {
  const parts = String(id).split(/[.:/_-]+/).filter(Boolean);
  return parts.length ? parts.map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ') : String(id);
}
function normalizeCommands(input: readonly (string | FrontierSwarmCommandInput)[]): FrontierSwarmCommand[] {
  return input.map((entry) => {
    if (typeof entry === 'string') {
      return { name: entry, command: entry, args: [], required: true };
    }
    return {
      name: entry.name ?? [entry.command, ...(entry.args ?? [])].join(' '),
      command: entry.command,
      args: [...(entry.args ?? [])],
      required: entry.required ?? true,
      ...(entry.cwd ? { cwd: entry.cwd } : {}),
      ...(toJsonObject(entry.metadata) ? { metadata: toJsonObject(entry.metadata) } : {})
    };
  });
}
