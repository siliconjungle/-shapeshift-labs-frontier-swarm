import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type {
  FrontierSwarmMergeAdmission,
  FrontierSwarmMergeAdmissionDeferral,
  FrontierSwarmMergeAdmissionInput
} from './index.js';

export function createSwarmMergeAdmission(input: FrontierSwarmMergeAdmissionInput): FrontierSwarmMergeAdmission {
  const generatedAt = input.generatedAt ?? Date.now();
  const maxReady = Math.max(0, Math.floor(input.maxReady ?? input.index.entries.length));
  const maxChangedPaths = input.maxChangedPaths === undefined ? undefined : Math.max(0, Math.floor(input.maxChangedPaths));
  const maxChangedRegions = input.maxChangedRegions === undefined ? undefined : Math.max(0, Math.floor(input.maxChangedRegions));
  const maxHighRisk = input.maxHighRisk === undefined ? undefined : Math.max(0, Math.floor(input.maxHighRisk));
  const allowRisks = uniqueStrings(input.allowRisks ?? ['low', 'medium']);
  const admitted: string[] = [];
  const deferred: FrontierSwarmMergeAdmissionDeferral[] = [];
  const usedPaths = new Set<string>();
  const usedRegions = new Set<string>();
  let highRiskCount = 0;
  for (const entry of input.index.entries) {
    const reasons: string[] = [];
    if (entry.disposition !== 'auto-mergeable' || !entry.autoMergeable) reasons.push('not-auto-mergeable');
    if (entry.staleAgainstHead) reasons.push('stale-against-head');
    if (entry.conflictingJobIds.length) reasons.push('conflicting-changes');
    if (!allowRisks.includes(entry.riskLevel)) reasons.push('risk-not-admitted');
    if (admitted.length >= maxReady) reasons.push('max-ready');
    const nextPaths = new Set([...usedPaths, ...entry.changedPaths]);
    const nextRegions = new Set([...usedRegions, ...entry.changedRegions]);
    const nextHighRiskCount = highRiskCount + (entry.riskLevel === 'high' ? 1 : 0);
    if (maxChangedPaths !== undefined && nextPaths.size > maxChangedPaths) reasons.push('max-changed-paths');
    if (maxChangedRegions !== undefined && nextRegions.size > maxChangedRegions) reasons.push('max-changed-regions');
    if (maxHighRisk !== undefined && nextHighRiskCount > maxHighRisk) reasons.push('max-high-risk');
    if (reasons.length) {
      deferred.push({ jobId: entry.jobId, reasons: uniqueStrings(reasons) });
      continue;
    }
    admitted.push(entry.jobId);
    for (const file of entry.changedPaths) usedPaths.add(file);
    for (const region of entry.changedRegions) usedRegions.add(region);
    highRiskCount = nextHighRiskCount;
  }
  return {
    kind: 'frontier.swarm.merge-admission',
    version: 1,
    id: input.id ?? 'swarm-merge-admission:' + stableHash([input.index.id, admitted, deferred, generatedAt]),
    mergeIndexId: input.index.id,
    generatedAt,
    admitted,
    deferred,
    budget: {
      maxReady,
      ...(maxChangedPaths !== undefined ? { maxChangedPaths } : {}),
      ...(maxChangedRegions !== undefined ? { maxChangedRegions } : {}),
      ...(maxHighRisk !== undefined ? { maxHighRisk } : {}),
      allowRisks
    },
    summary: {
      admittedCount: admitted.length,
      deferredCount: deferred.length,
      changedPathCount: usedPaths.size,
      changedRegionCount: usedRegions.size,
      highRiskCount
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
