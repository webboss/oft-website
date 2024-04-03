import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Input } from "./input";
import userEvent from "@testing-library/user-event";

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

  test("handles user input", async () => {
    const user = userEvent.setup();

    render(<Input label="Username" />);

    const inputElement = screen.getByLabelText("Username") as HTMLInputElement;

    await user.type(inputElement, "John Doe");
    expect(inputElement.value).toBe("John Doe");
  });
});
