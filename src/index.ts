import { DETECTABLE_PACKAGE_MANAGERS, SupportedPackageManagers } from './types';
import * as pathLib from 'path';
import { isFileCompatible } from './utils';

function isKeyOfDetectablePackageManagers(
  key: string,
): key is keyof typeof DETECTABLE_PACKAGE_MANAGERS {
  return key in DETECTABLE_PACKAGE_MANAGERS;
}

export function detectPackageManagerFromFile(
  file: string,
  featureFlags: Set<string> = new Set<string>(),
): SupportedPackageManagers {
  let key = pathLib.basename(file);

  // TODO: fix this to use glob matching instead
  // like *.gemspec
  if (/\.gemspec$/.test(key)) {
    key = '.gemspec';
  }

  if (/\.jar$/.test(key)) {
    key = '.jar';
  }

  if (/\.war$/.test(key)) {
    key = '.war';
  }

  if (
    !isKeyOfDetectablePackageManagers(key) ||
    !isFileCompatible(key, featureFlags)
  ) {
    throw new Error('Could not detect package manager for file: ' + file);
  }

  return DETECTABLE_PACKAGE_MANAGERS[key];
}
