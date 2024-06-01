import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Categories from "./categories";

describe("Categories component", () => {
  test("renders many categories", () => {
    const categoryList = {
      edges: [
        {
          node: {
            name: "Category 1",
          },
        },
      ],
    };
    render(<Categories categories={categoryList} />);

    categoryList.edges.map((category) =>
      expect(screen.getByText(category.node.name)).toBeInTheDocument()
    );
  });
});
