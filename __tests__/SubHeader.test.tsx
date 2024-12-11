import SubHeader from "@/components/SubHeader";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { subHeaderLinks } from "../data";
jest.mock("../data", () => ({
  subHeaderLinks: [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
}));
describe("Subheader", () => {
  it("renders", () => {
    render(<SubHeader />);
    expect(screen.getByTestId("subheader")).toBeInTheDocument();
  });

  it("render links", () => {
    render(<SubHeader />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
