import { Args, Query, Resolver } from '@nestjs/graphql'
import { Language } from '@/common/language.enum'
import { SkillModel } from './models/skill.model'
import { SkillService } from './skill.service'

@Resolver(() => SkillModel)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Query(() => [SkillModel], { description: 'Категории навыков' })
  skills(
    @Args('lang', { type: () => Language, defaultValue: Language.RU }) lang: Language
  ): Promise<SkillModel[]> {
    return this.skillService.findAll(lang)
  }
}
