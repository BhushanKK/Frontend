import { Grid, TextField, Switch, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { RoleFormValues } from "../types/role";

export default function RoleForm() {
    const { control } = useFormContext<RoleFormValues>();

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
                <Controller
                    name="roleName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Role Name"
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
                                    checked={!!field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked": {
                                            color: "success.main",
                                        },
                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                            backgroundColor: "success.main",
                                        },
                                        "& .MuiSwitch-track": {
                                            backgroundColor: field.value
                                                ? "success.main"
                                                : "error.main",
                                            opacity: 1,
                                        },
                                    }}
                                />
                            }
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}