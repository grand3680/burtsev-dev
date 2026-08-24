import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ExperienceModel } from '@/modules/experience/models/experience.model'

@ObjectType({ description: 'Одна ступень выполнения запроса (для анимации на фронте)' })
export class DemoStepModel {
  @Field({ description: 'Машинный ключ ступени: validation | interceptor | parsing' })
  key!: string

  @Field({ description: 'Человекочитаемая метка на выбранном языке' })
  label!: string

  @Field(() => Int, { description: 'Рекомендованная длительность анимации ступени, мс' })
  durationMs!: number
}

@ObjectType({ description: 'Результат демо-запроса: ступени + реальные данные с бэкенда' })
export class DemoResultModel {
  @Field(() => [DemoStepModel])
  steps!: DemoStepModel[]

  @Field(() => Int)
  totalDurationMs!: number

  @Field(() => Int, { description: 'Количество записей опыта в базе' })
  experiencesCount!: number

  @Field(() => Int, { description: 'Количество категорий навыков в базе' })
  skillsCount!: number

  @Field({ description: 'Время ответа сервера (ISO)' })
  serverTime!: string

  @Field(() => [ExperienceModel], { description: 'Реальные данные, полученные с бэкенда' })
  experiences!: ExperienceModel[]
}
