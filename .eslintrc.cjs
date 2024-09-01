/* eslint-env node, es2018 */
module.exports = {
  extends: [require.resolve('@jcoreio/toolchain/eslintConfig.cjs')],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
  },
  overrides: [
    {
      files: ['src/**/*.spec.ts'],
      rules: {
        '@jcoreio/implicit-dependencies/no-implicit': [
          'error',
          {
            dev: true,
            peer: true,
            optional: true,
          },
        ],
      },
    },
  ],
}
