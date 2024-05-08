import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Layout } from ".";

describe("Layout", () => {
  test("renders navbar", () => {
    render(
      <Layout title="Test Layout">
        <p>Hello world</p>
      </Layout>
    );

    const header = screen.getByRole("banner");

    expect(header).toBeInTheDocument();
  });
});
