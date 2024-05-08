import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { NavBar } from "./navbar";

describe("Navbar", () => {
  test("renders menu toggle button", () => {
    render(<NavBar />);

    const hamburgerButton = screen.getByRole("button");
    const menuIcon = screen.getByTitle("Menu");

    expect(menuIcon.tagName).eq("svg");
    expect(menuIcon).toBeInTheDocument();
    expect(hamburgerButton).toContain(menuIcon);
  });

  test("handles menu toggle", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    const header = screen.getByRole("banner");
    const toggleButton = screen.getByRole("button");

    expect(header).not.toHaveClass("h-full");

    await user.click(toggleButton);

    const closeIcon = await screen.findByTitle("Close");

    expect(closeIcon).toBeInTheDocument();
    expect(header).toHaveClass("h-full");
  });
});
