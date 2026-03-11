import type { Pool } from "pg";
import { randomUUID } from "node:crypto";
import type { Connector, ConnectorCreateInput } from "@ops-pilot/schemas";
import { mapTimestamps } from "../../db/sql.js";

export class ConnectorRepository {
  constructor(private readonly db: Pool) {}

  async listByTenant(tenantId?: string): Promise<Connector[]> {
    const sql = tenantId
      ? `SELECT * FROM connectors WHERE tenant_id = $1 ORDER BY created_at DESC`
      : `SELECT * FROM connectors ORDER BY created_at DESC LIMIT 250`;

    const values = tenantId ? [tenantId] : [];
    const result = await this.db.query(sql, values);

    return result.rows.map((row) => {
      const mapped = mapTimestamps(row);
      return {
        id: mapped.id,
        tenantId: mapped.tenant_id,
        name: mapped.name,
        type: mapped.type,
        config: mapped.config,
        status: mapped.status,
        createdAt: mapped.created_at,
        updatedAt: mapped.updated_at
      } as Connector;
    });
  }

  async create(input: ConnectorCreateInput): Promise<Connector> {
    const id = randomUUID();
    const result = await this.db.query(
      `INSERT INTO connectors (id, tenant_id, name, type, config, status)
       VALUES ($1, $2, $3, $4, $5::jsonb, 'pending')
       RETURNING *`,
      [id, input.tenantId, input.name, input.type, JSON.stringify(input.config)]
    );

    const row = mapTimestamps(result.rows[0]);
    return {
      id: row.id,
      tenantId: row.tenant_id,
      name: row.name,
      type: row.type,
      config: row.config,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    } as Connector;
  }
}
