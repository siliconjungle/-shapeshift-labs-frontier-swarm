import { nonNegativeCount, normalizeCounterRecord, stringArray } from './coercion.js';
import { toJsonObject, uniqueStrings } from './internal.js';
import type {
  FrontierSwarmNativeCompileSummary,
  FrontierSwarmParadigmSemanticsSummary,
  FrontierSwarmProofSpecSummary,
  FrontierSwarmSemanticImportSummary,
  FrontierSwarmSemanticIndexSummary,
  FrontierSwarmSemanticSidecarSummary,
  FrontierSwarmSourceProjectionSummary
} from './index.js';

export function normalizeSemanticImportSummary(input: unknown): FrontierSwarmSemanticImportSummary | undefined {
  const object = toJsonObject(input);
  if (!object) return undefined;
  const metadata = toJsonObject(object.metadata);
  return {
    total: nonNegativeCount(object.total),
    selected: nonNegativeCount(object.selected),
    eligible: nonNegativeCount(object.eligible),
    omitted: nonNegativeCount(object.omitted),
    imported: nonNegativeCount(object.imported),
    skipped: nonNegativeCount(object.skipped),
    errors: nonNegativeCount(object.errors),
    sourceMapCount: nonNegativeCount(object.sourceMapCount),
    sourceMapMappingCount: nonNegativeCount(object.sourceMapMappingCount),
    lossCount: nonNegativeCount(object.lossCount),
    lossesBySeverity: normalizeCounterRecord(object.lossesBySeverity),
    semanticIndex: normalizeSemanticIndexSummary(object.semanticIndex),
    semanticSidecars: normalizeSemanticSidecarSummary(object.semanticSidecars),
    proofSpec: normalizeProofSpecSummary(object.proofSpec),
    paradigmSemantics: normalizeParadigmSemanticsSummary(object.paradigmSemantics),
    sourceProjections: normalizeSourceProjectionSummary(object.sourceProjections),
    nativeCompiles: normalizeNativeCompileSummary(object.nativeCompiles),
    readiness: normalizeCounterRecord(object.readiness),
    ...(metadata ? { metadata } : {})
  };
}

const paradigmSemanticsSummaryGroups = [
  'bindingScopes',
  'bindings',
  'patterns',
  'typeConstraints',
  'evaluationModels',
  'memoryLocations',
  'effectRegions',
  'controlRegions',
  'logicPrograms',
  'actorSystems',
  'stackEffects',
  'arrayShapes',
  'numericKernels',
  'dataflowNetworks',
  'clockModels',
  'objectModels',
  'macroExpansions',
  'reflectionBoundaries',
  'loweringRecords'
] as const;

function normalizeParadigmSemanticsSummary(input: unknown): FrontierSwarmParadigmSemanticsSummary {
  const object = toJsonObject(input);
  const counts = Object.fromEntries(paradigmSemanticsSummaryGroups.map((group) => [
    group,
    nonNegativeCount(object?.[group])
  ])) as Record<typeof paradigmSemanticsSummaryGroups[number], number>;
  const total = nonNegativeCount(object?.total) || Object.values(counts).reduce((sum, count) => sum + count, 0);
  const byGroup = normalizeCounterRecord(object?.byGroup);
  const byKind = normalizeCounterRecord(object?.byKind);
  const hasRuntimeSemantics = object?.hasRuntimeSemantics === true
    || counts.evaluationModels > 0
    || counts.memoryLocations > 0
    || counts.effectRegions > 0
    || counts.controlRegions > 0
    || counts.actorSystems > 0
    || counts.clockModels > 0;
  const hasLogicSemantics = object?.hasLogicSemantics === true || counts.logicPrograms > 0;
  const hasStackSemantics = object?.hasStackSemantics === true || counts.stackEffects > 0;
  const hasArraySemantics = object?.hasArraySemantics === true || counts.arrayShapes > 0 || counts.numericKernels > 0;
  const hasMacroOrReflection = object?.hasMacroOrReflection === true || counts.macroExpansions > 0 || counts.reflectionBoundaries > 0;
  const hasLowering = object?.hasLowering === true || counts.loweringRecords > 0;
  return {
    total,
    ids: uniqueStrings(stringArray(object?.ids)),
    groups: uniqueStrings(stringArray(object?.groups)),
    kinds: uniqueStrings(stringArray(object?.kinds)),
    evidence: nonNegativeCount(object?.evidence),
    ...counts,
    byGroup,
    byKind,
    hasRuntimeSemantics,
    hasLogicSemantics,
    hasStackSemantics,
    hasArraySemantics,
    hasMacroOrReflection,
    hasLowering,
    empty: object?.empty === true || total === 0
  };
}

function normalizeProofSpecSummary(input: unknown): FrontierSwarmProofSpecSummary {
  const object = toJsonObject(input);
  const total = nonNegativeCount(object?.total);
  return {
    total,
    ids: uniqueStrings(stringArray(object?.ids)),
    contracts: nonNegativeCount(object?.contracts),
    refinements: nonNegativeCount(object?.refinements),
    invariants: nonNegativeCount(object?.invariants),
    termination: nonNegativeCount(object?.termination),
    temporal: nonNegativeCount(object?.temporal),
    obligations: nonNegativeCount(object?.obligations),
    artifacts: nonNegativeCount(object?.artifacts),
    assumptions: nonNegativeCount(object?.assumptions),
    evidence: nonNegativeCount(object?.evidence),
    discharged: nonNegativeCount(object?.discharged),
    failed: nonNegativeCount(object?.failed),
    open: nonNegativeCount(object?.open),
    unknown: nonNegativeCount(object?.unknown),
    stale: nonNegativeCount(object?.stale),
    assumed: nonNegativeCount(object?.assumed),
    contractKinds: uniqueStrings(stringArray(object?.contractKinds)),
    artifactKinds: uniqueStrings(stringArray(object?.artifactKinds)),
    byStatus: normalizeCounterRecord(object?.byStatus),
    byContractKind: normalizeCounterRecord(object?.byContractKind),
    byArtifactKind: normalizeCounterRecord(object?.byArtifactKind),
    empty: object?.empty === true || total === 0
  };
}

function normalizeSemanticIndexSummary(input: unknown): FrontierSwarmSemanticIndexSummary {
  const object = toJsonObject(input);
  return {
    documents: nonNegativeCount(object?.documents),
    symbols: nonNegativeCount(object?.symbols),
    occurrences: nonNegativeCount(object?.occurrences),
    relations: nonNegativeCount(object?.relations),
    facts: nonNegativeCount(object?.facts)
  };
}

function normalizeSemanticSidecarSummary(input: unknown): FrontierSwarmSemanticSidecarSummary {
  const object = toJsonObject(input);
  return {
    total: nonNegativeCount(object?.total),
    symbols: nonNegativeCount(object?.symbols),
    ownershipRegions: nonNegativeCount(object?.ownershipRegions),
    patchHints: nonNegativeCount(object?.patchHints),
    empty: nonNegativeCount(object?.empty)
  };
}

function normalizeSourceProjectionSummary(input: unknown): FrontierSwarmSourceProjectionSummary {
  const object = toJsonObject(input);
  return {
    total: nonNegativeCount(object?.total),
    preserved: nonNegativeCount(object?.preserved),
    stubs: nonNegativeCount(object?.stubs),
    ready: nonNegativeCount(object?.ready),
    needsReview: nonNegativeCount(object?.needsReview),
    blocked: nonNegativeCount(object?.blocked)
  };
}

function normalizeNativeCompileSummary(input: unknown): FrontierSwarmNativeCompileSummary {
  const object = toJsonObject(input);
  return {
    total: nonNegativeCount(object?.total),
    emitted: nonNegativeCount(object?.emitted),
    preserved: nonNegativeCount(object?.preserved),
    targetStubs: nonNegativeCount(object?.targetStubs),
    ready: nonNegativeCount(object?.ready),
    needsReview: nonNegativeCount(object?.needsReview),
    blocked: nonNegativeCount(object?.blocked)
  };
}
