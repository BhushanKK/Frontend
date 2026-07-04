import { useState } from "react";

export type SnackbarSeverity =
  | "success"
  | "error"
  | "warning"
  | "info";

export function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] =
    useState<SnackbarSeverity>("success");

  const showSnackbar = (
    severity: SnackbarSeverity,
    message: string
  ) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return {
    snackbarOpen: open,
    snackbarMessage: message,
    snackbarSeverity: severity,
    showSnackbar,
    closeSnackbar,
  };
}