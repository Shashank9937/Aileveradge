import type { Pool } from "pg";
import { randomUUID } from "node:crypto";
import type { Action, ActionCreateInput } from "@ops-pilot/schemas";
import { mapTimestamps } from "../../db/sql.js";

export class ActionRepository {
  constructor(private readonly db: Pool) {}

  async listByTenant(tenantId?: string): Promise<Action[]> {
    const sql = tenantId
      ? `SELECT * FROM actions WHERE tenant_id = $1 ORDER BY created_at DESC`
      : `SELECT * FROM actions ORDER BY created_at DESC LIMIT 250`;
    const values = tenantId ? [tenantId] : [];
    const result = await this.db.query(sql, values);

    return result.rows.map((row) => {
      const mapped = mapTimestamps(row);
      return {
        id: mapped.id,
        tenantId: mapped.tenant_id,
        opportunityId: mapped.opportunity_id,
        mode: mapped.mode,
        approvalsRequired: mapped.approvals_required,
        status: mapped.status,
        runbook: mapped.runbook,
        createdAt: mapped.created_at,
        updatedAt: mapped.updated_at
      } as Action;
    });
  }

  async create(input: ActionCreateInput): Promise<Action> {
    const id = randomUUID();
    const result = await this.db.query(
      `INSERT INTO actions (id, tenant_id, opportunity_id, mode, approvals_required, status, runbook)
       VALUES ($1, $2, $3, $4, $5, 'pending_approval', $6)
       RETURNING *`,
      [
        id,
        input.tenantId,
        input.opportunityId,
        input.mode,
        input.approvalsRequired,
        `Execute ${input.mode} action for opportunity ${input.opportunityId}`
      ]
    );

    const row = mapTimestamps(result.rows[0]);
    return {
      id: row.id,
      tenantId: row.tenant_id,
      opportunityId: row.opportunity_id,
      mode: row.mode,
      approvalsRequired: row.approvals_required,
      status: row.status,
      runbook: row.runbook,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    } as Action;
  }

  async updateStatus(id: string, status: Action["status"]): Promise<Action | null> {
    const result = await this.db.query(
      `UPDATE actions SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, status]
    );

    if (result.rowCount === 0) {
      return null;
    }

    const row = mapTimestamps(result.rows[0]);
    return {
      id: row.id,
      tenantId: row.tenant_id,
      opportunityId: row.opportunity_id,
      mode: row.mode,
      approvalsRequired: row.approvals_required,
      status: row.status,
      runbook: row.runbook,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    } as Action;
  }
}
