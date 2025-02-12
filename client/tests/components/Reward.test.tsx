import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Reward from "../../src/components/Reward";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("Reward", () => {
  it("should render a valid reward with correct cafe name when isValid is true", () => {
    render(
      <Reward
        id="1"
        cafeName="Test cafe"
        isValid={true}
        onUse={() => {
          return;
        }}
      />,
    );

    expect(screen.getByText(/test cafe/i)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("should render an invalid reward with correct cafe name when isValid is false", () => {
    render(
      <Reward
        id="1"
        cafeName="Test cafe"
        isValid={false}
        onUse={() => {
          return;
        }}
      />,
    );

    expect(screen.getByText(/test cafe/i)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
