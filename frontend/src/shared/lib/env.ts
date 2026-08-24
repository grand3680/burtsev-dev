/** Единая точка чтения переменных окружения Vite. */
export const env = {
  graphqlUrl: import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000/graphql'
}

/** Базовый URL бэкенда (без /graphql) — для REST/Swagger. */
export function backendBaseUrl(): string {
  return env.graphqlUrl.replace(/\/graphql\/?$/, '')
}
