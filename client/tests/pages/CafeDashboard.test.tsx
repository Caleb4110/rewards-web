import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CafeDashboard from "../../src/pages/CafeDashboard";
import "@testing-library/jest-dom/vitest";
import React from "react";
import * as auth0 from "@auth0/auth0-react";
import { userEvent } from "@testing-library/user-event";
import { mockAuth0 } from "../mocks/auth0Mock";
import { mockErrorBoundary } from "../mocks/errorBoundaryMock";

describe("CafeDashboard", () => {
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

    render(<CafeDashboard />);

    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });

  it("should render the cafe dashboard with all rewards and initial states", async () => {
    render(<CafeDashboard />);

    // Check expected initial calls
    expect(auth0.useAuth0).toBeCalled();

    expect(await screen.findByText(/logout/i)).toBeInTheDocument();

    expect(await screen.findByPlaceholderText(/search/i)).toBeInTheDocument();

    expect(screen.queryByText(/clear/i)).toBeNull();

    expect(await screen.findByText(/select/i)).toBeInTheDocument();

    const userList = await screen.findAllByText(/visit/i);
    expect(userList.length).toBe(2);
    for (let i = 0; i < userList.length; i++) {
      expect(userList[i]).toBeInTheDocument();
      expect(userList[i]).toHaveTextContent((62 + i).toString()); // This is based on the api handler data
    }

    expect(await screen.findByText(/phone numbers/i)).toBeInTheDocument();
  });

  it("should respond to button clicks when a button is clicked", async () => {
    render(<CafeDashboard />);

    const filterButton = await screen.findByTitle(/open filters/i);
    expect(filterButton).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(filterButton);
    expect(await screen.findByText(/clear/i)).toBeInTheDocument();

    const selectButton = await screen.findByText(/select/i);
    const customerCheckboxes = await screen.findAllByRole("checkbox");

    for (let i = 0; i < customerCheckboxes.length; i++) {
      expect(customerCheckboxes[i]).not.toBeChecked();
    }

    await user.click(selectButton);

    for (let i = 0; i < customerCheckboxes.length; i++) {
      expect(customerCheckboxes[i]).toBeChecked();
    }
  });

  it("should call auth0 logout when logout button is clicked", async () => {
    render(<CafeDashboard />);

    const logoutButton = await screen.findByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
    expect(auth0.useAuth0().logout).not.toBeCalled();

    const user = userEvent.setup();
    await user.click(logoutButton);
    expect(auth0.useAuth0().logout).toBeCalled();
  });
});
