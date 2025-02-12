import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "../../src/pages/NotFoundPage";
import "@testing-library/jest-dom/vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import * as reactRouter from "react-router-dom";

const mockNavigate = vi.fn();
describe("LoginCafe", async () => {
  it("should render the correct page heading navigation buttons and buttons should redirect", async () => {
    vi.mock("react-router-dom", () => {
      return {
        useNavigate: vi.fn(() => mockNavigate),
      };
    });

    render(<NotFoundPage />);

    // Get items from the DOM
    const notFound = screen.getByText(/404/i);
    const userButton = screen.getByText(/user/i);
    const cafeButton = screen.getByText(/cafe/i);

    // Check heading and buttons are in the document
    expect(notFound).toBeInTheDocument();
    expect(userButton).toBeInTheDocument();
    expect(cafeButton).toBeInTheDocument();
    expect(reactRouter.useNavigate).toBeCalledTimes(1);

    // Mock user button clicks
    const user = userEvent.setup();
    await user.click(userButton);
    expect(mockNavigate).toHaveBeenCalledWith("/auth/dashboard");

    await user.click(cafeButton);
    expect(mockNavigate).toHaveBeenCalledWith("/auth/cafe");
  });
});
