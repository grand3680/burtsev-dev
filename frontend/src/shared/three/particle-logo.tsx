import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import { sampleTextPoints } from './sample-text-points'

interface ParticleLogoProps {
  text?: string
  count?: number
  color?: string
}

function ParticlePoints({ text = 'KB', count = 3600, color = '#38bdf8' }: Required<ParticleLogoProps>) {
  const pointsRef = useRef<THREE.Points>(null)
  const reduced = useReducedMotion()
  const { pointer } = useThree()

  // Целевые позиции (буквы) и стартовые (облако).
  const { targets, start } = useMemo(() => {
    const targetPositions = sampleTextPoints(text, count)
    const startPositions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      startPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      startPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      startPositions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return { targets: targetPositions, start: startPositions }
  }, [text, count])

  // Текущие позиции — мутируемый буфер (стартуют из облака, либо сразу собраны при reduced-motion).
  const current = useMemo(
    () => (reduced ? targets.slice() : start.slice()),
    [reduced, start, targets]
  )

  const progress = useRef(0)
  const mouse = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    const points = pointsRef.current
    if (!points) return
    const attr = points.geometry.getAttribute('position') as THREE.BufferAttribute
    const array = attr.array as Float32Array

    // Сборка из облака в буквы за ~2.2с.
    progress.current = Math.min(1, progress.current + delta / 2.2)
    const assembleT = reduced ? 1 : easeOutCubic(progress.current)

    // Курсор в мировых координатах на плоскости z=0.
    mouse.set(pointer.x * 3.4, pointer.y * 2.2, 0)
    const time = performance.now() / 1000

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const tx = targets[ix]
      const ty = targets[ix + 1]
      const tz = targets[ix + 2]

      // Лёгкое «дыхание» собранной формы.
      const idle = reduced ? 0 : Math.sin(time * 1.2 + i) * 0.015
      const goalX = start[ix] + (tx - start[ix]) * assembleT
      const goalY = start[ix + 1] + (ty - start[ix + 1]) * assembleT
      const goalZ = start[ix + 2] + (tz - start[ix + 2]) * assembleT + idle

      // Отталкивание от курсора.
      let px = goalX
      let py = goalY
      if (!reduced && assembleT > 0.6) {
        const dx = goalX - mouse.x
        const dy = goalY - mouse.y
        const distSq = dx * dx + dy * dy
        if (distSq < 0.6) {
          const force = (0.6 - distSq) * 1.6
          const dist = Math.sqrt(distSq) || 0.0001
          px += (dx / dist) * force
          py += (dy / dist) * force
        }
      }

      array[ix] += (px - array[ix]) * 0.12
      array[ix + 1] += (py - array[ix + 1]) * 0.12
      array[ix + 2] += (goalZ - array[ix + 2]) * 0.12
    }

    attr.needsUpdate = true
    if (!reduced) points.rotation.y = Math.sin(time * 0.15) * 0.12
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[current, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/** Canvas с частицами-лого. Собирается из облака в буквы и реагирует на курсор. */
export function ParticleLogo({ text = 'KB', count = 3600, color = '#38bdf8' }: ParticleLogoProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <ParticlePoints text={text} count={count} color={color} />
    </Canvas>
  )
}
