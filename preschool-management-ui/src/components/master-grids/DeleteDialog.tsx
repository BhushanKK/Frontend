import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { t } from "i18next";

interface DeleteDialogProps {
  open: boolean;

  title?: string;

  description?: string;

  loading?: boolean;

  onClose: () => void;

  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  title = "Delete Record",
  description = "Are you sure you want to delete this record? This action cannot be undone.",
  loading = false,
  onClose,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        <Typography sx={{fontWeight:600}} >
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
        >
          {t("cancel")}
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? t("deleting") : t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}