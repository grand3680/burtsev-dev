import { Args, Query, Resolver } from '@nestjs/graphql'
import { Language } from '@/common/language.enum'
import { DemoResultModel } from './models/demo.model'
import { DemoService } from './demo.service'

@Resolver(() => DemoResultModel)
export class DemoResolver {
  constructor(private readonly demoService: DemoService) {}

  @Query(() => DemoResultModel, {
    description: 'Демо-запрос секции data-fetching: ступени выполнения + реальные данные'
  })
  runDemo(
    @Args('lang', { type: () => Language, defaultValue: Language.RU }) lang: Language
  ): Promise<DemoResultModel> {
    return this.demoService.run(lang)
  }
}
