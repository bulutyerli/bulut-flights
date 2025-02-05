import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PassengerCount from "./PassengerCount";
import userEvent from "@testing-library/user-event";

describe("PassengerCount", () => {
  const mockCount = 4;
  const mockOnCountChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    render(
      <PassengerCount count={mockCount} onCountChange={mockOnCountChange} />,
    );

    expect(screen.getByText(/adult/i)).toBeInTheDocument();
  });

  it("should call correct count change functions", async () => {
    const user = userEvent.setup();

    render(
      <PassengerCount count={mockCount} onCountChange={mockOnCountChange} />,
    );

    const incButton = screen.getByRole("button", { name: /Increment/i });
    const decButton = screen.getByRole("button", { name: /Decrement/i });

    expect(incButton).toBeInTheDocument();
    expect(decButton).toBeInTheDocument();

    await user.click(incButton);
    expect(mockOnCountChange).toHaveBeenCalledWith(5);

    await user.click(decButton);
    expect(mockOnCountChange).toHaveBeenCalledWith(3);
  });
});
