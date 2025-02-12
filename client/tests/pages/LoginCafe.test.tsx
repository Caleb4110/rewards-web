import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginCafe from "../../src/pages/LoginCafe";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("LoginCafe", () => {
  it("should render the correct page heading and login button", () => {
    render(<LoginCafe />);

    expect(screen.getByText(/cafe dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/redirected/i)).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
