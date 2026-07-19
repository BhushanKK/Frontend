import {
    Grid,
    TextField,
    Switch,
    FormControlLabel,
    Typography,
    IconButton,
    Button,
    MenuItem,
    Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { RoleFormValues } from "../types/role";

const languages = [
    { code: "en", name: "English" },
    { code: "mr", name: "मराठी" },
    { code: "hi", name: "हिंदी" }
];

export default function RoleForm() {
    const { control } = useFormContext<RoleFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "translations",
    });

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Role Name */}
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

            {/* Translation Section */}
            <Grid size={12}>
                <Typography
                    variant="subtitle1"
                    sx={{ mb: 1, fontWeight: 600 }}
                >
                    Translations
                </Typography>

                {fields.map((item, index) => (
                    <Paper
                        key={item.id}
                        variant="outlined"
                        sx={{
                            p: 2,
                            mb: 2,
                        }}
                    >
                        <Grid container spacing={2} sx={{ alignItems: "center" }}>
                            <Grid size={{ xs: 4 }}>
                                <Controller
                                    name={`translations.${index}.languageCode`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Language"
                                            fullWidth
                                            size="small"
                                        >
                                            {languages.map((lang) => (
                                                <MenuItem
                                                    key={lang.code}
                                                    value={lang.code}
                                                >
                                                    {lang.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 7 }}>
                                <Controller
                                    name={`translations.${index}.roleName`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Translated Role Name"
                                            fullWidth
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 1 }}>
                                <IconButton
                                    color="error"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() =>
                        append({
                            languageCode: "",
                            roleName: "",
                        })
                    }
                >
                    Add Translation
                </Button>
            </Grid>

            {/* Active / Inactive */}
            <Grid size={12}>
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label={field.value ? "Active" : "Inactive"}
                            control={
                                <Switch
                                    checked={field.value}
                                    onChange={(e) =>
                                        field.onChange(e.target.checked)
                                    }
                                />
                            }
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}