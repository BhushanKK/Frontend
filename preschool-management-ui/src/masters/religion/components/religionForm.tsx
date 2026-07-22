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
import type { ReligionFormValues, } from "../types/religion";
import { t } from "i18next";
import { languages } from "../../../utils/languages";

export default function ReligionForm() {
    const {
        control,
    } = useFormContext<ReligionFormValues>();

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "translations",
    });

    return (
        <Grid
            container
            spacing={2}
            sx={{
                mt: 1,
            }}
        >
            {/* Religion Name */}
            <Grid size={12}>
                <Controller
                    name="religionName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Religion Name"
                            fullWidth
                            size="small"
                            error={ !!fieldState.error }
                            helperText={ fieldState.error?.message }
                        />
                    )}
                />
            </Grid>

            {/* Minority */}

            <Grid size={12}>
                <Controller
                    name="isMinority"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label={ field.value ? t("masters:isMinority") : t("masters:nonMinority") }
                            control={
                                <Switch
                                    checked={ field.value ?? false }
                                    onChange={(e) =>
                                        field.onChange(e.target.checked)
                                    }
                                />
                            }
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
                {t("common:Translation")}
                </Typography>
                {
                    fields.map(
                        (item, index) => (
                            <Paper
                                key={item.id}
                                variant="outlined"
                                sx={{ p:2,mb:2 }}
                            >
                                <Grid
                                    container
                                    sx={{spacing:2, alignItems:"center"}}
                                >
                                    {/* Language */}
                                    <Grid size={{xs:4}}>
                                        <Controller
                                            name={ `translations.${index}.languageCode` }
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    select
                                                    label="Language"
                                                    size="small"
                                                    fullWidth
                                                >
                                                    {
                                                        languages.map(
                                                            lang => (
                                                                <MenuItem
                                                                    key={ lang.code }
                                                                    value={ lang.code }
                                                                >
                                                                { lang.label }
                                                                </MenuItem>
                                                            )
                                                        )
                                                    }
                                                </TextField>
                                            )}
                                        />
                                    </Grid>

                                    {/* Translation Name */}
                                    <Grid size={{xs:7}}>
                                        <Controller
                                            name={ `translations.${index}.religionName` }
                                            control={control}
                                            render={({field}) => (
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
                                    <Grid size={{xs:1}}>
                                        <IconButton
                                            color="error"
                                            disabled={ fields.length === 1 }
                                            onClick={() =>
                                                remove(index)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    )
                }

                <Button
                    variant="outlined"
                    startIcon={ <AddIcon /> }
                    onClick={() =>
                        append({
                            languageCode:"",
                            religionName:"" 
                        })
                    }
                > {t("common:AddTranslation")}
                </Button>
            </Grid>

            {/* Active */}
            <Grid size={12}>
                <Controller
                    name="isActive"
                    control={control}
                    render={({field}) => (
                        <FormControlLabel
                            label={ field.value ? t("common:active") : t("common:inactive") }
                            control={
                                <Switch
                                    checked={ field.value ?? false }
                                    onChange={(e)=>
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