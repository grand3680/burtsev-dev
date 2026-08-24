import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import boundaries from 'eslint-plugin-boundaries'
import checkFile from 'eslint-plugin-check-file'
import importX from 'eslint-plugin-import-x'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'src/shared/api/generated.ts',
      'src/shared/api/rest-schema.ts'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      boundaries,
      'check-file': checkFile,
      'import-x': importX
    },
    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/*' },
        { type: 'domain', pattern: 'src/domains/*', capture: ['domain'] },
        { type: 'app', pattern: 'src/app/*' },
        { type: 'router', pattern: 'src/router/*' }
      ],
      'import-x/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.app.json' }
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'import-x/no-unresolved': 'error',
      'import-x/no-cycle': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } }
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'import', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow'
        },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase'] },
        { selector: 'objectLiteralProperty', format: null },
        { selector: 'typeProperty', format: null }
      ],

      'boundaries/entry-point': 'off',
      'boundaries/external': 'off',
      'boundaries/no-private': 'off',
      'boundaries/no-unknown': 'off',
      'boundaries/no-unknown-files': 'off',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: ['shared'], allow: ['shared'] },
            {
              from: ['domain'],
              allow: ['shared', ['domain', { domain: '${from.domain}' }]]
            },
            { from: ['app'], allow: ['shared', 'domain', 'router'] },
            { from: ['router'], allow: ['shared', 'domain'] }
          ]
        }
      ],

      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE'
        },
        { ignoreMiddleExtensions: true }
      ],
      'check-file/folder-naming-convention': ['error', { 'src/**/': 'KEBAB_CASE' }]
    }
  },
  {
    // Тесты и конфиги — послабления.
    files: ['**/*.test.{ts,tsx}', 'src/test/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off'
    }
  },
  {
    // JS-конфиги вне TS-проекта: отключаем правила, требующие типовой информации.
    files: ['**/*.{js,cjs,mjs}'],
    ...tseslint.configs.disableTypeChecked
  },
  prettier
)
