import "@testing-library/jest-dom";
import React from "react";
import Home from "../app/page";
import { render, screen, act } from "@testing-library/react";
//mock data
jest.mock("@/components/SubHeader", () => () => <div>Mocked SubHeader</div>);

describe("Home Component", () => {
  it("renders SubHeader", async () => {
    // Mock props to pass to the Home component
    const mockSearchParams = Promise.resolve({
      search: "painting",
      category: "service",
      status: "published",
      country: "usa",
    });

    // Render the Home component
    await render(<Home searchParams={mockSearchParams} />);

    // Verify that SubHeader is rendered
    const subHeaderElement = await screen.findByText("Mocked SubHeader");
    expect(subHeaderElement).toBeInTheDocument();
  });
});
