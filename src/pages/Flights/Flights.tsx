import { Box, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import DatePick from "../../components/DatePick/DatePick";

export default function FlightsPage() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Flights
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <SearchBar />
        <DatePick />
      </Box>
    </Box>
  );
}
