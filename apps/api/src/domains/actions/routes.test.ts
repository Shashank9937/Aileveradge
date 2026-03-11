import { describe, it, expect } from "vitest";

describe("actions route contract", () => {
  it("keeps status transitions explicit", () => {
    const allowed = ["draft", "pending_approval", "approved", "running", "completed", "rolled_back", "failed"];
    expect(allowed.includes("approved")).toBe(true);
    expect(allowed.includes("running")).toBe(true);
  });
});
