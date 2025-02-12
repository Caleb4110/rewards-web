import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import TokenBar from "../../src/components/TokenBar";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("TokenBar", () => {
  it("should render rewardCount number of tokens with total number of tokens being valid", () => {
    const total = 5;
    const rewardCount = 4;

    render(<TokenBar total={total} rewardCount={rewardCount} />);

    for (let i = 0; i < total; i++) {
      const token = screen.getByText(i + 1);
      if (i < rewardCount) {
        expect(token).not.toContainHTML("animate");
      } else {
        expect(token).toContainHTML("animate");
      }
    }
  });
});
