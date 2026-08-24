import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { NestFactory } from '@nestjs/core'
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql'
import { printSchema, lexicographicSortSchema } from 'graphql'
import { AppResolver } from './app.resolver'
import { ExperienceResolver } from './modules/experience/experience.resolver'
import { SkillResolver } from './modules/skill/skill.resolver'
import { ContactResolver } from './modules/contact/contact.resolver'
import { DemoResolver } from './modules/demo/demo.resolver'

/**
 * Генерирует schema.gql из метаданных резолверов БЕЗ подключения к БД,
 * чтобы codegen фронтенда работал офлайн. Запуск: `npm run schema:print`.
 */
async function generate(): Promise<void> {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule, { logger: false })
  await app.init()

  const schemaFactory = app.get(GraphQLSchemaFactory)
  const schema = await schemaFactory.create([
    AppResolver,
    ExperienceResolver,
    SkillResolver,
    ContactResolver,
    DemoResolver
  ])

  const outFile = join(process.cwd(), 'schema.gql')
  writeFileSync(outFile, printSchema(lexicographicSortSchema(schema)))
  console.log(`✅ Schema written to ${outFile}`)

  await app.close()
}

generate().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
