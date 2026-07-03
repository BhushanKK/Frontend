import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

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
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}