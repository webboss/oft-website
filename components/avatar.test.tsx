import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Avatar from "./avatar";

describe("Avatar component", () => {
  test("renders image", () => {
    const author = {
      node: { name: "John Doe", avatar: { url: "" } },
    };

    render(<Avatar author={author} />);

    const logo = screen.getByRole("img", {
      name: author.node.name,
    });

    expect(logo).toBeInTheDocument();
  });

  test("renders author's name", () => {
    const author = {
      node: { name: "Jane Doe", avatar: { url: "" } },
    };

    render(<Avatar author={author} />);

    const text = screen.getByText(author.node.name);

    expect(text).toBeInTheDocument();
  });
});
