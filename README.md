# Сайт-визитка — Кирилл Бурцев

Персональный сайт-визитка (портфолио) с сильными анимациями и «показательной» демонстрацией того,
как я работаю с кодом и запросами. Весь контент (опыт работы, навыки, проекты) отдаёт собственный
GraphQL-бэкенд — секция data-fetching дёргает его в реальном времени.

## Стек

| Слой        | Технологии                                                                       |
| ----------- | -------------------------------------------------------------------------------- |
| Frontend    | TypeScript, Vite, React 19, Tailwind CSS + shadcn/ui, Apollo Client              |
| Анимации/3D | Three.js (`@react-three/fiber` + `drei`), Framer Motion, GSAP (ScrollTrigger)    |
| i18n        | i18next / react-i18next (ru · en)                                                |
| Backend     | Node.js, NestJS, GraphQL (code-first), Prisma, PostgreSQL                         |
| i18n (API)  | nestjs-i18n (ru · en)                                                             |
| Тесты       | Vitest + RTL (фронт), Jest unit + e2e/supertest (бэк)                             |
| Качество    | ESLint (жёсткие правила + границы слоёв), Prettier, Husky + lint-staged           |
| Инфра       | Docker, Docker Compose, npm workspaces                                            |

## Структура

```
burtsev-dev/
├── frontend/   # Vite + React 19, доменная архитектура, Tailwind + shadcn/ui, Apollo
├── backend/    # NestJS + Prisma + GraphQL + Postgres
├── .claude/    # агентный сетап (агенты, hooks, команды, скиллы)
├── docker-compose.yml
└── package.json (npm workspaces)
```

Подробнее об архитектуре — в [CLAUDE.md](CLAUDE.md).

## Быстрый старт (Docker)

```bash
cp .env.example .env
docker compose up --build
```

- Фронтенд: http://localhost:5173
- GraphQL API: http://localhost:4000/graphql

Бэкенд на старте применяет миграции Prisma и засевает контент из резюме (ru + en).

## Локальная разработка

```bash
cp .env.example .env
npm install                 # ставит зависимости обоих воркспейсов
# поднимите Postgres (например: docker compose up -d postgres)
npm run -w backend prisma:migrate   # применить миграции
npm run -w backend prisma:seed      # засеять контент
npm run codegen             # сгенерировать типизированные GraphQL-хуки для фронта
npm run dev                 # backend :4000 + frontend :5173
```

## Полезные команды (из корня)

| Команда              | Действие                                              |
| -------------------- | ----------------------------------------------------- |
| `npm run dev`        | Запуск фронта и бэка параллельно                      |
| `npm run lint`       | ESLint по обоим воркспейсам                            |
| `npm run typecheck`  | `tsc` по обоим воркспейсам                             |
| `npm run test`       | Vitest (фронт) + Jest unit (бэк)                      |
| `npm run test:e2e`   | e2e-тесты бэкенда (нужен Postgres)                    |
| `npm run codegen`    | GraphQL codegen → типизированные хуки фронта          |
| `npm run format`     | Prettier по репозиторию                               |

В сессии Claude Code доступна команда `/preflight` (typecheck + lint по монорепо).

## Разделы сайта

1. **Hero** — краткое описание, переключатели языка и темы в хедере; справа 3D-лого из частиц
   (Three.js), собирается в единый образ и реагирует на курсор.
2. **Параллакс** между секциями при скролле.
3. **Что я могу** — интеграции (Stripe / S3 / AWS / OpenAI) соединяются SVG-линиями с центральным
   словом **API**; линии пульсируют и светятся как провода под током.
4. **Data-fetching** — слева пример GraphQL-запроса и кнопка «Запустить»; справа пошаговое
   выполнение (валидация → интерсептор → парсинг), после анимации — реальный запрос к бэкенду и
   отрисовка данных.
5. **Timeline** — трек опыта работы со скролл-анимацией (GSAP ScrollTrigger).
6. **Контакты** — email / GitHub / Telegram и форма обратной связи (GraphQL mutation).

Тёмная/светлая тема, полная адаптивность (mobile-first) и кроссбраузерность, а также
`prefers-reduced-motion` fallback для 3D/анимаций.
