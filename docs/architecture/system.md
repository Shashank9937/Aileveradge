# System Architecture

## Planes
- Control Plane: API, web, policy service, tenant/auth.
- Data Plane: ingestion, normalization, analytics storage.
- Automation Plane: executor workers, agent orchestrator, scheduled jobs.

## Trust and safety
- All actions are policy checked before execution.
- Execution jobs are idempotent and auditable.
- Rollback paths are mandatory for mutating automation.

## Deployment model
- Stateless services on Kubernetes or ECS.
- Postgres for transactional state.
- Redis for queues and fast coordination.
- Temporal for durable agent workflows.
