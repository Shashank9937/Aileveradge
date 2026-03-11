FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@9.15.0

FROM base AS deps
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json .
COPY services ./services
COPY packages ./packages
RUN pnpm install --frozen-lockfile=false

FROM deps AS build
ARG WORKER_PACKAGE=@ops-pilot/executor
RUN pnpm --filter @ops-pilot/config build && \
    pnpm --filter @ops-pilot/observability build && \
    pnpm --filter ${WORKER_PACKAGE} build

FROM node:22-alpine AS runtime
WORKDIR /app
ARG WORKER_ENTRY=services/executor/dist/index.js
ENV WORKER_ENTRY=${WORKER_ENTRY}
COPY --from=build /app/services ./services
COPY --from=build /app/packages ./packages
COPY --from=deps /app/node_modules ./node_modules
COPY package.json .
CMD ["sh", "-c", "node ${WORKER_ENTRY}"]
