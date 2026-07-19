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
import type { AcademicYearFormValues } from "../../academic-year/types/academicYear";

const languages = [
    { code: "en", name: "English" },
    { code: "mr", name: "मराठी" },
    { code: "hi", name: "हिंदी" }
];

export default function AcademicYearForm() {
    const { control } =
        useFormContext<AcademicYearFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "translations",
    });

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>

            {/* Academic Year Name */}
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

            {/* Dates */}
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
                                inputLabel: {
                                    shrink: true
                                }
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
                                inputLabel: {
                                    shrink: true
                                }
                            }}
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
                    sx={{
                        mb: 1,
                        fontWeight: 600
                    }}
                >
                    Translations
                </Typography>
                {
                    fields.map((item, index) => (

                        <Paper
                            key={item.id}
                            variant="outlined"
                            sx={{
                                p: 2,
                                mb: 2
                            }}
                        >
                            <Grid sx={{ spacing: 2, alignItems: "center" }}
                                container
                                spacing={2}
                            >
                                {/* Language */}
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
                                                {
                                                    languages.map(lang => (
                                                        <MenuItem
                                                            key={lang.code}
                                                            value={lang.code}
                                                        >
                                                            {lang.name}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                        )}
                                    />
                                </Grid>

                                {/* Translation Name */}
                                <Grid size={{ xs: 7 }}>
                                    <Controller
                                        name={`translations.${index}.academicYearName`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Translated Academic Year"
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
                                        disabled={fields.length === 1}
                                        onClick={() => remove(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                }

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => append({
                        languageCode: "",
                        academicYearName: ""
                    })}
                >
                    Add Translation
                </Button>
            </Grid>

            {/* Active Switch */}
            <Grid size={12}>
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label={
                                field.value
                                    ? "Active"
                                    : "Inactive"
                            }
                            control={
                                <Switch
                                    checked={field.value ?? false}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.checked
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