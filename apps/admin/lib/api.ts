import { OpsPilotApiClient } from "@ops-pilot/sdk";

export const adminClient = new OpsPilotApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"
});
