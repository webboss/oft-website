import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Newsletter } from "@/components/newsletter";

describe("Newsletter", () => {
  test("renders form", () => {
    render(<Newsletter />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const button = screen.getByRole("button", { name: "" });

    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
