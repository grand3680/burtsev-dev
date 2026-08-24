#!/usr/bin/env bash
# StatusLine: shows [repo] branch · model · ctx-est
# Receives session JSON on stdin; outputs one line to stdout.

input=$(cat)

# Use node since jq isn't guaranteed; this repo has Node 20+.
read -r dir model transcript < <(node -e '
let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
  try {
    const j=JSON.parse(d);
    const dir = j?.workspace?.current_dir || j?.cwd || process.cwd();
    const model = j?.model?.display_name || j?.model?.id || "claude";
    const transcript = j?.transcript_path || "";
    process.stdout.write(`${dir}\t${model}\t${transcript}\n`);
  } catch (_) {
    process.stdout.write(`.\tclaude\t\n`);
  }
})' <<<"$input")

# Replace literal tabs with spaces for prefix detection
dir="${dir%%	*}"

repo=$(basename -- "$dir")
branch=$(git -C "$dir" branch --show-current 2>/dev/null)
branch="${branch:-detached}"

# Rough token usage from transcript size (each transcript line ~50-200 tokens).
# Cheap proxy — not exact, but trends correctly.
ctx_kb=""
if [ -n "$transcript" ] && [ -f "$transcript" ]; then
  bytes=$(wc -c <"$transcript" 2>/dev/null | tr -d ' ')
  if [ -n "$bytes" ] && [ "$bytes" -gt 0 ]; then
    # rough: bytes/4 ≈ tokens, divide by 1000 for k
    ctx_kb=" · ~$(( bytes / 4000 ))k tok"
  fi
fi

# Truncate long branches
if [ ${#branch} -gt 32 ]; then
  branch="${branch:0:29}..."
fi

printf '[%s] %s · %s%s' "$repo" "$branch" "$model" "$ctx_kb"
