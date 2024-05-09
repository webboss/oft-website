import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Modal } from "./modal";

describe("Modal", () => {
  test("renders modal if isOpen=true", () => {
    render(
      <Modal isOpen={true} closeModal={() => {}}>
        <></>
      </Modal>
    );

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
  });

  test("does not render modal if isOpen=false", () => {
    render(
      <Modal isOpen={false} closeModal={() => {}}>
        <></>
      </Modal>
    );

    const modal = screen.queryByRole("dialog");

    expect(modal).not.toBeInTheDocument();
  });

  test("renders modal with children props when isOpen=true", () => {
    render(
      <Modal isOpen={true} closeModal={() => {}}>
        <h3>Test Modal</h3>
      </Modal>
    );

    const text = screen.getByRole("heading", { level: 3, name: "Test Modal" });

    expect(text).toBeInTheDocument();
  });
});
