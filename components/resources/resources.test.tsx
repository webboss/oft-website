import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Resources } from "../resources";

describe("Resources", () => {
  test("renders resource categories", () => {
    render(<Resources allCategoryQuery={CATEGORY_QUERY_RESPONSE} />);

    CATEGORY_QUERY_RESPONSE.categories.nodes.map((category) => {
      const name = screen.getByRole("heading", {
        level: 4,
        name: category.name,
      });
      const description = screen.getByText(category.description);

      expect(name).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  test("shows if a category is not available", () => {
    render(<Resources allCategoryQuery={CATEGORY_QUERY_RESPONSE} />);

    const comingSoonTexts = screen.queryAllByText("Coming Soon");

    const comingSoonCategories =
      CATEGORY_QUERY_RESPONSE.categories.nodes.filter(
        (category) => category.comingSoon
      );

    expect(comingSoonTexts.length).toEqual(comingSoonCategories.length);
  });
});

const CATEGORY_QUERY_RESPONSE = {
  categories: {
    nodes: [
      {
        name: "Category 1",
        description: "This is category 1",
        comingSoon: true,
      },
      {
        name: "Category 2",
        description: "This is category 2",
      },
      {
        name: "Category 3",
        description: "This is category 3",
      },
      {
        name: "Category 4",
        description: "This is category 4",
        comingSoon: true,
      },
    ],
  },
  resources: { nodes: [] },
};
