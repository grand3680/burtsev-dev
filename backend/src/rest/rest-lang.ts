import { Language } from '@/common/language.enum'

/** Преобразует query-параметр ?lang=ru|en в enum Language (по умолчанию RU). */
export function parseLang(lang?: string): Language {
  return lang?.toLowerCase() === 'en' ? Language.EN : Language.RU
}
