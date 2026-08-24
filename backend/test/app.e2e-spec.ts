import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/app.module'

/**
 * e2e-тесты бьют по реальному GraphQL-эндпоинту.
 * Требуется поднятый Postgres и применённые миграции (см. README).
 */
describe('GraphQL API (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('experiences query returns localized rows', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query { experiences(lang: RU) { id company role period bullets } }`
      })
      .expect(200)

    const experiences = response.body.data.experiences
    expect(Array.isArray(experiences)).toBe(true)
    expect(experiences.length).toBeGreaterThan(0)
    expect(experiences[0]).toHaveProperty('company')
  })

  it('runDemo returns steps and real data', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query { runDemo(lang: EN) { steps { key label durationMs } experiencesCount skillsCount experiences { company } } }`
      })
      .expect(200)

    const demo = response.body.data.runDemo
    expect(demo.steps.map((s: { key: string }) => s.key)).toEqual([
      'validation',
      'interceptor',
      'parsing'
    ])
    expect(demo.experiencesCount).toBeGreaterThan(0)
  })

  it('submitContact validates the email', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation { submitContact(input: { name: "Ab", email: "not-an-email", message: "hello!" }) { id } }`
      })
      .expect(200)

    expect(response.body.errors).toBeDefined()
  })

  it('submitContact stores a valid message', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation { submitContact(input: { name: "Kirill", email: "kirill@example.com", message: "Hello from e2e" }) { id name email } }`
      })
      .expect(200)

    expect(response.body.data.submitContact).toMatchObject({
      name: 'Kirill',
      email: 'kirill@example.com'
    })
  })
})
