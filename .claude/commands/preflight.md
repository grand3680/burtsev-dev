---
description: Run typecheck + lint across both workspaces before declaring work done. Critical because `vite build` (frontend) transpiles via esbuild without type-checking.
---

Run the local preflight gate across the monorepo (`frontend/` + `backend/`). **This is the most important sanity check in this repo** — the frontend's `vite build` transpiles TypeScript via esbuild/SWC, which strips types without validating them, so a green build does NOT mean your types are sound. You must run `tsc` explicitly.

## Steps (run from repo root)

1. `npm run typecheck` — runs `tsc` in both workspaces. This is the only thing standing between you and a runtime TypeError in production.
2. `npm run lint` — `eslint` in both workspaces. Frontend flags domain-boundary violations (`eslint-plugin-boundaries` — import direction between `shared/`, `domains/*`, `app/`, `router/`), filename/folder naming (`eslint-plugin-check-file`), and a11y rules. Backend flags strict-type-checked violations and module boundaries.
3. Optional, only if user asks: `npm run test` — vitest (frontend) + jest unit (backend). e2e is `npm run test:e2e` in backend (needs Postgres).

## Output

```
frontend typecheck: PASS / FAIL
backend  typecheck: PASS / FAIL
frontend lint:      PASS / FAIL
backend  lint:      PASS / FAIL
status:             READY / BLOCKED
```

On FAIL, paste the relevant error excerpt (last 30 lines max). For typecheck failures, prefer the first 5 errors over the last 5 — TypeScript cascades; the first errors are usually root causes.

## What this command does NOT do

- It does not run production builds. Build success means nothing here (esbuild strips types without checking them). Run typecheck explicitly.
- It does not auto-fix lint errors. `npm run lint:fix` is a separate, opt-in operation.
- The generated GraphQL client (`frontend/src/shared/api/generated.ts`) is lint-excluded but still type-checked.
