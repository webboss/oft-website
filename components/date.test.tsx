import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Date from "./date";

describe("Date component", () => {
  test("renders date correctly", () => {
    const dateString = "2024-05-31";

    render(<Date dateString={dateString} />);

    const expectedFormatedDate = "May 31, 2024";

    const dateElement = screen.getByText(expectedFormatedDate);

    expect(dateElement).toBeInTheDocument();
  });

  test("has the correct dateTime attribute", () => {
    const dateString = "2024-05-31";

    render(<Date dateString={dateString} />);

    const expectedFormatedDate = "May 31, 2024";

    const dateElement = screen.getByText(expectedFormatedDate);

    expect(dateElement).toHaveAttribute("dateTime", dateString);
  });
});
