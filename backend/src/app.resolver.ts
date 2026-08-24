import { Args, Query, Resolver } from '@nestjs/graphql'
import { I18nService } from 'nestjs-i18n'
import { Language } from './common/language.enum'

@Resolver()
export class AppResolver {
  constructor(private readonly i18n: I18nService) {}

  @Query(() => String, { description: 'Health-check с локализованным приветствием' })
  health(
    @Args('lang', { type: () => Language, defaultValue: Language.RU }) lang: Language
  ): string {
    return this.i18n.translate('common.greeting', { lang: lang.toLowerCase() })
  }
}
