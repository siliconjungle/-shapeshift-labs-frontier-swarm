import type {
  JsonObject
} from '@shapeshift-labs/frontier';

export interface FrontierSwarmSemanticImportCounterInput {
  readonly [key: string]: number | undefined;
}

export interface FrontierSwarmSemanticIndexSummaryInput {
  documents?: number;
  symbols?: number;
  occurrences?: number;
  relations?: number;
  facts?: number;
}

export interface FrontierSwarmSemanticDependencySummaryInput {
  total?: number;
  calls?: number;
  uses?: number;
  references?: number;
  imports?: number;
  depends?: number;
  extends?: number;
  implements?: number;
  includes?: number;
  requires?: number;
  byPredicate?: FrontierSwarmSemanticImportCounterInput;
  predicates?: readonly string[];
  ids?: readonly string[];
  sourceSymbolIds?: readonly string[];
  targetSymbolIds?: readonly string[];
}

export interface FrontierSwarmSemanticSidecarSummaryInput {
  total?: number;
  symbols?: number;
  ownershipRegions?: number;
  patchHints?: number;
  empty?: number;
}

export interface FrontierSwarmSourceProjectionSummaryInput {
  total?: number;
  preserved?: number;
  stubs?: number;
  ready?: number;
  needsReview?: number;
  blocked?: number;
}

export interface FrontierSwarmNativeCompileSummaryInput {
  total?: number;
  emitted?: number;
  preserved?: number;
  targetStubs?: number;
  ready?: number;
  needsReview?: number;
  blocked?: number;
}

export interface FrontierSwarmParadigmSemanticsSummaryInput {
  total?: number;
  ids?: readonly string[];
  groups?: readonly string[];
  kinds?: readonly string[];
  evidence?: number;
  bindingScopes?: number;
  bindings?: number;
  patterns?: number;
  typeConstraints?: number;
  evaluationModels?: number;
  memoryLocations?: number;
  effectRegions?: number;
  controlRegions?: number;
  logicPrograms?: number;
  actorSystems?: number;
  stackEffects?: number;
  arrayShapes?: number;
  numericKernels?: number;
  dataflowNetworks?: number;
  clockModels?: number;
  objectModels?: number;
  macroExpansions?: number;
  reflectionBoundaries?: number;
  loweringRecords?: number;
  byGroup?: FrontierSwarmSemanticImportCounterInput;
  byKind?: FrontierSwarmSemanticImportCounterInput;
  hasRuntimeSemantics?: boolean;
  hasLogicSemantics?: boolean;
  hasStackSemantics?: boolean;
  hasArraySemantics?: boolean;
  hasMacroOrReflection?: boolean;
  hasLowering?: boolean;
  empty?: boolean;
}

export interface FrontierSwarmSemanticImportSummaryInput {
  total?: number;
  selected?: number;
  eligible?: number;
  omitted?: number;
  imported?: number;
  skipped?: number;
  errors?: number;
  sourceMapCount?: number;
  sourceMapMappingCount?: number;
  lossCount?: number;
  lossesBySeverity?: FrontierSwarmSemanticImportCounterInput;
  semanticIndex?: FrontierSwarmSemanticIndexSummaryInput;
  dependencies?: FrontierSwarmSemanticDependencySummaryInput;
  semanticSidecars?: FrontierSwarmSemanticSidecarSummaryInput;
  proofSpec?: FrontierSwarmProofSpecSummaryInput;
  paradigmSemantics?: FrontierSwarmParadigmSemanticsSummaryInput;
  sourceProjections?: FrontierSwarmSourceProjectionSummaryInput;
  nativeCompiles?: FrontierSwarmNativeCompileSummaryInput;
  readiness?: FrontierSwarmSemanticImportCounterInput;
  metadata?: unknown;
}

export interface FrontierSwarmProofSpecSummaryInput {
  total?: number;
  ids?: readonly string[];
  contracts?: number;
  refinements?: number;
  invariants?: number;
  termination?: number;
  temporal?: number;
  obligations?: number;
  artifacts?: number;
  assumptions?: number;
  evidence?: number;
  discharged?: number;
  failed?: number;
  open?: number;
  unknown?: number;
  stale?: number;
  assumed?: number;
  contractKinds?: readonly string[];
  artifactKinds?: readonly string[];
  byStatus?: FrontierSwarmSemanticImportCounterInput;
  byContractKind?: FrontierSwarmSemanticImportCounterInput;
  byArtifactKind?: FrontierSwarmSemanticImportCounterInput;
  empty?: boolean;
}

export interface FrontierSwarmSemanticIndexSummary {
  documents: number;
  symbols: number;
  occurrences: number;
  relations: number;
  facts: number;
}

export interface FrontierSwarmSemanticDependencySummary {
  total: number;
  calls: number;
  uses: number;
  references: number;
  imports: number;
  depends: number;
  extends: number;
  implements: number;
  includes: number;
  requires: number;
  byPredicate: Record<string, number>;
  predicates: string[];
  ids: string[];
  sourceSymbolIds: string[];
  targetSymbolIds: string[];
}

export interface FrontierSwarmSemanticSidecarSummary {
  total: number;
  symbols: number;
  ownershipRegions: number;
  patchHints: number;
  empty: number;
}

export interface FrontierSwarmProofSpecSummary {
  total: number;
  ids: string[];
  contracts: number;
  refinements: number;
  invariants: number;
  termination: number;
  temporal: number;
  obligations: number;
  artifacts: number;
  assumptions: number;
  evidence: number;
  discharged: number;
  failed: number;
  open: number;
  unknown: number;
  stale: number;
  assumed: number;
  contractKinds: string[];
  artifactKinds: string[];
  byStatus: Record<string, number>;
  byContractKind: Record<string, number>;
  byArtifactKind: Record<string, number>;
  empty: boolean;
}

export interface FrontierSwarmSourceProjectionSummary {
  total: number;
  preserved: number;
  stubs: number;
  ready: number;
  needsReview: number;
  blocked: number;
}

export interface FrontierSwarmNativeCompileSummary {
  total: number;
  emitted: number;
  preserved: number;
  targetStubs: number;
  ready: number;
  needsReview: number;
  blocked: number;
}

export interface FrontierSwarmParadigmSemanticsSummary {
  total: number;
  ids: string[];
  groups: string[];
  kinds: string[];
  evidence: number;
  bindingScopes: number;
  bindings: number;
  patterns: number;
  typeConstraints: number;
  evaluationModels: number;
  memoryLocations: number;
  effectRegions: number;
  controlRegions: number;
  logicPrograms: number;
  actorSystems: number;
  stackEffects: number;
  arrayShapes: number;
  numericKernels: number;
  dataflowNetworks: number;
  clockModels: number;
  objectModels: number;
  macroExpansions: number;
  reflectionBoundaries: number;
  loweringRecords: number;
  byGroup: Record<string, number>;
  byKind: Record<string, number>;
  hasRuntimeSemantics: boolean;
  hasLogicSemantics: boolean;
  hasStackSemantics: boolean;
  hasArraySemantics: boolean;
  hasMacroOrReflection: boolean;
  hasLowering: boolean;
  empty: boolean;
}

export interface FrontierSwarmSemanticImportSummary {
  total: number;
  selected: number;
  eligible: number;
  omitted: number;
  imported: number;
  skipped: number;
  errors: number;
  sourceMapCount: number;
  sourceMapMappingCount: number;
  lossCount: number;
  lossesBySeverity: Record<string, number>;
  semanticIndex: FrontierSwarmSemanticIndexSummary;
  dependencies: FrontierSwarmSemanticDependencySummary;
  semanticSidecars: FrontierSwarmSemanticSidecarSummary;
  proofSpec: FrontierSwarmProofSpecSummary;
  paradigmSemantics: FrontierSwarmParadigmSemanticsSummary;
  sourceProjections: FrontierSwarmSourceProjectionSummary;
  nativeCompiles: FrontierSwarmNativeCompileSummary;
  readiness: Record<string, number>;
  metadata?: JsonObject;
}
