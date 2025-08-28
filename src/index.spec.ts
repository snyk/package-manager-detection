import { detectPackageManagerFromFile } from './index';
import {
  PNPM_FEATURE_FLAG,
  SUPPORTED_MANIFEST_FILES,
  SupportedPackageManagers,
} from './types';

describe('detectPackageManagerFromFile', () => {
  describe('basic file detection', () => {
    const testCases: Array<{
      file: SUPPORTED_MANIFEST_FILES;
      expected: SupportedPackageManagers;
    }> = [
      // npm
      { file: SUPPORTED_MANIFEST_FILES.PACKAGE_JSON, expected: 'npm' },
      { file: SUPPORTED_MANIFEST_FILES.PACKAGE_LOCK_JSON, expected: 'npm' },
      // yarn
      { file: SUPPORTED_MANIFEST_FILES.YARN_LOCK, expected: 'yarn' },
      // rubygems
      { file: SUPPORTED_MANIFEST_FILES.GEMFILE, expected: 'rubygems' },
      { file: SUPPORTED_MANIFEST_FILES.GEMFILE_LOCK, expected: 'rubygems' },
      { file: SUPPORTED_MANIFEST_FILES.GEMSPEC, expected: 'rubygems' },
      // maven
      { file: SUPPORTED_MANIFEST_FILES.POM_XML, expected: 'maven' },
      { file: SUPPORTED_MANIFEST_FILES.JAR, expected: 'maven' },
      { file: SUPPORTED_MANIFEST_FILES.WAR, expected: 'maven' },
      // gradle
      { file: SUPPORTED_MANIFEST_FILES.BUILD_GRADLE, expected: 'gradle' },
      { file: SUPPORTED_MANIFEST_FILES.BUILD_GRADLE_KTS, expected: 'gradle' },
      // sbt
      { file: SUPPORTED_MANIFEST_FILES.BUILD_SBT, expected: 'sbt' },
      // pip
      { file: SUPPORTED_MANIFEST_FILES.PIPFILE, expected: 'pip' },
      { file: SUPPORTED_MANIFEST_FILES.SETUP_PY, expected: 'pip' },
      { file: SUPPORTED_MANIFEST_FILES.REQUIREMENTS_TXT, expected: 'pip' },
      // golang
      { file: SUPPORTED_MANIFEST_FILES.GOPKG_LOCK, expected: 'golangdep' },
      { file: SUPPORTED_MANIFEST_FILES.GO_MOD, expected: 'gomodules' },
      { file: SUPPORTED_MANIFEST_FILES.VENDOR_JSON, expected: 'govendor' },
      // nuget
      { file: SUPPORTED_MANIFEST_FILES.PROJECT_ASSETS_JSON, expected: 'nuget' },
      { file: SUPPORTED_MANIFEST_FILES.PACKAGES_CONFIG, expected: 'nuget' },
      { file: SUPPORTED_MANIFEST_FILES.PROJECT_JSON, expected: 'nuget' },
      // paket
      { file: SUPPORTED_MANIFEST_FILES.PAKET_DEPENDENCIES, expected: 'paket' },
      // composer
      { file: SUPPORTED_MANIFEST_FILES.COMPOSER_LOCK, expected: 'composer' },
      // cocoapods
      { file: SUPPORTED_MANIFEST_FILES.PODFILE_LOCK, expected: 'cocoapods' },
      {
        file: SUPPORTED_MANIFEST_FILES.COCOAPODS_PODFILE_YAML,
        expected: 'cocoapods',
      },
      {
        file: SUPPORTED_MANIFEST_FILES.COCOAPODS_PODFILE,
        expected: 'cocoapods',
      },
      { file: SUPPORTED_MANIFEST_FILES.PODFILE, expected: 'cocoapods' },
      // poetry
      { file: SUPPORTED_MANIFEST_FILES.POETRY_LOCK, expected: 'poetry' },
      // hex
      { file: SUPPORTED_MANIFEST_FILES.MIX_EXS, expected: 'hex' },
      // swift
      { file: SUPPORTED_MANIFEST_FILES.PACKAGE_SWIFT, expected: 'swift' },
    ];

    testCases.forEach(({ file, expected }) => {
      it(`should detect ${expected} from ${file}`, () => {
        // Handle special cases that need actual filenames
        let testFile: string = file;
        if (file === SUPPORTED_MANIFEST_FILES.GEMSPEC) {
          testFile = 'example.gemspec';
        } else if (file === SUPPORTED_MANIFEST_FILES.JAR) {
          testFile = 'app.jar';
        } else if (file === SUPPORTED_MANIFEST_FILES.WAR) {
          testFile = 'app.war';
        }

        const result = detectPackageManagerFromFile(testFile);
        expect(result).toBe(expected);
      });
    });

    it('should detect pnpm from pnpm-lock.yaml when feature flag enabled', () => {
      const featureFlags = new Set([PNPM_FEATURE_FLAG]);
      const result = detectPackageManagerFromFile(
        'pnpm-lock.yaml',
        featureFlags,
      );
      expect(result).toBe('pnpm');
    });
  });

  describe('feature flag handling', () => {
    it('should allow pnpm detection when feature flag is enabled', () => {
      const featureFlags = new Set([PNPM_FEATURE_FLAG]);
      const result = detectPackageManagerFromFile(
        'pnpm-lock.yaml',
        featureFlags,
      );
      expect(result).toBe('pnpm');
    });

    it('should throw error for pnpm when feature flag is disabled', () => {
      const featureFlags = new Set<string>();
      expect(() => {
        detectPackageManagerFromFile('pnpm-lock.yaml', featureFlags);
      }).toThrow('Could not detect package manager for file: pnpm-lock.yaml');
    });

    it('should work with empty feature flags set', () => {
      const result = detectPackageManagerFromFile('package.json', new Set());
      expect(result).toBe('npm');
    });

    it('should work with undefined feature flags', () => {
      const result = detectPackageManagerFromFile('package.json');
      expect(result).toBe('npm');
    });
  });

  describe('error handling', () => {
    it('should throw error for unsupported file types', () => {
      expect(() => {
        detectPackageManagerFromFile('unsupported.txt');
      }).toThrow('Could not detect package manager for file: unsupported.txt');
    });

    it('should throw error for empty filename', () => {
      expect(() => {
        detectPackageManagerFromFile('');
      }).toThrow('Could not detect package manager for file: ');
    });

    it('should throw error for null filename', () => {
      expect(() => {
        detectPackageManagerFromFile(null as unknown as string);
      }).toThrow('The "path" argument must be of type string. Received null');
    });
  });

  describe('file path handling', () => {
    const pathTestCases = [
      { path: '/path/to/package.json', description: 'full file paths' },
      { path: './src/package.json', description: 'relative file paths' },
      { path: 'C:/path/to/package.json', description: 'Windows-style paths' },
    ];

    pathTestCases.forEach(({ path, description }) => {
      it(`should work with ${description}`, () => {
        const result = detectPackageManagerFromFile(path);
        expect(result).toBe('npm');
      });
    });
  });
});
