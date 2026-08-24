import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Категория навыков со списком элементов' })
export class SkillModel {
  @Field(() => ID)
  id!: string

  @Field({ description: 'Название категории на выбранном языке' })
  category!: string

  @Field(() => [String])
  items!: string[]

  @Field(() => Int)
  order!: number
}
