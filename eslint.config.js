import globals from 'globals';

export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      indent: ['error', 2],
      semi: 'error',
      'prefer-const': 'error',
      'operator-linebreak': ['error', 'before'],
      'implicit-arrow-linebreak': ['error', 'beside'],
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'no-shadow': 'error',
      'block-spacing': 'error',
      'object-curly-spacing': ['error', 'always'],
      'function-paren-newline': ['error', 'multiline'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'linebreak-style': ['error', 'unix'],
    },
  },
];
