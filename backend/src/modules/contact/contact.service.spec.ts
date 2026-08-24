import { Test } from '@nestjs/testing'
import { PrismaService } from '@/prisma/prisma.service'
import { ContactService } from './contact.service'

describe('ContactService', () => {
  const prismaMock = {
    contact: {
      create: jest.fn().mockImplementation(({ data }: { data: Record<string, unknown> }) =>
        Promise.resolve({ id: 'c1', createdAt: new Date(), ...data })
      )
    }
  }

  let service: ContactService

  beforeEach(async () => {
    jest.clearAllMocks()
    const moduleRef = await Test.createTestingModule({
      providers: [ContactService, { provide: PrismaService, useValue: prismaMock }]
    }).compile()
    service = moduleRef.get(ContactService)
  })

  it('trims name/message and lowercases the email', async () => {
    const result = await service.submit({
      name: '  Kirill  ',
      email: '  Kirill.Burtsev07@GMAIL.com ',
      message: '  Hello there  '
    })

    expect(result.name).toBe('Kirill')
    expect(result.email).toBe('kirill.burtsev07@gmail.com')
    expect(result.message).toBe('Hello there')
    expect(prismaMock.contact.create).toHaveBeenCalledTimes(1)
  })
})
