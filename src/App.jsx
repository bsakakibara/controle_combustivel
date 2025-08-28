import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import darkTheme from "./theme";
import ControleVeiculo from "./components/ControleVeiculo";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <ControleVeiculo />
      </Container>
    </ThemeProvider>
  );
}

export default App;