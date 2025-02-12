import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import FilterBar from "../../src/components/FilterBar";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { userEvent } from "@testing-library/user-event";

const filters = [
  {
    id: "1",
    title: "one",
    shown: true,
    opts: [
      {
        value: "opt1",
        label: "opt1",
        checked: false,
      },
      {
        value: "opt2",
        label: "opt2",
        checked: false,
      },
    ],
  },
  {
    id: "2",
    title: "two",
    shown: false,
    opts: [
      {
        value: "opt3",
        label: "opt3",
        checked: false,
      },
      {
        value: "opt4",
        label: "opt4",
        checked: false,
      },
    ],
  },
];

const onChange = () => {
  console.log("clicked");
};

describe("Button", () => {
  it("should render appropriate filters", async () => {
    render(<FilterBar filters={filters} onChange={onChange} />);

    const button = screen.getByText(/clear/i);
    expect(button).toBeInTheDocument();

    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();

    expect(screen.getByText("opt1")).toBeInTheDocument();
    expect(screen.queryByText("opt3")).not.toBeInTheDocument();
  });

  it("should expand/minimise filter options when filter is clicked", async () => {
    render(<FilterBar filters={filters} onChange={onChange} />);

    const filterButton = screen.getByTitle("one");
    console.log(filterButton);
    expect(filterButton).toHaveRole("button");
    const user = userEvent.setup();

    await user.click(filterButton);

    // TODO: Figure out how to do state changes and test rest of buttons
  });
});
