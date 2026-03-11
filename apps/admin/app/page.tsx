import { adminClient } from "../lib/api";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [connectors, policies, savings] = await Promise.all([
    adminClient.listConnectors().catch(() => ({ data: [], total: 0 })),
    adminClient.listPolicies().catch(() => ({ data: [], total: 0 })),
    adminClient.listSavingsLedger().catch(() => ({ data: [], total: 0 }))
  ]);

  return (
    <main>
      <h1>OpsPilot Internal Admin</h1>
      <section className="card" style={{ marginBottom: 14 }}>
        <h2>Tenancy Signals</h2>
        <p>Connectors: {connectors.total}</p>
        <p>Policies: {policies.total}</p>
        <p>Ledger Entries: {savings.total}</p>
      </section>
      <section className="card">
        <h2>Governance Checklist</h2>
        <ol>
          <li>Verify policy drift checks are green.</li>
          <li>Review failed automation jobs from prior 24h.</li>
          <li>Audit high-risk action approvals.</li>
        </ol>
      </section>
    </main>
  );
}
