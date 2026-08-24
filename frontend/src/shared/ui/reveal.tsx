import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@shared/lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Задержка появления, сек. */
  delay?: number
  /** Направление въезда. */
  y?: number
}

/** Появление секции/элемента при попадании во вьюпорт (с уважением к reduced-motion). */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
