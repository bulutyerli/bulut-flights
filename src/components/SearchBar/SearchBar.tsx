import {
  Autocomplete,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PlaceIcon from "@mui/icons-material/Place";
import { SearchBarType } from "../../types/types";

export default function SearchBar({
  from,
  to,
  fromValue,
  toValue,
  onInputChange,
  onSelect,
  fromAirports = [],
  toAirports = [],
  swap,
}: SearchBarType) {
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
        disableClearable
        autoHighlight
        inputValue={from}
        value={fromValue}
        getOptionLabel={(option) => option?.presentation?.suggestionTitle || ""}
        onInputChange={(_, newValue) => {
          onInputChange("from", newValue);
        }}
        onChange={(_, selectedOption) => {
          if (selectedOption) {
            onSelect("from", selectedOption);
          }
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box key={key} component="li" {...optionProps}>
              {option.presentation.suggestionTitle}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Where from?"
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
      <IconButton aria-label="Swap flights" onClick={swap}>
        <CompareArrowsIcon
          sx={{
            fontSize: 30,
          }}
        />
      </IconButton>

      <Autocomplete
        sx={{
          width: "100%",
        }}
        disableClearable
        options={toAirports}
        autoHighlight
        value={toValue}
        inputValue={to}
        getOptionLabel={(option) => option?.presentation?.suggestionTitle || ""}
        onInputChange={(_, newValue) => {
          onInputChange("to", newValue);
        }}
        onChange={(_, selectedOption) => {
          if (selectedOption) {
            onSelect("to", selectedOption);
          }
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box key={key} component="li" {...optionProps}>
              {option.presentation.suggestionTitle}
            </Box>
          );
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
