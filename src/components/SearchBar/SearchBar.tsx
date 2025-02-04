import { InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PlaceIcon from "@mui/icons-material/Place";
import TripOriginIcon from "@mui/icons-material/TripOrigin";

export default function SearchBar() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <TextField
        fullWidth
        label="Where from?"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <TripOriginIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <CompareArrowsIcon
        sx={{
          fontSize: 30,
        }}
      />
      <TextField
        fullWidth
        label="Where to?"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
