import { useTranslation } from 'react-i18next'
import { LanguageToggle } from '@shared/ui/language-toggle'
import { ThemeToggle } from '@shared/ui/theme-toggle'

const NAV_ITEMS = [
  { id: 'capabilities', key: 'nav.capabilities' },
  { id: 'data-fetching', key: 'nav.dataFetching' },
  { id: 'timeline', key: 'nav.timeline' },
  { id: 'contacts', key: 'nav.contacts' }
] as const

export function AppHeader() {
  const { t } = useTranslation('common')

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2 font-bold" aria-label="Кирилл Бурцев">
          <img
            src="/kirill-burtsev.ico"
            alt="Кирилл Бурцев"
            width={32}
            height={32}
            className="h-8 w-8 rounded-md object-cover ring-1 ring-border"
          />
          <span className="hidden sm:inline">Кирилл Бурцев</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
