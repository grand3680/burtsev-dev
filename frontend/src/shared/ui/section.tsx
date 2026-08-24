import type { ReactNode } from 'react'
import { cn } from '@shared/lib/cn'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  containerClassName?: string
}

/** Полноширинная секция-якорь с центрированным контейнером. */
export function Section({ id, children, className, containerClassName }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative w-full scroll-mt-20 py-20 md:py-28', className)}
    >
      <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12 max-w-2xl', className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base text-muted-foreground">{description}</p>}
    </div>
  )
}
