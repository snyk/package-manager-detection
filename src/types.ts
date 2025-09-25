export const PNPM_FEATURE_FLAG = 'enablePnpmCli';

export type SupportedPackageManager =
  | 'rubygems'
  | 'npm'
  | 'yarn'
  | 'pnpm'
  | 'maven'
  | 'pip'
  | 'sbt'
  | 'gradle'
  | 'golangdep'
  | 'govendor'
  | 'gomodules'
  | 'nuget'
  | 'paket'
  | 'composer'
  | 'cocoapods'
  | 'poetry'
  | 'hex'
  | 'Unmanaged (C/C++)'
  | 'swift';

export enum SUPPORTED_MANIFEST_FILES {
  GEMFILE = 'Gemfile',
  GEMFILE_LOCK = 'Gemfile.lock',
  GEMSPEC = '.gemspec',
  PACKAGE_LOCK_JSON = 'package-lock.json',
  POM_XML = 'pom.xml',
  JAR = '.jar',
  WAR = '.war',
  BUILD_GRADLE = 'build.gradle',
  BUILD_GRADLE_KTS = 'build.gradle.kts',
  BUILD_SBT = 'build.sbt',
  YARN_LOCK = 'yarn.lock',
  PNPM_LOCK = 'pnpm-lock.yaml',
  PACKAGE_JSON = 'package.json',
  PIPFILE = 'Pipfile',
  SETUP_PY = 'setup.py',
  REQUIREMENTS_TXT = 'requirements.txt',
  GOPKG_LOCK = 'Gopkg.lock',
  GO_MOD = 'go.mod',
  VENDOR_JSON = 'vendor.json',
  PROJECT_ASSETS_JSON = 'project.assets.json',
  PACKAGES_CONFIG = 'packages.config',
  PROJECT_JSON = 'project.json',
  PAKET_DEPENDENCIES = 'paket.dependencies',
  COMPOSER_LOCK = 'composer.lock',
  PODFILE_LOCK = 'Podfile.lock',
  COCOAPODS_PODFILE_YAML = 'CocoaPods.podfile.yaml',
  COCOAPODS_PODFILE = 'CocoaPods.podfile',
  PODFILE = 'Podfile',
  POETRY_LOCK = 'poetry.lock',
  MIX_EXS = 'mix.exs',
  PACKAGE_SWIFT = 'Package.swift',
}

export type PackageManagerDetector = {
  packageManager: SupportedPackageManager;
  /** Returns true if the content is valid for the package manager */
  validateContent?: (content: string) => boolean;
};

export const DETECTABLE_PACKAGE_MANAGERS = new Map<
  string,
  PackageManagerDetector[]
>([
  [SUPPORTED_MANIFEST_FILES.GEMFILE, [{ packageManager: 'rubygems' }]],
  [SUPPORTED_MANIFEST_FILES.GEMFILE_LOCK, [{ packageManager: 'rubygems' }]],
  [SUPPORTED_MANIFEST_FILES.GEMSPEC, [{ packageManager: 'rubygems' }]],
  [SUPPORTED_MANIFEST_FILES.PACKAGE_LOCK_JSON, [{ packageManager: 'npm' }]],
  [SUPPORTED_MANIFEST_FILES.POM_XML, [{ packageManager: 'maven' }]],
  [SUPPORTED_MANIFEST_FILES.JAR, [{ packageManager: 'maven' }]],
  [SUPPORTED_MANIFEST_FILES.WAR, [{ packageManager: 'maven' }]],
  [SUPPORTED_MANIFEST_FILES.BUILD_GRADLE, [{ packageManager: 'gradle' }]],
  [SUPPORTED_MANIFEST_FILES.BUILD_GRADLE_KTS, [{ packageManager: 'gradle' }]],
  [SUPPORTED_MANIFEST_FILES.BUILD_SBT, [{ packageManager: 'sbt' }]],
  [SUPPORTED_MANIFEST_FILES.YARN_LOCK, [{ packageManager: 'yarn' }]],
  [SUPPORTED_MANIFEST_FILES.PNPM_LOCK, [{ packageManager: 'pnpm' }]],
  [
    SUPPORTED_MANIFEST_FILES.PACKAGE_JSON,
    [
      {
        packageManager: 'npm',
        validateContent: (content: string): boolean => {
          try {
            const json = JSON.parse(content);
            // Unity field is recommended, name and version are the only required fields in unity package.json
            // but these are also required fields in npm package.json so not exhaustive check
            return !(json.unity || json.unityRelease);
          } catch {
            return true;
          }
        },
      },
    ],
  ],
  [SUPPORTED_MANIFEST_FILES.PIPFILE, [{ packageManager: 'pip' }]],
  [SUPPORTED_MANIFEST_FILES.SETUP_PY, [{ packageManager: 'pip' }]],
  [SUPPORTED_MANIFEST_FILES.REQUIREMENTS_TXT, [{ packageManager: 'pip' }]],
  [SUPPORTED_MANIFEST_FILES.GOPKG_LOCK, [{ packageManager: 'golangdep' }]],
  [SUPPORTED_MANIFEST_FILES.GO_MOD, [{ packageManager: 'gomodules' }]],
  [SUPPORTED_MANIFEST_FILES.VENDOR_JSON, [{ packageManager: 'govendor' }]],
  [SUPPORTED_MANIFEST_FILES.PROJECT_ASSETS_JSON, [{ packageManager: 'nuget' }]],
  [SUPPORTED_MANIFEST_FILES.PACKAGES_CONFIG, [{ packageManager: 'nuget' }]],
  [
    SUPPORTED_MANIFEST_FILES.PROJECT_JSON,
    [
      {
        packageManager: 'nuget',
        validateContent: (content: string): boolean => {
          try {
            const json = JSON.parse(content);
            return !!(
              json.dependencies ||
              json.frameworks ||
              json.runtimes ||
              json.supports
            );
          } catch {
            return false;
          }
        },
      },
    ],
  ],
  [SUPPORTED_MANIFEST_FILES.PAKET_DEPENDENCIES, [{ packageManager: 'paket' }]],
  [SUPPORTED_MANIFEST_FILES.COMPOSER_LOCK, [{ packageManager: 'composer' }]],
  [SUPPORTED_MANIFEST_FILES.PODFILE_LOCK, [{ packageManager: 'cocoapods' }]],
  [
    SUPPORTED_MANIFEST_FILES.COCOAPODS_PODFILE_YAML,
    [{ packageManager: 'cocoapods' }],
  ],
  [
    SUPPORTED_MANIFEST_FILES.COCOAPODS_PODFILE,
    [{ packageManager: 'cocoapods' }],
  ],
  [SUPPORTED_MANIFEST_FILES.PODFILE, [{ packageManager: 'cocoapods' }]],
  [SUPPORTED_MANIFEST_FILES.POETRY_LOCK, [{ packageManager: 'poetry' }]],
  [SUPPORTED_MANIFEST_FILES.MIX_EXS, [{ packageManager: 'hex' }]],
  [SUPPORTED_MANIFEST_FILES.PACKAGE_SWIFT, [{ packageManager: 'swift' }]],
]);
