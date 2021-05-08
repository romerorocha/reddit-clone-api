module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/{!(index),}/{!(docs), }.ts"],
};
