import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CoverImage from "./cover-image";

describe("CoverImage component", () => {
  test("renders image", () => {
    const imageDetails = {
      title: "Test Image",
      coverImage: { node: { sourceUrl: "/test-cover-image" } },
    };
    render(<CoverImage {...imageDetails} />);

    const image = screen.getByRole("img", {
      name: `Cover Image for ${imageDetails.title}`,
    });

    expect(image).toBeInTheDocument();
  });

  test("renders image with link", () => {
    const imageDetails = {
      title: "Test Image",
      coverImage: { node: { sourceUrl: "/test-cover-image" } },
      slug: "test-image",
    };

    render(<CoverImage {...imageDetails} />);

    const link = screen.getByRole("link");
    const image = within(link).getByRole("img", {
      name: `Cover Image for ${imageDetails.title}`,
    });

    expect(image).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/posts/${imageDetails.slug}`);
  });
});
