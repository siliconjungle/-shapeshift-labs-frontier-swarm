import { cloneJsonValue, toJsonObject, uniqueStrings } from './internal.js';
import { FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID, FRONTIER_SWARM_MANIFEST_KIND, FRONTIER_SWARM_MANIFEST_VERSION } from './constants.js';
import { normalizeId, titleFromId } from './coercion.js';
import { normalizeComputeList, normalizeLayer, normalizeLane, normalizePolicy, normalizeTask } from './manifest-normalization.js';
import type {
  FrontierSwarmCompiled,
  FrontierSwarmCompute,
  FrontierSwarmLane,
  FrontierSwarmLayer,
  FrontierSwarmManifest,
  FrontierSwarmManifestInput,
  FrontierSwarmTask,
  FrontierSwarmTaskInput,
  FrontierSwarmTaskSetInput,
  FrontierSwarmValidation,
  FrontierSwarmValidationIssue
} from './index.js';

export function defineSwarmManifest(input: FrontierSwarmManifestInput = {}): FrontierSwarmManifest {
  return createSwarmManifest(input);
}

export function createSwarmManifest(input: FrontierSwarmManifestInput = {}): FrontierSwarmManifest {
  const compute = normalizeComputeList(input.compute);
  const defaultCompute = input.policy?.defaultCompute ?? compute[0]?.id ?? FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID;
  const layers = (input.layers ?? []).map(normalizeLayer);
  const lanes = (input.lanes ?? []).map(normalizeLane);
  const policy = normalizePolicy(input.policy, defaultCompute);
  return {
    kind: FRONTIER_SWARM_MANIFEST_KIND,
    version: FRONTIER_SWARM_MANIFEST_VERSION,
    id: normalizeId(input.id ?? 'frontier-swarm', 'manifest id'),
    title: input.title ?? titleFromId(input.id ?? 'frontier swarm'),
    ...(input.description ? { description: input.description } : {}),
    ...(input.package ? { package: input.package } : {}),
    ...(input.feature ? { feature: input.feature } : {}),
    ...(input.owner ? { owner: input.owner } : {}),
    compute,
    layers,
    lanes,
    policy,
    resources: uniqueStrings(input.resources ?? []),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {}),
    summary: {
      computeCount: compute.length,
      layerCount: layers.length,
      laneCount: lanes.length
    }
  };
}

export function defineSwarmTasks(input: readonly FrontierSwarmTaskInput[] | FrontierSwarmTaskSetInput = []): FrontierSwarmTask[] {
  const raw = Array.isArray(input) ? input : ((input as FrontierSwarmTaskSetInput).tasks ?? (input as FrontierSwarmTaskSetInput).items ?? []);
  return raw.map(normalizeTask);
}

export function compileSwarm(input: FrontierSwarmManifest | FrontierSwarmManifestInput): FrontierSwarmCompiled {
  const manifest = isSwarmManifest(input) ? cloneJsonValue(input) as FrontierSwarmManifest : createSwarmManifest(input);
  const computeById = new Map(manifest.compute.map((compute) => [compute.id, compute]));
  const layersById = new Map(manifest.layers.map((layer) => [layer.id, layer]));
  const lanesById = new Map(manifest.lanes.map((lane) => [lane.id, lane]));
  return {
    manifest,
    computeById,
    layersById,
    lanesById,
    validation: validateSwarmManifest(manifest)
  };
}

export function validateSwarmManifest(input: FrontierSwarmManifest | FrontierSwarmManifestInput): FrontierSwarmValidation {
  const manifest = isSwarmManifest(input) ? input : createSwarmManifest(input);
  const issues: FrontierSwarmValidationIssue[] = [];
  const computeIds = new Set<string>();
  const layerIds = new Set<string>();
  const laneIds = new Set<string>();

  for (const compute of manifest.compute) {
    if (computeIds.has(compute.id)) addIssue(issues, 'duplicate-compute', 'error', `compute.${compute.id}`, `Duplicate compute id: ${compute.id}`);
    computeIds.add(compute.id);
  }
  if (!computeIds.has(manifest.policy.defaultCompute)) {
    addIssue(issues, 'missing-default-compute', 'error', 'policy.defaultCompute', `Default compute is not declared: ${manifest.policy.defaultCompute}`);
  }

  for (const layer of manifest.layers) {
    if (layerIds.has(layer.id)) addIssue(issues, 'duplicate-layer', 'error', `layers.${layer.id}`, `Duplicate layer id: ${layer.id}`);
    layerIds.add(layer.id);
  }
  for (const layer of manifest.layers) {
    if (layer.parentId && !layerIds.has(layer.parentId)) {
      addIssue(issues, 'missing-parent-layer', 'error', `layers.${layer.id}.parentId`, `Layer parent is not declared: ${layer.parentId}`);
    }
    for (const [childLayer, compute] of Object.entries(layer.childCompute)) {
      if (childLayer !== '*' && !layerIds.has(childLayer)) {
        addIssue(issues, 'missing-child-layer', 'error', `layers.${layer.id}.childCompute.${childLayer}`, `Child layer is not declared: ${childLayer}`);
      }
      if (!computeIds.has(compute)) {
        addIssue(issues, 'missing-child-compute', 'error', `layers.${layer.id}.childCompute.${childLayer}`, `Child compute is not declared: ${compute}`);
      }
    }
    for (const field of ['compute', 'defaultCompute'] as const) {
      const compute = layer[field];
      if (compute && !computeIds.has(compute)) {
        addIssue(issues, 'missing-layer-compute', 'error', `layers.${layer.id}.${field}`, `Layer compute is not declared: ${compute}`);
      }
    }
    if (hasLayerCycle(layer.id, manifest.layers)) {
      addIssue(issues, 'layer-cycle', 'error', `layers.${layer.id}`, `Layer parent chain contains a cycle at ${layer.id}`);
    }
  }

  for (const lane of manifest.lanes) {
    if (laneIds.has(lane.id)) addIssue(issues, 'duplicate-lane', 'error', `lanes.${lane.id}`, `Duplicate lane id: ${lane.id}`);
    laneIds.add(lane.id);
    if (lane.layer && !layerIds.has(lane.layer)) {
      addIssue(issues, 'missing-lane-layer', 'error', `lanes.${lane.id}.layer`, `Lane layer is not declared: ${lane.layer}`);
    }
    if (lane.compute && !computeIds.has(lane.compute)) {
      addIssue(issues, 'missing-lane-compute', 'error', `lanes.${lane.id}.compute`, `Lane compute is not declared: ${lane.compute}`);
    }
  }

  return { valid: issues.every((issue) => issue.severity !== 'error'), issues };
}

function addIssue(issues: FrontierSwarmValidationIssue[], code: string, severity: 'error' | 'warning', path: string, message: string): void {
  issues.push({ code, severity, path, message });
}

function hasLayerCycle(layerId: string, layers: readonly FrontierSwarmLayer[]): boolean {
  const byId = new Map(layers.map((layer) => [layer.id, layer]));
  const seen = new Set<string>();
  let cursor: string | undefined = layerId;
  while (cursor) {
    if (seen.has(cursor)) return true;
    seen.add(cursor);
    cursor = byId.get(cursor)?.parentId;
  }
  return false;
}

function isSwarmManifest(value: unknown): value is FrontierSwarmManifest {
  return !!value && typeof value === 'object' && (value as { kind?: unknown }).kind === FRONTIER_SWARM_MANIFEST_KIND;
}
