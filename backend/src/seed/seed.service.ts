import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { experiences, skills } from './seed-data'

// Ключ advisory-лока сида. Произвольная константа, общая для всех инстансов,
// чтобы параллельные старты (напр. несколько serverless-инстансов Vercel)
// не сидировали одновременно и не плодили дубликаты.
const SEED_LOCK_KEY = 4927348572001n

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name)

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    // Отключается переменной SEED_ON_BOOT=false (напр. в проде, где контент уже залит).
    if (process.env.SEED_ON_BOOT === 'false') {
      this.logger.log('SEED_ON_BOOT=false — пропускаю сид на старте')
      return
    }

    try {
      await this.seed()
    } catch (error) {
      // Не роняем приложение: БД может быть недоступна или ещё не мигрирована.
      this.logger.warn(`Сид на старте не выполнен: ${String(error)}`)
    }
  }

  private async seed(): Promise<void> {
    this.logger.log('🌱 Заливаю контент в БД...')

    // Идемпотентно: чистим и пересоздаём справочный контент.
    // Contact НЕ трогаем — там копятся заявки из формы.
    //
    // pg_advisory_xact_lock сериализует параллельные сиды: без него две
    // одновременные транзакции успевают сделать deleteMany до того, как станут
    // видны вставки соседа (Read Committed), и обе вставляют полный набор →
    // дубликаты. Лок держится до конца транзакции; второй инстанс ждёт, затем
    // его deleteMany схлопывает данные ровно к набору из сида.
    await this.prisma.$transaction([
      this.prisma.$executeRaw`SELECT pg_advisory_xact_lock(${SEED_LOCK_KEY})`,
      this.prisma.experience.deleteMany(),
      this.prisma.skill.deleteMany(),
      ...experiences.map((data) => this.prisma.experience.create({ data })),
      ...skills.map((data) => this.prisma.skill.create({ data }))
    ])

    this.logger.log(
      `✅ Залито: ${String(experiences.length)} опытов, ${String(skills.length)} групп навыков`
    )
  }
}
