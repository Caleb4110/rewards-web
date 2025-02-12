import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import AccessDenied from "../../src/components/AccessDenied";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("AccessDenied", () => {
  it('should render "access denied" with the given label', () => {
    render(<AccessDenied label="Label text" />);

    expect(screen.getByText(/access denied/i)).toBeInTheDocument();
    expect(screen.getByText(/label text/i)).toBeInTheDocument();
  });
});
