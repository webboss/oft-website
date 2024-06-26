import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Button } from "../button";

describe("Button component", () => {
  test("renders button", () => {
    render(<Button text="Click me" />);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
  });

  test("shows loading without button text when isLoading prop is true", () => {
    render(<Button isLoading={true} text="Click me" />);

    const button = screen.getByRole("button", { name: "Loading" });
    const buttontext = screen.queryByText("Click me");

    expect(button).toBeInTheDocument();
    expect(buttontext).not.toBeInTheDocument();
  });

  test("renders button text when not loading", () => {
    render(<Button isLoading={false} text="Click me" />);

    const loadingElement = screen.queryByText("Loading");
    const buttonText = screen.getByText("Click me");

    expect(loadingElement).not.toBeInTheDocument();
    expect(buttonText).toBeInTheDocument();
  });

  test("renders link if 'href' prop is passed", () => {
    render(<Button href="/" text="Click me" />);

    const linkElement = screen.getByRole("link", { name: "Click me" });
    expect(linkElement).toBeInTheDocument();
  });

  test("renders link if 'to' prop is passed", () => {
    render(<Button to="/" text="Click me" />);

    const linkElement = screen.getByRole("link", { name: "Click me" });
    expect(linkElement).toBeInTheDocument();
  });

  test("is disabled when 'disabled' prop is true", () => {
    render(<Button disabled={true} text="Click me" />);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeDisabled();
  });

  test("handles user click", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick} text="Signin" />);

    const button = screen.getByRole("button", { name: "Signin" });

    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  test("renders button with a primary variant style by default", () => {
    render(<Button text="Click me" />);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toHaveClass(
      "primary disabled:bg-secondary text-primary-100 gradient-blue-to-red"
    );
  });

  test("renders button with an alternative variant style when 'variant' prop is 'alternative'", () => {
    render(<Button variant="alternative" text="Click me" />);

    const button = screen.getByRole("button", { name: "Click me" });
    const buttonText = screen.getByText("Click me");

    expect(button).toHaveClass("alternative gradient-blue-to-red");
    expect(buttonText).toHaveClass(
      "bg-black bg-clip-content w-full h-full flex items-center justify-center rounded-full"
    );
  });

  test("renders button with an outline variant style when 'variant' prop is 'outline'", () => {
    render(<Button variant="outline" text="Click me" />);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toHaveClass("border border-white");
  });
});
