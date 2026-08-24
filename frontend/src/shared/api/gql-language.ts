import { Language } from '@shared/api/generated'
import type { LanguageCode } from '@shared/i18n/languages'

/** Маппинг кода языка UI ('ru' | 'en') в enum GraphQL-схемы (RU | EN). */
export function toGqlLanguage(code: LanguageCode): Language {
  return code === 'en' ? Language.En : Language.Ru
}
