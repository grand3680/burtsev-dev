import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@shared/lib/cn'
import type { ExperienceItem } from '../api/use-timeline-data'

gsap.registerPlugin(ScrollTrigger)

interface WorkTimelineProps {
  items: ExperienceItem[]
}

export function WorkTimeline({ items }: WorkTimelineProps) {
  const { t } = useTranslation('timeline')
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
        })
      })

      const line = root.querySelector<HTMLElement>('.timeline-progress')
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 70%', scrub: true }
          }
        )
      }
    }, root)

    return () => {
      ctx.revert()
    }
  }, [items])

  return (
    <div ref={rootRef} className="relative pl-8 sm:pl-10">
      {/* рельса */}
      <div className="absolute left-2 top-2 bottom-2 w-px bg-border sm:left-3" aria-hidden />
      <div
        className="timeline-progress absolute left-2 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary to-accent sm:left-3"
        aria-hidden
      />

      <div className="flex flex-col gap-8">
        {items.map((item) => (
          <article key={item.id} className="timeline-item relative">
            <span
              className={cn(
                'absolute -left-[26px] top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-primary bg-background sm:-left-[30px]'
              )}
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>

            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">{item.company}</h3>
                <span className="text-sm text-muted-foreground">{item.period}</span>
              </div>
              <p className="mt-0.5 text-sm font-medium text-primary">{item.role}</p>
              <p className="text-xs text-muted-foreground">{item.location}</p>

              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-4 text-sm text-muted-foreground">
                {item.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>

              {item.stack.length > 0 && (
                <p className="mt-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t('stack')}:</span>{' '}
                  {item.stack.join(', ')}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
