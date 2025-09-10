import { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import ControleOleo from "./ControleOleo";
import ControleCombustivel from "./ControleCombustivel";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

export default function ControleVeiculo({ darkMode, setDarkMode }) {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [capacidadeTanque, setCapacidadeTanque] = useState(
    () => Number(localStorage.getItem("capacidadeTanque")) || 58
  );
  const [consumoMedio, setConsumoMedio] = useState(
    () => Number(localStorage.getItem("consumoMedio")) || 8
  );

  const [quilometragemInicial, setQuilometragemInicial] = useState(
    () => Number(localStorage.getItem("quilometragemInicial")) || null
  );
  const [quilometragemAtual, setQuilometragemAtual] = useState(null);
  const [litrosAbastecidos, setLitrosAbastecidos] = useState(0);
  const [historico, setHistorico] = useState(
    () => JSON.parse(localStorage.getItem("historico")) || []
  );

  const [kmTrocaOleo, setKmTrocaOleo] = useState(
    () => Number(localStorage.getItem("kmTrocaOleo")) || null
  );
  const [dataTrocaOleo, setDataTrocaOleo] = useState(
    () => localStorage.getItem("dataTrocaOleo") || ""
  );
  const [validadeKm, setValidadeKm] = useState(
    () => Number(localStorage.getItem("validadeKm")) || 5000
  );
  const [validadeMeses, setValidadeMeses] = useState(
    () => Number(localStorage.getItem("validadeMeses")) || 6
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100%",
        mx: "auto",
        bgcolor: "background.default",
      }}
    >

      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, py: 1 }}>
        <IconButton
          onClick={toggleDarkMode}
          aria-label="brightness"
          sx={{
            color: theme.palette.text.primary,
            borderRadius: 0.5,
            border: "1px solid",
            borderColor: theme.palette.divider,
            p: 1.2,
            width: 30,
            height: 30,
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        centered
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Combustível" />
        <Tab label="Óleo" />
      </Tabs>

      {tabIndex === 0 && (
        <ControleCombustivel
          darkMode={darkMode}
          capacidadeTanque={capacidadeTanque}
          setCapacidadeTanque={setCapacidadeTanque}
          consumoMedio={consumoMedio}
          setConsumoMedio={setConsumoMedio}
          quilometragemAtual={quilometragemAtual}
          setQuilometragemAtual={setQuilometragemAtual}
          litrosAbastecidos={litrosAbastecidos}
          setLitrosAbastecidos={setLitrosAbastecidos}
          historico={historico}
          setHistorico={setHistorico}
          quilometragemInicial={quilometragemInicial}
          setQuilometragemInicial={setQuilometragemInicial}
        />
      )}

      {tabIndex === 1 && (
        <ControleOleo
          quilometragemAtual={quilometragemAtual}
          kmTrocaOleo={kmTrocaOleo}
          setKmTrocaOleo={setKmTrocaOleo}
          dataTrocaOleo={dataTrocaOleo}
          setDataTrocaOleo={setDataTrocaOleo}
          validadeKm={validadeKm}
          setValidadeKm={setValidadeKm}
          validadeMeses={validadeMeses}
          setValidadeMeses={setValidadeMeses}
        />
      )}
    </Box>
  );
}