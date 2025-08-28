import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: ["text-summary", "html"],
  testPathIgnorePatterns: ["/node_modules/"],
};

export default config;
