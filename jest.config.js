module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/{!(index),}/{!(*Controller),}.ts"],
};
