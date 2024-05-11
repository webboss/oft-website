import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { WailistForm } from "./waitlist-form";

describe("WaitlistForm", () => {
  test("renders modal if isOpen=true", () => {
    render(<WailistForm isOpen={true} closeModal={() => {}} />);

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
  });

  test("handles modal close", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<WailistForm isOpen={true} closeModal={handleClose} />);

    const closeButton = screen.getByRole("button", { name: "close" });

    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledOnce();
  });

  test("renders form", () => {
    render(<WailistForm isOpen={true} closeModal={() => {}} />);

    const title = screen.getByRole("heading", {
      level: 3,
      name: "Be the first to know when we launch",
    });
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const button = screen.getByRole("button", { name: "Join waitlist" });

    expect(title).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("handles invalid email error on submit", async () => {
    const user = userEvent.setup();

    render(<WailistForm isOpen={true} closeModal={() => {}} />);

    const emailInput = screen.getByPlaceholderText("Email Address");
    const button = screen.getByRole("button", { name: "Join waitlist" });

    await user.type(emailInput, "Hello");
    await user.click(button);

    const emailError = await screen.findByText("Invalid email address");

    expect(emailError).toBeInTheDocument();
  });

  test.skip("handles form submit", async () => {
    const user = userEvent.setup();
    vi.mock("");

    render(<WailistForm isOpen={true} closeModal={() => {}} />);

    const emailInput = screen.getByPlaceholderText("Email Address");
    const firstNameinput = screen.getByPlaceholderText("Email Address");
    const button = screen.getByRole("button", { name: "Join waitlist" });

    await user.type(emailInput, "no-reply@test.com");
    await user.type(firstNameinput, "Test");

    await user.click(button);
  });
});
