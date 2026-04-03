import { describe, expect, it } from "vitest";

import { signInSchema, signUpSchema } from "../../src/modules/auth/schemas";

describe("auth schemas", () => {
  it("accepts a valid sign-in payload", () => {
    const result = signInSchema.safeParse({
      email: "teammate@example.com",
      password: "secret123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid sign-in email", () => {
    const result = signInSchema.safeParse({
      email: "not-an-email",
      password: "secret123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.email).toContain("Invalid email address");
  });

  it("rejects mismatched sign-up passwords", () => {
    const result = signUpSchema.safeParse({
      name: "Teammate",
      email: "teammate@example.com",
      password: "secret123",
      confirmPassword: "secret456",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.confirmPassword).toContain("Passwords do not match");
  });

  it("rejects a missing sign-up name", () => {
    const result = signUpSchema.safeParse({
      name: "",
      email: "teammate@example.com",
      password: "secret123",
      confirmPassword: "secret123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.name).toContain("Name is required");
  });

  it("accepts a valid sign-up payload", () => {
    const result = signUpSchema.safeParse({
      name: "Teammate",
      email: "teammate@example.com",
      password: "secret123",
      confirmPassword: "secret123",
    });

    expect(result.success).toBe(true);
  });
});
