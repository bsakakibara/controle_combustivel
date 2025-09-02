import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import lightTheme from "./components/theme/lightTheme";
import darkTheme from "./components/theme/darkTheme";
import ControleVeiculo from "./components/ControleVeiculo";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <ControleVeiculo darkMode={darkMode} setDarkMode={setDarkMode} />
      </Container>
    </ThemeProvider>
  );
}

export default App;