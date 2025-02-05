import { describe, expect, it, vi } from "vitest";
import TripDropDown from "./TripDropDown";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TripDropDown", () => {
  const mockOnChange = vi.fn();

  it("should render dropdown with passed value", () => {
    render(<TripDropDown trip="One Way" onChange={mockOnChange} />);

    const dropDownButton = screen.getByLabelText(/One Way/i);

    expect(dropDownButton).toBeInTheDocument();
    expect(screen.queryByLabelText(/Round Trip/i)).not.toBeInTheDocument();
  });

  it("renders the options correctly", async () => {
    const user = userEvent.setup();
    render(<TripDropDown trip="One Way" onChange={mockOnChange} />);

    await user.click(screen.getByRole("combobox"));

    expect(
      screen.getByRole("option", { name: /one-way/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: /round-trip/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: /round-trip/i }));

    expect(mockOnChange).toHaveBeenCalled();
  });
});
