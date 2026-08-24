import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ExternalLink, FileJson } from 'lucide-react'
import type { paths } from '@shared/api/rest-schema'
import { backendBaseUrl } from '@shared/lib/env'
import { cn } from '@shared/lib/cn'

/** Пути и методы берём из авто-сгенерированного OpenAPI-контракта (@shared/api/rest-schema). */
type ApiPath = keyof paths
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

interface Endpoint {
  method: HttpMethod
  path: ApiPath
  summary: string
}

const METHOD_COLORS: Record<string, string> = {
  get: 'text-emerald-500',
  post: 'text-sky-500',
  put: 'text-amber-500',
  delete: 'text-red-500'
}

/** Частичный предпросмотр Swagger/OpenAPI: тянет /docs-json и показывает список эндпоинтов. */
export function SwaggerPreview() {
  const { t } = useTranslation('data-fetching')
  const [endpoints, setEndpoints] = useState<Endpoint[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${backendBaseUrl()}/docs-json`, { signal: controller.signal })
      .then((res) => res.json() as Promise<OpenApiDoc>)
      .then((doc) => {
        setEndpoints(extractEndpoints(doc))
      })
      .catch(() => {
        setFailed(true)
      })
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 font-semibold">
            <FileJson className="h-5 w-5 text-primary" />
            {t('swagger.title')}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{t('swagger.description')}</p>
        </div>
        <a
          href={`${backendBaseUrl()}/docs`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {t('swagger.open')}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {failed && <p className="text-sm text-muted-foreground">{t('swagger.unavailable')}</p>}

      {endpoints && (
        <ul className="divide-y divide-border overflow-hidden rounded-md border border-border">
          {endpoints.map((endpoint) => (
            <li
              key={`${endpoint.method}-${endpoint.path}`}
              className="flex items-center gap-3 bg-background/40 px-3 py-2 text-sm"
            >
              <span
                className={cn(
                  'w-14 shrink-0 font-mono text-xs font-bold uppercase',
                  METHOD_COLORS[endpoint.method] ?? 'text-muted-foreground'
                )}
              >
                {endpoint.method}
              </span>
              <span className="font-mono text-xs text-foreground">{endpoint.path}</span>
              <span className="ml-auto truncate text-xs text-muted-foreground">
                {endpoint.summary}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * Форма ответа /docs-json (сырой OpenAPI-документ). Пути/методы ограничены
 * контрактом из rest-schema; `summary` — поле документации, которого нет в
 * типизированном контракте, поэтому читаем его как необязательное.
 */
type OpenApiDoc = {
  paths?: Partial<Record<ApiPath, Partial<Record<HttpMethod, { summary?: string }>>>>
}

const HTTP_METHODS: HttpMethod[] = ['get', 'post', 'put', 'delete', 'patch']

function extractEndpoints(doc: OpenApiDoc): Endpoint[] {
  const result: Endpoint[] = []
  for (const [path, operations] of Object.entries(doc.paths ?? {}) as [
    ApiPath,
    Partial<Record<HttpMethod, { summary?: string }>>
  ][]) {
    for (const method of HTTP_METHODS) {
      const operation = operations[method]
      if (operation) {
        result.push({ method, path, summary: operation.summary ?? '' })
      }
    }
  }
  return result
}
