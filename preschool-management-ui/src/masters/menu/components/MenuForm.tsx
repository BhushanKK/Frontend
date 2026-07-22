import {
    Autocomplete,
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
import type {
    ParentMenu,
    MenuFormValues,
    Role,
} from "../types/menu";
import { menuIcons } from "../utils/menuIcons";

const languages = [
    { code: "en", name: "English" },
    { code: "mr", name: "मराठी" },
    { code: "hi", name: "हिंदी" },
];

interface MenuFormProps {
    parentMenus: ParentMenu[];
    roles: Role[];
}

export default function MenuForm({
    parentMenus,
    roles,
}: MenuFormProps) {

    const { control } = useFormContext<MenuFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "translations",
    });

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>

            {/* Parent Menu */}

            <Grid size={12}>
                <Controller
                    name="parentMenuId"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Autocomplete
                            options={parentMenus}
                            value={
                                parentMenus.find(
                                    x => x.menuId === field.value
                                ) ?? null
                            }
                            onChange={(_, value) =>
                                field.onChange(value?.menuId ?? null)
                            }
                            getOptionLabel={(option) => option.menuName}
                            isOptionEqualToValue={(option, value) =>
                                option.menuId === value.menuId
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t("masters:parentMenu")}
                                    size="small"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    )}
                />
            </Grid>

            {/* Menu Name */}

            <Grid size={12}>
                <Controller
                    name="menuName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label={t("masters:menu")}
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            {/* Roles */}

            <Grid size={12}>
                <Controller
                    name="roles"
                    control={control}
                    defaultValue={[]}
                    render={({ field, fieldState }) => (
                        <Autocomplete
                            multiple
                            options={roles}
                            value={field.value ?? []}
                            onChange={(_, value) =>
                                field.onChange(value)
                            }
                            getOptionLabel={(option) => option.roleName}
                            isOptionEqualToValue={(option, value) =>
                                option.roleId === value.roleId
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t("masters:allowedRoles")}
                                    placeholder={t("masters:selectRoles")}
                                    size="small"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    )}
                />
            </Grid>

            {/* Menu URL */}

            <Grid size={12}>
                <Controller
                    name="menuUrl"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label={t("masters:menuUrl")}
                            fullWidth
                            size="small"
                            placeholder="/masters/menu"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            {/* Icon */}

            <Grid size={6}>
                <Controller
                    name="icon"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Autocomplete
                            options={menuIcons}
                            value={field.value || null}
                            onChange={(_, value) =>
                                field.onChange(value ?? "")
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t("masters:icon")}
                                    size="small"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    )}
                />
            </Grid>

            {/* Display Order */}

            <Grid size={6}>
                <Controller
                    name="displayOrder"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            type="number"
                            label={t("masters:displayOrder")}
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            {/* Translation Section */}

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
                sx={{spacing:2, alignItems:"center"}}
            >
                {/* Language */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name={`translations.${index}.languageCode`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label={t("common:language")}
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
                <Grid size={{ xs: 12, md: 7 }}>
                    <Controller
                        name={`translations.${index}.menuName`}
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
                <Grid
                    size={{ xs: 12, md: 1 }}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <IconButton
                        color="error"
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
                menuName: "",
            })
        }
    >
        {t("AddTranslation")}
    </Button>
</Grid>

            {/* Public */}

            <Grid size={6}>
                <Controller
                    name="isPublic"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label={
                                field.value
                                    ? t("masters:public")
                                    : t("masters:private")
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

            {/* Active */}

            <Grid size={6}>
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