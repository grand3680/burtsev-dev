import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect()
    } catch (error) {
      // Не роняем приложение, если БД недоступна: это позволяет генерировать
      // schema.gql / openapi.json офлайн (см. schema-print.ts, openapi-print.ts).
      this.logger.warn(`Database connection failed at startup: ${String(error)}`)
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
  }
}
