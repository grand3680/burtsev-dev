# CLAUDE.md — burtsev-dev

> **This file is the authoritative project context.** Some agents/skills under `.claude/` were
> seeded from a generic frontend template and may still mention SCSS Modules, RTK Query, or a
> `src/domains/user/...` path — **those references are stale; this file wins.** Real stack below.

## What this is

Персональный сайт-визитка (портфолио) Кирилла Бурцева. Монорепо: анимированный фронтенд +
GraphQL-бэкенд, который отдаёт весь контент (опыт, навыки, проекты). Поднимается через Docker Compose.

## Monorepo layout (npm workspaces)

- `frontend/` — Vite + React 19, доменная архитектура, Tailwind + shadcn/ui, Apollo Client.
- `backend/` — NestJS + Prisma + GraphQL (code-first) + Postgres.
- Root — prettier, husky/lint-staged, docker-compose, `.claude/`.

Run all: `docker compose up --build`. Local dev: `npm install` at root, then `npm run dev`.

## Frontend architecture (domain-driven, NOT Feature-Sliced)

Layers under `frontend/src/`:

- `shared/*` — reusable, may import only `shared/*`. Contains `ui/` (shadcn components), `lib/`,
  `api/` (Apollo client + generated hooks), `i18n/`, `three/`, `styles/`.
- `domains/<name>/*` — may import its **own** domain + `shared/*`; **never** another domain.
  Cross-domain reuse goes through `shared/`. Each domain: `ui/`, `pages/`, `api/`, `lib/`,
  `locales/{ru,en}.json`.
- `app/*` and `router/*` — may import any domain + `shared/*`.

These import directions are **enforced by ESLint** (`eslint-plugin-boundaries`). Path aliases
`@app`, `@shared`, `@domains`, `@router` (tsconfig + `vite-tsconfig-paths`).

Domains: `home`, `capabilities`, `data-fetching`, `timeline`, `contacts`.

## Key rules

- **`vite build` does NOT type-check** (esbuild/SWC strip types). Always run `npm run typecheck`
  (`tsc`) separately. Use `/preflight`.
- **Server state lives in Apollo Client**, never mirrored into `useState`. Use the generated typed
  hooks from `@shared/api/generated`. See `/check-apollo`.
- **Styling = Tailwind + shadcn/ui.** Design tokens are CSS variables in `shared/styles`.
  Dark/light via `.dark` class on `<html>`. No SCSS Modules.
- **i18n is mandatory** (ru/en). Frontend: i18next auto-glob of `domains/*/locales/*.json` in
  `app/i18n.ts`. Backend: `nestjs-i18n`. Language switch in the header, persisted to localStorage.
- **Filenames/folders are kebab-case** (`eslint-plugin-check-file`); React components are still
  PascalCase symbols. shadcn CLI already emits kebab-case files.
- **Generated files** (`frontend/src/shared/api/generated.ts`, `backend/schema.gql`) are committed,
  lint/format-excluded, but still type-checked.

## Backend architecture

NestJS modules as layers, code-first GraphQL (`autoSchemaFile`). Modules: `experience`, `skill`,
`project`, `contact`, `demo`. `PrismaService` is global. `common/` holds interceptors (logging/
timing), filters, pipes. Content is seeded from the résumé (ru + en) in `prisma/seed.ts`.

## Testing

- Frontend: **vitest** + React Testing Library (unit).
- Backend: **jest** unit + e2e (supertest against `/graphql`, needs Postgres).

## Animation stack (frontend)

Three.js via `@react-three/fiber` + `@react-three/drei` (particle logo), Framer Motion
(`motion/react`, parallax + reveals), GSAP + ScrollTrigger (work timeline). Always provide a
`prefers-reduced-motion` fallback.
