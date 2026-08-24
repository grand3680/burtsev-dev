import { Test } from '@nestjs/testing'
import { ExperienceKind } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { Language } from '@/common/language.enum'
import { ExperienceService } from './experience.service'

describe('ExperienceService', () => {
  const row = {
    id: '1',
    kind: ExperienceKind.Job,
    companyRu: 'Overchat',
    companyEn: 'Overchat',
    roleRu: 'Full-Stack разработчик',
    roleEn: 'Full-Stack Developer',
    locationRu: 'Офис',
    locationEn: 'On-site',
    periodRu: 'Янв. 2026 – Июн. 2026',
    periodEn: 'Jan 2026 – Jun 2026',
    startDate: new Date('2026-01-01'),
    endDate: new Date('2026-06-30'),
    bulletsRu: ['раз', 'два'],
    bulletsEn: ['one', 'two'],
    stack: [],
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const prismaMock = {
    experience: {
      findMany: jest.fn().mockResolvedValue([row])
    }
  }

  let service: ExperienceService

  beforeEach(async () => {
    jest.clearAllMocks()
    const moduleRef = await Test.createTestingModule({
      providers: [ExperienceService, { provide: PrismaService, useValue: prismaMock }]
    }).compile()
    service = moduleRef.get(ExperienceService)
  })

  it('localizes jobs to Russian', async () => {
    const result = await service.findJobs(Language.RU)
    expect(result[0].role).toBe('Full-Stack разработчик')
    expect(result[0].location).toBe('Офис')
    expect(result[0].period).toBe('Янв. 2026 – Июн. 2026')
    expect(result[0].bullets).toEqual(['раз', 'два'])
  })

  it('localizes jobs to English', async () => {
    const result = await service.findJobs(Language.EN)
    expect(result[0].role).toBe('Full-Stack Developer')
    expect(result[0].location).toBe('On-site')
    expect(result[0].bullets).toEqual(['one', 'two'])
  })

  it('queries only Job kind ordered by order', async () => {
    await service.findJobs(Language.RU)
    expect(prismaMock.experience.findMany).toHaveBeenCalledWith({
      where: { kind: ExperienceKind.Job },
      orderBy: { order: 'asc' }
    })
  })
})
