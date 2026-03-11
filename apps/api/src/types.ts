import type { Pool } from "pg";
import type { Queue } from "bullmq";
import type { AuthClaims } from "@ops-pilot/auth";

export interface AuthContext {
  claims: AuthClaims | null;
}

export interface ApiDependencies {
  db: Pool;
  executionQueue: Queue;
}
