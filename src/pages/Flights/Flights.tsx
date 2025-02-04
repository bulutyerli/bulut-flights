import { Box, Button, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import DatePick from "../../components/DatePick/DatePick";
import { useEffect, useState } from "react";
import { searchAirports } from "../../api/flightsApi/flightsApi";
import { AirportsListType, SearchDataType } from "../../types/types";
import SearchIcon from "@mui/icons-material/Search";
import dayjs, { Dayjs } from "dayjs";

export default function FlightsPage() {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
  });
  const [error, setError] = useState<string>("");
  const [fromAirports, setFromAirports] = useState<AirportsListType[]>([]);
  const [toAirports, setToAirports] = useState<AirportsListType[]>([]);
  const [selectedAirports, setSelectedAirports] = useState<SearchDataType>({
    from: { name: "", id: "", entityId: "" },
    to: { name: "", id: "", entityId: "" },
    fromDate: null,
    toDate: null,
  });

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

  const handleInputChange = (key: "from" | "to", value: string) => {
    setSearchData((prev) => ({ ...prev, [key]: value }));
  };

  const handleOptionSelect = (
    key: "from" | "to",
    airport: AirportsListType,
  ) => {
    setSelectedAirports((prev) => ({ ...prev, [key]: airport }));
  };

  const handleAirportSwap = () => {
    const temp = selectedAirports.from;

    setSelectedAirports((prev) => ({
      ...prev,
      from: selectedAirports.to,
      to: temp,
    }));
  };

  const handleDatePick = (key: "departure" | "return", date: Dayjs | null) => {
    const formattedDate = date?.format("YYYY-MM-DD");
    if (key === "departure") {
      setSelectedAirports((prev) => ({
        ...prev,
        fromDate: formattedDate,
      }));
    } else {
      setSelectedAirports((prev) => ({
        ...prev,
        toDate: formattedDate,
      }));
    }
  };

  console.log(selectedAirports.fromDate, "final");

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
          to={searchData.to}
          fromValue={selectedAirports.from}
          toValue={selectedAirports.to}
          onSelect={handleOptionSelect}
          onInputChange={handleInputChange}
          fromAirports={fromAirports}
          toAirports={toAirports}
          swap={handleAirportSwap}
        />
        <DatePick
          depDate={
            selectedAirports.fromDate ? dayjs(selectedAirports.fromDate) : null
          }
          returnDate={
            selectedAirports.toDate ? dayjs(selectedAirports.toDate) : null
          }
          onDateChange={handleDatePick}
        />
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
