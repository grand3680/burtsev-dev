import { useTranslation } from 'react-i18next'
import { Section, SectionHeading } from '@shared/ui/section'
import { Reveal } from '@shared/ui/reveal'
import { ContactForm } from '../ui/contact-form'
import { ContactLinks } from '../ui/contact-links'

export function ContactsPage() {
  const { t } = useTranslation('contacts')

  return (
    <Section id="contacts">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactLinks />
        </Reveal>
      </div>
    </Section>
  )
}
