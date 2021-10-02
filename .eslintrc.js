module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    'react/display-name': 'off'
  },
  overrides: [ 
    { 
      files: ["*.ts", "*.tsx"],
      rules: { "no-undef": "off" }
    }
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
