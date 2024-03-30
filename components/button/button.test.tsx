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
});
