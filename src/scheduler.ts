import type { JsonObject } from '@shapeshift-labs/frontier';
import { cloneJsonValue, countBy, positiveNumber, stableHash, toJsonObject } from './internal.js';
import type { FrontierSwarmJob, FrontierSwarmPlan, FrontierSwarmScheduleLimits } from './plan.js';
import type { FrontierSwarmMergeIndex, FrontierSwarmResourceRequirements, FrontierSwarmRun } from './index.js';

export const FRONTIER_SWARM_SCHEDULE_KIND = 'frontier.swarm.schedule';
export const FRONTIER_SWARM_SCHEDULE_VERSION = 1;
export const FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_KIND = 'frontier.swarm.scheduler-recommendations';
export const FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_VERSION = 1;

export interface FrontierSwarmScheduleInput {
  plan: FrontierSwarmPlan;
  run?: FrontierSwarmRun;
  now?: number;
  maxReadyJobs?: number;
  maxLaneConcurrency?: Record<string, number>;
  maxConcurrencyKeyConcurrency?: Record<string, number>;
  maxComputeConcurrency?: Record<string, number>;
  resourceQuotas?: Record<string, number>;
}

export interface FrontierSwarmSchedule {
  kind: typeof FRONTIER_SWARM_SCHEDULE_KIND;
  version: typeof FRONTIER_SWARM_SCHEDULE_VERSION;
  id: string;
  planId: string;
  runId?: string;
  createdAt: number;
  ready: FrontierSwarmScheduledJob[];
  blocked: FrontierSwarmBlockedJob[];
  running: FrontierSwarmRunningJob[];
  completed: string[];
  failed: string[];
  summary: FrontierSwarmScheduleSummary;
}

export interface FrontierSwarmScheduledJob {
  jobId: string;
  taskId: string;
  lane: string;
  compute: string;
  concurrencyKey: string;
  priority: number;
  dependsOn: string[];
  capabilities: string[];
  resourceRequirements?: FrontierSwarmResourceRequirements;
}

export interface FrontierSwarmBlockedJob extends FrontierSwarmScheduledJob {
  reasons: string[];
  waitingFor: string[];
}

export interface FrontierSwarmRunningJob {
  jobId: string;
  lane: string;
  compute: string;
  concurrencyKey: string;
  capabilities: string[];
  resourceRequirements?: FrontierSwarmResourceRequirements;
}

export interface FrontierSwarmScheduleSummary {
  jobCount: number;
  readyCount: number;
  blockedCount: number;
  runningCount: number;
  completedCount: number;
  failedCount: number;
}

export interface FrontierSwarmSchedulerRecommendationsInput {
  schedule: FrontierSwarmSchedule;
  mergeIndex?: FrontierSwarmMergeIndex;
  id?: string;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmSchedulerRecommendation {
  id: string;
  reason: string;
  jobIds: string[];
  lane?: string;
  resource?: string;
  action: string;
  priority: number;
  metadata?: JsonObject;
}

export interface FrontierSwarmSchedulerRecommendations {
  kind: typeof FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_KIND;
  version: typeof FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_VERSION;
  id: string;
  scheduleId: string;
  generatedAt: number;
  recommendations: FrontierSwarmSchedulerRecommendation[];
  summary: { recommendationCount: number };
  metadata?: JsonObject;
}

export function createSwarmSchedule(input: FrontierSwarmPlan | FrontierSwarmScheduleInput): FrontierSwarmSchedule {
  const plan = 'plan' in input ? input.plan : input;
  const run = 'plan' in input ? input.run : undefined;
  const createdAt = 'plan' in input ? input.now ?? Date.now() : Date.now();
  const limits = mergeScheduleLimits(plan.limits, 'plan' in input ? input : {});
  const resultsByJob = new Map((run?.results ?? []).map((result) => [result.jobId, result]));
  const completed = new Set<string>();
  const failed = new Set<string>();
  for (const result of resultsByJob.values()) {
    if (result.status === 'completed' || result.status === 'verified') completed.add(result.jobId);
    if (result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0) failed.add(result.jobId);
  }
  const runningJobs = (run?.jobs ?? plan.jobs)
    .filter((job) => job.status === 'running')
    .map((job) => ({
      jobId: job.id,
      lane: job.lane,
      compute: job.compute.id,
      concurrencyKey: job.concurrencyKey,
      capabilities: [...job.capabilities],
      ...(job.resourceRequirements ? { resourceRequirements: cloneJsonValue(job.resourceRequirements) as FrontierSwarmResourceRequirements } : {})
    }));
  const runningByLane = countBy(runningJobs.map((job) => job.lane));
  const runningByKey = countBy(runningJobs.map((job) => job.concurrencyKey));
  const runningByCompute = countBy(runningJobs.map((job) => job.compute));
  const runningByResource = resourceUsageFromScheduled(runningJobs);
  const ready: FrontierSwarmScheduledJob[] = [];
  const blocked: FrontierSwarmBlockedJob[] = [];
  const sortedJobs = [...plan.jobs].sort((left, right) => left.priority - right.priority || left.id.localeCompare(right.id));
  for (const job of sortedJobs) {
    if (completed.has(job.id) || failed.has(job.id) || runningJobs.some((running) => running.jobId === job.id)) continue;
    const dependencyIds = plan.graph.dependenciesByJobId[job.id] ?? [];
    const waitingFor = dependencyIds.filter((dep) => !completed.has(dep));
    const reasons: string[] = [];
    if (waitingFor.length) reasons.push('waiting-for-dependencies');
    const laneMax = limits.maxLaneConcurrency[job.lane] ?? Number.POSITIVE_INFINITY;
    const keyMax = limits.maxConcurrencyKeyConcurrency[job.concurrencyKey] ?? Number.POSITIVE_INFINITY;
    const computeMax = limits.maxComputeConcurrency[job.compute.id] ?? job.compute.maxConcurrency ?? Number.POSITIVE_INFINITY;
    if ((runningByLane[job.lane] ?? 0) >= laneMax) reasons.push('lane-capacity');
    if ((runningByKey[job.concurrencyKey] ?? 0) >= keyMax) reasons.push('concurrency-key-capacity');
    if ((runningByCompute[job.compute.id] ?? 0) >= computeMax) reasons.push('compute-capacity');
    const scheduled = scheduleJob(job, dependencyIds);
    for (const resource of resourceQuotaViolations(scheduled, runningByResource, limits.resourceQuotas)) {
      reasons.push(`resource-capacity:${resource}`);
    }
    if (reasons.length) {
      blocked.push({ ...scheduled, reasons, waitingFor });
      continue;
    }
    if (limits.maxReadyJobs !== undefined && ready.length >= limits.maxReadyJobs) {
      blocked.push({ ...scheduled, reasons: ['ready-capacity'], waitingFor: [] });
      continue;
    }
    ready.push(scheduled);
    runningByLane[job.lane] = (runningByLane[job.lane] ?? 0) + 1;
    runningByKey[job.concurrencyKey] = (runningByKey[job.concurrencyKey] ?? 0) + 1;
    runningByCompute[job.compute.id] = (runningByCompute[job.compute.id] ?? 0) + 1;
    addResourceUsage(runningByResource, scheduled);
  }
  return {
    kind: FRONTIER_SWARM_SCHEDULE_KIND,
    version: FRONTIER_SWARM_SCHEDULE_VERSION,
    id: 'swarm-schedule:' + stableHash([plan.id, run?.id, ready.map((job) => job.jobId), blocked.map((job) => [job.jobId, job.reasons]), createdAt]),
    planId: plan.id,
    ...(run ? { runId: run.id } : {}),
    createdAt,
    ready,
    blocked,
    running: runningJobs,
    completed: Array.from(completed).sort(),
    failed: Array.from(failed).sort(),
    summary: {
      jobCount: plan.jobs.length,
      readyCount: ready.length,
      blockedCount: blocked.length,
      runningCount: runningJobs.length,
      completedCount: completed.size,
      failedCount: failed.size
    }
  };
}

export function createSwarmSchedulerRecommendations(input: FrontierSwarmSchedulerRecommendationsInput): FrontierSwarmSchedulerRecommendations {
  const generatedAt = input.generatedAt ?? Date.now();
  const recommendations: FrontierSwarmSchedulerRecommendation[] = [];
  const blockedByReason = new Map<string, FrontierSwarmBlockedJob[]>();
  for (const job of input.schedule.blocked) {
    for (const reason of job.reasons) blockedByReason.set(reason, [...(blockedByReason.get(reason) ?? []), job]);
  }
  for (const [reason, jobs] of blockedByReason) {
    const resource = reason.startsWith('resource-capacity:') ? reason.slice('resource-capacity:'.length) : undefined;
    recommendations.push({
      id: 'swarm-scheduler-recommendation:' + stableHash([input.schedule.id, reason, jobs.map((job) => job.jobId), generatedAt]),
      reason,
      jobIds: jobs.map((job) => job.jobId).sort(),
      ...(resource ? { resource } : {}),
      ...(jobs[0]?.lane ? { lane: jobs[0].lane } : {}),
      action: schedulerActionForReason(reason),
      priority: schedulerPriorityForReason(reason)
    });
  }
  for (const conflict of input.mergeIndex?.conflicts ?? []) {
    recommendations.push({
      id: 'swarm-scheduler-recommendation:' + stableHash([input.schedule.id, conflict.key, conflict.jobIds, generatedAt]),
      reason: `merge-conflict:${conflict.kind}`,
      jobIds: [...conflict.jobIds],
      action: 'serialize-conflicting-surface-or-split-ownership',
      priority: 15
    });
  }
  return {
    kind: FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_KIND,
    version: FRONTIER_SWARM_SCHEDULER_RECOMMENDATIONS_VERSION,
    id: input.id ?? 'swarm-scheduler-recommendations:' + stableHash([input.schedule.id, recommendations, generatedAt]),
    scheduleId: input.schedule.id,
    generatedAt,
    recommendations: recommendations.sort((left, right) => left.priority - right.priority || left.id.localeCompare(right.id)),
    summary: { recommendationCount: recommendations.length },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function mergeScheduleLimits(base: FrontierSwarmScheduleLimits, override: Partial<FrontierSwarmScheduleInput>): FrontierSwarmScheduleLimits {
  return {
    maxReadyJobs: positiveNumber(override.maxReadyJobs) ? Math.floor(override.maxReadyJobs as number) : base.maxReadyJobs,
    maxLaneConcurrency: { ...base.maxLaneConcurrency, ...(override.maxLaneConcurrency ?? {}) },
    maxConcurrencyKeyConcurrency: { ...base.maxConcurrencyKeyConcurrency, ...(override.maxConcurrencyKeyConcurrency ?? {}) },
    maxComputeConcurrency: { ...base.maxComputeConcurrency, ...(override.maxComputeConcurrency ?? {}) },
    resourceQuotas: { ...base.resourceQuotas, ...normalizeResourceQuotas(override.resourceQuotas ?? {}) }
  };
}

function scheduleJob(job: FrontierSwarmJob, dependsOn: readonly string[] = job.dependsOn): FrontierSwarmScheduledJob {
  return {
    jobId: job.id,
    taskId: job.taskId,
    lane: job.lane,
    compute: job.compute.id,
    concurrencyKey: job.concurrencyKey,
    priority: job.priority,
    dependsOn: [...dependsOn],
    capabilities: [...job.capabilities],
    ...(job.resourceRequirements ? { resourceRequirements: cloneJsonValue(job.resourceRequirements) as FrontierSwarmResourceRequirements } : {})
  };
}

function normalizeResourceQuotas(input: Record<string, number>): Record<string, number> {
  const quotas: Record<string, number> = {};
  for (const [resource, value] of Object.entries(input)) {
    if (positiveNumber(value)) quotas[resource] = value;
  }
  return quotas;
}

function resourceUsageFromScheduled(jobs: readonly (FrontierSwarmScheduledJob | FrontierSwarmRunningJob)[]): Record<string, number> {
  const usage: Record<string, number> = {};
  for (const job of jobs) addResourceUsage(usage, job);
  return usage;
}

function addResourceUsage(usage: Record<string, number>, job: FrontierSwarmScheduledJob | FrontierSwarmRunningJob): void {
  for (const [resource, amount] of Object.entries(job.resourceRequirements?.resources ?? {})) {
    usage[resource] = (usage[resource] ?? 0) + amount;
  }
  if (job.resourceRequirements?.browser?.required) {
    if (job.resourceRequirements.resources.browser === undefined) usage.browser = (usage.browser ?? 0) + 1;
    if (job.resourceRequirements.resources['browser-port'] === undefined) usage['browser-port'] = (usage['browser-port'] ?? 0) + 1;
  }
}

function resourceQuotaViolations(job: FrontierSwarmScheduledJob, usage: Record<string, number>, quotas: Record<string, number>): string[] {
  const next = { ...usage };
  addResourceUsage(next, job);
  return Object.entries(quotas)
    .filter(([resource, quota]) => (next[resource] ?? 0) > quota)
    .map(([resource]) => resource)
    .sort();
}

function schedulerActionForReason(reason: string): string {
  if (reason.startsWith('resource-capacity:')) return 'lower-concurrency-or-add-resource-pool';
  if (reason === 'lane-capacity') return 'increase-lane-capacity-or-split-lane';
  if (reason === 'compute-capacity') return 'increase-compute-capacity-or-use-another-compute';
  if (reason === 'concurrency-key-capacity') return 'serialize-or-split-concurrency-key';
  if (reason === 'waiting-for-dependencies') return 'prioritize-dependency-chain';
  if (reason === 'ready-capacity') return 'raise-ready-window-or-drain-ready-jobs';
  return 'review-scheduler-blocker';
}

function schedulerPriorityForReason(reason: string): number {
  if (reason.startsWith('resource-capacity:')) return 10;
  if (reason === 'waiting-for-dependencies') return 20;
  if (reason === 'ready-capacity') return 25;
  return 30;
}
