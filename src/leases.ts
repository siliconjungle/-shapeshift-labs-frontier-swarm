import { cloneJsonValue, stableHash } from './internal.js';
import type { FrontierSwarmSchedule } from './scheduler.js';

export const FRONTIER_SWARM_LEASE_KIND = 'frontier.swarm.lease';
export const FRONTIER_SWARM_LEASE_VERSION = 1;

export interface FrontierSwarmLeaseInput {
  schedule: FrontierSwarmSchedule;
  workerId: string;
  now?: number;
  leaseMs?: number;
  count?: number;
  existingLeases?: readonly FrontierSwarmLease[];
}

export interface FrontierSwarmLease {
  kind: typeof FRONTIER_SWARM_LEASE_KIND;
  version: typeof FRONTIER_SWARM_LEASE_VERSION;
  id: string;
  jobId: string;
  workerId: string;
  token: string;
  leasedAt: number;
  expiresAt: number;
  fencingToken: number;
  status: 'active' | 'expired' | 'released';
}

export interface FrontierSwarmLeaseRenewalInput {
  lease: FrontierSwarmLease;
  now?: number;
  leaseMs?: number;
  status?: FrontierSwarmLease['status'];
}

export function createSwarmLeases(input: FrontierSwarmLeaseInput): FrontierSwarmLease[] {
  const now = input.now ?? Date.now();
  const leaseMs = Math.max(1, Math.floor(input.leaseMs ?? 900000));
  const activeJobIds = new Set((input.existingLeases ?? []).filter((lease) => lease.status === 'active' && lease.expiresAt > now).map((lease) => lease.jobId));
  const existingMaxFence = Math.max(0, ...(input.existingLeases ?? []).map((lease) => lease.fencingToken));
  const count = Math.max(0, Math.floor(input.count ?? input.schedule.ready.length));
  return input.schedule.ready
    .filter((job) => !activeJobIds.has(job.jobId))
    .slice(0, count)
    .map((job, index) => ({
      kind: FRONTIER_SWARM_LEASE_KIND,
      version: FRONTIER_SWARM_LEASE_VERSION,
      id: 'swarm-lease:' + stableHash([input.schedule.id, job.jobId, input.workerId, now, existingMaxFence + index + 1]),
      jobId: job.jobId,
      workerId: input.workerId,
      token: stableHash([job.jobId, input.workerId, now, existingMaxFence + index + 1]),
      leasedAt: now,
      expiresAt: now + leaseMs,
      fencingToken: existingMaxFence + index + 1,
      status: 'active'
    }));
}

export function renewSwarmLease(input: FrontierSwarmLeaseRenewalInput): FrontierSwarmLease {
  const now = input.now ?? Date.now();
  const leaseMs = Math.max(1, Math.floor(input.leaseMs ?? Math.max(1, input.lease.expiresAt - input.lease.leasedAt)));
  return {
    ...cloneJsonValue(input.lease),
    leasedAt: now,
    expiresAt: now + leaseMs,
    status: input.status ?? 'active'
  };
}
