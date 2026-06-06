import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';

export function createPackageBenchPaths(metaUrl) {
  const dirname = path.dirname(fileURLToPath(metaUrl));
  const packageDir = path.resolve(dirname, '..');
  return {
    packageDir,
    repoRoot: path.basename(path.dirname(packageDir)) === 'packages'
      ? path.resolve(packageDir, '..', '..')
      : packageDir
  };
}

export function createMeasure(rounds) {
  return function measure(fixture, operationsPerRound, fn) {
    const samples = [];
    let checksum = 0;
    for (let round = 0; round < rounds; round += 1) {
      const start = performance.now();
      for (let op = 0; op < operationsPerRound; op += 1) checksum += Number(fn()) || 0;
      const elapsed = performance.now() - start;
      samples.push((elapsed * 1000) / operationsPerRound);
    }
    samples.sort((a, b) => a - b);
    return {
      fixture,
      operationsPerRound,
      medianUs: percentile(samples, 0.5),
      p95Us: percentile(samples, 0.95),
      checksum
    };
  };
}

export function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--out') out.out = argv[++i];
    else if (argv[i] === '--tasks') out.tasks = argv[++i];
    else if (argv[i] === '--rounds') out.rounds = argv[++i];
  }
  return out;
}

export function readPositiveInt(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export function resolveOutPath(repoRoot, out) {
  return out ? path.resolve(repoRoot, out) : null;
}

export function readPackageVersion(packageDir) {
  return JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8')).version;
}

export function writeBenchReport(report, outPath) {
  if (!outPath) return;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
}

export function printBenchReport(report, { outPath, repoRoot }) {
  console.log(report.package + ' package benchmark');
  console.log('Node ' + report.node + ' on ' + report.platform + ', tasks=' + report.taskCount + ', rounds=' + report.rounds);
  console.log('These are Frontier-only package measurements, not competitor comparisons.');
  console.log('');
  console.log(padRight('Fixture', 30) + padLeft('Median', 12) + padLeft('p95', 12));
  for (const row of report.rows) {
    console.log(padRight(row.fixture, 30) + padLeft(formatUs(row.medianUs), 12) + padLeft(formatUs(row.p95Us), 12));
  }
  if (outPath) console.log('\nwrote ' + path.relative(repoRoot, outPath));
}

export function formatUs(value) {
  if (value >= 1000) return (value / 1000).toFixed(2) + 'ms';
  return value.toFixed(2) + 'us';
}

function padRight(value, size) {
  return String(value).padEnd(size);
}

function padLeft(value, size) {
  return String(value).padStart(size);
}

function percentile(sorted, pct) {
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * pct))];
}
