import { ApiProperty } from '@nestjs/swagger'
import { ExperienceKind } from '@prisma/client'

export class ExperienceDto {
  @ApiProperty({ example: 'clx123' })
  id!: string

  @ApiProperty({ enum: ExperienceKind, enumName: 'ExperienceKind' })
  kind!: ExperienceKind

  @ApiProperty({ example: 'Overchat' })
  company!: string

  @ApiProperty({ description: 'Должность/роль на выбранном языке' })
  role!: string

  @ApiProperty({ example: 'Удалённо' })
  location!: string

  @ApiProperty({ description: 'Период на выбранном языке' })
  period!: string

  @ApiProperty({ type: [String], description: 'Достижения/буллеты' })
  bullets!: string[]

  @ApiProperty({ type: [String], description: 'Технологический стек (для проектов)' })
  stack!: string[]

  @ApiProperty({ example: 1 })
  order!: number
}
