import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

jest.mock("../app/components/SubHeader", () => (
  <header data-testid="subheader" className="border-y">
    <nav className="p-4">
      <ul>
        <li>Mocked Link 1</li>
        <li>Mocked Link 2</li>
      </ul>
    </nav>
  </header>
));

describe("Home Page", () => {
  it("renders SubHeader component", async () => {
    render(<Page />);

    // Use await to find the subheader element
    const subHeaderElement = await screen.findByTestId("subheader");

    // Check if the element is in the document
    expect(subHeaderElement).toBeInTheDocument();
  });
});
