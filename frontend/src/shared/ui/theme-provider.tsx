import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { flushSync } from 'react-dom'
import {
  ThemeContext,
  getInitialTheme,
  persistTheme,
  type Theme,
  type ThemeContextValue,
  type ThemeTransitionOrigin
} from '@shared/lib/theme'

/** `startViewTransition` пока отсутствует в стандартных типах lib.dom. */
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

/**
 * Меняет тему с круговым раскрытием (View Transitions API) из точки клика —
 * веб-аналог Android-паттерна «снимок корневого вью → смена темы → circular reveal».
 * Центр и радиус круга передаются в CSS-анимацию через переменные на :root
 * (см. `theme-circular-reveal` в globals.css). Без поддержки API или при
 * `prefers-reduced-motion` смена происходит мгновенно.
 */
function applyThemeWithTransition(apply: () => void, origin?: ThemeTransitionOrigin) {
  const doc = document as DocumentWithViewTransition
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!origin || prefersReduced || typeof doc.startViewTransition !== 'function') {
    apply()
    return
  }

  const root = doc.documentElement
  const { x, y } = origin
  // Радиус до самого дальнего угла экрана — круг гарантированно накрывает всё.
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  root.style.setProperty('--theme-reveal-x', `${x}px`)
  root.style.setProperty('--theme-reveal-y', `${y}px`)
  root.style.setProperty('--theme-reveal-r', `${endRadius}px`)

  const transition = doc.startViewTransition(() => {
    // Смена класса `.dark` должна попасть в снимок синхронно.
    flushSync(apply)
  })

  const cleanup = () => {
    root.style.removeProperty('--theme-reveal-x')
    root.style.removeProperty('--theme-reveal-y')
    root.style.removeProperty('--theme-reveal-r')
  }
  transition.finished.then(cleanup, cleanup)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    persistTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback((origin?: ThemeTransitionOrigin) => {
    applyThemeWithTransition(() => {
      setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }, origin)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
