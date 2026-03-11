import { apiClient } from "../lib/api";
import { SummaryCard } from "./components/summary-card";

export const dynamic = "force-dynamic";

function fmtUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export default async function DashboardPage() {
  const [opportunitiesRes, connectorsRes, actionsRes, savingsRes] = await Promise.all([
    apiClient.listOpportunities().catch(() => ({ data: [], total: 0 })),
    apiClient.listConnectors().catch(() => ({ data: [], total: 0 })),
    apiClient.listActions().catch(() => ({ data: [], total: 0 })),
    apiClient.listSavingsLedger().catch(() => ({ data: [], total: 0 }))
  ]);

  const annualPotential = opportunitiesRes.data.reduce((sum, item) => sum + item.annualSavingsUsd, 0);
  const realized = savingsRes.data.reduce((sum, item) => sum + item.realizedSavingsUsd, 0);

  return (
    <main>
      <section className="hero">
        <h1>OpsPilot Control Plane</h1>
        <p>
          Detect waste, execute safe cloud optimizations, and verify savings with reliability guardrails.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 16 }}>
        <div className="span-4">
          <SummaryCard
            title="Connected Systems"
            value={`${connectorsRes.total}`}
            subtitle="Cloud and observability sources"
          />
        </div>
        <div className="span-4">
          <SummaryCard
            title="Annual Savings Potential"
            value={fmtUsd(annualPotential)}
            subtitle="AI-ranked opportunities"
          />
        </div>
        <div className="span-4">
          <SummaryCard
            title="Realized Savings (30d)"
            value={fmtUsd(realized)}
            subtitle="Finance-verifiable ledger"
          />
        </div>
      </section>

      <section className="grid">
        <div className="panel span-8">
          <h2 style={{ marginTop: 0 }}>Top Opportunities</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Potential</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {opportunitiesRes.data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                    <div style={{ color: "#64748b", fontSize: 13 }}>{item.summary}</div>
                  </td>
                  <td>{item.category}</td>
                  <td>{fmtUsd(item.annualSavingsUsd)}</td>
                  <td>
                    <span className={`badge ${item.riskLevel}`}>{item.riskLevel.toUpperCase()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel span-4">
          <h2 style={{ marginTop: 0 }}>Action Pipeline</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {actionsRes.data.map((action) => (
              <li key={action.id} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>{action.mode.toUpperCase()}</div>
                <div style={{ color: "#475569", fontSize: 13 }}>{action.status}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
