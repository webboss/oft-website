import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Text } from "../text";

describe("Text component", () => {
  test("renders text", () => {
    render(<Text variant="p12" value="Hello World!" />);

    const text = screen.getByText("Hello World!");

    expect(text).toBeInTheDocument();
  });

  test("renders text with heading tags", () => {
    render(
      <>
        <Text variant="h1" value="Text 1" />
        <Text variant="h2" value="Text 2" />
        <Text variant="h3" value="Text 3" />
        <Text variant="h4" value="Text 4" />
        <Text variant="h5" value="Text 5" />
        <Text variant="h6" value="Text 6" />
        <Text variant="h7" value="Text 7" />
      </>
    );

    const h1Element = screen.getByRole("heading", {
      name: "Text 1",
    });
    const h2Element = screen.getByRole("heading", {
      name: "Text 2",
    });
    const h3Element = screen.getByRole("heading", {
      name: "Text 3",
    });
    const h4Element = screen.getByRole("heading", {
      name: "Text 4",
    });
    const h5Element = screen.getByRole("heading", {
      name: "Text 5",
    });
    const h6Element = screen.getByRole("heading", {
      name: "Text 6",
    });
    const h7Element = screen.getByRole("heading", {
      name: "Text 7",
    });

    expect(h1Element).toBeInTheDocument();
    expect(h2Element).toBeInTheDocument();
    expect(h3Element).toBeInTheDocument();
    expect(h4Element).toBeInTheDocument();
    expect(h5Element).toBeInTheDocument();
    expect(h6Element).toBeInTheDocument();
    expect(h7Element).toBeInTheDocument();
  });
});
