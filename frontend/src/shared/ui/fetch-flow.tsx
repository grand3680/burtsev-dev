import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Monitor, Server, Database } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@shared/lib/cn'

interface FetchFlowProps {
  /** Подпись под схемой, напр. «Запрос опыта работы к GraphQL…». */
  label: string
  className?: string
}

/**
 * Наглядная схема похода за данными: Client → GraphQL → DB.
 * Пакеты «бегут» слева направо к бэкенду, пока идёт загрузка.
 * Уважает prefers-reduced-motion (показывает статичную схему).
 */
export function FetchFlow({ label, className }: FetchFlowProps) {
  const { t } = useTranslation('common')

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('mx-auto flex max-w-lg flex-col items-center gap-5 py-10', className)}
    >
      <div className="flex w-full items-center">
        <FlowNode icon={Monitor} label={t('fetchFlow.client')} />
        <Connector delay={0} />
        <FlowNode icon={Server} label={t('fetchFlow.server')} highlight />
        <Connector delay={0.35} />
        <FlowNode icon={Database} label={t('fetchFlow.db')} />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function FlowNode({
  icon,
  label,
  highlight = false
}: {
  icon: LucideIcon
  label: string
  highlight?: boolean
}) {
  const reduced = useReducedMotion()
  const Icon = icon
  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <motion.span
        className={cn(
          'grid h-14 w-14 place-items-center rounded-2xl border shadow-sm',
          highlight ? 'border-primary/50 bg-primary/10 text-primary' : 'border-border bg-card text-foreground'
        )}
        animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon className="h-6 w-6" />
      </motion.span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

/** Провод между узлами с бегущими к бэкенду пакетами. */
function Connector({ delay }: { delay: number }) {
  const reduced = useReducedMotion()

  return (
    <div className="relative mx-1 h-0.5 flex-1 self-start mt-7 overflow-visible rounded-full bg-border">
      {!reduced &&
        [0, 0.6, 1.2].map((offset) => (
          <motion.span
            key={offset}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_1px] shadow-primary/60"
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'linear',
              delay: delay + offset,
              times: [0, 0.1, 0.85, 1]
            }}
          />
        ))}
    </div>
  )
}
