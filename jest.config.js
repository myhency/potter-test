// /** @type {import('@jest/types').Config.InitialOptions} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   verbose: true,
//   testMatch: ["**/*.test.ts", "**/*.spec.ts"],
//   testPathIgnorePatterns: ["dist/"],
//   globals: {
//     "ts-jest": {
//       tsconfig: {
//         importHelpers: true,
//       },
//       diagnostics: true,
//     },
//   },
//   globalSetup: "./test/context/globalSetup.ts",
//   setupFilesAfterEnv: [
//     "./test/context/layers.ts",
//     "./test/context/matchers.ts",
//     "./test/context/sync.ts",
//     "./test/context/api.ts",
//   ],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
// };


/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  globals: {
    "ts-jest": {
      tsconfig: {
        importHelpers: true,
      },
      diagnostics: true,
    },
  },
  globalSetup: "./test/context/globalSetup.ts",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = config;