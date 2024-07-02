import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import HeroPost from "./hero-post";

describe("HeroPost component", () => {
  test("renders post", () => {
    render(
      <HeroPost
        coverImage={{ node: { sourceUrl: "/test-cover-image" } }}
        title="Demo Post"
        date="2024-05-31"
        author={{
          node: { name: "John Doe", avatar: { url: "" } },
        }}
        excerpt={{}}
        slug="demo-post"
      />
    );

    const dateElement = screen.getByText("May 31, 2024");
    const authorName = screen.getByText("John Doe");

    expect(authorName).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
  });
});
