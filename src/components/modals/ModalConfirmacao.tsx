import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from "@mui/material";

interface ModalConfirmacaoProps {
  aberto: boolean;
  titulo?: string;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
  aberto,
  titulo = "Confirmar Ação",
  mensagem,
  onConfirmar,
  onCancelar
}) => {
  return (
    <Dialog
      open={aberto}
      onClose={onCancelar}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: { borderRadius: 3, p: 1 }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
        {titulo}
      </DialogTitle>

      <DialogContent>
        <Typography align="center">{mensagem}</Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
        <Button
          onClick={onCancelar}
          variant="outlined"
          color="inherit"
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirmar}
          variant="contained"
          color="error"
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmacao;