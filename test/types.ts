import type { JsonValue } from '@shapeshift-labs/frontier';
import {
  createSwarmManifest,
  createSwarmContextPack,
  createSwarmEventStream,
  createSwarmOracleCorpus,
  createSwarmReplayBundle,
  createSwarmParityOracle,
  createSwarmDivergenceReport,
  createSwarmWatchpointPlan,
  createSwarmDebugHandoff,
  createSwarmInstrumentationBudget,
  checkSwarmInstrumentationBudget,
  createSwarmBottleneckReport,
  createSwarmEvidenceIndex,
  querySwarmEvidenceIndex,
  createSwarmBlackboard,
  querySwarmBlackboard,
  createSwarmAdaptiveLoadPlan,
  createSwarmCoordinatorAgentDrainWork,
  createSwarmCoordinatorDashboard,
  querySwarmCoordinatorDashboard,
  createSwarmReferenceOraclePlan,
  createSwarmReferenceOracleResponse,
  createSwarmArtifactRoutingPlan,
  createSwarmSchedulerRecommendations,
  createSwarmFixtureCatalog,
  createSwarmProgressModel,
  createSwarmSemanticOwnershipStableKey,
  createSwarmSemanticOwnershipRegionId,
  createSwarmAutoReviewReport,
  createSwarmRebaseReport,
  createSwarmUsageGovernor,
  checkSwarmUsageGovernor,
  createSwarmLanePlaybook,
  createSwarmPatchStackPlan,
  createSwarmBacklog,
  createSwarmBacklogTaskPlan,
  mergeSwarmBacklogs,
  querySwarmBacklog,
  createSwarmModelRoutingFeedback,
  createSwarmModelRoutingPolicy,
  createSwarmSchedule,
  createSwarmLeases,
  createSwarmQueueSnapshot,
  createSwarmQueueOverlay,
  createSwarmReviewPlan,
  createSwarmMergeIndex,
  createSwarmMergeAdmission,
  createSwarmHierarchicalMergeQueue,
  createSwarmMergePlan,
  createSwarmMergeBundle,
  createSwarmRunStoreShards,
  createSwarmRunCheckpoint,
  checkSwarmBudget,
  createSwarmPlan,
  createSwarmRun,
  defineSwarmTasks,
  resolveSwarmChangedRegions,
  resolveSwarmCompute,
  createSwarmScheduleInputFromAdaptiveLoadPlan,
  type FrontierSwarmArtifactIndex,
  type FrontierSwarmArtifactRoutingPlan,
  type FrontierSwarmAutoReviewReport,
  type FrontierSwarmBlackboard,
  type FrontierSwarmBottleneckReport,
  type FrontierSwarmBacklog,
  type FrontierSwarmBacklogContinuationTaskPlanMetadata,
  type FrontierSwarmBacklogDecompositionMetadata,
  type FrontierSwarmBacklogEntryInput,
  type FrontierSwarmBacklogInput,
  type FrontierSwarmBacklogTaskPlanMetadata,
  type FrontierSwarmBacklogTaskPlan,
  type FrontierSwarmBacklogTaskPlanInput,
  type FrontierSwarmBudgetDecision,
  type FrontierSwarmCompute,
  type FrontierSwarmContextPack,
  type FrontierSwarmDebugHandoff,
  type FrontierSwarmDivergenceReport,
  type FrontierSwarmEvidenceIndex,
  type FrontierSwarmFixtureCatalog,
  type FrontierSwarmCoordinatorAgentDrainWork,
  type FrontierSwarmCoordinatorAgentRootQueueSelectionPressure,
  type FrontierSwarmCoordinatorProcessInput,
  type FrontierSwarmInstrumentationBudgetDecision,
  type FrontierSwarmInstrumentationBudget,
  type FrontierSwarmManifest,
  type FrontierSwarmHierarchicalMergeQueue,
  type FrontierSwarmOracleCorpus,
  type FrontierSwarmParityOracle,
  type FrontierSwarmProgressModel,
  type FrontierSwarmRebaseReport,
  type FrontierSwarmReferenceOraclePlan,
  type FrontierSwarmReferenceOracleResponse,
  type FrontierSwarmReplayBundle,
  type FrontierSwarmLanePlaybook,
  type FrontierSwarmPatchStackPlan,
  type FrontierSwarmModelRoutingFeedback,
  type FrontierSwarmModelRoutingFeedbackInput,
  type FrontierSwarmModelRoutingMode,
  type FrontierSwarmModelRoutingPolicy,
  type FrontierSwarmModelRoutingPolicyInput,
  type FrontierSwarmModelRoutingPolicySignal,
  type FrontierSwarmModelRoutingPolicySignalInput,
  type FrontierSwarmMergeBundle,
  type FrontierSwarmMergeConflict,
  type FrontierSwarmMergeIndex,
  type FrontierSwarmMergeAdmission,
  type FrontierSwarmMergeAdmissionPressure,
  type FrontierSwarmMergePlan,
  type FrontierSwarmMergeQueueAssignment,
  type FrontierSwarmMergeQueueRetrySlice,
  type FrontierSwarmMergeQueueScope,
  type FrontierSwarmPlan,
  type FrontierSwarmQueueOverlay,
  type FrontierSwarmQueueSnapshot,
  type FrontierSwarmRunStoreShards,
  type FrontierSwarmReviewPlan,
  type FrontierSwarmSchedule,
  type FrontierSwarmSchedulerRecommendations,
  type FrontierSwarmSemanticImportSummary,
  type FrontierSwarmEventStream,
  type FrontierSwarmTask,
  type FrontierSwarmUsageGovernor,
  type FrontierSwarmUsageGovernorDecision,
  type FrontierSwarmWatchpointPlan
} from '../dist/index.js';

const manifest: FrontierSwarmManifest = createSwarmManifest({
  compute: [{ id: 'deep', kind: 'codex', model: 'gpt-5.5', reasoningEffort: 'xhigh' }],
  lanes: [{ id: 'runtime', compute: 'deep', allowedWrites: ['src/runtime/**'] }],
  policy: { defaultCompute: 'deep' }
});

const tasks: FrontierSwarmTask[] = defineSwarmTasks([{
  id: 'runtime-port',
  lane: 'runtime',
  targetRefs: ['src/runtime/index.ts'],
  verification: [{ command: 'npm', args: ['test'] }]
}]);

const plan: FrontierSwarmPlan = createSwarmPlan(manifest, tasks);
const compute: FrontierSwarmCompute = resolveSwarmCompute(manifest, tasks[0]);
const schedule: FrontierSwarmSchedule = createSwarmSchedule(plan);
const leases = createSwarmLeases({ schedule, workerId: 'worker' });
const stream: FrontierSwarmEventStream = createSwarmEventStream({ lanes: manifest.lanes });
const queueSnapshot: FrontierSwarmQueueSnapshot = createSwarmQueueSnapshot({ plan, leases });
const budget: FrontierSwarmBudgetDecision = checkSwarmBudget(plan.jobs[0], { inputTokens: 1 });
const run = createSwarmRun({
  plan,
  results: [{
    jobId: plan.jobs[0].id,
    status: 'completed',
    traceShards: [{ kind: 'trace-summary', spanCount: 1, eventCount: 2 }]
  }]
});
const checkpoint = createSwarmRunCheckpoint(run);
const reviewPlan: FrontierSwarmReviewPlan = createSwarmReviewPlan({ plan, run, reviewers: ['reviewer'] });
const mergePlan: FrontierSwarmMergePlan = createSwarmMergePlan({ plan, run, reviewPlan });
const mergeBundle: FrontierSwarmMergeBundle = createSwarmMergeBundle({ job: plan.jobs[0], result: run.results[0] });
const adaptiveLoadPlan = createSwarmAdaptiveLoadPlan({
  plan,
  observations: [{ severity: 'warning', reason: 'load spike' }]
});
const adaptiveScheduleInput = createSwarmScheduleInputFromAdaptiveLoadPlan(plan, adaptiveLoadPlan);
const dashboard = createSwarmCoordinatorDashboard({
  bundles: [mergeBundle],
  processes: [{
    id: 'coordinator',
    role: 'coordinator',
    lane: 'runtime',
    status: 'active'
  }]
});
const queriedDashboard = querySwarmCoordinatorDashboard(dashboard);
const queueOverlay: FrontierSwarmQueueOverlay = createSwarmQueueOverlay({ bundles: [mergeBundle] });
const mergeIndex: FrontierSwarmMergeIndex = createSwarmMergeIndex({ bundles: [mergeBundle] });
const admission: FrontierSwarmMergeAdmission = createSwarmMergeAdmission({ index: mergeIndex, maxReady: 1 });
const hierarchicalQueue: FrontierSwarmHierarchicalMergeQueue = createSwarmHierarchicalMergeQueue({ index: mergeIndex, admission });
const coordinatorDrainWork: FrontierSwarmCoordinatorAgentDrainWork = createSwarmCoordinatorAgentDrainWork({ queue: hierarchicalQueue });
const runStoreShards: FrontierSwarmRunStoreShards = createSwarmRunStoreShards({ plan });
const contextPack: FrontierSwarmContextPack = createSwarmContextPack({ job: plan.jobs[0] });
const oracleCorpus: FrontierSwarmOracleCorpus = createSwarmOracleCorpus({ artifacts: [{ id: 'oracle', path: 'oracle.json' }] });
const replayBundle: FrontierSwarmReplayBundle = createSwarmReplayBundle({ commands: ['node replay.mjs'] });
const parityOracle: FrontierSwarmParityOracle = createSwarmParityOracle({ comparators: [{ status: 'passed' }] });
const divergenceReport: FrontierSwarmDivergenceReport = createSwarmDivergenceReport({ observabilityPoints: [{ operationIndex: 1 }] });
const watchpointPlan: FrontierSwarmWatchpointPlan = createSwarmWatchpointPlan({ watchpoints: [{ path: '/value' }] });
const debugHandoff: FrontierSwarmDebugHandoff = createSwarmDebugHandoff({ replayBundleIds: [replayBundle.id] });
const instrumentationBudget: FrontierSwarmInstrumentationBudget = createSwarmInstrumentationBudget({ maxEvents: 10 });
const instrumentationDecision: FrontierSwarmInstrumentationBudgetDecision = checkSwarmInstrumentationBudget(instrumentationBudget, { events: 2 });
const bottleneckReport: FrontierSwarmBottleneckReport = createSwarmBottleneckReport({ sources: [{ text: 'merge conflict' }] });
const evidenceIndex: FrontierSwarmEvidenceIndex = createSwarmEvidenceIndex({ entries: [{ topic: 'timing', path: 'evidence.json' }] });
const blackboard: FrontierSwarmBlackboard = createSwarmBlackboard({ entries: [{ topic: 'fact', text: 'known divergence' }] });
const referencePlan: FrontierSwarmReferenceOraclePlan = createSwarmReferenceOraclePlan({ targets: [{ id: 'reference', role: 'reference' }] });
const referenceResponse: FrontierSwarmReferenceOracleResponse = createSwarmReferenceOracleResponse({ planId: referencePlan.id });
const artifactRoutingPlan: FrontierSwarmArtifactRoutingPlan = createSwarmArtifactRoutingPlan({ artifacts: [{ path: 'changes.patch' }] });
const schedulerRecommendations: FrontierSwarmSchedulerRecommendations = createSwarmSchedulerRecommendations({ schedule });
const fixtureCatalog: FrontierSwarmFixtureCatalog = createSwarmFixtureCatalog({ fixtures: [{ id: 'logged-in' }] });
const progressModel: FrontierSwarmProgressModel = createSwarmProgressModel({ items: [{ id: 'route', status: 'implemented' }] });
const modelRoutingFeedback: FrontierSwarmModelRoutingFeedback = createSwarmModelRoutingFeedback({
  scope: 'lane',
  lane: 'runtime',
  model: 'gpt-5.4-mini',
  selected: true,
  metadata: { source: 'types' }
});
const modelRoutingPolicy: FrontierSwarmModelRoutingPolicy = createSwarmModelRoutingPolicy({
  defaultMode: 'override',
  signals: [{
    mode: 'override',
    lane: 'runtime',
    workKind: 'continuation',
    model: 'gpt-5.4-mini',
    confidence: 'high',
    reason: 'types'
  }],
  feedback: [modelRoutingFeedback]
});
plan.routingMode satisfies FrontierSwarmModelRoutingMode | undefined;
plan.routingPolicy satisfies FrontierSwarmModelRoutingPolicy | undefined;
plan.routingPolicy?.signals satisfies FrontierSwarmModelRoutingPolicySignal[] | undefined;
plan.routingPolicy?.signals?.[0] satisfies FrontierSwarmModelRoutingPolicySignal | undefined;
plan.routingPolicy?.signals?.[0]?.mode satisfies FrontierSwarmModelRoutingMode | undefined;
plan.routingPolicy?.feedback satisfies FrontierSwarmModelRoutingFeedback[] | undefined;
plan.routingPolicy?.feedback?.[0] satisfies FrontierSwarmModelRoutingFeedback | undefined;
plan.routingContext satisfies unknown;
modelRoutingFeedback satisfies FrontierSwarmModelRoutingFeedback;
modelRoutingPolicy satisfies FrontierSwarmModelRoutingPolicy;
({} as FrontierSwarmModelRoutingFeedbackInput).scope satisfies FrontierSwarmModelRoutingFeedbackInput['scope'];
({} as FrontierSwarmModelRoutingPolicyInput).defaultMode satisfies FrontierSwarmModelRoutingPolicyInput['defaultMode'];
({} as FrontierSwarmModelRoutingPolicySignalInput).mode satisfies FrontierSwarmModelRoutingPolicySignalInput['mode'];
const semanticBroadRegionId = 'src/math.ts';
const semanticFunctionRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/math.ts',
  kind: 'named-export',
  declarationKind: 'function',
  name: 'add',
  exportName: 'add'
});
const semanticFunctionAliasRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/math.ts',
  kind: 'named-export',
  declarationKind: 'function',
  name: 'add',
  exportName: 'sum'
});
const semanticMethodRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/math.ts',
  kind: 'named-export',
  declarationKind: 'method',
  name: 'Calculator.increment',
  exportName: 'increment'
});
const semanticArrowRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/math.ts',
  kind: 'named-export',
  declarationKind: 'arrow-function',
  name: 'multiply',
  exportName: 'multiply'
});
const semanticDefaultExportRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/math.ts',
  kind: 'default-export',
  declarationKind: 'function',
  name: 'add',
  exportName: 'add'
});
const semanticDefaultExportAliasRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/math.ts',
  kind: 'default-export',
  declarationKind: 'function',
  name: 'default',
  exportName: 'add'
});
const semanticNamespaceExportRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/index.ts',
  kind: 'namespace-export',
  source: './math.ts',
  name: 'math'
});
const semanticNamespaceExportAliasRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/index.ts',
  kind: 'namespace-export',
  source: './math.ts',
  name: 'default',
  exportName: 'math'
});
const semanticReExportRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/index.ts',
  kind: 're-export',
  source: './math.ts',
  name: 'math'
});
const semanticReExportAliasRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/index.ts',
  kind: 're-export',
  source: './math.ts',
  name: 'math',
  exportName: 'default'
});
const semanticReExportDefaultRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/index.ts',
  kind: 're-export',
  source: './math.ts',
  name: 'default'
});
const semanticNamespaceExportDefaultRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/index.ts',
  kind: 'namespace-export',
  source: './math.ts',
  name: 'default'
});
const semanticInterfaceRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/types.ts',
  kind: 'type',
  declarationKind: 'interface',
  name: 'Person'
});
const semanticTypeAliasRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/types.ts',
  kind: 'type',
  declarationKind: 'type-alias',
  name: 'Identifier'
});
const semanticEnumRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/types.ts',
  kind: 'type',
  declarationKind: 'enum',
  name: 'Mode'
});
const semanticGenericRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/types.ts',
  kind: 'type',
  declarationKind: 'generic-declaration',
  name: 'Response'
});
const sameFileIndependentExportFormatRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/math.ts',
  kind: 'named-export',
  declarationKind: 'function',
  name: 'formatTitle',
  exportName: 'formatTitle'
});
const sameFileIndependentExportParseRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/math.ts',
  kind: 'named-export',
  declarationKind: 'function',
  name: 'parseTitle',
  exportName: 'parseTitle'
});
const sameSymbolConflict: FrontierSwarmMergeConflict = {
  jobIds: ['job-a', 'job-b'],
  key: 'symbol:formatTitle',
  kind: 'symbol',
  symbol: 'formatTitle'
};
const semanticImport: FrontierSwarmSemanticImportSummary = {
  total: 1,
  selected: 1,
  imported: 1,
  errors: 0,
  sourceMapMappingCount: 3,
  records: [{
    path: 'src/math.ts',
    status: 'imported',
    mergeCandidate: {
      touchedSymbols: ['add', 'Calculator.increment', 'multiply']
    }
  }],
  summary: {
    total: 1,
    selected: 1,
    eligible: 1,
    omitted: 0,
    maxFiles: 1,
    maxBytes: 1024,
    imported: 1,
    skipped: 0,
    errors: 0,
    sourceMapCount: 1,
    sourceMapMappingCount: 3,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 3, occurrences: 3, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const semanticExportImport: FrontierSwarmSemanticImportSummary = {
  total: 2,
  selected: 2,
  imported: 2,
  errors: 0,
  sourceMapMappingCount: 4,
  records: [
    {
      path: 'src/math.ts',
      status: 'imported',
      mergeCandidate: {
        exports: [
          {
            kind: 'named-export',
            declarationKind: 'function',
            name: 'add',
            exportName: 'sum'
          },
          {
            kind: 'default-export',
            declarationKind: 'function',
            name: 'default',
            exportName: 'add'
          }
        ]
      }
    },
    {
      path: 'src/index.ts',
      status: 'imported',
      mergeCandidate: {
        exports: [
          {
            kind: 're-export',
            source: './math.ts',
            name: 'math'
          },
          {
            kind: 'namespace-export',
            source: './math.ts',
            name: 'math'
          }
        ]
      }
    }
  ],
  summary: {
    total: 2,
    selected: 2,
    eligible: 2,
    omitted: 0,
    maxFiles: 2,
    maxBytes: 2048,
    imported: 2,
    skipped: 0,
    errors: 0,
    sourceMapCount: 2,
    sourceMapMappingCount: 4,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 2, symbols: 4, occurrences: 4, relations: 0, facts: 0 },
    readiness: { ready: 2 }
  }
};
const semanticDefaultExportImport: FrontierSwarmSemanticImportSummary = {
  total: 1,
  selected: 1,
  imported: 1,
  errors: 0,
  sourceMapMappingCount: 2,
  records: [
    {
      path: 'src/index.ts',
      status: 'imported',
      mergeCandidate: {
        reExports: [
          {
            source: './math.ts',
            name: 'default'
          }
        ],
        namespaceExports: [
          {
            source: './math.ts',
            name: 'default'
          }
        ]
      }
    }
  ],
  summary: {
    total: 1,
    selected: 1,
    eligible: 1,
    omitted: 0,
    maxFiles: 1,
    maxBytes: 1024,
    imported: 1,
    skipped: 0,
    errors: 0,
    sourceMapCount: 1,
    sourceMapMappingCount: 2,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 2, occurrences: 2, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const semanticInferredExportImport: FrontierSwarmSemanticImportSummary = {
  total: 2,
  selected: 2,
  imported: 2,
  errors: 0,
  sourceMapMappingCount: 4,
  records: [
    {
      path: 'src/math.ts',
      status: 'imported',
      mergeCandidate: {
        namedExports: [
          {
            declarationKind: 'function',
            name: 'add',
            exportName: 'add'
          },
          {
            declarationKind: 'function',
            name: 'default',
            exportName: 'add'
          }
        ],
        defaultExports: [
          {
            declarationKind: 'function',
            name: 'default',
            exportName: 'add'
          }
        ]
      }
    },
    {
      path: 'src/index.ts',
      status: 'imported',
      mergeCandidate: {
        reExports: [
          {
            source: './math.ts',
            name: 'math'
          }
        ],
        namespaceExports: [
          {
            source: './math.ts',
            name: 'math'
          }
        ]
      }
    }
  ],
  summary: {
    total: 2,
    selected: 2,
    eligible: 2,
    omitted: 0,
    maxFiles: 2,
    maxBytes: 2048,
    imported: 2,
    skipped: 0,
    errors: 0,
    sourceMapCount: 2,
    sourceMapMappingCount: 4,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 2, symbols: 4, occurrences: 4, relations: 0, facts: 0 },
    readiness: { ready: 2 }
  }
};
const semanticNamespaceOnlyExportImport: FrontierSwarmSemanticImportSummary = {
  total: 1,
  selected: 1,
  imported: 1,
  errors: 0,
  sourceMapMappingCount: 1,
  records: [
    {
      path: 'src/index.ts',
      status: 'imported',
      mergeCandidate: {
        namespaceExports: [
          {
            source: './math.ts',
            name: 'math'
          }
        ]
      }
    }
  ],
  summary: {
    total: 1,
    selected: 1,
    eligible: 1,
    omitted: 0,
    maxFiles: 1,
    maxBytes: 1024,
    imported: 1,
    skipped: 0,
    errors: 0,
    sourceMapCount: 1,
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const semanticReExportOnlyImport: FrontierSwarmSemanticImportSummary = {
  total: 1,
  selected: 1,
  imported: 1,
  errors: 0,
  sourceMapMappingCount: 1,
  records: [
    {
      path: 'src/index.ts',
      status: 'imported',
      mergeCandidate: {
        reExports: [
          {
            source: './math.ts',
            name: 'math'
          }
        ]
      }
    }
  ],
  summary: {
    total: 1,
    selected: 1,
    eligible: 1,
    omitted: 0,
    maxFiles: 1,
    maxBytes: 1024,
    imported: 1,
    skipped: 0,
    errors: 0,
    sourceMapCount: 1,
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const semanticDefaultOnlyExportImport: FrontierSwarmSemanticImportSummary = {
  total: 1,
  selected: 1,
  imported: 1,
  errors: 0,
  sourceMapMappingCount: 1,
  records: [
    {
      path: 'src/math.ts',
      status: 'imported',
      mergeCandidate: {
        defaultExports: [
          {
            declarationKind: 'function',
            name: 'default',
            exportName: 'add'
          }
        ]
      }
    }
  ],
  summary: {
    total: 1,
    selected: 1,
    eligible: 1,
    omitted: 0,
    maxFiles: 1,
    maxBytes: 1024,
    imported: 1,
    skipped: 0,
    errors: 0,
    sourceMapCount: 1,
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const semanticTypeImport: FrontierSwarmSemanticImportSummary = {
  total: 1,
  selected: 1,
  imported: 1,
  errors: 0,
  sourceMapMappingCount: 4,
  records: [{
    path: 'src/types.ts',
    status: 'imported',
    mergeCandidate: {
      touchedSemanticNodes: [
        {
          kind: 'interface',
          name: 'Person'
        },
        {
          kind: 'type-alias',
          name: 'Identifier'
        },
        {
          kind: 'enum',
          name: 'Mode'
        },
        {
          kind: 'generic-declaration',
          name: 'Response'
        }
      ]
    }
  }],
  summary: {
    total: 1,
    selected: 1,
    eligible: 1,
    omitted: 0,
    maxFiles: 1,
    maxBytes: 1024,
    imported: 1,
    skipped: 0,
    errors: 0,
    sourceMapCount: 1,
    sourceMapMappingCount: 4,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 4, occurrences: 4, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const semanticFunctionLikeImport: FrontierSwarmSemanticImportSummary = {
  total: 1,
  selected: 1,
  imported: 1,
  errors: 0,
  sourceMapMappingCount: 3,
  records: [{
    path: 'src/math.ts',
    status: 'imported',
    mergeCandidate: {
      exports: [
        {
          kind: 'function',
          name: 'add',
          exportName: 'sum'
        },
        {
          kind: 'method',
          name: 'Calculator.increment',
          exportName: 'increment'
        },
        {
          kind: 'arrow-function',
          name: 'multiply',
          exportName: 'multiply'
        }
      ]
    }
  }],
  summary: {
    total: 1,
    selected: 1,
    eligible: 1,
    omitted: 0,
    maxFiles: 1,
    maxBytes: 1024,
    imported: 1,
    skipped: 0,
    errors: 0,
    sourceMapCount: 1,
    sourceMapMappingCount: 3,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 3, occurrences: 3, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const semanticTask: FrontierSwarmTask = defineSwarmTasks([{
  id: 'math-exports',
  lane: 'runtime',
  targetRefs: ['src/math.ts'],
  ownershipRegions: [
    {
      id: semanticBroadRegionId,
      globs: ['src/math.ts']
    },
    {
      id: semanticFunctionRegionId,
      globs: ['src/math.ts']
    },
    {
      id: semanticMethodRegionId,
      globs: ['src/math.ts']
    },
    {
      id: semanticArrowRegionId,
      globs: ['src/math.ts']
    }
  ],
  changedRegions: [semanticBroadRegionId]
}])[0];
const semanticManifest = createSwarmManifest({
  compute: [{ id: 'deep', kind: 'codex', model: 'gpt-5.5', reasoningEffort: 'xhigh' }],
  lanes: [{ id: 'runtime', compute: 'deep', allowedWrites: ['src/**'] }],
  policy: { defaultCompute: 'deep' }
});
const semanticPlan = createSwarmPlan(semanticManifest, [semanticTask]);
const semanticBundle = createSwarmMergeBundle({
  job: semanticPlan.jobs[0],
  result: {
    jobId: semanticPlan.jobs[0].id,
    status: 'verified',
    changedPaths: ['src/math.ts'],
    changedRegions: [semanticBroadRegionId],
    queueItemIds: ['math-exports'],
    verification: [{ status: 0 }],
    traceShards: [{ kind: 'trace-summary', spanCount: 3, eventCount: 4 }]
  },
  semanticImport
});
const semanticFunctionLikeTask: FrontierSwarmTask = defineSwarmTasks([{
  id: 'math-function-method-arrow-regions',
  lane: 'runtime',
  targetRefs: ['src/math.ts'],
  ownershipRegions: [
    {
      id: semanticBroadRegionId,
      globs: ['src/math.ts']
    },
    {
      id: semanticFunctionRegionId,
      globs: ['src/math.ts'],
      selectors: [semanticFunctionRegionId]
    },
    {
      id: semanticMethodRegionId,
      globs: ['src/math.ts'],
      selectors: [semanticMethodRegionId]
    },
    {
      id: semanticArrowRegionId,
      globs: ['src/math.ts'],
      selectors: [semanticArrowRegionId]
    }
  ],
  changedRegions: [semanticBroadRegionId]
}])[0];
const semanticFunctionLikePlan = createSwarmPlan(semanticManifest, [semanticFunctionLikeTask]);
const semanticFunctionLikeChangedRegionIds = resolveSwarmChangedRegions(
  semanticFunctionLikePlan.jobs[0],
  ['src/math.ts'],
  semanticFunctionLikeImport
);
semanticFunctionLikeChangedRegionIds satisfies string[];
const semanticFunctionLikeBundle = createSwarmMergeBundle({
  job: semanticFunctionLikePlan.jobs[0],
  result: {
    jobId: semanticFunctionLikePlan.jobs[0].id,
    status: 'verified',
    changedPaths: ['src/math.ts'],
    changedRegions: [semanticBroadRegionId],
    queueItemIds: ['math-function-method-arrow-regions'],
    verification: [{ status: 0 }]
  },
  semanticImport: semanticFunctionLikeImport,
  riskLevel: 'low'
});
semanticFunctionLikeBundle.changedRegions satisfies string[];
const semanticExportTask: FrontierSwarmTask = defineSwarmTasks([{
  id: 'export-regions',
  lane: 'runtime',
  targetRefs: ['src/math.ts', 'src/index.ts'],
  ownershipRegions: [
    {
      id: semanticFunctionRegionId,
      globs: ['src/math.ts'],
      selectors: [semanticFunctionRegionId]
    },
    {
      id: semanticDefaultExportRegionId,
      globs: ['src/math.ts'],
      selectors: [semanticDefaultExportRegionId]
    },
    {
      id: semanticNamespaceExportRegionId,
      globs: ['src/index.ts'],
      selectors: [semanticNamespaceExportRegionId]
    },
    {
      id: semanticReExportRegionId,
      globs: ['src/index.ts'],
      selectors: [semanticReExportRegionId]
    }
  ],
  changedRegions: [semanticBroadRegionId]
}])[0];
const semanticExportPlan = createSwarmPlan(semanticManifest, [semanticExportTask]);
const exportChangedRegionIds = resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/math.ts', 'src/index.ts'], semanticExportImport);
exportChangedRegionIds satisfies string[];
const inferredExportChangedRegionIds = resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/math.ts', 'src/index.ts'], semanticInferredExportImport);
inferredExportChangedRegionIds satisfies string[];
const namespaceOnlyExportChangedRegionIds = resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/index.ts'], semanticNamespaceOnlyExportImport);
namespaceOnlyExportChangedRegionIds satisfies string[];
const reExportOnlyChangedRegionIds = resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/index.ts'], semanticReExportOnlyImport);
reExportOnlyChangedRegionIds satisfies string[];
const semanticDefaultExportTask: FrontierSwarmTask = defineSwarmTasks([{
  id: 'default-export-regions',
  lane: 'runtime',
  targetRefs: ['src/index.ts'],
  ownershipRegions: [
    {
      id: semanticReExportDefaultRegionId,
      globs: ['src/index.ts'],
      selectors: [semanticReExportDefaultRegionId]
    },
    {
      id: semanticNamespaceExportDefaultRegionId,
      globs: ['src/index.ts'],
      selectors: [semanticNamespaceExportDefaultRegionId]
    }
  ],
  changedRegions: [semanticBroadRegionId]
}])[0];
const semanticDefaultExportPlan = createSwarmPlan(semanticManifest, [semanticDefaultExportTask]);
const defaultExportChangedRegionIds = resolveSwarmChangedRegions(semanticDefaultExportPlan.jobs[0], ['src/index.ts'], semanticDefaultExportImport);
defaultExportChangedRegionIds satisfies string[];
const defaultOnlyExportChangedRegionIds = resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/math.ts'], semanticDefaultOnlyExportImport);
defaultOnlyExportChangedRegionIds satisfies string[];
const autoReviewReport: FrontierSwarmAutoReviewReport = createSwarmAutoReviewReport({ bundles: [mergeBundle] });
const rebaseReport: FrontierSwarmRebaseReport = createSwarmRebaseReport({ mergeIndex });
const usageGovernor: FrontierSwarmUsageGovernor = createSwarmUsageGovernor({ maxWorkers: 20 });
const usageDecision: FrontierSwarmUsageGovernorDecision = checkSwarmUsageGovernor(usageGovernor, { activeWorkers: 1 });
const lanePlaybook: FrontierSwarmLanePlaybook = createSwarmLanePlaybook({ lane: 'runtime', successfulBundles: [mergeBundle] });
const patchStackPlan: FrontierSwarmPatchStackPlan = createSwarmPatchStackPlan({ index: mergeIndex });

plan.jobs[0].allowedWrites satisfies string[];
compute.model satisfies string | undefined;
schedule.ready satisfies readonly { jobId: string }[];
leases[0]?.token satisfies string | undefined;
stream.global.eventTypes satisfies string[];
queueSnapshot.summary.jobCount satisfies number;
checkpoint.hash satisfies string;
budget.ok satisfies boolean;
reviewPlan.assignments satisfies readonly { jobId: string }[];
mergePlan.ready satisfies string[];
mergeBundle.queueItemIds satisfies string[];
run.results[0].traceShards satisfies JsonValue[] | undefined;
mergeBundle.traceShards satisfies JsonValue[] | undefined;
dashboard.jobs[0].traceShards satisfies JsonValue[] | undefined;
adaptiveLoadPlan.kind satisfies 'frontier.swarm.adaptive-load-plan';
adaptiveLoadPlan.summary.observationCount satisfies number;
adaptiveScheduleInput.plan satisfies FrontierSwarmPlan;
adaptiveScheduleInput.maxReadyJobs satisfies number | undefined;
queriedDashboard.processes satisfies FrontierSwarmCoordinatorProcessInput[];
semanticBundle.traceShards satisfies JsonValue[] | undefined;
queueOverlay.entries satisfies readonly { queueItemId: string }[];
mergeIndex.entries satisfies readonly { jobId: string }[];
admission.admitted satisfies string[];
hierarchicalQueue.rootScopeId satisfies string;
hierarchicalQueue.scopes satisfies readonly FrontierSwarmMergeQueueScope[];
hierarchicalQueue.assignments satisfies readonly FrontierSwarmMergeQueueAssignment[];
hierarchicalQueue.assignments satisfies readonly { scopeId: string; parentScopeIds: string[]; leaseKey: string; queueItemIds: string[]; action: string }[];
hierarchicalQueue.assignments[0]?.retrySlices satisfies FrontierSwarmMergeQueueRetrySlice[] | undefined;
hierarchicalQueue.assignments[0]?.semanticSliceScopeIds satisfies string[] | undefined;
hierarchicalQueue.assignments[0]?.semanticSliceLeaseKeys satisfies string[] | undefined;
hierarchicalQueue.assignments[0]?.parentDecisionRegions satisfies string[] | undefined;
hierarchicalQueue.assignments[0]?.unknownRegions satisfies string[] | undefined;
hierarchicalQueue.byScope satisfies Record<string, string[]>;
hierarchicalQueue.summary.admissionPressure.promoteUpwardCount satisfies number;
hierarchicalQueue.summary.admissionPressure.trueBlockQueueItemCount satisfies number;
coordinatorDrainWork.rootQueueId satisfies string;
coordinatorDrainWork.leases satisfies readonly { id: string; queueId: string; leaseScope: string; leaseKey: string; jobIds: string[] }[];
coordinatorDrainWork.assignments satisfies readonly { queueId: string; rootQueueId: string; parentQueueIds: string[]; queueItemIds: string[]; leaseId: string; leaseScope: string }[];
coordinatorDrainWork.assignments[0]?.retrySlices satisfies FrontierSwarmMergeQueueRetrySlice[] | undefined;
coordinatorDrainWork.assignments[0]?.semanticSliceLeaseKeys satisfies string[] | undefined;
coordinatorDrainWork.activeAssignments satisfies readonly { queueId: string; leaseId: string; leaseScope: string; queueItemIds: string[] }[];
coordinatorDrainWork.terminalDecisions satisfies readonly { queueId: string; leaseId: string; leaseScope: string; queueItemIds: string[] }[];
coordinatorDrainWork.terminalDecisions[0]?.retrySlices satisfies FrontierSwarmMergeQueueRetrySlice[] | undefined;
coordinatorDrainWork.blockers satisfies readonly { leaseScope: string; queueItemIds: string[] }[];
coordinatorDrainWork.byDecision satisfies Record<string, string[]>;
coordinatorDrainWork.byClassification satisfies Record<string, string[]>;
coordinatorDrainWork.byLeaseScope satisfies Record<string, string[]>;
coordinatorDrainWork.summary.admissionPressure.applyLocalQueueItemCount satisfies number;
coordinatorDrainWork.summary.rootQueueSelectionPressure satisfies FrontierSwarmCoordinatorAgentRootQueueSelectionPressure;
coordinatorDrainWork.summary.rootQueueSelectionPressure.rootQueueId satisfies string;
coordinatorDrainWork.summary.rootQueueSelectionPressure.promotedJobIds satisfies string[];
coordinatorDrainWork.summary.rootQueueSelectionPressure.byReason satisfies Record<string, string[]>;
coordinatorDrainWork.summary.rootQueueSelectionPressure.admissionPressure.promoteUpwardQueueItemCount satisfies number;
runStoreShards.shards satisfies readonly { path: string }[];
contextPack.files satisfies string[];
contextPack.commands satisfies readonly { command: string }[];
contextPack.oracleCommands satisfies readonly { command: string }[];
contextPack.expectedEvidence satisfies string[];
contextPack.exclusions satisfies string[];
oracleCorpus.artifacts satisfies readonly { id: string }[];
replayBundle.commands satisfies readonly { command: string }[];
parityOracle.comparators satisfies readonly { status: string }[];
divergenceReport.observabilityPoints satisfies readonly { id: string }[];
watchpointPlan.watchpoints satisfies readonly { action: string }[];
debugHandoff.replayBundleIds satisfies string[];
instrumentationBudget.captureKinds satisfies string[];
instrumentationDecision.ok satisfies boolean;
bottleneckReport.classifications satisfies readonly { kind: string }[];
querySwarmEvidenceIndex(evidenceIndex, { topic: 'timing' }).summary.entryCount satisfies number;
querySwarmBlackboard(blackboard, { topic: 'fact' }).summary.entryCount satisfies number;
const backlogForTypes = createSwarmBacklog({
  entries: [
    { id: 'backlog-ready', title: 'Backlog ready', status: 'ready' }
  ]
});
const backlogTaskPlanForTypes = createSwarmBacklogTaskPlan({ backlog: backlogForTypes });
const backlogMergeForTypes = mergeSwarmBacklogs({
  base: backlogForTypes,
  entries: [{ id: 'backlog-ready', title: 'Backlog ready updated', status: 'verified' }]
});
const queriedBacklogForTypes = querySwarmBacklog(backlogMergeForTypes, { status: 'verified' });
backlogForTypes satisfies FrontierSwarmBacklog;
backlogTaskPlanForTypes satisfies FrontierSwarmBacklogTaskPlan;
queriedBacklogForTypes satisfies FrontierSwarmBacklog;
({} as FrontierSwarmBacklogInput).entries satisfies readonly FrontierSwarmBacklogEntryInput[] | undefined;
({} as FrontierSwarmBacklogTaskPlanInput).backlog satisfies FrontierSwarmBacklog | FrontierSwarmBacklogInput;
({} as FrontierSwarmBacklogTaskPlanMetadata) satisfies JsonValue;
({} as FrontierSwarmBacklogTaskPlanMetadata).sourceId satisfies string | undefined;
({} as FrontierSwarmBacklogTaskPlanMetadata).sourceKind satisfies string | undefined;
({} as FrontierSwarmBacklogTaskPlanMetadata).remainingDepth satisfies number | undefined;
({} as FrontierSwarmBacklogTaskPlanMetadata).childArtifactPath satisfies string | undefined;
({} as FrontierSwarmBacklogTaskPlanMetadata).parentTaskId satisfies string | undefined;
({} as FrontierSwarmBacklogTaskPlanMetadata).source satisfies { kind?: string; id?: string; taskId?: string } | undefined;
({} as FrontierSwarmBacklogTaskPlanMetadata).continuation satisfies { remainingDepth?: number; childArtifactPath?: string } | undefined;
({} as FrontierSwarmBacklogDecompositionMetadata).remainingDepth satisfies number;
({} as FrontierSwarmBacklogContinuationTaskPlanMetadata).parentTaskId satisfies string | undefined;
referencePlan.targets satisfies readonly { id: string }[];
referenceResponse.targetResults satisfies readonly { targetId: string }[];
artifactRoutingPlan.routes satisfies readonly { bucket: string }[];
schedulerRecommendations.recommendations satisfies readonly { action: string }[];
fixtureCatalog.fixtures satisfies readonly { id: string }[];
progressModel.byStatus satisfies Record<string, string[]>;
semanticFunctionRegionId satisfies string;
semanticFunctionAliasRegionId satisfies string;
semanticMethodRegionId satisfies string;
semanticArrowRegionId satisfies string;
semanticDefaultExportRegionId satisfies string;
semanticDefaultExportAliasRegionId satisfies string;
semanticNamespaceExportRegionId satisfies string;
semanticNamespaceExportAliasRegionId satisfies string;
semanticReExportDefaultRegionId satisfies string;
semanticNamespaceExportDefaultRegionId satisfies string;
semanticInterfaceRegionId satisfies string;
semanticTypeAliasRegionId satisfies string;
semanticEnumRegionId satisfies string;
semanticGenericRegionId satisfies string;
createSwarmSemanticOwnershipStableKey({
  kind: 'namespace-export',
  source: './math.ts',
  name: 'math'
}) satisfies string;
semanticReExportRegionId satisfies string;
semanticReExportAliasRegionId satisfies string;
semanticDefaultExportImport satisfies FrontierSwarmSemanticImportSummary;
semanticTypeImport satisfies FrontierSwarmSemanticImportSummary;
sameFileIndependentExportFormatRegionId satisfies string;
sameFileIndependentExportParseRegionId satisfies string;
sameSymbolConflict.kind satisfies FrontierSwarmMergeConflict['kind'];
sameSymbolConflict.symbol satisfies string | undefined;
semanticTask.ownershipRegions[0].id satisfies string;
semanticBundle.changedRegions satisfies string[];
autoReviewReport.findings satisfies readonly { kind: string }[];
rebaseReport.entries satisfies readonly { status: string }[];
usageDecision.ok satisfies boolean;
lanePlaybook.successfulJobIds satisfies string[];
patchStackPlan.stacks satisfies readonly { jobIds: string[] }[];
({} as FrontierSwarmMergeAdmissionPressure).recordOnlyQueueItemCount satisfies number;
({} as FrontierSwarmArtifactIndex).summary satisfies { artifactCount: number };
