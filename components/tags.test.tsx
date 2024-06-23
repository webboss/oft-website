import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Tags from "./tags";

describe("Tags", () => {
  test("renders tags", () => {
    render(<Tags tags={TAGS} />);

    TAGS.edges.map((tag) => {
      const tagName = screen.getByText(tag.node.name);

      expect(tagName).toBeInTheDocument();
    });
  });
});

const TAGS = {
  edges: [
    {
      node: {
        name: "Design",
      },
    },
    {
      node: {
        name: "Writing",
      },
    },
  ],
};
