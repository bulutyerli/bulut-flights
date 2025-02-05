// hooks/useFlightSearch.ts
import { useState } from "react";
import dayjs from "dayjs";
import { FlightData, SearchDataType } from "../../types/types";
import { getFlights } from "../../services/flightServices/flightServices";

export const useFlightSearch = () => {
  const [flightList, setFlightList] = useState<FlightData>({
    departure: [],
    return: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFlights = async (
    selectedAirports: SearchDataType,
    passengerCount: number,
    trip: "One Way" | "Round Trip",
  ) => {
    if (
      selectedAirports.fromDate &&
      selectedAirports.from.skyId &&
      selectedAirports.to.skyId
    ) {
      try {
        setLoading(true);
        const departureFlights = await getFlights({
          originSkyId: selectedAirports.from.skyId,
          destinationSkyId: selectedAirports.to.skyId,
          adults: passengerCount.toString(),
          originEntityId: selectedAirports.from.entityId,
          destinationEntityId: selectedAirports.to.entityId,
          date: selectedAirports.fromDate || dayjs().format("YYYY-MM-DD"),
        });

        let returnFlights = [];
        if (trip === "Round Trip" && selectedAirports.toDate) {
          returnFlights = await getFlights({
            originSkyId: selectedAirports.to.skyId,
            destinationSkyId: selectedAirports.from.skyId,
            adults: passengerCount.toString(),
            originEntityId: selectedAirports.to.entityId,
            destinationEntityId: selectedAirports.from.entityId,
            date: selectedAirports.toDate || dayjs().format("YYYY-MM-DD"),
          });
        }
        setFlightList({
          departure: departureFlights.data.itineraries,
          return: returnFlights.data?.itineraries || [],
        });
      } catch {
        setError("Error fetching flights");
      } finally {
        setLoading(false);
      }
    } else {
      setError(
        "Please select valid departure and destination airports with dates.",
      );
    }
  };

  return { flightList, loading, error, fetchFlights };
};
