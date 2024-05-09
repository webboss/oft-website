import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Modal2 } from "./modal2";

describe("Modal2", () => {
  test("renders modal with title prop", () => {
    render(
      <Modal2 title="Test Modal2" closeModal={() => {}}>
        <></>
      </Modal2>
    );

    const modal = screen.getByRole("dialog");
    const title = screen.getByRole("heading", {
      level: 6,
      name: "Test Modal2",
    });

    expect(modal).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(modal).toContain(title);
  });

  test("renders modal with children prop", () => {
    render(
      <Modal2 title="Test Modal2" closeModal={() => {}}>
        <h3>Please wait..</h3>
      </Modal2>
    );

    const text = screen.getByRole("heading", {
      level: 3,
      name: "Please wait..",
    });

    expect(text).toBeInTheDocument();
  });

  test("renders close button", () => {
    render(
      <Modal2 title="Test Modal2" closeModal={() => {}}>
        <></>
      </Modal2>
    );

    const closeButton = screen.getByRole("button");
    const closeIcon = within(closeButton).getByTitle("Close");

    expect(closeIcon.tagName).eq("svg");
    expect(closeIcon).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });
});
