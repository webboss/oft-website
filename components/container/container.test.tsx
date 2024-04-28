import { describe, expect, test } from "vitest";
import { Container } from "../container";
import { render, screen } from "@testing-library/react";

describe("<Container />", () => {
  test("renders container with content", () => {
    render(
      <Container>
        <h1>Hello</h1>
      </Container>
    );

    const componentWrapper = screen.getByRole("main");
    const content = screen.getByRole("heading", { name: "Hello", level: 1 });

    expect(componentWrapper).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
