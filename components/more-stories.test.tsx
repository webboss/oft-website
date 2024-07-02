import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MoreStories from "./more-stories";

describe("MoreStories", () => {
  test("renders posts", () => {
    render(<MoreStories posts={POSTS} />);

    const title = screen.getByRole("heading", {
      level: 2,
      name: "More Stories",
    });

    expect(title).toBeInTheDocument();

    POSTS.map((post) => {
      const postTitle = screen.getByRole("heading", {
        level: 5,
        name: post.node.title,
      });

      expect(postTitle).toBeInTheDocument();
    });
  });
});

const POSTS = [
  {
    node: {
      slug: "Post-1",
      title: "Post 1",
      featuredImage: {
        node: {
          sourceUrl: "./post-1.png",
        },
      },
    },
  },
  {
    node: {
      slug: "Post-2",
      title: "Post 2",
      featuredImage: {
        node: {
          sourceUrl: "./post-2.png",
        },
      },
    },
  },
  {
    node: {
      slug: "Post-3",
      title: "Post 3",
      featuredImage: {
        node: {
          sourceUrl: "./post-3.png",
        },
      },
    },
  },
];
