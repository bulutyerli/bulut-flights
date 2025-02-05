import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function TripDropDown({
  onChange,
  trip,
}: {
  onChange: (event: SelectChangeEvent) => void;
  trip: "One Way" | "Round Trip";
}) {
  return (
    <FormControl
      variant="standard"
      sx={{
        width: "150px",
        textAlign: "left",
      }}
    >
      <InputLabel id="demo-simple-select-label">Trip</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={trip}
        onChange={onChange}
      >
        <MenuItem value={"One Way"}>One Way</MenuItem>
        <MenuItem value={"Round Trip"}>Round Trip</MenuItem>
      </Select>
    </FormControl>
  );
}
