import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserDashboard from "../../src/pages/UserDashboard";
import "@testing-library/jest-dom/vitest";
import React from "react";
import * as auth0 from "@auth0/auth0-react";
import { userEvent } from "@testing-library/user-event";
import { mockAuth0 } from "../mocks/auth0Mock";
import { mockErrorBoundary } from "../mocks/errorBoundaryMock";

describe("UserDashboard", () => {
  beforeEach(() => {
    vi.resetModules(); // Clears previous mocks

    // Mock auth0
    vi.mock("@auth0/auth0-react");
    mockAuth0();

    // Mock reactErrorBoundary
    vi.mock("react-error-boundary");
    mockErrorBoundary();
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clears mock function calls between tests
  });

  it("should render the loading animation when page is loading", async () => {
    // Override isLoading value in auth0 mock
    mockAuth0({ isLoading: true });

    render(<UserDashboard />);

    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });

  it("should render the user dashboard with all rewards and initial states", async () => {
    render(<UserDashboard />);

    // Check expected initial calls
    expect(auth0.useAuth0).toBeCalled();
    const logoutButton = await screen.findByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();

    const headings = await screen.findAllByRole("heading");

    // Check headings
    expect(headings).toHaveLength(4);
    expect(headings[0]).toHaveTextContent(/available/i);
    expect(headings[1]).toHaveTextContent(/must click/i);
  });

  it("should render updates after button press", async () => {
    render(<UserDashboard />);

    const useRewardButton = await screen.findByText(/redeem/i);
    expect(useRewardButton).toBeInTheDocument();
    expect(useRewardButton).not.toBeDisabled();

    const user = userEvent.setup();
    await user.dblClick(useRewardButton);
    expect(useRewardButton).toBeDisabled();
  });

  it("should call auth0 logout when logout button is clicked", async () => {
    render(<UserDashboard />);

    const logoutButton = await screen.findByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
    expect(auth0.useAuth0().logout).not.toBeCalled();

    const user = userEvent.setup();
    await user.dblClick(logoutButton);
    expect(auth0.useAuth0().logout).toBeCalled();
  });
});
