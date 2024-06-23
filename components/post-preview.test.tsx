import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PostPreview from "./post-preview";

describe("PostPreview", () => {
  const post = {
    title: "Sample Post",
    coverImage: { node: { sourceUrl: "http://example.com" } },
    date: "2024-06-23",
    excerpt: "",
    author: {
      node: { name: "John", avatar: { url: "http://example.com" } },
    },
    slug: "sample-post",
  };

  test("renders cover image", () => {
    render(<PostPreview {...post} />);

    const coverImage = screen.getByRole("img", {
      name: `Cover Image for Sample Post`,
    });

    expect(coverImage).toBeInTheDocument();
  });
});
