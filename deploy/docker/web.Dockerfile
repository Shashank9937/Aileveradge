FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@9.15.0

FROM base AS deps
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json .
COPY apps ./apps
COPY packages ./packages
RUN pnpm install --frozen-lockfile=false

FROM deps AS build
RUN pnpm --filter @ops-pilot/schemas build && \
    pnpm --filter @ops-pilot/sdk build && \
    pnpm --filter @ops-pilot/ui build && \
    pnpm --filter @ops-pilot/web build

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=build /app/apps/web/.next ./apps/web/.next
COPY --from=deps /app/node_modules ./node_modules
COPY apps/web/package.json ./apps/web/package.json
COPY package.json .
EXPOSE 3000
CMD ["sh", "-c", "cd apps/web && node_modules/.bin/next start -p ${PORT:-3000}"]
