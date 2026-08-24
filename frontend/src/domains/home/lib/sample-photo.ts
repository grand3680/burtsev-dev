export interface PhotoSample {
  positions: Float32Array
  colors: Float32Array
  count: number
}

/**
 * Размер плоскости-фото в мировых координатах. Совпадает с видимой областью камеры
 * (z=6, fov 50° → высота ≈ 5.6), чтобы частицы заполняли рамку целиком, как object-cover.
 */
const SCALE = 5.6

/**
 * Вертикальное смещение кропа (доля 0..1): 0 — верхний край портрета, 0.5 — центр.
 * Должно совпадать с `object-position` у настоящего <img>, чтобы переход был точным.
 */
export const PHOTO_CROP_Y = 0.08

/** Минимальная яркость частицы (0..1): тёмные области фото остаются видимыми точками. */
const COLOR_FLOOR = 0.0000001

/**
 * Сэмплирует точки-мишени и их цвета из фото (center-cover кроп в квадрат),
 * чтобы частицы собрались в пуантилистскую версию снимка — как раньше в буквы «KB».
 */
export function samplePhoto(img: HTMLImageElement, count: number, size = 200): PhotoSample | null {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null

  const w = img.naturalWidth || img.width
  const h = img.naturalHeight || img.height
  if (!w || !h) return null

  // Тот же кроп, что и object-cover + object-position у настоящего <img>:
  // квадрат по центру по горизонтали, со смещением PHOTO_CROP_Y по вертикали.
  const s = Math.min(w, h)
  ctx.drawImage(img, (w - s) / 2, (h - s) * PHOTO_CROP_Y, s, s, 0, 0, size, size)

  let data: Uint8ClampedArray
  try {
    data = ctx.getImageData(0, 0, size, size).data
  } catch {
    return null // tainted canvas — откатимся на статичное фото
  }

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const px = Math.floor(Math.random() * size)
    const py = Math.floor(Math.random() * size)
    const o = (py * size + px) * 4
    positions[i * 3] = (px / size - 0.5) * SCALE
    positions[i * 3 + 1] = -(py / size - 0.5) * SCALE
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15
    // Поднимаем яркость к «полу»: даже тёмные пиксели (тёмный субъект) дают
    // видимые точки на тёмном фоне — иначе фигура читается как пустой силуэт.
    colors[i * 3] = COLOR_FLOOR + (data[o] / 255) * (1 - COLOR_FLOOR)
    colors[i * 3 + 1] = COLOR_FLOOR + (data[o + 1] / 255) * (1 - COLOR_FLOOR)
    colors[i * 3 + 2] = COLOR_FLOOR + (data[o + 2] / 255) * (1 - COLOR_FLOOR)
  }
  return { positions, colors, count }
}
