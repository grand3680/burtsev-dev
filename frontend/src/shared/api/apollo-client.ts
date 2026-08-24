import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { env } from '@shared/lib/env'
import { getStoredLanguage } from '@shared/i18n/language-storage'

/**
 * Цепочка линков Apollo — это тот самый «интерсептор», который визуализирует
 * секция data-fetching: язык-хедер → лог ошибок → HTTP-запрос.
 */
const languageLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }: { headers?: Record<string, string> }) => ({
    headers: { ...headers, 'x-lang': getStoredLanguage() }
  }))
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      console.warn(`[GraphQL] ${error.message}`)
    }
  }
  if (networkError) {
    console.warn(`[Network] ${networkError.message}`)
  }
})

const httpLink = new HttpLink({ uri: env.graphqlUrl })

export const apolloClient = new ApolloClient({
  link: from([languageLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' }
  }
})
