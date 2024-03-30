import { expect, afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest"; // Very important. Why? *.toBeInTheDocument() will throw undefined error.
import { ClassAttributes, ImgHTMLAttributes } from "react";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
  vi.mock("next/image", () => ({
    __esModule: true,
    default: (
      props: JSX.IntrinsicAttributes &
        ClassAttributes<HTMLImageElement> &
        ImgHTMLAttributes<HTMLImageElement>
    ) => <img alt="" {...props} />,
  }));
});
