import SubHeader from "@/components/SubHeader";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const subHeaderLinks = [
  { href: "/", label: "Trees" },
  { href: "/", label: "Forms" },
  { href: "/", label: "Templates" },
  { href: "/", label: "Editor" },
];

describe("Subheader", () => {
  it("renders", () => {
    render(<SubHeader />);
    expect(screen.getByTestId("subheader")).toBeInTheDocument();
  });

  it("renders links", () => {
    render(<SubHeader />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);

    subHeaderLinks.forEach((link, index) => {
      expect(links[index]).toHaveAttribute("href", link.href);
      expect(links[index]).toHaveTextContent(link.label);
    });
  });
});
