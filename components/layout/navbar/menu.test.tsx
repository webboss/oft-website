import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MENU_LINKS from "config/menu.json";
import { Menu } from "./menu";

describe("Mobile Menu", () => {
  test("renders close button", () => {
    render(<Menu onToggle={() => {}} />);

    const closeButton = screen.getByRole("button");
    const closeIcon = screen.getByTitle("Close");

    expect(closeIcon.tagName).eq("svg");
    expect(closeIcon).toBeInTheDocument();
    expect(closeButton).toContain(closeIcon);
  });

  test("renders logo", () => {
    render(<Menu onToggle={() => {}} />);

    const logo = screen.getByRole("img", { name: "Otherfaces of Tech" });

    expect(logo).toBeInTheDocument();
  });

  test("renders menu links", () => {
    render(<Menu onToggle={() => {}} />);

    MENU_LINKS.map((menu) => {
      const menuLink = screen.getByRole("link", {
        name: menu.title,
      });

      expect(menuLink).toBeInTheDocument();
      expect(menuLink).toHaveAttribute("href", menu.to);
    });
  });
});
