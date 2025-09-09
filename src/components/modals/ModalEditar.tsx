import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    TextField,
    Button,
    Box,
    IconButton
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

interface ModalEditarProps {
    aberto: boolean;
    item: any;
    onFechar: () => void;
    onSalvar: (itemEditado: any) => void;
    setItemEditando: (item: any) => void;
    onExcluir: (index: number) => void;
}

const ModalEditar: React.FC<ModalEditarProps> = ({
    aberto,
    item,
    onFechar,
    onSalvar,
    setItemEditando,
    onExcluir
}) => {
    if (!item) return null;

    return (
        <Dialog
            open={aberto}
            onClose={onFechar}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: { borderRadius: 3, p: 1 }
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
                >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EditNoteIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Modo Edição
                    </Typography>
                </Box>
                <IconButton
                    color="error"
                    onClick={() => onExcluir(item.index)}
                >
                    <DeleteIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Data"
                    type="date"
                    value={item.data}
                    onChange={(e) => setItemEditando({ ...item, data: e.target.value })}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Km"
                    type="number"
                    value={item.km}
                    onChange={(e) => setItemEditando({ ...item, km: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Litros"
                    type="number"
                    value={item.litros}
                    onChange={(e) => setItemEditando({ ...item, litros: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Nível Antes"
                    type="number"
                    value={item.nivelAntes}
                    onChange={(e) => setItemEditando({ ...item, nivelAntes: e.target.value })}
                    fullWidth
                />
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onFechar} variant="outlined" color="inherit">
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSalvar(item)}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalEditar;