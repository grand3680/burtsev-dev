import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Circle, AlertTriangle } from 'lucide-react'
import { cn } from '@shared/lib/cn'
import { DEMO_STEPS } from '../lib/demo-steps'
import type { RunnerStatus, useDemoRunner } from '../lib/use-demo-runner'

type RunnerState = ReturnType<typeof useDemoRunner>

interface ExecutionPanelProps {
  status: RunnerStatus
  activeStep: number
  data: RunnerState['data']
  error: boolean
}

export function ExecutionPanel({ status, activeStep, data, error }: ExecutionPanelProps) {
  const { t } = useTranslation('data-fetching')

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
      <ol className="flex flex-col gap-3">
        {DEMO_STEPS.map((step, index) => {
          const done = index < activeStep
          const active = index === activeStep && status === 'running'
          return (
            <li key={step.key} className="flex items-center gap-3">
              <span
                className={cn(
                  'grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors',
                  done && 'border-primary bg-primary text-primary-foreground',
                  active && 'border-primary text-primary',
                  !done && !active && 'border-border text-muted-foreground'
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" />
                ) : active ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Circle className="h-3 w-3" />
                )}
              </span>
              <span
                className={cn(
                  'text-sm transition-colors',
                  done || active ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {t(`steps.${step.key}`)}
              </span>
            </li>
          )
        })}
      </ol>

      <AnimatePresence mode="wait">
        {status === 'done' && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
          >
            <AlertTriangle className="h-4 w-4" />
            {t('error')}
          </motion.div>
        )}

        {status === 'done' && data && !error && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-md border border-primary/30 bg-primary/5 p-4"
          >
            <p className="mb-3 text-sm font-semibold text-primary">{t('result.title')}</p>
            <div className="mb-3 grid grid-cols-2 gap-3 text-sm">
              <Stat label={t('result.experiences')} value={String(data.experiencesCount)} />
              <Stat label={t('result.skills')} value={String(data.skillsCount)} />
            </div>
            <ul className="flex flex-col gap-1.5">
              {data.experiences.map((exp) => (
                <li key={exp.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium">{exp.company}</span>
                  <span className="truncate text-muted-foreground">{exp.role}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">{t('result.hint')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-card px-3 py-2">
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
