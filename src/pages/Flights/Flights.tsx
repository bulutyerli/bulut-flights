import { Box, Button, SelectChangeEvent, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import DatePick from "../../components/DatePick/DatePick";
import { useState } from "react";
import { AirportsListType, SearchDataType } from "../../types/types";
import SearchIcon from "@mui/icons-material/Search";
import dayjs, { Dayjs } from "dayjs";
import FlightTable from "../../components/FlightTable/FlightTable";
import TripDropDown from "../../components/TripDropDown/TripDropDown";
import PassengerCount from "../../components/PassengerCount/PassengerCount";
import { useAirportSearch } from "../../hooks/useAirportSearch/useAirportSearch";
import { useFlightSearch } from "../../hooks/useFlightSearch/useFlightSearch";

export default function FlightsPage() {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
  });

  const [selectedAirports, setSelectedAirports] = useState<SearchDataType>({
    from: { name: "", skyId: "", entityId: "" },
    to: { name: "", skyId: "", entityId: "" },
    fromDate: null,
    toDate: null,
  });
  const [trip, setTrip] = useState<"One Way" | "Round Trip">("Round Trip");
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const { airports: fromAirports } = useAirportSearch(searchData.from);
  const { airports: toAirports } = useAirportSearch(searchData.to);
  const { flightList, loading, error, fetchFlights } = useFlightSearch();

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

  const handleTripChange = (event: SelectChangeEvent) => {
    setTrip(event.target.value as "One Way" | "Round Trip");
  };

  const handlePassengerCountChange = (newCount: number) => {
    setPassengerCount(newCount);
  };

  const handleSearchClick = async () => {
    await fetchFlights(selectedAirports, passengerCount, trip);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3" gutterBottom>
        Flights
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          marginBottom: "1rem",
          gap: "2rem",
        }}
      >
        <TripDropDown trip={trip} onChange={handleTripChange} />
        <PassengerCount
          count={passengerCount}
          onCountChange={handlePassengerCountChange}
        />
      </Box>{" "}
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
          isOneWay={trip === "One Way"}
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
          onClick={handleSearchClick}
        >
          <SearchIcon />
          Search
        </Button>
      </Box>
      {error && (
        <Typography variant="h6" sx={{ color: "red", marginTop: "2rem" }}>
          {error}
        </Typography>
      )}
      {flightList?.departure && flightList.departure.length > 0 && (
        <FlightTable title="Departure" flightData={flightList.departure} />
      )}
      {flightList?.return && flightList.return.length > 0 && (
        <FlightTable title="Return Flights" flightData={flightList.return} />
      )}
      {loading && (
        <Typography variant="h6" sx={{ color: "green", marginTop: "2rem" }}>
          Loading...
        </Typography>
      )}
    </Box>
  );
}
