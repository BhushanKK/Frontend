import { Controller, useFormContext } from "react-hook-form";

import { Grid,  TextField } from "@mui/material";
import type { religionFormValues } from "../types/religion";

export default function religionForm() {

    const { control } = useFormContext<religionFormValues>();

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
                <Controller
                    name="religionName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="religion"
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>
            
        </Grid>
    );
}