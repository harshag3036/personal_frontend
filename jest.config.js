module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/ui/**/*.{js,jsx}',
    '!src/ui/**/*.stories.js',
    '!src/ui/**/index.js',
    '!src/ui/examples/**',
    '!src/ui/docs/**'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
    '^../../utilities/responsive-props$': '<rootDir>/src/__mocks__/useResponsiveProps.js',
    '^../../utilities/component-extension$': '<rootDir>/src/__mocks__/componentExtension.js',
    '^../../atoms$': '<rootDir>/src/__mocks__/ui-components.js',
    '^../../molecules$': '<rootDir>/src/__mocks__/ui-components.js'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js'
  ]
};
