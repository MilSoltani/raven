import antfu from '@antfu/eslint-config'
import tanstackQuery from '@tanstack/eslint-plugin-query'

export default antfu(
  {
    type: 'app',
    vue: false,
    react: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: false,
      quotes: 'single',
      jsx: true,
    },
    ignores: ['**/migrations/*'],
  },

  {
    rules: {
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-console': ['warn'],
      'antfu/no-top-level-await': ['off'],
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1 }],
    },
  },

  {
    plugins: {
      '@tanstack/query': tanstackQuery,
    },
    rules: {
      ...tanstackQuery.configs.recommended.rules,
    },
  },
)