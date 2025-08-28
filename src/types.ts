export const PNPM_FEATURE_FLAG = 'enablePnpmCli';

export type SupportedPackageManagers =
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

// when file is specified with --file, we look it up here
// this is also used when --all-projects flag is enabled and auto detection plugin is triggered
export const DETECTABLE_PACKAGE_MANAGERS: {
  [key in SUPPORTED_MANIFEST_FILES]: SupportedPackageManagers;
} = {
  [SUPPORTED_MANIFEST_FILES.GEMFILE]: 'rubygems',
  [SUPPORTED_MANIFEST_FILES.GEMFILE_LOCK]: 'rubygems',
  [SUPPORTED_MANIFEST_FILES.GEMSPEC]: 'rubygems',
  [SUPPORTED_MANIFEST_FILES.PACKAGE_LOCK_JSON]: 'npm',
  [SUPPORTED_MANIFEST_FILES.POM_XML]: 'maven',
  [SUPPORTED_MANIFEST_FILES.JAR]: 'maven',
  [SUPPORTED_MANIFEST_FILES.WAR]: 'maven',
  [SUPPORTED_MANIFEST_FILES.BUILD_GRADLE]: 'gradle',
  [SUPPORTED_MANIFEST_FILES.BUILD_GRADLE_KTS]: 'gradle',
  [SUPPORTED_MANIFEST_FILES.BUILD_SBT]: 'sbt',
  [SUPPORTED_MANIFEST_FILES.YARN_LOCK]: 'yarn',
  [SUPPORTED_MANIFEST_FILES.PNPM_LOCK]: 'pnpm',
  [SUPPORTED_MANIFEST_FILES.PACKAGE_JSON]: 'npm',
  [SUPPORTED_MANIFEST_FILES.PIPFILE]: 'pip',
  [SUPPORTED_MANIFEST_FILES.SETUP_PY]: 'pip',
  [SUPPORTED_MANIFEST_FILES.REQUIREMENTS_TXT]: 'pip',
  [SUPPORTED_MANIFEST_FILES.GOPKG_LOCK]: 'golangdep',
  [SUPPORTED_MANIFEST_FILES.GO_MOD]: 'gomodules',
  [SUPPORTED_MANIFEST_FILES.VENDOR_JSON]: 'govendor',
  [SUPPORTED_MANIFEST_FILES.PROJECT_ASSETS_JSON]: 'nuget',
  [SUPPORTED_MANIFEST_FILES.PACKAGES_CONFIG]: 'nuget',
  [SUPPORTED_MANIFEST_FILES.PROJECT_JSON]: 'nuget',
  [SUPPORTED_MANIFEST_FILES.PAKET_DEPENDENCIES]: 'paket',
  [SUPPORTED_MANIFEST_FILES.COMPOSER_LOCK]: 'composer',
  [SUPPORTED_MANIFEST_FILES.PODFILE_LOCK]: 'cocoapods',
  [SUPPORTED_MANIFEST_FILES.COCOAPODS_PODFILE_YAML]: 'cocoapods',
  [SUPPORTED_MANIFEST_FILES.COCOAPODS_PODFILE]: 'cocoapods',
  [SUPPORTED_MANIFEST_FILES.PODFILE]: 'cocoapods',
  [SUPPORTED_MANIFEST_FILES.POETRY_LOCK]: 'poetry',
  [SUPPORTED_MANIFEST_FILES.MIX_EXS]: 'hex',
  [SUPPORTED_MANIFEST_FILES.PACKAGE_SWIFT]: 'swift',
};
