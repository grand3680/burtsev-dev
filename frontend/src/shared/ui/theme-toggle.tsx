import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@shared/lib/theme'
import { Button } from '@shared/ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation('common')

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(event) => {
        // Круг раскрытия всегда исходит из центра самой кнопки — независимо от
        // точки клика и одинаково при активации с клавиатуры (где clientX/Y = 0).
        const rect = event.currentTarget.getBoundingClientRect()
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }}
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
