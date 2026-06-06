import type { JsonObject, JsonValue } from '@shapeshift-labs/frontier';
import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { normalizeCommands, normalizeId, normalizeNamedRefs, titleFromId, toJsonValue } from './record-helpers.js';
import type { FrontierSwarmCommand, FrontierSwarmCommandInput, FrontierSwarmNamedRef, FrontierSwarmNamedRefInput } from './index.js';

export const FRONTIER_SWARM_FIXTURE_CATALOG_KIND = 'frontier.swarm.fixture-catalog';
export const FRONTIER_SWARM_FIXTURE_CATALOG_VERSION = 1;

export interface FrontierSwarmFixtureInput {
  id: string;
  title?: string;
  description?: string;
  state?: unknown;
  artifacts?: readonly FrontierSwarmNamedRefInput[];
  setupCommands?: readonly (string | FrontierSwarmCommandInput)[];
  tags?: readonly string[];
  metadata?: unknown;
}

export interface FrontierSwarmFixture {
  id: string;
  title: string;
  description?: string;
  state?: JsonValue;
  artifacts: FrontierSwarmNamedRef[];
  setupCommands: FrontierSwarmCommand[];
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierSwarmFixtureCatalogInput {
  id?: string;
  fixtures?: readonly FrontierSwarmFixtureInput[];
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmFixtureCatalog {
  kind: typeof FRONTIER_SWARM_FIXTURE_CATALOG_KIND;
  version: typeof FRONTIER_SWARM_FIXTURE_CATALOG_VERSION;
  id: string;
  generatedAt: number;
  fixtures: FrontierSwarmFixture[];
  byTag: Record<string, string[]>;
  summary: { fixtureCount: number; tagCount: number };
  metadata?: JsonObject;
}

export function createSwarmFixtureCatalog(input: FrontierSwarmFixtureCatalogInput = {}): FrontierSwarmFixtureCatalog {
  const generatedAt = input.generatedAt ?? Date.now();
  const fixtures = (input.fixtures ?? []).map(normalizeFixture);
  const byTag: Record<string, string[]> = {};
  for (const fixture of fixtures) {
    for (const tag of fixture.tags) byTag[tag] = uniqueStrings([...(byTag[tag] ?? []), fixture.id]);
  }
  return {
    kind: FRONTIER_SWARM_FIXTURE_CATALOG_KIND,
    version: FRONTIER_SWARM_FIXTURE_CATALOG_VERSION,
    id: input.id ?? 'swarm-fixture-catalog:' + stableHash([fixtures, generatedAt]),
    generatedAt,
    fixtures,
    byTag,
    summary: {
      fixtureCount: fixtures.length,
      tagCount: Object.keys(byTag).length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeFixture(input: FrontierSwarmFixtureInput): FrontierSwarmFixture {
  return {
    id: normalizeId(input.id, 'fixture id'),
    title: input.title ?? titleFromId(input.id),
    ...(input.description ? { description: input.description } : {}),
    ...(input.state !== undefined ? { state: toJsonValue(input.state) } : {}),
    artifacts: normalizeNamedRefs(input.artifacts ?? [], 'fixture-artifact'),
    setupCommands: normalizeCommands(input.setupCommands ?? []),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
