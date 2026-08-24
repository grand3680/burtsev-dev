import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { Section } from '@shared/ui/section'
import { Hero } from '../ui/hero'

export function HomePage() {
  const { t } = useTranslation('home')

  return (
    <Section
      id="home"
      className="flex min-h-svh flex-col pt-16 pb-6"
      containerClassName="flex flex-1 flex-col"
    >
      <Hero />
      <a
        href="#capabilities"
        className="mx-auto mt-6 flex w-fit shrink-0 flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        {t('scrollHint')}
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </Section>
  )
}
