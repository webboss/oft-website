import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Alert from "./alert";
import { EXAMPLE_PATH } from "lib/constants";

describe("Alert", () => {
  test("renders link to exit preview mode if preview=true", () => {
    render(<Alert preview={true} />);

    const link = screen.getByRole("link", {
      name: "Click here",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/api/exit-preview");
  });

  test("renders link to source code if preview=false", () => {
    render(<Alert preview={false} />);

    const link = screen.getByRole("link", {
      name: "available on GitHub",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`
    );
  });
});
