import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Input } from "./input";

describe("Input Component", () => {
  test("renders input without label", () => {
    render(<Input placeholder="Test Placeholder" />);

    const inputElement = screen.getByPlaceholderText("Test Placeholder");

    expect(inputElement).toBeInTheDocument();
  });

  test("renders input with label", () => {
    render(<Input label="Test Label" />);

    const inputElement = screen.getByLabelText("Test Label");

    expect(inputElement).toBeInTheDocument();
  });
});
