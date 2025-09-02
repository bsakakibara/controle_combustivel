import { useState, useEffect } from "react";
import {
    Box, Card, CardContent, Typography, TextField,
    Grid, Alert, useTheme
} from "@mui/material";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";

export default function ControleOleo({
    quilometragemAtual,
    kmTrocaOleo,
    setKmTrocaOleo,
    dataTrocaOleo,
    setDataTrocaOleo,
    validadeKm,
    setValidadeKm,
    validadeMeses,
    setValidadeMeses
}) {
    const theme = useTheme();

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
                return <CheckCircleIcon sx={{ color: theme.palette.mode === "light" ? "#10B981" : "#00FFAB", fontSize: 40 }} />;
            case "alerta":
                return <WarningAmberIcon sx={{ color: theme.palette.mode === "light" ? "#F59E0B" : "#FACC15", fontSize: 40 }} />;
            case "vencido":
                return <ErrorIcon sx={{ color: theme.palette.mode === "light" ? "#EF4444" : "#F87171", fontSize: 40 }} />;
            default:
                return null;
        }
    };

    const getStatusColor = () => {
        switch (statusOleo) {
            case "ok":
                return theme.palette.mode === "light" ? "#10B981" : "#00FFAB";
            case "alerta":
                return theme.palette.mode === "light" ? "#F59E0B" : "#FACC15";
            case "vencido":
                return theme.palette.mode === "light" ? "#EF4444" : "#F87171";
            default:
                return theme.palette.text.primary;
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
                            bgcolor: theme.palette.background.paper,
                            boxShadow: 3,
                            textAlign: "center",
                        }}
                    >
                        <OilBarrelIcon sx={{ fontSize: 50, color: theme.palette.text.primary, mb: 0 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.primary }}>
                            Controle de Óleo
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1.5,
                                p: 1,
                                bgcolor:
                                    statusOleo === "ok"
                                        ? theme.palette.mode === "light" ? "#ECFDF5" : "#00331F"
                                        : statusOleo === "alerta"
                                            ? theme.palette.mode === "light" ? "#FFFAEB" : "#332900"
                                            : theme.palette.mode === "light" ? "#FEF2F2" : "#330000",
                                borderRadius: 2,
                                border: `1px solid ${getStatusColor()}`,
                            }}
                        >
                            {getStatusIcon()}
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, color: getStatusColor() }}
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
                <Card sx={{ mb: 2, bgcolor: theme.palette.background.paper }}>
                    <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <OilBarrelIcon sx={{ fontSize: 24, color: theme.palette.text.primary }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                Controle de Óleo
                            </Typography>
                        </Box>
                        <TextField
                            label="Km da última troca"
                            type="number"
                            value={kmTrocaOleo ?? ""}
                            onChange={(e) => setKmTrocaOleo(Number(e.target.value))}
                            fullWidth
                            sx={{
                                my: 1,
                                '& .MuiInputBase-root': { color: theme.palette.text.primary },
                                '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                            }}
                        />
                        <TextField
                            label="Data da última troca"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={dataTrocaOleo}
                            onChange={(e) => setDataTrocaOleo(e.target.value)}
                            fullWidth
                            sx={{
                                my: 1,
                                '& .MuiInputBase-root': {
                                    color: theme.palette.text.primary,
                                },
                                '& .MuiInputLabel-root': {
                                    color: theme.palette.text.secondary,
                                },
                                // Força o ícone de calendário visível
                                '& input::-webkit-calendar-picker-indicator': {
                                    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                                    cursor: 'pointer',
                                },
                            }}
                        />
                        <TextField
                            label="Validade (Km)"
                            type="number"
                            value={validadeKm}
                            onChange={(e) => setValidadeKm(Number(e.target.value))}
                            fullWidth
                            sx={{
                                my: 1,
                                '& .MuiInputBase-root': { color: theme.palette.text.primary },
                                '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                            }}
                        />
                        <TextField
                            label="Validade (Meses)"
                            type="number"
                            value={validadeMeses}
                            onChange={(e) => setValidadeMeses(Number(e.target.value))}
                            fullWidth
                            sx={{
                                my: 1,
                                '& .MuiInputBase-root': { color: theme.palette.text.primary },
                                '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                            }}
                        />

                        {msgOleo && (
                            <Alert
                                severity={statusOleo === "vencido" ? "error" : "warning"}
                                sx={{
                                    mt: 2,
                                    bgcolor: theme.palette.mode === "light" ? undefined : "#1A1A1A",
                                    color: theme.palette.mode === "dark" ? "#FFFFFF" : undefined
                                }}
                            >
                                {msgOleo}
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    );
}