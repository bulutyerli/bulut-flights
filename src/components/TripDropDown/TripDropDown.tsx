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
      <InputLabel id="select-trip">Trip</InputLabel>
      <Select
        labelId="roundtrip"
        id="Trip-dropdown"
        value={trip}
        onChange={onChange}
      >
        <MenuItem aria-label="one-way" value={"One Way"}>
          One Way
        </MenuItem>
        <MenuItem aria-label="round-trip" value={"Round Trip"}>
          Round Trip
        </MenuItem>
      </Select>
    </FormControl>
  );
}
