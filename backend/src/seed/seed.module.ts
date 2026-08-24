import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'

// PrismaModule глобальный, поэтому PrismaService доступен без явного импорта.
@Module({
  providers: [SeedService]
})
export class SeedModule {}
