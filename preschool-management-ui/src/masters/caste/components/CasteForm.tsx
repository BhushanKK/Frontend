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
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
    Controller,
    useFieldArray,
    useFormContext,
} from "react-hook-form";

import type { CasteFormValues } from "../types/caste";
import { useCategory } from "../../category/hooks/useCategory";
import { languages } from "../../../utils/languages";
import { t } from "i18next";

export default function CasteForm() {
    const { control } = useFormContext<CasteFormValues>();

    const { categories, loading } = useCategory(true);

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "translations",
    });

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Category */}
            <Grid size={12}>
                <Controller
                    name="categoryId"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                        >
                            <InputLabel>
                                {t("masters:category")}
                            </InputLabel>

                            <Select
                                {...field}
                                label={t("masters:category")}
                                disabled={loading}
                            >
                                {categories.map((item) => (
                                    <MenuItem
                                        key={item.categoryId}
                                        value={item.categoryId}
                                    >
                                        {item.categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>

            {/* English Caste Name */}
            <Grid size={12}>
                <Controller
                    name="casteName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label={t("masters:caste")}
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
                            sx={{spacing:2,
                            alignItems:"center"}}
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
                                            label={t("Language")}
                                            fullWidth
                                            size="small"
                                        >
                                            {languages.map((lang) => (
                                                <MenuItem
                                                    key={lang.code}
                                                    value={lang.code}
                                                >
                                                    {lang.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>

                            {/* Translation */}
                            <Grid size={{ xs: 7 }}>
                                <Controller
                                    name={`translations.${index}.casteName`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t("Translation")}
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
                            casteName: "",
                        })
                    }
                >
                    {t("AddTranslation")}
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
                                    checked={field.value ?? false}
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