import { SUPPORTED_MANIFEST_FILES, PNPM_FEATURE_FLAG } from './types';

export function isFileCompatible(
  file: string,
  featureFlags: Set<string> = new Set<string>(),
) {
  if (
    file === SUPPORTED_MANIFEST_FILES.PNPM_LOCK &&
    !featureFlags.has(PNPM_FEATURE_FLAG)
  ) {
    return false;
  }
  return true;
}
