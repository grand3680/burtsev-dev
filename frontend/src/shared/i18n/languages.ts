export const SUPPORTED_LANGUAGES = ['ru', 'en'] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: LanguageCode = 'ru'

export const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  ru: 'RU',
  en: 'EN'
}

export function isLanguageCode(value: string): value is LanguageCode {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
}
