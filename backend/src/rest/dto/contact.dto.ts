import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SubmitContactBody {
  @ApiProperty({ example: 'Кирилл', minLength: 2, maxLength: 80 })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(80)
  name!: string

  @ApiProperty({ example: 'kirill.burtsev07@gmail.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'Здравствуйте! Хочу обсудить сотрудничество.', minLength: 5 })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(2000)
  message!: string
}

export class ContactDto {
  @ApiProperty()
  id!: string

  @ApiProperty()
  name!: string

  @ApiProperty()
  email!: string

  @ApiProperty()
  message!: string

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date
}
