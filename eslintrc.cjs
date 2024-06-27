module.exports = {
  ignorePatterns: ['node_modules/', 'dist/', 'html/'], // Files to ignore
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'airbnb-base',
    'plugin:prettier/recommended', // Enable prettier plugin
  ],
  plugins: ['import', 'prettier'], // Ensure necessary plugins are included
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-undef': 'error',
    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'error',
    'no-shadow': 'error',
    indent: ['error', 4],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
    'arrow-body-style': 'warn',
    'no-var': 'error',
    'prefer-const': 'warn',
  },
  overrides: [
    {
      files: ['*.cjs'],
      rules: {
        quotes: ['off', 'backtick'], // Adjust rules for CommonJS files if needed
      },
    },
  ],
};
