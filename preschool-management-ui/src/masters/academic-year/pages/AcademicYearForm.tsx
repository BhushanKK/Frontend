import { TextField, Stack } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface AcademicYearFormValues {
  academicYearName: string;
}

export default function AcademicYearForm() {
  const { control } = useFormContext<AcademicYearFormValues>();

  return (
    <Stack sx={{spacing:2,mt:1}}>
      <Controller
        name="academicYearName"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <TextField size="small"
            {...field}
            fullWidth
            label="Academic Year"
            placeholder="2026-2027"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </Stack>
  );
}