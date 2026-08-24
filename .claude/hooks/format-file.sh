#!/usr/bin/env bash
# PostToolUse hook for Edit/Write — formats the changed file with prettier.
# Must never block — exits 0 even on failure.

file=$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{process.stdout.write(JSON.parse(d)?.tool_input?.file_path??"")}catch(_){}})' 2>/dev/null)

[ -z "$file" ] && exit 0
[ ! -f "$file" ] && exit 0

case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.cjs|*.mjs|*.json|*.scss|*.css|*.md)
    npx --no-install prettier --write "$file" --log-level silent >/dev/null 2>&1 || true
    ;;
esac

exit 0
