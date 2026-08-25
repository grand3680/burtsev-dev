import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@shared/lib/cn'
import { Button } from '@shared/ui/button'
import { LanguageToggle } from '@shared/ui/language-toggle'
import { ThemeToggle } from '@shared/ui/theme-toggle'

/** Бургер из трёх полос: при открытии средняя гаснет, крайние съезжаются в центр и складываются крестом. */
function BurgerIcon({ open }: { open: boolean }) {
  const bar = 'absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300'
  return (
    <span className="relative block h-5 w-5" aria-hidden>
      <span className={cn(bar, open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[3px]')} />
      <span className={cn(bar, 'top-1/2 -translate-y-1/2', open && 'opacity-0')} />
      <span className={cn(bar, open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[15px]')} />
    </span>
  )
}

const NAV_ITEMS = [
  { id: 'capabilities', key: 'nav.capabilities' },
  { id: 'data-fetching', key: 'nav.dataFetching' },
  { id: 'timeline', key: 'nav.timeline' },
  { id: 'contacts', key: 'nav.contacts' }
] as const

export function AppHeader() {
  const { t } = useTranslation('common')
  const name = t('name')
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Закрываем бургер-меню по Escape и клику вне навигации.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2 font-bold" aria-label={name}>
          <img
            src="/kirill-burtsev.ico"
            alt={name}
            width={28}
            height={28}
            className="h-7 w-7 rounded-md object-cover ring-1 ring-border"
          />
          <span className="hidden sm:inline">{name}</span>
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
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={t('menu.toggle')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => {
              setOpen((prev) => !prev)
            }}
          >
            <BurgerIcon open={open} />
          </Button>
        </div>
      </div>

      {/* Мобильная навигация: то, что скрыто на десктопе под md, живёт в бургере. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-2 sm:px-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    // Скроллим сами: дефолтный переход по якорю ломается, когда меню
                    // закрывается тем же кликом (панель в этот момент анимирует уход).
                    event.preventDefault()
                    setOpen(false)
                    const target = document.getElementById(item.id)
                    target?.scrollIntoView({
                      behavior: reduced ? 'auto' : 'smooth',
                      block: 'start'
                    })
                    history.replaceState(null, '', `#${item.id}`)
                  }}
                  className="rounded-md px-2 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: reduced ? 0 : 0.05 + index * 0.05 }}
                >
                  {t(item.key)}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
