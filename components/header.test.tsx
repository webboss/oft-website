import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Header from "./header";

describe("Header component", () => {
  test("renders header title", () => {
    render(<Header />);

    const title = screen.getByRole("heading", {
      level: 2,
      name: /Blog/,
    });

    expect(title).toBeInTheDocument();
  });
});
