import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginUserDashboard from "../../src/pages/LoginUserDashboard";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("LoginCafe", () => {
  it("should render the correct page heading and login button", () => {
    render(<LoginUserDashboard />);

    expect(screen.getByText(/user dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/redirected/i)).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
