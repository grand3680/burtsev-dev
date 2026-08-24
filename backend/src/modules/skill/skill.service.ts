import { Injectable } from '@nestjs/common'
import { Skill } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { Language } from '@/common/language.enum'
import { SkillModel } from './models/skill.model'

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(lang: Language): Promise<SkillModel[]> {
    const rows = await this.prisma.skill.findMany({ orderBy: { order: 'asc' } })
    return rows.map((row) => this.localize(row, lang))
  }

  private localize(row: Skill, lang: Language): SkillModel {
    const isRu = lang === Language.RU
    return {
      id: row.id,
      category: isRu ? row.categoryRu : row.categoryEn,
      items: isRu ? row.itemsRu : row.itemsEn,
      order: row.order
    }
  }
}
