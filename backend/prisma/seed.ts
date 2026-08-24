import { PrismaClient, ExperienceKind } from '@prisma/client'

const prisma = new PrismaClient()

const experiences = [
  {
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
    bulletsRu: [
      'Провёл рефакторинг фронтенд-кода (150k+ строк) на архитектуру Feature-Sliced Design, унифицировал нейминг и внедрил ESLint в CI.',
      'Интегрировал smoke-тесты Playwright в GitHub Actions с Telegram-уведомлениями о каждом деплое.',
      'Мигрировал всю Stripe-инфраструктуру с эстонского юрлица на дубайское, включая клиентов и подписки.',
      'Улучшил Core Web Vitals за счёт prefetching, service worker caching, мемоизации и декомпозиции кода.',
      'Разработал систему постоянной AI-памяти, синхронизированную между провайдерами OpenAI и OpenRouter.'
    ],
    bulletsEn: [
      'Refactored the frontend (150k+ lines) to Feature-Sliced Design, unified naming, and wired ESLint into CI.',
      'Integrated Playwright smoke tests into GitHub Actions with Telegram notifications on every deploy.',
      'Migrated the entire Stripe infrastructure from an Estonian to a Dubai entity, including customers and subscriptions.',
      'Improved Core Web Vitals via prefetching, service worker caching, memoization, and code decomposition.',
      'Built a persistent AI-memory system synchronized across OpenAI and OpenRouter providers.'
    ],
    stack: [],
    order: 1
  },
  {
    kind: ExperienceKind.Job,
    companyRu: 'Domuso',
    companyEn: 'Domuso',
    roleRu: 'Full-Stack разработчик',
    roleEn: 'Full-Stack Developer',
    locationRu: 'Удалённо',
    locationEn: 'Remote',
    periodRu: 'Июль 2023 – Янв. 2026',
    periodEn: 'Jul 2023 – Jan 2026',
    startDate: new Date('2023-07-01'),
    endDate: new Date('2026-01-01'),
    bulletsRu: [
      'Поддерживал и развивал высоконагруженную платформу аренды и управления недвижимостью.',
      'Внедрил SSO и 2FA авторизацию с использованием AWS Cognito.',
      'Оптимизировал производительность React Native приложения за счёт улучшения управления состоянием.',
      'Разрабатывал serverless-модули с использованием AWS Lambda и S3.',
      'Рефакторил систему фоновой обработки с батчингом и асинхронными очередями, увеличив пропускную способность до 10× при обработке 10 000+ пользователей.'
    ],
    bulletsEn: [
      'Maintained and evolved a high-load property rental and management platform.',
      'Implemented SSO and 2FA authentication using AWS Cognito.',
      'Optimized a React Native app’s performance through better state management.',
      'Built serverless modules with AWS Lambda and S3.',
      'Refactored background processing with batching and async queues, boosting throughput up to 10× for 10,000+ users.'
    ],
    stack: [],
    order: 2
  },
  {
    kind: ExperienceKind.Job,
    companyRu: 'KIBERone',
    companyEn: 'KIBERone',
    roleRu: 'Front-End разработчик',
    roleEn: 'Front-End Developer',
    locationRu: 'Удалённо',
    locationEn: 'Remote',
    periodRu: 'Март 2022 – Июнь 2023',
    periodEn: 'Mar 2022 – Jun 2023',
    startDate: new Date('2022-03-01'),
    endDate: new Date('2023-06-30'),
    bulletsRu: [
      'Разработал CRM-платформу для преподавателей, франчайзи и администраторов.',
      'Перевёл проект на архитектуру Feature-Sliced Design, повысив масштабируемость и поддержку кода.',
      'С нуля настроил окружение тестирования с использованием Vitest.',
      'Оптимизировал CI/CD пайплайны с Docker Compose и кешированием зависимостей, сократив время сборки с 2 минут до 30 секунд.',
      'Реализовал кеширование запросов и мультиязычность с использованием i18next.'
    ],
    bulletsEn: [
      'Built a CRM platform for teachers, franchisees, and administrators.',
      'Migrated the project to Feature-Sliced Design, improving scalability and maintainability.',
      'Set up a testing environment from scratch using Vitest.',
      'Optimized CI/CD pipelines with Docker Compose and dependency caching, cutting build time from 2 minutes to 30 seconds.',
      'Implemented request caching and multilingual support with i18next.'
    ],
    stack: [],
    order: 3
  },
  {
    kind: ExperienceKind.Project,
    companyRu: 'ИИ-ассистент для медицины',
    companyEn: 'AI assistant for medicine',
    roleRu: 'Научный проект',
    roleEn: 'Research project',
    locationRu: 'Удалённо',
    locationEn: 'Remote',
    periodRu: 'Сент. 2021 – Нояб. 2021',
    periodEn: 'Sep 2021 – Nov 2021',
    startDate: new Date('2021-09-01'),
    endDate: new Date('2021-11-30'),
    bulletsRu: [
      'Разработал приложение на базе ИИ для помощи врачам в диагностике сколиоза по медицинским изображениям.',
      'Реализовал модели машинного обучения в условиях ограниченных сроков научного проекта.'
    ],
    bulletsEn: [
      'Built an AI-based application to help doctors diagnose scoliosis from medical images.',
      'Implemented machine-learning models under the tight deadlines of a research project.'
    ],
    stack: ['TensorFlow', 'Python', 'Express', 'TensorFlow.js', 'REST API', 'Tauri'],
    order: 4
  },
  {
    kind: ExperienceKind.Project,
    companyRu: 'CRM для автоматизации продаж в Telegram',
    companyEn: 'CRM for Telegram sales automation',
    roleRu: 'Личный проект',
    roleEn: 'Personal project',
    locationRu: 'Удалённо',
    locationEn: 'Remote',
    periodRu: 'Сент. 2022 – Дек. 2023',
    periodEn: 'Sep 2022 – Dec 2023',
    startDate: new Date('2022-09-01'),
    endDate: new Date('2023-12-31'),
    bulletsRu: [
      'Создал CRM-платформу для управления Telegram-ботами продаж.',
      'Реализовал SSR/SSG, динамические формы, анимации и современную архитектуру фронтенда.'
    ],
    bulletsEn: [
      'Built a CRM platform for managing Telegram sales bots.',
      'Implemented SSR/SSG, dynamic forms, animations, and a modern frontend architecture.'
    ],
    stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Formik', 'SCSS'],
    order: 5
  }
]

const skills = [
  {
    categoryRu: 'Языки',
    categoryEn: 'Languages',
    itemsRu: ['TypeScript', 'JavaScript (ES6+)', 'Python'],
    itemsEn: ['TypeScript', 'JavaScript (ES6+)', 'Python'],
    order: 1
  },
  {
    categoryRu: 'Фронтенд',
    categoryEn: 'Frontend',
    itemsRu: [
      'React',
      'Next.js',
      'Redux Toolkit',
      'RTK Query',
      'MobX',
      'TailwindCSS',
      'shadcn/ui',
      'SCSS',
      'HTML5',
      'CSS3'
    ],
    itemsEn: [
      'React',
      'Next.js',
      'Redux Toolkit',
      'RTK Query',
      'MobX',
      'TailwindCSS',
      'shadcn/ui',
      'SCSS',
      'HTML5',
      'CSS3'
    ],
    order: 2
  },
  {
    categoryRu: 'Бэкенд',
    categoryEn: 'Backend',
    itemsRu: [
      'NestJS',
      'Node.js',
      'REST API',
      'микросервисы',
      'JWT',
      'OAuth',
      'WebSockets',
      'Temporal'
    ],
    itemsEn: [
      'NestJS',
      'Node.js',
      'REST API',
      'Microservices',
      'JWT',
      'OAuth',
      'WebSockets',
      'Temporal'
    ],
    order: 3
  },
  {
    categoryRu: 'Базы данных',
    categoryEn: 'Databases',
    itemsRu: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    itemsEn: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    order: 4
  },
  {
    categoryRu: 'Тестирование',
    categoryEn: 'Testing',
    itemsRu: ['Playwright', 'Vitest', 'Jest', 'Cypress'],
    itemsEn: ['Playwright', 'Vitest', 'Jest', 'Cypress'],
    order: 5
  },
  {
    categoryRu: 'DevOps и облака',
    categoryEn: 'DevOps & Cloud',
    itemsRu: ['Docker', 'Docker Compose', 'AWS (Lambda, S3)', 'GitHub Actions', 'Git', 'GitLab'],
    itemsEn: ['Docker', 'Docker Compose', 'AWS (Lambda, S3)', 'GitHub Actions', 'Git', 'GitLab'],
    order: 6
  },
  {
    categoryRu: 'Архитектура',
    categoryEn: 'Architecture',
    itemsRu: ['Feature-Sliced Design', 'SOLID', 'Clean Architecture', 'MVC', 'CI/CD'],
    itemsEn: ['Feature-Sliced Design', 'SOLID', 'Clean Architecture', 'MVC', 'CI/CD'],
    order: 7
  }
]

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
