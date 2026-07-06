import { Grid, TextField, Switch, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { AcademicYearFormValues } from "../types/academicYear";

export default function AcademicYearForm() {
  const { control } = useFormContext<AcademicYearFormValues>();

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid size={12}>
        <Controller
          name="academicYearName"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Academic Year"
              fullWidth
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          name="fromDate"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="date"
              label="From Date"
              fullWidth
              size="small"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          name="toDate"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="date"
              label="To Date"
              fullWidth
              size="small"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label={field.value ? "Active" : "Inactive"}
              control={
                <Switch
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "success.main",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "success.main",
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: field.value ? "success.main" : "error.main",
                      opacity: 1,
                    },
                  }}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Grid>
    </Grid>
  );
}