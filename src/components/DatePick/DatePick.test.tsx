import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import DatePick from "./DatePick";
import "@testing-library/jest-dom/vitest";
import dayjs from "dayjs";

describe("DatePick", () => {
  const mockOnDateChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render departure and return date pickers based on oneWay prop", () => {
    render(
      <DatePick
        depDate={null}
        returnDate={null}
        onDateChange={mockOnDateChange}
        isOneWay={false}
      />,
    );

    expect(screen.getByLabelText(/departure/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/return/i)).toBeInTheDocument();
  });

  it("should render departure only date pickers based on oneWay prop", () => {
    render(
      <DatePick
        depDate={null}
        returnDate={null}
        onDateChange={mockOnDateChange}
        isOneWay={true}
      />,
    );

    expect(screen.getByLabelText(/departure/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/return/i)).not.toBeInTheDocument();
  });

  it("should call onDateChange when only departure date is selected", () => {
    render(
      <DatePick
        depDate={null}
        returnDate={null}
        onDateChange={mockOnDateChange}
        isOneWay={true}
      />,
    );

    const newDepDate = dayjs("2025-02-15");
    const depInput = screen.getByLabelText(/departure/i);

    fireEvent.change(depInput, {
      target: { value: newDepDate.format("MM/DD/YYYY") },
    });

    expect(mockOnDateChange).toHaveBeenCalledTimes(1);
    expect(mockOnDateChange).toHaveBeenCalledWith(
      "departure",
      expect.any(Object),
    );
  });

  it("should not call onDateChange when component initially renders", () => {
    render(
      <DatePick
        depDate={null}
        returnDate={null}
        onDateChange={mockOnDateChange}
        isOneWay={false}
      />,
    );

    expect(mockOnDateChange).not.toHaveBeenCalled();
  });
});
