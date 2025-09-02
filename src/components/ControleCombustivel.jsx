import { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, Button, TextField,
  Table, TableHead, TableRow, TableCell, TableBody,
  Grid
} from "@mui/material";
import ReactSpeedometer from "react-d3-speedometer";
// Ícones MUI
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsIcon from "@mui/icons-material/Settings";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import HistoryIcon from "@mui/icons-material/History";
import { useTheme } from "@mui/material/styles";

export default function ControleCombustivel() {
  // Configurações iniciais (se não existir no localStorage)
  const theme = useTheme();
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

  // Atualizar localStorage sempre que houver alterações
  useEffect(() => {
    localStorage.setItem("capacidadeTanque", capacidadeTanque);
    localStorage.setItem("consumoMedio", consumoMedio);
    localStorage.setItem("quilometragemInicial", quilometragemInicial ?? "");
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [capacidadeTanque, consumoMedio, quilometragemInicial, historico]);

  // Carregar última quilometragem do histórico ao iniciar
  useEffect(() => {
    if (!quilometragemAtual && historico.length > 0) {
      setQuilometragemAtual(historico[historico.length - 1].km);
    }
  }, [historico]);

  const handleAbastecer = () => {
    if (!quilometragemAtual || !litrosAbastecidos) return;

    const novo = {
      data: new Date().toLocaleDateString(),
      km: quilometragemAtual,
      litros: litrosAbastecidos,
    };

    // Calcular consumo médio real
    if (historico.length > 0) {
      const ultimo = historico[historico.length - 1];
      const kmRodados = quilometragemAtual - ultimo.km;
      const consumoReal = kmRodados / litrosAbastecidos;
      setConsumoMedio(Number(((consumoMedio + consumoReal) / 2).toFixed(1)));
    }

    setHistorico([...historico, novo]);
    setQuilometragemInicial(quilometragemAtual);
    setLitrosAbastecidos(0);
  };

  // Cálculo do tanque de combustivel atual
  let litrosRestantes = 0;
  let autonomiaRestante = 0;

  if (quilometragemInicial !== null && historico.length > 0) {
    const kmAtual = quilometragemAtual ?? historico[historico.length - 1].km;
    const kmRodados = kmAtual - quilometragemInicial;
    const litrosConsumidos = kmRodados / consumoMedio;
    const litrosUltimoAbastecimento = historico[historico.length - 1].litros;
    litrosRestantes = Math.max(litrosUltimoAbastecimento - litrosConsumidos, 0);
    autonomiaRestante = litrosRestantes * consumoMedio;
  }

  const data = [
    {
      name: "Combustível",
      value: (litrosRestantes / capacidadeTanque) * 100,
      fill: litrosRestantes > 10 ? "#10B981" : "#EF4444",
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 0, md: 4 },
        width: "100%",
        maxWidth: "100%",
        mx: 0,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh"
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Controle de Combustível
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3, justifyContent: "center" }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ textAlign: "center", p: 2, bgcolor: theme.palette.background.paper, boxShadow: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
              <LocalGasStationIcon sx={{ fontSize: 28, color: theme.palette.text.primary }} />
              <Typography variant="h6" color={autonomiaRestante > 100 ? theme.palette.error.main : theme.palette.success.main}>Autonomia</Typography>
            </Box>
            <Typography variant="h5" color="primary">
              {autonomiaRestante.toFixed(0)} km
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ textAlign: "center", p: 2, bgcolor: theme.palette.background.paper, boxShadow: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
              <SpeedIcon sx={{ fontSize: 28, color: theme.palette.text.primary }} />
              <Typography variant="h6" color={autonomiaRestante > 100 ? theme.palette.error.main : theme.palette.success.main}>Consumo</Typography>
            </Box>
            <Typography variant="h5" color="primary">
              {consumoMedio.toFixed(1)} km/L
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <SettingsIcon sx={{ fontSize: 24, color: theme.palette.text.primary }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Configurações
                </Typography>
              </Box>
              <TextField
                label="Capacidade do Tanque (L)"
                type="number"
                value={capacidadeTanque}
                onChange={(e) => setCapacidadeTanque(Number(e.target.value))}
                fullWidth
                sx={{
                  my: 1,
                  '& .MuiInputBase-root': {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper,
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.text.secondary,
                  },
                }}
              />
              <TextField
                label="Consumo Médio (km/L)"
                type="number"
                value={consumoMedio}
                onChange={(e) => setConsumoMedio(Number(e.target.value))}
                fullWidth
                sx={{
                  my: 1,
                  '& .MuiInputBase-root': {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper,
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.text.secondary,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <EditNoteIcon sx={{ fontSize: 24, color: theme.palette.text.primary }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Registrar Abastecimento
                </Typography>
              </Box>

              <TextField
                label="Km Atual"
                type="number"
                value={quilometragemAtual ?? ""}
                onChange={(e) => setQuilometragemAtual(Number(e.target.value))}
                fullWidth sx={{ my: 1 }}
              />
              <TextField
                label="Litros Abastecidos"
                type="number"
                value={litrosAbastecidos || ""}
                onChange={(e) => setLitrosAbastecidos(Number(e.target.value))}
                fullWidth sx={{ my: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAbastecer}
                fullWidth
              >
                Registrar
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {quilometragemInicial !== null && (
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom><DonutLargeIcon /> Nível do Tanque</Typography>
            <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
              <ReactSpeedometer
                maxValue={capacidadeTanque}
                value={litrosRestantes}
                needleColor={theme.palette.mode === "dark" ? "#1E293B" : "#FFD700"} 
                startColor={theme.palette.error.main}
                endColor={theme.palette.success.main}
                textColor={theme.palette.text.primary}
                ringWidth={20}
                currentValueText="Restante: ${value} L"
                height={250}
                width={350}
              />
            </Box>
            <Typography
              variant="h5"
              color={
                autonomiaRestante > 100
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
            >
              Autonomia: {autonomiaRestante.toFixed(0)} km
            </Typography>
          </CardContent>
        </Card>
      )}

      {historico.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom><HistoryIcon /> Histórico de Abastecimentos</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Km</TableCell>
                  <TableCell>Litros</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historico.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.data}</TableCell>
                    <TableCell>{item.km}</TableCell>
                    <TableCell>{item.litros}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
