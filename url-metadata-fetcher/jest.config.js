/** @type {import{'jest'}.Config} */

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'babel-jest',
    '^.+\\.(css)$': '<rootDir>/config/jest/fileTransform.js',
  },
}

module.exports = config
