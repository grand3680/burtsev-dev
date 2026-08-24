import { Suspense } from 'react'
import { useTheme } from '@shared/lib/theme'
import { ErrorBoundary } from '@shared/ui/error-boundary'
import { ParticleLogo } from '@shared/three/particle-logo'

/** Статический запасной вариант, если WebGL недоступен. */
function LogoFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="grid h-40 w-40 place-items-center rounded-3xl bg-gradient-to-br from-primary to-accent text-5xl font-black text-primary-foreground shadow-2xl">
        KB
      </div>
    </div>
  )
}

export function LogoStage() {
  const { theme } = useTheme()
  const color = theme === 'dark' ? '#38bdf8' : '#0ea5e9'

  return (
    <div className="relative aspect-square w-full max-w-md">
      {/* Свечение-подложка */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />
      <ErrorBoundary fallback={<LogoFallback />}>
        <Suspense fallback={<LogoFallback />}>
          <ParticleLogo color={color} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
