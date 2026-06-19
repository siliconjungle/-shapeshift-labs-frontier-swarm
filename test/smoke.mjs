import assert from 'node:assert';
import {
  FRONTIER_SWARM_CONTINUOUS_POOL_STATE_KIND,
  FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_KIND,
  FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID,
  FRONTIER_SWARM_LEASE_KIND,
  FRONTIER_SWARM_LEASE_VERSION,
  FRONTIER_SWARM_MODEL_ROUTE_KIND,
  FRONTIER_SWARM_PANEL_EVALUATION_KIND,
  FRONTIER_SWARM_PRIORITY_POLICY_KIND,
  FRONTIER_SWARM_QUEUE_OUTCOME_MODEL_KIND,
  FRONTIER_SWARM_TERMINAL_OUTCOME_LABELS,
  FRONTIER_SWARM_TERMINAL_STATE_RECONCILIATION_KIND,
  FRONTIER_SWARM_SEMANTIC_OWNERSHIP_CLI_COMMAND_STABLE_KEY_KIND,
  FRONTIER_SWARM_SEMANTIC_OWNERSHIP_DOCS_SECTION_STABLE_KEY_KIND,
  FRONTIER_SWARM_SEMANTIC_OWNERSHIP_EXPORT_STABLE_KEY_KIND,
  FRONTIER_SWARM_SEMANTIC_OWNERSHIP_FIXTURE_FAMILY_STABLE_KEY_KIND,
  FRONTIER_SWARM_SEMANTIC_OWNERSHIP_NAMESPACE_EXPORT_STABLE_KEY_KIND,
  FRONTIER_SWARM_SEMANTIC_OWNERSHIP_TEST_CASE_STABLE_KEY_KIND,
  FRONTIER_SWARM_SEMANTIC_OWNERSHIP_TYPE_STABLE_KEY_KIND,
  checkSwarmOwnership,
  classifySwarmMergeDisposition,
  classifySwarmMergeReadiness,
  classifySwarmQueueOutcome,
  collapseSwarmQueueOutcomeDecisions,
  completeSwarmJob,
  compileSwarm,
  checkSwarmBudget,
  checkSwarmInstrumentationBudget,
  checkSwarmUsageGovernor,
  createSwarmArtifactIndex,
  createSwarmArtifactRoutingPlan,
  createSwarmAutoReviewReport,
  createSwarmBlackboard,
  createSwarmBottleneckReport,
  createSwarmBacklog,
  createSwarmBacklogTaskPlan,
  createSwarmContinuousPoolState,
  createSwarmCoordinatorAgentDrainWork,
  createSwarmCoordinatorDashboard,
  createSwarmContextPack,
  createSwarmDebugHandoff,
  createSwarmDivergenceReport,
  createSwarmEventStream,
  createSwarmEvidenceIndex,
  createSwarmFixtureCatalog,
  createSwarmInstrumentationBudget,
  createSwarmLeases,
  createSwarmHotspotReport,
  createSwarmHierarchicalMergeQueue,
  createSwarmLanePlaybook,
  createSwarmMergeAdmission,
  createSwarmManifest,
  createSwarmMergeBundle,
  mergeSwarmBacklogs,
  createSwarmMergeIndex,
  createSwarmModelRoutingFeedback,
  createSwarmModelRoutingPolicy,
  createSwarmModelRoute,
  createSwarmOracleCorpus,
  createSwarmPatchStackPlan,
  createSwarmParityOracle,
  createSwarmPanelEvaluation,
  createSwarmProgressModel,
  createSwarmSemanticOwnershipStableKey,
  createSwarmSemanticOwnershipRegionId,
  createSwarmQueueOutcomeDecision,
  createSwarmQueueOutcomeModel,
  createSwarmRebaseReport,
  createSwarmReferenceOraclePlan,
  createSwarmReferenceOracleResponse,
  createSwarmReplayBundle,
  createSwarmMergePlan,
  createSwarmPlan,
  createSwarmProof,
  createSwarmQueueOverlay,
  createSwarmQueueSnapshot,
  createSwarmReviewPlan,
  createSwarmReviewerLanePlan,
  createSwarmRunStoreShards,
  createSwarmRunCheckpoint,
  createSwarmRun,
  createSwarmSchedule,
  createSwarmSchedulerRecommendations,
  createSwarmTaskSelection,
  createSwarmUsageGovernor,
  createSwarmWatchpointPlan,
  decodeSwarmJsonl,
  decomposeSwarmFeature,
  defineSwarmManifest,
  defineSwarmTasks,
  encodeSwarmJsonl,
  deriveSwarmQueueStatus,
  matchesGlob,
  querySwarmBlackboard,
  querySwarmBacklog,
  querySwarmEvidenceIndex,
  recordSwarmEvent,
  renewSwarmLease,
  reconcileSwarmTerminalState,
  normalizeSwarmTerminalOutcome,
  resolveSwarmChangedRegions,
  checkSwarmRegionOwnership,
  resolveSwarmCompute,
  routeSwarmEventToMailboxes,
  mergeSwarmMetadata,
  summarizeSwarmCoordinatorAgentDrainWork,
  validateSwarmManifest
} from '../dist/index.js';

const manifest = defineSwarmManifest({
  id: 'inkwell.swarm',
  package: '@app/inkwell',
  compute: [
    { id: 'deep', kind: 'codex', model: 'gpt-5.5', reasoningEffort: 'xhigh', sandbox: 'workspace-write', approval: 'never' },
    { id: 'fast', kind: 'codex', model: 'gpt-5.4-mini', reasoningEffort: 'medium' }
  ],
  layers: [
    { id: 'parent', childCompute: { implementation: 'deep', evidence: 'fast' } },
    { id: 'implementation', parentId: 'parent' },
    { id: 'evidence', parentId: 'parent' }
  ],
  lanes: [
    {
      id: 'runtime',
      layer: 'implementation',
      allowedWrites: ['inkwell/apps/web/src/runtime/**'],
      sharedReadOnly: ['inkwell/features/**'],
      ownershipRegions: [
        {
          id: 'content.docs',
          globs: ['inkwell/apps/web/src/runtime/runtime-website-content.ts'],
          selectors: ['content.docs.*']
        }
      ],
      evidencePrefix: 'inkwell/.frontier/evidence/runtime/',
      worktreePath: '../json-diff-inkwell-runtime',
      handoffCommands: [{ name: 'lint', command: 'npm', args: ['run', 'inkwell:lint'] }]
    },
    {
      id: 'harness',
      layer: 'evidence',
      allowedWrites: ['inkwell/e2e.mjs'],
      evidencePrefix: 'inkwell/.frontier/evidence/harness/',
      capabilities: ['browser.playwright'],
      resourceRequirements: {
        resources: { browser: 1 },
        browser: {
          required: true,
          portPool: [4177, 4178],
          profileDirPrefix: 'agent-runs/browser-profiles/',
          maxConcurrency: 1
        }
      }
    }
  ],
  policy: {
    defaultCompute: 'fast',
    defaultConcurrency: 4,
    sharedReadOnly: ['README.md'],
    neverEditWithoutParent: ['package.json']
  }
});

assert.strictEqual(createSwarmManifest().compute[0].id, FRONTIER_SWARM_DEFAULT_CODEX_COMPUTE_ID);
assert.strictEqual(validateSwarmManifest(manifest).valid, true);
assert.strictEqual(compileSwarm(manifest).lanesById.get('runtime').layer, 'implementation');

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
assert.strictEqual(semanticFunctionRegionId, 'src/math.ts#semanticOwnershipRegion:exported-declaration:function:add:add');
assert.strictEqual(semanticFunctionAliasRegionId, semanticFunctionRegionId);
assert.strictEqual(semanticFunctionRegionId, semanticDefaultExportRegionId);
assert.strictEqual(semanticNamespaceExportRegionId, 'src/index.ts#semanticOwnershipRegion:namespace-export:./math.ts:math');
assert.strictEqual(semanticNamespaceExportAliasRegionId, semanticNamespaceExportRegionId);
assert.strictEqual(semanticReExportRegionId, 'src/index.ts#semanticOwnershipRegion:re-export:./math.ts:math');
assert.strictEqual(semanticReExportAliasRegionId, semanticReExportRegionId);
assert.strictEqual(semanticReExportDefaultRegionId, 'src/index.ts#semanticOwnershipRegion:re-export:./math.ts:default');
assert.strictEqual(semanticNamespaceExportDefaultRegionId, 'src/index.ts#semanticOwnershipRegion:namespace-export:./math.ts:default');
assert.notStrictEqual(semanticNamespaceExportRegionId, semanticReExportRegionId);
assert.notStrictEqual(semanticReExportDefaultRegionId, semanticReExportRegionId);
assert.notStrictEqual(semanticNamespaceExportDefaultRegionId, semanticNamespaceExportRegionId);
assert.strictEqual(createSwarmSemanticOwnershipStableKey({
  kind: 'type',
  declarationKind: 'type-alias',
  name: 'MathNumber'
}), `${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_TYPE_STABLE_KEY_KIND}:type-alias:MathNumber:MathNumber`);
assert.strictEqual(createSwarmSemanticOwnershipStableKey({
  kind: 'cli-command',
  command: 'npm test'
}), `${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_CLI_COMMAND_STABLE_KEY_KIND}:npm_test`);
assert.strictEqual(createSwarmSemanticOwnershipStableKey({
  kind: 'docs-section',
  section: 'hierarchical-merge-queues'
}), `${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_DOCS_SECTION_STABLE_KEY_KIND}:hierarchical-merge-queues`);
assert.strictEqual(createSwarmSemanticOwnershipStableKey({
  kind: 'fixture-family',
  family: 'browser-smoke-fixtures'
}), `${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_FIXTURE_FAMILY_STABLE_KEY_KIND}:browser-smoke-fixtures`);
assert.strictEqual(createSwarmSemanticOwnershipStableKey({
  kind: 'namespace-export',
  source: './math.ts',
  name: 'math'
}), `${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_NAMESPACE_EXPORT_STABLE_KEY_KIND}:./math.ts:math`);
assert.strictEqual(createSwarmSemanticOwnershipStableKey({
  kind: 'test-case',
  testCase: 'semantic-ownership-keys'
}), `${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_TEST_CASE_STABLE_KEY_KIND}:semantic-ownership-keys`);
assert.strictEqual(FRONTIER_SWARM_SEMANTIC_OWNERSHIP_EXPORT_STABLE_KEY_KIND, 'exported-declaration');
assert.strictEqual(FRONTIER_SWARM_SEMANTIC_OWNERSHIP_TYPE_STABLE_KEY_KIND, 'type-declaration');
assert.strictEqual(FRONTIER_SWARM_SEMANTIC_OWNERSHIP_CLI_COMMAND_STABLE_KEY_KIND, 'cli-command');
assert.strictEqual(FRONTIER_SWARM_SEMANTIC_OWNERSHIP_DOCS_SECTION_STABLE_KEY_KIND, 'docs-section');
assert.strictEqual(FRONTIER_SWARM_SEMANTIC_OWNERSHIP_FIXTURE_FAMILY_STABLE_KEY_KIND, 'fixture-family');
assert.strictEqual(FRONTIER_SWARM_SEMANTIC_OWNERSHIP_TEST_CASE_STABLE_KEY_KIND, 'test-case');
assert.strictEqual(createSwarmSemanticOwnershipRegionId({
  file: 'src/types.ts',
  kind: 'type',
  declarationKind: 'type-alias',
  name: 'MathNumber'
}), `src/types.ts#semanticOwnershipRegion:${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_TYPE_STABLE_KEY_KIND}:type-alias:MathNumber:MathNumber`);
assert.strictEqual(createSwarmSemanticOwnershipRegionId({
  file: 'src/cli.ts',
  kind: 'cli-command',
  command: 'npm test'
}), `src/cli.ts#semanticOwnershipRegion:${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_CLI_COMMAND_STABLE_KEY_KIND}:npm_test`);
assert.strictEqual(createSwarmSemanticOwnershipRegionId({
  file: 'README.md',
  kind: 'docs-section',
  section: 'hierarchical-merge-queues'
}), `README.md#semanticOwnershipRegion:${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_DOCS_SECTION_STABLE_KEY_KIND}:hierarchical-merge-queues`);
assert.strictEqual(createSwarmSemanticOwnershipRegionId({
  file: 'fixtures/browser-smoke.json',
  kind: 'fixture-family',
  family: 'browser-smoke-fixtures'
}), `fixtures/browser-smoke.json#semanticOwnershipRegion:${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_FIXTURE_FAMILY_STABLE_KEY_KIND}:browser-smoke-fixtures`);
assert.strictEqual(createSwarmSemanticOwnershipRegionId({
  file: 'test/smoke.mjs',
  kind: 'test-case',
  testCase: 'semantic-ownership-keys'
}), `test/smoke.mjs#semanticOwnershipRegion:${FRONTIER_SWARM_SEMANTIC_OWNERSHIP_TEST_CASE_STABLE_KEY_KIND}:semantic-ownership-keys`);
const semanticImport = {
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
const semanticExportImport = {
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
const semanticDefaultExportImport = {
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
const semanticInferredExportImport = {
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
const semanticNamespaceOnlyExportImport = {
  records: [{
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
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const semanticReExportOnlyImport = {
  records: [{
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
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const semanticDefaultOnlyExportImport = {
  records: [{
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
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};

const semanticManifest = createSwarmManifest({
  compute: [{ id: 'deep', kind: 'codex', model: 'gpt-5.5', reasoningEffort: 'xhigh' }],
  lanes: [{ id: 'runtime', compute: 'deep', allowedWrites: ['src/**'] }],
  policy: { defaultCompute: 'deep' }
});
const semanticTasks = defineSwarmTasks([{
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
      globs: ['src/math.ts'],
      selectors: ['add']
    },
    {
      id: semanticMethodRegionId,
      globs: ['src/math.ts'],
      selectors: ['Calculator.increment']
    },
    {
      id: semanticArrowRegionId,
      globs: ['src/math.ts'],
      selectors: ['multiply']
    }
  ],
  changedRegions: [semanticBroadRegionId],
  verification: [{ command: 'npm', args: ['test'] }]
}]);
const semanticPlan = createSwarmPlan(semanticManifest, semanticTasks);
assert.deepStrictEqual(resolveSwarmChangedRegions(semanticPlan.jobs[0], ['src/math.ts']).sort(), [
  semanticArrowRegionId,
  semanticBroadRegionId,
  semanticFunctionRegionId,
  semanticMethodRegionId
].sort());
assert.deepStrictEqual(resolveSwarmChangedRegions(semanticPlan.jobs[0], ['src/math.ts'], semanticImport), [
  semanticArrowRegionId,
  semanticFunctionRegionId,
  semanticMethodRegionId
].sort());
const semanticExportTasks = defineSwarmTasks([{
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
}]);
const semanticExportPlan = createSwarmPlan(semanticManifest, semanticExportTasks);
assert.deepStrictEqual(resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/math.ts', 'src/index.ts'], semanticExportImport).sort(), [
  semanticFunctionRegionId,
  semanticNamespaceExportRegionId,
  semanticReExportRegionId
].sort());
assert.deepStrictEqual(resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/math.ts', 'src/index.ts'], semanticInferredExportImport).sort(), [
  semanticFunctionRegionId,
  semanticNamespaceExportRegionId,
  semanticReExportRegionId
].sort());
assert.deepStrictEqual(resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/index.ts'], semanticNamespaceOnlyExportImport), [
  semanticNamespaceExportRegionId
]);
assert.deepStrictEqual(resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/index.ts'], semanticReExportOnlyImport), [
  semanticReExportRegionId
]);
const semanticDefaultExportTasks = defineSwarmTasks([{
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
}]);
const semanticDefaultExportPlan = createSwarmPlan(semanticManifest, semanticDefaultExportTasks);
assert.deepStrictEqual(resolveSwarmChangedRegions(semanticDefaultExportPlan.jobs[0], ['src/index.ts'], semanticDefaultExportImport).sort(), [
  semanticNamespaceExportDefaultRegionId,
  semanticReExportDefaultRegionId
].sort());
assert.deepStrictEqual(resolveSwarmChangedRegions(semanticExportPlan.jobs[0], ['src/math.ts'], semanticDefaultOnlyExportImport), [
  semanticDefaultExportRegionId
]);
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
  semanticImport,
  patchPath: 'agent-runs/export-ownership/changes.patch',
  riskLevel: 'low'
});
assert.deepStrictEqual(semanticBundle.changedRegions, [
  semanticArrowRegionId,
  semanticFunctionRegionId,
  semanticMethodRegionId
].sort());
assert.deepStrictEqual(semanticBundle.traceShards, [{ kind: 'trace-summary', spanCount: 3, eventCount: 4 }]);
const semanticQueue = createSwarmHierarchicalMergeQueue({
  index: createSwarmMergeIndex({ bundles: [semanticBundle], generatedAt: 6550 }),
  generatedAt: 6551
});
assert.strictEqual(semanticQueue.scopes.filter((scope) => scope.kind === 'semantic-region').length, 3);
assert.strictEqual(semanticQueue.assignments[0].scopeId, 'lane:runtime');
assert.strictEqual(semanticQueue.assignments[0].semanticSliceScopeIds.length, 3);
assert.deepStrictEqual(semanticQueue.assignments[0].semanticSliceScopeIds.sort(), [
  'semantic-region:fnv1a32:1507761e',
  'semantic-region:fnv1a32:303865d9',
  'semantic-region:fnv1a32:4a50e0fd'
].sort());
assert.deepStrictEqual(semanticQueue.assignments[0].semanticSliceLeaseKeys.sort(), [
  'merge:semantic:runtime:src/math.ts#semanticOwnershipRegion:exported-declaration:arrow-function:multiply:multiply',
  'merge:semantic:runtime:src/math.ts#semanticOwnershipRegion:exported-declaration:function:add:add',
  'merge:semantic:runtime:src/math.ts#semanticOwnershipRegion:exported-declaration:method:Calculator.increment:Calculator.increment'
].sort());
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
const sameFileIndependentExportTask = defineSwarmTasks([
  {
    id: 'math-format-title',
    lane: 'runtime',
    targetRefs: ['src/math.ts'],
    ownershipRegions: [
      {
        id: semanticBroadRegionId,
        globs: ['src/math.ts']
      },
      {
        id: sameFileIndependentExportFormatRegionId,
        globs: ['src/math.ts'],
        selectors: ['formatTitle']
      },
      {
        id: sameFileIndependentExportParseRegionId,
        globs: ['src/math.ts'],
        selectors: ['parseTitle']
      }
    ],
    changedRegions: [semanticBroadRegionId]
  },
  {
    id: 'math-parse-title',
    lane: 'runtime',
    targetRefs: ['src/math.ts'],
    ownershipRegions: [
      {
        id: semanticBroadRegionId,
        globs: ['src/math.ts']
      },
      {
        id: sameFileIndependentExportFormatRegionId,
        globs: ['src/math.ts'],
        selectors: ['formatTitle']
      },
      {
        id: sameFileIndependentExportParseRegionId,
        globs: ['src/math.ts'],
        selectors: ['parseTitle']
      }
    ],
    changedRegions: [semanticBroadRegionId]
  }
]);
const sameFileIndependentExportPlan = createSwarmPlan(semanticManifest, sameFileIndependentExportTask);
const sameFileIndependentExportSemanticImportFormat = {
  records: [{
    path: 'src/math.ts',
    status: 'imported',
    mergeCandidate: {
      touchedSymbols: ['formatTitle']
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
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const sameFileIndependentExportSemanticImportParse = {
  records: [{
    path: 'src/math.ts',
    status: 'imported',
    mergeCandidate: {
      touchedSymbols: ['parseTitle']
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
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
assert.deepStrictEqual(resolveSwarmChangedRegions(
  sameFileIndependentExportPlan.jobs[0],
  ['src/math.ts'],
  sameFileIndependentExportSemanticImportFormat
), [sameFileIndependentExportFormatRegionId]);
assert.deepStrictEqual(resolveSwarmChangedRegions(
  sameFileIndependentExportPlan.jobs[1],
  ['src/math.ts'],
  sameFileIndependentExportSemanticImportParse
), [sameFileIndependentExportParseRegionId]);
const sameFileIndependentExportBundleFormat = createSwarmMergeBundle({
  job: sameFileIndependentExportPlan.jobs[0],
  result: {
    jobId: sameFileIndependentExportPlan.jobs[0].id,
    status: 'verified',
    changedPaths: ['src/math.ts'],
    changedRegions: [semanticBroadRegionId],
    queueItemIds: ['math-format-title'],
    verification: [{ status: 0 }]
  },
  semanticImport: sameFileIndependentExportSemanticImportFormat,
  patchPath: 'agent-runs/export-ownership/math-format-title.patch',
  riskLevel: 'low'
});
const sameFileIndependentExportBundleParse = createSwarmMergeBundle({
  job: sameFileIndependentExportPlan.jobs[1],
  result: {
    jobId: sameFileIndependentExportPlan.jobs[1].id,
    status: 'verified',
    changedPaths: ['src/math.ts'],
    changedRegions: [semanticBroadRegionId],
    queueItemIds: ['math-parse-title'],
    verification: [{ status: 0 }]
  },
  semanticImport: sameFileIndependentExportSemanticImportParse,
  patchPath: 'agent-runs/export-ownership/math-parse-title.patch',
  riskLevel: 'low'
});
const sameFileIndependentExportIndex = createSwarmMergeIndex({
  bundles: [sameFileIndependentExportBundleFormat, sameFileIndependentExportBundleParse],
  generatedAt: 6551
});
assert.strictEqual(sameFileIndependentExportIndex.summary.conflictCount, 0);
assert.deepStrictEqual(sameFileIndependentExportIndex.byPath['src/math.ts'].sort(), [
  sameFileIndependentExportBundleFormat.jobId,
  sameFileIndependentExportBundleParse.jobId
].sort());
assert.deepStrictEqual(sameFileIndependentExportIndex.entries.map((entry) => entry.changedRegions[0]).sort(), [
  sameFileIndependentExportFormatRegionId,
  sameFileIndependentExportParseRegionId
].sort());
const sameFileIndependentExportAdmission = createSwarmMergeAdmission({
  index: sameFileIndependentExportIndex,
  maxReady: 2,
  maxChangedPaths: 1,
  maxChangedRegions: 2,
  generatedAt: 6552
});
assert.deepStrictEqual(sameFileIndependentExportAdmission.admitted.sort(), [
  sameFileIndependentExportBundleFormat.jobId,
  sameFileIndependentExportBundleParse.jobId
].sort());
const sameFileIndependentExportQueue = createSwarmHierarchicalMergeQueue({
  index: sameFileIndependentExportIndex,
  admission: sameFileIndependentExportAdmission,
  generatedAt: 6553
});
assert.strictEqual(sameFileIndependentExportQueue.summary.applyLocalCount, 2);
assert.strictEqual(sameFileIndependentExportQueue.summary.promoteCount, 0);
assert.strictEqual(sameFileIndependentExportQueue.scopes.filter((scope) => scope.kind === 'semantic-region').length, 2);
assert.strictEqual(new Set(sameFileIndependentExportQueue.assignments.map((assignment) => assignment.leaseKey)).size, 2);
assert.ok(sameFileIndependentExportQueue.assignments.every((assignment) => assignment.scopeId.startsWith('semantic-region:')));
assert.ok(sameFileIndependentExportQueue.assignments.every((assignment) => assignment.changedPaths[0] === 'src/math.ts'));
assert.deepStrictEqual(
  sameFileIndependentExportQueue.assignments.map((assignment) => assignment.requiredLeaseKeys[0]).sort(),
  sameFileIndependentExportQueue.assignments.map((assignment) => assignment.leaseKey).sort()
);
assert.strictEqual(sameFileIndependentExportQueue.leaseRecords.filter((record) => record.scopeClass === 'semantic').length, 2);
assert.deepStrictEqual(
  sameFileIndependentExportQueue.leaseRecords.filter((record) => record.scopeClass === 'semantic').map((record) => record.leaseKey).sort(),
  sameFileIndependentExportQueue.assignments.map((assignment) => assignment.leaseKey).sort()
);

const sameSymbolAcrossPathsFormatRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/format-title.ts',
  kind: 'named-export',
  declarationKind: 'function',
  name: 'formatTitle',
  exportName: 'formatTitle'
});
const sameSymbolAcrossPathsParseRegionId = createSwarmSemanticOwnershipRegionId({
  file: 'src/parse-title.ts',
  kind: 'named-export',
  declarationKind: 'function',
  name: 'formatTitle',
  exportName: 'formatTitle'
});
const sameSymbolAcrossPathsTask = defineSwarmTasks([
  {
    id: 'format-title-rename',
    lane: 'runtime',
    targetRefs: ['src/format-title.ts'],
    ownershipRegions: [
      {
        id: sameSymbolAcrossPathsFormatRegionId,
        globs: ['src/format-title.ts'],
        selectors: ['formatTitle']
      }
    ],
    changedRegions: [sameSymbolAcrossPathsFormatRegionId]
  },
  {
    id: 'parse-title-rename',
    lane: 'runtime',
    targetRefs: ['src/parse-title.ts'],
    ownershipRegions: [
      {
        id: sameSymbolAcrossPathsParseRegionId,
        globs: ['src/parse-title.ts'],
        selectors: ['formatTitle']
      }
    ],
    changedRegions: [sameSymbolAcrossPathsParseRegionId]
  }
]);
const sameSymbolAcrossPathsPlan = createSwarmPlan(semanticManifest, sameSymbolAcrossPathsTask);
const sameSymbolAcrossPathsSemanticImportFormat = {
  records: [{
    path: 'src/format-title.ts',
    status: 'imported',
    mergeCandidate: {
      touchedSymbols: ['formatTitle']
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
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const sameSymbolAcrossPathsSemanticImportParse = {
  records: [{
    path: 'src/parse-title.ts',
    status: 'imported',
    mergeCandidate: {
      touchedSymbols: ['formatTitle']
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
    sourceMapMappingCount: 1,
    lossCount: 0,
    lossesBySeverity: {},
    semanticIndex: { documents: 1, symbols: 1, occurrences: 1, relations: 0, facts: 0 },
    readiness: { ready: 1 }
  }
};
const sameSymbolAcrossPathsBundleFormat = createSwarmMergeBundle({
  job: sameSymbolAcrossPathsPlan.jobs[0],
  result: {
    jobId: sameSymbolAcrossPathsPlan.jobs[0].id,
    status: 'verified',
    changedPaths: ['src/format-title.ts'],
    changedRegions: [sameSymbolAcrossPathsFormatRegionId],
    queueItemIds: ['format-title-rename'],
    verification: [{ status: 0 }]
  },
  semanticImport: sameSymbolAcrossPathsSemanticImportFormat,
  patchPath: 'agent-runs/export-ownership/format-title.patch',
  riskLevel: 'low'
});
const sameSymbolAcrossPathsBundleParse = createSwarmMergeBundle({
  job: sameSymbolAcrossPathsPlan.jobs[1],
  result: {
    jobId: sameSymbolAcrossPathsPlan.jobs[1].id,
    status: 'verified',
    changedPaths: ['src/parse-title.ts'],
    changedRegions: [sameSymbolAcrossPathsParseRegionId],
    queueItemIds: ['parse-title-rename'],
    verification: [{ status: 0 }]
  },
  semanticImport: sameSymbolAcrossPathsSemanticImportParse,
  patchPath: 'agent-runs/export-ownership/parse-title.patch',
  riskLevel: 'low'
});
const sameSymbolAcrossPathsIndex = createSwarmMergeIndex({
  bundles: [sameSymbolAcrossPathsBundleFormat, sameSymbolAcrossPathsBundleParse],
  generatedAt: 6554
});
assert.strictEqual(sameSymbolAcrossPathsIndex.summary.conflictCount, 1);
assert.strictEqual(sameSymbolAcrossPathsIndex.conflicts[0].kind, 'symbol');
assert.strictEqual(sameSymbolAcrossPathsIndex.conflicts[0].symbol, 'formatTitle');
assert.deepStrictEqual(
  sameSymbolAcrossPathsIndex.entries.find((entry) => entry.jobId === sameSymbolAcrossPathsBundleFormat.jobId).conflictingJobIds,
  [sameSymbolAcrossPathsBundleParse.jobId]
);

const tasks = defineSwarmTasks([
  {
    id: 'runtime-action-parity',
    lane: 'runtime',
    title: 'Runtime action parity',
    objective: 'Port runtime action behavior.',
    targetRefs: ['inkwell/apps/web/src/runtime/runtime.ts'],
    sourceRefs: ['/legacy/runtime.js'],
    ownershipRegions: [
      {
        id: 'runtime.actions',
        globs: ['inkwell/apps/web/src/runtime/runtime.ts'],
        selectors: ['runtime.actions.*']
      }
    ],
    changedRegions: ['runtime.actions'],
    acceptanceChecks: [{ description: 'runtime action evidence passes' }],
    verification: [{ command: 'node', args: ['inkwell/parity-shards.mjs', '--selector', 'runtime'] }]
  },
  {
    id: 'harness-evidence',
    lane: 'harness',
    status: 'open',
    targetRefs: ['inkwell/e2e.mjs']
  },
  {
    id: 'verified-item',
    lane: 'runtime',
    status: 'verified',
    targetRefs: ['inkwell/apps/web/src/runtime/verified.ts']
  }
]);

assert.strictEqual(resolveSwarmCompute(manifest, tasks[0]).id, 'deep');
assert.strictEqual(resolveSwarmCompute(manifest, tasks[1]).id, 'fast');

const plan = createSwarmPlan(manifest, tasks, { limit: 8, selectors: ['runtime'] });
assert.strictEqual(plan.jobs.length, 1);
assert.strictEqual(plan.jobs[0].compute.id, 'deep');
assert.strictEqual(plan.jobs[0].verification[0].command, 'node');
assert.ok(plan.jobs[0].allowedWrites.includes('inkwell/.frontier/evidence/runtime/runtime-action-parity/**'));
assert.ok(plan.jobs[0].ownedRegions.includes('runtime.actions'));
assert.deepStrictEqual(resolveSwarmChangedRegions(plan.jobs[0], ['inkwell/apps/web/src/runtime/runtime.ts']), ['runtime.actions']);
assert.strictEqual(plan.summary.jobCount, 1);

const selection = createSwarmTaskSelection(manifest, tasks, {
  workKinds: ['agent-task'],
  selectors: ['runtime'],
  limit: 2,
  assignSelectionPriority: true,
  priority: { statuses: { open: 0 }, workKinds: { 'agent-task': 0 } }
});
assert.strictEqual(selection.entries.length, 1);
assert.strictEqual(selection.tasks[0].priority, 0);
assert.deepStrictEqual(selection.summary.byLane, { runtime: 1 });

const warningSelection = createSwarmTaskSelection(manifest, [{
  id: 'off-lane',
  lane: 'runtime',
  targetRefs: ['inkwell/apps/web/src/components/off-lane.tsx']
}], { includeOwnershipWarnings: true });
assert.strictEqual(warningSelection.entries.length, 1);
assert.strictEqual(warningSelection.summary.ownershipWarningCount, 1);
assert.strictEqual(createSwarmTaskSelection(manifest, warningSelection.tasks).entries.length, 0);

const spreadSelection = createSwarmTaskSelection(manifest, [
  { id: 'runtime-a', lane: 'runtime', targetRefs: ['inkwell/apps/web/src/runtime/a.ts'] },
  { id: 'runtime-b', lane: 'runtime', targetRefs: ['inkwell/apps/web/src/runtime/b.ts'] },
  { id: 'harness-a', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] },
  { id: 'harness-b', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] }
], { spreadLanes: true, limit: 4 });
assert.deepStrictEqual(spreadSelection.entries.map((entry) => entry.task.id), ['harness-a', 'runtime-a', 'harness-b', 'runtime-b']);

const stream = createSwarmEventStream({ runId: 'run-1', root: 'agent-runs/run-1/streams', lanes: manifest.lanes });
assert.strictEqual(stream.summary.mailboxCount, 3);
assert.strictEqual(stream.lanes.runtime.path, 'agent-runs/run-1/streams/lanes/runtime.jsonl');
assert.deepStrictEqual(
  routeSwarmEventToMailboxes(stream, { type: 'agent.evidence', lane: 'runtime' }).map((mailbox) => mailbox.scope),
  ['global', 'lane']
);

const browserPlan = createSwarmPlan(manifest, [{
  id: 'browser-smoke',
  lane: 'harness',
  targetRefs: ['inkwell/e2e.mjs'],
  capabilities: ['dom.assertions']
}], { includeCompleted: true });
assert.strictEqual(browserPlan.limits.maxLaneConcurrency.harness, 1);
assert.ok(browserPlan.jobs[0].capabilities.includes('browser.playwright'));
assert.ok(browserPlan.jobs[0].capabilities.includes('dom.assertions'));
assert.deepStrictEqual(browserPlan.jobs[0].resourceRequirements.browser.portPool, ['4177', '4178']);

const allPlan = createSwarmPlan(manifest, tasks, { includeCompleted: true });
assert.strictEqual(allPlan.jobs.length, 3);
assert.strictEqual(createSwarmPlan(manifest, tasks).jobs.length, 2);
assert.deepStrictEqual(createSwarmPlan(manifest, [{
  id: 'child-task',
  lane: 'runtime',
  dependsOn: ['missing-parent'],
  targetRefs: ['inkwell/apps/web/src/runtime/child.ts']
}]).validation.issues.map((issue) => issue.code), ['missing-job-dependency', 'missing-task-dependency']);

assert.strictEqual(matchesGlob('inkwell/apps/web/src/runtime/runtime.ts', 'inkwell/apps/web/src/runtime/**'), true);
const ownership = checkSwarmOwnership(plan.jobs[0], [
  'inkwell/apps/web/src/runtime/runtime.ts',
  'inkwell/apps/web/src/components/WebsiteHomePage.tsx'
]);
assert.strictEqual(ownership.ok, false);
assert.deepStrictEqual(ownership.violations, ['inkwell/apps/web/src/components/WebsiteHomePage.tsx']);

let run = createSwarmRun({ plan, startedAt: 10 });
run = recordSwarmEvent(run, { type: 'agent.scheduled', jobId: plan.jobs[0].id, lane: 'runtime', at: 11 });
assert.strictEqual(run.events.length, 1);
run = completeSwarmJob(run, {
  jobId: plan.jobs[0].id,
  exitCode: 0,
  status: 'completed',
  startedAt: 12,
  finishedAt: 18,
  changedPaths: ['inkwell/apps/web/src/runtime/runtime.ts'],
  evidencePaths: ['inkwell/.frontier/evidence/runtime/runtime-action-parity/evidence.json']
});
assert.strictEqual(run.status, 'completed');
assert.strictEqual(run.summary.completedCount, 1);

const jsonl = encodeSwarmJsonl([plan, run]);
assert.strictEqual(decodeSwarmJsonl(jsonl).length, 2);
assert.ok(createSwarmProof(run, { generatedAt: 20, validation: plan.validation }).hash.length > 0);

const invalid = validateSwarmManifest({
  compute: [{ id: 'known' }],
  layers: [{ id: 'parent', childCompute: { child: 'missing' } }, { id: 'child', parentId: 'parent' }],
  policy: { defaultCompute: 'known' }
});
assert.strictEqual(invalid.valid, false);

const packageScopedVerificationGate = {
  command: 'npm',
  args: ['run', 'focused-gate'],
  metadata: {
    packageId: 'frontier-swarm',
    packagePath: 'packages/frontier-swarm',
    packageName: '@shapeshift-labs/frontier-swarm'
  }
};
const mergedGateMetadata = mergeSwarmMetadata([
  { reason: 'queue-gate' }
], [packageScopedVerificationGate]);
assert.strictEqual(mergedGateMetadata.reason, 'queue-gate');
assert.strictEqual(mergedGateMetadata.verificationGates[0].metadata.packageId, 'frontier-swarm');
assert.strictEqual(mergedGateMetadata.verificationGates[0].metadata.packagePath, 'packages/frontier-swarm');
assert.strictEqual(mergedGateMetadata.verificationGates[0].metadata.packageName, '@shapeshift-labs/frontier-swarm');

const backlog = createSwarmBacklog({
  id: 'continuation-backlog',
  title: 'Continuation backlog',
  package: '@shapeshift-labs/frontier-swarm',
  entries: [
    {
      id: 'entry-ready',
      title: 'Ready entry',
      entryKind: 'task',
      status: 'ready',
      lane: 'runtime',
      targetRefs: ['src/index.ts'],
      tags: ['backlog']
    },
    {
      id: 'entry-blocked',
      title: 'Blocked entry',
      entryKind: 'feature',
      status: 'blocked',
      lane: 'runtime'
    }
  ],
  metadata: { owner: 'smoke' }
});
assert.strictEqual(backlog.kind, 'frontier.swarm.backlog');
assert.strictEqual(backlog.summary.entryCount, 2);
assert.strictEqual(backlog.summary.readyCount, 1);
assert.strictEqual(backlog.summary.blockedCount, 1);

const queriedBacklog = querySwarmBacklog(backlog, { status: 'ready' });
assert.strictEqual(queriedBacklog.summary.entryCount, 1);
assert.strictEqual(queriedBacklog.entries[0].id, 'entry-ready');

const mergedBacklog = mergeSwarmBacklogs({
  base: backlog,
  backlogs: [{
    entries: [
      {
        id: 'entry-ready',
        title: 'Ready entry updated',
        entryKind: 'task',
        status: 'verified',
        lane: 'runtime',
        tags: ['merged']
      },
      {
        id: 'entry-new',
        title: 'New entry',
        entryKind: 'decision',
        status: 'open',
        lane: 'runtime'
      }
    ]
  }],
  tasks: [{
    id: 'task-1',
    title: 'Continuation task',
    status: 'ready',
    lane: 'runtime',
    targetRefs: ['src/task.ts']
  }],
  metadata: { runId: 'merge-smoke' }
});
assert.strictEqual(mergedBacklog.summary.entryCount, 4);
assert.strictEqual(mergedBacklog.summary.taskCount, 1);
assert.strictEqual(mergedBacklog.summary.readyCount, 2);
assert.strictEqual(mergedBacklog.entries.find((entry) => entry.id === 'entry-ready').status, 'verified');

const backlogTaskPlan = createSwarmBacklogTaskPlan({
  backlog: mergedBacklog,
  recursive: true,
  maxDepth: 2,
  backlogPath: 'backlogs/continuation.json',
  childArtifactPath: 'backlogs/continuation.child.json',
  decomposeLane: 'runtime',
  decomposeCompute: 'deep',
  decomposeWorkKind: 'backlog-decompose',
  metadata: { source: 'smoke' }
});
assert.strictEqual(backlogTaskPlan.kind, 'frontier.swarm.backlog-task-plan');
assert.strictEqual(backlogTaskPlan.backlogId, mergedBacklog.id);
assert.strictEqual(backlogTaskPlan.summary.taskCount, 3);
assert.strictEqual(backlogTaskPlan.summary.runnableCount, 2);
assert.strictEqual(backlogTaskPlan.summary.decompositionCount, 1);
assert.strictEqual(backlogTaskPlan.metadata.backlogId, mergedBacklog.id);
assert.strictEqual(backlogTaskPlan.metadata.source, 'smoke');
assert.deepStrictEqual(backlogTaskPlan.runnableTaskIds, ['entry-new', 'task-1']);
assert.deepStrictEqual(backlogTaskPlan.decompositionTaskIds, ['entry-blocked:decompose']);

const scaleTasks = defineSwarmTasks(Array.from({ length: 1000 }, (_, index) => ({
  id: `scale-${index}`,
  lane: index % 2 === 0 ? 'runtime' : 'harness',
  dependsOn: index % 10 === 0 ? [] : [`scale-${index - 1}`],
  targetRefs: [index % 2 === 0 ? `inkwell/apps/web/src/runtime/${index}.ts` : `inkwell/e2e-${index}.mjs`],
  concurrencyKey: `surface-${index % 25}`,
  budget: { maxInputTokens: 2000, maxOutputTokens: 1000, maxDurationMs: 60000, maxRetries: 1 },
  review: { sampleRate: 0.05, requiredReviewers: 1, reviewerPool: ['reviewer-a', 'reviewer-b'] },
  verification: [packageScopedVerificationGate]
})));
const scalePlan = createSwarmPlan(manifest, scaleTasks, {
  includeCompleted: true,
  maxReadyJobs: 40,
  maxLaneConcurrency: { runtime: 100, harness: 100 },
  maxConcurrencyKeyConcurrency: Object.fromEntries(Array.from({ length: 25 }, (_, index) => [`surface-${index}`, 10])),
  maxComputeConcurrency: { deep: 50, fast: 50 }
});
assert.strictEqual(scalePlan.jobs.length, 1000);
assert.strictEqual(scalePlan.graph.roots.length, 100);
assert.strictEqual(scalePlan.graph.edges.length, 900);
assert.strictEqual(scalePlan.validation.valid, true);

const scaleSchedule = createSwarmSchedule(scalePlan);
assert.strictEqual(scaleSchedule.ready.length, 40);
assert.ok(scaleSchedule.blocked.length > 0);
const leases = createSwarmLeases({ schedule: scaleSchedule, workerId: 'worker-1', now: 1000, leaseMs: 5000, count: 5 });
assert.strictEqual(leases.length, 5);
assert.strictEqual(leases[0].expiresAt, 6000);
assert.strictEqual(new Set(leases.map((lease) => lease.fencingToken)).size, 5);
assert.strictEqual(renewSwarmLease({ lease: leases[0], now: 7000, leaseMs: 5000 }).expiresAt, 12000);

const priorityManifest = defineSwarmManifest({
  id: 'priority-scheduler',
  lanes: [
    { id: 'implementation', allowedWrites: ['src/**'], maxConcurrency: 8 },
    { id: 'coordinator-review', allowedWrites: ['review/**'], maxConcurrency: 8 },
    { id: 'merge-review', allowedWrites: ['review/**'], maxConcurrency: 8 }
  ],
  policy: { defaultConcurrency: 8 }
});
const priorityTasks = defineSwarmTasks([
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `speculative-${index}`,
    lane: 'implementation',
    kind: 'speculative-backlog',
    priority: index,
    targetRefs: [`src/speculative-${index}.ts`],
    tags: ['speculative', 'backlog']
  })),
  {
    id: 'drain-a',
    lane: 'coordinator-review',
    kind: 'coordinator-drain',
    priority: 999,
    targetRefs: ['review/a.md'],
    concurrencyKey: 'review-scope'
  },
  {
    id: 'drain-b',
    lane: 'coordinator-review',
    kind: 'coordinator-drain',
    priority: 1000,
    targetRefs: ['review/b.md'],
    concurrencyKey: 'review-scope'
  },
  {
    id: 'review-c',
    lane: 'merge-review',
    kind: 'review',
    priority: 1001,
    targetRefs: ['review/c.md'],
    concurrencyKey: 'review-c'
  }
]);
const priorityPlan = createSwarmPlan(priorityManifest, priorityTasks, {
  includeCompleted: true,
  maxLaneConcurrency: { implementation: 8, 'coordinator-review': 8, 'merge-review': 8 },
  maxConcurrencyKeyConcurrency: { 'review-scope': 1 },
  maxReadyJobs: 2
});
assert.strictEqual(priorityPlan.metadata.priorityPolicy.policy.kind, FRONTIER_SWARM_PRIORITY_POLICY_KIND);
const limitedPriorityPlan = createSwarmPlan(priorityManifest, priorityTasks, {
  includeCompleted: true,
  limit: 2
});
assert.deepStrictEqual(limitedPriorityPlan.jobs.map((job) => job.taskId), ['drain-a', 'review-c']);
assert.strictEqual(priorityPlan.jobs.find((job) => job.taskId === 'drain-a').metadata.priorityPolicy.className, 'coordinator-drain');
assert.strictEqual(priorityPlan.jobs.find((job) => job.taskId === 'review-c').metadata.priorityPolicy.className, 'review');
assert.strictEqual(priorityPlan.jobs.find((job) => job.taskId === 'speculative-0').metadata.priorityPolicy.className, 'speculative');
const prioritySchedule = createSwarmSchedule({ plan: priorityPlan, maxReadyJobs: 2 });
assert.strictEqual(prioritySchedule.metadata.priorityPolicy.policy.kind, FRONTIER_SWARM_PRIORITY_POLICY_KIND);
assert.deepStrictEqual(prioritySchedule.ready.map((job) => job.taskId), ['drain-a', 'review-c']);
assert.strictEqual(prioritySchedule.ready.some((job) => job.taskId.startsWith('speculative-')), false);
assert.ok(prioritySchedule.blocked.find((job) => job.taskId === 'drain-b').reasons.includes('concurrency-key-capacity'));
assert.deepStrictEqual(prioritySchedule.metadata.priorityPolicy.summary.schedule.readyClassCounts, { 'coordinator-drain': 1, review: 1 });
const priorityQueue = createSwarmQueueSnapshot({ plan: priorityPlan, generatedAt: 12500 });
assert.strictEqual(priorityQueue.metadata.priorityPolicy.policy.kind, FRONTIER_SWARM_PRIORITY_POLICY_KIND);
assert.deepStrictEqual(priorityQueue.jobs.slice(0, 3).map((job) => job.taskId), ['drain-a', 'review-c', 'drain-b']);
assert.strictEqual(priorityQueue.jobs[0].metadata.priorityPolicy.className, 'coordinator-drain');
assert.strictEqual(priorityQueue.jobs[1].metadata.priorityPolicy.className, 'review');
assert.strictEqual(priorityQueue.jobs.find((job) => job.taskId === 'speculative-0').metadata.priorityPolicy.className, 'speculative');

const classifiedPool = createSwarmContinuousPoolState({
  generatedAt: 12600,
  decisions: [
    { subjectId: 'review-item', category: 'coordinator-review', outcome: 'coordinator-review' },
    { subjectId: 'rerun-item', category: 'stale-rerun', outcome: 'rerun' },
    { subjectId: 'human-question', category: 'human-blocked', outcome: 'human-blocked' },
    { subjectId: 'done-item', category: 'terminal', outcome: 'committed' }
  ]
});
assert.strictEqual(classifiedPool.kind, FRONTIER_SWARM_CONTINUOUS_POOL_STATE_KIND);
assert.strictEqual(classifiedPool.summary.reviewDrainCount, 1);
assert.strictEqual(classifiedPool.summary.rerunCount, 1);
assert.strictEqual(classifiedPool.summary.humanBlockedCount, 1);
assert.strictEqual(classifiedPool.summary.doneCount, 1);
assert.strictEqual(classifiedPool.drained, false);

const refillPool = createSwarmContinuousPoolState({
  maxWorkers: 3,
  generatedAt: 12700,
  activeLeases: [{
    kind: FRONTIER_SWARM_LEASE_KIND,
    version: FRONTIER_SWARM_LEASE_VERSION,
    id: 'active-lease-a',
    jobId: 'active-a',
    workerId: 'worker-a',
    token: 'token-a',
    leasedAt: 12600,
    expiresAt: 14000,
    fencingToken: 1,
    status: 'active'
  }],
  reviewDrain: [{ id: 'review-drain-a', jobId: 'review-drain-a', queueItemIds: ['review-drain-a'] }],
  queued: [
    { id: 'speculative-a', jobId: 'speculative-a', queueItemIds: ['speculative-a'], priorityClass: 'speculative', priority: 0 },
    { id: 'standard-a', jobId: 'standard-a', queueItemIds: ['standard-a'], priorityClass: 'standard', priority: 1 }
  ]
});
assert.strictEqual(refillPool.phase, 'active');
assert.strictEqual(refillPool.summary.activeCount, 1);
assert.strictEqual(refillPool.summary.queuedCount, 2);
assert.strictEqual(refillPool.summary.refillSlotCount, 2);
assert.strictEqual(refillPool.summary.idleRefillSlotCount, 0);
assert.deepStrictEqual(refillPool.refillRecommendations.map((entry) => entry.action), ['drain-review', 'lease-queued']);
assert.deepStrictEqual(refillPool.refillRecommendations.map((entry) => entry.bucket), ['review-drain', 'queued']);
assert.deepStrictEqual(refillPool.refillRecommendations.map((entry) => entry.itemIds[0]), ['review-drain-a', 'standard-a']);
assert.deepStrictEqual(refillPool.stopConditions, []);
assert.strictEqual(refillPool.drained, false);

const humanQuestionPool = createSwarmContinuousPoolState({
  generatedAt: 12800,
  humanBlocked: [{ id: 'needs-human-answer', queueItemIds: ['needs-human-answer'], reasons: ['human-question'] }]
});
assert.strictEqual(humanQuestionPool.phase, 'human-blocked');
assert.strictEqual(humanQuestionPool.stopCondition, 'human-blocked');
assert.strictEqual(humanQuestionPool.drained, false);

const drainedPool = createSwarmContinuousPoolState({
  maxWorkers: 2,
  generatedAt: 12900,
  done: [{ id: 'done-a', queueItemIds: ['done-a'] }]
});
assert.strictEqual(drainedPool.phase, 'done');
assert.strictEqual(drainedPool.stopCondition, 'drained');
assert.deepStrictEqual(drainedPool.stopConditions, ['drained']);
assert.strictEqual(drainedPool.drained, true);
assert.strictEqual(drainedPool.summary.pendingCount, 0);
assert.strictEqual(drainedPool.summary.idleRefillSlotCount, 2);

const modelPriceCatalog = {
  fast: {
    compute: 'fast',
    inputUsdPerUnit: 0.2,
    cachedInputUsdPerUnit: 0.02,
    outputUsdPerUnit: 1,
    unitTokens: 1000000,
    latencyMs: 45000
  },
  deep: {
    compute: 'deep',
    inputUsdPerUnit: 5,
    cachedInputUsdPerUnit: 0.5,
    outputUsdPerUnit: 30,
    unitTokens: 1000000,
    latencyMs: 150000
  }
};
const routerTokenEstimate = { inputTokens: 10000, cachedInputTokens: 2000, outputTokens: 2000 };
const routerHistory = [
  { compute: 'fast', attempts: 12, successRate: 0.86, confidence: 0.72, averageDurationMs: 42000 },
  { compute: 'deep', attempts: 8, successRate: 0.94, confidence: 0.9, averageDurationMs: 130000 }
];
const cheapRoute = createSwarmModelRoute({
  manifest,
  task: {
    id: 'simple-doc-fix',
    lane: 'runtime',
    targetRefs: ['inkwell/apps/web/src/runtime/docs.ts'],
    metadata: { risk: 'low', uncertainty: 'low', impact: 'low' }
  },
  priceCatalog: modelPriceCatalog,
  tokenEstimate: routerTokenEstimate,
  outcomeHistory: routerHistory,
  generatedAt: 13000
});
assert.strictEqual(cheapRoute.kind, FRONTIER_SWARM_MODEL_ROUTE_KIND);
assert.strictEqual(cheapRoute.route, 'single-cheap');
assert.deepStrictEqual(cheapRoute.recommendedComputeIds, ['fast']);
assert.strictEqual(cheapRoute.summary.cheapestCapableComputeId, 'fast');
assert.ok(cheapRoute.candidates.find((candidate) => candidate.compute.id === 'fast').estimatedCostUsd < cheapRoute.candidates.find((candidate) => candidate.compute.id === 'deep').estimatedCostUsd);

const riskRoute = createSwarmModelRoute({
  manifest,
  task: {
    id: 'critical-release-router',
    lane: 'runtime',
    targetRefs: ['inkwell/apps/web/src/runtime/router.ts'],
    tags: ['critical', 'release'],
    metadata: { risk: 'high', uncertainty: 'unknown', impact: 'high' }
  },
  priceCatalog: modelPriceCatalog,
  tokenEstimate: routerTokenEstimate,
  outcomeHistory: [
    { compute: 'fast', attempts: 6, successRate: 0.52, confidence: 0.45 },
    { compute: 'deep', attempts: 5, successRate: 0.96, confidence: 0.92 }
  ],
  generatedAt: 13100
});
assert.strictEqual(riskRoute.route, 'single-deep');
assert.deepStrictEqual(riskRoute.recommendedComputeIds, ['deep']);
assert.ok(riskRoute.reasons.includes('risk-uncertainty-or-impact-escalation'));

const budgetRoute = createSwarmModelRoute({
  manifest,
  task: {
    id: 'budgeted-risky-router',
    lane: 'runtime',
    targetRefs: ['inkwell/apps/web/src/runtime/budgeted.ts'],
    budget: { maxCostUsd: 0.02 },
    metadata: { risk: 'high', uncertainty: 'high', impact: 'high' }
  },
  priceCatalog: modelPriceCatalog,
  tokenEstimate: routerTokenEstimate,
  outcomeHistory: routerHistory,
  generatedAt: 13200
});
assert.deepStrictEqual(budgetRoute.recommendedComputeIds, ['fast']);
assert.strictEqual(budgetRoute.candidates.find((candidate) => candidate.compute.id === 'deep').budgetOk, false);
assert.ok(budgetRoute.reasons.includes('budget-cap-filtered-candidates'));

const missingTelemetryRoute = createSwarmModelRoute({
  manifest,
  task: {
    id: 'telemetryless-default',
    lane: 'runtime',
    targetRefs: ['inkwell/apps/web/src/runtime/telemetryless.ts'],
    metadata: { risk: 'low', uncertainty: 'low', impact: 'low' }
  },
  tokenEstimate: { inputTokens: 5000, outputTokens: 1000 },
  generatedAt: 13300
});
assert.strictEqual(missingTelemetryRoute.route, 'single-cheap');
assert.deepStrictEqual(missingTelemetryRoute.recommendedComputeIds, ['fast']);
assert.strictEqual(missingTelemetryRoute.summary.priceKnownCount, 0);
assert.ok(missingTelemetryRoute.reasons.includes('missing-telemetry-fallback-used'));

const panelRoute = createSwarmModelRoute({
  manifest,
  task: {
    id: 'panel-worthy-router',
    lane: 'runtime',
    targetRefs: ['inkwell/apps/web/src/runtime/panel.ts'],
    tags: ['critical', 'public-api'],
    metadata: { risk: 'high', uncertainty: 'high', impact: 'critical' }
  },
  priceCatalog: modelPriceCatalog,
  tokenEstimate: routerTokenEstimate,
  outcomeHistory: routerHistory,
  panel: { enabled: true, strategy: 'panel', minRiskScore: 0.5, maxMembers: 2, fuserComputeId: 'deep' },
  generatedAt: 13400
});
assert.strictEqual(panelRoute.route, 'panel');
assert.strictEqual(panelRoute.panel.kind, FRONTIER_SWARM_PANEL_EVALUATION_KIND);
assert.strictEqual(panelRoute.panel.recommended, true);
assert.deepStrictEqual(panelRoute.recommendedComputeIds, ['fast', 'deep']);
assert.strictEqual(panelRoute.fuserComputeId, 'deep');
assert.ok(panelRoute.panel.expectedCostUsd > riskRoute.recommended.estimatedCostUsd);
assert.ok(panelRoute.panel.confidenceLift > 0);
assert.ok(panelRoute.panel.residualRiskScore < 1);

const modelRoutingFeedback = createSwarmModelRoutingFeedback({
  scope: 'lane',
  lane: 'runtime',
  model: 'gpt-5.4-mini',
  selected: true,
  resultStatus: 'panel-observed',
  evidenceQuality: {
    band: 'strong',
    score: 0.92,
    confidence: 'high',
    evidencePaths: ['evidence/model-routing.json']
  },
  tags: ['routing', 'panel'],
  metadata: { source: 'smoke' }
});
assert.strictEqual(modelRoutingFeedback.kind, 'frontier.swarm.model-routing-feedback');
assert.strictEqual(modelRoutingFeedback.scope, 'lane');
assert.strictEqual(modelRoutingFeedback.selected, true);
assert.deepStrictEqual(modelRoutingFeedback.tags, ['routing', 'panel']);

const modelRoutingPolicy = createSwarmModelRoutingPolicy({
  defaultMode: 'override',
  signals: [{
    mode: 'override',
    lane: 'runtime',
    workKind: 'continuation',
    model: 'gpt-5.4-mini',
    confidence: 'high',
    reason: 'continuation should keep the selected model'
  }],
  feedback: [modelRoutingFeedback],
  generatedAt: 13600,
  metadata: { source: 'smoke' }
});
assert.strictEqual(modelRoutingPolicy.kind, 'frontier.swarm.model-routing-policy');
assert.strictEqual(modelRoutingPolicy.defaultMode, 'override');
assert.strictEqual(modelRoutingPolicy.signals[0].id, 'signal-1');
assert.strictEqual(modelRoutingPolicy.preferences[0].mode, 'override');
assert.strictEqual(modelRoutingPolicy.summary.signalCount, 1);
assert.strictEqual(modelRoutingPolicy.summary.feedbackCount, 1);

const modelRoutingPlan = createSwarmPlan(manifest, tasks, {
  routingMode: 'override',
  routingPolicy: modelRoutingPolicy,
  routingContext: { continuation: true, reason: 'codex-routing' }
});
assert.strictEqual(modelRoutingPlan.routingMode, 'override');
assert.strictEqual(modelRoutingPlan.routingPolicy.kind, 'frontier.swarm.model-routing-policy');
assert.strictEqual(modelRoutingPlan.routingPolicy.signals[0].mode, 'override');
assert.strictEqual(modelRoutingPlan.routingPolicy.feedback[0].kind, 'frontier.swarm.model-routing-feedback');
assert.deepStrictEqual(modelRoutingPlan.routingContext, { continuation: true, reason: 'codex-routing' });

const tournamentEvaluation = createSwarmPanelEvaluation({
  candidates: panelRoute.candidates,
  riskScore: 0.9,
  uncertaintyScore: 0.8,
  impactScore: 0.9,
  panel: { enabled: true, strategy: 'tournament', minRiskScore: 0.5, maxMembers: 2, fuserComputeId: 'deep' },
  generatedAt: 13500
});
assert.strictEqual(tournamentEvaluation.kind, FRONTIER_SWARM_PANEL_EVALUATION_KIND);
assert.strictEqual(tournamentEvaluation.strategy, 'tournament');
assert.strictEqual(tournamentEvaluation.recommended, true);

const firstScaleJob = scalePlan.jobs[0];
const budgetDecision = checkSwarmBudget(firstScaleJob, { inputTokens: 2500, outputTokens: 10, durationMs: 20, attempts: 1 });
assert.strictEqual(budgetDecision.ok, false);
assert.deepStrictEqual(budgetDecision.violations, ['max-input-tokens']);

let scaleRun = createSwarmRun({ plan: scalePlan, startedAt: 2000 });
scaleRun = completeSwarmJob(scaleRun, {
  jobId: firstScaleJob.id,
  status: 'completed',
  changedPaths: [firstScaleJob.task.targetRefs[0]],
  evidencePaths: ['agent-runs/scale/evidence.json'],
  traceShards: [{ kind: 'trace-summary', spanCount: 1, eventCount: 2 }]
});
assert.strictEqual(scaleRun.results[0].mergeReadiness, 'patch-candidate');
assert.deepStrictEqual(scaleRun.results[0].traceShards, [{ kind: 'trace-summary', spanCount: 1, eventCount: 2 }]);
assert.strictEqual(classifySwarmMergeReadiness({ jobId: 'discovery', status: 'completed', changedPaths: [] }), 'discovery-only');
assert.strictEqual(classifySwarmMergeDisposition({ jobId: 'verified', status: 'verified', changedPaths: ['src/runtime/a.ts'], verification: [{ status: 0 }] }), 'auto-mergeable');
const mergeBundle = createSwarmMergeBundle({
  runId: scaleRun.id,
  planId: scalePlan.id,
  job: firstScaleJob,
  result: scaleRun.results[0],
  patchPath: 'agent-runs/scale/changes.patch',
  queueItemIds: [firstScaleJob.taskId],
  riskLevel: 'low'
});
assert.strictEqual(mergeBundle.disposition, 'needs-port');
assert.strictEqual(mergeBundle.patchPath, 'agent-runs/scale/changes.patch');
assert.deepStrictEqual(mergeBundle.queueItemIds, [firstScaleJob.taskId]);
assert.deepStrictEqual(mergeBundle.traceShards, [{ kind: 'trace-summary', spanCount: 1, eventCount: 2 }]);
assert.strictEqual(mergeBundle.metadata.verificationGates[0].metadata.packageId, 'frontier-swarm');
assert.strictEqual(mergeBundle.metadata.verificationGates[0].metadata.packagePath, 'packages/frontier-swarm');
assert.strictEqual(mergeBundle.metadata.verificationGates[0].metadata.packageName, '@shapeshift-labs/frontier-swarm');
const dashboard = createSwarmCoordinatorDashboard({ bundles: [mergeBundle], generatedAt: 8050 });
assert.deepStrictEqual(dashboard.jobs[0].traceShards, [{ kind: 'trace-summary', spanCount: 1, eventCount: 2 }]);
const queueSnapshot = createSwarmQueueSnapshot({ plan: scalePlan, run: scaleRun, leases, generatedAt: 8000 });
assert.strictEqual(queueSnapshot.summary.jobCount, 1000);
assert.strictEqual(queueSnapshot.summary.leaseCount, 5);
assert.strictEqual(queueSnapshot.summary.leasedCount, 4);
assert.strictEqual(queueSnapshot.summary.completedCount, 1);
assert.strictEqual(queueSnapshot.jobs[0].metadata.verificationGates[0].metadata.packageId, 'frontier-swarm');
assert.strictEqual(queueSnapshot.jobs[0].metadata.verificationGates[0].metadata.packagePath, 'packages/frontier-swarm');
assert.strictEqual(queueSnapshot.jobs[0].metadata.verificationGates[0].metadata.packageName, '@shapeshift-labs/frontier-swarm');
const queueOverlay = createSwarmQueueOverlay({ runId: scaleRun.id, bundles: [mergeBundle], generatedAt: 8100 });
assert.strictEqual(queueOverlay.summary.needsHumanPortCount, 1);
const derivedQueue = deriveSwarmQueueStatus({ snapshot: queueSnapshot, overlays: [queueOverlay], generatedAt: 8200 });
assert.strictEqual(derivedQueue.jobs.find((job) => job.jobId === firstScaleJob.id).status, 'blocked');
const checkpoint = createSwarmRunCheckpoint({ run: scaleRun, sequence: 1, savedAt: 9000 });
assert.strictEqual(checkpoint.runId, scaleRun.id);
assert.strictEqual(checkpoint.resultCount, 1);
const artifactIndex = createSwarmArtifactIndex({
  run: scaleRun,
  artifacts: [{ jobId: firstScaleJob.id, path: 'agent-runs/scale/timeline.jsonl', kind: 'timeline', bytes: 128 }],
  generatedAt: 3000
});
assert.strictEqual(artifactIndex.summary.artifactCount, 2);
assert.strictEqual(artifactIndex.byKind.evidence.length, 1);

const reviewPlan = createSwarmReviewPlan({
  plan: scalePlan,
  run: scaleRun,
  budgetDecisions: [budgetDecision],
  reviewers: ['fallback-reviewer'],
  generatedAt: 4000,
  sampleSalt: 'stable'
});
assert.ok(reviewPlan.assignments.some((assignment) => assignment.jobId === firstScaleJob.id && assignment.reason === 'budget'));

let conflictRun = createSwarmRun({ plan: scalePlan, startedAt: 5000 });
conflictRun = completeSwarmJob(conflictRun, {
  jobId: scalePlan.jobs[0].id,
  status: 'completed',
  changedPaths: ['shared/file.ts']
});
conflictRun = completeSwarmJob(conflictRun, {
  jobId: scalePlan.jobs[10].id,
  status: 'completed',
  changedPaths: ['shared/file.ts']
});
const mergePlan = createSwarmMergePlan({ plan: scalePlan, run: conflictRun, generatedAt: 6000 });
assert.ok(mergePlan.blocked.some((blocker) => blocker.reasons.includes('conflicting-changes')));

let explicitRegionRun = createSwarmRun({ plan: scalePlan, startedAt: 6050 });
explicitRegionRun = completeSwarmJob(explicitRegionRun, {
  jobId: scalePlan.jobs[2].id,
  status: 'completed',
  changedPaths: ['src/hot/runtime-website-content.ts'],
  changedRegions: ['content.docs']
});
explicitRegionRun = completeSwarmJob(explicitRegionRun, {
  jobId: scalePlan.jobs[4].id,
  status: 'completed',
  changedPaths: ['src/hot/runtime-website-content.ts'],
  changedRegions: ['content.legal']
});
const explicitRegionMergePlan = createSwarmMergePlan({ plan: scalePlan, run: explicitRegionRun, generatedAt: 6060 });
assert.ok(explicitRegionMergePlan.ready.includes(scalePlan.jobs[2].id));
assert.ok(explicitRegionMergePlan.ready.includes(scalePlan.jobs[4].id));
assert.deepStrictEqual(
  explicitRegionMergePlan.blocked.filter((blocker) => [scalePlan.jobs[2].id, scalePlan.jobs[4].id].includes(blocker.jobId)),
  []
);

let incompleteRegionRun = createSwarmRun({ plan: scalePlan, startedAt: 6070 });
incompleteRegionRun = completeSwarmJob(incompleteRegionRun, {
  jobId: scalePlan.jobs[2].id,
  status: 'completed',
  changedPaths: ['src/hot/runtime-website-content.ts'],
  changedRegions: ['content.docs']
});
incompleteRegionRun = completeSwarmJob(incompleteRegionRun, {
  jobId: scalePlan.jobs[6].id,
  status: 'completed',
  changedPaths: ['src/hot/runtime-website-content.ts']
});
const incompleteRegionMergePlan = createSwarmMergePlan({ plan: scalePlan, run: incompleteRegionRun, generatedAt: 6080 });
const incompleteRegionBlockers = incompleteRegionMergePlan.blocked.filter((blocker) => [scalePlan.jobs[2].id, scalePlan.jobs[6].id].includes(blocker.jobId));
assert.deepStrictEqual(incompleteRegionBlockers.map((blocker) => blocker.jobId).sort(), [scalePlan.jobs[2].id, scalePlan.jobs[6].id].sort());
assert.ok(incompleteRegionBlockers.every((blocker) => blocker.reasons.includes('conflicting-changes')));

const regionOwnership = checkSwarmRegionOwnership(plan.jobs[0], {
  changedPaths: ['inkwell/apps/web/src/runtime/runtime.ts'],
  changedRegions: ['runtime.actions']
});
assert.strictEqual(regionOwnership.ok, true);
const badRegionOwnership = checkSwarmRegionOwnership(plan.jobs[0], {
  changedPaths: ['inkwell/apps/web/src/runtime/runtime.ts'],
  changedRegions: ['content.legal']
});
assert.strictEqual(badRegionOwnership.ok, false);
assert.deepStrictEqual(badRegionOwnership.regionViolations, ['content.legal']);

const regionBundleA = createSwarmMergeBundle({
  job: scalePlan.jobs[2],
  result: {
    jobId: scalePlan.jobs[2].id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/a/changes.patch',
  riskLevel: 'low'
});
const regionBundleB = createSwarmMergeBundle({
  job: scalePlan.jobs[4],
  result: {
    jobId: scalePlan.jobs[4].id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.legal'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/b/changes.patch',
  riskLevel: 'low'
});
const unregionedBundle = createSwarmMergeBundle({
  job: scalePlan.jobs[6],
  result: {
    jobId: scalePlan.jobs[6].id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/c/changes.patch',
  riskLevel: 'low'
});
const sameRegionJob = scalePlan.jobs[14];
const crossScopeJob = scalePlan.jobs[16];
const highRiskJob = scalePlan.jobs[18];
const parentScopeJob = scalePlan.jobs[20];
const parentScopeJobB = scalePlan.jobs[24];
const unknownRegionJob = scalePlan.jobs[22];
assert.ok(sameRegionJob && crossScopeJob && highRiskJob && parentScopeJob && parentScopeJobB && unknownRegionJob);
const sameRegionBundle = createSwarmMergeBundle({
  job: sameRegionJob,
  result: {
    jobId: sameRegionJob.id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/same-region/changes.patch',
  riskLevel: 'low'
});
const crossScopeBundle = createSwarmMergeBundle({
  job: crossScopeJob,
  result: {
    jobId: crossScopeJob.id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs', 'content.legal'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/cross-scope/changes.patch',
  riskLevel: 'low'
});
const highRiskBundle = createSwarmMergeBundle({
  job: highRiskJob,
  result: {
    jobId: highRiskJob.id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/high-risk/changes.patch',
  riskLevel: 'high'
});
const parentScopeBundle = createSwarmMergeBundle({
  job: parentScopeJob,
  result: {
    jobId: parentScopeJob.id,
    status: 'verified',
    changedPaths: ['src/scopes/parent-scope.ts'],
    changedRegions: ['scope.parent'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/parent-scope/changes.patch',
  riskLevel: 'low'
});
const parentScopeBundleB = createSwarmMergeBundle({
  job: parentScopeJobB,
  result: {
    jobId: parentScopeJobB.id,
    status: 'verified',
    changedPaths: ['src/scopes/parent-scope.ts'],
    changedRegions: ['scope.parent'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/parent-scope-b/changes.patch',
  riskLevel: 'low'
});
const unknownRegionBundle = createSwarmMergeBundle({
  job: unknownRegionJob,
  result: {
    jobId: unknownRegionJob.id,
    status: 'verified',
    changedPaths: ['src/runtime/unknown-region.ts'],
    changedRegions: ['unknown'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/unknown-region/changes.patch',
  riskLevel: 'low'
});
const regionIndex = createSwarmMergeIndex({ bundles: [regionBundleA, regionBundleB], generatedAt: 6100 });
assert.strictEqual(regionIndex.summary.conflictCount, 0);
assert.strictEqual(regionIndex.summary.readyToApplyCount, 2);
assert.strictEqual(regionIndex.entries.find((entry) => entry.jobId === regionBundleA.jobId).metadata.verificationGates[0].metadata.packageId, 'frontier-swarm');
const sameRegionIndex = createSwarmMergeIndex({ bundles: [regionBundleA, sameRegionBundle], generatedAt: 6150 });
assert.strictEqual(sameRegionIndex.summary.conflictCount, 1);
assert.deepStrictEqual(sameRegionIndex.entries.find((entry) => entry.jobId === sameRegionBundle.jobId).conflictingJobIds, [regionBundleA.jobId]);
const crossScopeIndex = createSwarmMergeIndex({ bundles: [crossScopeBundle], generatedAt: 6160 });
assert.strictEqual(crossScopeIndex.summary.conflictCount, 0);
const highRiskIndex = createSwarmMergeIndex({ bundles: [highRiskBundle], generatedAt: 6170 });
assert.strictEqual(highRiskIndex.summary.readyToApplyCount, 1);
const parentScopeIndex = createSwarmMergeIndex({ bundles: [parentScopeBundle], generatedAt: 6180 });
assert.strictEqual(parentScopeIndex.summary.readyToApplyCount, 1);
const parentScopeConflictIndex = createSwarmMergeIndex({ bundles: [parentScopeBundle, parentScopeBundleB], generatedAt: 6185 });
assert.strictEqual(parentScopeConflictIndex.summary.conflictCount, 1);
assert.deepStrictEqual(
  parentScopeConflictIndex.entries.find((entry) => entry.jobId === parentScopeBundle.jobId).conflictingJobIds,
  [parentScopeBundleB.jobId]
);
const unknownRegionIndex = createSwarmMergeIndex({ bundles: [unknownRegionBundle], generatedAt: 6190 });
assert.strictEqual(unknownRegionIndex.summary.readyToApplyCount, 1);
const pathFallbackIndex = createSwarmMergeIndex({ bundles: [regionBundleA, unregionedBundle], generatedAt: 6200 });
assert.strictEqual(pathFallbackIndex.summary.conflictCount, 1);
assert.deepStrictEqual(pathFallbackIndex.entries.find((entry) => entry.jobId === regionBundleA.jobId).conflictingJobIds, [unregionedBundle.jobId]);
const hotspotReport = createSwarmHotspotReport({ bundles: [regionBundleA, regionBundleB, unregionedBundle], threshold: 2, generatedAt: 6300 });
assert.strictEqual(hotspotReport.summary.hotspotCount, 1);
assert.ok(hotspotReport.recommendations.some((entry) => entry.path === 'src/hot/runtime-website-content.ts'));
const reviewerLane = createSwarmReviewerLanePlan({ index: pathFallbackIndex, reviewerLane: 'merge-review', reviewers: ['reviewer-a'], generatedAt: 6400 });
assert.ok(reviewerLane.tasks.every((task) => task.lane === 'merge-review'));
const runStoreShards = createSwarmRunStoreShards({ plan: scalePlan, root: 'agent-runs/sharded', shardSize: 200, groupBy: 'lane', generatedAt: 6500 });
assert.strictEqual(runStoreShards.summary.jobCount, 1000);
assert.ok(runStoreShards.summary.shardCount > 1);
const admission = createSwarmMergeAdmission({ index: regionIndex, maxReady: 1, maxChangedPaths: 2, maxChangedRegions: 2, generatedAt: 6600 });
assert.deepStrictEqual(admission.admitted, [regionBundleA.jobId]);
assert.strictEqual(admission.deferred[0].reasons.includes('max-ready'), true);
const admissionReviewerLane = createSwarmReviewerLanePlan({ index: regionIndex, admission, reviewerLane: 'merge-review', generatedAt: 6700 });
assert.ok(admissionReviewerLane.assignments.some((assignment) => assignment.jobId === regionBundleB.jobId && assignment.reasons.includes('max-ready')));
const contextPack = createSwarmContextPack({
  job: firstScaleJob,
  files: ['docs/architecture.md'],
	  apiMap: { runtime: ['createSwarmPlan', 'createSwarmRun'] },
	  knownFailures: ['global smoke fails on stale fixture'],
	  commands: [{ command: 'npm', args: ['run', 'focused-gate'] }],
	  oracleCommands: [{ command: 'node', args: ['oracle.mjs'] }],
	  expectedEvidence: ['evidence/commands.md'],
	  exclusions: ['dist', 'node_modules'],
	  avoidInvestigating: ['unrelated renderer rewrite'],
	  playbookIds: ['runtime-playbook'],
	  generatedAt: 6800
	});
assert.ok(contextPack.files.includes(firstScaleJob.task.targetRefs[0]));
assert.ok(contextPack.expectedEvidence.includes('evidence/commands.md'));
assert.ok(contextPack.exclusions.includes('node_modules'));
assert.strictEqual(contextPack.commands[0].command, 'npm');
assert.strictEqual(contextPack.oracleCommands[1].command, 'node');
const oracleCorpus = createSwarmOracleCorpus({
  id: 'generic-oracles',
  artifacts: [
    { id: 'api-trace', path: 'oracles/api-trace.jsonl', kind: 'trace', tags: ['api', 'deterministic'], command: 'node oracle.mjs' },
    { id: 'ui-trace', path: 'oracles/ui-trace.jsonl', kind: 'trace', tags: ['ui'] }
  ],
  generatedAt: 6900
});
assert.deepStrictEqual(oracleCorpus.byKind.trace, ['api-trace', 'ui-trace']);
assert.deepStrictEqual(oracleCorpus.byTag.deterministic, ['api-trace']);
const lanePlaybook = createSwarmLanePlaybook({
  lane: 'runtime',
  successfulBundles: [regionBundleA, regionBundleB],
  notes: ['Prefer the focused oracle before global smoke.'],
  commands: ['npm test'],
  avoidInvestigating: ['generated dist'],
  generatedAt: 7000
});
assert.deepStrictEqual(lanePlaybook.changedRegions, ['content.docs', 'content.legal']);
const patchStackPlan = createSwarmPatchStackPlan({ index: pathFallbackIndex, maxStackSize: 4, generatedAt: 7100 });
assert.strictEqual(patchStackPlan.summary.jobCount, 2);
assert.ok(patchStackPlan.stacks.some((stack) => stack.conflicts.length === 1));
const defaultHierarchicalQueue = createSwarmHierarchicalMergeQueue({ index: regionIndex, generatedAt: 7190 });
assert.strictEqual(defaultHierarchicalQueue.summary.applyLocalCount, 2);
assert.strictEqual(defaultHierarchicalQueue.scopes.find((scope) => scope.kind === 'root').leaseKey, 'merge:root:*');
assert.strictEqual(defaultHierarchicalQueue.summary.admissionPressure.applyLocalQueueItemCount, 2);
assert.deepStrictEqual(
  defaultHierarchicalQueue.assignments.map((assignment) => assignment.queueItemIds).flat().sort(),
  [regionBundleA.taskId, regionBundleB.taskId].sort()
);
assert.strictEqual(new Set(defaultHierarchicalQueue.assignments.map((assignment) => assignment.scopeId)).size, 2);
assert.strictEqual(new Set(defaultHierarchicalQueue.assignments.map((assignment) => assignment.leaseKey)).size, 2);
assert.ok(defaultHierarchicalQueue.assignments.every((assignment) => assignment.leaseKey.startsWith(`merge:semantic:${assignment.lane ?? 'root'}:content.`)));
assert.ok(defaultHierarchicalQueue.assignments.every((assignment) => assignment.changedPaths.length === 1));
assert.strictEqual(new Set(defaultHierarchicalQueue.assignments.flatMap((assignment) => assignment.changedPaths)).size, 1);
const sameFileSliceAdmission = createSwarmMergeAdmission({ index: regionIndex, maxReady: 2, maxChangedPaths: 1, maxChangedRegions: 2, generatedAt: 7195 });
assert.deepStrictEqual(sameFileSliceAdmission.admitted.sort(), [regionBundleA.jobId, regionBundleB.jobId].sort());
assert.strictEqual(sameFileSliceAdmission.summary.changedPathCount, 1);
assert.strictEqual(sameFileSliceAdmission.summary.changedRegionCount, 2);
const sameFileSliceQueue = createSwarmHierarchicalMergeQueue({ index: regionIndex, admission: sameFileSliceAdmission, generatedAt: 7196 });
assert.strictEqual(sameFileSliceQueue.summary.applyLocalCount, 2);
assert.strictEqual(sameFileSliceQueue.summary.promoteCount, 0);
assert.deepStrictEqual(
  sameFileSliceQueue.assignments.map((assignment) => assignment.action),
  ['apply-local', 'apply-local']
);
assert.strictEqual(new Set(sameFileSliceQueue.assignments.map((assignment) => assignment.leaseKey)).size, 2);
assert.ok(sameFileSliceQueue.assignments.every((assignment) => assignment.scopeId.startsWith('semantic-region:')));
assert.ok(sameFileSliceQueue.assignments.every((assignment) => assignment.requiredLeaseKeys.length === 1));
assert.deepStrictEqual(
  sameFileSliceQueue.assignments.map((assignment) => assignment.requiredLeaseKeys[0]).sort(),
  sameFileSliceQueue.assignments.map((assignment) => assignment.leaseKey).sort()
);
assert.ok(sameFileSliceQueue.assignments.every((assignment) => !assignment.requiredLeaseKeys.includes('merge:root:*')));
assert.ok(sameFileSliceQueue.assignments.every((assignment) => !assignment.requiredLeaseKeys.includes('merge:lane:runtime')));
assert.strictEqual(sameFileSliceQueue.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId).metadata.verificationGates[0].metadata.packagePath, 'packages/frontier-swarm');
const sameFileSliceDrainWorkA = createSwarmCoordinatorAgentDrainWork({
  queue: sameFileSliceQueue,
  coordinatorId: 'coordinator-a',
  generatedAt: 7197
});
const sameFileSliceDrainWorkB = createSwarmCoordinatorAgentDrainWork({
  queue: sameFileSliceQueue,
  coordinatorId: 'coordinator-b',
  generatedAt: 7198
});
assert.strictEqual(sameFileSliceDrainWorkA.summary.appliedCount, 2);
assert.strictEqual(new Set(sameFileSliceDrainWorkA.assignments.map((assignment) => assignment.leaseScope)).size, 2);
assert.deepStrictEqual(
  sameFileSliceDrainWorkA.assignments.map((assignment) => [assignment.jobId, assignment.requiredLeaseKeys]).sort(),
  sameFileSliceDrainWorkB.assignments.map((assignment) => [assignment.jobId, assignment.requiredLeaseKeys]).sort()
);
assert.ok(sameFileSliceDrainWorkA.assignments.every((assignment) => assignment.queueKind === 'semantic-region'));
assert.ok(sameFileSliceDrainWorkA.assignments.every((assignment) => assignment.requiredLeaseKeys[0] === assignment.leaseScope));
const syntheticSliceBundleA = createSwarmMergeBundle({
  result: {
    jobId: 'synthetic-same-file-slice-alpha',
    status: 'verified',
    changedPaths: ['src/synthetic/same-file.ts'],
    changedRegions: ['slice.alpha'],
    queueItemIds: ['synthetic-same-file-slice-alpha'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/synthetic-alpha/changes.patch',
  riskLevel: 'low'
});
const syntheticSliceBundleB = createSwarmMergeBundle({
  result: {
    jobId: 'synthetic-same-file-slice-beta',
    status: 'verified',
    changedPaths: ['src/synthetic/same-file.ts'],
    changedRegions: ['slice.beta'],
    queueItemIds: ['synthetic-same-file-slice-beta'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/synthetic-beta/changes.patch',
  riskLevel: 'low'
});
const syntheticSliceIndex = createSwarmMergeIndex({ bundles: [syntheticSliceBundleA, syntheticSliceBundleB], generatedAt: 7199 });
assert.strictEqual(syntheticSliceIndex.summary.conflictCount, 0);
assert.strictEqual(syntheticSliceIndex.summary.readyToApplyCount, 2);
assert.deepStrictEqual(syntheticSliceIndex.byPath['src/synthetic/same-file.ts'].sort(), [
  syntheticSliceBundleA.jobId,
  syntheticSliceBundleB.jobId
].sort());
const syntheticSliceAdmission = createSwarmMergeAdmission({
  index: syntheticSliceIndex,
  maxReady: 2,
  maxChangedPaths: 1,
  maxChangedRegions: 2,
  generatedAt: 7199.1
});
assert.deepStrictEqual(syntheticSliceAdmission.admitted.sort(), [syntheticSliceBundleA.jobId, syntheticSliceBundleB.jobId].sort());
assert.strictEqual(syntheticSliceAdmission.summary.changedPathCount, 1);
assert.strictEqual(syntheticSliceAdmission.summary.changedRegionCount, 2);
const syntheticSliceQueue = createSwarmHierarchicalMergeQueue({
  index: syntheticSliceIndex,
  admission: syntheticSliceAdmission,
  localLeader: {
    coordinatorId: 'semantic-coordinator',
    role: 'local-semantic-leader',
    electedAt: 7199.2,
    metadata: { runner: 'generic-agent' }
  },
  generatedAt: 7199.2
});
assert.strictEqual(syntheticSliceQueue.summary.applyLocalCount, 2);
assert.strictEqual(syntheticSliceQueue.summary.promoteCount, 0);
assert.strictEqual(new Set(syntheticSliceQueue.assignments.map((assignment) => assignment.scopeId)).size, 2);
assert.strictEqual(new Set(syntheticSliceQueue.assignments.map((assignment) => assignment.leaseKey)).size, 2);
assert.ok(syntheticSliceQueue.assignments.every((assignment) => assignment.scopeId.startsWith('semantic-region:')));
assert.ok(syntheticSliceQueue.assignments.every((assignment) => assignment.changedPaths[0] === 'src/synthetic/same-file.ts'));
assert.ok(syntheticSliceQueue.assignments.every((assignment) => assignment.requiredLeaseKeys[0] === assignment.leaseKey));
assert.ok(syntheticSliceQueue.assignments.every((assignment) => !assignment.requiredLeaseKeys[0].startsWith('merge:path:')));
const syntheticSemanticLeaseRecords = syntheticSliceQueue.leaseRecords.filter((record) => record.scopeClass === 'semantic');
assert.strictEqual(syntheticSemanticLeaseRecords.length, 2);
assert.strictEqual(new Set(syntheticSemanticLeaseRecords.map((record) => record.leaseKey)).size, 2);
assert.ok(syntheticSemanticLeaseRecords.every((record) => record.scopeKind === 'semantic-region'));
assert.ok(syntheticSemanticLeaseRecords.every((record) => record.localLeader.coordinatorId === 'semantic-coordinator'));
assert.ok(syntheticSemanticLeaseRecords.every((record) => record.localLeader.metadata.runner === 'generic-agent'));
assert.ok(syntheticSemanticLeaseRecords.every((record) => record.promotion.state === 'terminal'));
assert.ok(syntheticSemanticLeaseRecords.every((record) => record.terminalDecisionLinks.length === 1));
assert.ok(syntheticSemanticLeaseRecords.every((record) => record.terminalDecisionLinks[0].queueItemIds[0] === record.queueItemIds[0]));
assert.deepStrictEqual(
  syntheticSemanticLeaseRecords.map((record) => record.terminalQueueItemIds[0]).sort(),
  [syntheticSliceBundleA.jobId, syntheticSliceBundleB.jobId].sort()
);
assert.deepStrictEqual(
  syntheticSemanticLeaseRecords.map((record) => syntheticSliceQueue.byLeaseKey[record.leaseKey][0]).sort(),
  [syntheticSliceBundleA.jobId, syntheticSliceBundleB.jobId].sort()
);
const syntheticOverlapBundle = createSwarmMergeBundle({
  result: {
    jobId: 'synthetic-same-file-slice-alpha-overlap',
    status: 'verified',
    changedPaths: ['src/synthetic/same-file.ts'],
    changedRegions: ['slice.alpha'],
    queueItemIds: ['synthetic-same-file-slice-alpha-overlap'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/synthetic-alpha-overlap/changes.patch',
  riskLevel: 'low'
});
const syntheticOverlapIndex = createSwarmMergeIndex({ bundles: [syntheticSliceBundleA, syntheticOverlapBundle], generatedAt: 7199.3 });
assert.strictEqual(syntheticOverlapIndex.summary.conflictCount, 1);
assert.deepStrictEqual(
  syntheticOverlapIndex.entries.find((entry) => entry.jobId === syntheticOverlapBundle.jobId).conflictingJobIds,
  [syntheticSliceBundleA.jobId]
);
const syntheticOverlapAdmission = createSwarmMergeAdmission({
  index: syntheticOverlapIndex,
  maxReady: 2,
  maxChangedPaths: 1,
  maxChangedRegions: 1,
  generatedAt: 7199.4
});
assert.deepStrictEqual(syntheticOverlapAdmission.admitted, []);
assert.ok(syntheticOverlapAdmission.deferred.every((entry) => entry.reasons.includes('conflicting-changes')));
const syntheticOverlapQueue = createSwarmHierarchicalMergeQueue({ index: syntheticOverlapIndex, generatedAt: 7199.5 });
assert.strictEqual(syntheticOverlapQueue.summary.queueLocalCount, 2);
assert.strictEqual(syntheticOverlapQueue.summary.promoteCount, 0);
assert.strictEqual(new Set(syntheticOverlapQueue.assignments.map((assignment) => assignment.scopeId)).size, 1);
assert.strictEqual(new Set(syntheticOverlapQueue.assignments.map((assignment) => assignment.leaseKey)).size, 1);
assert.ok(syntheticOverlapQueue.assignments.every((assignment) => assignment.reasons.includes('same-lease-scope-conflict')));
const syntheticOverlapSemanticLeaseRecords = syntheticOverlapQueue.leaseRecords.filter((record) => record.scopeClass === 'semantic');
assert.strictEqual(syntheticOverlapSemanticLeaseRecords.length, 1);
assert.deepStrictEqual(
  syntheticOverlapSemanticLeaseRecords[0].activeQueueItemIds.sort(),
  [syntheticSliceBundleA.jobId, syntheticOverlapBundle.jobId].sort()
);
assert.deepStrictEqual(syntheticOverlapSemanticLeaseRecords[0].terminalDecisionIds, []);
assert.ok(syntheticOverlapSemanticLeaseRecords[0].conflictReasons.includes('same-lease-scope-conflict'));
const hierarchicalQueue = createSwarmHierarchicalMergeQueue({ index: regionIndex, admission, generatedAt: 7200 });
assert.strictEqual(hierarchicalQueue.summary.applyLocalCount, 1);
assert.strictEqual(hierarchicalQueue.summary.queueLocalCount, 1);
assert.strictEqual(hierarchicalQueue.summary.promoteCount, 0);
assert.deepStrictEqual(hierarchicalQueue.summary.admissionPressure, {
  applyLocalCount: 1,
  applyLocalQueueItemCount: 1,
  queueLocalCount: 1,
  queueLocalQueueItemCount: 1,
  promoteUpwardCount: 0,
  promoteUpwardQueueItemCount: 0,
  rerunCount: 0,
  rerunQueueItemCount: 0,
  rejectedCount: 0,
  rejectedQueueItemCount: 0,
  recordOnlyCount: 0,
  recordOnlyQueueItemCount: 0,
  trueBlockCount: 0,
  trueBlockQueueItemCount: 0
});
assert.strictEqual(hierarchicalQueue.scopes.filter((scope) => scope.kind === 'semantic-region').length, 2);
assert.strictEqual(hierarchicalQueue.scopes.some((scope) => scope.kind === 'custom'), false);
assert.strictEqual(
  hierarchicalQueue.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId).action,
  'apply-local'
);
assert.deepStrictEqual(
  hierarchicalQueue.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId).queueItemIds,
  regionBundleA.queueItemIds
);
assert.strictEqual(
  hierarchicalQueue.assignments.find((assignment) => assignment.jobId === regionBundleB.jobId).action,
  'queue-local'
);
const sameRegionQueue = createSwarmHierarchicalMergeQueue({ index: sameRegionIndex, generatedAt: 7250 });
assert.strictEqual(sameRegionQueue.summary.queueLocalCount, 2);
assert.strictEqual(sameRegionQueue.summary.promoteCount, 0);
assert.strictEqual(new Set(sameRegionQueue.assignments.map((assignment) => assignment.scopeId)).size, 1);
assert.ok(sameRegionQueue.assignments.every((assignment) => assignment.reasons.includes('same-lease-scope-conflict')));
assert.strictEqual(new Set(sameRegionQueue.assignments.map((assignment) => assignment.leaseKey)).size, 1);
assert.strictEqual(sameRegionQueue.summary.admissionPressure.queueLocalQueueItemCount, 2);
assert.ok(sameRegionQueue.assignments.every((assignment) => assignment.retrySlices === undefined));
const sameRegionOutcomeModel = createSwarmQueueOutcomeModel({ queue: sameRegionQueue, generatedAt: 7251 });
assert.strictEqual(sameRegionOutcomeModel.summary.continuationCount, 2);
assert.strictEqual(sameRegionOutcomeModel.summary.visibleConflictCount, 0);
assert.strictEqual(sameRegionOutcomeModel.summary.visibleReviewDebtCount, 0);
assert.ok(sameRegionOutcomeModel.latestDecisions.every((decision) => decision.category === 'continuation'));
const crossScopeQueue = createSwarmHierarchicalMergeQueue({ index: crossScopeIndex, generatedAt: 7260 });
const crossScopeAssignment = crossScopeQueue.assignments.find((assignment) => assignment.jobId === crossScopeBundle.jobId);
assert.strictEqual(crossScopeAssignment.action, 'rerun');
assert.strictEqual(crossScopeAssignment.promoteToScopeId, undefined);
assert.ok(crossScopeAssignment.reasons.includes('cross-scope-change'));
assert.ok(crossScopeAssignment.reasons.includes('semantic-slice-lease-retry'));
assert.strictEqual(crossScopeQueue.summary.rerunCount, 1);
assert.strictEqual(crossScopeQueue.summary.promoteCount, 0);
assert.deepStrictEqual(crossScopeQueue.promotions, []);
assert.strictEqual(crossScopeAssignment.retrySlices.length, 2);
assert.deepStrictEqual(crossScopeAssignment.retrySlices.map((slice) => slice.changedRegions[0]).sort(), ['content.docs', 'content.legal']);
assert.deepStrictEqual(crossScopeAssignment.semanticSliceLeaseKeys.sort(), [
  'merge:semantic:runtime:content.docs',
  'merge:semantic:runtime:content.legal'
]);
assert.ok(crossScopeAssignment.retrySlices.every((slice) => slice.kind === 'semantic-region'));
assert.ok(crossScopeAssignment.retrySlices.every((slice) => slice.parentScopeIds.includes('lane:runtime')));
assert.ok(crossScopeAssignment.retrySlices.every((slice) => slice.requiredLeaseScopeIds[0] === slice.scopeId));
assert.ok(crossScopeAssignment.retrySlices.every((slice) => slice.requiredLeaseKeys[0] === slice.leaseKey));
const semanticSliceRetryDrainWork = createSwarmCoordinatorAgentDrainWork({ queue: crossScopeQueue, generatedAt: 7265 });
const semanticSliceRetryDrainAssignment = semanticSliceRetryDrainWork.assignments.find((assignment) => assignment.jobId === crossScopeBundle.jobId);
assert.strictEqual(semanticSliceRetryDrainAssignment.assignedAction, 'rerun');
assert.strictEqual(semanticSliceRetryDrainAssignment.decision, 'rerun');
assert.strictEqual(semanticSliceRetryDrainAssignment.terminal, true);
assert.strictEqual(semanticSliceRetryDrainAssignment.retrySlices.length, 2);
assert.deepStrictEqual(
  semanticSliceRetryDrainWork.terminalDecisions.find((decision) => decision.jobId === crossScopeBundle.jobId).semanticSliceLeaseKeys.sort(),
  crossScopeAssignment.semanticSliceLeaseKeys.sort()
);
const admittedCrossScopeAdmission = createSwarmMergeAdmission({ index: crossScopeIndex, maxReady: 1, maxChangedPaths: 4, maxChangedRegions: 4, generatedAt: 7266 });
assert.deepStrictEqual(admittedCrossScopeAdmission.admitted, [crossScopeBundle.jobId]);
const admittedCrossScopeQueue = createSwarmHierarchicalMergeQueue({
  index: crossScopeIndex,
  admission: admittedCrossScopeAdmission,
  generatedAt: 7267
});
const admittedCrossScopeAssignment = admittedCrossScopeQueue.assignments.find((assignment) => assignment.jobId === crossScopeBundle.jobId);
assert.strictEqual(admittedCrossScopeAssignment.action, 'apply-local');
assert.strictEqual(admittedCrossScopeAssignment.admitted, true);
assert.strictEqual(admittedCrossScopeAssignment.leaseKey, 'merge:lane:runtime');
assert.ok(admittedCrossScopeAssignment.reasons.includes('admitted-by-merge-admission'));
assert.ok(admittedCrossScopeAssignment.reasons.includes('lease-backed-cross-scope-apply'));
assert.ok(admittedCrossScopeAssignment.reasons.includes('cross-scope-change'));
assert.strictEqual(admittedCrossScopeAssignment.retrySlices, undefined);
assert.deepStrictEqual([...admittedCrossScopeAssignment.semanticSliceLeaseKeys].sort(), [
  'merge:semantic:runtime:content.docs',
  'merge:semantic:runtime:content.legal'
]);
assert.strictEqual(admittedCrossScopeAssignment.semanticSliceScopeIds.length, 2);
assert.strictEqual(admittedCrossScopeQueue.summary.applyLocalCount, 1);
assert.strictEqual(admittedCrossScopeQueue.summary.rerunCount, 0);
assert.strictEqual(admittedCrossScopeQueue.summary.promoteCount, 0);
const admittedCrossScopeDrainWork = createSwarmCoordinatorAgentDrainWork({ queue: admittedCrossScopeQueue, generatedAt: 7268 });
const admittedCrossScopeDrainAssignment = admittedCrossScopeDrainWork.assignments.find((assignment) => assignment.jobId === crossScopeBundle.jobId);
assert.strictEqual(admittedCrossScopeDrainAssignment.assignedAction, 'apply-local');
assert.strictEqual(admittedCrossScopeDrainAssignment.decision, 'applied');
assert.strictEqual(admittedCrossScopeDrainAssignment.terminal, true);
assert.deepStrictEqual([...admittedCrossScopeDrainAssignment.semanticSliceLeaseKeys].sort(), admittedCrossScopeAssignment.semanticSliceLeaseKeys.sort());
assert.deepStrictEqual(
  [...admittedCrossScopeDrainWork.terminalDecisions.find((decision) => decision.jobId === crossScopeBundle.jobId).semanticSliceLeaseKeys].sort(),
  [...admittedCrossScopeAssignment.semanticSliceLeaseKeys].sort()
);
assert.strictEqual(admittedCrossScopeDrainWork.summary.appliedCount, 1);
assert.strictEqual(admittedCrossScopeDrainWork.summary.rerunCount, 0);
const highRiskQueue = createSwarmHierarchicalMergeQueue({ index: highRiskIndex, generatedAt: 7270 });
const highRiskAssignment = highRiskQueue.assignments.find((assignment) => assignment.jobId === highRiskBundle.jobId);
assert.strictEqual(highRiskQueue.summary.promoteCount, 0);
assert.strictEqual(highRiskQueue.summary.queueLocalCount, 1);
assert.strictEqual(highRiskAssignment.action, 'queue-local');
assert.strictEqual(highRiskAssignment.promoteToScopeId, undefined);
assert.ok(highRiskAssignment.reasons.includes('high-risk'));
const parentScopeQueue = createSwarmHierarchicalMergeQueue({ index: parentScopeIndex, generatedAt: 7280 });
const parentScopeAssignment = parentScopeQueue.assignments.find((assignment) => assignment.jobId === parentScopeBundle.jobId);
assert.strictEqual(parentScopeAssignment.action, 'promote');
assert.strictEqual(parentScopeAssignment.promoteToScopeId, parentScopeAssignment.parentScopeIds[0]);
assert.ok(parentScopeAssignment.scopeId.startsWith('semantic-region:'));
assert.strictEqual(parentScopeAssignment.leaseKey, `merge:semantic:${parentScopeAssignment.lane ?? 'root'}:scope.parent`);
assert.deepStrictEqual(parentScopeAssignment.queueItemIds, parentScopeBundle.queueItemIds);
assert.ok(parentScopeAssignment.reasons.includes('parent-scope-region'));
assert.deepStrictEqual(parentScopeAssignment.parentDecisionRegions, ['scope.parent']);
assert.strictEqual(parentScopeAssignment.retrySlices, undefined);
assert.strictEqual(parentScopeQueue.summary.admissionPressure.promoteUpwardQueueItemCount, 1);
const parentScopeConflictQueue = createSwarmHierarchicalMergeQueue({ index: parentScopeConflictIndex, generatedAt: 7285 });
const parentScopeConflictAssignments = parentScopeConflictQueue.assignments.filter((assignment) => (
  [parentScopeBundle.jobId, parentScopeBundleB.jobId].includes(assignment.jobId)
));
assert.strictEqual(parentScopeConflictQueue.summary.promoteCount, 2);
assert.deepStrictEqual(parentScopeConflictAssignments.map((assignment) => assignment.action), ['promote', 'promote']);
assert.ok(parentScopeConflictAssignments.every((assignment) => assignment.reasons.includes('parent-scope-region')));
assert.ok(parentScopeConflictAssignments.every((assignment) => assignment.reasons.includes('conflicting-changes')));
assert.strictEqual(new Set(parentScopeConflictAssignments.map((assignment) => assignment.promoteToScopeId)).size, 1);
assert.strictEqual(parentScopeConflictAssignments[0].promoteToScopeId, 'lane:runtime');
assert.ok(parentScopeConflictAssignments.every((assignment) => assignment.leaseKey.startsWith('merge:semantic:runtime:scope.parent')));
assert.ok(parentScopeConflictAssignments.every((assignment) => assignment.requiredLeaseKeys.length === 1));
assert.ok(parentScopeConflictAssignments.every((assignment) => assignment.requiredLeaseKeys[0] === 'merge:lane:runtime'));
const parentScopeConflictDrainWork = createSwarmCoordinatorAgentDrainWork({
  queue: parentScopeConflictQueue,
  coordinatorId: 'parent-scope-coordinator',
  generatedAt: 7286
});
assert.strictEqual(parentScopeConflictDrainWork.summary.escalatedCount, 2);
assert.strictEqual(new Set(parentScopeConflictDrainWork.assignments.map((assignment) => assignment.leaseScope)).size, 1);
assert.deepStrictEqual(
  parentScopeConflictDrainWork.byLeaseScope['merge:lane:runtime'].sort(),
  [parentScopeBundle.jobId, parentScopeBundleB.jobId].sort()
);
assert.ok(parentScopeConflictDrainWork.assignments.every((assignment) => assignment.requiredLeaseKeys[0] === assignment.leaseScope));
const unknownRegionQueue = createSwarmHierarchicalMergeQueue({ index: unknownRegionIndex, generatedAt: 7290 });
const unknownRegionAssignment = unknownRegionQueue.assignments.find((assignment) => assignment.jobId === unknownRegionBundle.jobId);
assert.strictEqual(unknownRegionAssignment.action, 'promote');
assert.strictEqual(unknownRegionQueue.scopes.find((scope) => scope.id === unknownRegionAssignment.scopeId).kind, 'path');
assert.strictEqual(unknownRegionAssignment.leaseKey, 'merge:path:src/runtime/unknown-region.ts');
assert.strictEqual(unknownRegionAssignment.promoteToScopeId, unknownRegionAssignment.parentScopeIds[0]);
assert.ok(unknownRegionAssignment.reasons.includes('unknown-semantic-region'));
assert.deepStrictEqual(unknownRegionAssignment.unknownRegions, ['unknown']);
assert.strictEqual(unknownRegionAssignment.retrySlices, undefined);
assert.strictEqual(unknownRegionQueue.summary.admissionPressure.promoteUpwardCount, 1);
const conflictQueue = createSwarmHierarchicalMergeQueue({ index: pathFallbackIndex, generatedAt: 7300 });
assert.strictEqual(conflictQueue.summary.promoteCount, 2);
assert.deepStrictEqual(conflictQueue.promotions.map((promotion) => promotion.toScopeId), ['root', 'root']);
assert.ok(conflictQueue.byAction.promote.includes(regionBundleA.jobId));
assert.ok(conflictQueue.byScope['lane:runtime'] === undefined);
assert.ok(conflictQueue.scopes.some((scope) => scope.kind === 'root'));
assert.ok(conflictQueue.scopes.some((scope) => scope.kind === 'lane'));
assert.ok(conflictQueue.scopes.some((scope) => scope.kind === 'semantic-region'));
assert.ok(conflictQueue.scopes.some((scope) => scope.kind === 'path'));
assert.strictEqual(conflictQueue.scopes.some((scope) => scope.kind === 'custom'), false);
assert.strictEqual(conflictQueue.scopeTree.rootScopeId, 'root');
assert.ok(conflictQueue.scopeTree.scopeIdsByKind.root.includes('root'));
assert.ok(conflictQueue.scopeTree.scopeIdsByKind.lane.includes('lane:runtime'));
assert.ok(conflictQueue.scopeTree.scopeIdsByKind['semantic-region'].length >= 1);
assert.ok(conflictQueue.scopeTree.scopeIdsByKind.path.length >= 1);
assert.deepStrictEqual(conflictQueue.scopeTree.scopeIdsByKind.parent, []);
assert.deepStrictEqual(conflictQueue.scopeTree.scopeIdsByKind.child, []);
assert.deepStrictEqual(conflictQueue.scopeTree.scopeIdsByKind.custom, []);
const conflictLeaseScopeClasses = new Set(conflictQueue.leaseRecords.map((record) => record.scopeClass));
assert.ok(conflictLeaseScopeClasses.has('root'));
assert.ok(conflictLeaseScopeClasses.has('lane'));
assert.ok(conflictLeaseScopeClasses.has('semantic'));
assert.ok(conflictLeaseScopeClasses.has('path'));
const rootConflictLeaseRecord = conflictQueue.leaseRecords.find((record) => record.scopeClass === 'root');
assert.strictEqual(rootConflictLeaseRecord.promotion.state, 'receiving-promoted');
assert.deepStrictEqual(
  rootConflictLeaseRecord.promotion.promotedQueueItemIds.sort(),
  [...regionBundleA.queueItemIds, ...unregionedBundle.queueItemIds].sort()
);
assert.strictEqual(rootConflictLeaseRecord.promotion.promotionIds.length, 2);
assert.ok(
  conflictQueue.leaseRecords
    .filter((record) => record.promotion.state === 'promoted-to-parent')
    .every((record) => record.promotion.promotedToQueueIds.includes('root'))
);
const customScopeQueue = createSwarmHierarchicalMergeQueue({
  index: regionIndex,
  scopes: [{
    id: 'scope:shared-runtime',
    parentId: 'root',
    title: 'Shared runtime queue',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    changedRegions: ['content.docs'],
    leaseKey: 'merge:scope:shared-runtime',
    metadata: { ownerKind: 'adapter-defined' }
  }],
  generatedAt: 7350
});
const customScope = customScopeQueue.scopes.find((scope) => scope.id === 'scope:shared-runtime');
assert.ok(customScope);
assert.strictEqual(customScope.kind, 'custom');
assert.strictEqual(customScope.leaseKey, 'merge:scope:shared-runtime');
assert.deepStrictEqual(customScope.changedPaths, ['src/hot/runtime-website-content.ts']);
assert.deepStrictEqual(customScope.changedRegions, ['content.docs']);
assert.deepStrictEqual(customScope.metadata, { ownerKind: 'adapter-defined' });
assert.deepStrictEqual(customScope.jobIds, []);
assert.ok(customScopeQueue.scopeTree.scopeIdsByKind.custom.includes('scope:shared-runtime'));
assert.ok(customScopeQueue.scopeTree.ancestorScopeIdsByScopeId['scope:shared-runtime'].includes('root'));
assert.ok(customScopeQueue.assignments.every((assignment) => assignment.scopeId.startsWith('semantic-region:')));
const parentChildScopeQueue = createSwarmHierarchicalMergeQueue({
  index: regionIndex,
  scopes: [
    {
      id: 'scope:parent',
      kind: 'parent',
      parentId: 'root',
      title: 'Parent queue',
      leaseKey: 'merge:scope:parent'
    },
    {
      id: 'scope:child',
      kind: 'child',
      parentId: 'scope:parent',
      title: 'Child queue',
      leaseKey: 'merge:scope:child'
    }
  ],
  generatedAt: 7355
});
assert.strictEqual(parentChildScopeQueue.scopes.find((scope) => scope.id === 'scope:parent').kind, 'parent');
assert.strictEqual(parentChildScopeQueue.scopes.find((scope) => scope.id === 'scope:child').kind, 'child');
assert.strictEqual(parentChildScopeQueue.leaseRecords.find((record) => record.scopeId === 'scope:parent').scopeClass, 'parent');
assert.strictEqual(parentChildScopeQueue.leaseRecords.find((record) => record.scopeId === 'scope:child').scopeClass, 'child');
assert.ok(parentChildScopeQueue.scopeTree.scopeIdsByKind.parent.includes('scope:parent'));
assert.ok(parentChildScopeQueue.scopeTree.scopeIdsByKind.child.includes('scope:child'));
assert.ok(parentChildScopeQueue.scopeTree.ancestorScopeIdsByScopeId['scope:child'].includes('scope:parent'));
assert.ok(parentChildScopeQueue.scopeTree.childScopeIdsByScopeId['scope:parent'].includes('scope:child'));
assert.ok(parentChildScopeQueue.scopeTree.leafScopeIds.includes('scope:child'));
const sameLaneRuntimeJob = scalePlan.jobs.find((job) => job.id !== regionBundleA.jobId && job.lane === 'runtime');
assert.ok(sameLaneRuntimeJob);
const sameLaneUnregionedBundle = createSwarmMergeBundle({
  job: sameLaneRuntimeJob,
  result: {
    jobId: sameLaneRuntimeJob.id,
    status: 'verified',
    changedPaths: ['src/hot/runtime-website-content.ts'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/d/changes.patch',
  riskLevel: 'low'
});
const sameLaneConflictQueue = createSwarmHierarchicalMergeQueue({
  index: createSwarmMergeIndex({ bundles: [regionBundleA, sameLaneUnregionedBundle], generatedAt: 7400 }),
  generatedAt: 7500
});
assert.deepStrictEqual(sameLaneConflictQueue.promotions.map((promotion) => promotion.toScopeId), ['lane:runtime', 'lane:runtime']);
const localDrainBundle = createSwarmMergeBundle({
  result: {
    jobId: 'synthetic-local-drain',
    status: 'verified',
    changedPaths: ['src/hot/runtime-local-drain.ts'],
    changedRegions: ['content.docs'],
    queueItemIds: ['synthetic-local-drain'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/local-drain/changes.patch',
  riskLevel: 'low'
});
const publicContractBundle = createSwarmMergeBundle({
  result: {
    jobId: 'synthetic-public-contract',
    status: 'verified',
    changedPaths: ['src/hot/runtime-public-contract.ts'],
    changedRegions: ['public-contract'],
    queueItemIds: ['synthetic-public-contract'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/public-contract/changes.patch',
  riskLevel: 'low'
});
const publicContractAdmission = createSwarmMergeAdmission({
  index: createSwarmMergeIndex({ bundles: [localDrainBundle, publicContractBundle], generatedAt: 7501 }),
  maxReady: 1,
  maxChangedPaths: 2,
  maxChangedRegions: 2,
  generatedAt: 7501
});
assert.deepStrictEqual(publicContractAdmission.admitted, [localDrainBundle.jobId]);
const publicContractQueue = createSwarmHierarchicalMergeQueue({
  index: createSwarmMergeIndex({ bundles: [localDrainBundle, publicContractBundle], generatedAt: 7501 }),
  admission: publicContractAdmission,
  generatedAt: 7502
});
const publicContractLocalAssignment = publicContractQueue.assignments.find((assignment) => assignment.jobId === localDrainBundle.jobId);
const publicContractAssignment = publicContractQueue.assignments.find((assignment) => assignment.jobId === publicContractBundle.jobId);
assert.ok(publicContractLocalAssignment);
assert.ok(publicContractAssignment);
assert.strictEqual(publicContractQueue.summary.applyLocalCount, 1);
assert.strictEqual(publicContractQueue.summary.promoteCount, 1);
assert.strictEqual(publicContractLocalAssignment.action, 'apply-local');
assert.strictEqual(publicContractAssignment.action, 'promote');
assert.strictEqual(publicContractAssignment.promoteToScopeId, 'root');
assert.ok(publicContractAssignment.reasons.includes('public-contract-region'));
assert.ok(publicContractAssignment.reasons.includes('parent-scope-region'));
const terminalJobs = [scalePlan.jobs[8], scalePlan.jobs[9], scalePlan.jobs[10], scalePlan.jobs[11], scalePlan.jobs[12]];
assert.ok(terminalJobs.every(Boolean));
const terminalBundleStale = createSwarmMergeBundle({
  job: terminalJobs[0],
  result: {
    jobId: terminalJobs[0].id,
    status: 'verified',
    changedPaths: ['src/terminal/stale.ts'],
    verification: [{ status: 0 }]
  },
  patchPath: 'agent-runs/terminal/stale.patch',
  riskLevel: 'low',
  staleAgainstHead: true
});
const terminalBundleRejected = createSwarmMergeBundle({
  job: terminalJobs[1],
  result: {
    jobId: terminalJobs[1].id,
    status: 'failed',
    changedPaths: ['src/terminal/rejected.ts'],
    verification: [{ status: 1 }]
  },
  patchPath: 'agent-runs/terminal/rejected.patch',
  riskLevel: 'high'
});
const terminalBundleDiscovery = createSwarmMergeBundle({
  job: terminalJobs[2],
  result: {
    jobId: terminalJobs[2].id,
    status: 'completed',
    changedPaths: []
  },
  riskLevel: 'low'
});
const terminalBundleBlocked = createSwarmMergeBundle({
  job: terminalJobs[3],
  result: {
    jobId: terminalJobs[3].id,
    status: 'blocked',
    changedPaths: ['src/terminal/blocker.ts']
  },
  riskLevel: 'high'
});
const terminalBundleCoordinatorReview = createSwarmMergeBundle({
  job: terminalJobs[4],
  result: {
    jobId: terminalJobs[4].id,
    status: 'completed',
    changedPaths: ['src/terminal/coordinator-review.ts']
  },
  patchPath: 'agent-runs/terminal/coordinator-review.patch',
  riskLevel: 'medium'
});
const terminalQueue = createSwarmHierarchicalMergeQueue({
  index: createSwarmMergeIndex({
    bundles: [
      terminalBundleStale,
      terminalBundleRejected,
      terminalBundleDiscovery,
      terminalBundleBlocked,
      terminalBundleCoordinatorReview
    ],
    generatedAt: 7550
  }),
  generatedAt: 7560
});
assert.strictEqual(terminalQueue.summary.rerunCount, 1);
assert.strictEqual(terminalQueue.summary.rejectCount, 1);
assert.strictEqual(terminalQueue.summary.recordOnlyCount, 1);
assert.strictEqual(terminalQueue.summary.blockCount, 1);
assert.strictEqual(terminalQueue.summary.promoteCount, 1);
assert.deepStrictEqual(terminalQueue.summary.admissionPressure, {
  applyLocalCount: 0,
  applyLocalQueueItemCount: 0,
  queueLocalCount: 0,
  queueLocalQueueItemCount: 0,
  promoteUpwardCount: 1,
  promoteUpwardQueueItemCount: 1,
  rerunCount: 1,
  rerunQueueItemCount: 1,
  rejectedCount: 1,
  rejectedQueueItemCount: 1,
  recordOnlyCount: 1,
  recordOnlyQueueItemCount: 1,
  trueBlockCount: 1,
  trueBlockQueueItemCount: 1
});
assert.deepStrictEqual(terminalQueue.byAction.block, [terminalBundleBlocked.jobId]);
assert.deepStrictEqual(terminalQueue.byAction.promote, [terminalBundleCoordinatorReview.jobId]);
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleStale.jobId).action, 'rerun');
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleRejected.jobId).action, 'reject');
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleDiscovery.jobId).action, 'record-only');
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleBlocked.jobId).action, 'block');
assert.strictEqual(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleCoordinatorReview.jobId).action, 'promote');
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleStale.jobId).reasons.includes('stale-against-head'));
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleRejected.jobId).reasons.includes('failed-or-invalid-evidence'));
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleDiscovery.jobId).reasons.includes('discovery-only'));
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleBlocked.jobId).reasons.includes('true-blocker'));
assert.ok(terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleCoordinatorReview.jobId).reasons.includes('coordinator-queue-required'));
assert.ok(terminalQueue.promotions.find((promotion) => promotion.jobId === terminalBundleCoordinatorReview.jobId).reasons.includes('coordinator-queue-required'));
const terminalStaleLeaseRecord = terminalQueue.leaseRecords.find((record) => (
  record.terminalDecisionLinks.some((link) => link.jobId === terminalBundleStale.jobId)
));
assert.ok(terminalStaleLeaseRecord);
assert.deepStrictEqual(terminalStaleLeaseRecord.terminalQueueItemIds, terminalBundleStale.queueItemIds);
assert.deepStrictEqual(terminalStaleLeaseRecord.terminalDecisionLinks[0].queueItemIds, terminalBundleStale.queueItemIds);
assert.strictEqual(
  terminalStaleLeaseRecord.terminalDecisionLinks[0].id,
  terminalQueue.assignments.find((assignment) => assignment.jobId === terminalBundleStale.jobId).terminalDecisionId
);

const coordinatorDrainWork = createSwarmCoordinatorAgentDrainWork({
  queue: hierarchicalQueue,
  coordinatorId: 'coordinator-1',
  generatedAt: 7570
});
assert.strictEqual(coordinatorDrainWork.kind, FRONTIER_SWARM_COORDINATOR_AGENT_DRAIN_WORK_KIND);
assert.strictEqual(coordinatorDrainWork.queueId, hierarchicalQueue.id);
assert.strictEqual(coordinatorDrainWork.coordinatorId, 'coordinator-1');
assert.strictEqual(coordinatorDrainWork.summary.appliedCount, 1);
assert.strictEqual(coordinatorDrainWork.summary.queuedCount, 1);
assert.strictEqual(coordinatorDrainWork.summary.terminalCount, 1);
assert.strictEqual(coordinatorDrainWork.summary.nonTerminalCount, 1);
const coordinatorDrainSummary = summarizeSwarmCoordinatorAgentDrainWork(coordinatorDrainWork);
const coordinatorDrainRootLease = coordinatorDrainWork.leases.find((lease) => lease.scopeKind === 'root');
assert.ok(coordinatorDrainRootLease);
assert.deepStrictEqual(coordinatorDrainSummary, {
  leaseCount: coordinatorDrainWork.leases.length,
  assignmentCount: 2,
  activeAssignmentCount: 1,
  terminalCount: 1,
  promotedWorkCount: 0,
  blockerCount: 0,
  queueItemCount: 2,
  activeQueueItemCount: 1,
  terminalQueueItemCount: 1,
  promotedQueueItemCount: 0,
  blockerQueueItemCount: 0,
  admissionPressure: {
    applyLocalCount: 1,
    applyLocalQueueItemCount: 1,
    queueLocalCount: 1,
    queueLocalQueueItemCount: 1,
    promoteUpwardCount: 0,
    promoteUpwardQueueItemCount: 0,
    rerunCount: 0,
    rerunQueueItemCount: 0,
    rejectedCount: 0,
    rejectedQueueItemCount: 0,
    recordOnlyCount: 0,
    recordOnlyQueueItemCount: 0,
    trueBlockCount: 0,
    trueBlockQueueItemCount: 0
  },
  rootQueueSelectionPressure: {
    rootQueueId: 'root',
    leaseId: coordinatorDrainRootLease.id,
    leaseScope: coordinatorDrainRootLease.leaseScope,
    promotedWorkCount: 0,
    promotedQueueItemCount: 0,
    promotedJobIds: [],
    promotedQueueItemIds: [],
    bySourceQueueId: {},
    byReason: {},
    admissionPressure: {
      applyLocalCount: 0,
      applyLocalQueueItemCount: 0,
      queueLocalCount: 0,
      queueLocalQueueItemCount: 0,
      promoteUpwardCount: 0,
      promoteUpwardQueueItemCount: 0,
      rerunCount: 0,
      rerunQueueItemCount: 0,
      rejectedCount: 0,
      rejectedQueueItemCount: 0,
      recordOnlyCount: 0,
      recordOnlyQueueItemCount: 0,
      trueBlockCount: 0,
      trueBlockQueueItemCount: 0
    }
  }
});
assert.strictEqual(coordinatorDrainWork.summary.activeAssignmentCount, coordinatorDrainSummary.activeAssignmentCount);
assert.strictEqual(coordinatorDrainWork.summary.queueItemCount, coordinatorDrainSummary.queueItemCount);
assert.deepStrictEqual(coordinatorDrainWork.summary.admissionPressure, coordinatorDrainSummary.admissionPressure);
assert.deepStrictEqual(coordinatorDrainWork.summary.rootQueueSelectionPressure, coordinatorDrainSummary.rootQueueSelectionPressure);
assert.deepStrictEqual(coordinatorDrainWork.activeAssignments.map((assignment) => assignment.jobId), [regionBundleB.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byAction['apply-local'], [regionBundleA.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byAction['queue-local'], [regionBundleB.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byDecision.applied, [regionBundleA.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byDecision.queued, [regionBundleB.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byClassification.terminal, [regionBundleA.jobId]);
assert.deepStrictEqual(coordinatorDrainWork.byClassification['non-terminal'], [regionBundleB.jobId]);
const drainApply = coordinatorDrainWork.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId);
assert.strictEqual(drainApply.assignedAction, 'apply-local');
assert.strictEqual(drainApply.decision, 'applied');
assert.strictEqual(drainApply.classification, 'terminal');
assert.strictEqual(drainApply.terminal, true);
assert.deepStrictEqual(drainApply.queueItemIds, regionBundleA.queueItemIds);
assert.ok(drainApply.leaseId.startsWith('swarm-coordinator-agent-drain-lease:'));
assert.ok(drainApply.leaseScope.startsWith('merge:semantic:'));
assert.strictEqual(drainApply.queueId, hierarchicalQueue.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId).scopeId);
assert.strictEqual(drainApply.metadata.verificationGates[0].metadata.packageName, '@shapeshift-labs/frontier-swarm');
assert.deepStrictEqual(
  coordinatorDrainWork.terminalDecisions.find((decision) => decision.jobId === regionBundleA.jobId).queueItemIds,
  regionBundleA.queueItemIds
);
assert.strictEqual(
  coordinatorDrainWork.terminalDecisions.find((decision) => decision.jobId === regionBundleA.jobId).leaseScope,
  drainApply.leaseScope
);
assert.deepStrictEqual(coordinatorDrainWork.byLeaseScope[drainApply.leaseScope], [regionBundleA.jobId]);
const drainQueue = coordinatorDrainWork.assignments.find((assignment) => assignment.jobId === regionBundleB.jobId);
assert.strictEqual(drainQueue.assignedAction, 'queue-local');
assert.strictEqual(drainQueue.decision, 'queued');
assert.strictEqual(drainQueue.classification, 'non-terminal');
assert.strictEqual(drainQueue.terminal, false);
assert.deepStrictEqual(drainQueue.queueItemIds, regionBundleB.queueItemIds);
assert.ok(drainQueue.reasons.includes('max-ready'));
assert.strictEqual(coordinatorDrainWork.activeAssignments[0].leaseScope, drainQueue.leaseScope);
assert.deepStrictEqual(coordinatorDrainWork.byLeaseScope[drainQueue.leaseScope], [regionBundleB.jobId]);
assert.strictEqual(drainQueue.metadata.verificationGates[0].metadata.packagePath, 'packages/frontier-swarm');
const stableCoordinatorDrainWork = createSwarmCoordinatorAgentDrainWork({
  queue: createSwarmHierarchicalMergeQueue({ index: regionIndex, admission, generatedAt: 7201 }),
  coordinatorId: 'coordinator-1',
  generatedAt: 7571
});
assert.deepStrictEqual(
  coordinatorDrainWork.leases.map((lease) => [lease.queueId, lease.id, lease.leaseScope]),
  stableCoordinatorDrainWork.leases.map((lease) => [lease.queueId, lease.id, lease.leaseScope])
);

const promoteDrainWork = createSwarmCoordinatorAgentDrainWork({ queue: conflictQueue, generatedAt: 7580 });
const promoteQueueJobIds = conflictQueue.assignments.map((assignment) => assignment.jobId);
assert.strictEqual(promoteDrainWork.summary.escalatedCount, 2);
assert.strictEqual(promoteDrainWork.summary.nonTerminalCount, 2);
assert.strictEqual(promoteDrainWork.summary.promotedWorkCount, 2);
assert.deepStrictEqual(promoteDrainWork.activeAssignments.map((assignment) => assignment.jobId), promoteQueueJobIds);
assert.deepStrictEqual(promoteDrainWork.byDecision.escalated, promoteQueueJobIds);
const promoteDrainSummary = summarizeSwarmCoordinatorAgentDrainWork(promoteDrainWork);
assert.strictEqual(promoteDrainSummary.activeAssignmentCount, 2);
assert.strictEqual(promoteDrainSummary.promotedWorkCount, 2);
assert.strictEqual(promoteDrainSummary.promotedQueueItemCount, 2);
assert.strictEqual(promoteDrainSummary.admissionPressure.promoteUpwardCount, 2);
assert.strictEqual(promoteDrainSummary.admissionPressure.promoteUpwardQueueItemCount, 2);
assert.strictEqual(promoteDrainWork.summary.promotedQueueItemCount, promoteDrainSummary.promotedQueueItemCount);
assert.deepStrictEqual(promoteDrainWork.summary.rootQueueSelectionPressure, promoteDrainSummary.rootQueueSelectionPressure);
const drainPromote = promoteDrainWork.assignments.find((assignment) => assignment.jobId === regionBundleA.jobId);
assert.strictEqual(drainPromote.assignedAction, 'promote');
assert.strictEqual(drainPromote.decision, 'escalated');
assert.strictEqual(drainPromote.classification, 'non-terminal');
assert.strictEqual(drainPromote.parentQueueId, 'root');
assert.strictEqual(drainPromote.promoteToQueueId, 'root');
const drainPromoteLease = promoteDrainWork.leases.find((lease) => lease.queueId === drainPromote.parentQueueId);
assert.strictEqual(drainPromote.leaseId, drainPromoteLease.id);
assert.strictEqual(drainPromote.leaseScope, drainPromoteLease.leaseScope);
assert.deepStrictEqual(promoteDrainWork.byLeaseScope[drainPromoteLease.leaseScope], promoteQueueJobIds);
assert.ok(drainPromoteLease.actions.promote.includes(regionBundleA.jobId));
assert.ok(drainPromoteLease.jobIds.includes(regionBundleA.jobId));
assert.strictEqual(promoteDrainSummary.rootQueueSelectionPressure.rootQueueId, 'root');
assert.strictEqual(promoteDrainSummary.rootQueueSelectionPressure.leaseId, drainPromoteLease.id);
assert.strictEqual(promoteDrainSummary.rootQueueSelectionPressure.leaseScope, drainPromoteLease.leaseScope);
assert.strictEqual(promoteDrainSummary.rootQueueSelectionPressure.promotedWorkCount, 2);
assert.strictEqual(promoteDrainSummary.rootQueueSelectionPressure.promotedQueueItemCount, 2);
assert.deepStrictEqual(promoteDrainSummary.rootQueueSelectionPressure.promotedJobIds, promoteQueueJobIds);
assert.deepStrictEqual(
  promoteDrainSummary.rootQueueSelectionPressure.promotedQueueItemIds,
  Array.from(new Set(promoteDrainWork.promotedWork.flatMap((entry) => entry.queueItemIds)))
);
assert.strictEqual(promoteDrainSummary.rootQueueSelectionPressure.admissionPressure.promoteUpwardCount, 2);
assert.strictEqual(promoteDrainSummary.rootQueueSelectionPressure.admissionPressure.promoteUpwardQueueItemCount, 2);
for (const assignment of promoteDrainWork.assignments) {
  assert.ok(promoteDrainSummary.rootQueueSelectionPressure.bySourceQueueId[assignment.queueId].includes(assignment.jobId));
  for (const reason of assignment.reasons) {
    assert.ok(promoteDrainSummary.rootQueueSelectionPressure.byReason[reason].includes(assignment.jobId));
  }
}
assert.ok(promoteDrainWork.promotedWork.some((entry) => (
  entry.jobId === regionBundleA.jobId
  && entry.parentQueueId === 'root'
  && entry.leaseId === drainPromoteLease.id
  && entry.leaseScope === drainPromoteLease.leaseScope
  && entry.queueItemIds.join('\n') === regionBundleA.queueItemIds.join('\n')
)));

const terminalDrainWork = createSwarmCoordinatorAgentDrainWork({ queue: terminalQueue, generatedAt: 7590 });
assert.strictEqual(terminalDrainWork.summary.terminalCount, 4);
assert.strictEqual(terminalDrainWork.summary.escalatedCount, 1);
assert.strictEqual(terminalDrainWork.summary.rerunCount, 1);
assert.strictEqual(terminalDrainWork.summary.rejectedCount, 1);
assert.strictEqual(terminalDrainWork.summary.recordedCount, 1);
assert.strictEqual(terminalDrainWork.summary.blockedCount, 1);
assert.strictEqual(terminalDrainWork.summary.nonTerminalCount, 1);
assert.deepStrictEqual(terminalDrainWork.activeAssignments.map((assignment) => assignment.jobId), [terminalBundleCoordinatorReview.jobId]);
const terminalDrainSummary = summarizeSwarmCoordinatorAgentDrainWork(terminalDrainWork);
const terminalDrainRootLease = terminalDrainWork.leases.find((lease) => lease.scopeKind === 'root');
const terminalDrainPromotedWork = terminalDrainWork.promotedWork.find((entry) => entry.jobId === terminalBundleCoordinatorReview.jobId);
assert.ok(terminalDrainRootLease);
assert.ok(terminalDrainPromotedWork);
assert.notStrictEqual(terminalDrainPromotedWork.parentQueueId, terminalDrainRootLease.queueId);
assert.deepStrictEqual(terminalDrainSummary, {
  leaseCount: terminalDrainWork.leases.length,
  assignmentCount: 5,
  activeAssignmentCount: 1,
  terminalCount: 4,
  promotedWorkCount: 1,
  blockerCount: 1,
  queueItemCount: 5,
  activeQueueItemCount: 1,
  terminalQueueItemCount: 4,
  promotedQueueItemCount: 1,
  blockerQueueItemCount: 1,
  admissionPressure: {
    applyLocalCount: 0,
    applyLocalQueueItemCount: 0,
    queueLocalCount: 0,
    queueLocalQueueItemCount: 0,
    promoteUpwardCount: 1,
    promoteUpwardQueueItemCount: 1,
    rerunCount: 1,
    rerunQueueItemCount: 1,
    rejectedCount: 1,
    rejectedQueueItemCount: 1,
    recordOnlyCount: 1,
    recordOnlyQueueItemCount: 1,
    trueBlockCount: 1,
    trueBlockQueueItemCount: 1
  },
  rootQueueSelectionPressure: {
    rootQueueId: 'root',
    leaseId: terminalDrainRootLease.id,
    leaseScope: terminalDrainRootLease.leaseScope,
    promotedWorkCount: 0,
    promotedQueueItemCount: 0,
    promotedJobIds: [],
    promotedQueueItemIds: [],
    bySourceQueueId: {},
    byReason: {},
    admissionPressure: {
      applyLocalCount: 0,
      applyLocalQueueItemCount: 0,
      queueLocalCount: 0,
      queueLocalQueueItemCount: 0,
      promoteUpwardCount: 0,
      promoteUpwardQueueItemCount: 0,
      rerunCount: 0,
      rerunQueueItemCount: 0,
      rejectedCount: 0,
      rejectedQueueItemCount: 0,
      recordOnlyCount: 0,
      recordOnlyQueueItemCount: 0,
      trueBlockCount: 0,
      trueBlockQueueItemCount: 0
    }
  }
});
assert.strictEqual(terminalDrainWork.summary.activeAssignmentCount, terminalDrainSummary.activeAssignmentCount);
assert.strictEqual(terminalDrainWork.summary.blockerCount, terminalDrainSummary.blockerCount);
assert.strictEqual(terminalDrainWork.summary.blockerQueueItemCount, terminalDrainSummary.blockerQueueItemCount);
assert.deepStrictEqual(terminalDrainWork.summary.admissionPressure, terminalDrainSummary.admissionPressure);
assert.deepStrictEqual(terminalDrainWork.summary.rootQueueSelectionPressure, terminalDrainSummary.rootQueueSelectionPressure);
assert.deepStrictEqual(
  summarizeSwarmCoordinatorAgentDrainWork(JSON.parse(JSON.stringify(terminalDrainWork))),
  terminalDrainSummary
);
const drainRerun = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleStale.jobId);
const drainReject = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleRejected.jobId);
const drainRecordOnly = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleDiscovery.jobId);
const drainBlock = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleBlocked.jobId);
assert.deepStrictEqual(
  [drainRerun.decision, drainReject.decision, drainRecordOnly.decision, drainBlock.decision],
  ['rerun', 'rejected', 'recorded', 'blocked']
);
assert.ok([drainRerun, drainReject, drainRecordOnly, drainBlock].every((assignment) => assignment.classification === 'terminal' && assignment.terminal === true));
assert.strictEqual(drainBlock.assignedAction, 'block');
assert.ok(drainBlock.reasons.includes('true-blocker'));
assert.deepStrictEqual(terminalDrainWork.blockers.map((decision) => decision.jobId), [terminalBundleBlocked.jobId]);
assert.strictEqual(terminalDrainWork.blockers[0].leaseScope, drainBlock.leaseScope);
assert.deepStrictEqual(terminalDrainWork.byDecision.blocked, [terminalBundleBlocked.jobId]);
const drainCoordinatorReview = terminalDrainWork.assignments.find((assignment) => assignment.jobId === terminalBundleCoordinatorReview.jobId);
assert.strictEqual(drainCoordinatorReview.assignedAction, 'promote');
assert.strictEqual(drainCoordinatorReview.decision, 'escalated');
assert.strictEqual(drainCoordinatorReview.classification, 'non-terminal');
assert.strictEqual(drainCoordinatorReview.terminal, false);

assert.strictEqual(
  classifySwarmQueueOutcome({ decision: 'escalated', disposition: 'needs-port', reasons: ['needs-human-port'] }).category,
  'coordinator-review'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ decision: 'blocked', reasons: ['true-blocker'] }).category,
  'human-blocked'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ decision: 'human-question', reasons: ['needs-human-answer'] }).category,
  'human-blocked'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ decision: 'human-question', reasons: ['needs-human-answer'] }).outcome,
  'human-question'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ outcome: 'no-change', reasons: ['no-op'] }).category,
  'terminal'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ outcome: 'no-change', reasons: ['no-op'] }).outcome,
  'no-change'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ decision: 'rerun', reasons: ['stale-against-head'] }).category,
  'stale-rerun'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ decision: 'rerun', reasons: ['stale-against-head'] }).outcome,
  'rerun'
);
assert.deepStrictEqual(
  [
    classifySwarmQueueOutcome({ category: 'terminal', outcome: 'applied', terminal: true }).outcome,
    classifySwarmQueueOutcome({ category: 'terminal', outcome: 'committed', terminal: true }).outcome,
    classifySwarmQueueOutcome({ category: 'terminal', outcome: 'superseded', terminal: true }).outcome,
    classifySwarmQueueOutcome({ category: 'terminal', outcome: 'no-change', terminal: true }).outcome
  ],
  ['applied', 'committed', 'superseded', 'no-change']
);
assert.strictEqual(
  classifySwarmQueueOutcome({ decision: 'queued', reasons: ['conflicting-changes'], conflictingJobIds: ['other-job'] }).category,
  'conflict'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ decision: 'queued', reasons: ['conflicting-changes'], conflictingJobIds: ['other-job'] }).outcome,
  'conflict-blocked'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ decision: 'blocked', reasons: ['human-question'] }).outcome,
  'human-question'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ category: 'conflict', outcome: 'conflict', reasons: ['conflicting-changes'], conflictingJobIds: ['other-job'] }).outcome,
  'conflict-blocked'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ category: 'conflict', outcome: 'merge-conflict', reasons: ['conflicting-changes'], conflictingJobIds: ['other-job'] }).outcome,
  'conflict-blocked'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ category: 'human-blocked', outcome: 'blocked', reasons: ['human-question'] }).outcome,
  'human-question'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ category: 'human-blocked', outcome: 'human-blocked', reasons: ['human-question'] }).outcome,
  'human-question'
);
assert.strictEqual(
  classifySwarmQueueOutcome({ category: 'stale-rerun', outcome: 'stale-rerun', reasons: ['stale-against-head'] }).outcome,
  'rerun'
);
assert.strictEqual(
  classifySwarmQueueOutcome({
    action: 'queue-local',
    decision: 'queued',
    conflictingJobIds: ['other-job'],
    reasons: ['same-lease-scope-conflict']
  }).category,
  'continuation'
);

const normalizedTerminalOutcomes = [
  normalizeSwarmTerminalOutcome('applied'),
  normalizeSwarmTerminalOutcome('committed'),
  normalizeSwarmTerminalOutcome('superseded'),
  normalizeSwarmTerminalOutcome({ label: 'evidence only' }),
  normalizeSwarmTerminalOutcome({ status: 'no change' }),
  normalizeSwarmTerminalOutcome({ generatedByCollector: true }),
  normalizeSwarmTerminalOutcome({ status: 'patch missing' }),
  normalizeSwarmTerminalOutcome({ outcome: 'bundle missing' }),
  normalizeSwarmTerminalOutcome({ decision: 'rerun' }),
  normalizeSwarmTerminalOutcome({ outcome: 'rejected' }),
  normalizeSwarmTerminalOutcome({ label: 'conflict blocked' }),
  normalizeSwarmTerminalOutcome({ decision: 'human-question' }),
  normalizeSwarmTerminalOutcome({ status: 'human blocked' }),
  normalizeSwarmTerminalOutcome({ decision: 'coordinator review' })
];
assert.deepStrictEqual(normalizedTerminalOutcomes.map((outcome) => outcome.label), [
  'applied',
  'committed',
  'superseded',
  'evidence-only',
  'no-change',
  'generated-by-collector',
  'patch-missing',
  'bundle-missing',
  'rerun',
  'rejected',
  'conflict-blocked',
  'human-question',
  'human-question',
  'coordinator-review'
]);
assert.deepStrictEqual(normalizedTerminalOutcomes.map((outcome) => outcome.success), [
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
]);
assert.strictEqual(FRONTIER_SWARM_TERMINAL_OUTCOME_LABELS.includes('superseded'), true);
assert.strictEqual(normalizeSwarmTerminalOutcome({ decision: 'human-question' }).category, 'blocked');
assert.strictEqual(normalizeSwarmTerminalOutcome({ status: 'human blocked' }).label, 'human-question');
assert.strictEqual(normalizeSwarmTerminalOutcome({ status: 'patch missing' }).incomplete, true);
assert.strictEqual(normalizeSwarmTerminalOutcome({ outcome: 'bundle missing' }).incomplete, true);
assert.strictEqual(normalizeSwarmTerminalOutcome({ status: 'patch missing' }).blocker, false);
assert.strictEqual(normalizeSwarmTerminalOutcome({ outcome: 'bundle missing' }).blocker, false);

const terminalOutcomeModel = createSwarmQueueOutcomeModel({ drainWork: terminalDrainWork, generatedAt: 7600 });
assert.strictEqual(terminalOutcomeModel.kind, FRONTIER_SWARM_QUEUE_OUTCOME_MODEL_KIND);
assert.strictEqual(terminalOutcomeModel.summary.terminalCount, 2);
assert.strictEqual(terminalOutcomeModel.summary.coordinatorReviewCount, 1);
assert.strictEqual(terminalOutcomeModel.summary.humanBlockedCount, 1);
assert.strictEqual(terminalOutcomeModel.summary.staleRerunCount, 1);
assert.strictEqual(terminalOutcomeModel.summary.visibleReviewDebtCount, 1);
assert.strictEqual(terminalOutcomeModel.visibleHumanBlockers[0].jobId, terminalBundleBlocked.jobId);
assert.strictEqual(terminalOutcomeModel.visibleReruns[0].jobId, terminalBundleStale.jobId);
assert.strictEqual(terminalOutcomeModel.visibleReviewDebt[0].jobId, terminalBundleCoordinatorReview.jobId);

const queueAliasCollapse = collapseSwarmQueueOutcomeDecisions([
  createSwarmQueueOutcomeDecision({
    id: 'old-review-queue',
    jobId: 'job-review-old',
    taskId: 'task-review',
    queueItemIds: ['queue-review'],
    decision: 'escalated',
    reasons: ['coordinator-queue-required'],
    generatedAt: 1
  }),
  createSwarmQueueOutcomeDecision({
    id: 'old-rerun-queue',
    subjectId: 'task-review',
    decision: 'rerun',
    reasons: ['stale-against-head'],
    generatedAt: 2
  }),
  createSwarmQueueOutcomeDecision({
    id: 'new-applied-queue',
    queueItemIds: ['queue-review'],
    decision: 'applied',
    generatedAt: 3
  }),
  createSwarmQueueOutcomeDecision({
    id: 'old-conflict-task',
    taskId: 'task-conflict',
    queueItemIds: ['queue-conflict'],
    decision: 'escalated',
    reasons: ['conflicting-changes'],
    conflictingJobIds: ['other-job'],
    generatedAt: 1
  }),
  createSwarmQueueOutcomeDecision({
    id: 'new-rejected-task',
    taskId: 'task-conflict',
    decision: 'rejected',
    generatedAt: 4
  }),
  createSwarmQueueOutcomeDecision({
    id: 'old-review-job',
    jobId: 'job-direct',
    decision: 'escalated',
    reasons: ['needs-port'],
    generatedAt: 1
  }),
  createSwarmQueueOutcomeDecision({
    id: 'new-committed-job',
    subjectId: 'job-direct',
    category: 'terminal',
    outcome: 'committed',
    generatedAt: 5
  })
]);
assert.strictEqual(queueAliasCollapse.summary.subjectCount, 3);
assert.strictEqual(queueAliasCollapse.summary.latestDecisionCount, 3);
assert.strictEqual(queueAliasCollapse.summary.supersededDecisionCount, 4);
assert.strictEqual(queueAliasCollapse.summary.terminalCount, 3);
assert.strictEqual(queueAliasCollapse.summary.visibleReviewDebtCount, 0);
assert.strictEqual(queueAliasCollapse.summary.visibleRerunCount, 0);
assert.strictEqual(queueAliasCollapse.summary.visibleConflictCount, 0);
assert.deepStrictEqual(
  queueAliasCollapse.latestDecisions.map((decision) => decision.id).sort(),
  ['new-applied-queue', 'new-committed-job', 'new-rejected-task']
);
assert.strictEqual(queueAliasCollapse.subjectIdByAlias['task-review'], 'queue-review');
assert.strictEqual(queueAliasCollapse.subjectIdByAlias['job-review-old'], 'queue-review');
assert.strictEqual(queueAliasCollapse.latestDecisionIdByAlias['task-review'], 'new-applied-queue');
assert.strictEqual(queueAliasCollapse.latestDecisionIdByAlias['job-review-old'], 'new-applied-queue');
assert.strictEqual(queueAliasCollapse.latestDecisionIdByAlias['queue-review'], 'new-applied-queue');
assert.strictEqual(queueAliasCollapse.subjectIdByAlias['task-conflict'], 'queue-conflict');
assert.strictEqual(queueAliasCollapse.latestDecisionIdByAlias['queue-conflict'], 'new-rejected-task');
assert.strictEqual(queueAliasCollapse.latestDecisionIdByAlias['task-conflict'], 'new-rejected-task');
assert.strictEqual(queueAliasCollapse.subjectIdByAlias['job-direct'], 'job-direct');
assert.strictEqual(queueAliasCollapse.latestDecisionIdByAlias['job-direct'], 'new-committed-job');

const sameRunTerminalReconciliation = reconcileSwarmTerminalState({
  collections: {
    ready: [
      { id: 'same-ready', jobId: 'job-same', taskId: 'task-same', queueItemIds: ['queue-same'] },
      { id: 'same-superseded-review', jobId: 'job-superseded', taskId: 'task-superseded' }
    ],
    review: [
      { id: 'same-review', jobId: 'job-same', taskId: 'task-same', queueItemIds: ['queue-same'] }
    ]
  },
  decisions: [
    { id: 'same-applied', jobId: 'job-same', taskId: 'task-same', queueItemIds: ['queue-same'], decision: 'applied', generatedAt: 10 },
    { id: 'same-superseded', jobId: 'job-superseded', taskId: 'task-superseded', decision: 'superseded', generatedAt: 11 }
  ],
  generatedAt: 12
});
assert.strictEqual(sameRunTerminalReconciliation.kind, FRONTIER_SWARM_TERMINAL_STATE_RECONCILIATION_KIND);
assert.strictEqual(sameRunTerminalReconciliation.summary.inputItemCount, 3);
assert.strictEqual(sameRunTerminalReconciliation.summary.collapsedItemCount, 3);
assert.strictEqual(sameRunTerminalReconciliation.summary.resolvedCount, 2);
assert.strictEqual(sameRunTerminalReconciliation.summary.terminalCount, 2);
assert.strictEqual(sameRunTerminalReconciliation.summary.activeItemCount, 0);
assert.strictEqual(sameRunTerminalReconciliation.summary.failedWorkerOutputCount, 0);
assert.strictEqual(sameRunTerminalReconciliation.collections.ready?.length ?? 0, 0);
assert.strictEqual(sameRunTerminalReconciliation.collections.review?.length ?? 0, 0);
assert.deepStrictEqual(
  sameRunTerminalReconciliation.resolved.map((resolution) => resolution.decisionId).sort(),
  ['same-applied', 'same-superseded']
);
assert.strictEqual(sameRunTerminalReconciliation.resolved.find((resolution) => resolution.decisionId === 'same-applied').sourceItemIds.length, 2);
assert.strictEqual(sameRunTerminalReconciliation.collections.done.length, 2);

const redrainTerminalReconciliation = reconcileSwarmTerminalState({
  collections: {
    failed: [
      { id: 'redrain-stale-failed-item', jobId: 'job-redrain-old', taskId: 'task-redrain', queueItemIds: ['queue-redrain'], status: 'failed' }
    ]
  },
  decisions: [
    {
      id: 'old-stale-failed-decision',
      jobId: 'job-redrain-old',
      taskId: 'task-redrain',
      queueItemIds: ['queue-redrain'],
      decision: 'rerun',
      status: 'failed',
      reasons: ['stale-against-head'],
      generatedAt: 20
    },
    {
      id: 'new-committed-redrain',
      jobId: 'job-redrain-new',
      taskId: 'task-redrain',
      queueItemIds: ['queue-redrain'],
      decision: 'committed',
      generatedAt: 30
    }
  ],
  generatedAt: 31
});
assert.strictEqual(redrainTerminalReconciliation.summary.inputItemCount, 1);
assert.strictEqual(redrainTerminalReconciliation.summary.supersededDecisionCount, 1);
assert.strictEqual(redrainTerminalReconciliation.summary.collapsedItemCount, 1);
assert.strictEqual(redrainTerminalReconciliation.summary.resolvedCount, 1);
assert.strictEqual(redrainTerminalReconciliation.summary.terminalUnresolvedCount, 0);
assert.strictEqual(redrainTerminalReconciliation.summary.failedWorkerOutputCount, 0);
assert.strictEqual(redrainTerminalReconciliation.collections.failed?.length ?? 0, 0);
assert.strictEqual(redrainTerminalReconciliation.collections.done.length, 1);
assert.strictEqual(redrainTerminalReconciliation.resolved[0].decisionId, 'new-committed-redrain');
assert.strictEqual(redrainTerminalReconciliation.latestDecisionIdByAlias['job-redrain-old'], 'new-committed-redrain');
assert.strictEqual(redrainTerminalReconciliation.latestDecisionIdByAlias['queue-redrain'], 'new-committed-redrain');

const noChangeTerminalReconciliation = reconcileSwarmTerminalState({
  collections: {
    ready: [
      { id: 'no-change-ready-item', jobId: 'job-no-change', taskId: 'task-no-change', queueItemIds: ['queue-no-change'] }
    ]
  },
  decisions: [
    { id: 'no-change-decision', jobId: 'job-no-change', taskId: 'task-no-change', queueItemIds: ['queue-no-change'], decision: 'no-change', generatedAt: 35 }
  ],
  generatedAt: 36
});
assert.strictEqual(noChangeTerminalReconciliation.summary.resolvedCount, 1);
assert.strictEqual(noChangeTerminalReconciliation.summary.terminalUnresolvedCount, 0);
assert.strictEqual(noChangeTerminalReconciliation.collections.done.length, 1);
assert.strictEqual(noChangeTerminalReconciliation.resolved[0].decisionOutcome, 'no-change');

const continuationNoChangeTerminalReconciliation = reconcileSwarmTerminalState({
  collections: {
    ready: [
      { id: 'continuation-no-change-ready-item', jobId: 'job-continuation-no-change', taskId: 'task-continuation-no-change', queueItemIds: ['queue-continuation-no-change'] }
    ]
  },
  decisions: [
    {
      id: 'continuation-no-change-decision',
      jobId: 'job-continuation-no-change',
      taskId: 'task-continuation-no-change',
      queueItemIds: ['queue-continuation-no-change'],
      category: 'continuation',
      outcome: 'no-change',
      generatedAt: 37
    }
  ],
  generatedAt: 38
});
assert.strictEqual(continuationNoChangeTerminalReconciliation.summary.resolvedCount, 1);
assert.strictEqual(continuationNoChangeTerminalReconciliation.summary.terminalUnresolvedCount, 0);
assert.strictEqual(continuationNoChangeTerminalReconciliation.collections.done.length, 1);
assert.strictEqual(continuationNoChangeTerminalReconciliation.resolved[0].decisionOutcome, 'no-change');

const visibleTerminalReconciliation = reconcileSwarmTerminalState({
  collections: {
    failed: [
      { id: 'rejected-failed-item', jobId: 'job-rejected', taskId: 'task-rejected', status: 'failed' },
      { id: 'rerun-failed-item', jobId: 'job-rerun', taskId: 'task-rerun', status: 'failed' },
      { id: 'conflict-failed-item', jobId: 'job-conflict', taskId: 'task-conflict', status: 'failed' },
      { id: 'question-failed-item', jobId: 'job-question', taskId: 'task-question', status: 'failed' }
    ]
  },
  decisions: [
    { id: 'new-rejected-visible', jobId: 'job-rejected', taskId: 'task-rejected', decision: 'rejected', generatedAt: 40 },
    { id: 'new-rerun-visible', jobId: 'job-rerun', taskId: 'task-rerun', decision: 'rerun', reasons: ['stale-against-head'], generatedAt: 41 },
    { id: 'new-conflict-visible', jobId: 'job-conflict', taskId: 'task-conflict', decision: 'queued', conflictingJobIds: ['other-job'], reasons: ['conflicting-changes'], generatedAt: 42 },
    { id: 'new-question-visible', jobId: 'job-question', taskId: 'task-question', decision: 'blocked', reasons: ['human-question'], generatedAt: 43 }
  ],
  generatedAt: 44
});
assert.strictEqual(visibleTerminalReconciliation.summary.inputItemCount, 4);
assert.strictEqual(visibleTerminalReconciliation.summary.collapsedItemCount, 4);
assert.strictEqual(visibleTerminalReconciliation.summary.resolvedCount, 0);
assert.strictEqual(visibleTerminalReconciliation.summary.terminalUnresolvedCount, 4);
assert.strictEqual(visibleTerminalReconciliation.summary.failedWorkerOutputCount, 0);
assert.strictEqual(visibleTerminalReconciliation.collections.failed?.length ?? 0, 0);
assert.strictEqual(visibleTerminalReconciliation.collections.terminal.length, 4);
assert.deepStrictEqual(
  visibleTerminalReconciliation.terminalUnresolved.map((resolution) => resolution.decisionId).sort(),
  ['new-conflict-visible', 'new-question-visible', 'new-rejected-visible', 'new-rerun-visible']
);
assert.strictEqual(
  visibleTerminalReconciliation.terminalUnresolved.find((resolution) => resolution.decisionId === 'new-question-visible').decisionOutcome,
  'human-question'
);

const decomposed = decomposeSwarmFeature({
  featureId: 'feature-x',
  objective: 'Implement feature x',
  lanes: ['runtime', 'harness'],
  files: ['src/runtime/action.ts', 'test/harness.mjs'],
  reviewers: ['reviewer-a'],
  checks: [{ command: 'npm', args: ['test'] }]
});
assert.strictEqual(decomposed.length, 2);
assert.ok(decomposed[0].verification?.length);

const replayBundle = createSwarmReplayBundle({
  id: 'replay-api-divergence',
  subject: 'library-port',
  commands: [{ name: 'replay', command: 'node', args: ['replay.mjs'] }],
  inputs: [{ path: 'fixtures/request.json', kind: 'fixture' }],
  artifacts: [{ path: 'agent-runs/replay/trace.jsonl', kind: 'trace' }],
  sourceRefs: ['legacy/runtime.js'],
  seeds: ['case-42'],
  expectedEvidence: ['trace.jsonl'],
  generatedAt: 7200
});
assert.strictEqual(replayBundle.summary.commandCount, 1);
assert.strictEqual(replayBundle.seeds[0].kind, 'seed');

const parityOracle = createSwarmParityOracle({
  id: 'parity-library-port',
  subject: 'library-port',
  referenceCommands: ['node legacy.mjs'],
  testCommands: ['node candidate.mjs'],
  comparators: [
    { id: 'state-match', status: 'failed', expected: { ok: true }, actual: { ok: false }, path: '/ok', operationIndex: 42 }
  ],
  replayBundleIds: [replayBundle.id],
  generatedAt: 7300
});
assert.strictEqual(parityOracle.status, 'failed');
assert.strictEqual(parityOracle.summary.failedCount, 1);

const divergenceReport = createSwarmDivergenceReport({
  id: 'divergence-state',
  subject: 'library-port',
  observabilityPoints: [
    { id: 'point-late', operationIndex: 50, path: '/ok', after: false },
    { id: 'point-early', operationIndex: 42, path: '/ok', before: true, after: false }
  ],
  expected: true,
  actual: false,
  traceRefs: [{ path: 'agent-runs/replay/trace.jsonl' }],
  replayBundleIds: [replayBundle.id],
  generatedAt: 7400
});
assert.strictEqual(divergenceReport.operationIndex, 42);
assert.strictEqual(divergenceReport.divergesAt, '/ok');

const watchpointPlan = createSwarmWatchpointPlan({
  subject: 'library-port',
  watchpoints: [{ path: '/ok', operator: 'changes', action: 'break' }],
  commands: ['node inspect.mjs'],
  replayBundleIds: [replayBundle.id],
  divergenceReportIds: [divergenceReport.id],
  generatedAt: 7500
});
assert.strictEqual(watchpointPlan.watchpoints[0].action, 'break');

const debugHandoff = createSwarmDebugHandoff({
  subject: 'library-port',
  focus: divergenceReport.observabilityPoints[0],
  replayBundleIds: [replayBundle.id],
  divergenceReportIds: [divergenceReport.id],
  watchpointPlanIds: [watchpointPlan.id],
  files: [{ path: 'src/runtime.ts', kind: 'source' }],
  comparisons: parityOracle.comparators,
  generatedAt: 7600
});
assert.strictEqual(debugHandoff.status, 'ready');
assert.strictEqual(debugHandoff.comparisons[0].path, '/ok');

const instrumentationBudget = createSwarmInstrumentationBudget({
  id: 'browser-evidence-budget',
  lane: 'harness',
  maxEvents: 10,
  maxBytes: 1024,
  maxOverheadRatio: 0.2,
  captureKinds: ['trace', 'log'],
  generatedAt: 7700
});
assert.strictEqual(checkSwarmInstrumentationBudget(instrumentationBudget, { events: 11, captureKinds: ['trace'] }).ok, false);

const bottleneckReport = createSwarmBottleneckReport({
  sources: [{
    jobId: 'debug-job',
    text: 'trace logging overhead made the harness slow',
    evidencePaths: ['agent-runs/debug/evidence.json'],
    changedPaths: ['src/runtime.ts']
  }],
  generatedAt: 7800
});
assert.strictEqual(bottleneckReport.classifications[0].kind, 'instrumentation-overhead');

const evidenceRun = createSwarmRun({
  plan,
  results: [{
    jobId: plan.jobs[0].id,
    status: 'verified',
    evidencePaths: ['agent-runs/runtime/evidence.json', 'agent-runs/runtime/trace.jsonl'],
    queueItemIds: ['runtime-action-parity']
  }]
});
const evidenceIndex = createSwarmEvidenceIndex({
  run: evidenceRun,
  entries: [{ topic: 'apu-port-timing', path: 'agent-runs/runtime/notes.md', tags: ['timing'], confidence: 0.9 }],
  generatedAt: 7900
});
assert.strictEqual(querySwarmEvidenceIndex(evidenceIndex, { pathIncludes: 'trace' }).summary.entryCount, 1);
assert.strictEqual(querySwarmEvidenceIndex(evidenceIndex, { topic: 'apu-port-timing', minConfidence: 0.8 }).summary.entryCount, 1);

const blackboard = createSwarmBlackboard({
  runId: evidenceRun.id,
  entries: [
    { kind: 'fact', topic: 'known-divergence', text: 'candidate diverges at operation 42', sourceIds: [divergenceReport.id], tags: ['timing'] },
    { kind: 'ownership', topic: 'active-lease', text: 'runtime owns src/runtime.ts', owner: 'runtime-worker', paths: ['src/runtime.ts'] }
  ],
  generatedAt: 8000
});
assert.strictEqual(querySwarmBlackboard(blackboard, { kind: 'fact', tag: 'timing' }).summary.entryCount, 1);
assert.strictEqual(querySwarmBlackboard(blackboard, { owner: 'runtime-worker' }).entries[0].topic, 'active-lease');

const referencePlan = createSwarmReferenceOraclePlan({
  serviceId: 'library-parity',
  subject: 'parser-port',
  fixtureId: 'logged-in-user',
  targets: [
    { id: 'legacy', role: 'reference', command: 'node legacy.mjs' },
    { id: 'candidate', role: 'port', command: { command: 'node', args: ['candidate.mjs'] } }
  ],
  watchpoints: [{ path: '/result', operator: 'changes' }],
  artifactKinds: ['trace'],
  generatedAt: 8100
});
assert.strictEqual(referencePlan.targets[1].command.args[0], 'candidate.mjs');
const referenceResponse = createSwarmReferenceOracleResponse({
  planId: referencePlan.id,
  targetResults: [{ targetId: 'candidate', status: 'failed', artifacts: [{ path: 'candidate.trace.jsonl' }] }],
  divergence: { expected: 'legacy', actual: 'candidate', operationIndex: 7 },
  generatedAt: 8200
});
assert.strictEqual(referenceResponse.status, 'failed');

const routingPlan = createSwarmArtifactRoutingPlan({
  bundles: [regionBundleA],
  artifacts: [{ path: 'agent-runs/debug/changes.patch', kind: 'patch' }],
  hints: [{ artifactKind: 'json', bucket: 'discovery-only', reason: 'status artifact' }],
  generatedAt: 8300
});
assert.ok(routingPlan.summary.routeCount >= 1);
assert.ok(routingPlan.byBucket['ready-to-apply'].includes('agent-runs/debug/changes.patch'));

const resourcePlan = createSwarmPlan(manifest, [
  { id: 'browser-a', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] },
  { id: 'browser-b', lane: 'harness', targetRefs: ['inkwell/e2e.mjs'] }
], { maxReadyJobs: 4, resourceQuotas: { browser: 1, 'browser-port': 1 } });
const resourceSchedule = createSwarmSchedule(resourcePlan);
assert.strictEqual(resourceSchedule.ready.length, 1);
assert.ok(resourceSchedule.blocked[0].reasons.includes('resource-capacity:browser'));
const schedulerRecommendations = createSwarmSchedulerRecommendations({ schedule: resourceSchedule, generatedAt: 8400 });
assert.ok(schedulerRecommendations.recommendations.some((entry) => entry.reason === 'resource-capacity:browser'));

const fixtureCatalog = createSwarmFixtureCatalog({
  fixtures: [
    { id: 'logged-in-creator', state: { user: 'creator' }, tags: ['auth', 'creator'], setupCommands: ['node fixture.mjs'] },
    { id: 'admin-user', tags: ['auth', 'admin'] }
  ],
  generatedAt: 8500
});
assert.deepStrictEqual([...fixtureCatalog.byTag.auth].sort(), ['logged-in-creator', 'admin-user'].sort());

const progressModel = createSwarmProgressModel({
  items: [
    { id: 'route-home', surface: 'route', status: 'implemented' },
    { id: 'route-home-parity', surface: 'route', status: 'functional-verified', evidencePaths: ['evidence.json'] },
    { id: 'route-home-accepted', surface: 'route', status: 'accepted' }
  ],
  generatedAt: 8600
});
assert.strictEqual(progressModel.summary.acceptedCount, 1);

const autoReview = createSwarmAutoReviewReport({
  bundles: [createSwarmMergeBundle({
    job: plan.jobs[0],
    result: { jobId: plan.jobs[0].id, status: 'completed', changedPaths: ['src/runtime.ts'] }
  })],
  generatedAt: 8700
});
assert.ok(autoReview.findings.some((finding) => finding.kind === 'missing-evidence'));

const rebaseReport = createSwarmRebaseReport({ mergeIndex: pathFallbackIndex, currentHead: 'HEAD', generatedAt: 8800 });
assert.ok(rebaseReport.summary.conflictCount >= 1);

const usageGovernor = createSwarmUsageGovernor({
  maxWorkers: 20,
  maxTokensByLane: { browser: 1000 },
  maxCostUsd: 5,
  retryBudget: 2,
  generatedAt: 8900
});
const usageDecision = checkSwarmUsageGovernor(usageGovernor, { activeWorkers: 21, tokensByLane: { browser: 2000 }, retriesUsed: 1 });
assert.strictEqual(usageDecision.ok, false);
assert.strictEqual(usageDecision.preferStatic, true);
