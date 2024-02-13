module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/api-docs/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*Controller.ts',
    '!src/index.ts',
    '!src/middleware/*.ts',
  ],
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: ['<rootDir>/{build,api-docs}/'],
}
