import { render, screen, waitFor } from "@testing-library/react";
import Filter from "@/components/Filter";
import useSearchAndFilterParams from "@/hooks/useSearchAndFilterParams";

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

jest.mock("@/hooks/useSearchAndFilterParams", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Filter Component", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      query: {},
      pathname: "/",
    });
  });

  it("should render with mocked hook values", () => {
    // Mock the hook to return default values
    (useSearchAndFilterParams as jest.Mock).mockReturnValue({
      filters: {
        category: "test-category",
        status: null,
        country: [],
      },
      filterIsVisible: {
        category: false,
        status: false,
        country: false,
      },
      handleFilterChange: jest.fn(),
      handleFilterVisibility: jest.fn(),
      toggleMobileFilters: false,
    });

    // Render the component
    render(<Filter />);
    const filter = screen.getByTestId("filter");
    expect(filter).toBeInTheDocument();
  });

  it("should toggle filter visibility", () => {
    // Mock the hook with initial state
    (useSearchAndFilterParams as jest.Mock).mockReturnValue({
      filters: {
        category: "test-category",
        status: null,
        country: [],
      },
      filterIsVisible: {
        category: false,
        status: false,
        country: false,
      },
      handleFilterChange: jest.fn(),
      handleFilterVisibility: jest.fn(),
      toggleMobileFilters: false,
    });

    // Render the component
    render(<Filter />);
    const toggleButton = screen.getByText(/filter/i);
    userEvent.click(toggleButton);

    expect(screen.getByTestId("icon-sliders")).toBeInTheDocument();
  });

  it("should display filter count when filters are active", async () => {
    // Mock the hook with active filters
    (useSearchAndFilterParams as jest.Mock).mockReturnValue({
      filters: {
        category: "test-category",
        status: null,
        country: [],
      },
      filterIsVisible: {
        category: true,
        status: false,
        country: false,
      },
      handleFilterChange: jest.fn(),
      handleFilterVisibility: jest.fn(),
      toggleMobileFilters: false,
    });

    // Render the component
    render(<Filter />);
    const toggleButton = screen.getByText("Filter");
    userEvent.click(toggleButton);
    // Verify filter count
    const filterCount = screen.getByTestId("filter-count");
    console.log(filterCount);
    expect(filterCount).toBeInTheDocument();
    expect(filterCount).toHaveTextContent("1");
  });

  it("should update URL when a filter is selected", async () => {
    const mockHandleFilterChange = jest.fn((category: string) => {
      pushMock({
        pathname: "/", // Adjust this to your actual pathname
        query: { category: "service" },
      });
    });
    // Mock the hook to simulate a filter change and URL update
    (useSearchAndFilterParams as jest.Mock).mockReturnValue({
      filters: {
        category: "service",
      },
      filterIsVisible: {
        category: "service",
        status: "draft",
        country: ["usa"],
      },
      handleFilterChange: mockHandleFilterChange,
      handleFilterVisibility: jest.fn(),
      toggleMobileFilters: false,
    });

    render(<Filter />);

    // Simulate clicking a filter checkbox
    const serviceCheckbox = screen.getByLabelText(/service/i); // Replace with actual label
    userEvent.click(serviceCheckbox);
    expect(serviceCheckbox).toBeInTheDocument();

    await waitFor(() =>
      expect(pushMock).toHaveBeenCalledWith({
        pathname: expect.any(String),
        query: { category: "service" },
      }),
    );
  });
});
