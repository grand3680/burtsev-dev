# Agent attributions

Project-specific agents (`code-reviewer`, `security-auditor`) were authored in-repo.

The following were imported from public collections in May 2026 and adapted to the frontend stack (Vite + React 19 + Redux Toolkit/RTK Query + TypeScript, domain-driven architecture):

| Agent                    | Source                                                                                                 | License | Adaptation                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `typescript-pro`         | [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)  | MIT     | Added "Project context" block; flags `vite build` skipping type-checks (esbuild transpiles without validating)         |
| `react-specialist`       | VoltAgent                                                                                               | MIT     | Added context: React 19 + domain-driven architecture                                                                   |
| `frontend-developer`     | VoltAgent                                                                                               | MIT     | Added context: SCSS Modules, domain-driven layers                                                                      |
| `api-designer`           | VoltAgent                                                                                               | MIT     | Added context: RTK Query `providesTags`/`invalidatesTags`, reference [user-api.ts](src/domains/user/api/user-api.ts)   |
| `accessibility-tester`   | VoltAgent                                                                                               | MIT     | Added context block                                                                                                    |
| `debugger`               | VoltAgent                                                                                               | MIT     | Added context block                                                                                                    |
| `performance-engineer`   | VoltAgent                                                                                               | MIT     | Added context: Core Web Vitals, bundle limits                                                                          |
| `test-automator`         | VoltAgent                                                                                               | MIT     | Added context: Vitest + `@vitejs/plugin-react`; RTL not installed                                                      |
| `tech-lead-orchestrator` | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents)           | MIT     | **Heavily rewritten**: roster, domain-boundary-aware patterns                                                          |

License: each upstream is MIT-licensed; copies retain attribution here. Modifications fall under the same MIT terms.
