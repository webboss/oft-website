import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MainFooter } from "../footer";
import MENU_LINKS from "config/menu.json";

describe("Footer", () => {
  test("renders footer element", () => {
    render(<MainFooter />);

    const footerElement = screen.getByRole("contentinfo");

    expect(footerElement).toBeInTheDocument();
  });

  test("renders logo", () => {
    render(<MainFooter />);

    const logo = screen.getByRole("img", { name: "Other Faces of Tech" });

    expect(logo).toBeInTheDocument();
  });

  test("renders menu links", () => {
    render(<MainFooter />);

    MENU_LINKS.map((menu) => {
      const menuLink = screen.getByRole("link", {
        name: menu.title,
      });

      expect(menuLink).toBeInTheDocument();
      expect(menuLink).toHaveAttribute("href", menu.to);
    });
  });

  test("renders copyright text", () => {
    render(<MainFooter />);

    const copyright = screen.getByText(
      /All rights Reserved. Other Faces of Tech/i
    );

    expect(copyright).toBeInTheDocument();
  });
});
