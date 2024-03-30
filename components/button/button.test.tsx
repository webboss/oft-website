import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Button } from "./";

describe("<Button />", () => {
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
});
