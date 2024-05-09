import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FooterNavigation } from "./navigation";
import MENU_LINKS from "@/config/menu.json";

describe("Footer Navigation", () => {
  test("renders footer navigation items", () => {
    render(<FooterNavigation />);

    const nav = screen.getByRole("list");

    expect(nav).toBeInTheDocument();

    MENU_LINKS.map((menu) => {
      const menuLink = screen.getByRole("link", {
        name: menu.title,
      });

      expect(menuLink).toBeInTheDocument();
      expect(menuLink).toHaveAttribute("href", menu.to);
      expect(nav).toContain(menuLink);
    });
  });
});
