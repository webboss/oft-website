import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { NLink } from "./";

describe("<Nlink />", () => {
  test("renders link if 'to' prop is passed", () => {
    render(<NLink to="/">I am a link</NLink>);

    const linkElement = screen.getByRole("link", { name: "I am a link" });
    expect(linkElement).toBeInTheDocument();
  });
});
