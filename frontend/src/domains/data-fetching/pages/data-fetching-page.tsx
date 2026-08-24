import { useTranslation } from 'react-i18next'
import { Section, SectionHeading } from '@shared/ui/section'
import { Reveal } from '@shared/ui/reveal'
import { useDemoRunner } from '../lib/use-demo-runner'
import { CodePanel } from '../ui/code-panel'
import { ExecutionPanel } from '../ui/execution-panel'
import { SwaggerPreview } from '../ui/swagger-preview'

export function DataFetchingPage() {
  const { t } = useTranslation('data-fetching')
  const { status, activeStep, data, error, run } = useDemoRunner()

  return (
    <Section id="data-fetching">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <CodePanel status={status} onRun={run} />
        </Reveal>
        <Reveal delay={0.1}>
          <ExecutionPanel status={status} activeStep={activeStep} data={data} error={error} />
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-5">
          <SwaggerPreview />
        </div>
      </Reveal>
    </Section>
  )
}
