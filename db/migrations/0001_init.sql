CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE connector_type AS ENUM ('aws', 'gcp', 'azure', 'kubernetes', 'datadog');
CREATE TYPE connector_status AS ENUM ('pending', 'active', 'failed', 'disabled');
CREATE TYPE opportunity_category AS ENUM ('rightsizing', 'scheduling', 'storage', 'network', 'kubernetes', 'gpu');
CREATE TYPE opportunity_status AS ENUM ('new', 'reviewing', 'approved', 'executing', 'completed', 'dismissed');
CREATE TYPE action_mode AS ENUM ('recommend', 'auto_pr', 'autopilot');
CREATE TYPE action_status AS ENUM ('draft', 'pending_approval', 'approved', 'running', 'completed', 'rolled_back', 'failed');
CREATE TYPE member_role AS ENUM ('owner', 'admin', 'member', 'viewer');

CREATE TABLE tenants (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  role member_role NOT NULL DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, email)
);

CREATE TABLE connectors (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  type connector_type NOT NULL,
  status connector_status NOT NULL DEFAULT 'pending',
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE opportunities (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  summary text NOT NULL,
  category opportunity_category NOT NULL,
  annual_savings_usd numeric(14,2) NOT NULL,
  confidence numeric(4,3) NOT NULL,
  risk_level text NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  status opportunity_status NOT NULL DEFAULT 'new',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE actions (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  opportunity_id uuid NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  mode action_mode NOT NULL,
  approvals_required integer NOT NULL DEFAULT 1 CHECK (approvals_required >= 0),
  status action_status NOT NULL DEFAULT 'pending_approval',
  runbook text NOT NULL,
  execution_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE policies (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  key text NOT NULL,
  description text NOT NULL,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, key)
);

CREATE TABLE savings_ledger (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  action_id uuid NOT NULL REFERENCES actions(id) ON DELETE CASCADE,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  estimated_savings_usd numeric(14,2) NOT NULL,
  realized_savings_usd numeric(14,2) NOT NULL,
  reliability_delta numeric(8,4) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE cloud_events (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  provider connector_type NOT NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_connectors_tenant ON connectors (tenant_id);
CREATE INDEX idx_opportunities_tenant ON opportunities (tenant_id);
CREATE INDEX idx_actions_tenant ON actions (tenant_id);
CREATE INDEX idx_policies_tenant ON policies (tenant_id);
CREATE INDEX idx_savings_tenant ON savings_ledger (tenant_id);
CREATE INDEX idx_cloud_events_tenant_created ON cloud_events (tenant_id, created_at DESC);
