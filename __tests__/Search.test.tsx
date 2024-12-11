import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "@/components/Search";
import userEvent from "@testing-library/user-event";
import useSearchAndFilterParams from "@/hooks/useSearchAndFilterParams";
import { useRouter } from "next/navigation";

jest.mock("@/hooks/useSearchAndFilterParams", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Search component", () => {
  beforeAll(() => {
    // Enable fake timers before the test runs
    jest.useFakeTimers();
  });

  afterAll(() => {
    // Clean up after the test
    jest.useRealTimers();
  });
  it("should call handleSearchChange with the input value", async () => {
    const mockHandleSearchChange = jest.fn();

    (useSearchAndFilterParams as jest.Mock).mockReturnValue({
      handleSearchChange: mockHandleSearchChange,
      search: "",
    });

    render(<Search />);

    const input = screen.getByTestId("search-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
    // Simulate typing "jobs"
    await userEvent.type(input, "jobs");

    jest.advanceTimersByTime(300);
    const finalInputValue = mockHandleSearchChange.mock.calls
      .map(([value]) => value)
      .join("");

    console.log("Final Input Value:", finalInputValue);
    expect(finalInputValue).toBe("jobs");
    expect(mockHandleSearchChange).toHaveBeenCalledTimes(4);
  });

  it("populates the URL with the search", async () => {
    const pushMock = jest.fn();
    const mockUseRouter = jest.requireMock("next/navigation").useRouter;
    mockUseRouter.mockReturnValue({
      push: pushMock,
      query: {},
    });
    (useSearchAndFilterParams as jest.Mock).mockReturnValue({
      handleSearchChange: (value: string) => {
        pushMock({ pathname: "/", query: { search: value } });
      },
      search: "",
    });

    render(<Search />);

    const input = screen.getByTestId("search-input");

    // Simulate typing "trees"
    await userEvent.type(input, "j");

    // Verify push was called with the correct URL
    expect(pushMock).toHaveBeenCalledWith({
      pathname: "/",
      query: { search: "j" },
    });
  });
});
