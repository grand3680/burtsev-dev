import { Mail, Github, Send } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ContactLink {
  icon: LucideIcon
  label: string
  value: string
  href: string
}

const LINKS: ContactLink[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kirill.burtsev07@gmail.com',
    href: 'mailto:kirill.burtsev07@gmail.com'
  },
  { icon: Github, label: 'GitHub', value: 'github.com/grand3680', href: 'https://github.com/grand3680' },
  { icon: Send, label: 'Telegram', value: '@KirillBurtsevdev', href: 'https://t.me/KirillBurtsevdev' }
]

export function ContactLinks() {
  const { t } = useTranslation('contacts')

  return (
    <div>
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {t('links.title')}
      </p>
      <ul className="flex flex-col gap-3">
        {LINKS.map((link) => {
          const Icon = link.icon
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{link.label}</span>
                  <span className="text-sm font-medium">{link.value}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
