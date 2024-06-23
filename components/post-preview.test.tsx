import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PostPreview from "./post-preview";

describe("PostPreview", () => {
  test("renders cover image", () => {
    render(
      <PostPreview
        title="Sample Post"
        coverImage={{ node: { sourceUrl: "http://example.com" } }}
        date="2024-06-23"
        excerpt=""
        author={{
          node: { name: "John", avatar: { url: "http://example.com" } },
        }}
        slug=""
      />
    );

    const coverImage = screen.getByRole("img", {
      name: `Cover Image for Sample Post`,
    });

    expect(coverImage).toBeInTheDocument();
  });
});
