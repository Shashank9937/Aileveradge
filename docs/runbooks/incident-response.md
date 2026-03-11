# Incident Response Runbook

## Severity levels
- Sev-1: Customer-impacting outage or destructive execution.
- Sev-2: Partial degradation affecting optimization pipelines.
- Sev-3: Non-critical operational issue.

## Immediate actions
1. Pause autopilot execution mode globally.
2. Identify failing service via logs and health checks.
3. Revert recent deployment if regression suspected.
4. Notify impacted tenants via status channel.

## Recovery
1. Run data integrity checks against actions and ledger tables.
2. Requeue failed jobs where safe.
3. Capture RCA with corrective/preventive actions.
