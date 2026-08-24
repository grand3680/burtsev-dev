import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType()
export class SubmitContactInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(80)
  name!: string

  @Field()
  @IsEmail()
  email!: string

  @Field()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(2000)
  message!: string
}
