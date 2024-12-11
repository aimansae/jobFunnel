import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "@/components/Checkbox";
import userEvent from "@testing-library/user-event";

describe("Checkbox component", () => {
  const mockProps = {
    id: "test-checkbox",
    value: "test-value",
    checked: false,
    onChange: jest.fn(),
    label: "Test label",
    flag: "US",
  };

  it("renders checkbox", () => {
    render(<Checkbox {...mockProps} />);
    screen.debug();

    const checkbox = screen.getByRole("checkbox", {
      name: mockProps.label,
      hidden: true,
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("id", mockProps.id);
    expect(checkbox).toHaveAttribute("value", mockProps.value);
    expect(checkbox).not.toBeChecked();
    screen.debug();

    const label = screen.getByText(mockProps.label);
    expect(label).toBeInTheDocument();

    const flag = screen.getByRole("img", { name: /flag/i });
    expect(flag).toBeInTheDocument();
  });

  it("calls onChange when clicked", () => {
    render(<Checkbox {...mockProps} />);

    const checkbox = screen.getByRole("checkbox", {
      name: mockProps.label,
      hidden: true,
    });
    userEvent.click(checkbox);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });
});
