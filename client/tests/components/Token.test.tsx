import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Token from "../../src/components/Token";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("Token", () => {
  it("should render a token with correct index", () => {
    render(<Token isUsed={false} index={2} />);

    const token = screen.getByText("2");
    expect(token).toBeInTheDocument();
  });
});
