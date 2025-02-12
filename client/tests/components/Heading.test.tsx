import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Heading from "../../src/components/heading";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("Heading", () => {
  it("should render title in left position", () => {
    render(<Heading variant="primary" position="left" title="Heading title" />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/heading title/i);
  });
});
