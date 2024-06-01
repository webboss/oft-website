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

//   test("renders coming soon tag if roadmap is not available", () => {
//     ROADMAPS.map((roadmap) => {
//       const comingSoonText = screen.queryByText("Coming Soons");

//       if (roadmap.comingSoon) {
//         expect(comingSoonText).toBeInTheDocument();
//       } else {
//         expect(comingSoonText).not.toBeInTheDocument();
//       }
//     });
//   });
});
