import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MENU_LINKS from "config/menu.json";
import { Menu } from "./menu";
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
});
