# @shapeshift-labs/frontier-swarm

Hierarchical swarm plans, lanes, compute profiles, ownership policy, events, and proofs for Frontier agent work.

`frontier-swarm` turns parallel agent work into data: manifests, parent/child swarm layers, compute profiles, lane ownership, task queues, dry-run plans, event streams, changed-path checks, job results, and proof hashes. It does not spawn processes, create git worktrees, call Codex, or talk to queue brokers. Runners attach through structural adapters such as `@shapeshift-labs/frontier-swarm-codex`.


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
- [`@shapeshift-labs/frontier-lease`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lease): Runtime-neutral semantic, file, package, and repository lease claims with fencing tokens, expiry, conflict checks, apply validation, and replayable evidence for Frontier collaboration.
- [`@shapeshift-labs/frontier-inspect`](https://www.npmjs.com/package/@shapeshift-labs/frontier-inspect): Cross-package inspection/evidence bundles, registry graph snapshots, feature/resource impact reports, timeline/event normalization, redaction, JSONL import/export, and AI-readable app feature maps.
- [`@shapeshift-labs/frontier-runtime-proof`](https://www.npmjs.com/package/@shapeshift-labs/frontier-runtime-proof): Runtime-neutral proof capsules, source-bound runtime telemetry, and admission evidence helpers for Frontier merge and review workflows.
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
- [`@shapeshift-labs/frontier-swarm-git`](https://www.npmjs.com/package/@shapeshift-labs/frontier-swarm-git): Node Git, workspace, patch, changed-path, write-fence, package-link repair, patch check, HEAD read, blob hash, and apply-ledger adapter for Frontier swarm runners.
- [`@shapeshift-labs/frontier-swarm-codex`](https://www.npmjs.com/package/@shapeshift-labs/frontier-swarm-codex): Node Codex CLI adapter for Frontier swarm plans, including prompt rendering, worktree and snapshot workspaces, Codex argument compatibility, browser resource allocation, JSONL capture, verification commands, pid-backed stop, collect/apply workflows, merge indexes, queue overlays, merge bundles, normalized job evidence, coordinator query artifacts, result artifacts, and run-log sync adapters.
- [`@shapeshift-labs/frontier-loom-ui`](https://www.npmjs.com/package/@shapeshift-labs/frontier-loom-ui): Read-only Loom and Frontier operator dashboard for workspace-lifetime progress, active agents, queue state, evidence/admission status, run events, run-log sync projections, semantic leases, gate executions, git apply/workspace evidence, and coordinator steering intent files.
- [`@shapeshift-labs/frontier-lang-kernel`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-kernel): Runtime-neutral semantic source graph, type/lattice/extern declarations, patch bundles, replay, hashing, evidence records, and merge-admission kernel for Frontier Lang.
- [`@shapeshift-labs/frontier-lang-parser`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-parser): Dependency-light Frontier Lang parser for modules, entities, state, actions, effects, types, externs, targets, and lattice declarations.
- [`@shapeshift-labs/frontier-lang-checker`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-checker): Checker and diagnostics for Frontier Lang semantic documents, including type symbols, effects, regions, lattice laws, CRDT metadata, and patch evidence.
- [`@shapeshift-labs/frontier-lang-typescript`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-typescript): TypeScript projection adapter for Frontier Lang semantic documents, including type/entity/state/action/extern declarations and CRDT lattice descriptors.
- [`@shapeshift-labs/frontier-lang-javascript`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-javascript): JavaScript projection adapter for Frontier Lang semantic documents, including ESM action stubs and schema/lattice descriptors.
- [`@shapeshift-labs/frontier-lang-html`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-html): HTML semantic merge evidence and projection adapter for Frontier Lang semantic documents, including element tree identity, attributes, text/comment spans, source maps, and fail-closed browser/runtime proof gaps.
- [`@shapeshift-labs/frontier-lang-css`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-css): CSS semantic merge evidence and projection adapter for Frontier Lang semantic documents, including selector specificity, declaration/cascade keys, custom properties, `@property` and `@page` descriptor evidence, CSS Modules/ICSS export and composition evidence, source maps, and fail-closed browser cascade/render proof gaps.
- [`@shapeshift-labs/frontier-lang-rust`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-rust): Rust projection adapter for Frontier Lang semantic documents, including structs, aliases, and action stubs.
- [`@shapeshift-labs/frontier-lang-python`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-python): Python projection adapter for Frontier Lang semantic documents, including dataclasses, typed patch records, and action stubs.
- [`@shapeshift-labs/frontier-lang-c`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-c): C header projection adapter for Frontier Lang semantic documents, including structs and action prototypes.
- [`@shapeshift-labs/frontier-lang-compiler`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-compiler): Compiler facade for Frontier Lang source documents, including parse, check, hash, diagnostics, universal AST envelopes, proof/paradigm semantic summaries, projection to TypeScript, JavaScript, HTML, CSS, Rust, Python, and C, and native source-import adapters for semantic merge evidence.
- [`@shapeshift-labs/frontier-lang-swift`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-swift): Swift source-language importer package for Frontier Lang semantic documents, including package-level metadata, SwiftSyntax adapter helpers, native import results, and semantic sidecar generation for SwiftSyntax/SwiftParser-shaped syntax trees.
- [`@shapeshift-labs/frontier-lang-kotlin`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-kotlin): Kotlin PSI source-language importer package for Frontier Lang semantic documents, including package-level metadata, Kotlin PSI adapter helpers, native import results, and semantic sidecar generation for Kotlin PSI/KtFile-shaped syntax trees.
- [`@shapeshift-labs/frontier-lang-java`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-java): Java source-language importer package for Frontier Lang semantic documents, including package-level metadata, Java AST adapter helpers, native import results, and semantic sidecar generation for javac/JDT/JavaParser-shaped ASTs.
- [`@shapeshift-labs/frontier-lang-go`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-go): Go source-language importer package for Frontier Lang semantic documents, including package-level metadata, Go AST adapter helpers, native import results, and semantic sidecar generation for go/ast File or Package trees.
- [`@shapeshift-labs/frontier-lang-csharp`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-csharp): C# Roslyn source-language importer package for Frontier Lang semantic documents, including package-level metadata, Roslyn adapter helpers, native import results, and semantic sidecar generation for SyntaxTree/SyntaxNode-shaped ASTs.
- [`@shapeshift-labs/frontier-lang-clang`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-clang): Clang AST source-language importer package for Frontier Lang semantic documents, including package-level metadata, Clang AST JSON adapter helpers, native import results, and semantic sidecar generation for C/C++ translation units.
- [`@shapeshift-labs/frontier-lang-cli`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang-cli): Command line interface for parsing, checking, hashing, emitting, native source import/projection, semantic slicing, and corpus roundtrip evidence for Frontier Lang projects.
- [`@shapeshift-labs/frontier-lang`](https://www.npmjs.com/package/@shapeshift-labs/frontier-lang): Umbrella package for Frontier Lang kernel, parser, checker, compiler facade, universal AST helpers, projection adapters, HTML/CSS semantic merge evidence adapters, and source-language importer adapters.
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
- [`@shapeshift-labs/loom`](https://www.npmjs.com/package/@shapeshift-labs/loom): Repo-level semantic collaboration CLI for .loom workspaces, including init, scan, status, graph snapshots, projection plans, Frontier Lang delegation, Frontier Swarm delegation, run-log sync command delegation, and Frontier Framework delegation.

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
- [`siliconjungle/-shapeshift-labs-frontier-lease`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lease)
- [`siliconjungle/-shapeshift-labs-frontier-inspect`](https://github.com/siliconjungle/-shapeshift-labs-frontier-inspect)
- [`siliconjungle/-shapeshift-labs-frontier-runtime-proof`](https://github.com/siliconjungle/-shapeshift-labs-frontier-runtime-proof)
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
- [`siliconjungle/-shapeshift-labs-frontier-swarm-git`](https://github.com/siliconjungle/-shapeshift-labs-frontier-swarm-git)
- [`siliconjungle/-shapeshift-labs-frontier-swarm-codex`](https://github.com/siliconjungle/-shapeshift-labs-frontier-swarm-codex)
- [`siliconjungle/frontier-loom-ui`](https://github.com/siliconjungle/frontier-loom-ui)
- [`siliconjungle/-shapeshift-labs-frontier-lang-kernel`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-kernel)
- [`siliconjungle/-shapeshift-labs-frontier-lang-parser`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-parser)
- [`siliconjungle/-shapeshift-labs-frontier-lang-checker`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-checker)
- [`siliconjungle/-shapeshift-labs-frontier-lang-typescript`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-typescript)
- [`siliconjungle/-shapeshift-labs-frontier-lang-javascript`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-javascript)
- [`siliconjungle/-shapeshift-labs-frontier-lang-html`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-html)
- [`siliconjungle/-shapeshift-labs-frontier-lang-css`](https://github.com/siliconjungle/-shapeshift-labs-frontier-lang-css)
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

## Boards, Backlogs, And Fusion Panels

`frontier-swarm` models project work and weak-model uplift as runtime-neutral data. Backlogs group swarm tasks into epics, task groups, and cycles; boards project queue, evidence, blackboard, merge, progress, and auto-review records into a coordinator-visible working set; panels create bounded decision loops around a task, board entry, or merge candidate.

Boards can also ingest merge queue hierarchies, coordinator group queue hierarchies, coordinator queue lease ledgers, and replay-recovery artifacts. That gives coordinator dashboards one generic surface for child queue admission, active local leases, promoted/applied work, stale/conflict buckets, and replayable lifetime state without moving review debt into a central human pile.

Scheduler dashboards add a lane-level view of ready, running, and blocked work. `createSwarmSchedulerDashboard` turns a schedule into deterministic starvation-risk records, including lanes blocked by the ready window while another lane consumes the admitted work, and `createSwarmBoard` can project those records into normal board entries. Lanes that already have ready or running work are treated as active rather than starved, even when another job in the same lane is blocked by the ready window. The dashboard also emits an `output` block with stable `summaryLine`, `lines`, `starvationLines`, and `blockedLines` strings so coordinators can attach human-readable queue status without reformatting the structured lane records.

Human questions are reserved for real blockers. `checkSwarmHumanQuestion` and `shouldAskSwarmHumanQuestion` require an explicit question or prompt, the blocking uncertainty, enough context or related paths, and either a requested answer shape or concrete options. Worker-facing question artifacts should carry a stable `code`, `title`, `context`, `requestedAnswer`, and concrete `options` so the coordinator can route only genuine uncertainty instead of routine review. When options are supplied, labels and values must not be ambiguous because submitted answers resolve only when the answer text exactly names an option label or value.

Fusion-style panels are represented as task graphs, not provider calls. `createSwarmPanelFusionPlan` fans out independent participant tasks, adds a fuser task that depends on all participants, and optionally adds a finalizer task grounded in the fuser analysis. The plan stores tool parity and eval-hygiene metadata such as blocked or excluded domains so benchmark rubrics and other contamination sources can be kept out of worker prompts by execution adapters.

Panel artifacts also feed merge and routing readiness conservatively: `createSwarmPanelReadinessSignal` treats unfinalized consensus as review input, while grounded finalizer output with passing required gates can contribute to merge admission and model-routing feedback.

Routing feedback can also carry usage and cost signals. Provide `usage.inputTokens`, `usage.outputTokens`, and optional `cost.amount` / `currency` / `unit` when a runner has pricing data; otherwise set `cost.priceKnown: false` with token counts so the policy can distinguish unknown-price samples from free or zero-cost samples. The core package does not embed public model pricing; producers can pass normalized `cost.metadata.routingScore` or `cost.metadata.costEfficiencyScore` when local pricing data should steer model preferences.

```ts
import {
  createSwarmPanel,
  createSwarmPanelFusionPlan
} from '@shapeshift-labs/frontier-swarm';

const panel = createSwarmPanel({
  id: 'runtime-fusion',
  lane: 'runtime',
  mode: 'fuse',
  targetRefs: ['src/runtime/index.ts'],
  judges: [
    { id: 'mini', role: 'proposer', compute: 'fast', model: 'gpt-5.4-mini' },
    { id: 'flagship', role: 'proposer', compute: 'deep', model: 'gpt-5.5' },
    { id: 'fuser', role: 'fuser', compute: 'deep', model: 'gpt-5.5' }
  ]
});

const fusion = createSwarmPanelFusionPlan({
  panel,
  prompt: 'Which candidate patch is best supported by evidence?',
  epicId: 'runtime-epic',
  groupId: 'runtime-group',
  cycleId: 'wave-1',
  toolPolicy: {
    tools: ['web_search', 'web_fetch', 'bash'],
    excludedDomains: ['benchmark-results.example'],
    blockedDomains: ['private-rubric.example']
  }
});
```

Backlogs are intentionally plain JSON so a repo, Loom workspace, or run store can keep them across sessions. `createSwarmBacklogTaskPlan` turns durable epics, task groups, cycles, and entries into runnable swarm tasks. Leaf entries become normal worker tasks; higher-level epics/groups/feature entries become `backlog-decompose` tasks that ask workers to write a child `frontier.swarm.backlog` artifact such as `backlog-children.json`. The coordinator can then fold those child artifacts back into the durable backlog with `mergeSwarmBacklogs` and launch the next wave.

When child queues produce backlog artifacts, `createSwarmChildQueueAdmission` combines the merge and planning steps. It folds one or more child backlogs into the local backlog, matches coordinator decisions from direct inputs, decision rollups, or merge indexes by job id, task id, entry id, and queue-item metadata, recollects child queue-state metadata into terminal backlog statuses for applied, rejected, superseded, blocked, and rerun outputs, creates a bounded next-wave task plan, and records admitted versus deferred task and entry ids so a lane or package coordinator can continue locally without creating a single central review pileup. The admission also emits an `output` block with stable `summaryLine`, `lines`, `admittedLines`, `deferredLines`, and `recollectionLines` strings for coordinator dashboards that need compact human-readable child-queue status.

Task groups can carry the same runnable scheduling metadata used by backlog entries, including compute, concurrency keys, budgets, review policy, ownership regions, capabilities, verification, and evidence commands. Those fields are preserved when a persisted backlog is reloaded and converted into decomposition tasks for continuation runs.

Model routing uses the same data loop. `createSwarmModelRoutingTournament`, `createSwarmModelRoutingFeedback`, and `createSwarmModelRoutingPolicySignal` record which OpenAI model/reasoning profiles worked for a repository, lane, task kind, or package. `createSwarmModelRoutingPolicy` compiles those records into preferences, and `createSwarmPlan` can apply the policy in `fill`, `override`, or `observe` mode before jobs are created.

```ts
import {
  acquireSwarmCoordinatorQueueLease,
  admitSwarmChildBacklog,
  createSwarmBacklog,
  createSwarmBacklogTaskPlan,
  createSwarmChildQueueAdmission,
  createSwarmCoordinatorQueueLeaseLedger,
  createSwarmModelRoutingPolicy,
  createSwarmPlan
} from '@shapeshift-labs/frontier-swarm';

const backlog = createSwarmBacklog({
  id: 'runtime-backlog',
  epics: [{ id: 'runtime-epic' }],
  taskGroups: [{ id: 'runtime-group', epicId: 'runtime-epic' }],
  entries: [{
    id: 'runtime-feature',
    entryKind: 'feature',
    status: 'ready',
    epicId: 'runtime-epic',
    groupId: 'runtime-group'
  }]
});

const backlogTasks = createSwarmBacklogTaskPlan({
  backlog,
  recursive: true,
  childArtifactPath: 'agent-runs/runtime/backlog-children.json'
});

const routingPolicy = createSwarmModelRoutingPolicy({
  feedback: [{
    repository: 'json-diff',
    lane: 'runtime',
    computeId: 'deep',
    model: 'gpt-5.5',
    resultStatus: 'completed',
    mergeDisposition: 'auto-mergeable',
    evidenceQuality: { band: 'verified', deterministic: true }
  }]
});

const plan = createSwarmPlan(manifest, backlogTasks.tasks, {
  routingPolicy,
  routingMode: 'fill',
  routingContext: { repository: 'json-diff' }
});

// After a worker writes a child backlog artifact, admit it under a live queue lease.
const leaseLedger = createSwarmCoordinatorQueueLeaseLedger();
const lease = acquireSwarmCoordinatorQueueLease({
  ledger: leaseLedger,
  request: {
    coordinatorId: 'coord:runtime-group',
    queueId: 'coord-queue:runtime-group',
    queueLevel: 'group',
    lane: 'runtime',
    groupId: 'runtime-group'
  }
});
const fencedAdmission = admitSwarmChildBacklog({
  base: backlog,
  incoming: childBacklog,
  leaseLedger: lease.ledger,
  leaseId: lease.lease.id,
  coordinatorId: 'coord:runtime-group',
  fencingToken: lease.lease.fencingToken
});
const nextBacklog = fencedAdmission.ok ? fencedAdmission.backlog : backlog;
const admission = createSwarmChildQueueAdmission({
  base: nextBacklog,
  maxAdmittedTasks: 10,
  childArtifactPaths: ['agent-runs/runtime/backlog-children.json'],
  coordinatorDecisions: [{
    jobId: 'runtime-child-worker',
    taskId: 'runtime-child-task',
    action: 'rerun',
    status: 'resolved',
    decidedAt: Date.now()
  }]
});
```

## Coordinator-Agent Runner Loop

`frontier-swarm` models the coordinator-agent loop as data so runner packages can scale review without one global manual queue. The loop is: issue queue leases from the schedule, collect immutable worker evidence, run scoped review at the lane or package boundary, record the decision ledger, reread the collection/backlog before planning the next wave, then promote accepted or rerun work upward through queue overlays and backlog records.

The central lease belongs at the mutation boundary, not at every review step. Runtime adapters can fence root apply with a merge lease ledger after scoped review has accepted a bundle, but stale-before-merge, failed patch/apply checks, failed required commands, and routine approval requests remain coordinator workflow states. Human questions are for true blockers only: material uncertainty that source, evidence, tests, and safe reversible assumptions cannot resolve.

Child backlog artifacts should use `admitSwarmChildBacklog` when more than one coordinator can fold outputs into local queues. The helper validates the active coordinator-queue lease, coordinator id, fencing token, and entry scope before calling the plain backlog merge reducer. Rejected admissions return the original backlog plus a compact `frontier.swarm.backlog-admission` record with reasons such as `fencing-token-mismatch`, `coordinator-queue-lease-not-active`, or `entry-outside-lease-scope`, so runners can rerun, supersede, or conflict-block without creating a central manual review pileup.

Coordinator decisions can target worker job ids, task ids, or queue item ids. Resolved decisions use their `action` (`accepted`, `rerun`, `superseded`, `rejected`, or `not-applicable`) to close the matching queue item, while `status: "open"` keeps the item in review.

### Self-Draining Merge Fabric

A self-draining merge fabric is the same loop repeated until only real blockers remain. Workers emit immutable bundles with patches, verification output, semantic sidecars, handoffs, and human-question artifacts. Scoped coordinators lease lane, package, or root review scopes, read the bundles, write decision ledgers, and promote accepted or rerun work upward. Apply still happens under a merge lease at the mutation boundary, with patch checks and focused verification recorded before the lease is completed.

Root coordination is a leasable role, not one human or one Codex session. A root coordinator is simply the holder of the current root review or apply lease. If that lease expires, is released, or is completed, another coordinator can pick up the same root scope from the recorded queue, merge index, decision ledger, and lease ledger. The durable state is the fabric; the person or agent holding the lease is interchangeable.

In a ten-agent drain loop, the expected terminal buckets are boring: applied bundles have completed merge leases, promoted bundles have queue-promotion records, rejected and not-applicable bundles have audit rows, rerun bundles have follow-up task ids, and stale or failed patch checks stay in coordinator workflow. The only open residue should be true conflicts that need ownership or code changes, plus well-formed human questions whose uncertainty cannot be resolved from repository evidence.

The runtime-neutral oracle contract is plain JSON: `kind: "frontier.swarm.drain-terminal-oracle"`, `version: 1`, `runId`, `generatedAt`, `cycles[]`, and `summary`. Each cycle records evidence ids, artifact names, and a `terminalStates` map with the stable keys `applied`, `rerun`, `superseded`, `rejected`, `conflict-blocked`, and `human-question`. This gives coordinators one deterministic shape for proving repeated worker/coordinator/apply/recollect passes have drained review debt into applied output, autonomous rerun/supersede/reject decisions, conflict evidence, or a material human question.

## 1000-Agent Control Plane

Large swarms need a control plane, not just a flat worker loop. `frontier-swarm` now exports deterministic data helpers for that layer:

```ts
import {
  checkSwarmBudget,
  createSwarmArtifactIndex,
  createSwarmEventStream,
  createSwarmFairQueuePolicy,
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
  fairQueue: createSwarmFairQueuePolicy({ mode: 'lane-round-robin' }),
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
- optional `fairQueue` scheduling records a JSON `frontier.swarm.fair-queue-state` with lane order, selected jobs, and ready/blocked/deferred counts so one noisy local lane cannot fill every ready or lease slot,
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
- `createSwarmMergeBundle` builds a compact worker `merge.json` shape with touched owned files, patch path, evidence, verification, queue items satisfied, risk, and disposition,
- `createSwarmQueueOverlay` and `deriveSwarmQueueStatus` keep central queue files immutable while deriving status from worker result overlays,
- `createSwarmMergeIndex` records stale/patch status and region-aware conflicts so coordinators can review ready bundles before reading every worker directory,
- `checkSwarmRegionOwnership` makes semantic region ownership enforceable instead of only advisory,
- `createSwarmHotspotReport` highlights repeatedly touched files and suggests module/region splits for merge throughput,
- `createSwarmReviewerLanePlan` turns risky/conflicting merge bundles into reviewer-lane tasks,
- `createSwarmRunStoreShards` describes sharded event/result/checkpoint paths for large run stores,
- `createSwarmMergeAdmission` limits ready merges by count, touched paths/regions, and risk budget; `accepted-clean` and `already-applied` patch statuses can satisfy the patch gate for clean semantic replay only when verification, semantic sidecar evidence, ownership, risk, and conflict gates also pass,
- `createSwarmPatchStackPlan` clusters compatible bundles into candidate patch stacks by lane, path, region, disposition, and risk so reviewers can evaluate batches instead of individual worker directories,
- `createSwarmContextPack` gives workers compact task context: relevant files, API maps, known failures, focused/oracle commands, expected evidence, exclusions, evidence schema, playbooks, and explicit dead ends to avoid,
- `createSwarmOracleCorpus` indexes deterministic reference artifacts such as traces, snapshots, classifications, expected outputs, or fixtures without assuming a project domain,
- `createSwarmReplayBundle`, `createSwarmParityOracle`, `createSwarmDivergenceReport`, `createSwarmObservabilityPoint`, `createSwarmWatchpointPlan`, and `createSwarmDebugHandoff` model the trace-to-debug workflow: replay finds the narrow window, watchpoints/debug handoff explain the state at that point,
- `createSwarmReferenceOraclePlan` and `createSwarmReferenceOracleResponse` describe reusable reference services for ports, migrations, parity checks, and cross-implementation comparisons,
- `createSwarmInstrumentationBudget`, `checkSwarmInstrumentationBudget`, and `createSwarmBottleneckReport` keep traces/logs useful without making instrumentation the bottleneck,
- `createSwarmEvidenceIndex` / `querySwarmEvidenceIndex` and `createSwarmBlackboard` / `querySwarmBlackboard` provide storage-neutral status surfaces for coordinator dashboards, accepted facts, known divergences, rejected theories, and active ownership,
- `createSwarmBacklog` / `querySwarmBacklog`, `createSwarmBacklogTaskPlan`, `createSwarmChildQueueAdmission`, `mergeSwarmBacklogs`, `createSwarmBoard` / `querySwarmBoard`, `createSwarmPanel`, `createSwarmPanelConsensus`, `createSwarmPanelReviewTasks`, `createSwarmPanelFusionPlan`, and `createSwarmPanelReadinessSignal` model persisted backlog grouping, recursive decomposition, child queue admission, coordinator boards, judge/fuser panels, escalations, Fusion-style fan-out/fuser/finalizer task graphs, and grounded panel merge readiness,
- `createSwarmSchedulerDashboard` projects schedule pressure into lane-level dashboard rows and starvation-risk board entries for fair local queue review,
- `createSwarmModelRoutingTournament`, `createSwarmModelRoutingFeedback`, `createSwarmModelRoutingPolicySignal`, `createSwarmModelRoutingPolicy`, and `applySwarmModelRoutingPolicy` record and apply which model/reasoning profiles worked for a repository, package, lane, task kind, or run,
- `createSwarmArtifactRoutingPlan`, `createSwarmSchedulerRecommendations`, `createSwarmFixtureCatalog`, `createSwarmProgressModel`, `createSwarmAutoReviewReport`, `createSwarmRebaseReport`, and `createSwarmUsageGovernor` cover the merge/review/scheduling tools needed to scale from feature swarms to larger migration and porting swarms,
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

## Surface

- `defineSwarmManifest`, `createSwarmManifest`
- `defineSwarmTasks`
- `compileSwarm`, `validateSwarmManifest`
- `createSwarmTaskSelection`
- `createSwarmPlan`, `createSwarmRun`
- `createSwarmSchedule`, `createSwarmLeases`
- `createSwarmQueueSnapshot`, `createSwarmRunCheckpoint`
- `createSwarmQueueOverlay`, `deriveSwarmQueueStatus`
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
- `createSwarmBacklog`, `querySwarmBacklog`
- `createSwarmBacklogTaskPlan`, `createSwarmChildQueueAdmission`, `mergeSwarmBacklogs`
- `createSwarmBoard`, `querySwarmBoard`
- `createSwarmSchedulerDashboard`
- `createSwarmPanel`, `createSwarmPanelRound`, `createSwarmPanelConsensus`, `createSwarmPanelReviewTasks`
- `createSwarmPanelFusionPlan`, `createSwarmPanelFusionTasks`
- `createSwarmModelRoutingPolicy`, `applySwarmModelRoutingPolicy`
- `createSwarmModelRoutingTournament`, `createSwarmModelRoutingFeedback`, `createSwarmModelRoutingPolicySignal`
- `createSwarmArtifactRoutingPlan`, `createSwarmSchedulerRecommendations`
- `createSwarmFixtureCatalog`, `createSwarmProgressModel`, `createSwarmAutoReviewReport`, `createSwarmRebaseReport`
- `createSwarmUsageGovernor`, `checkSwarmUsageGovernor`
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
