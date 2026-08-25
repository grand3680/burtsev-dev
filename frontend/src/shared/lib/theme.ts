import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

/** Точка, из которой расходится круговое раскрытие при смене темы. */
export interface ThemeTransitionOrigin {
  x: number
  y: number
}

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: (origin?: ThemeTransitionOrigin) => void
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}

/** Имя ключа синхронизировано с инлайн-скриптом в `index.html` (анти-мигание). */
export const THEME_STORAGE_KEY = 'burtsev.theme'
/** Cookie читается тем же инлайн-скриптом ещё до загрузки бандла. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 год

function readThemeCookie(): Theme | null {
  const match = document.cookie.match(/(?:^|;\s*)burtsev\.theme=(light|dark)(?:;|$)/)
  return match ? (match[1] as Theme) : null
}

function writeThemeCookie(theme: Theme): void {
  document.cookie = `${THEME_STORAGE_KEY}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const cookie = readThemeCookie()
  if (cookie) return cookie
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function persistTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  writeThemeCookie(theme)
  const root = window.document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}
