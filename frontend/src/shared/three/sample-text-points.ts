/**
 * Сэмплирует точки-мишени из текста, отрисованного на canvas.
 * Возвращает Float32Array позиций (x, y, z) в пространстве примерно [-2..2].
 */
export function sampleTextPoints(text: string, count: number, size = 220): Float32Array {
  const positions = new Float32Array(count * 3)

  if (typeof document === 'undefined') return positions

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return positions

  ctx.fillStyle = '#ffffff'
  ctx.font = `bold ${String(Math.round(size * 0.62))}px system-ui, "Segoe UI", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, size / 2, size / 2)

  const { data } = ctx.getImageData(0, 0, size, size)
  const filled: number[] = []
  for (let y = 0; y < size; y += 2) {
    for (let x = 0; x < size; x += 2) {
      if (data[(y * size + x) * 4 + 3] > 128) filled.push(x, y)
    }
  }

  const pairCount = filled.length / 2
  const scale = 4.2
  for (let i = 0; i < count; i++) {
    if (pairCount === 0) break
    const idx = Math.floor(Math.random() * pairCount) * 2
    const px = filled[idx]
    const py = filled[idx + 1]
    positions[i * 3] = (px / size - 0.5) * scale
    positions[i * 3 + 1] = -(py / size - 0.5) * scale
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4
  }

  return positions
}
