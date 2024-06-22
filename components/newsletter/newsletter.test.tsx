import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Newsletter } from "@/components/newsletter";

describe("Newsletter", () => {
  test("renders form", () => {
    render(<Newsletter />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const button = screen.getByRole("button", { name: "" });

    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test("shows invalid email error on form submit", async () => {
    const user = userEvent.setup();

    render(<Newsletter />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const button = screen.getByRole("button", { name: "" });

    await user.type(emailInput, "Hello");
    await user.click(button);

    const emailError = await screen.findByText("Invalid email address");

    expect(emailError).toBeInTheDocument();
  });

});
