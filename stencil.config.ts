import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-user-authenticator',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  testing: {
    collectCoverage: true,
    collectCoverageFrom: [
      'src/*/**/*.ts',
      'src/*/**/*.tsx',
      '!src/*/**/*.spec.ts',
      '!src/*/**/*.e2e.ts',
    ]
  }
};
