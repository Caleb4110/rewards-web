import { it, expect, describe } from "vitest";
import { getAllByText, render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { months, WebUser_t } from "../../src/types/user";

describe("UserList", () => {
  it("should render no users found when no users are given", () => {
    render(
      <UserList
        users={[]}
        onChange={() => {
          return;
        }}
      />,
    );

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/no users/i);
  });

  it("should render user info correctly when users are given", () => {
    const testUsers: WebUser_t[] = [
      {
        phoneNumber: "0412345678",
        dob: new Date("1990-05-15"),
        age: 33,
        suburb: "Sydney",
        tokenCount: 5,
        visitCount: 12,
        validRewards: 2,
        isSelected: false,
      },
      {
        phoneNumber: "0498765432",
        dob: new Date("1985-08-22"),
        age: 38,
        suburb: "Melbourne",
        tokenCount: 8,
        visitCount: 20,
        validRewards: 3,
        isSelected: true,
      },
      {
        phoneNumber: "0411223344",
        dob: new Date("1995-12-10"),
        age: 28,
        suburb: "Brisbane",
        tokenCount: 3,
        visitCount: 7,
        validRewards: 1,
        isSelected: false,
      },
      {
        phoneNumber: "0422334455",
        dob: new Date("2000-07-05"),
        age: 23,
        suburb: "Perth",
        tokenCount: 10,
        visitCount: 25,
        validRewards: 5,
        isSelected: true,
      },
      {
        phoneNumber: "0455667788",
        dob: new Date("1988-03-30"),
        age: 35,
        suburb: "Adelaide",
        tokenCount: 6,
        visitCount: 15,
        validRewards: 2,
        isSelected: false,
      },
    ];

    render(
      <UserList
        users={testUsers}
        onChange={() => {
          return;
        }}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    const ages = screen.getAllByText(/age/i);
    const birthMonths = screen.getAllByText(/birth/i);
    const visits = screen.getAllByText(/visit/i);

    expect(checkboxes).toHaveLength(testUsers.length);
    expect(ages).toHaveLength(testUsers.length);
    expect(birthMonths).toHaveLength(testUsers.length);

    for (let i = 0; i < testUsers.length; i++) {
      const birthMonth = months[testUsers[i].dob.getMonth()];
      testUsers[i].isSelected
        ? expect(checkboxes[i]).toBeChecked()
        : expect(checkboxes[i]).not.toBeChecked();
      expect(ages[i]).toHaveTextContent(testUsers[i].age.toString());
      expect(birthMonths[i]).toHaveTextContent(
        birthMonth[0].toUpperCase() + birthMonth.substring(1),
      );
      expect(visits[i]).toHaveTextContent(testUsers[i].visitCount.toString());
    }
  });
});
