import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { buildOpenApiDocument } from './swagger'

/**
 * Генерирует openapi.json из REST-контроллеров БЕЗ рабочей БД
 * (PrismaService терпимо относится к отсутствию подключения на старте).
 * Запуск: `npm run openapi:print`.
 */
async function generate(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] })
  await app.init()

  const document = buildOpenApiDocument(app)
  const outFile = join(process.cwd(), 'openapi.json')
  writeFileSync(outFile, JSON.stringify(document, null, 2))
  console.log(`✅ OpenAPI written to ${outFile}`)

  await app.close()
}

generate().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
