import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, Loader2 } from 'lucide-react'
import { Button } from '@shared/ui/button'
import { highlightGraphql, TOKEN_CLASS } from '../lib/highlight-graphql'
import type { RunnerStatus } from '../lib/use-demo-runner'

const QUERY_SOURCE = `query RunDemo($lang: Language!) {
  runDemo(lang: $lang) {
    steps { key label durationMs }
    experiencesCount
    skillsCount
    serverTime
    experiences {
      company
      role
      period
    }
  }
}`

interface CodePanelProps {
  status: RunnerStatus
  onRun: () => void
}

export function CodePanel({ status, onRun }: CodePanelProps) {
  const { t } = useTranslation('data-fetching')
  const isRunning = status === 'running'
  const tokens = useMemo(() => highlightGraphql(QUERY_SOURCE), [])

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {t('codeTitle')} · GraphQL
        </span>
      </div>

      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-foreground/90">
          {tokens.map((token, i) => (
            <span key={i} className={TOKEN_CLASS[token.kind]}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>

      <div className="mt-auto border-t border-border p-4">
        <Button onClick={onRun} disabled={isRunning} className="w-full sm:w-auto">
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('running')}
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              {status === 'done' ? t('rerun') : t('run')}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
