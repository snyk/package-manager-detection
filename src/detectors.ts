import * as fs from 'fs';
import * as pathLib from 'path';
import { DETECTABLE_PACKAGE_MANAGERS, SupportedPackageManager } from './types';
import { isFileCompatible } from './utils';

/**
 * Detects the package manager from a file path
 * Throws an error if the file is not a supported manifest file or validation fails
 *
 * @param file - Path to the manifest file
 * @param featureFlags - Set of enabled feature flags
 * @returns The detected package manager
 * @throws Error if package manager cannot be detected
 */
export function detectPackageManagerFromFile(
  file: string,
  featureFlags: Set<string> = new Set<string>(),
): SupportedPackageManager {
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

  const detectors = DETECTABLE_PACKAGE_MANAGERS.get(key);
  if (
    !detectors ||
    detectors.length === 0 ||
    !isFileCompatible(key, featureFlags)
  ) {
    throw new Error('Could not detect package manager for file: ' + file);
  }

  if (detectors.length === 1 && detectors[0] && !detectors[0].validateContent) {
    return detectors[0].packageManager;
  }

  let content: string | undefined = undefined;
  try {
    if (fs.existsSync(file)) {
      content = fs.readFileSync(file, 'utf-8');
    }
  } catch {
    content = undefined;
  }

  if (!content) {
    const firstDetector = detectors[0];
    if (firstDetector) {
      return firstDetector.packageManager;
    }
    throw new Error('Could not detect package manager for file: ' + file);
  }

  for (const detector of detectors) {
    if (!detector.validateContent || detector.validateContent(content)) {
      return detector.packageManager;
    }
  }

  throw new Error('Could not detect package manager for file: ' + file);
}
