import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Accordion from "@/components/Accordion";
import { JobFunnel, QuestionTree } from "../types";
import userEvent from "@testing-library/user-event";
import { mock } from "node:test";
const questionTrees: QuestionTree[] = [
  {
    id: "q1",
    name: "question1",
    status: "published",
    siteIds: ["usa", "canada"],
  },

  {
    id: "q2",
    name: "question2",
    status: "draft",
    siteIds: ["usa", "france"],
  },
  {
    id: "q3",
    name: "question3",
    status: "published",
    siteIds: ["canada", "france"],
  },
];
const mockJobs: JobFunnel[] = [
  {
    id: "jf1",
    name: "job1",
    slug: "home-painting",
    type: "service",
    questionTrees: [questionTrees[0], questionTrees[2]],
  },
  {
    id: "jf2",
    name: "job2",
    slug: "kitchen-renovation",
    type: "service",
    questionTrees: [questionTrees[1]],
  },
];

describe("Accordion component", () => {
  it("renders the jobs", () => {
    render(<Accordion jobs={mockJobs} />);
    mockJobs.forEach((job) =>
      expect(screen.getByText(job.name)).toBeInTheDocument(),
    );
  });
  it("toggles job expansion", async () => {
    render(<Accordion jobs={mockJobs} />);
    const jobOne = screen.getByText("job1");
    const jobOneContent = screen.getByTestId("content-jf1");

    // expand job1 content
    await userEvent.click(jobOne);
    await waitFor(() => expect(jobOneContent).toHaveClass("opacity-100"));
    // toggle job1 content
    await userEvent.click(jobOne);
    await waitFor(() => expect(jobOneContent).toHaveClass("hidden"));
  });

  it("rotates arrow icon onClick", async () => {
    render(<Accordion jobs={mockJobs} />);
    const arrowIcons = screen.getAllByTestId("arrowIcon");
    expect(arrowIcons.length).toBe(mockJobs.length);
    // Before click: check initial state
    expect(arrowIcons[0]).not.toHaveClass("rotate-180");
    await userEvent.click(arrowIcons[0]);
    expect(arrowIcons[0]).toHaveClass("rotate-180");
  });

  it("applies maxHeight during expansion and collapse", async () => {
    render(<Accordion jobs={mockJobs} />);
    screen.debug();
    const jobOne = screen.getByText("job1");
    const jobOneContent = screen.getByTestId("content-jf1");
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get() {
        return 100; // Mocked scrollHeight for testing
      },
    });

    // Initial state: maxHeight should be 0px
    expect(jobOneContent.style.maxHeight).toBe("0px");

    // Click to expand
    await userEvent.click(jobOne);

    // Ensure maxHeight is set to the scrollHeight (100px)
    await waitFor(() => {
      expect(jobOneContent.style.maxHeight).toBe("100px");
    });

    // Click again to collapse so height is 0 px
    await userEvent.click(jobOne);
    await waitFor(() => {
      expect(jobOneContent.style.maxHeight).toBe("0px");
    });
  });
  it("expands one job at a time", async () => {
    render(<Accordion jobs={mockJobs} />);
    const jobOne = screen.getByText("job1");
    const jobTwo = screen.getByText("job2");

    await userEvent.click(jobOne);
    expect(screen.getByTestId("content-jf1")).not.toHaveClass("hidden");

    await userEvent.click(jobTwo);
    expect(screen.getByTestId("content-jf1")).toHaveClass("hidden");
    expect(screen.getByTestId("content-jf2")).not.toHaveClass("hidden");
  });
});
