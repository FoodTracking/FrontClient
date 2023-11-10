/* eslint-disable prettier/prettier */
module.exports = {
  root: true,
  extends: ['universe', 'universe/shared/typescript-analysis'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],

  rules: {
    'prettier/prettier': 'off',
  },
};
