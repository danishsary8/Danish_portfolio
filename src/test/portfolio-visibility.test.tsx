import { describe, expect, it } from "vitest";
import { badgeItem, item } from "@/components/portfolio/Reveal";

describe("Portfolio visibility before animations start", () => {
  it("never makes section content transparent while waiting for an observer", () => {
    expect(item["hidden"]).toMatchObject({ opacity: 1 });
    expect(item["show"]).toMatchObject({ opacity: 1, transform: "translateY(0px)" });
  });

  it("never makes skill badges transparent while waiting for an observer", () => {
    expect(badgeItem["hidden"]).toMatchObject({ opacity: 1 });
    expect(badgeItem["show"]).toMatchObject({ opacity: 1, transform: "translateY(0px) scale(1)" });
  });
});