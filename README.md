# @shapeshift-labs/frontier-swarm

Hierarchical swarm plans, lanes, compute profiles, ownership policy, events, and proofs for Frontier agent work.

`frontier-swarm` turns parallel agent work into data: manifests, parent/child swarm layers, compute profiles, model-route recommendations, lane ownership, task queues, dry-run plans, event streams, changed-path checks, job results, and proof hashes. It does not spawn processes, create git worktrees, call Codex, or talk to queue brokers. Runners attach through structural adapters such as `@shapeshift-labs/frontier-swarm-codex`.

Verification gate metadata stays plain JSON. `mergeSwarmMetadata(...)` preserves `metadata.verificationGates` across task normalization, queue jobs, merge bundles, merge indexes, and coordinator drain assignments, and package-scoped gate descriptors can carry `metadata.packageId`, `metadata.packagePath`, and `metadata.packageName` without pulling in Codex-specific runtime code.

## Package Contract Skew 08

Keep aggregate package changes and standalone main remotes on the same catalog snapshot. The safe publish-main sequence is:

1. land the aggregate package change first,
2. regenerate the package-family README content from the shared catalog instead of copying older monolithic or split-package prose,
3. run the package-local gate for the changed surface,
4. push the standalone `main` remote only after the generated docs and the package gate agree with the aggregate branch,
5. if a standalone remote still shows stale package-layout wording, refresh it from the catalog-backed source rather than preserving the drift.

This prevents later publish-only patches from reintroducing stale monolithic/split package drift.

## Semantic Ownership Keys

Semantic ownership regions use stable, repo-agnostic key prefixes. The package exports the canonical prefixes as `FRONTIER_SWARM_SEMANTIC_OWNERSHIP_KEYS` and also exposes `createSwarmSemanticOwnershipKey(...)` for composing region selectors.

- `export` for exported symbols,
- `type` for type declarations,
- `cli-command` for CLI command surfaces,
- `docs-section` for documentation headings,
- `fixture-family` for fixture groups,
- `test-case` for test case ownership.

Backlog-oriented adapters can use `createSwarmBacklog(...)`, `mergeSwarmBacklogs(...)`, `querySwarmBacklog(...)`, and `createSwarmBacklogTaskPlan(...)` to normalize backlog entries, fold multiple backlog snapshots together, and derive runnable plus recursive decomposition task plans for continuation workflows.

## Priority Scheduling

Plans, schedules, and queue snapshots include `metadata.priorityPolicy` using the exported `FRONTIER_SWARM_REVIEW_PRIORITY_POLICY`. The policy puts coordinator-drain and review work in the top priority band, keeps speculative backlog in a lower band, and round-robins lanes inside each band before falling back to the task's numeric `priority`. Lane limits, compute limits, resource quotas, and `concurrencyKey` limits still gate readiness; the priority policy only changes candidate order.

## Continuous Pool State

`createSwarmContinuousPoolState()` models a runtime-neutral autonomous worker pool from active leases, queue snapshots, schedules, coordinator drain work, queue outcome decisions, and explicit work-item buckets. It reports active, queued, review-drain, rerun, human-blocked, conflicted, capacity-blocked, and done buckets, then derives refill slots and stop conditions from those buckets.

Refill recommendations fill idle capacity with coordinator drain and rerun work before queued implementation work, and speculative backlog is selected after standard queued work. A pool is only marked `drained` when active, queued, review-drain, rerun, human-blocked, conflicted, and capacity-blocked buckets are all empty. Remaining human-question, conflict, or capacity blockers produce explicit `human-blocked`, `conflicted`, or `capacity-blocked` stop conditions instead of being collapsed into done output.

## Hierarchical Merge Queues

`createSwarmHierarchicalMergeQueue()` turns a merge index plus optional admission budget into root, parent, child, lane, semantic-region, and path queues. Clean admitted work can be applied by the local queue, clean excess work stays queued locally, stale work is marked for rerun, failed evidence is rejected, discovery work is tracked as record-only but normalizes to no-change, true blockers stay blocked, and cross-scope or public-contract work is promoted upward. Same-scope conflicts stay local unless they need a broader decision. High-risk work stays local unless admission explicitly allows it.

Clean auto-mergeable work that spans multiple known semantic regions is returned as a `rerun` assignment with `retrySlices`, `semanticSliceScopeIds`, and `semanticSliceLeaseKeys`. Each retry slice carries its own required lease scope/key so runners can produce independently reviewable same-file slice bundles. If admission has already accepted a still-unsliced cross-scope patch, the `apply-local` assignment remains atomic and carries all `semanticSliceScopeIds` and `semanticSliceLeaseKeys` so runners can acquire every required semantic lease before applying it once. Same-region conflicts still serialize under one local lease, while unknown regions, public-contract regions, and parent-scope regions promote to the parent queue for a broader decision.

Queue and coordinator-drain assignments also expose `requiredLeaseScopeIds` and `requiredLeaseKeys`. For independent same-file semantic regions these required leases stay at the semantic-region level, allowing multiple coordinators to acquire different locks for the same changed file. For promoted work, including shared parent-scope edits, the required lease is the promotion target such as the lane or root queue, so conflicting changes serialize under a parent decision without relying on package-specific names. Root lease keys are always derived from the caller-supplied `rootScopeId`, so the default root scope uses `merge:root:root` and custom roots get matching queue-local keys.

Root lease keys are derived from the caller-supplied `rootScopeId`, so the queue model does not special-case any literal root identifier.

The queue model is generic. Runners can map scopes to any repository, package, feature, service, file, symbol, or semantic ownership region without baking project-specific package names into the core package.

`createSwarmSemanticOwnershipStableKey` and `createSwarmSemanticOwnershipRegionId` keep export, type, CLI command, docs section, fixture family, and test case ownership keys stable across discovery order and queue replay.
The canonical stable-key prefixes are `exported-declaration`, `type-declaration`, `cli-command`, `docs-section`, `fixture-family`, and `test-case`.
The generic `export` alias resolves to `exported-declaration`, so named, default, and explicit export ownership share one stable key family.
The exported `FRONTIER_SWARM_SEMANTIC_OWNERSHIP_STABLE_KEY_KINDS` table exposes those canonical labels under stable names for downstream adapters.

Caller-provided `scopes` are serialized as opaque queue scopes. Their `id`, `kind`, `leaseKey`, `changedPaths`, `changedRegions`, and `metadata` stay runner-owned, with `kind` defaulting to `custom`; callers can model root, parent, child, lane, semantic-region, and path scopes without changing the core queue logic.

`createSwarmHierarchicalMergeQueue()` also exposes a generic `scopeTree` summary with `scopeIdsByKind`, `ancestorScopeIdsByScopeId`, `childScopeIdsByScopeId`, and `leafScopeIds`. The tree is derived from the declared scope kinds and `parentId` links, so adapters can inspect root, parent, child, lane, semantic-region, and path scopes without assuming any Frontier-specific package, repo, or feature naming scheme.

Hierarchical queues also emit `leaseRecords` for root, parent, child, lane, semantic-region, path, and custom scopes. These records are generic agent merge-queue infrastructure: they carry the lease key, optional local leader metadata, active and terminal queue item IDs, conflict and retry reasons, parent-promotion state, and terminal decision links back to the queue items they close. Adapters can use those records to let independent semantic scopes make progress concurrently while same-scope work serializes under one lease.

Queue-local conflict decisions stay in the `continuation` bucket, so routine conflicts that are already contained within one scope do not get mislabeled as human review debt.

This keeps the root coordinator from becoming the only place where work can make progress. A child queue can apply verified work under its own lease, leave clean overflow in `queue-local`, and promote only the items that need a parent decision. Adapters such as `@shapeshift-labs/frontier-swarm-codex` can layer run, collect, Loom, auto-drain, rerun, reject, discovery, and blocker workflows on top of the generic queue data.

`createSwarmQueueOutcomeModel()` and `collapseSwarmQueueOutcomeDecisions()` provide a repo-agnostic outcome layer for autonomous merge queues. The model separates `terminal`, `continuation`, `coordinator-review`, `human-blocked`, `stale-rerun`, and `conflict` categories so "needs coordinator review" does not get reported as a true human blocker. Queue subjects are collapsed across `queueItemIds`, `taskId`, and `jobId` aliases, and only the latest decision for each subject contributes to visible review debt, blockers, reruns, and conflicts. This lets a newer committed/applied/checked/rejected decision close old review or rerun records without requiring runners to mutate historical queue files.

Queue decisions that resolve to conflict, stale rerun, checked completion, or human review normalize to explicit `conflict-blocked`, `rerun`, `checked`, and `human-question` terminal labels, while record-only and closed outcomes collapse to `no-change`, so queue items always have a concrete terminal outcome instead of falling through to an ambiguous internal state.

`normalizeSwarmTerminalOutcome()` keeps terminal labels explicit and stable across bundle, collector, and queue surfaces. It normalizes `applied`, `committed`, `checked`, `superseded`, `evidence-only`, `no-change`, and `generated-by-collector` as success states; `patch-missing` and `bundle-missing` as incomplete result states; and `rerun`, `rejected`, `conflict-blocked`, `human-question`, and `coordinator-review` as distinct terminal outcomes for downstream routing. `human-blocked` remains accepted as a legacy alias, while `coordinator-review` stays review-only and does not count as a human blocker.

`createSwarmTerminalOutcomeRecord()` exports a repository-generic final admission record for runners and coordinators. Its canonical statuses are `applied`, `rejected`, `superseded`, `no-change`, `conflict`, `human-needed`, `research-complete`, and `rerun`; reason codes are similarly generic (`accepted-by-admission`, `failed-verification`, `superseded-by-newer-output`, `no-effective-change`, `conflict-detected`, `human-decision-required`, `research-complete`, and `stale-rerun-required`). The record carries queue/task/job aliases, evidence refs, conflict peers, rerun and supersession links, and boolean routing flags without assuming Codex, git, package, or repository-specific fields.

`reconcileSwarmTerminalState()` adapts older runner bucket snapshots such as `ready`, `review`, `stale`, and `failed` to the newer autonomous decision ledger. A later committed, applied, superseded, or no-change decision for the same queue item, task, or job moves the subject into resolved `done` output instead of leaving it in review debt. Rejected, rerun, conflict-blocked, and human-question decisions remain visible in terminal output, and `human-blocked` stays as a compatibility alias, but they are not counted as ordinary failed worker results.


## Related Packages

The published Frontier package family is generated from one shared package catalog so READMEs stay in sync across packages:

- [`@shapeshift-labs/frontier`](https://www.npmjs.com/package/@shapeshift-labs/frontier): Core JSON diff/apply, compact patch tuples, JSON Pointer, equality, clone, validation, Unicode helpers, and tiny dependency-free runtime budget/scheduler primitives.
- [`@shapeshift-labs/frontier-query`](https://www.npmjs.com/package/@shapeshift-labs/frontier-query): Shared query-key, selector path, condition, entity identity, and table-shape primitives.
- [`@shapeshift-labs/frontier-codec`](https://www.npmjs.com/package/@shapeshift-labs/frontier-codec): Patch serialization, binary frames, canonical JSON, and patch-history codecs.
- [`@shapeshift-labs/frontier-engine`](https://www.npmjs.com/package/@shapeshift-labs/frontier-engine): Stateful planned diff engine, adaptive profiles, schema plans, and engine-level history helpers.
- [`@shapeshift-labs/frontier-state`](https://www.npmjs.com/package/@shapeshift-labs/frontier-state): Patch-routed app-state subscriptions, owned commits, maintained views, and path mapping.
- [`@shapeshift-labs/frontier-dataflow`](https://www.npmjs.com/package/@shapeshift-labs/frontier-dataflow): Serializable incremental dataflow and materialized-view graphs for Frontier apps, including selectors, dependency DAGs, filters, joins, aggregations, stale paths, recompute budgets, output patches, provenance records, and proof of why derived views changed.
- [`@shapeshift-labs/frontier-state-cache`](https://www.npmjs.com/package/@shapeshift-labs/frontier-state-cache): Normalized query-result cache with entity/query watchers, persistence, change logs, optimistic layers, scheduled persistence, and mutation bridge.
- [`@shapeshift-labs/frontier-state-cache-idb`](https://www.npmjs.com/package/@shapeshift-labs/frontier-state-cache-idb): IndexedDB persistence adapter for Frontier state-cache snapshots and durable change logs.
- [`@shapeshift-labs/frontier-state-cache-file`](https://www.npmjs.com/package/@shapeshift-labs/frontier-state-cache-file): Structured file persistence adapter for Frontier state-cache snapshots and change logs.
- [`@shapeshift-labs/frontier-state-cache-sql`](https://www.npmjs.com/package/@shapeshift-labs/frontier-state-cache-sql): SQL persistence adapter for Frontier state-cache snapshots and change logs.
- [`@shapeshift-labs/frontier-schema`](https://www.npmjs.com/package/@shapeshift-labs/frontier-schema): JSON Schema validation, Frontier profile generation, CloudEvent envelopes, and query/table schema helpers.
- [`@shapeshift-labs/frontier-migrations`](https://www.npmjs.com/package/@shapeshift-labs/frontier-migrations): Boundary-first data migrations, import normalization, plugin/API version mapping, versioned envelopes, graph diagnostics, patch path rewrites, dry-run reports, and current-shape rehydration.
- [`@shapeshift-labs/frontier-event-log`](https://www.npmjs.com/package/@shapeshift-labs/frontier-event-log): Bounded event logs, replay cursors, consumer acknowledgements, keyed compaction, checkpoints, and Frontier patch event records.
- [`@shapeshift-labs/frontier-run`](https://www.npmjs.com/package/@shapeshift-labs/frontier-run): Append-only distributed run graphs, causal event DAGs, evidence nodes, lanes, leases, refs, segments, dashboard projections, and admission decision records for Frontier agent work.
- [`@shapeshift-labs/frontier-inspect`](https://www.npmjs.com/package/@shapeshift-labs/frontier-inspect): Cross-package inspection/evidence bundles, registry graph snapshots, feature/resource impact reports, timeline/event normalization, redaction, JSONL import/export, and AI-readable app feature maps.
- [`@shapeshift-labs/frontier-scheduler`](https://www.npmjs.com/package/@shapeshift-labs/frontier-scheduler): Deterministic work scheduling, lanes, cancellation, backpressure, frame policies, replay snapshots, and work graphs.
- [`@shapeshift-labs/frontier-logging`](https://www.npmjs.com/package/@shapeshift-labs/frontier-logging): Opt-in structured logging, browser telemetry, scheduled sinks, file sinks, exporters, benchmark traces, and Frontier patch/update summaries.
- [`@shapeshift-labs/frontier-mutation`](https://www.npmjs.com/package/@shapeshift-labs/frontier-mutation): Explicit mutation and selector plans compiled to Frontier patches or CRDT operations.
- [`@shapeshift-labs/frontier-effects`](https://www.npmjs.com/package/@shapeshift-labs/frontier-effects): Serializable effect descriptors and resource graphs for Frontier apps, including fetch, storage, timers, navigation, workers, clipboard, broadcast, WebSocket, stream, policy metadata, runtime records, redaction, JSONL, proof helpers, and registry graph output.
- [`@shapeshift-labs/frontier-auth`](https://www.npmjs.com/package/@shapeshift-labs/frontier-auth): Frontier-native auth contracts for providers, sessions, profile completeness, route and resource gates, account-linking policy, token issue/verify plans, runtime grants, audit events, registry graphs, lint resources, and auth evidence without owning app secrets, crypto, storage, or provider SDKs.
- [`@shapeshift-labs/frontier-policy`](https://www.npmjs.com/package/@shapeshift-labs/frontier-policy): Serializable policy and capability decisions for Frontier apps, effects, views, sync, routes, traces, and AI tools.
- [`@shapeshift-labs/frontier-flags`](https://www.npmjs.com/package/@shapeshift-labs/frontier-flags): Patchable policy-aware feature flag state for Frontier apps, including targeting, deterministic rollouts, experiment variants, kill switches, exposure records, audit logs, and replay evidence.
- [`@shapeshift-labs/frontier-tools`](https://www.npmjs.com/package/@shapeshift-labs/frontier-tools): Serializable app action/tool manifests for AI-operable Frontier apps, including availability, validation, dry-run plans, patch previews, effect/tool constraints, execution records, rollback links, and registry graph output.
- [`@shapeshift-labs/frontier-sandbox`](https://www.npmjs.com/package/@shapeshift-labs/frontier-sandbox): Runtime-agnostic sandbox contracts for Frontier patch-producing actions, including manifests, declared reads/writes/capabilities, host-validated patch/effect/event/log results, dynamic source modules, source event replay, and structural runtime adapters.
- [`@shapeshift-labs/frontier-sandbox-quickjs`](https://www.npmjs.com/package/@shapeshift-labs/frontier-sandbox-quickjs): QuickJS/WebAssembly runtime adapter for Frontier sandbox actions, including invocation/runtime isolation modes, deadline and memory limits, dynamic source execution, and patch/effect result normalization.
- [`@shapeshift-labs/frontier-workflow`](https://www.npmjs.com/package/@shapeshift-labs/frontier-workflow): Serializable durable workflow/process manifests for Frontier apps, including steps, waits, approvals, timers, retries, expected patches, compensation, records, timelines, and registry graph output.
- [`@shapeshift-labs/frontier-worker`](https://www.npmjs.com/package/@shapeshift-labs/frontier-worker): Serializable worker and edge task descriptors for Frontier apps, including queues, idempotency keys, retry and timeout policy, declared reads/writes/effects, snapshots, patch outputs, produced assets, execution records, logs, trace links, proof hashes, dedupe indexes, and registry graph output.
- [`@shapeshift-labs/frontier-queue`](https://www.npmjs.com/package/@shapeshift-labs/frontier-queue): Serializable durable queue state, leases, retries, dedupe keys, patch-carrying jobs, dead-letter records, replay evidence, and queue inspection for Frontier apps.
- [`@shapeshift-labs/frontier-swarm-codex`](https://www.npmjs.com/package/@shapeshift-labs/frontier-swarm-codex): Node Codex CLI adapter for Frontier swarm plans, including prompt rendering, worktree and snapshot workspaces, Codex argument compatibility, browser resource allocation, JSONL capture, verification commands, pid-backed stop, collect/apply workflows, merge indexes, queue overlays, merge bundles, normalized job evidence, coordinator query artifacts, and result artifacts.
- [`@shapeshift-labs/frontier-lang-kernel`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-kernel): Runtime-neutral semantic source graph, type/lattice/extern declarations, patch bundles, replay, hashing, evidence records, and merge-admission kernel for Frontier Lang.
- [`@shapeshift-labs/frontier-lang-parser`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-parser): Dependency-light Frontier Lang parser for modules, entities, state, actions, effects, types, externs, targets, and lattice declarations.
- [`@shapeshift-labs/frontier-lang-checker`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-checker): Checker and diagnostics for Frontier Lang semantic documents, including type symbols, effects, regions, lattice laws, CRDT metadata, and patch evidence.
- [`@shapeshift-labs/frontier-lang-typescript`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-typescript): TypeScript projection adapter for Frontier Lang semantic documents, including type/entity/state/action/extern declarations and CRDT lattice descriptors.
- [`@shapeshift-labs/frontier-lang-javascript`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-javascript): JavaScript projection adapter for Frontier Lang semantic documents, including ESM action stubs and schema/lattice descriptors.
- [`@shapeshift-labs/frontier-lang-rust`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-rust): Rust projection adapter for Frontier Lang semantic documents, including structs, aliases, and action stubs.
- [`@shapeshift-labs/frontier-lang-python`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-python): Python projection adapter for Frontier Lang semantic documents, including dataclasses, typed patch records, and action stubs.
- [`@shapeshift-labs/frontier-lang-c`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-c): C header projection adapter for Frontier Lang semantic documents, including structs and action prototypes.
- [`@shapeshift-labs/frontier-lang-compiler`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-compiler): Compiler facade for Frontier Lang source documents, including parse, check, hash, diagnostics, universal AST envelopes, proof/paradigm semantic summaries, projection to TypeScript, JavaScript, Rust, Python, and C, and native source-import adapters for semantic merge evidence.
- [`@shapeshift-labs/frontier-lang-swift`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-swift): Swift source-language importer package for Frontier Lang semantic documents, including package-level metadata, SwiftSyntax adapter helpers, native import results, and semantic sidecar generation for SwiftSyntax/SwiftParser-shaped syntax trees.
- [`@shapeshift-labs/frontier-lang-kotlin`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-kotlin): Kotlin PSI source-language importer package for Frontier Lang semantic documents, including package-level metadata, Kotlin PSI adapter helpers, native import results, and semantic sidecar generation for Kotlin PSI/KtFile-shaped syntax trees.
- [`@shapeshift-labs/frontier-lang-java`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-java): Java source-language importer package for Frontier Lang semantic documents, including package-level metadata, Java AST adapter helpers, native import results, and semantic sidecar generation for javac/JDT/JavaParser-shaped ASTs.
- [`@shapeshift-labs/frontier-lang-go`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-go): Go source-language importer package for Frontier Lang semantic documents, including package-level metadata, Go AST adapter helpers, native import results, and semantic sidecar generation for go/ast File or Package trees.
- [`@shapeshift-labs/frontier-lang-csharp`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-csharp): C# Roslyn source-language importer package for Frontier Lang semantic documents, including package-level metadata, Roslyn adapter helpers, native import results, and semantic sidecar generation for SyntaxTree/SyntaxNode-shaped ASTs.
- [`@shapeshift-labs/frontier-lang-clang`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-clang): Clang AST source-language importer package for Frontier Lang semantic documents, including package-level metadata, Clang AST JSON adapter helpers, native import results, and semantic sidecar generation for C/C++ translation units.
- [`@shapeshift-labs/frontier-lang-cli`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-cli): Command line interface for parsing, checking, hashing, emitting, native source import/projection, semantic slicing, and corpus roundtrip evidence for Frontier Lang projects.
- [`@shapeshift-labs/frontier-lang`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang): Umbrella package for Frontier Lang kernel, parser, checker, compiler facade, universal AST helpers, projection adapters, and source-language importer adapters.
- [`@shapeshift-labs/frontier-kv`](https://www.npmjs.com/package/@shapeshift-labs/frontier-kv): Serializable in-memory key/value state for Frontier apps, including TTL, versioned compare-and-set, batched patch mutations, scans, watchers, snapshots, JSONL event evidence, and replay verification.
- [`@shapeshift-labs/frontier-kv-locks`](https://www.npmjs.com/package/@shapeshift-labs/frontier-kv-locks): Lease-style lock records on top of Frontier KV, including acquire, renew, release, fencing tokens, expiration, owner evidence, and replayable lock events.
- [`@shapeshift-labs/frontier-kv-rate-limit`](https://www.npmjs.com/package/@shapeshift-labs/frontier-kv-rate-limit): Patch-native rate limit buckets for Frontier KV, including fixed windows, sliding windows, token buckets, deterministic refill, consume evidence, and reset records.
- [`@shapeshift-labs/frontier-kv-file`](https://www.npmjs.com/package/@shapeshift-labs/frontier-kv-file): Node file persistence adapter for Frontier KV snapshots and append-only JSONL event logs, including atomic writes, compaction, replay loading, and adapter evidence.
- [`@shapeshift-labs/frontier-kv-idb`](https://www.npmjs.com/package/@shapeshift-labs/frontier-kv-idb): IndexedDB persistence adapter for Frontier KV snapshots and event logs, with structural IDB interfaces, upgrade planning, compact event storage, and replay loading.
- [`@shapeshift-labs/frontier-kv-redis`](https://www.npmjs.com/package/@shapeshift-labs/frontier-kv-redis): Redis-compatible command planning and structural client adapter for Frontier KV operations, including key mapping, TTL commands, optimistic CAS scripts, and replay evidence without bundling Redis drivers.
- [`@shapeshift-labs/frontier-kv-server`](https://www.npmjs.com/package/@shapeshift-labs/frontier-kv-server): Small Node HTTP server adapter for Frontier KV, including request planning, JSON endpoints for get/set/delete/scan/batch, optional rate-limit hooks, and replayable response evidence.
- [`@shapeshift-labs/frontier-assets`](https://www.npmjs.com/package/@shapeshift-labs/frontier-assets): Serializable asset and content provenance graphs for Frontier apps, including source files, generated variants, thumbnails, LOD chunks, shader/material dependencies, transforms, hashes, owners, runtime consumers, review plans, registry graph output, and impact queries.
- [`@shapeshift-labs/frontier-blueprint`](https://www.npmjs.com/package/@shapeshift-labs/frontier-blueprint): Serializable Blueprint/Prefab flyweight templates for Frontier apps, including parameterized instantiation, deterministic ID/path remapping, compact overrides, variants, effective-state materialization, scene/state patch emission, dependency metadata, and registry graph output.
- [`@shapeshift-labs/frontier-triggers`](https://www.npmjs.com/package/@shapeshift-labs/frontier-triggers): Capability-gated event trigger registry, scoped event envelopes, listener/reaction rules, structured rejection, deterministic event-to-action scheduling, replay/provenance records, and registry graph output.
- [`@shapeshift-labs/frontier-virtual`](https://www.npmjs.com/package/@shapeshift-labs/frontier-virtual): DOM-neutral virtualization, layout providers, range materialization, grids, spatial/frustum indexes, patch invalidation, camera anchors, and serializable layout state.
- [`@shapeshift-labs/frontier-table`](https://www.npmjs.com/package/@shapeshift-labs/frontier-table): Renderer-neutral data grid and table primitives for Frontier apps, including stable row identity, sorting, filtering, selection, virtual ranges, patch-driven edits, cache/dataflow descriptors, and CRDT-compatible row and cell operation frames.
- [`@shapeshift-labs/frontier-scene`](https://www.npmjs.com/package/@shapeshift-labs/frontier-scene): Patch-native 2D/3D scene graph, transform propagation, bounds queries, virtual/culling adapters, spatial invalidation, and camera/frustum materialization.
- [`@shapeshift-labs/frontier-pathfinding`](https://www.npmjs.com/package/@shapeshift-labs/frontier-pathfinding): Patch-native grid pathfinding, typed-array A*/Dijkstra search, flow fields, connected components, line-of-sight smoothing, dirty-cell invalidation, and scheduler-friendly path jobs.
- [`@shapeshift-labs/frontier-lod`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lod): Patch-native level-of-detail and significance selection for rendering and computation workloads, compact typed hot paths, multi-observer selection, budget degradation, materialization frames, and scheduler work plans.
- [`@shapeshift-labs/frontier-route`](https://www.npmjs.com/package/@shapeshift-labs/frontier-route): DOM-neutral app/game route resources, route and scene manifests, match/resolve/transition planning, dependency metadata, sessions, registry graph output, and impact queries.
- [`@shapeshift-labs/frontier-trace`](https://www.npmjs.com/package/@shapeshift-labs/frontier-trace): Serializable traces, spans, events, causal links, W3C trace context helpers, timeline/resource/path queries, critical-path analysis, registry graph output, JSONL/proof helpers, Chrome trace export, and redaction for app-wide feature observability.
- [`@shapeshift-labs/frontier-manifest`](https://www.npmjs.com/package/@shapeshift-labs/frontier-manifest): Build/static feature manifests for owners, routes, actions, states, migrations, tests, source files, assets, resources, tasks, dependency metadata, registry graph output, feature maps, JSONL export, and impact queries.
- [`@shapeshift-labs/frontier-view`](https://www.npmjs.com/package/@shapeshift-labs/frontier-view): Renderer-neutral view manifests, type defaults, validation frames, action bindings, visual channels, virtual/LOD hints, and data-to-representation mapping for Frontier apps.
- [`@shapeshift-labs/frontier-icons`](https://www.npmjs.com/package/@shapeshift-labs/frontier-icons): Renderer-neutral icon records, icon sets, lookup aliases, SVG frames, string rendering, and registry evidence for Frontier apps.
- [`@shapeshift-labs/frontier-design`](https://www.npmjs.com/package/@shapeshift-labs/frontier-design): Renderer-neutral design-system tokens, semantic roles, recipes, target style frames, CSS variable output, and registry graph evidence for Frontier apps.
- [`@shapeshift-labs/frontier-canvas`](https://www.npmjs.com/package/@shapeshift-labs/frontier-canvas): Renderer-neutral infinite canvas surfaces for Frontier apps, including camera and viewport math, pan/zoom plans, grid materialization, snapping, hit testing, selection handles, extensible tool dispatch, frame records, registry graph output, and impact/proof helpers.
- [`@shapeshift-labs/frontier-canvas-tools`](https://www.npmjs.com/package/@shapeshift-labs/frontier-canvas-tools): Renderer-neutral editor tools, state machines, transform handles, permissions, async records, and AI action bridges for Frontier canvas surfaces.
- [`@shapeshift-labs/frontier-dnd`](https://www.npmjs.com/package/@shapeshift-labs/frontier-dnd): Renderer-neutral drag-and-drop sessions, sensor descriptors, collision ranking, drop planning, reorder patches, state partitioning, and registry evidence for Frontier apps.
- [`@shapeshift-labs/frontier-dom`](https://www.npmjs.com/package/@shapeshift-labs/frontier-dom): Patch-native DOM and host renderer bindings, manifest hydration, JSX runtime/compiler helpers, SSR, devtools, and logging bridges.
- [`@shapeshift-labs/frontier-playwright`](https://www.npmjs.com/package/@shapeshift-labs/frontier-playwright): Playwright/headless automation probes for Frontier state, DOM, devtools, marks, and timeline queries.
- [`@shapeshift-labs/frontier-test`](https://www.npmjs.com/package/@shapeshift-labs/frontier-test): Serializable test/spec evidence manifests for Frontier apps, including fixtures, commands, expected patches/effects/routes/policies, coverage declarations, run plans, run records, report adapters, replay proofs, fuzzers, benchmarks, registry graph output, and impact queries.
- [`@shapeshift-labs/frontier-fixtures`](https://www.npmjs.com/package/@shapeshift-labs/frontier-fixtures): Deterministic fixture and scenario generation for Frontier apps, including schema-valid sample state, related entity collections, actor personas, route states, replay-verified patch streams, event records, JSONL bundles, and evidence summaries.
- [`@shapeshift-labs/frontier-component-preview`](https://www.npmjs.com/package/@shapeshift-labs/frontier-component-preview): Frontier-native component preview books, generated preview manifests, stateful variants, Vite virtual modules, standalone browser preview shells, inspector bridges, and preview harness evidence for Frontier apps.
- [`@shapeshift-labs/frontier-documentation`](https://www.npmjs.com/package/@shapeshift-labs/frontier-documentation): Frontier-native documentation manifests, generated documentation books, package/API/source discovery, Vite virtual modules, standalone browser docs shells, inspector bridges, search indexes, and documentation harness evidence for Frontier apps and packages.
- [`@shapeshift-labs/frontier-ast-walk`](https://www.npmjs.com/package/@shapeshift-labs/frontier-ast-walk): Dependency-light source graph, import/export/declaration/call analysis, Frontier package-use discovery, and business-logic placement findings for Frontier tools, apps, docs, fuzzers, benchmarks, and agent evidence.
- [`@shapeshift-labs/frontier-history`](https://www.npmjs.com/package/@shapeshift-labs/frontier-history): Serializable temporal explanation and causality records for Frontier apps, including field-change explanations, action/workflow/policy/effect/trace/test provenance, audit windows, undo planning, registry/provenance graph output, JSONL replay bundles, and proof hashes.
- [`@shapeshift-labs/frontier-application`](https://www.npmjs.com/package/@shapeshift-labs/frontier-application): Serializable whole-application graph and impact queries for Frontier apps, including features, owners, packages, routes, views, actions, mutations, state paths, effects, workers, assets, tests, traces, policies, workflows, migrations, benchmarks, registry graph output, feature maps, JSONL bundles, and proof hashes.
- [`@shapeshift-labs/frontier-linter`](https://www.npmjs.com/package/@shapeshift-labs/frontier-linter): Serializable Frontier lint rules, diagnostics, fixes, reports, and fast rule execution for package catalogs, registry graphs, application maps, manifests, traces, policies, workflows, workers, assets, tests, benchmarks, and source snippets.
- [`@shapeshift-labs/frontier-framework`](https://www.npmjs.com/package/@shapeshift-labs/frontier-framework): High-level app framework package for Frontier applications, including configuration, CLI scaffolding, Vite builds, monorepo layout, TSX route builds, split frontend/backend deploy artifacts, backend-neutral Fetch handler and sync transport contracts, runtime data-source migrations, devtools, harness gates, agent MCP/tool manifests, CI evidence gates, workflow manifests, SARIF/linter output, replay scripts, and evidence manifest output.
- [`@shapeshift-labs/frontier-crdt`](https://www.npmjs.com/package/@shapeshift-labs/frontier-crdt): Native CRDT documents, update tooling, awareness, branches, conflict introspection, version frames, and undo.
- [`@shapeshift-labs/frontier-crdt-sync`](https://www.npmjs.com/package/@shapeshift-labs/frontier-crdt-sync): CRDT sync endpoints, repo/storage/provider contracts, scheduled sync work, document URLs, local networks, model checking, forensics, and text binding contracts.
- [`@shapeshift-labs/frontier-crdt-websocket`](https://www.npmjs.com/package/@shapeshift-labs/frontier-crdt-websocket): WebSocket client/server transports for Frontier CRDT sync providers.
- [`@shapeshift-labs/frontier-react`](https://www.npmjs.com/package/@shapeshift-labs/frontier-react): React external-store hooks and adapters for Frontier state, cache, and CRDT surfaces.
- [`@shapeshift-labs/frontier-richtext`](https://www.npmjs.com/package/@shapeshift-labs/frontier-richtext): Rich text Delta normalization/application, marks, embeds, ranges, and cursor/selection transforms for local editor integrations.
- [`@shapeshift-labs/frontier-realtime`](https://www.npmjs.com/package/@shapeshift-labs/frontier-realtime): Shared realtime command, tick, snapshot, prediction, reconciliation, interpolation, rollback, message, and delta primitives.
- [`@shapeshift-labs/frontier-realtime-server`](https://www.npmjs.com/package/@shapeshift-labs/frontier-realtime-server): Authoritative realtime room, tick, command validation, rate-limit, session, and snapshot-history runtime.
- [`@shapeshift-labs/frontier-realtime-websocket`](https://www.npmjs.com/package/@shapeshift-labs/frontier-realtime-websocket): WebSocket client, wire, and Node room-server transport for Frontier realtime.
- [`@shapeshift-labs/frontier-game`](https://www.npmjs.com/package/@shapeshift-labs/frontier-game): Game-facing entity, component, player, room, ownership, spatial interest, rollback, physics, and replication helpers above realtime.
- [`@shapeshift-labs/loom`](https://www.npmjs.com/package/@shapeshift-labs/loom): Repo-level semantic collaboration CLI for .loom workspaces, including init, scan, status, graph snapshots, projection plans, Frontier Lang delegation, Frontier Swarm delegation, and Frontier Framework delegation.

Package source repositories:

- [`siliconjungle/-shapeshift-labs-frontier`](https://github.com/siliconjungle/-shapeshift-labs-frontier)
- [`siliconjungle/-shapeshift-labs-frontier-query`](https://github.com/siliconjungle/-shapeshift-labs-frontier-query)
- [`siliconjungle/-shapeshift-labs-frontier-codec`](https://github.com/siliconjungle/-shapeshift-labs-frontier-codec)
- [`siliconjungle/-shapeshift-labs-frontier-engine`](https://github.com/siliconjungle/-shapeshift-labs-frontier-engine)
- [`siliconjungle/-shapeshift-labs-frontier-state`](https://github.com/siliconjungle/-shapeshift-labs-frontier-state)
- [`siliconjungle/-shapeshift-labs-frontier-dataflow`](https://github.com/siliconjungle/-shapeshift-labs-frontier-dataflow)
- [`siliconjungle/-shapeshift-labs-frontier-state-cache`](https://github.com/siliconjungle/-shapeshift-labs-frontier-state-cache)
- [`siliconjungle/-shapeshift-labs-frontier-state-cache-idb`](https://github.com/siliconjungle/-shapeshift-labs-frontier-state-cache-idb)
- [`siliconjungle/-shapeshift-labs-frontier-state-cache-file`](https://github.com/siliconjungle/-shapeshift-labs-frontier-state-cache-file)
- [`siliconjungle/-shapeshift-labs-frontier-state-cache-sql`](https://github.com/siliconjungle/-shapeshift-labs-frontier-state-cache-sql)
- [`siliconjungle/-shapeshift-labs-frontier-schema`](https://github.com/siliconjungle/-shapeshift-labs-frontier-schema)
- [`siliconjungle/-shapeshift-labs-frontier-migrations`](https://github.com/siliconjungle/-shapeshift-labs-frontier-migrations)
- [`siliconjungle/-shapeshift-labs-frontier-event-log`](https://github.com/siliconjungle/-shapeshift-labs-frontier-event-log)
- [`siliconjungle/-shapeshift-labs-frontier-run`](https://github.com/siliconjungle/-shapeshift-labs-frontier-run)
- [`siliconjungle/-shapeshift-labs-frontier-inspect`](https://github.com/siliconjungle/-shapeshift-labs-frontier-inspect)
- [`siliconjungle/-shapeshift-labs-frontier-scheduler`](https://github.com/siliconjungle/-shapeshift-labs-frontier-scheduler)
- [`siliconjungle/-shapeshift-labs-frontier-logging`](https://github.com/siliconjungle/-shapeshift-labs-frontier-logging)
- [`siliconjungle/-shapeshift-labs-frontier-mutation`](https://github.com/siliconjungle/-shapeshift-labs-frontier-mutation)
- [`siliconjungle/-shapeshift-labs-frontier-effects`](https://github.com/siliconjungle/-shapeshift-labs-frontier-effects)
- [`siliconjungle/-shapeshift-labs-frontier-auth`](https://github.com/siliconjungle/-shapeshift-labs-frontier-auth)
- [`siliconjungle/-shapeshift-labs-frontier-policy`](https://github.com/siliconjungle/-shapeshift-labs-frontier-policy)
- [`siliconjungle/-shapeshift-labs-frontier-flags`](https://github.com/siliconjungle/-shapeshift-labs-frontier-flags)
- [`siliconjungle/-shapeshift-labs-frontier-tools`](https://github.com/siliconjungle/-shapeshift-labs-frontier-tools)
- [`siliconjungle/-shapeshift-labs-frontier-sandbox`](https://github.com/siliconjungle/-shapeshift-labs-frontier-sandbox)
- [`siliconjungle/-shapeshift-labs-frontier-sandbox-quickjs`](https://github.com/siliconjungle/-shapeshift-labs-frontier-sandbox-quickjs)
- [`siliconjungle/-shapeshift-labs-frontier-workflow`](https://github.com/siliconjungle/-shapeshift-labs-frontier-workflow)
- [`siliconjungle/-shapeshift-labs-frontier-worker`](https://github.com/siliconjungle/-shapeshift-labs-frontier-worker)
- [`siliconjungle/-shapeshift-labs-frontier-queue`](https://github.com/siliconjungle/-shapeshift-labs-frontier-queue)
- [`siliconjungle/-shapeshift-labs-frontier-swarm`](https://github.com/siliconjungle/-shapeshift-labs-frontier-swarm)
- [`siliconjungle/-shapeshift-labs-frontier-swarm-codex`](https://github.com/siliconjungle/-shapeshift-labs-frontier-swarm-codex)
- [`siliconjungle/-shapeshift-labs-frontier-lang-kernel`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-kernel)
- [`siliconjungle/-shapeshift-labs-frontier-lang-parser`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-parser)
- [`siliconjungle/-shapeshift-labs-frontier-lang-checker`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-checker)
- [`siliconjungle/-shapeshift-labs-frontier-lang-typescript`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-typescript)
- [`siliconjungle/-shapeshift-labs-frontier-lang-javascript`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-javascript)
- [`siliconjungle/-shapeshift-labs-frontier-lang-rust`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-rust)
- [`siliconjungle/-shapeshift-labs-frontier-lang-python`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-python)
- [`siliconjungle/-shapeshift-labs-frontier-lang-c`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-c)
- [`siliconjungle/-shapeshift-labs-frontier-lang-compiler`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-compiler)
- [`siliconjungle/-shapeshift-labs-frontier-lang-swift`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-swift)
- [`siliconjungle/-shapeshift-labs-frontier-lang-kotlin`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-kotlin)
- [`siliconjungle/-shapeshift-labs-frontier-lang-java`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-java)
- [`siliconjungle/-shapeshift-labs-frontier-lang-go`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-go)
- [`siliconjungle/-shapeshift-labs-frontier-lang-csharp`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-csharp)
- [`siliconjungle/-shapeshift-labs-frontier-lang-clang`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-clang)
- [`siliconjungle/-shapeshift-labs-frontier-lang-cli`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-cli)
- [`siliconjungle/-shapeshift-labs-frontier-lang`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang)
- [`siliconjungle/-shapeshift-labs-frontier-kv`](https://github.com/siliconjungle/-shapeshift-labs-frontier-kv)
- [`siliconjungle/-shapeshift-labs-frontier-kv-locks`](https://github.com/siliconjungle/-shapeshift-labs-frontier-kv-locks)
- [`siliconjungle/-shapeshift-labs-frontier-kv-rate-limit`](https://github.com/siliconjungle/-shapeshift-labs-frontier-kv-rate-limit)
- [`siliconjungle/-shapeshift-labs-frontier-kv-file`](https://github.com/siliconjungle/-shapeshift-labs-frontier-kv-file)
- [`siliconjungle/-shapeshift-labs-frontier-kv-idb`](https://github.com/siliconjungle/-shapeshift-labs-frontier-kv-idb)
- [`siliconjungle/-shapeshift-labs-frontier-kv-redis`](https://github.com/siliconjungle/-shapeshift-labs-frontier-kv-redis)
- [`siliconjungle/-shapeshift-labs-frontier-kv-server`](https://github.com/siliconjungle/-shapeshift-labs-frontier-kv-server)
- [`siliconjungle/-shapeshift-labs-frontier-assets`](https://github.com/siliconjungle/-shapeshift-labs-frontier-assets)
- [`siliconjungle/-shapeshift-labs-frontier-blueprint`](https://github.com/siliconjungle/-shapeshift-labs-frontier-blueprint)
- [`siliconjungle/-shapeshift-labs-frontier-triggers`](https://github.com/siliconjungle/-shapeshift-labs-frontier-triggers)
- [`siliconjungle/-shapeshift-labs-frontier-virtual`](https://github.com/siliconjungle/-shapeshift-labs-frontier-virtual)
- [`siliconjungle/-shapeshift-labs-frontier-table`](https://github.com/siliconjungle/-shapeshift-labs-frontier-table)
- [`siliconjungle/-shapeshift-labs-frontier-scene`](https://github.com/siliconjungle/-shapeshift-labs-frontier-scene)
- [`siliconjungle/-shapeshift-labs-frontier-pathfinding`](https://github.com/siliconjungle/-shapeshift-labs-frontier-pathfinding)
- [`siliconjungle/-shapeshift-labs-frontier-lod`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lod)
- [`siliconjungle/-shapeshift-labs-frontier-route`](https://github.com/siliconjungle/-shapeshift-labs-frontier-route)
- [`siliconjungle/-shapeshift-labs-frontier-trace`](https://github.com/siliconjungle/-shapeshift-labs-frontier-trace)
- [`siliconjungle/-shapeshift-labs-frontier-manifest`](https://github.com/siliconjungle/-shapeshift-labs-frontier-manifest)
- [`siliconjungle/-shapeshift-labs-frontier-view`](https://github.com/siliconjungle/-shapeshift-labs-frontier-view)
- [`siliconjungle/-shapeshift-labs-frontier-icons`](https://github.com/siliconjungle/-shapeshift-labs-frontier-icons)
- [`siliconjungle/-shapeshift-labs-frontier-design`](https://github.com/siliconjungle/-shapeshift-labs-frontier-design)
- [`siliconjungle/-shapeshift-labs-frontier-canvas`](https://github.com/siliconjungle/-shapeshift-labs-frontier-canvas)
- [`siliconjungle/-shapeshift-labs-frontier-canvas-tools`](https://github.com/siliconjungle/-shapeshift-labs-frontier-canvas-tools)
- [`siliconjungle/-shapeshift-labs-frontier-dnd`](https://github.com/siliconjungle/-shapeshift-labs-frontier-dnd)
- [`siliconjungle/-shapeshift-labs-frontier-dom`](https://github.com/siliconjungle/-shapeshift-labs-frontier-dom)
- [`siliconjungle/-shapeshift-labs-frontier-playwright`](https://github.com/siliconjungle/-shapeshift-labs-frontier-playwright)
- [`siliconjungle/-shapeshift-labs-frontier-test`](https://github.com/siliconjungle/-shapeshift-labs-frontier-test)
- [`siliconjungle/-shapeshift-labs-frontier-fixtures`](https://github.com/siliconjungle/-shapeshift-labs-frontier-fixtures)
- [`siliconjungle/-shapeshift-labs-frontier-component-preview`](https://github.com/siliconjungle/-shapeshift-labs-frontier-component-preview)
- [`siliconjungle/-shapeshift-labs-frontier-documentation`](https://github.com/siliconjungle/-shapeshift-labs-frontier-documentation)
- [`siliconjungle/-shapeshift-labs-frontier-ast-walk`](https://github.com/siliconjungle/-shapeshift-labs-frontier-ast-walk)
- [`siliconjungle/-shapeshift-labs-frontier-history`](https://github.com/siliconjungle/-shapeshift-labs-frontier-history)
- [`siliconjungle/-shapeshift-labs-frontier-application`](https://github.com/siliconjungle/-shapeshift-labs-frontier-application)
- [`siliconjungle/-shapeshift-labs-frontier-linter`](https://github.com/siliconjungle/-shapeshift-labs-frontier-linter)
- [`siliconjungle/-shapeshift-labs-frontier-framework`](https://github.com/siliconjungle/-shapeshift-labs-frontier-framework)
- [`siliconjungle/-shapeshift-labs-frontier-crdt`](https://github.com/siliconjungle/-shapeshift-labs-frontier-crdt)
- [`siliconjungle/-shapeshift-labs-frontier-crdt-sync`](https://github.com/siliconjungle/-shapeshift-labs-frontier-crdt-sync)
- [`siliconjungle/-shapeshift-labs-frontier-crdt-websocket`](https://github.com/siliconjungle/-shapeshift-labs-frontier-crdt-websocket)
- [`siliconjungle/-shapeshift-labs-frontier-react`](https://github.com/siliconjungle/-shapeshift-labs-frontier-react)
- [`siliconjungle/-shapeshift-labs-frontier-richtext`](https://github.com/siliconjungle/-shapeshift-labs-frontier-richtext)
- [`siliconjungle/-shapeshift-labs-frontier-realtime`](https://github.com/siliconjungle/-shapeshift-labs-frontier-realtime)
- [`siliconjungle/-shapeshift-labs-frontier-realtime-server`](https://github.com/siliconjungle/-shapeshift-labs-frontier-realtime-server)
- [`siliconjungle/-shapeshift-labs-frontier-realtime-websocket`](https://github.com/siliconjungle/-shapeshift-labs-frontier-realtime-websocket)
- [`siliconjungle/-shapeshift-labs-frontier-game`](https://github.com/siliconjungle/-shapeshift-labs-frontier-game)
- [`siliconjungle/-shapeshift-labs-loom`](https://github.com/siliconjungle/-shapeshift-labs-loom)

## Install

```sh
npm install @shapeshift-labs/frontier-swarm
```

## Example

```ts
import {
  createSwarmPlan,
  defineSwarmManifest,
  defineSwarmTasks
} from '@shapeshift-labs/frontier-swarm';

const manifest = defineSwarmManifest({
  compute: [
    { id: 'deep', kind: 'codex', model: 'gpt-5.5', reasoningEffort: 'xhigh' },
    { id: 'fast', kind: 'codex', model: 'gpt-5.4-mini', reasoningEffort: 'medium' }
  ],
  layers: [
    { id: 'parent', childCompute: { implementation: 'deep', evidence: 'fast' } },
    { id: 'implementation', parentId: 'parent' },
    { id: 'evidence', parentId: 'parent' }
  ],
  lanes: [{
    id: 'runtime',
    layer: 'implementation',
    allowedWrites: ['src/runtime/**'],
    evidencePrefix: 'agent-runs/runtime/'
  }],
  policy: { defaultCompute: 'fast' }
});

const tasks = defineSwarmTasks([{
  id: 'runtime-port',
  lane: 'runtime',
  targetRefs: ['src/runtime/index.ts'],
  acceptance: ['runtime evidence passes'],
  verification: [{ command: 'npm', args: ['test'] }]
}]);

const plan = createSwarmPlan(manifest, tasks, { limit: 4 });
```

## 1000-Agent Control Plane

Large swarms need a control plane, not just a flat worker loop. `frontier-swarm` now exports deterministic data helpers for that layer:

```ts
import {
  checkSwarmBudget,
  createSwarmArtifactIndex,
  createSwarmEventStream,
  createSwarmLeases,
  createSwarmMergePlan,
  createSwarmQueueSnapshot,
  createSwarmReviewPlan,
  createSwarmSchedule,
  routeSwarmEventToMailboxes
} from '@shapeshift-labs/frontier-swarm';

const schedule = createSwarmSchedule({
  plan,
  maxReadyJobs: 100,
  maxConcurrencyKeyConcurrency: { 'runtime-state': 1 },
  maxComputeConcurrency: { deep: 40 }
});

const leases = createSwarmLeases({
  schedule,
  workerId: 'worker-a',
  leaseMs: 15 * 60 * 1000,
  count: 10
});
```

The scale APIs are runtime-neutral and serializable:

- dependency DAGs are compiled into `plan.graph`,
- `createSwarmSchedule` returns ready, blocked, running, completed, and failed jobs under lane/compute/contention limits,
- `createSwarmLeases` gives workers expiring leases with fencing tokens,
- lane/task `capabilities` and `resourceRequirements` can reserve browser work with lower concurrency, port pools, profile directories, and explicit capability checks,
- `createSwarmQueueSnapshot` and run checkpoints give durable queue/run-store adapters a stable serialization shape,
- `createSwarmEventStream` and `routeSwarmEventToMailboxes` route global, lane, task, and worker events into coordinator-facing JSONL streams,
- `checkSwarmBudget` records token/cost/time/retry budget decisions,
- `createSwarmArtifactIndex` groups evidence, timelines, logs, and produced files,
- `createSwarmReviewPlan` samples or requires reviewer assignments,
- `createSwarmMergePlan` blocks jobs with failed checks, required reviews, ownership violations, or conflicting changed paths,
- job results include merge-readiness classification: `discovery-only`, `patch-candidate`, `verified-patch`, `rejected`, or `blocked`,
- `ownershipRegions` allow hot files to be split into semantic regions such as `content.docs.*` or `adminSettings.quota.*`; merge conflict detection compares explicit changed regions when both sides report them and falls back to path conflicts when either side omits regions,
- `createSwarmMergeBundle` builds a compact worker `merge.json` shape with touched owned files, patch path, evidence, verification command metadata (`name`, `command`, `commandLine`, `cwd`, `status`, `required`, `durationMs`, and category hints), queue items satisfied, risk, and disposition, and keeps evidence-only bundles distinct from bundles that actually contain passing checks,
- `createSwarmQueueOverlay` and `deriveSwarmQueueStatus` keep central queue files immutable while deriving status from worker result overlays,
- `mergeSwarmMetadata` keeps task and queue metadata data-only while carrying verification gate descriptors forward through queue, bundle, and drain transformations,
- `createSwarmMergeIndex` records stale/patch status and region-aware conflicts so coordinators can review ready bundles before reading every worker directory,
- `checkSwarmRegionOwnership` makes semantic region ownership enforceable instead of only advisory,
- `createSwarmHotspotReport` highlights repeatedly touched files and suggests module/region splits for merge throughput,
- `createSwarmReviewerLanePlan` turns risky/conflicting merge bundles into reviewer-lane tasks,
- `createSwarmRunStoreShards` describes sharded event/result/checkpoint paths for large run stores,
- `createSwarmMergeAdmission` limits ready merges by count, touched paths/regions, and risk budget,
- `createSwarmPatchStackPlan` clusters compatible bundles into candidate patch stacks by lane, path, region, disposition, and risk so reviewers can evaluate batches instead of individual worker directories,
- `createSwarmContextPack` gives workers compact task context: relevant files, API maps, known failures, focused/oracle commands, expected evidence, exclusions, evidence schema, playbooks, and explicit dead ends to avoid,
- `createSwarmOracleCorpus` indexes deterministic reference artifacts such as traces, snapshots, classifications, expected outputs, or fixtures without assuming a project domain,
- `createSwarmReplayBundle`, `createSwarmParityOracle`, `createSwarmDivergenceReport`, `createSwarmObservabilityPoint`, `createSwarmWatchpointPlan`, and `createSwarmDebugHandoff` model the trace-to-debug workflow: replay finds the narrow window, watchpoints/debug handoff explain the state at that point,
- `createSwarmReferenceOraclePlan` and `createSwarmReferenceOracleResponse` describe reusable reference services for ports, migrations, parity checks, and cross-implementation comparisons,
- `createSwarmInstrumentationBudget`, `checkSwarmInstrumentationBudget`, and `createSwarmBottleneckReport` keep traces/logs useful without making instrumentation the bottleneck,
- `createSwarmEvidenceIndex` / `querySwarmEvidenceIndex` and `createSwarmBlackboard` / `querySwarmBlackboard` provide storage-neutral status surfaces for coordinator dashboards, accepted facts, known divergences, rejected theories, and active ownership,
- `createSwarmArtifactRoutingPlan`, `createSwarmSchedulerRecommendations`, `createSwarmFixtureCatalog`, `createSwarmProgressModel`, `createSwarmAutoReviewReport`, `createSwarmRebaseReport`, and `createSwarmUsageGovernor` cover the merge/review/scheduling tools needed to scale from feature swarms to larger migration and porting swarms,
- `createSwarmModelRoute` and `createSwarmPanelEvaluation` score runtime-neutral compute candidates from task metadata, model price catalogs, token mix, budget caps, time pressure, and outcome history, then explain single-cheap, single-deep, panel, or tournament routes,
- `createSwarmOptimizationSummary` keeps routing, panel, fusion, tournament, RSI-style feedback, model diversity, and consumed-feedback telemetry in a storage-neutral summary that distinguishes unavailable telemetry from real zero counts,
- `createSwarmLanePlaybook` turns successful prior bundles into persistent lane-specific guidance with commands, hot paths, evidence patterns, and avoid-investigating notes,
- `decomposeSwarmFeature` creates an initial task queue for feature work across lanes.

## Hierarchical Compute

Higher swarm layers can choose compute for lower layers without binding the core package to Codex or any other runtime. Compute resolution is deterministic:

1. task `compute`
2. lane `compute`
3. nearest parent layer `childCompute`
4. current layer `compute` or `defaultCompute`
5. manifest policy `defaultCompute`

That lets a parent swarm route implementation jobs to a deep model while evidence or inspection jobs use a faster profile.

## Model Routing

`createSwarmModelRoute` scores compute candidates directly, and `createSwarmPlan(..., { routingMode, routingPolicy })` can consume matching policy feedback when selecting job compute. Explicit `options.compute` still wins, `routingMode: 'observe'` records a route without changing compute, and `routingMode: 'fill'` only changes compute when matching feedback or policy preferences exist. That lets runners choose the cheapest capable profile by default and escalate or avoid models when task risk, uncertainty, impact, outcome history, budget, cost feedback, or latency pressure justify it.

```ts
import { createSwarmModelRoute } from '@shapeshift-labs/frontier-swarm';

const route = createSwarmModelRoute({
  manifest,
  task: {
    id: 'routing-policy-change',
    lane: 'runtime',
    targetRefs: ['src/router.ts'],
    metadata: { risk: 'high', uncertainty: 'unknown', impact: 'high' }
  },
  tokenEstimate: { inputTokens: 10000, cachedInputTokens: 2000, outputTokens: 2000 },
  priceCatalog: {
    fast: { compute: 'fast', inputUsdPerUnit: 0.2, cachedInputUsdPerUnit: 0.02, outputUsdPerUnit: 1, unitTokens: 1000000 },
    deep: { compute: 'deep', inputUsdPerUnit: 5, cachedInputUsdPerUnit: 0.5, outputUsdPerUnit: 30, unitTokens: 1000000 }
  },
  panel: { enabled: true, minRiskScore: 0.7, maxMembers: 2, fuserComputeId: 'deep' }
});
```

`FRONTIER_SWARM_TASK_MODEL_PROFILES` records the default task-kind profile catalog, and `resolveSwarmTaskModelProfile(task)` chooses the profile from `task.workKind`. Each profile captures the expected model tier, cost band, context shape, strengths, and known failure modes for that kind of task. The built-in catalog is model-agnostic: callers can supply their own profile models or compute catalog, and `createSwarmModelRoute` keeps the selected compute separate from the task-kind hint. The route scorer then combines task kind, risk, observed history, token price, and latency so implementation/review/oracle work stays on cheaper candidates unless the history says the cheap route is failing, while public API and other high-risk merge work can still escalate.

`createSwarmModelRoutingFeedback` and `createSwarmModelRoutingPolicy` cover the serializable feedback/policy layer above the model router. Matching feedback is converted into model outcome history, cost/duration signals are folded into candidate scoring, prefer/avoid/override signals can select or suppress candidates, and each routed job gets compact `metadata.modelRoute` evidence with fallback, selected, recommended compute ids, policy match counts, cost-signal counts, and route reasons.

`createSwarmOptimizationSummary` gives runners a generic evidence record for routing decisions, panel/fusion decisions, tournament observations, RSI-style routing feedback, model diversity, and whether any feedback was consumed. Telemetry can be omitted entirely when unavailable or emitted with real zero counts when the run observed nothing.

The returned record includes scored candidates, estimated cost and latency, price/outcome telemetry fallbacks, panel confidence lift, residual risk, and a human-readable explanation for `single-cheap`, `single-deep`, `panel`, or `tournament` recommendations.

## Surface

- `defineSwarmManifest`, `createSwarmManifest`
- `defineSwarmTasks`
- `compileSwarm`, `validateSwarmManifest`
- `createSwarmTaskSelection`
- `createSwarmPlan`, `createSwarmRun`
- `createSwarmSchedule`, `createSwarmLeases`
- `createSwarmQueueSnapshot`, `createSwarmRunCheckpoint`
- `FRONTIER_SWARM_REVIEW_PRIORITY_POLICY`
- `createSwarmQueueOverlay`, `normalizeSwarmTerminalOutcome`, `createSwarmTerminalOutcomeRecord`, `deriveSwarmQueueStatus`
- `createSwarmEventStream`, `createSwarmMailbox`, `routeSwarmEventToMailboxes`
- `checkSwarmBudget`
- `createSwarmArtifactIndex`
- `createSwarmReviewPlan`, `createSwarmReviewerLanePlan`, `createSwarmMergePlan`
- `createSwarmMergeBundle`
- `createSwarmMergeIndex`, `createSwarmMergeAdmission`
- `createSwarmHotspotReport`, `createSwarmRunStoreShards`
- `createSwarmPatchStackPlan`
- `createSwarmContextPack`, `createSwarmOracleCorpus`, `createSwarmLanePlaybook`
- `createSwarmReplayBundle`, `createSwarmParityOracle`, `createSwarmDivergenceReport`, `createSwarmObservabilityPoint`
- `createSwarmWatchpointPlan`, `createSwarmDebugHandoff`
- `createSwarmReferenceOraclePlan`, `createSwarmReferenceOracleResponse`
- `createSwarmInstrumentationBudget`, `checkSwarmInstrumentationBudget`, `createSwarmBottleneckReport`
- `createSwarmEvidenceIndex`, `querySwarmEvidenceIndex`, `createSwarmBlackboard`, `querySwarmBlackboard`
- `createSwarmArtifactRoutingPlan`, `createSwarmSchedulerRecommendations`
- `createSwarmOptimizationSummary`
- `createSwarmFixtureCatalog`, `createSwarmProgressModel`, `createSwarmAutoReviewReport`, `createSwarmRebaseReport`
- `createSwarmUsageGovernor`, `checkSwarmUsageGovernor`
- `createSwarmModelRoutingFeedback`, `createSwarmModelRoutingPolicy`
- `createSwarmModelRoute`, `createSwarmPanelEvaluation`
- `createSwarmSemanticOwnershipStableKey`, `createSwarmSemanticOwnershipRegionId`
- `classifySwarmMergeReadiness`, `classifySwarmMergeDisposition`
- `resolveSwarmChangedRegions`, `checkSwarmRegionOwnership`
- `decomposeSwarmFeature`
- `recordSwarmEvent`, `completeSwarmJob`
- `resolveSwarmCompute`
- `checkSwarmOwnership`, `matchesGlob`
- `encodeSwarmJsonl`, `decodeSwarmJsonl`
- `createSwarmProof`

## Benchmarks

Run the package-local benchmark:

```sh
npm run bench
```

The benchmark writes `benchmarks/results/frontier-swarm-package-bench-latest.json` when run from the monorepo. These are Frontier-only package measurements for plan creation, manifest validation, hierarchical compute resolution, ownership checks, scheduling/leases, queue snapshots, queue overlays, merge bundles, merge indexes, merge admission, hotspot reports, context packs, oracle corpora, replay/debug/evidence helper creation, lane playbooks, patch stack plans, event routing, run checkpoints, JSONL, and proof hashing.

## Source Repository

This package is published from [siliconjungle/-shapeshift-labs-frontier-swarm](https://github.com/siliconjungle/-shapeshift-labs-frontier-swarm).
