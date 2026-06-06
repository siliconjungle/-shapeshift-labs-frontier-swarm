import {
  createMeasure,
  createPackageBenchPaths,
  parseArgs,
  printBenchReport,
  readPackageVersion,
  readPositiveInt,
  resolveOutPath,
  writeBenchReport
} from './package-bench-runtime.mjs';
import { createPackageBenchRows } from './package-bench-rows.mjs';

const { packageDir, repoRoot } = createPackageBenchPaths(import.meta.url);
const args = parseArgs(process.argv.slice(2));
const taskCount = readPositiveInt(args.tasks, 1000);
const rounds = readPositiveInt(args.rounds, 30);
const outPath = resolveOutPath(repoRoot, args.out);
const rows = createPackageBenchRows({
  taskCount,
  measure: createMeasure(rounds)
});

const report = {
  package: '@shapeshift-labs/frontier-swarm',
  version: readPackageVersion(packageDir),
  generatedAt: new Date().toISOString(),
  node: process.version,
  platform: process.platform + ' ' + process.arch,
  taskCount,
  rounds,
  rows
};

writeBenchReport(report, outPath);
printBenchReport(report, { outPath, repoRoot });
