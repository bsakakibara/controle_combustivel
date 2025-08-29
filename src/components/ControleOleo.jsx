import { useState, useEffect } from "react";
import {
    Box, Card, CardContent, Typography, TextField,
    Grid, Alert
} from "@mui/material";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";

export default function ControleOleo({
    quilometragemAtual, // prop
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

    const getStatusIcon = () => {
        switch (statusOleo) {
            case "ok":
                return <CheckCircleIcon sx={{ color: "green", fontSize: 40 }} />;
            case "alerta":
                return <WarningAmberIcon sx={{ color: "orange", fontSize: 40 }} />;
            case "vencido":
                return <ErrorIcon sx={{ color: "red", fontSize: 40 }} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: { xs: 0, md: 4 }, width: "100%", maxWidth: "100%", mx: 0 }}>
            <Typography variant="h5" gutterBottom align="center">
                Controle de Óleo
            </Typography>

            <Grid container sx={{ mb: 3, justifyContent: "center" }}>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            minWidth: 350,
                            maxWidth: "100%",
                            p: 2,
                            bgcolor: "#F9FAFB",
                            boxShadow: 3,
                            textAlign: "center",
                        }}
                    >
                        {/* Ícone principal */}
                        <OilBarrelIcon sx={{ fontSize: 50, color: "#111827", mb: 0 }} />

                        {/* Título */}
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            Controle de Óleo
                        </Typography>

                        {/* Status com ícone ao lado */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1.5,
                                p: 1,
                                bgcolor:
                                    statusOleo === "ok"
                                        ? "#ECFDF5"
                                        : statusOleo === "alerta"
                                            ? "#FFFAEB"
                                            : "#FEF2F2",
                                borderRadius: 2,
                                border:
                                    statusOleo === "ok"
                                        ? "1px solid #10B981"
                                        : statusOleo === "alerta"
                                            ? "1px solid #F59E0B"
                                            : "1px solid #EF4444",
                            }}
                        >
                            {getStatusIcon()}
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600 }}
                                color={
                                    statusOleo === "ok"
                                        ? "green"
                                        : statusOleo === "alerta"
                                            ? "orange"
                                            : "red"
                                }
                            >
                                {statusOleo === "ok"
                                    ? "Em dia"
                                    : statusOleo === "alerta"
                                        ? "Atenção"
                                        : "Vencido"}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <OilBarrelIcon sx={{ fontSize: 24, color: "#111827" }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Controle de Óleo
                            </Typography>
                        </Box>
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
