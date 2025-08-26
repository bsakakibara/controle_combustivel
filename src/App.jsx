import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import ControleCombustivel from "./components/ControleCombustivel";
import darkTheme from "./theme";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <ControleCombustivel />
      </Container>
    </ThemeProvider>
  );
}

export default App;