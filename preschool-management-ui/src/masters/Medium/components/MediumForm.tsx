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
import type { MediumFormValues } from "../types/medium";
import { t } from "i18next";

const languages = [
    { code: "en", name: "English" },
    { code: "mr", name: "मराठी" },
    { code: "hi", name: "हिंदी" },
];

export default function MediumForm() {
    const { control } =
        useFormContext<MediumFormValues>();

    const { fields, append, remove } =
        useFieldArray({
            control,
            name: "translations",
        });

    return (
        <Grid
            container
            spacing={2}
            sx={{ mt: 1 }}
        >
            {/* Medium Name */}
            <Grid size={12}>
                <Controller
                    name="mediumName"
                    control={control}
                    render={({
                        field,
                        fieldState,
                    }) => (
                        <TextField
                            {...field}
                            label={t("masters:medium")}
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={
                                fieldState.error?.message
                            }
                        />
                    )}
                />
            </Grid>

            {/* Translation Section */}
            <Grid size={12}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 1,
                        fontWeight: 600,
                    }}
                >
                    {t("Translation")}
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
                        <Grid
                            container
                            sx={{
                                spacing: 2,
                                alignItems: "center",
                            }}
                        >
                            {/* Language */}
                            <Grid size={{ xs: 4 }}>
                                <Controller
                                    name={`translations.${index}.languageCode`}
                                    control={control}
                                    render={({
                                        field,
                                    }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label={t("Language")}
                                            fullWidth
                                            size="small"
                                        >
                                            {languages.map(
                                                (
                                                    lang
                                                ) => (
                                                    <MenuItem
                                                        key={
                                                            lang.code
                                                        }
                                                        value={
                                                            lang.code
                                                        }
                                                    >
                                                        {
                                                            lang.name
                                                        }
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField>
                                    )}
                                />
                            </Grid>

                            {/* Medium Translation */}
                            <Grid size={{ xs: 7 }}>
                                <Controller
                                    name={`translations.${index}.mediumName`}
                                    control={control}
                                    render={({
                                        field,
                                    }) => (
                                        <TextField
                                            {...field}
                                            label={t(
                                                "Translation"
                                            )}
                                            fullWidth
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Delete */}
                            <Grid size={{ xs: 1 }}>
                                <IconButton
                                    color="error"
                                    disabled={
                                        fields.length ===
                                        1
                                    }
                                    onClick={() =>
                                        remove(index)
                                    }
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
                            mediumName: "",
                        })
                    }
                >
                    {t("Translation")}
                </Button>
            </Grid>

            {/* Active / Inactive */}
            <Grid size={12}>
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label={
                                field.value
                                    ? t("active")
                                    : t("inactive")
                            }
                            control={
                                <Switch
                                    sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked":
                                            {
                                                color:
                                                    "success.main",
                                            },
                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                            {
                                                backgroundColor:
                                                    "success.main",
                                            },
                                        "& .MuiSwitch-track":
                                            {
                                                backgroundColor:
                                                    field.value
                                                        ? "success.main"
                                                        : "error.main",
                                                opacity: 1,
                                            },
                                    }}
                                    checked={
                                        field.value ??
                                        false
                                    }
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target
                                                .checked
                                        )
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