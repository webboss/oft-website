import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Input } from "./input";

describe("Input Component", () => {
  test("renders input without label", () => {
    render(<Input placeholder="Language" />);

    const inputElement = screen.getByPlaceholderText("Language");

    expect(inputElement).toBeInTheDocument();
  });

  test("renders input with label", () => {
    render(<Input label="Language" />);

    const inputElement = screen.getByLabelText("Language");

    expect(inputElement).toBeInTheDocument();
  });

  test("handles user input", async () => {
    const user = userEvent.setup();

    render(<Input label="Language" />);

    const inputElement = screen.getByLabelText("Language") as HTMLInputElement;

    await user.type(inputElement, "Javascript");
    expect(inputElement.value).toBe("Javascript");
  });

  test("shows input errors", () => {
    render(<Input label="Language" error="Language is required" />);

    const errorText = screen.getByText("Language is required");

    expect(errorText).toBeInTheDocument();
  });
});
