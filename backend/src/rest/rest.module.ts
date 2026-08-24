import { Module } from '@nestjs/common'
import { ExperienceModule } from '@/modules/experience/experience.module'
import { SkillModule } from '@/modules/skill/skill.module'
import { ContactModule } from '@/modules/contact/contact.module'
import { ExperienceController } from './experience.controller'
import { SkillController } from './skill.controller'
import { ContactController } from './contact.controller'
import { HealthController } from './health.controller'

/**
 * REST-зеркало GraphQL-контрактов — существует ради OpenAPI/Swagger-документации,
 * которую мы (а) отдаём как Swagger UI на /docs и (б) частично показываем на фронте.
 */
@Module({
  imports: [ExperienceModule, SkillModule, ContactModule],
  controllers: [ExperienceController, SkillController, ContactController, HealthController]
})
export class RestModule {}
