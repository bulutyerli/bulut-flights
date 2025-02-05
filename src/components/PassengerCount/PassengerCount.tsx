import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { PassengerCountProps } from "../../types/types";

export default function PassengerCount({
  count,
  onCountChange,
}: PassengerCountProps) {
  const handleIncrement = () => {
    onCountChange(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      onCountChange(count - 1);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        aria-label="Decrement"
        onClick={handleDecrement}
        sx={{ padding: "0 10px", minWidth: "30px", height: "40px" }}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        value={count}
        type="number"
        slotProps={{
          input: {
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">Adult</InputAdornment>
            ),
          },
        }}
        sx={{
          width: "100px",
          textAlign: "center",
        }}
      />
      <IconButton
        aria-label="Increment"
        onClick={handleIncrement}
        sx={{ padding: "0 10px", minWidth: "30px", height: "40px" }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}
