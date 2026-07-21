import {
    Button,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
    Controller,
    useFieldArray,
    useFormContext,
} from "react-hook-form";

import { t } from "i18next";

import type { HolidayFormValues } from "../types/Holiday";
import { useLanguageStore } from "../../../store/languageStore";
import { getHolidayTypes } from "../../../lookup/holidayTypes";

const languages = [
    { code: "en", name: "English" },
    { code: "mr", name: "मराठी" },
    { code: "hi", name: "हिंदी" },
];

export default function HolidayForm() {
    const { control } =
        useFormContext<HolidayFormValues>();

    const language = useLanguageStore(
        (state) => state.language
    );

    const holidayTypes =
        getHolidayTypes(language);

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
            {/* Holiday Name */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="holidayName"
                    control={control}
                    render={({
                        field,
                        fieldState,
                    }) => (
                        <TextField
                            {...field}
                            label={t("masters:holiday")}
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

            {/* Holiday Type */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="holidayType"
                    control={control}
                    render={({
                        field,
                        fieldState,
                    }) => (
                        <TextField
                            {...field}
                            select
                            fullWidth
                            size="small"
                            label={t(
                                "masters:holidayType"
                            )}
                            error={!!fieldState.error}
                            helperText={
                                fieldState.error?.message
                            }
                        >
                            {holidayTypes.map(
                                (item) => (
                                    <MenuItem
                                        key={
                                            item.id
                                        }
                                        value={
                                            item.id
                                        }
                                    >
                                        {
                                            item.name
                                        }
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    )}
                />
            </Grid>

            {/* Holiday Date */}
            {/* Holiday From Date */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="holidayFromDate"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label={t("masters:holidayFromDate")}
                            type="date"
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    )}
                />
            </Grid>

            {/* Holiday To Date */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="holidayToDate"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label={t("masters:holidayToDate")}
                            type="date"
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    )}
                />
            </Grid>
                    {/* Description */}
            <Grid size={{ xs: 12 }}>
                <Controller
                    name="description"
                    control={control}
                    render={({
                        field,
                    }) => (
                        <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label={t(
                                "masters:description"
                            )}
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
                    {t("Translation")}
                </Typography>

                {fields.map(
                    (item, index) => (
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
                                sx={{ spacing: 2, alignItems: "center" }}
                            >
                                <Grid
                                    size={{
                                        xs: 4,
                                    }}
                                >
                                    <Controller
                                        name={`translations.${index}.languageCode`}
                                        control={
                                            control
                                        }
                                        render={({
                                            field,
                                        }) => (
                                            <TextField
                                                {...field}
                                                select
                                                label={t(
                                                    "Language"
                                                )}
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

                                <Grid
                                    size={{
                                        xs: 7,
                                    }}
                                >
                                    <Controller
                                        name={`translations.${index}.holidayName`}
                                        control={
                                            control
                                        }
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

                                <Grid
                                    size={{
                                        xs: 1,
                                    }}
                                >
                                    <IconButton
                                        color="error"
                                        disabled={
                                            fields.length ===
                                            1
                                        }
                                        onClick={() =>
                                            remove(
                                                index
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                )}

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() =>
                        append({
                            languageCode: "",
                            holidayName: "",
                        })
                    }
                >
                    {t("Translation")}
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
                                    ? t("active")
                                    : t(
                                        "inactive"
                                    )
                            }
                            control={
                                <Switch
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