import { PrismaClient } from '@prisma/client'
import { experiences, skills } from '../src/seed/seed-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.contact.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.skill.deleteMany()

  for (const experience of experiences) {
    await prisma.experience.create({ data: experience })
  }
  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }

  console.log(
    `✅ Seeded ${String(experiences.length)} experiences and ${String(skills.length)} skill groups.`
  )
}

main()
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => {
    void prisma.$disconnect()
  })
