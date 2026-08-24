import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { buildOpenApiDocument } from './swagger'

async function bootstrap(): Promise<void> {
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

  // Swagger / OpenAPI: UI на /docs, JSON на /docs-json; плюс дамп в файл для codegen фронта.
  const document = buildOpenApiDocument(app)
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs-json',
    customSiteTitle: 'Burtsev Dev API'
  })
  try {
    writeFileSync(join(process.cwd(), 'openapi.json'), JSON.stringify(document, null, 2))
  } catch {
    // необязательный побочный эффект — не мешаем старту
  }

  const port = Number(process.env.BACKEND_PORT ?? 4000)
  await app.listen(port, '0.0.0.0')
  Logger.log(`🚀 GraphQL API ready at http://localhost:${String(port)}/graphql`, 'Bootstrap')
  Logger.log(`📘 Swagger UI at http://localhost:${String(port)}/docs`, 'Bootstrap')
}

void bootstrap()
