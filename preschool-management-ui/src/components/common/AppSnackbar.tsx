import { Alert, Snackbar } from "@mui/material";
import type { SnackbarSeverity } from "./useSnackbar"; // adjust path

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  onClose: () => void;
}

export default function AppSnackbar({
  open,
  message,
  severity,
  onClose,
}: AppSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          color: "#fff",           // Text color
          "& .MuiAlert-icon": {
            color: "#fff",         // Icon color
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}