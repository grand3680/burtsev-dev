# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# ---------- production ----------
FROM node:22-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache openssl
# Copy the full build (incl. node_modules with prisma CLI + ts-node for migrate/seed).
COPY --from=build /app ./
EXPOSE 4000
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
