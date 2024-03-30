import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { NLink } from "./";

describe("<Nlink />", () => {
  test("renders link if 'to' prop is passed", () => {
    render(<NLink to="/">I am a link</NLink>);

    const linkElement = screen.getByRole("link", { name: "I am a link" });

    expect(linkElement).toBeInTheDocument();
  });

  test("renders link if 'href' prop is passed", () => {
    render(<NLink href="/">I am a new link</NLink>);

    const linkElement = screen.getByRole("link", { name: "I am a new link" });

    expect(linkElement).toBeInTheDocument();
  });

  test("renders link to open in a new tab if 'href' prop is an object", () => {
    render(<NLink href={{ url: "/" }}>I am a link to another tab</NLink>);

    const linkElement = screen.getByRole("link", {
      name: "I am a link to another tab",
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noreferrer");
  });
});
