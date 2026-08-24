import { describe, it, expect } from 'vitest'
import { DEMO_STEPS, TOTAL_DEMO_MS } from './demo-steps'

describe('demo-steps', () => {
  it('defines the three execution stages in order', () => {
    expect(DEMO_STEPS.map((step) => step.key)).toEqual(['validation', 'interceptor', 'parsing'])
  })

  it('TOTAL_DEMO_MS equals the sum of step durations', () => {
    const sum = DEMO_STEPS.reduce((acc, step) => acc + step.durationMs, 0)
    expect(TOTAL_DEMO_MS).toBe(sum)
  })
})
