import { HomePage } from '@domains/home/pages/home-page'
import { CapabilitiesPage } from '@domains/capabilities/pages/capabilities-page'
import { DataFetchingPage } from '@domains/data-fetching/pages/data-fetching-page'
import { TimelinePage } from '@domains/timeline/pages/timeline-page'
import { ContactsPage } from '@domains/contacts/pages/contacts-page'

/**
 * Одностраничник со скролл-секциями. Порядок = порядок разделов на странице.
 */
export function AppRouter() {
  return (
    <>
      <HomePage />
      <CapabilitiesPage />
      <DataFetchingPage />
      <TimelinePage />
      <ContactsPage />
    </>
  )
}
