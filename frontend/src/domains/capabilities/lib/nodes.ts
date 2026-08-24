export interface IntegrationNode {
  id: string
  label: string
  /** Координаты в системе viewBox 1000 x 620. */
  x: number
  y: number
}

export const VIEWBOX = { width: 1000, height: 620 }
export const CENTER = { x: 500, y: 310 }

/** Внешние интеграции, сходящиеся к центральному «API». */
export const INTEGRATION_NODES: IntegrationNode[] = [
  { id: 'stripe', label: 'Stripe', x: 130, y: 110 },
  { id: 's3', label: 'AWS S3', x: 870, y: 110 },
  { id: 'lambda', label: 'AWS Lambda', x: 90, y: 310 },
  { id: 'openai', label: 'OpenAI', x: 910, y: 310 },
  { id: 'cognito', label: 'AWS Cognito', x: 150, y: 510 },
  { id: 'webhooks', label: 'Webhooks', x: 850, y: 510 }
]
