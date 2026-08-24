import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'framer-motion'
import { Section, SectionHeading } from '@shared/ui/section'
import { Reveal } from '@shared/ui/reveal'
import { Card, CardContent } from '@shared/ui/card'
import { Badge } from '@shared/ui/badge'
import { FetchFlow } from '@shared/ui/fetch-flow'
import { useExperiences, useProjects } from '../api/use-timeline-data'
import { WorkTimeline } from '../ui/work-timeline'

/** Минимальная длительность показа анимации фетча, мс — чтобы поход на бэкенд был заметен. */
const MIN_FLOW_MS = 1500

export function TimelinePage() {
  const { t } = useTranslation('timeline')

  // Запрос откладываем до появления секции во вьюпорте — тогда анимация фетча видна.
  const anchorRef = useRef<HTMLDivElement>(null)
  const inView = useInView(anchorRef, { once: true, margin: '-120px' })

  const { data: expData, loading, error } = useExperiences(!inView)
  const { data: projData } = useProjects(!inView)

  // Держим анимацию минимум MIN_FLOW_MS после старта запроса.
  const [minElapsed, setMinElapsed] = useState(false)
  useEffect(() => {
    if (!inView) return
    const id = setTimeout(() => {
      setMinElapsed(true)
    }, MIN_FLOW_MS)
    return () => {
      clearTimeout(id)
    }
  }, [inView])

  const experiences = expData?.experiences ?? []
  const projects = projData?.projects ?? []
  const fetching = inView && !error && (loading || !minElapsed)

  return (
    <Section id="timeline" className="bg-muted/20">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <div ref={anchorRef} />

      {fetching && <FetchFlow label={t('loading')} />}
      {error && <p className="text-sm text-red-500">{t('error')}</p>}

      {!fetching && experiences.length > 0 && <WorkTimeline items={experiences} />}

      {!fetching && projects.length > 0 && (
        <div className="mt-16">
          <h3 className="mb-6 text-xl font-bold">{t('projectsTitle')}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h4 className="font-semibold">{project.company}</h4>
                      <span className="text-xs text-muted-foreground">{project.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-primary">{project.role}</p>
                    <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-4 text-sm text-muted-foreground">
                      {project.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                    {project.stack.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <Badge key={tech} className="bg-card">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
