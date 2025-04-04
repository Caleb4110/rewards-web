import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TokenPage from "../../src/pages/TokenPage";
import "@testing-library/jest-dom/vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import { mockAuth0 } from "../mocks/auth0Mock";
import { mockReactRouter } from "../mocks/reactRouterMock";
import { mockErrorBoundary } from "../mocks/errorBoundaryMock";

describe("TokenPage", () => {
  beforeEach(() => {
    vi.resetModules(); // Clears previous mocks

    // Mock auth0
    vi.mock("@auth0/auth0-react");
    mockAuth0();

    // Mock reactRouter
    vi.mock("react-router-dom");
    mockReactRouter();

    // Mock reactErrorBoundary
    vi.mock("react-error-boundary");
    mockErrorBoundary();
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clears mock function calls between tests
  });

  it("should render the page with initial state and button", async () => {
    render(<TokenPage />);

    expect(await screen.findByText(/welcome/i)).toBeInTheDocument();

    // NOTE: Skip the cafe name heading as can change content depending on cafe name
    expect(await screen.findByText(/time/i)).toBeInTheDocument();
    expect(await screen.findByText(/buy/i)).toBeInTheDocument();

    expect(await screen.findByText(/available/i)).toBeInTheDocument();

    expect(await screen.findByText(/click here/i)).toBeInTheDocument();

    expect(await screen.findByText(/report/i)).toBeInTheDocument();
  });

  it("should register button click", async () => {
    const mockNavigate = vi.fn();
    mockReactRouter({ useNavigate: () => mockNavigate });

    render(<TokenPage />);

    const button = await screen.findByText(/click here/i);
    expect(button).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining("/user/dashboard"),
    );
  });
});
