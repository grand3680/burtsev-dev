# Project subagents (frontend)

Hand-written, project-specific subagents. Triggered by Claude Code automatically when the user request matches their `description:` frontmatter, or explicitly via the Task tool with `subagent_type`.

| Agent                                    | When it fires                                                                                                                                                        | What it does                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [code-reviewer](code-reviewer.md)        | On request, or after a non-trivial implementation. Imported from [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (MIT)                         | Generic senior-engineer code review — readability, error handling, security, correctness  |
| [security-auditor](security-auditor.md)  | On request, or before merging anything touching auth/api-routes/payments. Imported from [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (MIT)  | Security audit — secrets handling, input validation, authn/authz, XSS/CSRF, OWASP-style checks |

## Conventions

- **Trigger discipline:** if you find yourself doing one of the above tasks manually, the agent's `description:` is probably wrong. Edit the description, not your workflow.
- **Agents read, propose, do not silently edit.** They surface findings and let you decide.
- **No new agents without a real footgun.** Lint (`eslint-plugin-boundaries` for the domain-boundary rules), typecheck (`tsc -b`), and the format hook catch most things. Subagents are for things deterministic tooling cannot catch.

## Adding a new agent

1. Create `<name>.md` here with frontmatter (`name`, `description`, `tools`).
2. Make the `description:` start with "Use proactively when…" so auto-invocation picks it up.
3. Reference concrete file paths where stable; use grep patterns where they're not.
4. Add a row to the table above.
5. Smoke-test with one realistic task before declaring done.
