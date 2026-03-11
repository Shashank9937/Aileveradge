import { OpsPilotApiClient } from "@ops-pilot/sdk";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const apiClient = new OpsPilotApiClient({
  baseUrl
});
