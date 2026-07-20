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
import {
    Controller,
    useFieldArray,
    useFormContext,
} from "react-hook-form";
import type { FinancialYearFormValues } from "../types/financialYear";
import { t } from "i18next";

const languages = [
    { code: "en", name: "English" },
    { code: "mr", name: "मराठी" },
    { code: "hi", name: "हिंदी" },
];

export default function FinancialYearForm() {
    const { control } =
        useFormContext<FinancialYearFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "translations",
    });

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Financial Year */}
            <Grid size={12}>
                <Controller
                    name="financialYearName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Financial Year"
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            {/* From Date */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="fromDate"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            type="date"
                            label={t("masters:fromDate")}
                            fullWidth
                            size="small"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            {/* To Date */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="toDate"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            type="date"
                            label={t("masters:toDate")}
                            fullWidth
                            size="small"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
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
                        fontWeight: 600,
                    }}
                >
                    {t("common:Translation")}
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
                           sx={{spacing:2,alignItems:"center"
                            }}
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

                            {/* Translation */}
                            <Grid size={{ xs: 7 }}>
                                <Controller
                                    name={`translations.${index}.financialYearName`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t("common:Translation")}
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
                ))}

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() =>
                        append({
                            languageCode: "",
                            financialYearName: "",
                        })
                    }
                >
                    {t("common:AddTranslation")}
                </Button>
            </Grid>

            {/* Active */}
            <Grid size={12}>
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label={
                                field.value
                                    ? t("common:active")
                                    : t("common:inactive")
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
                                    onChange={(
                                        e
                                    ) =>
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