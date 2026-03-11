import type { Pool } from "pg";
import type { Opportunity } from "@ops-pilot/schemas";
import { mapTimestamps } from "../../db/sql.js";

export class OpportunityRepository {
  constructor(private readonly db: Pool) {}

  async listByTenant(tenantId?: string): Promise<Opportunity[]> {
    const sql = tenantId
      ? `SELECT * FROM opportunities WHERE tenant_id = $1 ORDER BY annual_savings_usd DESC`
      : `SELECT * FROM opportunities ORDER BY annual_savings_usd DESC LIMIT 250`;
    const values = tenantId ? [tenantId] : [];
    const result = await this.db.query(sql, values);

    return result.rows.map((row) => {
      const mapped = mapTimestamps(row);
      return {
        id: mapped.id,
        tenantId: mapped.tenant_id,
        title: mapped.title,
        summary: mapped.summary,
        category: mapped.category,
        annualSavingsUsd: Number(mapped.annual_savings_usd),
        confidence: Number(mapped.confidence),
        riskLevel: mapped.risk_level,
        status: mapped.status,
        createdAt: mapped.created_at,
        updatedAt: mapped.updated_at
      } as Opportunity;
    });
  }
}
