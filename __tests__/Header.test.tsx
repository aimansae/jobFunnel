import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/Header";
import userEvent from "@testing-library/user-event";

describe("Header component", () => {
  it("renders logo and menu button", () => {
    render(<Header />);
    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();
    const button = screen.getByLabelText("toggle-menu");
    expect(button).toBeInTheDocument();
  });

  it("toggles menu on button click", () => {
    render(<Header />);

    const button = screen.getByLabelText("toggle-menu");
    const menu = screen.getByRole("list");
    expect(menu).toHaveClass("hidden");

    userEvent.click(button);
    expect(menu).toHaveClass("flex");

    userEvent.click(button);
    expect(menu).toHaveClass("hidden");
  });

  it("displays menu list when it's open", () => {
    render(<Header />);

    const menuButton = screen.getByLabelText("toggle-menu");
    userEvent.click(menuButton);

    const menuItems = screen.getAllByRole("listitem");
    expect(menuItems.length).toBeGreaterThanOrEqual(8);
  });
});
