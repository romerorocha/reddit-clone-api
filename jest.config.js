module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/{!(index),}/{!(*Controller),}.ts",
    "!src/middleware/*.ts",
  ],
  moduleDirectories: ["node_modules", "src"],
  modulePathIgnorePatterns: ["<rootDir>/{build,api-docs}/"],
};
