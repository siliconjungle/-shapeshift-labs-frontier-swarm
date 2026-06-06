import { defaultArtifactBucket, evidenceKindFromPath, normalizeRoutingHint } from './evidence-index-helpers.js';
import { FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_KIND, FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_VERSION } from './constants.js';
import { positiveNumber, stableHash, toJsonObject, uniqueStrings } from './internal.js';
import type { FrontierSwarmArtifactRoutingPlan, FrontierSwarmArtifactRoutingPlanInput, FrontierSwarmNamedRef, FrontierSwarmNamedRefInput } from './types.js';

export function createSwarmArtifactRoutingPlan(input: FrontierSwarmArtifactRoutingPlanInput = {}): FrontierSwarmArtifactRoutingPlan {
  const generatedAt = input.generatedAt ?? Date.now();
  const artifacts = [
    ...normalizeNamedRefs(input.artifacts ?? [], 'artifact'),
    ...(input.bundles ?? []).flatMap((bundle) => bundle.evidencePaths.map((path) => normalizeNamedRef({ path, kind: evidenceKindFromPath(path), role: bundle.disposition }, 'evidence')))
  ];
  const hints = (input.hints ?? []).map(normalizeRoutingHint);
  const routes = artifacts.map((artifact) => {
    const matched = hints.filter((hint) => (
      (hint.artifactKind === undefined || hint.artifactKind === artifact.kind)
      && (hint.pathPattern === undefined || (artifact.path ?? artifact.uri ?? '').includes(hint.pathPattern))
    ));
    const bucket = matched[0]?.bucket ?? defaultArtifactBucket(artifact);
    return {
      artifact,
      bucket,
      ...(matched[0]?.lane ? { lane: matched[0].lane } : {}),
      reasons: uniqueStrings(matched.map((hint) => hint.reason))
    };
  });
  const byBucket = groupIds(routes.map((route) => ({ id: route.artifact.id, bucket: route.bucket })), (route) => route.bucket);
  return {
    kind: FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_KIND,
    version: FRONTIER_SWARM_ARTIFACT_ROUTING_PLAN_VERSION,
    id: input.id ?? 'swarm-artifact-routing-plan:' + stableHash([routes, generatedAt]),
    generatedAt,
    routes,
    byBucket,
    summary: {
      routeCount: routes.length,
      bucketCount: Object.keys(byBucket).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function normalizeNamedRefs(input: readonly (string | FrontierSwarmNamedRefInput)[], fallbackKind: string): FrontierSwarmNamedRef[] {
  return input.map((entry) => normalizeNamedRef(entry, fallbackKind)).sort((left, right) => left.id.localeCompare(right.id));
}
function normalizeNamedRef(input: string | number | FrontierSwarmNamedRefInput, fallbackKind: string): FrontierSwarmNamedRef {
  if (typeof input === 'string' || typeof input === 'number') {
    const value = String(input);
    return { id: value, kind: fallbackKind, path: value, tags: [] };
  }
  const path = input.path ?? input.uri;
  const id = input.id ?? path ?? stableHash(input);
  return {
    id,
    kind: input.kind ?? fallbackKind,
    ...(input.path ? { path: input.path } : {}),
    ...(input.uri ? { uri: input.uri } : {}),
    ...(input.role ? { role: input.role } : {}),
    ...(input.hash ? { hash: input.hash } : {}),
    ...(positiveNumber(input.bytes) ? { bytes: Math.floor(input.bytes as number) } : {}),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
function groupIds<T extends { jobId?: string; id?: string }>(items: readonly T[], key: (item: T) => string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const item of items) {
    const group = key(item);
    const id = item.jobId ?? item.id;
    if (!id) continue;
    out[group] = [...(out[group] ?? []), id];
  }
  for (const ids of Object.values(out)) ids.sort();
  return out;
}
