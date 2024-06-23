import { render, screen } from "@testing-library/react";
import PostHeader from "./post-header";
import { describe, expect, test } from "vitest";

describe("PostHeader", () => {
  test("renders post details", () => {
    const post = {
      title: "Sample Post",
      date: "2024-06-23",
      author: {
        node: { name: "John Doe", avatar: { url: "" } },
      },
      categories: {
        edges: [
          { node: { name: "Category 1" } },
          { node: { name: "Category 2" } },
        ],
      },
      coverImage: { node: { sourceUrl: "/john-smith.img" } },
    };

    render(<PostHeader {...post} />);

    const title = screen.getByRole("heading", { level: 1, name: post.title });
    const author = screen.getAllByText(post.author.node.name);
    const date = screen.getByText("June 23, 2024");

    expect(title).toBeInTheDocument();
    expect(author.length).toEqual(2);
    expect(date).toBeInTheDocument();

    post.categories.edges.map((category) =>
      expect(screen.getByText(category.node.name)).toBeInTheDocument()
    );
  });
});
