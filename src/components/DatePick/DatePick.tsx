import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePickType } from "../../types/types";
import { Dayjs } from "dayjs";

export default function DatePick({
  depDate,
  returnDate,
  onDateChange,
}: DatePickType) {
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
          value={depDate || null}
          onChange={(date: Dayjs | null) => {
            onDateChange("departure", date);
          }}
        />
        <DatePicker
          sx={{
            width: "100%",
          }}
          label="Return"
          value={returnDate || null}
          onChange={(date: Dayjs | null) => {
            onDateChange("return", date);
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
