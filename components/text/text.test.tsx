import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Text } from "../text";

describe("Text component", () => {
  test("renders text", () => {
    render(<Text variant="h1" value="Hello World!" />);

      const text = screen.getByText("Hello World!");

      expect(text).toBeInTheDocument()
  });
});
