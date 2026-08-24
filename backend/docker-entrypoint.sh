#!/bin/sh
set -e

echo "▶ Applying Prisma migrations..."
npx prisma migrate deploy

echo "▶ Seeding database (idempotent)..."
npx prisma db seed || echo "⚠ Seed skipped/failed (continuing)"

echo "▶ Starting NestJS..."
exec node dist/main.js
