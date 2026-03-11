import {
  type Action,
  type Connector,
  type ConnectorCreateInput,
  type Opportunity,
  type Policy,
  type SavingsLedgerEntry
} from "@ops-pilot/schemas";

export interface ApiClientOptions {
  baseUrl: string;
  token?: string;
}

export class OpsPilotApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.options.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(this.options.token ? { Authorization: `Bearer ${this.options.token}` } : {}),
        ...(init?.headers ?? {})
      }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API ${res.status}: ${text}`);
    }

    return (await res.json()) as T;
  }

  health(): Promise<{ status: "ok"; version: string; timestamp: string }> {
    return this.request("/health");
  }

  listConnectors(): Promise<{ data: Connector[]; total: number }> {
    return this.request("/v1/connectors");
  }

  createConnector(input: ConnectorCreateInput): Promise<Connector> {
    return this.request("/v1/connectors", {
      method: "POST",
      body: JSON.stringify(input)
    });
  }

  listOpportunities(): Promise<{ data: Opportunity[]; total: number }> {
    return this.request("/v1/opportunities");
  }

  listPolicies(): Promise<{ data: Policy[]; total: number }> {
    return this.request("/v1/policies");
  }

  listSavingsLedger(): Promise<{ data: SavingsLedgerEntry[]; total: number }> {
    return this.request("/v1/savings");
  }

  listActions(): Promise<{ data: Action[]; total: number }> {
    return this.request("/v1/actions");
  }
}
