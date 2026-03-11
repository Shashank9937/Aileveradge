import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const db = new Pool({ connectionString: databaseUrl });

async function run(): Promise<void> {
  await db.query(
    `UPDATE savings_ledger
     SET realized_savings_usd = estimated_savings_usd * 0.92
     WHERE realized_savings_usd = 0`
  );
  await db.end();
}

run().catch(async (error) => {
  console.error(error);
  await db.end();
  process.exit(1);
});
