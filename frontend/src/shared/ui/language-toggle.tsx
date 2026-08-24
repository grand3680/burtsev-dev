import { useTranslation } from 'react-i18next'
import { useLanguage } from '@shared/i18n/use-language'
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS } from '@shared/i18n/languages'
import { cn } from '@shared/lib/cn'

/** Сегмент-переключатель языка (RU / EN) для хедера. */
export function LanguageToggle() {
  const { language, changeLanguage } = useLanguage()
  const { t } = useTranslation('common')

  return (
    <div
      className="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5"
      role="group"
      aria-label={t('language.switch')}
    >
      {SUPPORTED_LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => {
            changeLanguage(code)
          }}
          aria-pressed={language === code}
          className={cn(
            'cursor-pointer rounded px-2.5 py-1 text-xs font-semibold transition-colors',
            language === code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          {LANGUAGE_LABELS[code]}
        </button>
      ))}
    </div>
  )
}
