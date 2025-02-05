import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";
import { SearchBarType } from "../../types/types";

describe("SearchBar", () => {
  const mockOnInputChange = vi.fn();
  const mockOnSelect = vi.fn();
  const mockSwap = vi.fn();

  const fromAirports = [
    {
      presentation: {
        title: "Los Angeles",
        suggestionTitle: "Los Angeles (LAX)",
      },
      id: "1",
      entityId: "22",
    },
    {
      presentation: {
        title: "New York",
        suggestionTitle: "New York (JFK)",
      },
      id: "2",
      entityId: "33",
    },
  ];
  const toAirports = [
    {
      presentation: {
        title: "San Francisco",
        suggestionTitle: "San Francisco (SFO)",
      },
      id: "3",
      entityId: "44",
    },
    {
      presentation: {
        title: "Chicago",
        suggestionTitle: "Chicago (ORD)",
      },
      id: "4",
      entityId: "55",
    },
  ];

  const props: SearchBarType = {
    from: "",
    to: "",
    fromValue: null,
    toValue: null,
    onInputChange: mockOnInputChange,
    onSelect: mockOnSelect,
    fromAirports,
    toAirports,
    swap: mockSwap,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render input fields for 'from' and 'to' locations", () => {
    render(<SearchBar {...props} />);

    expect(screen.getByLabelText(/where from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/where to/i)).toBeInTheDocument();
  });

  it("should call onInputChange when text is entered in 'from' input", async () => {
    const user = userEvent.setup();

    render(<SearchBar {...props} />);

    const fromInput = screen.getByLabelText(/where from/i);
    await user.type(fromInput, "Los Angeles");

    expect(mockOnInputChange).toHaveBeenCalledWith("from", "L");
    expect(mockOnInputChange).toHaveBeenCalledWith("from", "o");
  });

  it("should call onInputChange when text is entered in 'to' input", async () => {
    const user = userEvent.setup();

    render(<SearchBar {...props} />);

    const toInput = screen.getByLabelText(/where to/i);
    await user.type(toInput, "San Francisco");

    expect(mockOnInputChange).toHaveBeenCalledWith("to", "S");
    expect(mockOnInputChange).toHaveBeenCalledWith("to", "a");
  });

  it("should call onSelect when an option is selected in 'to' input", async () => {
    const user = userEvent.setup();

    render(<SearchBar {...props} />);

    const toInput = screen.getByLabelText(/where to/i);
    await user.type(toInput, "San Francisco");
    await user.click(screen.getByText(/san francisco/i));

    expect(mockOnSelect).toHaveBeenCalledWith("to", {
      presentation: {
        title: "San Francisco",
        suggestionTitle: "San Francisco (SFO)",
      },
      id: "3",
      entityId: "44",
    });
  });

  it("should call swap function when swap button is clicked", async () => {
    const user = userEvent.setup();

    render(<SearchBar {...props} />);

    const swapButton = screen.getByRole("button", { name: /swap/i });
    await user.click(swapButton);

    expect(mockSwap).toHaveBeenCalled();
  });
});
