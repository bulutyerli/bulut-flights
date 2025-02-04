import { Box, Button, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import DatePick from "../../components/DatePick/DatePick";
import useCurrentLocation from "../../hooks/useCurrentLocation/useCurrentLocation";
import { useEffect, useState } from "react";
import {
  getNearbyAirports,
  searchAirports,
} from "../../api/flightsApi/flightsApi";
import { AirportsListType } from "../../types/types";
import SearchIcon from "@mui/icons-material/Search";

export default function FlightsPage() {
  const { location } = useCurrentLocation();
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: null,
  });
  const [error, setError] = useState<string>("");
  const [fromAirports, setFromAirports] = useState<AirportsListType[]>([]);
  const [toAirports, setToAirports] = useState<AirportsListType[]>([]);

  useEffect(() => {
    if (location) {
      const getData = async () => {
        try {
          const airportData = await getNearbyAirports(
            location.latitude.toString(),
            location.longitude.toString(),
          );
          setSearchData((prev) => ({
            ...prev,
            from: airportData.data.nearby?.[0]?.presentation?.suggestionTitle,
          }));
        } catch {
          setError("Error fetching nearby airports");
        }
      };

      getData();
    }
  }, [location]);

  useEffect(() => {
    if (searchData.from) {
      const handler = setTimeout(() => {
        const getAirports = async () => {
          try {
            const airportData = await searchAirports(searchData.from);
            setFromAirports(airportData.data);
          } catch {
            setError("Error fetching airports");
          }
        };

        getAirports();
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [searchData.from]);

  useEffect(() => {
    if (searchData.to) {
      const handler = setTimeout(() => {
        const getAirports = async () => {
          try {
            const airportData = await searchAirports(searchData.to);
            setToAirports(airportData.data);
          } catch {
            setError("Error fetching destination airports");
          }
        };

        getAirports();
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [searchData.to]);

  const handleSearchChange = (key: "from" | "to", value: string) => {
    setSearchData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Flights
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: "2rem",
          border: "1px solid #c4c4c4",
          padding: "1rem",
          paddingBottom: "2rem",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <SearchBar
          from={searchData.from}
          onSearchChange={handleSearchChange}
          fromAirports={fromAirports}
          toAirports={toAirports}
        />
        <DatePick />
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            bottom: "0",
            transform: "translateX(-50%) translateY(50%)",
            left: "50%",
          }}
        >
          <SearchIcon />
          Search
        </Button>
      </Box>
      {error && (
        <Typography variant="h6" sx={{ color: "red", marginTop: "1rem" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
