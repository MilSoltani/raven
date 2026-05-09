import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  vue: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: 'single',
  },
  ignores: ['**/migrations/*'],
}, {
  rules: {
    'ts/consistent-type-definitions': ['error', 'type'],
    'no-console': ['warn'],
    'antfu/no-top-level-await': ['off'],
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md'],
    }],
  },
})
