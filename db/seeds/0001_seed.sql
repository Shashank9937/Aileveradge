INSERT INTO tenants (id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'Acme Cloud', 'acme-cloud')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, tenant_id, email, name, role)
VALUES
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'founder@acmecloud.io', 'Founder', 'owner')
ON CONFLICT (tenant_id, email) DO NOTHING;

INSERT INTO connectors (id, tenant_id, name, type, status, config)
VALUES
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'AWS Production', 'aws', 'active', '{"accountId":"123456789012","regions":["us-east-1"]}'),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Kubernetes Core', 'kubernetes', 'active', '{"cluster":"prod-core"}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO opportunities (id, tenant_id, title, summary, category, annual_savings_usd, confidence, risk_level, status)
VALUES
  ('00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000000001', 'Right-size idle EC2 nodes', 'Reduce 23 over-provisioned nodes to optimal class', 'rightsizing', 182000.00, 0.92, 'low', 'new'),
  ('00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000000001', 'Enable dev namespace scheduling', 'Suspend non-production workloads on nights/weekends', 'scheduling', 94000.00, 0.88, 'low', 'reviewing')
ON CONFLICT (id) DO NOTHING;

INSERT INTO actions (id, tenant_id, opportunity_id, mode, approvals_required, status, runbook)
VALUES
  ('00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000001001', 'auto_pr', 1, 'approved', 'Create Terraform PR to reduce node size in prod nodegroup')
ON CONFLICT (id) DO NOTHING;

INSERT INTO policies (id, tenant_id, key, description, value, enabled)
VALUES
  ('00000000-0000-0000-0000-000000003001', '00000000-0000-0000-0000-000000000001', 'slo.min_availability', 'Minimum service availability allowed', '{"value":99.9,"window":"30d"}', true),
  ('00000000-0000-0000-0000-000000003002', '00000000-0000-0000-0000-000000000001', 'budget.monthly_limit', 'Monthly optimization cap', '{"usd":300000}', true)
ON CONFLICT (tenant_id, key) DO NOTHING;

INSERT INTO savings_ledger (id, tenant_id, action_id, period_start, period_end, estimated_savings_usd, realized_savings_usd, reliability_delta)
VALUES
  ('00000000-0000-0000-0000-000000004001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000002001', now() - interval '30 days', now(), 15000.00, 13720.00, 0.0002)
ON CONFLICT (id) DO NOTHING;
