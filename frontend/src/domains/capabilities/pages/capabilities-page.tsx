import { useTranslation } from 'react-i18next'
import { CreditCard, Cloud, ShieldCheck, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section, SectionHeading } from '@shared/ui/section'
import { Card, CardContent } from '@shared/ui/card'
import { Reveal } from '@shared/ui/reveal'
import { ApiGraph } from '../ui/api-graph'
import { SkillsPanel } from '../ui/skills-panel'

const CARDS: { key: string; icon: LucideIcon }[] = [
  { key: 'payments', icon: CreditCard },
  { key: 'cloud', icon: Cloud },
  { key: 'auth', icon: ShieldCheck },
  { key: 'ai', icon: Sparkles }
]

export function CapabilitiesPage() {
  const { t } = useTranslation('capabilities')

  return (
    <Section id="capabilities" className="bg-muted/20">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />

      <Reveal>
        <ApiGraph />
      </Reveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card, index) => {
          const Icon = card.icon
          return (
            <Reveal key={card.key} delay={index * 0.08}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Icon className="mb-3 h-6 w-6 text-primary" />
                  <h3 className="mb-1 font-semibold">{t(`cards.${card.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`cards.${card.key}.text`)}</p>
                </CardContent>
              </Card>
            </Reveal>
          )
        })}
      </div>

      <div className="mt-16">
        <SkillsPanel />
      </div>
    </Section>
  )
}
