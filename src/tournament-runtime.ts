import {
  FRONTIER_SWARM_STRATEGY_CERTIFICATE_KIND,
  FRONTIER_SWARM_STRATEGY_CERTIFICATE_VERSION,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_KIND,
  FRONTIER_SWARM_STRATEGY_TOURNAMENT_VERSION
} from './constants.js';
import { stableHash, toJsonObject, uniqueStrings } from './internal.js';
import { normalizeId, titleFromId } from './record-helpers.js';
import {
  finite,
  isRejectedOutcome,
  isUndefinedOutcome,
  isVerifiedOutcome,
  normalizeScoringPolicy,
  nonNegative,
  normalizeComponentValue,
  normalizeNumberRecord,
  normalizeStringRecord,
  positive,
  round2,
  scoreSwarmPayoffVector
} from './tournament-scoring.js';
import {
  assertCompatibleId,
  countSwarmTournamentOutcomes,
  groupSwarmTournamentMatchIds,
  isSwarmPayoffVector,
  matchSwarmTournamentQuery,
  rankSwarmStrategyStandings,
  validateSwarmExistingPayoff
} from './tournament-runtime-helpers.js';
import type {
  FrontierSwarmPayoffComponent,
  FrontierSwarmPayoffComponentPolicy,
  FrontierSwarmPayoffScoringPolicy,
  FrontierSwarmPayoffVector,
  FrontierSwarmPayoffVectorInput,
  FrontierSwarmStrategy,
  FrontierSwarmStrategyCertificate,
  FrontierSwarmStrategyCertificateInput,
  FrontierSwarmStrategyGame,
  FrontierSwarmStrategyGameInput,
  FrontierSwarmStrategyInput,
  FrontierSwarmStrategyMatch,
  FrontierSwarmStrategyMatchInput,
  FrontierSwarmStrategyTournament,
  FrontierSwarmStrategyTournamentInput,
  FrontierSwarmStrategyTournamentQuery
} from './tournament-types.js';

export function createSwarmStrategyCertificate(
  input: FrontierSwarmStrategyCertificateInput = {}
): FrontierSwarmStrategyCertificate {
  const commands = uniqueStrings(input.commands ?? []);
  const proofRefs = uniqueStrings(input.proofRefs ?? []);
  const traceRefs = uniqueStrings(input.traceRefs ?? []);
  const evidencePaths = uniqueStrings(input.evidencePaths ?? []);
  const hashes = normalizeStringRecord(input.hashes);
  const durationMs = nonNegative(input.durationMs);
  return {
    kind: FRONTIER_SWARM_STRATEGY_CERTIFICATE_KIND,
    version: FRONTIER_SWARM_STRATEGY_CERTIFICATE_VERSION,
    id: input.id ?? 'swarm-strategy-certificate:' + stableHash([input.strategyId, input.gameId, commands, proofRefs, traceRefs, hashes, durationMs]),
    ...(input.strategyId ? { strategyId: input.strategyId } : {}),
    ...(input.gameId ? { gameId: input.gameId } : {}),
    replayable: input.replayable ?? (commands.length > 0 || proofRefs.length > 0 || traceRefs.length > 0),
    commands,
    proofRefs,
    traceRefs,
    hashes,
    durationMs,
    evidencePaths,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmPayoffVector(input: FrontierSwarmPayoffVectorInput): FrontierSwarmPayoffVector {
  const strategyId = normalizeId(input.strategyId, 'payoff strategy id');
  const gameId = input.gameId ?? input.certificate?.gameId;
  const outcome = input.outcome ?? 'candidate';
  assertCompatibleId('certificate.strategyId', strategyId, input.certificate?.strategyId);
  assertCompatibleId('certificate.gameId', gameId, input.certificate?.gameId);
  const scoringPolicy = input.scoringPolicy ? normalizeScoringPolicy(input.scoringPolicy) : undefined;
  const components = normalizeComponents(input.components, scoringPolicy?.components);
  const penalties = normalizeNumberRecord(input.penalties);
  const costs = normalizeNumberRecord(input.costs);
  const search = normalizeSearch(input.search);
  const certificate = input.certificate ? createSwarmStrategyCertificate({
    ...input.certificate,
    strategyId,
    gameId
  }) : undefined;
  const evidencePaths = uniqueStrings([
    ...(input.evidencePaths ?? []),
    ...(search.evidencePaths ?? []),
    ...(certificate?.evidencePaths ?? [])
  ]);
  const score = scoreSwarmPayoffVector({ components, penalties, outcome, costs, search, certificate }, scoringPolicy);
  return {
    id: input.id ?? 'swarm-payoff:' + stableHash([strategyId, gameId, input.matchId, outcome, components, penalties, costs, search, certificate, scoringPolicy]),
    strategyId,
    ...(gameId ? { gameId } : {}),
    ...(input.matchId ? { matchId: input.matchId } : {}),
    outcome,
    components,
    penalties,
    costs,
    search,
    ...(certificate ? { certificate } : {}),
    ...(scoringPolicy ? { scoringPolicy } : {}),
    evidencePaths,
    tags: uniqueStrings(input.tags ?? []),
    score,
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function createSwarmStrategyTournament(input: FrontierSwarmStrategyTournamentInput = {}): FrontierSwarmStrategyTournament {
  const generatedAt = input.generatedAt ?? Date.now();
  const strategies = (input.strategies ?? []).map(normalizeStrategy);
  const games = (input.games ?? []).map(normalizeGame);
  const scoringPolicy = normalizeScoringPolicy(input.scoringPolicy);
  const matches = (input.matches ?? []).map((match) => normalizeMatch(match, scoringPolicy));
  const strategyIds = uniqueStrings([...strategies.map((strategy) => strategy.id), ...matches.map((match) => match.strategyId)]);
  const gameIds = uniqueStrings([...games.map((game) => game.id), ...matches.map((match) => match.gameId).filter((id): id is string => !!id)]);
  const standings = rankSwarmStrategyStandings(matches, strategyIds);
  const byStrategy = groupSwarmTournamentMatchIds(matches, (match) => match.strategyId, strategyIds);
  const byGame = groupSwarmTournamentMatchIds(matches, (match) => match.gameId ?? 'unscoped', uniqueStrings([...gameIds, 'unscoped']));
  const outcomeCounts = countSwarmTournamentOutcomes(matches);
  const top = standings[0];
  return {
    kind: FRONTIER_SWARM_STRATEGY_TOURNAMENT_KIND,
    version: FRONTIER_SWARM_STRATEGY_TOURNAMENT_VERSION,
    id: input.id ?? 'swarm-strategy-tournament:' + stableHash([strategies, games, matches, scoringPolicy, generatedAt]),
    title: input.title ?? 'Swarm Strategy Tournament',
    generatedAt,
    strategies,
    games,
    matches,
    standings,
    byStrategy,
    byGame,
    scoringPolicy,
    summary: {
      strategyCount: strategies.length,
      gameCount: games.length,
      matchCount: matches.length,
      verifiedCount: matches.filter((match) => isVerifiedOutcome(match.payoff.outcome)).length,
      rejectedCount: matches.filter((match) => isRejectedOutcome(match.payoff.outcome)).length,
      undefinedCount: matches.filter((match) => isUndefinedOutcome(match.payoff.outcome)).length,
      outcomeCounts,
      ...(top ? { topStrategyId: top.strategyId, topScore: top.score } : {})
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

export function querySwarmStrategyTournament(
  tournament: FrontierSwarmStrategyTournament,
  query: FrontierSwarmStrategyTournamentQuery = {}
): FrontierSwarmStrategyTournament {
  const strategyById = new Map(tournament.strategies.map((strategy) => [strategy.id, strategy]));
  const gameById = new Map(tournament.games.map((game) => [game.id, game]));
  const matches = tournament.matches.filter((match) => matchSwarmTournamentQuery(match, query, strategyById, gameById));
  const strategyIds = new Set(matches.map((match) => match.strategyId));
  const gameIds = new Set(matches.map((match) => match.gameId).filter((id): id is string => !!id));
  return createSwarmStrategyTournament({
    id: tournament.id + ':query:' + stableHash(query),
    title: tournament.title + ' Query',
    strategies: tournament.strategies.filter((strategy) => strategyIds.has(strategy.id)),
    games: tournament.games.filter((game) => gameIds.has(game.id)),
    matches,
    scoringPolicy: tournament.scoringPolicy,
    generatedAt: tournament.generatedAt,
    metadata: tournament.metadata
  });
}

function normalizeStrategy(input: FrontierSwarmStrategyInput): FrontierSwarmStrategy {
  return {
    id: normalizeId(input.id, 'strategy id'),
    title: input.title ?? titleFromId(input.id),
    ...(input.family ? { family: input.family } : {}),
    ...(input.lane ? { lane: input.lane } : {}),
    ...(input.description ? { description: input.description } : {}),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeGame(input: FrontierSwarmStrategyGameInput): FrontierSwarmStrategyGame {
  return {
    id: normalizeId(input.id, 'game id'),
    title: input.title ?? titleFromId(input.id),
    ...(input.objective ? { objective: input.objective } : {}),
    fixtures: uniqueStrings(input.fixtures ?? []),
    ownershipRegions: uniqueStrings(input.ownershipRegions ?? []),
    resources: normalizeNumberRecord(input.resources),
    tags: uniqueStrings(input.tags ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeMatch(input: FrontierSwarmStrategyMatchInput, scoringPolicy: FrontierSwarmPayoffScoringPolicy): FrontierSwarmStrategyMatch {
  const payoff = isSwarmPayoffVector(input.payoff)
    ? validateSwarmExistingPayoff(input.payoff, input.strategyId, input.gameId)
    : createSwarmPayoffVector({
      ...input.payoff,
      strategyId: input.strategyId ?? input.payoff.strategyId,
      gameId: input.gameId ?? input.payoff.gameId,
      scoringPolicy: input.payoff.scoringPolicy ?? scoringPolicy
    });
  const id = input.id ?? payoff.matchId ?? 'swarm-strategy-match:' + stableHash([payoff.strategyId, payoff.gameId, payoff.id]);
  return {
    id,
    strategyId: input.strategyId ?? payoff.strategyId,
    ...(input.gameId ?? payoff.gameId ? { gameId: input.gameId ?? payoff.gameId } : {}),
    opponentStrategyIds: uniqueStrings(input.opponentStrategyIds ?? []),
    payoff,
    evidencePaths: uniqueStrings([...(input.evidencePaths ?? []), ...payoff.evidencePaths]),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function normalizeComponents(
  input: FrontierSwarmPayoffVectorInput['components'] = {},
  policies: Record<string, FrontierSwarmPayoffComponentPolicy> = {}
): Record<string, FrontierSwarmPayoffComponent> {
  const out: Record<string, FrontierSwarmPayoffComponent> = {};
  for (const [name, value] of Object.entries(input).sort(([left], [right]) => left.localeCompare(right))) {
    const component = typeof value === 'number' ? { value } : value;
    const policy = policies[name];
    const direction = component.direction ?? policy?.direction ?? 'maximize';
    out[name] = {
      value: finite(component.value),
      normalized: normalizeComponentValue(component.value, direction, policy?.min, policy?.max),
      weight: positive(component.weight, policy?.weight ?? 1),
      direction,
      ...(component.reason ? { reason: component.reason } : {}),
      ...(toJsonObject(component.metadata) ? { metadata: toJsonObject(component.metadata) } : {})
    };
  }
  return out;
}

function normalizeSearch(input: FrontierSwarmPayoffVectorInput['search'] = {}): FrontierSwarmPayoffVector['search'] {
  return {
    attempts: Math.floor(nonNegative(input.attempts)),
    durationMs: nonNegative(input.durationMs),
    tokens: Math.floor(nonNegative(input.tokens)),
    costUsd: nonNegative(input.costUsd),
    exploredStates: Math.floor(nonNegative(input.exploredStates)),
    strategyPath: uniqueStrings(input.strategyPath ?? []),
    evidencePaths: uniqueStrings(input.evidencePaths ?? []),
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}
