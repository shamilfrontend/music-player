/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.eslint.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
      },
    },
  },
  rules: {
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'always',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'vite.config.ts',
          '**/vite.config.ts',
          '**/*.config.ts',
          '**/*.config.js',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['airbnb-typescript/base', 'prettier'],
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
    },
    {
      files: ['vite.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true, peerDependencies: false, optionalDependencies: false },
        ],
      },
    },
  ],
};
