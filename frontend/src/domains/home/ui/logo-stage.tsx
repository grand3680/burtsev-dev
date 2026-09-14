import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ErrorBoundary } from '@shared/ui/error-boundary'
import { PHOTO_CROP_Y, samplePhoto, type PhotoSample } from '../lib/sample-photo'

const PhotoParticlesCanvas = lazy(() =>
  import('./photo-particles').then((m) => ({ default: m.PhotoParticlesCanvas }))
)

const PHOTO_SRC = '/kirill-burtsev.webp'
const PARTICLE_COUNT = 22000

/** При монтировании (например, при ошибке WebGL) сразу проявляет фото. */
function RevealOnMount({ onReveal }: { onReveal: () => void }) {
  useEffect(() => {
    onReveal()
  }, [onReveal])
  return null
}

/**
 * Герой-портрет: частицы собираются из облака в пуантилистскую версию фото,
 * затем настоящий снимок проявляется на их месте и остаётся. WebGL/ошибка/
 * `prefers-reduced-motion` → просто статичное фото.
 */
export function LogoStage() {
  const reduced = useReducedMotion()
  const imgRef = useRef<HTMLImageElement>(null)
  const [sample, setSample] = useState<PhotoSample | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)

  // Частицы (three.js, ~230 КБ gzip + WebGL) — только на десктопе с точным
  // указателем. На мобильных это самый тяжёлый ресурс и главный источник TBT
  // ради декоративного эффекта; там показываем сразу статичный портрет (он же LCP).
  const [heavyFx] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 768px) and (pointer: fine)').matches
  )
  const enableFx = heavyFx && !reduced

  const reveal = useCallback(() => setRevealed(true), [])

  // Фото загрузилось → сэмплируем точки для частиц (из того же <img>, без второй загрузки).
  const handleImgLoad = useCallback(() => {
    const img = imgRef.current
    if (!enableFx || !img) {
      setRevealed(true)
      return
    }
    const next = samplePhoto(img, PARTICLE_COUNT)
    if (next) setSample(next)
    else setRevealed(true)
  }, [enableFx])

  // Событие onLoad может не сработать, если фото уже в кэше к моменту навешивания хендлера.
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) handleImgLoad()
  }, [handleImgLoad])

  // Частицы собрались → проявляем фото и вскоре снимаем canvas (освобождаем WebGL).
  const handleAssembled = useCallback(() => {
    setRevealed(true)
    window.setTimeout(() => setDone(true), 900)
  }, [])

  const showCanvas = enableFx && !done && sample !== null

  return (
    <div className="relative aspect-square w-full max-w-md">
      {/* Свечение-подложка */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />

      {/* Рамка-градиент вокруг фото */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/60 via-transparent to-accent/60 p-[3px] shadow-2xl">
        {/* Скелетон на время загрузки снимка */}
        {!revealed && (
          <div className="absolute inset-[3px] animate-pulse rounded-[calc(2rem-3px)] bg-card" />
        )}

        <img
          ref={imgRef}
          src={PHOTO_SRC}
          alt="Кирилл Бурцев"
          width={512}
          height={512}
          fetchPriority="high"
          onLoad={handleImgLoad}
          style={{ objectPosition: `50% ${PHOTO_CROP_Y * 100}%` }}
          className={`h-full w-full rounded-[calc(2rem-3px)] object-cover transition-opacity duration-700 ${
            revealed ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {showCanvas && (
          <div className="absolute inset-[3px] rounded-[calc(2rem-3px)]">
            <ErrorBoundary fallback={<RevealOnMount onReveal={reveal} />}>
              <Suspense fallback={null}>
                <PhotoParticlesCanvas sample={sample} onAssembled={handleAssembled} />
              </Suspense>
            </ErrorBoundary>
          </div>
        )}
      </div>
    </div>
  )
}
