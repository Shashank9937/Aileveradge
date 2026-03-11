import type { QueryResultRow } from "pg";

export function mapTimestamps<T extends QueryResultRow>(row: T): T {
  const mapped = { ...row } as Record<string, unknown>;
  for (const [key, value] of Object.entries(mapped)) {
    if (value instanceof Date) {
      mapped[key] = value.toISOString();
    }
  }
  return mapped as T;
}
