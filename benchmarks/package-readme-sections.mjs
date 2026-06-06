import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, '..');
const self = fileURLToPath(import.meta.url);
const centralCandidates = [
  process.env.FRONTIER_PACKAGE_README_SCRIPT,
  path.resolve(packageRoot, '..', 'json-diff', 'benchmarks', 'package-readme-sections.js'),
  path.resolve(packageRoot, '..', '..', 'benchmarks', 'package-readme-sections.js')
].filter(Boolean);

let delegated = false;
for (const candidate of centralCandidates) {
  const resolved = path.resolve(candidate);
  if (resolved !== self && fs.existsSync(resolved)) {
    await import(pathToFileURL(resolved).href);
    delegated = true;
    break;
  }
}

if (!delegated) {
  const { packages } = await import('./package-readme-catalog.mjs');
  const { renderRelatedPackages, replaceOrInsertHeadingSection } = await import('./package-readme-render.mjs');
  const check = process.argv.slice(2).includes('--check');
  const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
  const current = packages.find((entry) => entry.name === packageJson.name);
  if (!current) throw new Error('unknown Frontier package in package.json: ' + packageJson.name);
  const readmePath = path.join(packageRoot, 'README.md');
  const currentText = fs.readFileSync(readmePath, 'utf8');
  const nextText = replaceOrInsertHeadingSection(currentText, '## Related Packages', renderRelatedPackages(packages, current));
  if (currentText !== nextText) {
    if (check) {
      console.error('README package-family sections are stale.');
      console.error('Run npm run readme:packages to refresh README.md.');
      process.exit(1);
    }
    fs.writeFileSync(readmePath, nextText);
  }
}
