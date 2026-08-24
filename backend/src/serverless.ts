import type { IncomingMessage, ServerResponse } from 'node:http'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

// Точка входа для Vercel Serverless Functions.
// В отличие от main.ts не вызывает app.listen — Vercel сам передаёт req/res.
// Инстанс Nest кэшируется между вызовами в рамках одного тёплого контейнера.

type ExpressInstance = (req: IncomingMessage, res: ServerResponse) => void

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

  await app.init()

  return app.getHttpAdapter().getInstance() as ExpressInstance
}

export async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  serverPromise ??= bootstrap()
  const server = await serverPromise
  server(req, res)
}
