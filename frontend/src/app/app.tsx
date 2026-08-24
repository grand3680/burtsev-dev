import { AppProviders } from './providers'
import { AppHeader } from './ui/app-header'
import { AppFooter } from './ui/app-footer'
import { AppRouter } from '@router/app-router'

export function App() {
  return (
    <AppProviders>
      <AppHeader />
      <main>
        <AppRouter />
      </main>
      <AppFooter />
    </AppProviders>
  )
}
