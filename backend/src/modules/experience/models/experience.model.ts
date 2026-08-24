import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ExperienceKind } from '@prisma/client'

registerEnumType(ExperienceKind, {
  name: 'ExperienceKind',
  description: 'Тип записи: место работы (Job) или проект (Project)'
})

@ObjectType({ description: 'Локализованная запись опыта работы или проекта' })
export class ExperienceModel {
  @Field(() => ID)
  id!: string

  @Field(() => ExperienceKind)
  kind!: ExperienceKind

  @Field()
  company!: string

  @Field({ description: 'Должность / роль на выбранном языке' })
  role!: string

  @Field()
  location!: string

  @Field({ description: 'Период на выбранном языке' })
  period!: string

  @Field(() => [String], { description: 'Достижения/буллеты на выбранном языке' })
  bullets!: string[]

  @Field(() => [String], { description: 'Технологический стек (для проектов)' })
  stack!: string[]

  @Field(() => Int)
  order!: number
}
