import { i18n } from '@shared/i18n/i18n'

/**
 * Точка композиции i18n (только слой app вправе видеть все домены).
 * Автоматически подмешивает ресурсы каждого домена и общий namespace `common`.
 */
type LocaleModule = { default: Record<string, unknown> }

// Доменные локали: ../domains/<domain>/locales/<lang>.json → namespace = <domain>
const domainLocales = import.meta.glob<LocaleModule>('../domains/*/locales/*.json', { eager: true })
for (const [path, module] of Object.entries(domainLocales)) {
  const match = /\/domains\/([^/]+)\/locales\/([^/]+)\.json$/.exec(path)
  if (!match) continue
  const [, domain, lang] = match
  i18n.addResourceBundle(lang, domain, module.default, true, true)
}

// Общие локали: ../shared/i18n/locales/<lang>/common.json → namespace = common
const sharedLocales = import.meta.glob<LocaleModule>('../shared/i18n/locales/*/common.json', {
  eager: true
})
for (const [path, module] of Object.entries(sharedLocales)) {
  const match = /\/locales\/([^/]+)\/common\.json$/.exec(path)
  if (!match) continue
  const [, lang] = match
  i18n.addResourceBundle(lang, 'common', module.default, true, true)
}

export { i18n }
