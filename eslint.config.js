import globals from 'globals';

export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
    },
  },
];
