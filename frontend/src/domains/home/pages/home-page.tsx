import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { Section } from '@shared/ui/section'
import { Hero } from '../ui/hero'

export function HomePage() {
  const { t } = useTranslation('home')

  return (
    <Section id="home" className="pt-16">
      <Hero />
      <a
        href="#capabilities"
        className="mx-auto mt-4 flex w-fit flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        {t('scrollHint')}
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </Section>
  )
}
