import type { Pool } from "pg";
import type { SavingsLedgerEntry } from "@ops-pilot/schemas";
import { mapTimestamps } from "../../db/sql.js";

export class SavingsRepository {
  constructor(private readonly db: Pool) {}

  async listByTenant(tenantId?: string): Promise<SavingsLedgerEntry[]> {
    const sql = tenantId
      ? `SELECT * FROM savings_ledger WHERE tenant_id = $1 ORDER BY period_start DESC`
      : `SELECT * FROM savings_ledger ORDER BY period_start DESC LIMIT 250`;

    const values = tenantId ? [tenantId] : [];
    const result = await this.db.query(sql, values);

    return result.rows.map((row) => {
      const mapped = mapTimestamps(row);
      return {
        id: mapped.id,
        tenantId: mapped.tenant_id,
        actionId: mapped.action_id,
        periodStart: mapped.period_start,
        periodEnd: mapped.period_end,
        estimatedSavingsUsd: Number(mapped.estimated_savings_usd),
        realizedSavingsUsd: Number(mapped.realized_savings_usd),
        reliabilityDelta: Number(mapped.reliability_delta),
        createdAt: mapped.created_at
      } as SavingsLedgerEntry;
    });
  }
}
