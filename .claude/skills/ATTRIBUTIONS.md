# Skills attribution

The skills in this directory are cherry-picked from upstream open-source repositories. All upstream files are MIT-licensed; the `LICENSE` of each upstream repo is referenced below and the original copyright headers in each SKILL.md are preserved.

## Sources

| Skill                            | Upstream                                                              | Author                        | License |
| -------------------------------- | --------------------------------------------------------------------- | ----------------------------- | ------- |
| `verification-before-completion` | [obra/superpowers](https://github.com/obra/superpowers)               | Jesse Vincent (Prime Radiant) | MIT     |
| `systematic-debugging`           | [obra/superpowers](https://github.com/obra/superpowers)               | Jesse Vincent                 | MIT     |
| `test-driven-development`        | [obra/superpowers](https://github.com/obra/superpowers)               | Jesse Vincent                 | MIT     |
| `dispatching-parallel-agents`    | [obra/superpowers](https://github.com/obra/superpowers)               | Jesse Vincent                 | MIT     |
| `using-git-worktrees`            | [obra/superpowers](https://github.com/obra/superpowers)               | Jesse Vincent                 | MIT     |
| `requesting-code-review`         | [obra/superpowers](https://github.com/obra/superpowers)               | Jesse Vincent                 | MIT     |
| `frontend-ui-engineering`        | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Addy Osmani                   | MIT     |
| `performance-optimization`       | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Addy Osmani                   | MIT     |
| `browser-testing-with-devtools`  | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Addy Osmani                   | MIT     |
| `security-and-hardening`         | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Addy Osmani                   | MIT     |

The agents in `../agents/code-reviewer.md` and `../agents/security-auditor.md` are also from [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (MIT).

## Maintenance policy

- **No edits to upstream files.** If a skill needs project-specific tweaks (Vite/React specifics, domain-boundary rules, etc.), add a project-specific skill in `.claude/skills/<our-name>/` or extend our hand-written agents in `.claude/agents/`. This keeps upstream sync trivial.
- **Re-sync:** to pull upstream updates, re-clone the source repo and `cp -r skills/<name>/ .claude/skills/<name>/` for each accepted skill. Diff first; reject any change that introduces new external dependencies.
- **License compliance:** upstream MIT licenses persist in each repo's `LICENSE` file. Attribution is provided here; authorship is preserved in each SKILL.md frontmatter. MIT permits this use. If we ever bundle these for redistribution outside this repo, copy the upstream `LICENSE` into the corresponding skill directory.
