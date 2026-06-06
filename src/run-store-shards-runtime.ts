import type { FrontierSwarmRunStoreShards, FrontierSwarmRunStoreShardsInput, FrontierSwarmRunStoreShard } from './types.js';
import type { FrontierSwarmJob } from './plan.js';
import { FRONTIER_SWARM_RUN_STORE_SHARDS_KIND, FRONTIER_SWARM_RUN_STORE_SHARDS_VERSION } from './constants.js';
import { slug, stableHash, toJsonObject } from './internal.js';
import { joinPathParts } from './coercion.js';

export function createSwarmRunStoreShards(input: FrontierSwarmRunStoreShardsInput = {}): FrontierSwarmRunStoreShards {
  const generatedAt = input.generatedAt ?? Date.now();
  const root = input.root ?? 'agent-runs/shards';
  const shardSize = Math.max(1, Math.floor(input.shardSize ?? 100));
  const groupBy = input.groupBy ?? 'lane';
  const jobs = input.run?.jobs ?? input.plan?.jobs ?? [];
  const groups = new Map<string, FrontierSwarmJob[]>();
  for (const job of jobs) {
    const key = groupBy === 'none' ? 'all' : groupBy === 'hash' ? String(hashBucket(job.id, shardSize)) : job.lane;
    groups.set(key, [...(groups.get(key) ?? []), job]);
  }
  const shards: FrontierSwarmRunStoreShard[] = [];
  for (const [group, groupJobs] of Array.from(groups.entries()).sort((left, right) => left[0].localeCompare(right[0]))) {
    for (let index = 0; index < groupJobs.length; index += shardSize) {
      const slice = groupJobs.slice(index, index + shardSize);
      const suffix = `${slug(group)}-${Math.floor(index / shardSize)}`;
      const shardRoot = joinPathParts(root, suffix);
      shards.push({
        id: 'swarm-run-store-shard:' + stableHash([input.run?.id, input.plan?.id, group, index, slice.map((job) => job.id)]),
        ...(groupBy === 'lane' ? { lane: group } : {}),
        path: shardRoot,
        eventPath: joinPathParts(shardRoot, 'events.jsonl'),
        resultPath: joinPathParts(shardRoot, 'results.jsonl'),
        checkpointPath: joinPathParts(shardRoot, 'checkpoint.json'),
        jobIds: slice.map((job) => job.id)
      });
    }
  }
  return {
    kind: FRONTIER_SWARM_RUN_STORE_SHARDS_KIND,
    version: FRONTIER_SWARM_RUN_STORE_SHARDS_VERSION,
    id: input.id ?? 'swarm-run-store-shards:' + stableHash([input.run?.id, input.plan?.id, root, shardSize, groupBy, shards, generatedAt]),
    ...(input.run ? { runId: input.run.id } : {}),
    ...(input.plan ? { planId: input.plan.id } : {}),
    root,
    generatedAt,
    groupBy,
    shardSize,
    shards,
    summary: {
      shardCount: shards.length,
      jobCount: jobs.length
    },
    ...(toJsonObject(input.metadata) ? { metadata: toJsonObject(input.metadata) } : {})
  };
}

function hashBucket(value: string, buckets: number): number {
  const hex = stableHash(value).split(':')[1] ?? '0';
  return parseInt(hex, 16) % Math.max(1, buckets);
}
