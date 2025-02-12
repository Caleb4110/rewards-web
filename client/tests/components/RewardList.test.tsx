import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import RewardList from "../../src/components/RewardList";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("RewardList", () => {
  it("should render correct text when no rewards are given", () => {
    render(
      <RewardList
        rewards={[]}
        buttonHandler={(e: any) => {
          return;
        }}
      />,
    );

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/no rewards found/i);
  });

  it("should render rewards when rewards are given", () => {
    const rewards = [
      {
        id: 1,
        cafeId: "auth0|123456",
        cafeName: "Test cafe",
        isValid: true,
      },
      {
        id: 1,
        cafeId: "auth0|123456",
        cafeName: "Test cafe",
        isValid: true,
      },
      {
        id: 1,
        cafeId: "auth0|123456",
        cafeName: "Test cafe",
        isValid: false,
      },
      {
        id: 1,
        cafeId: "auth0|123456",
        cafeName: "Test cafe",
        isValid: true,
      },
    ];

    render(
      <RewardList
        rewards={rewards}
        buttonHandler={(e: any) => {
          return;
        }}
      />,
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    expect(buttons).toHaveLength(rewards.length);
  });
});
