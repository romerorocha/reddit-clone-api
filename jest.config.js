module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  testPathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/api-docs/",
    "<rootDir>/node_modules/",
  ],
  collectCoverageFrom: [
    "src/{!(index),}/{!(*Controller),}.ts",
    "!src/middleware/*.ts",
  ],
  moduleDirectories: ["node_modules", "src"],
  modulePathIgnorePatterns: ["<rootDir>/{build,api-docs}/"],
};
