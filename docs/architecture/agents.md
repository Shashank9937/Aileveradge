# Multi-Agent System

## Agents
- Research Agent: tracks cloud pricing and infra changes.
- Product Agent: turns usage signals into product requirements.
- Support Agent: drafts customer responses and triages tickets.
- Growth Agent: generates SEO and growth experiment backlog.
- Automation Agent: runs daily operational health checks.

## Coordination
- Temporal orchestrator schedules and runs workflows across agents.
- Shared persistence in Postgres and event logs in `cloud_events`.
- Human approval gates remain in API action lifecycle.
