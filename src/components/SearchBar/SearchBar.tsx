import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PlaceIcon from "@mui/icons-material/Place";
import { SearchBarType } from "../../types/types";

export default function SearchBar({
  from,
  onSearchChange,
  fromAirports,
  toAirports,
}: SearchBarType) {
  console.log(from, " testt");
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        width: "100%",
        flexShrink: 1,
      }}
    >
      <Autocomplete
        sx={{
          width: "100%",
        }}
        options={fromAirports}
        freeSolo
        disableClearable
        inputValue={from}
        autoHighlight
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : option.presentation?.suggestionTitle || ""
        }
        onInputChange={(_, newValue) => {
          onSearchChange("from", newValue);
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
          width: "100%",
        }}
        disableClearable
        options={toAirports}
        autoHighlight
        freeSolo
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : option.presentation?.suggestionTitle || ""
        }
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
