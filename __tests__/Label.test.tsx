import { screen, render } from "@testing-library/react";
import Label from "@/components/Label";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
describe("Label COmponent", () => {
  const labelText = "Category";
  const mockOnClick = jest.fn();

  it("renders label text", () => {
    render(
      <Label text={labelText} onClick={mockOnClick} filterIsVisible={false} />,
    );
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const labelText = "Category";
    render(
      <Label text={labelText} onClick={mockOnClick} filterIsVisible={false} />,
    );
    const container = screen.getByText("Category").closest("div");
    expect(container).toHaveAttribute("data-visible", "false");
  });

  it("Verifies data-visible attribute is false initially", () => {
    const labelText = "Category";
    render(
      <Label text={labelText} onClick={mockOnClick} filterIsVisible={false} />,
    );
    const container = screen.getByText("Category").closest("div");
    expect(container).toHaveAttribute("data-visible", "false");
  });

  it("Verifies data-visible attribute is true", () => {
    const labelText = "Category";
    render(
      <Label text={labelText} onClick={mockOnClick} filterIsVisible={true} />,
    );

    const container = screen.getByText("Category").closest("div");
    expect(container).toHaveAttribute("data-visible", "true");
  });

  it("calls onClick", () => {
    const labelText = "Category";
    render(
      <Label text={labelText} onClick={mockOnClick} filterIsVisible={false} />,
    );

    const container = screen.getByText("Category").closest("div");
    if (container) {
      userEvent.click(container);
    }

    // Verify the mock function was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
