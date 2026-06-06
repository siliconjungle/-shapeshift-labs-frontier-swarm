import { foundationPackages } from './package-readme-catalog-foundation.mjs';
import { languagePackages } from './package-readme-catalog-language.mjs';
import { runtimePackages } from './package-readme-catalog-runtime.mjs';
import { experiencePackages } from './package-readme-catalog-experience.mjs';
import { collaborationPackages } from './package-readme-catalog-collaboration.mjs';

export const packages = [
  ...foundationPackages,
  ...languagePackages,
  ...runtimePackages,
  ...experiencePackages,
  ...collaborationPackages
];
