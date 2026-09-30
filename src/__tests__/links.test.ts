import { describe, expect, it } from "vitest";

import { isAbsoluteHref, isHashHref, isSpecialProtocolHref } from "@/shared/lib/links";

describe("links", () => {
  it("detects absolute hrefs", () => {
    expect(isAbsoluteHref("https://example.com")).toBe(true);
    expect(isAbsoluteHref("//cdn.example.com/x")).toBe(true);
    expect(isAbsoluteHref("/about")).toBe(false);
  });

  it("detects hash hrefs", () => {
    expect(isHashHref("#section")).toBe(true);
    expect(isHashHref("/about")).toBe(false);
  });

  it("detects mailto and tel", () => {
    expect(isSpecialProtocolHref("mailto:a@b.co")).toBe(true);
    expect(isSpecialProtocolHref("tel:+15550100")).toBe(true);
  });
});
