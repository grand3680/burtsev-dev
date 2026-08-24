import type { IncomingMessage, ServerResponse } from 'node:http'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { buildOpenApiDocument } from './swagger'
import { AppModule } from './app.module'

// Точка входа для Vercel Serverless Functions.
// В отличие от main.ts не вызывает app.listen — Vercel сам передаёт req/res.
// Инстанс Nest кэшируется между вызовами в рамках одного тёплого контейнера.

// Минимальный контракт express-инстанса, который нам нужен.
interface DocsResponse {
  setHeader(name: string, value: string): void
  json(body: unknown): void
  send(body: string): void
}
interface ExpressInstance {
  (req: IncomingMessage, res: ServerResponse): void
  get(path: string, handler: (req: IncomingMessage, res: DocsResponse) => void): void
}

// Swagger UI грузится с CDN и читает наш /docs-json.
// Так обходим проблему serverless: статические ассеты swagger-ui-dist из
// node_modules не попадают в бандл Vercel (и хойстятся в корневой node_modules).
const SWAGGER_UI_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Burtsev Dev API</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js" crossorigin></script>
    <script>
      window.ui = SwaggerUIBundle({ url: '/docs-json', dom_id: '#swagger-ui' })
    </script>
  </body>
</html>`

let serverPromise: Promise<ExpressInstance> | null = null

async function bootstrap(): Promise<ExpressInstance> {
  const app = await NestFactory.create(AppModule)

  const corsOrigin = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim())
  app.enableCors({
    origin: corsOrigin && corsOrigin.length > 0 ? corsOrigin : true,
    credentials: true
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  // OpenAPI JSON на /docs-json + своя страница Swagger UI на /docs (CDN-ассеты).
  const document = buildOpenApiDocument(app)
  const server = app.getHttpAdapter().getInstance() as ExpressInstance
  server.get('/docs-json', (_req, res) => {
    res.json(document)
  })
  server.get('/docs', (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(SWAGGER_UI_HTML)
  })

  await app.init()

  return server
}

export async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  serverPromise ??= bootstrap()
  const server = await serverPromise
  server(req, res)
}
