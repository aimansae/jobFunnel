import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CountryFlag from "@/components/CountryFlag";

describe("Flag component", () => {
  it("displays flags", () => {
    render(<CountryFlag country="USA" />);
    const img = screen.getByAltText(/USA flag/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://flagpedia.net/data/flags/h80/us.png",
    );
  });

  it("defaults to USA if country is not not found", () => {
    render(<CountryFlag country="Germany" />);
    const img = screen.getByAltText(/Germany flag/i);
    expect(img).toHaveAttribute(
      "src",
      "https://flagpedia.net/data/flags/h80/us.png",
    );
  });
});
