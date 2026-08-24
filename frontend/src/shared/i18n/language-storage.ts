import { DEFAULT_LANGUAGE, isLanguageCode, type LanguageCode } from './languages'

const STORAGE_KEY = 'burtsev.lang'

/** Читает сохранённый язык (или язык браузера / дефолт). Безопасно на сервере/в тестах. */
export function getStoredLanguage(): LanguageCode {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && isLanguageCode(stored)) return stored

  const browser = window.navigator.language.slice(0, 2).toLowerCase()
  return isLanguageCode(browser) ? browser : DEFAULT_LANGUAGE
}

export function setStoredLanguage(lang: LanguageCode): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, lang)
}
