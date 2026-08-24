import { Module } from '@nestjs/common'
import { ExperienceModule } from '@/modules/experience/experience.module'
import { DemoService } from './demo.service'
import { DemoResolver } from './demo.resolver'

@Module({
  imports: [ExperienceModule],
  providers: [DemoService, DemoResolver]
})
export class DemoModule {}
