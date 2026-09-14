import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Признак того, что пользователь уже навигировал по якорям (клик по меню / deep-link).
 * После первой навигации монтируем все секции сразу: якорные переходы должны попадать
 * точно, а этот код исполняется уже ПОСЛЕ взаимодействия — вне окна измерения TBT.
 */
let navigated = typeof window !== 'undefined' && window.location.hash.length > 1
const navSubs = new Set<() => void>()
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    navigated = true
    for (const fn of navSubs) fn()
  })
}

interface LazySectionProps {
  /** Якорь секции — живёт на обёртке, чтобы ссылки из меню работали до монтирования. */
  id: string
  children: ReactNode
  /** Резервируемая высота плейсхолдера, пока контент не смонтирован. */
  minHeight?: string
}

/**
 * Монтирует тяжёлую секцию, когда она приближается к вьюпорту (или после первой
 * якорной навигации). Уводит её JS — Apollo, GSAP, графы — из критического пути
 * начальной загрузки: Lighthouse/PageSpeed не скроллят, поэтому нижние секции не
 * исполняются в окне измерения TBT. Обёртка всегда в DOM с якорем и резервом
 * высоты, поэтому переходы по меню не «промахиваются».
 */
export function LazySection({ id, children, minHeight = '100vh' }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(navigated)

  useEffect(() => {
    if (show) return
    const reveal = () => setShow(true)

    // Навигация где-либо на странице → монтируем и эту секцию.
    navSubs.add(reveal)

    const el = ref.current
    const io = el
      ? new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) reveal()
          },
          { rootMargin: '600px 0px' }
        )
      : null
    io?.observe(el as Element)

    return () => {
      navSubs.delete(reveal)
      io?.disconnect()
    }
  }, [show])

  return (
    <div ref={ref} id={id} className="scroll-mt-20" style={show ? undefined : { minHeight }}>
      {show ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  )
}
