import { Controller, useFormContext } from "react-hook-form";
import type { CategoryFormValues } from "../types/category";
import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";

export default function CategoryForm() {

    const { control } = useFormContext<CategoryFormValues>();

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
                <Controller
                    name="categoryName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Category"
                            fullWidth
                            size="small"
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