import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Hr } from "../hr";

describe("Hr component", () => {
  test("renders horizontal line", () => {
    render(<Hr />);

    const hr = screen.getByLabelText("horizontal-rule");

    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass(
      "h-[2px] border-0 bg-gradient-to-r from-[#1657C7] to-[#F1221A]"
    );
  });
});
