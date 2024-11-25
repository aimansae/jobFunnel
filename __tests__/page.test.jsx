import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Homepage from "../app/page";
import { act } from "react";

describe("Home Page", () => {
  it("renders SubHeader component", async () => {
    render(<Homepage searchParams={{}} />);

    // Use await to find the subheader element
    const heading = screen
      .getByRole("heading", { name: /page/i })
      // Check if the element is in the document
      .expect(heading)
      .toBeInTheDocument();
  });
});
