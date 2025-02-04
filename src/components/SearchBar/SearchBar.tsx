import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PlaceIcon from "@mui/icons-material/Place";
import { SearchBarType } from "../../types/types";

export default function SearchBar({
  from,
  to,
  onSearchChange,
  fromAirports,
  toAirports,
}: SearchBarType) {
  console.log(toAirports, " testt");
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: "1rem",
        width: "100%",
      }}
    >
      <Autocomplete
        sx={{
          width: {
            xs: "100%",
            lg: "300px",
          },
        }}
        options={fromAirports}
        autoHighlight
        inputValue={from}
        getOptionLabel={(option) => option.presentation?.suggestionTitle || ""}
        onInputChange={(_, newValue) => {
          if (newValue.length > 2) {
            onSearchChange("from", newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Where to?"
            slotProps={{
              input: {
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
      <CompareArrowsIcon
        sx={{
          fontSize: 30,
        }}
      />
      <Autocomplete
        sx={{
          width: {
            xs: "100%",
            lg: "300px",
          },
        }}
        options={toAirports}
        autoHighlight
        getOptionLabel={(option) => option.presentation?.suggestionTitle || ""}
        onInputChange={(_, newValue) => {
          if (newValue.length > 2) {
            onSearchChange("to", newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Where to?"
            slotProps={{
              input: {
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </Box>
  );
}
