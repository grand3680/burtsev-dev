import { Args, Query, Resolver } from '@nestjs/graphql'
import { Language } from '@/common/language.enum'
import { ExperienceModel } from './models/experience.model'
import { ExperienceService } from './experience.service'

@Resolver(() => ExperienceModel)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Query(() => [ExperienceModel], { description: 'Опыт работы для таймлайна' })
  experiences(
    @Args('lang', { type: () => Language, defaultValue: Language.RU }) lang: Language
  ): Promise<ExperienceModel[]> {
    return this.experienceService.findJobs(lang)
  }

  @Query(() => [ExperienceModel], { description: 'Проекты' })
  projects(
    @Args('lang', { type: () => Language, defaultValue: Language.RU }) lang: Language
  ): Promise<ExperienceModel[]> {
    return this.experienceService.findProjects(lang)
  }
}
