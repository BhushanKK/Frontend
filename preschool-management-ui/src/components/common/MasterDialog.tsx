import { useEffect } from "react";
import type { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { FormProvider, useForm, type FieldValues, type DefaultValues } from "react-hook-form";
import { t } from "i18next";

interface MasterDialogProps<T extends FieldValues> {
  open: boolean;
  title: string;
  defaultValues: DefaultValues<T>;
  children: ReactNode;
  loading?: boolean;
  onClose: () => void;
  onSave: (values: T) => Promise<void> | void;
}

export default function MasterDialog<T extends FieldValues>({
  open,
  title,
  defaultValues,
  children,
  loading = false,
  onClose,
  onSave,
}: MasterDialogProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods]);

  const submit = methods.handleSubmit(async (values) => {
    await onSave(values);
  });

  return (
    <Dialog 
    
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <FormProvider {...methods}>
        <form onSubmit={submit}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              size="medium"
              variant="outlined"
              onClick={onClose}
              disabled={loading}
            >
              {t("cancel")}
            </Button>

            <Button
            size="medium"
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Saving..." : t("save")}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}