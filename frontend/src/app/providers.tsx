import type { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { I18nextProvider } from 'react-i18next'
import { apolloClient } from '@shared/api/apollo-client'
import { ThemeProvider } from '@shared/ui/theme-provider'
import { i18n } from './i18n'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>{children}</ThemeProvider>
      </I18nextProvider>
    </ApolloProvider>
  )
}
