import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginUserReward from "../../src/pages/LoginUserReward";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("LoginCafe", () => {
  it("should render the correct page heading and login button", () => {
    render(<LoginUserReward />);

    expect(screen.getByText(/reward/i)).toBeInTheDocument();
    expect(screen.getByText(/redirected/i)).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
