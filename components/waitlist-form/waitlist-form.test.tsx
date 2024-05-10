import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { WailistForm } from "./waitlist-form";

describe("WaitlistForm", () => {
  test("renders modal if isOpen=true", () => {
    render(<WailistForm isOpen={true} closeModal={() => {}} />);

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
  });

  test("handles modal close", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<WailistForm isOpen={true} closeModal={handleClose} />);

    const closeButton = screen.getByRole("button", { name: "close" });

    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledOnce();
  });

});
