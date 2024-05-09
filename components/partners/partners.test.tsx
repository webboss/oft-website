import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Partners } from "./partners";
import { partners } from "config/partners";

describe("Partners", () => {
  test("renders all partners list logo", () => {
    render(<Partners />);

    partners.map((partner) => {
      const logo = screen.getByTitle(partner.name);

      expect(logo).toBeInTheDocument();
      expect(logo.tagName).eq("svg");
    });
  });
});
