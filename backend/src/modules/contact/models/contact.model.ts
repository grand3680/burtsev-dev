import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Сообщение из формы обратной связи' })
export class ContactModel {
  @Field(() => ID)
  id!: string

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
  message!: string

  @Field()
  createdAt!: Date
}
