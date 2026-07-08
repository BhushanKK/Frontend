import {
    Controller,
    useFormContext,
} from "react-hook-form";
import type { CasteFormValues } from "../types/caste";
import {
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from "@mui/material";
import { useCategory } from "../../category/hooks/useCategory";

export default function CasteForm() {
    const { control } = useFormContext<CasteFormValues>();

    const { category, loading } = useCategory(true);

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
                            <InputLabel>Category</InputLabel>

                            <Select
                                {...field}
                                label="Category"
                                disabled={loading}
                            >
                                {category.map((item) => (
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

            {/* Caste */}
            <Grid size={12}>
                <Controller
                    name="caste"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Caste"
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            {/* Status */}
            <Grid size={12}>
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