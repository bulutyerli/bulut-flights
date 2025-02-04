import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DatePick() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Departure" />
        <DatePicker label="Return" />
      </LocalizationProvider>
    </Box>
  );
}
