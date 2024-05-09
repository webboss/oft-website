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
});
