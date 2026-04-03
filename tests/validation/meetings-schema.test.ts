import { describe, expect, it } from "vitest";

import {
  meetingsInsertSchema,
  meetingsUpdateSchema,
} from "../../src/modules/meetings/schemas";

describe("meetings schemas", () => {
  it("accepts a valid insert payload", () => {
    const result = meetingsInsertSchema.safeParse({
      name: "Weekly Product Sync",
      agentId: "agent_123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty agent id on insert", () => {
    const result = meetingsInsertSchema.safeParse({
      name: "Weekly Product Sync",
      agentId: "",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.agentId).toContain("Agent is required");
  });

  it("rejects an empty meeting name on insert", () => {
    const result = meetingsInsertSchema.safeParse({
      name: "",
      agentId: "agent_123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.name).toContain("Name is required");
  });

  it("requires an id on update", () => {
    const result = meetingsUpdateSchema.safeParse({
      id: "",
      name: "Weekly Product Sync",
      agentId: "agent_123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.id).toContain("Id is required");
  });

  it("accepts a valid update payload", () => {
    const result = meetingsUpdateSchema.safeParse({
      id: "meeting_123",
      name: "Weekly Product Sync",
      agentId: "agent_123",
    });

    expect(result.success).toBe(true);
  });
});
