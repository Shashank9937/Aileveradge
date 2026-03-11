import type { Pool } from "pg";
import { randomUUID } from "node:crypto";
import type { Policy } from "@ops-pilot/schemas";
import { mapTimestamps } from "../../db/sql.js";

export class PolicyRepository {
  constructor(private readonly db: Pool) {}

  async listByTenant(tenantId?: string): Promise<Policy[]> {
    const sql = tenantId
      ? `SELECT * FROM policies WHERE tenant_id = $1 ORDER BY created_at DESC`
      : `SELECT * FROM policies ORDER BY created_at DESC LIMIT 250`;
    const values = tenantId ? [tenantId] : [];
    const result = await this.db.query(sql, values);

    return result.rows.map((row) => {
      const mapped = mapTimestamps(row);
      return {
        id: mapped.id,
        tenantId: mapped.tenant_id,
        key: mapped.key,
        description: mapped.description,
        value: mapped.value,
        enabled: mapped.enabled,
        createdAt: mapped.created_at,
        updatedAt: mapped.updated_at
      } as Policy;
    });
  }

  async create(input: Omit<Policy, "id" | "createdAt" | "updatedAt">): Promise<Policy> {
    const id = randomUUID();
    const result = await this.db.query(
      `INSERT INTO policies (id, tenant_id, key, description, value, enabled)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6)
       RETURNING *`,
      [id, input.tenantId, input.key, input.description, JSON.stringify(input.value), input.enabled]
    );

    const row = mapTimestamps(result.rows[0]);
    return {
      id: row.id,
      tenantId: row.tenant_id,
      key: row.key,
      description: row.description,
      value: row.value,
      enabled: row.enabled,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    } as Policy;
  }
}
