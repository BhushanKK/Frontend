import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useFormContext } from "react-hook-form";
import type { CommitteeMasterFormValues } from "../types/committee";

interface CommitteeFormProps {
    existingLogo?: string | null;
}

const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

const getLogoUrl = (path?: string | null) => {
    if (!path) return null;

    if (
        path.startsWith("http://") ||
        path.startsWith("https://") ||
        path.startsWith("blob:") ||
        path.startsWith("data:")
    ) {
        return path;
    }

    return `${FILE_BASE_URL}/${path.replace(/^\/+/, "")}`;
};

export default function CommitteeForm({ existingLogo }: CommitteeFormProps) {
    const { control, watch } = useFormContext<CommitteeMasterFormValues>();
    const logo = watch("logo");

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);

    useEffect(() => {
        if (logo instanceof File) {
            const objectUrl = URL.createObjectURL(logo);
            setPreviewUrl(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

        setPreviewUrl(getLogoUrl(existingLogo));
    }, [logo, existingLogo]);

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
                <Controller
                    name="committeeName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Committee Name"
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={12}>
                <Controller
                    name="slogan"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Slogan"
                            fullWidth
                            size="small"
                            multiline
                            rows={2}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={12}>
                <Controller
                    name="logo"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <Button variant="outlined" component="label">
                                Upload Logo
                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        field.onChange(e.target.files?.[0] ?? null);
                                    }}
                                />
                            </Button>

                            {fieldState.error && (
                                <Typography
                                    variant="caption"
                                    color="error"
                                    sx={{ display: "block", mt: 1 }}
                                >
                                    {fieldState.error.message}
                                </Typography>
                            )}
                        </>
                    )}
                />
            </Grid>

            <Grid size={12}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Logo Preview
                </Typography>

                {previewUrl ? (
                    <Box
                        component="img"
                        src={previewUrl}
                        alt="Committee Logo"
                        onClick={() => setIsLogoDialogOpen(true)}
                        sx={{
                            width: 120,
                            height: 120,
                            objectFit: "contain",
                            border: "1px solid #ddd",
                            borderRadius: 1,
                            p: 1,
                            bgcolor: "#fff",
                            cursor: "pointer",
                        }}
                    />
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No Logo
                    </Typography>
                )}
            </Grid>

            <Grid size={12}>
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label={field.value ? "Active" : "Inactive"}
                            control={
                                <Switch
                                    checked={!!field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
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
                                />
                            }
                        />
                    )}
                />
            </Grid>
            <Dialog
                open={isLogoDialogOpen}
                onClose={() => setIsLogoDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogContent
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 3,
                        bgcolor: "#f8f8f8",
                    }}
                >
                    <IconButton
                        onClick={() => setIsLogoDialogOpen(false)}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "#fff",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {previewUrl && (
                        <Box
                            component="img"
                            src={previewUrl}
                            alt="Committee Logo Preview"
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "75vh",
                                objectFit: "contain",
                                bgcolor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: 1,
                                p: 1,
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Grid>
    );
}