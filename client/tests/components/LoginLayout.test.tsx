import { vi, it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginLayout from "../../src/components/LoginLayout";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { mockAuth0 } from "../mocks/auth0Mock";
import { userEvent } from "@testing-library/user-event";
import * as auth0 from "@auth0/auth0-react";

describe("LoginLayout", () => {
  beforeEach(() => {
    vi.resetModules(); // Clears previous mocks

    // Mock auth0
    vi.mock("@auth0/auth0-react");
    mockAuth0();
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clears mock function calls between tests
  });
  it("should render the login layout with headings and a button", () => {
    render(
      <LoginLayout
        role="user"
        returnTo="test/page"
        pageHeading="LoginLayout heading"
      />,
    );

    expect(screen.getByText(/loginlayout heading/i)).toBeInTheDocument();
    expect(screen.getByText(/redirected/i)).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });

  it("should call loginWithRedirect on login button click", async () => {
    render(
      <LoginLayout
        role="user"
        returnTo="test/page"
        pageHeading="LoginLayout heading"
      />,
    );

    const button = screen.getByText(/LOGIN/);
    const user = userEvent.setup();
    await user.click(button);
    expect(auth0.useAuth0().loginWithRedirect).toBeCalled();
  });
});
