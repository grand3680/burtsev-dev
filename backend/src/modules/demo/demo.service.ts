import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { Language } from '@/common/language.enum'
import { ExperienceService } from '@/modules/experience/experience.service'
import { DemoResultModel, DemoStepModel } from './models/demo.model'

const STEP_LABELS: Record<string, { ru: string; en: string; durationMs: number }> = {
  validation: { ru: 'Валидация входных данных', en: 'Input validation', durationMs: 700 },
  interceptor: { ru: 'Интерсептор запроса', en: 'Request interceptor', durationMs: 900 },
  parsing: { ru: 'Парсинг и нормализация', en: 'Parsing & normalization', durationMs: 800 }
}

@Injectable()
export class DemoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly experienceService: ExperienceService
  ) {}

  async run(lang: Language): Promise<DemoResultModel> {
    const steps: DemoStepModel[] = Object.entries(STEP_LABELS).map(([key, value]) => ({
      key,
      label: lang === Language.RU ? value.ru : value.en,
      durationMs: value.durationMs
    }))

    const [experiences, experiencesCount, skillsCount] = await Promise.all([
      this.experienceService.findJobs(lang),
      this.prisma.experience.count(),
      this.prisma.skill.count()
    ])

    return {
      steps,
      totalDurationMs: steps.reduce((sum, step) => sum + step.durationMs, 0),
      experiencesCount,
      skillsCount,
      serverTime: new Date().toISOString(),
      experiences
    }
  }
}
