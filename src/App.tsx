import { Box } from "@mui/material";
import "./App.css";
import FlightsPage from "./pages/Flights/Flights";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <FlightsPage />
    </Box>
  );
}
export default App;
