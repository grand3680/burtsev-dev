import type { CodegenConfig } from '@graphql-codegen/cli'

/**
 * Авто-генерация типизированных Apollo-хуков из контракта бэкенда (schema.gql).
 * Результат коммитим в src/shared/api/generated.ts, исключаем из lint/prettier,
 * но продолжаем тайпчекать.
 */
const config: CodegenConfig = {
  overwrite: true,
  schema: '../backend/schema.gql',
  documents: ['src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    'src/shared/api/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        reactApolloVersion: 3,
        scalars: { DateTime: 'string' },
        avoidOptionals: { field: true }
      }
    }
  }
}

export default config
