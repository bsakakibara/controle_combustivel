import { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, Button, TextField,
  Table, TableHead, TableRow, TableCell, TableBody,
  Grid
} from "@mui/material";
import {
  RadialBarChart, RadialBar, Legend, ResponsiveContainer
} from "recharts";

export default function ControleCombustivel() {
  // Configurações iniciais (se não existir no localStorage)
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

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("capacidadeTanque", capacidadeTanque);
    localStorage.setItem("consumoMedio", consumoMedio);
    localStorage.setItem("quilometragemInicial", quilometragemInicial ?? "");
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [capacidadeTanque, consumoMedio, quilometragemInicial, historico]);

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

  // Cálculo do tanque atual
  let litrosRestantes = 0;
  let autonomiaRestante = 0;

  if (quilometragemInicial !== null && quilometragemAtual !== null && historico.length > 0) {
    const kmRodados = quilometragemAtual - quilometragemInicial;
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
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "900px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        ⛽ Controle de Combustível
      </Typography>

      <Grid container spacing={2}>
        {/* Configurações */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">⚙️ Configurações</Typography>
              <TextField
                label="Capacidade do Tanque (L)"
                type="number"
                value={capacidadeTanque}
                onChange={(e) => setCapacidadeTanque(Number(e.target.value))}
                fullWidth sx={{ my: 1 }}
              />
              <TextField
                label="Consumo Médio (km/L)"
                type="number"
                value={consumoMedio}
                onChange={(e) => setConsumoMedio(Number(e.target.value))}
                fullWidth sx={{ my: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Registrar */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">📝 Registrar Abastecimento</Typography>
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
                onClick={handleAbastecer}
                fullWidth
                disabled={!quilometragemAtual || !litrosAbastecidos}
              >
                Registrar
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Nível do tanque */}
      {quilometragemInicial !== null && (
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>📊 Nível do Tanque</Typography>
            <Box sx={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={data}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    minAngle={15}
                    background
                    clockWise
                    dataKey="value"
                  />
                  <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={{ right: 0 }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="h6">
              Restante: {litrosRestantes.toFixed(1)} L
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Autonomia: {autonomiaRestante.toFixed(0)} km
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Histórico */}
      {historico.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>📜 Histórico de Abastecimentos</Typography>
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
