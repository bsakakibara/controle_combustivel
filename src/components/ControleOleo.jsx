import { useState, useEffect } from "react";
import {
    Box, Card, CardContent, Typography, TextField,
    Grid, Alert
} from "@mui/material";

export default function ControleOleo({
    quilometragemAtual, // recebe como prop
    kmTrocaOleo,
    setKmTrocaOleo,
    dataTrocaOleo,
    setDataTrocaOleo,
    validadeKm,
    setValidadeKm,
    validadeMeses,
    setValidadeMeses
}) {
    // Atualizar localStorage sempre que houver alterações
    useEffect(() => {
        localStorage.setItem("kmTrocaOleo", kmTrocaOleo ?? "");
        localStorage.setItem("dataTrocaOleo", dataTrocaOleo);
        localStorage.setItem("validadeKm", validadeKm.toString());
        localStorage.setItem("validadeMeses", validadeMeses.toString());
    }, [kmTrocaOleo, dataTrocaOleo, validadeKm, validadeMeses]);

    // Cálculo troca de óleo
    let statusOleo = "ok";
    let msgOleo = "";

    if (kmTrocaOleo && quilometragemAtual) {
        const kmPassados = quilometragemAtual - kmTrocaOleo;
        if (kmPassados >= validadeKm) {
            statusOleo = "vencido";
            msgOleo = `Troca de óleo vencida! (${kmPassados} Km desde a última)`;
        } else if (kmPassados >= validadeKm * 0.8) {
            statusOleo = "alerta";
            msgOleo = `Troca de óleo próxima (${kmPassados} km rodados)`;
        }
    }

    if (dataTrocaOleo) {
        const dt = new Date(dataTrocaOleo);
        const hoje = new Date();
        const mesesPassados = (hoje.getFullYear() - dt.getFullYear()) * 12 + (hoje.getMonth() - dt.getMonth());
        if (mesesPassados >= validadeMeses) {
            statusOleo = "vencido";
            msgOleo = `Troca de óleo vencida por tempo! (${mesesPassados} meses)`;
        } else if (mesesPassados >= validadeMeses * 0.8) {
            statusOleo = "alerta";
            msgOleo = `Troca de óleo próxima por tempo (${mesesPassados} meses)`;
        }
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "900px", mx: "auto" }}>
            <Typography variant="h4" gutterBottom align="center">
                Controle de Óleo
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: "center", p: 2, bgcolor: "#F9FAFB", boxShadow: 3 }}>
                        <Typography variant="h6">🛢️ Óleo</Typography>
                        <Typography
                            variant="h5"
                            color={
                                statusOleo === "ok" ? "green" :
                                statusOleo === "alerta" ? "orange" : "red"
                            }
                        >
                            {statusOleo === "ok" ? "✅ Em dia" :
                             statusOleo === "alerta" ? "⚠️ Atenção" : "❌ Vencido"}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">🛢️ Controle de Óleo</Typography>
                        <TextField
                            label="Km da última troca"
                            type="number"
                            value={kmTrocaOleo ?? ""}
                            onChange={(e) => setKmTrocaOleo(Number(e.target.value))}
                            fullWidth sx={{ my: 1 }}
                        />
                        <TextField
                            label="Data da última troca"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={dataTrocaOleo}
                            onChange={(e) => setDataTrocaOleo(e.target.value)}
                            fullWidth sx={{ my: 1 }}
                        />
                        <TextField
                            label="Validade (Km)"
                            type="number"
                            value={validadeKm}
                            onChange={(e) => setValidadeKm(Number(e.target.value))}
                            fullWidth sx={{ my: 1 }}
                        />
                        <TextField
                            label="Validade (Meses)"
                            type="number"
                            value={validadeMeses}
                            onChange={(e) => setValidadeMeses(Number(e.target.value))}
                            fullWidth sx={{ my: 1 }}
                        />

                        {msgOleo && (
                            <Alert severity={statusOleo === "vencido" ? "error" : "warning"} sx={{ mt: 2 }}>
                                {msgOleo}
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    );
}
