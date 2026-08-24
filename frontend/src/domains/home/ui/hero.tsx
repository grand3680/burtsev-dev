import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@shared/ui/button'
import { Badge } from '@shared/ui/badge'
import { LogoStage } from './logo-stage'

const CORE_STACK = ['TypeScript', 'React', 'Next.js', 'NestJS', 'GraphQL', 'Docker']

export function Hero() {
  const { t } = useTranslation('home')
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80])
  const logoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0.2])

  return (
    <div
      ref={ref}
      className="grid min-h-0 flex-1 items-center gap-10 py-6 md:grid-cols-2 md:gap-6"
    >
      <motion.div style={{ y: textY, opacity }} className="order-2 md:order-1">
        <Badge className="mb-5">{t('badge')}</Badge>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-xl font-medium text-foreground/90">{t('subtitle')}</p>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">{t('description')}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#contacts">{t('ctaContact')}</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#timeline">{t('ctaWork')}</a>
          </Button>
        </div>

        <div className="mt-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t('stack')}
          </p>
          <div className="flex flex-wrap gap-2">
            {CORE_STACK.map((tech) => (
              <Badge key={tech} className="bg-card">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: logoY }}
        className="order-1 flex justify-center md:order-2 md:justify-end"
      >
        <LogoStage />
      </motion.div>
    </div>
  )
}
