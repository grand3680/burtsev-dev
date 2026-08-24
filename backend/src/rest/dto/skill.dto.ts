import { ApiProperty } from '@nestjs/swagger'

export class SkillDto {
  @ApiProperty({ example: 'clx456' })
  id!: string

  @ApiProperty({ description: 'Название категории на выбранном языке', example: 'Фронтенд' })
  category!: string

  @ApiProperty({ type: [String], example: ['React', 'Next.js', 'TailwindCSS'] })
  items!: string[]

  @ApiProperty({ example: 2 })
  order!: number
}
