import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FlightTable from "./FlightTable";
import userEvent from "@testing-library/user-event";

const mockFlightList = [
  {
    id: "flight1",
    price: { formatted: "$200" },
    legs: [
      {
        departure: "2025-02-05T10:00:00",
        arrival: "2025-02-05T14:00:00",
        durationInMinutes: 240,
        stopCount: 0,
        origin: { iataCode: "JFK" },
        destination: { iataCode: "LAX" },
        carriers: {
          marketing: [{ name: "Airline A", logoUrl: "logo-a.png" }],
        },
      },
    ],
  },
  {
    id: "flight2",
    price: { formatted: "$350" },
    legs: [
      {
        departure: "2025-02-06T09:30:00",
        arrival: "2025-02-06T15:30:00",
        durationInMinutes: 360,
        stopCount: 1,
        origin: { iataCode: "ORD" },
        destination: { iataCode: "MIA" },
        carriers: {
          marketing: [{ name: "Airline B", logoUrl: "logo-b.png" }],
        },
      },
    ],
  },
  {
    id: "flight3",
    price: { formatted: "$250" },
    legs: [
      {
        departure: "2025-02-07T11:00:00",
        arrival: "2025-02-07T15:00:00",
        durationInMinutes: 240,
        stopCount: 0,
        origin: { iataCode: "LAX" },
        destination: { iataCode: "ORD" },
        carriers: {
          marketing: [{ name: "Airline C", logoUrl: "logo-c.png" }],
        },
      },
    ],
  },
  {
    id: "flight4",
    price: { formatted: "$400" },
    legs: [
      {
        departure: "2025-02-08T07:30:00",
        arrival: "2025-02-08T11:30:00",
        durationInMinutes: 240,
        stopCount: 0,
        origin: { iataCode: "LAX" },
        destination: { iataCode: "MIA" },
        carriers: {
          marketing: [{ name: "Airline D", logoUrl: "logo-d.png" }],
        },
      },
    ],
  },
  {
    id: "flight5",
    price: { formatted: "$450" },
    legs: [
      {
        departure: "2025-02-09T06:00:00",
        arrival: "2025-02-09T10:00:00",
        durationInMinutes: 240,
        stopCount: 1,
        origin: { iataCode: "ORD" },
        destination: { iataCode: "LAX" },
        carriers: {
          marketing: [{ name: "Airline E", logoUrl: "logo-e.png" }],
        },
      },
    ],
  },
  {
    id: "flight6",
    price: { formatted: "$500" },
    legs: [
      {
        departure: "2025-02-10T14:30:00",
        arrival: "2025-02-10T18:30:00",
        durationInMinutes: 240,
        stopCount: 2,
        origin: { iataCode: "MIA" },
        destination: { iataCode: "JFK" },
        carriers: {
          marketing: [{ name: "Airline F", logoUrl: "logo-f.png" }],
        },
      },
    ],
  },
];

describe("FlightTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render table with titles", () => {
    render(<FlightTable flightData={mockFlightList} title="Departures" />);

    expect(
      screen.getByRole("heading", { level: 5, name: /departures/i }),
    ).toBeInTheDocument();
  });

  it("should render correct flight count", () => {
    render(<FlightTable flightData={mockFlightList} title="Departures" />);

    expect(
      screen.getByRole("heading", { level: 6, name: /Found: 6/i }),
    ).toBeInTheDocument();
  });

  it("should display flight details correctly", () => {
    render(<FlightTable flightData={mockFlightList} title="Departures" />);

    expect(screen.getByText("Airline A")).toBeInTheDocument();
    expect(screen.getByText("Airline B")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
    expect(screen.getByText("$350")).toBeInTheDocument();
  });

  it("should render show more button correctly for more than visible flights", async () => {
    render(<FlightTable flightData={mockFlightList} title="Departures" />);

    const user = userEvent.setup();

    expect(screen.getByText("Airline A")).toBeInTheDocument();
    expect(screen.getByText("Airline B")).toBeInTheDocument();
    expect(screen.queryByText("Airline F")).not.toBeInTheDocument();

    const showMoreButton = screen.getByRole("button", { name: /show more/i });

    expect(showMoreButton).toBeInTheDocument();

    await user.click(showMoreButton);

    expect(screen.getByText("Airline F")).toBeInTheDocument();
  });
});
