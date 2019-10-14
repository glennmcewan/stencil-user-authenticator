const path = require('path');
const projectDir = path.join(__dirname, '..');
const stencilDir = path.join(projectDir, 'node_modules', '@stencil', 'core');
const stencilTestingDir = path.join(stencilDir, 'testing');
const stencilDistDir = path.join(stencilDir, 'dist');

module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json'
  ],
  moduleNameMapper: {
    "^@stencil/core/build-conditionals$": path.join(stencilDistDir, 'testing', 'build-conditionals'),
    "^@stencil/core/cli$": path.join(stencilDistDir, 'cli'),
    "^@stencil/core/compiler$": path.join(stencilDir, 'compiler'),
    "^@stencil/core/internal$": path.join(stencilDir, 'internal'),
    "^@stencil/core/mock-doc$": path.join(stencilDistDir, 'mock-doc'),
    "^@stencil/core/platform$": path.join(stencilDistDir, 'testing', 'platform'),
    "^@stencil/core/sys$": path.join(stencilDistDir, 'sys', 'node'),
    "^@stencil/core/testing$": path.join(stencilDistDir, 'testing'),
    "^@stencil/core/utils$": path.join(stencilDistDir, 'utils'),
    "^@stencil/core$": path.join(stencilDistDir, 'testing', 'core')
  },
  globalSetup: path.join(projectDir, 'node_modules', 'jest-environment-puppeteer', 'setup'),
  globalTeardown: path.join(projectDir, 'node_modules', 'jest-environment-puppeteer', 'teardown'),
  setupFilesAfterEnv: [
    path.join(stencilTestingDir, 'jest-setuptestframework.js'),
    path.join(projectDir, 'node_modules', 'expect-puppeteer', 'lib', 'index.js'),
  ],
  testEnvironment: path.join(projectDir, 'node_modules', 'jest-environment-puppeteer', 'index.js'),
  testPathIgnorePatterns: [
    '/.stencil',
    '/.vscode',
    '/dist',
    '/node_modules',
    '/www'
  ],
  maxConcurrency: 1,
  testRegex: '(/__tests__/.*|\\.?(test|spec))\\.(tsx?|ts?|jsx?|js?)$',
  transform: {
    '^.+\\.(ts|tsx|jsx)$': path.join(stencilTestingDir, 'jest-preprocessor.js')
  }
};
