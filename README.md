# OpsPilot

OpsPilot is an AI-native cloud cost and reliability automation platform.

## Monorepo layout

- `apps/api`: Fastify API gateway and domain APIs
- `apps/web`: Next.js customer-facing dashboard
- `apps/admin`: Internal operations dashboard
- `apps/slack-bot`: Slack command and approval handlers
- `apps/cli`: Command-line scanner and diagnostics
- `services/*`: background workers and optimization services
- `agents/*`: autonomous internal and product-facing agents
- `packages/*`: shared schemas, auth, SDK, and observability
- `db`: schema and migrations
- `infra`: infrastructure-as-code
- `deploy`: deployment manifests and CI/CD workflows

## Quickstart

1. Install dependencies:

   ```bash
   npm install -g pnpm
   pnpm install
   ```

2. Copy env file:

   ```bash
   cp .env.example .env
   ```

3. Start dependencies:

   ```bash
   docker compose up -d postgres redis temporal
   ```

4. Run DB migrations (see `db/migrations`).

5. Start development stack:

   ```bash
   pnpm dev:api
   pnpm dev:web
   pnpm dev:workers
   ```

## Database bootstrap

```bash
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/opspilot
pnpm db:init
```

## Core services

- `@ops-pilot/api`: API gateway and control plane endpoints.
- `@ops-pilot/web`: customer dashboard.
- `@ops-pilot/admin`: internal operator console.
- `@ops-pilot/executor`: executes approved actions and writes savings ledger.
- `@ops-pilot/normalization`: processes ingestion events into normalized cloud events.
- `@ops-pilot/agent-orchestrator`: Temporal worker for multi-agent workflows.

## Security and reliability

- All mutating actions must pass policy validation.
- Every execution task is idempotent and auditable.
- Action impact is continuously monitored with rollback hooks.
