import { describe, expect, it } from "vitest";

import {
  agentsInsertSchema,
  agentsUpdateSchema,
} from "../../src/modules/agents/schemas";

describe("agents schemas", () => {
  it("accepts a valid insert payload", () => {
    const result = agentsInsertSchema.safeParse({
      name: "Sales Copilot",
      instructions: "Summarize action items clearly.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty name on insert", () => {
    const result = agentsInsertSchema.safeParse({
      name: "",
      instructions: "Summarize action items clearly.",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.name).toContain("Name is required");
  });

  it("rejects empty instructions on insert", () => {
    const result = agentsInsertSchema.safeParse({
      name: "Sales Copilot",
      instructions: "",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.instructions).toContain("Instructions are required");
  });

  it("requires an id on update", () => {
    const result = agentsUpdateSchema.safeParse({
      id: "",
      name: "Sales Copilot",
      instructions: "Summarize action items clearly.",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.id).toContain("Id is required");
  });

  it("accepts a valid update payload", () => {
    const result = agentsUpdateSchema.safeParse({
      id: "agent_123",
      name: "Sales Copilot",
      instructions: "Summarize action items clearly.",
    });

    expect(result.success).toBe(true);
  });
});
