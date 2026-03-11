FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@9.15.0

FROM base AS deps
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json .
COPY apps ./apps
COPY services ./services
COPY agents ./agents
COPY packages ./packages
RUN pnpm install --frozen-lockfile=false

FROM deps AS build
RUN pnpm --filter @ops-pilot/config build && \
    pnpm --filter @ops-pilot/schemas build && \
    pnpm --filter @ops-pilot/observability build && \
    pnpm --filter @ops-pilot/auth build && \
    pnpm --filter @ops-pilot/api build

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=deps /app/node_modules ./node_modules
COPY package.json .
EXPOSE 4000
CMD ["node", "apps/api/dist/index.js"]
