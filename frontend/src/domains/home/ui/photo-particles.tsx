import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { PhotoSample } from '../lib/sample-photo'

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function Points({ sample, onAssembled }: { sample: PhotoSample; onAssembled: () => void }) {
  const { positions, colors, count } = sample
  const pointsRef = useRef<THREE.Points>(null)
  const matRef = useRef<THREE.PointsMaterial>(null)

  // Стартовое облако — как у прежнего лого-эффекта.
  const start = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [count])

  // Мутируемый буфер текущих позиций — стартует из облака.
  const current = useMemo(() => start.slice(), [start])
  const progress = useRef(0)
  const fade = useRef(1)
  const notified = useRef(false)

  useFrame((_, delta) => {
    const points = pointsRef.current
    if (!points) return
    const attr = points.geometry.getAttribute('position') as THREE.BufferAttribute
    const array = attr.array as Float32Array

    // Сборка облака в фото за ~2с.
    progress.current = Math.min(1, progress.current + delta / 2)
    const t = easeOutCubic(progress.current)

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const gx = start[ix] + (positions[ix] - start[ix]) * t
      const gy = start[ix + 1] + (positions[ix + 1] - start[ix + 1]) * t
      const gz = start[ix + 2] + (positions[ix + 2] - start[ix + 2]) * t
      array[ix] += (gx - array[ix]) * 0.12
      array[ix + 1] += (gy - array[ix + 1]) * 0.12
      array[ix + 2] += (gz - array[ix + 2]) * 0.12
    }
    attr.needsUpdate = true

    // Собрались → сигнал наверх (проявить настоящее фото), затем гасим частицы.
    if (progress.current >= 1 && !notified.current) {
      notified.current = true
      onAssembled()
    }
    if (notified.current && matRef.current) {
      fade.current = Math.max(0, fade.current - delta / 0.7)
      matRef.current.opacity = fade.current
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[current, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.045}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/** Canvas с частицами, собирающимися в фото. Сообщает наверх, когда сборка завершена. */
export function PhotoParticlesCanvas({
  sample,
  onAssembled
}: {
  sample: PhotoSample
  onAssembled: () => void
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <Points sample={sample} onAssembled={onAssembled} />
    </Canvas>
  )
}
