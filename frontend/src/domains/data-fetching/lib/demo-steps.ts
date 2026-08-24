export interface DemoStepDef {
  key: 'validation' | 'interceptor' | 'parsing'
  durationMs: number
}

/** Локальные ступени анимации (совпадают по ключам с бэкендом). */
export const DEMO_STEPS: DemoStepDef[] = [
  { key: 'validation', durationMs: 700 },
  { key: 'interceptor', durationMs: 900 },
  { key: 'parsing', durationMs: 800 }
]

export const TOTAL_DEMO_MS = DEMO_STEPS.reduce((sum, step) => sum + step.durationMs, 0)
