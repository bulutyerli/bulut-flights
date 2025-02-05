import { useEffect, useState } from "react";
import { AirportsListType } from "../../types/types";
import { searchAirports } from "../../services/flightServices/flightServices";

export const useAirportSearch = (searchTerm: string, delay = 500) => {
  const [airports, setAirports] = useState<AirportsListType[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!searchTerm) return;
    const handler = setTimeout(() => {
      const fetchAirports = async () => {
        try {
          const result = await searchAirports(searchTerm);
          setAirports(result.data);
        } catch {
          setError("Error fetching airports");
        }
      };
      fetchAirports();
    }, delay);
    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  return { airports, error };
};
