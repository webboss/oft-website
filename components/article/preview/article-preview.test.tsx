import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ArticlePreview } from "@/components/article";

describe("Article Preview", () => {
  const article = {
    title: "Article 350",
    slug: "article-350",
    featuredImage: { node: { sourceUrl: "/article-350.png" } },
    role: "Copy Writer",
  };

  test("renders article", () => {
    render(<ArticlePreview {...article} />);

    const title = screen.getByRole("heading", {
      level: 5,
      name: "Article 350",
    });
    const role = screen.getByText("Copy Writer");
    const image = screen.getByRole("img", {
      name: "Cover Image for Article 350",
    });

    expect(title).toBeInTheDocument();
    expect(role).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test("renders link to article", () => {
    render(<ArticlePreview {...article} />);

    const link = screen.getByRole("link", {
      name: "Read story",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/story/article-350");
  });
});
