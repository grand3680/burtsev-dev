import { useCallback, useEffect, useRef, useState } from 'react'
import { useRunDemoLazyQuery, type RunDemoQuery } from '@shared/api/generated'
import { useLanguage } from '@shared/i18n/use-language'
import { toGqlLanguage } from '@shared/api/gql-language'
import { DEMO_STEPS } from './demo-steps'

export type RunnerStatus = 'idle' | 'running' | 'done'

interface DemoRunnerState {
  status: RunnerStatus
  /** Индекс текущей активной ступени (0..n). n = все завершены. */
  activeStep: number
  data: RunDemoQuery['runDemo'] | null
  error: boolean
  run: () => void
}

/**
 * Оркестрирует секцию data-fetching: проигрывает ступени (валидация → интерсептор →
 * парсинг) и запускает реальный GraphQL-запрос. Результат показывается только после
 * завершения анимации И получения данных.
 */
export function useDemoRunner(): DemoRunnerState {
  const { language } = useLanguage()
  const [status, setStatus] = useState<RunnerStatus>('idle')
  const [activeStep, setActiveStep] = useState(0)
  const [animationDone, setAnimationDone] = useState(false)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const [fetchDemo, { data, error }] = useRunDemoLazyQuery({ fetchPolicy: 'network-only' })

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const run = useCallback(() => {
    clearTimers()
    setStatus('running')
    setActiveStep(0)
    setAnimationDone(false)

    void fetchDemo({ variables: { lang: toGqlLanguage(language) } })

    let elapsed = 0
    DEMO_STEPS.forEach((step, index) => {
      elapsed += step.durationMs
      timers.current.push(
        setTimeout(() => {
          setActiveStep(index + 1)
        }, elapsed)
      )
    })
    timers.current.push(
      setTimeout(() => {
        setAnimationDone(true)
      }, elapsed)
    )
  }, [clearTimers, fetchDemo, language])

  // Показываем результат, когда анимация завершилась и данные пришли.
  useEffect(() => {
    if (animationDone && (data ?? error)) {
      setStatus('done')
    }
  }, [animationDone, data, error])

  return {
    status,
    activeStep,
    data: data?.runDemo ?? null,
    error: Boolean(error),
    run
  }
}
