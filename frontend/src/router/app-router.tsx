import { lazy } from 'react'
import { HomePage } from '@domains/home/pages/home-page'
import { LazySection } from '@shared/ui/lazy-section'

const ApolloBoundary = lazy(() => import('@app/apollo-boundary'))

// Ниже сгиба: код-сплит + монтирование по мере приближения к вьюпорту, чтобы их
// JS (Apollo, GSAP, графы) не грузился и не исполнялся в начальном критическом пути.
const CapabilitiesPage = lazy(() =>
  import('@domains/capabilities/pages/capabilities-page').then((m) => ({
    default: m.CapabilitiesPage
  }))
)
const DataFetchingPage = lazy(() =>
  import('@domains/data-fetching/pages/data-fetching-page').then((m) => ({
    default: m.DataFetchingPage
  }))
)
const TimelinePage = lazy(() =>
  import('@domains/timeline/pages/timeline-page').then((m) => ({ default: m.TimelinePage }))
)
const ContactsPage = lazy(() =>
  import('@domains/contacts/pages/contacts-page').then((m) => ({ default: m.ContactsPage }))
)

/**
 * Одностраничник со скролл-секциями. Порядок = порядок разделов на странице.
 * Герой рендерится сразу (LCP), остальные секции — лениво по мере скролла.
 */
export function AppRouter() {
  return (
    <>
      <HomePage />
      <LazySection id="capabilities" minHeight="80vh">
        <ApolloBoundary>
          <CapabilitiesPage />
        </ApolloBoundary>
      </LazySection>
      <LazySection id="data-fetching" minHeight="80vh">
        <ApolloBoundary>
          <DataFetchingPage />
        </ApolloBoundary>
      </LazySection>
      <LazySection id="timeline" minHeight="120vh">
        <ApolloBoundary>
          <TimelinePage />
        </ApolloBoundary>
      </LazySection>
      <LazySection id="contacts" minHeight="80vh">
        <ApolloBoundary>
          <ContactsPage />
        </ApolloBoundary>
      </LazySection>
    </>
  )
}
