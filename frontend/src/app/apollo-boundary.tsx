import type { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@shared/api/apollo-client'

/**
 * Apollo нужен только секциям ниже сгиба. Выносим провайдер (и весь чанк
 * @apollo/client, ~63 КБ gzip) сюда и грузим лениво, чтобы он не висел в
 * начальном критическом пути. Все секции делят один и тот же клиент/кэш.
 */
export default function ApolloBoundary({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
