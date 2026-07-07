import {
    Autocomplete,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type {
    ParentMenu,
    MenuFormValues,
} from "../types/menu";
import { menuIcons } from "../utils/menuIcons";

interface MenuFormProps {
    parentMenus: ParentMenu[];
}

export default function MenuForm({
    parentMenus,
}: MenuFormProps) {

    const { control } = useFormContext<MenuFormValues>();

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
                                    label="Parent Menu"
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
                            label="Menu Name"
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            {/* Menu Url */}

            <Grid size={12}>
                <Controller
                    name="menuUrl"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Menu Url"
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
                            onChange={(_, value) => field.onChange(value ?? "")}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Icon"
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
                            label="Display Order"
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            {/* Public */}

            <Grid size={6}>
                <Controller
                    name="isPublic"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label={field.value ? "Public" : "Private"}
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
                                            backgroundColor: field.value
                                                ? "success.main"
                                                : "error.main",
                                            opacity: 1,
                                        },
                                    }}
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

            {/* Status */}

            <Grid size={6}>
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
                                            backgroundColor: field.value
                                                ? "success.main"
                                                : "error.main",
                                            opacity: 1,
                                        },
                                    }}
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