import type {
  FrontierSwarmJobResult,
  FrontierSwarmJobResultInput,
  FrontierSwarmMergeDisposition,
  FrontierSwarmMergeReadiness
} from './index.js';

export function classifySwarmMergeReadiness(result: FrontierSwarmJobResultInput | FrontierSwarmJobResult): FrontierSwarmMergeReadiness {
  if (result.mergeReadiness) return result.mergeReadiness;
  if (result.status === 'blocked') return 'blocked';
  if (result.status === 'failed' || result.exitCode !== undefined && result.exitCode !== 0) return 'rejected';
  const changedPaths = result.changedPaths ?? [];
  if (changedPaths.length === 0) return 'discovery-only';
  const ownershipViolations = result.ownershipViolations ?? [];
  if (ownershipViolations.length) return 'rejected';
  const verification = result.verification ?? [];
  const failedRequired = verification.some((entry) => entry.required !== false && entry.status !== 0);
  if (failedRequired) return 'patch-candidate';
  return verification.length > 0 || result.status === 'verified' ? 'verified-patch' : 'patch-candidate';
}

export function classifySwarmMergeDisposition(
  result: FrontierSwarmJobResultInput | FrontierSwarmJobResult,
  input: { staleAgainstHead?: boolean } = {}
): FrontierSwarmMergeDisposition {
  if (result.mergeDisposition) return result.mergeDisposition;
  if (input.staleAgainstHead) return 'stale-against-head';
  const readiness = classifySwarmMergeReadiness(result);
  if (readiness === 'discovery-only') return 'discovery-only';
  if (readiness === 'blocked') return 'blocked';
  if (readiness === 'rejected') return 'rejected';
  if (readiness === 'verified-patch') return 'auto-mergeable';
  return 'needs-port';
}
