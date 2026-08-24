import { Injectable } from '@nestjs/common'
import { Experience, ExperienceKind } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { Language } from '@/common/language.enum'
import { ExperienceModel } from './models/experience.model'

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  /** Опыт работы (kind = Job), отсортированный для таймлайна. */
  async findJobs(lang: Language): Promise<ExperienceModel[]> {
    const rows = await this.prisma.experience.findMany({
      where: { kind: ExperienceKind.Job },
      orderBy: { order: 'asc' }
    })
    return rows.map((row) => this.localize(row, lang))
  }

  /** Проекты (kind = Project). */
  async findProjects(lang: Language): Promise<ExperienceModel[]> {
    const rows = await this.prisma.experience.findMany({
      where: { kind: ExperienceKind.Project },
      orderBy: { order: 'asc' }
    })
    return rows.map((row) => this.localize(row, lang))
  }

  private localize(row: Experience, lang: Language): ExperienceModel {
    const isRu = lang === Language.RU
    return {
      id: row.id,
      kind: row.kind,
      company: isRu ? row.companyRu : row.companyEn,
      role: isRu ? row.roleRu : row.roleEn,
      location: isRu ? row.locationRu : row.locationEn,
      period: isRu ? row.periodRu : row.periodEn,
      bullets: isRu ? row.bulletsRu : row.bulletsEn,
      stack: row.stack,
      order: row.order
    }
  }
}
