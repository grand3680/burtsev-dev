import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGE, isLanguageCode, type LanguageCode } from './languages'
import { setStoredLanguage } from './language-storage'

interface UseLanguageResult {
  language: LanguageCode
  changeLanguage: (lang: LanguageCode) => void
  toggleLanguage: () => void
}

/** Единый хук управления языком: i18next + localStorage. */
export function useLanguage(): UseLanguageResult {
  const { i18n } = useTranslation()
  const current = isLanguageCode(i18n.language) ? i18n.language : DEFAULT_LANGUAGE

  const changeLanguage = useCallback(
    (lang: LanguageCode) => {
      void i18n.changeLanguage(lang)
      setStoredLanguage(lang)
    },
    [i18n]
  )

  const toggleLanguage = useCallback(() => {
    changeLanguage(current === 'ru' ? 'en' : 'ru')
  }, [current, changeLanguage])

  return { language: current, changeLanguage, toggleLanguage }
}
