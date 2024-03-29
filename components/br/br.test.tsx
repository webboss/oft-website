import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Br } from "./";

describe("<Br />", () => {
  test("renders break tag", () => {
    render(<Br on="all" />);

    const breakTag = screen.getByRole("line-break");

    expect(breakTag).toBeInTheDocument();
  });

  test("renders break tag on all devices", () => {
    render(<Br on="all" />);

    const breakTag = screen.getByRole("line-break");

    expect(breakTag).toHaveClass("block");
  });

  test("renders break tag on desktop devices only", () => {
    render(<Br on="desktop" />);

    const breakTag = screen.getByRole("line-break");

    expect(breakTag).toHaveClass("hidden md:block");
  });

  test("renders break tag on mobile devices only", () => {
    render(<Br on="mobile" />);

    const breakTag = screen.getByRole("line-break");

    expect(breakTag).toHaveClass("block md:hidden");
  });
});
