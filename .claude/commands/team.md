---
description: Hand off a feature/bug/refactor to the tech-lead-orchestrator, who breaks it into sub-agent assignments. Use for any task that touches more than one domain, or `shared/`, or the RTK Query base API.
argument-hint: <task description>
---

Invoke the `tech-lead-orchestrator` agent with the task: `$ARGUMENTS`.

The orchestrator will:

1. Analyze the task against the frontend stack (Vite / React 19 / Redux Toolkit + RTK Query / TypeScript / SCSS Modules, domain-driven architecture: `domains/*` + `shared/*` + `app/*` + `router/*`).
2. Produce a numbered list of sub-agent assignments using only agents from the repo's `.claude/agents/` roster.
3. Specify execution order (sequential vs. parallel, max 2 in parallel).
4. Flag domain(s) touched, and project-specific traps (server-state-in-slice, cross-domain imports bypassing `shared/`, `vite build` not type-checking).

After the orchestrator responds with the plan, **delegate each task to the named agent in order**. Do NOT implement code yourself when a specialist is assigned.

If `$ARGUMENTS` is empty, ask the user what they want to build / fix / refactor before invoking the orchestrator.
