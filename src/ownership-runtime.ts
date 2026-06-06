import type {
  FrontierSwarmOwnershipReport,
  FrontierSwarmRegionOwnershipInput,
  FrontierSwarmRegionOwnershipReport
} from './types.js';
import type { FrontierSwarmJob } from './plan.js';
import { matchesGlob, uniqueStrings } from './internal.js';

export function checkSwarmOwnership(job: FrontierSwarmJob, changedPaths: readonly string[]): FrontierSwarmOwnershipReport {
  const changed = uniqueStrings(changedPaths);
  const violations = changed.filter((file) => !job.allowedWrites.some((glob) => matchesGlob(file, glob)));
  return {
    ok: violations.length === 0,
    changedPaths: changed,
    allowedWrites: [...job.allowedWrites],
    violations
  };
}

export function resolveSwarmChangedRegions(job: FrontierSwarmJob, changedPaths: readonly string[]): string[] {
  const changed = uniqueStrings(changedPaths);
  const regions = new Set(job.changedRegions);
  for (const region of job.ownershipRegions) {
    if (region.globs.some((glob) => changed.some((file) => matchesGlob(file, glob)))) regions.add(region.id);
    for (const selector of region.selectors) {
      if (changed.includes(selector)) regions.add(region.id);
    }
  }
  return Array.from(regions).sort();
}

export function checkSwarmRegionOwnership(job: FrontierSwarmJob, input: FrontierSwarmRegionOwnershipInput = {}): FrontierSwarmRegionOwnershipReport {
  const changedPaths = uniqueStrings(input.changedPaths ?? []);
  const resolvedRegions = resolveSwarmChangedRegions(job, changedPaths);
  const changedRegions = uniqueStrings([...(input.changedRegions ?? []), ...resolvedRegions]);
  const ownedRegions = new Set(job.ownedRegions);
  const regionViolations = changedRegions.filter((region) => !ownedRegions.has(region));
  const classifiedPaths = new Set<string>();
  for (const region of job.ownershipRegions) {
    for (const file of changedPaths) {
      if (region.globs.some((glob) => matchesGlob(file, glob))) classifiedPaths.add(file);
    }
  }
  const unclassifiedChangedPaths = changedPaths.filter((file) => !classifiedPaths.has(file));
  return {
    ok: regionViolations.length === 0 && (job.ownershipRegions.length === 0 || unclassifiedChangedPaths.length === 0),
    jobId: job.id,
    changedPaths,
    changedRegions,
    ownedRegions: [...job.ownedRegions],
    regionViolations,
    unclassifiedChangedPaths
  };
}
