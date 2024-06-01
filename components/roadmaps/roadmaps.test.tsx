import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ROADMAPS } from "@/config/roadmaps";
import { Roadmaps } from "./roadmaps";

describe("Roadmaps", () => {
  test("renders all roadmaps", () => {
    render(<Roadmaps />);

    const title = screen.getByRole("heading", {
      level: 2,
      name: "A clear roadmap for you.",
    });

    expect(title).toBeInTheDocument();
    ROADMAPS.map((roadmap) => {
      const featuredRoadmapTitle = screen.getByRole("heading", {
        level: 4,
        name: roadmap.title.trim(),
      });

      expect(featuredRoadmapTitle).toBeInTheDocument();
    });
  });

  test("renders coming soon tag if roadmap is not available", () => {
    render(<Roadmaps />);

    const comingSoonRoadmaps = ROADMAPS.filter((roadmap) => roadmap.comingSoon);
    const comingSoonTextElements = screen.queryAllByText("Coming Soon");

    expect(comingSoonTextElements.length).to.eq(comingSoonRoadmaps.length);
  });
});
