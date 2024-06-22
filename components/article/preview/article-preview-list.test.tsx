import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ArticlePreviewList } from "@/components/article";

describe("Article Preview List", () => {
  test("renders preview heading", () => {
    render(
      <ArticlePreviewList heading="Test Preview Articles" articles={articles} />
    );

    const heading = screen.getByRole("heading", {
      level: 4,
      name: "Test Preview Articles",
    });

    expect(heading).toBeInTheDocument();
  });
});

const articles = [
  {
    title: "Article 100",
    slug: "article-100",
    featuredImage: { node: { sourceUrl: "/article-100.png" } },
    role: "Copy Writer",
  },
  {
    title: "Article 200",
    slug: "article-200",
    featuredImage: { node: { sourceUrl: "/article-200.png" } },
    role: "Mailer",
  },
  {
    title: "Article 300",
    slug: "article-300",
    featuredImage: { node: { sourceUrl: "/article-300.png" } },
    role: "Photographer",
  },
];
