#!/usr/bin/env bash
# PreToolUse hook for Edit/Write/Read — blocks access to env files.
# Reads tool input as JSON on stdin; exit 2 to block.

set -u

file=$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{process.stdout.write(JSON.parse(d)?.tool_input?.file_path??"")}catch(_){}})' 2>/dev/null)

# No file path → nothing to check
[ -z "$file" ] && exit 0

basename=$(basename -- "$file")

# Whitelist: example/sample/test variants are documentation, not secrets
case "$basename" in
  .env.example|.env.sample|.env.test|.env.template) exit 0 ;;
esac

# Block any other .env* file
case "$basename" in
  .env|.env.*)
    printf '[claude-hook] Blocked access to env file: %s\n' "$file" >&2
    printf '[claude-hook] If you need to read example values, use .env.example.\n' >&2
    exit 2
    ;;
esac

exit 0
