const path = require('path')

// setting timezone for jest execution to ensure proper use of vuejs intl filter
process.env.TZ = 'UTC'

module.exports = {
  // cache: false,
  testURL: 'http://localhost/',
  rootDir: path.resolve(__dirname, '../'),
  testEnvironment: 'jsdom',
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  transform: {
    '.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.+\\.vue$': '<rootDir>/node_modules/vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': '<rootDir>/node_modules/jest-transform-stub'
  },
  transformIgnorePatterns: [
    // TODO: find better way - negation prevents use of other patterns
    '<rootDir>/node_modules/(?!vuetify)'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**'
  ],
  coverageReporters: ['text-summary', 'text', 'cobertura', 'html']
}
