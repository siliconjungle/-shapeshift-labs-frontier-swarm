import { createSwarmHotspotReport as createSwarmHotspotReportCore } from './merge-review.js';
import { createSwarmMergeBundle as createSwarmMergeBundleCore } from './merge-bundles.js';
import { createSwarmQueueOverlay as createSwarmQueueOverlayCore } from './queue-overlays.js';
import { createSwarmTraceShard } from './trace-runtime.js';
import { toJsonObject, uniqueStrings } from './internal.js';
import { normalizeResult } from './run-normalization.js';
import { resolveSwarmChangedRegions } from './ownership-runtime.js';
import type { FrontierSwarmHotspotReport, FrontierSwarmHotspotReportInput, FrontierSwarmMergeBundle, FrontierSwarmMergeBundleInput, FrontierSwarmNativeCompileSummary, FrontierSwarmParadigmSemanticsSummary, FrontierSwarmProofSpecSummary, FrontierSwarmQueueOverlay, FrontierSwarmQueueOverlayInput, FrontierSwarmSemanticDependencySummary, FrontierSwarmSemanticImportSummary, FrontierSwarmSemanticIndexSummary, FrontierSwarmSemanticSidecarSummary, FrontierSwarmSourceProjectionSummary } from './types.js';

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
export function createSwarmMergeBundle(input: FrontierSwarmMergeBundleInput): FrontierSwarmMergeBundle {
  return createSwarmMergeBundleCore(input, {
    normalizeResult,
    normalizeSemanticImportSummary,
    createSwarmTraceShard,
    resolveSwarmChangedRegions
  });
}
export function createSwarmQueueOverlay(input: FrontierSwarmQueueOverlayInput = {}): FrontierSwarmQueueOverlay {
  return createSwarmQueueOverlayCore(input, { normalizeResult });
}
export function createSwarmHotspotReport(input: FrontierSwarmHotspotReportInput = {}): FrontierSwarmHotspotReport {
  return createSwarmHotspotReportCore(input, { normalizeResult });
}
function normalizeSemanticImportSummary(input: unknown): FrontierSwarmSemanticImportSummary | undefined {
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
    dependencies: normalizeSemanticDependencySummary(object.dependencies),
    semanticSidecars: normalizeSemanticSidecarSummary(object.semanticSidecars),
    proofSpec: normalizeProofSpecSummary(object.proofSpec),
    paradigmSemantics: normalizeParadigmSemanticsSummary(object.paradigmSemantics),
    sourceProjections: normalizeSourceProjectionSummary(object.sourceProjections),
    nativeCompiles: normalizeNativeCompileSummary(object.nativeCompiles),
    readiness: normalizeCounterRecord(object.readiness),
    ...(metadata ? { metadata } : {})
  };
}
function nonNegativeCount(value: unknown): number {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
}
function normalizeCounterRecord(input: unknown): Record<string, number> {
  const object = toJsonObject(input);
  if (!object) return {};
  const entries = Object.entries(object)
    .map(([key, value]) => [key, nonNegativeCount(value)] as const)
    .filter(([, value]) => value > 0)
    .sort(([left], [right]) => left.localeCompare(right));
  return Object.fromEntries(entries);
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
function normalizeSemanticDependencySummary(input: unknown): FrontierSwarmSemanticDependencySummary {
  const object = toJsonObject(input);
  const byPredicate = normalizeCounterRecord(object?.byPredicate);
  const namedTotal = [
    'calls',
    'uses',
    'references',
    'imports',
    'depends',
    'extends',
    'implements',
    'includes',
    'requires'
  ].reduce((sum, key) => sum + nonNegativeCount(object?.[key]), 0);
  return {
    total: nonNegativeCount(object?.total) || Object.values(byPredicate).reduce((sum, count) => sum + count, 0) || namedTotal,
    calls: nonNegativeCount(object?.calls),
    uses: nonNegativeCount(object?.uses),
    references: nonNegativeCount(object?.references),
    imports: nonNegativeCount(object?.imports),
    depends: nonNegativeCount(object?.depends),
    extends: nonNegativeCount(object?.extends),
    implements: nonNegativeCount(object?.implements),
    includes: nonNegativeCount(object?.includes),
    requires: nonNegativeCount(object?.requires),
    byPredicate,
    predicates: uniqueStrings(stringArray(object?.predicates)),
    ids: uniqueStrings(stringArray(object?.ids)),
    sourceSymbolIds: uniqueStrings(stringArray(object?.sourceSymbolIds)),
    targetSymbolIds: uniqueStrings(stringArray(object?.targetSymbolIds))
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
function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((entry) => String(entry ?? '').trim()).filter(Boolean) : [];
}
