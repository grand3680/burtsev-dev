#!/usr/bin/env bash
# PreToolUse hook for Bash — blocks destructive operations.
# Reads tool input as JSON on stdin; exit 2 to block.

set -u

# Extract command from tool_input. node is required by both repos; using it
# avoids depending on jq being installed.
cmd=$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{process.stdout.write(JSON.parse(d)?.tool_input?.command??"")}catch(_){}})' 2>/dev/null)

block() {
  printf '[claude-hook] Blocked: %s\n' "$1" >&2
  printf '[claude-hook] Command: %s\n' "$cmd" >&2
  # В GitHub Actions ::error:: всплывает в логе джоба и в Summary — облегчает диагностику
  # сценариев типа «agent застрял на permission_denials». Локальные запуски игнорируют префикс.
  if [ -n "${GITHUB_ACTIONS:-}" ]; then
    # Эскейпим переводы строк под workflow-command формат
    safe_cmd=$(printf '%s' "$cmd" | tr '\n' ' ')
    printf '::error title=claude-hook blocked::%s | cmd: %s\n' "$1" "$safe_cmd" >&2
  fi
  exit 2
}

# rm -rf / rm -fr on dangerous targets
if printf '%s' "$cmd" | grep -qE 'rm[[:space:]]+(-[a-zA-Z]*[rf][a-zA-Z]*[[:space:]]+|-r[[:space:]]+-f[[:space:]]+|-f[[:space:]]+-r[[:space:]]+)(/|~|\$HOME|\*|\.\.|\.)([[:space:]]|$)'; then
  block "rm with recursive+force on protected target"
fi

# find ... -delete and xargs rm
if printf '%s' "$cmd" | grep -qE 'find[[:space:]].+-delete\b'; then
  block "find -delete"
fi
if printf '%s' "$cmd" | grep -qE 'xargs[[:space:]]+(-[a-zA-Z0-9]+[[:space:]]+)*rm\b'; then
  block "xargs rm"
fi

# Force-push to protected branches (covers --force, -f, --force-with-lease)
if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+push.*(--force[a-z-]*|[[:space:]]-f[[:space:]]|[[:space:]]-f$)' \
   && printf '%s' "$cmd" | grep -qE '\b(main|master|develop)\b'; then
  block "git push --force to protected branch (main/master/develop)"
fi

# Refspec force-push: +main, +master, +develop
if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+push.+[[:space:]]\+(main|master|develop)\b'; then
  block "git push with +<protected> refspec (force)"
fi

# Delete remote protected branch
if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+push.+:(main|master|develop)\b'; then
  block "git push deleting protected branch"
fi

exit 0
