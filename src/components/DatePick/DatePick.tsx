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
        width: "100%",
        flexShrink: 2,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            width: "100%",
          }}
          label="Departure"
        />
        <DatePicker
          sx={{
            width: "100%",
          }}
          label="Return"
        />
      </LocalizationProvider>
    </Box>
  );
}
