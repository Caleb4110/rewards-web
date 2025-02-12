import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "../../src/components/button";
import Bars from "../../src/components/svg/Bars";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("Button", () => {
  it("should render label when label is given", () => {
    render(<Button variant="primary" label="Button label" />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/button label/i);
  });

  it("should render icon when icon is given", () => {
    render(<Button variant="primary" Icon={Bars} />);

    // TODO: get svg
  });

  it("shouldn't render label if no label is given", () => {
    render(<Button variant="primary" />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toBeEmptyDOMElement();
  });
});
