import { registerEnumType } from '@nestjs/graphql'

/** Поддерживаемые языки контента. */
export enum Language {
  RU = 'RU',
  EN = 'EN'
}

registerEnumType(Language, {
  name: 'Language',
  description: 'Язык, на котором вернуть локализованный контент'
})
