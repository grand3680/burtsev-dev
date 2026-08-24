import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './languages'
import { getStoredLanguage } from './language-storage'

/**
 * Базовый инстанс i18next. Доменные ресурсы НЕ регистрируются здесь —
 * их подмешивает точка композиции app/i18n.ts (границы слоёв: только app видит домены).
 */
void i18n.use(initReactI18next).init({
  lng: getStoredLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  defaultNS: 'common',
  ns: ['common'],
  interpolation: { escapeValue: false },
  returnNull: false
})

export { i18n }
