import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { FlightList } from "../../types/types";

const FlightTable = ({
  flightData,
  title,
}: {
  flightData: FlightList[];
  title: string;
}) => {
  const [visibleFlights, setVisibleFlights] = useState(5);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const showMore = () => {
    setVisibleFlights((prev) => prev + 5);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ marginTop: "5rem" }}>
        {title}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "2rem", overflowX: "auto" }}
      >
        <Typography variant="h6" sx={{ margin: "1rem" }}>
          Flights Found: {flightData.length}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Airline</TableCell>
              <TableCell>Departure → Arrival</TableCell>
              {!isMobile && <TableCell>Duration</TableCell>}
              {!isMobile && <TableCell>Stops</TableCell>}
              {isMobile && <TableCell>Duration & Stops</TableCell>}
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flightData.slice(0, visibleFlights).map((flight) => {
              const leg = flight.legs[0];
              const airline = leg.carriers.marketing[0];
              const duration = leg.durationInMinutes;
              const stops =
                leg.stopCount === 0 ? "Direct" : `${leg.stopCount} Stop(s)`;
              const price = flight.price.formatted;

              const departureTime = dayjs(leg.departure).format("HH:mm");
              const arrivalTime = dayjs(leg.arrival).format("HH:mm");
              const departureAirport = leg.origin.iataCode;
              const arrivalAirport = leg.destination.iataCode;

              return (
                <TableRow key={flight.id}>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "1rem",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Box sx={{ width: { xs: "30px", sm: "50px" } }}>
                      <img
                        src={airline.logoUrl}
                        alt={airline.name}
                        style={{ borderRadius: "50%", width: "100%" }}
                      />
                    </Box>
                    <Typography
                      sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
                    >
                      {airline.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {departureTime} {departureAirport} - {arrivalTime}{" "}
                    {arrivalAirport}{" "}
                    <Typography variant="caption">(Local)</Typography>
                  </TableCell>
                  {!isMobile && (
                    <TableCell>{`${Math.floor(duration / 60)}h ${duration % 60}m`}</TableCell>
                  )}
                  {!isMobile && <TableCell>{stops}</TableCell>}
                  {isMobile && (
                    <TableCell>
                      {`${Math.floor(duration / 60)}h ${duration % 60}m`} -{" "}
                      {stops}
                    </TableCell>
                  )}
                  <TableCell>
                    <Typography variant="h6">{price}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {flightData.length > visibleFlights ? (
          <Button
            variant="contained"
            sx={{
              display: "block",
              margin: "1rem auto",
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={showMore}
          >
            Show More
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{
              display: "block",
              margin: "1rem auto",
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={() => setVisibleFlights(5)}
          >
            Show Less
          </Button>
        )}
      </TableContainer>
    </Box>
  );
};

export default FlightTable;
