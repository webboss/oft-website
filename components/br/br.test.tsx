import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Br } from "./";

describe("<Br />", () => {
  test("renders break tag", () => {
    render(<Br on="all" />);

    const breakTag = screen.getByRole("line-break");

    expect(breakTag).toBeInTheDocument();
  });
});
