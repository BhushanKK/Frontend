import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    LinearProgress,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    LockReset,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import { changePassword } from "../../api/authApi";
import type { ChangePasswordRequest } from "../../types/auth";
import { useAuthStore } from "../../store/authStore";
import { useTranslation } from "react-i18next";

const ChangePasswordPage = () => {
    const { t, i18n } = useTranslation("common");

    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const [loading, setLoading] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState<ChangePasswordRequest>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as
            | "success"
            | "error"
            | "warning"
            | "info",
    });

    const handleSnackbarClose = (
        _: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway")
            return;

        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    };

    const handleChange =
        (field: keyof ChangePasswordRequest) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {

                setForm((prev) => ({
                    ...prev,
                    [field]: event.target.value,
                }));
            };

    // -----------------------
    // Password Strength
    // -----------------------

    const getPasswordStrength = (password: string) => {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) {
            return {
                label: t("weak"),
                value: 25,
                color: "error" as const,
            };
        }

        if (score <= 4) {
            return {
                label: t("medium"),
                value: 60,
                color: "warning" as const,
            };
        }

        return {
            label: t("strong"),
            value: 100,
            color: "success" as const,
        };
    };

    const passwordStrength = getPasswordStrength(form.newPassword);

    // -----------------------
    // Validation
    // -----------------------

    const validate = () => {

        if (
            !form.currentPassword.trim() ||
            !form.newPassword.trim() ||
            !form.confirmPassword.trim()
        ) {

            setSnackbar({
                open: true,
                severity: "warning",
                message: t("pleaseFillAllFields")
            });
            return false;
        }

        if (form.newPassword.length < 8) {

            setSnackbar({
                open: true,
                severity: "warning",
                message: t("passwordMinimumEightChars")
            });
            return false;
        }

        if (form.newPassword !== form.confirmPassword) {

            setSnackbar({
                open: true,
                severity: "warning",
                message: t("passwordMismatch")
            });

            return false;
        }
        return true;
    };

    // -----------------------
    // Submit
    // -----------------------

    const handleSubmit = async () => {
        if (!validate())
            return;
        try {
            setLoading(true);
            const response = await changePassword(form);
            setSnackbar({
                open: true,
                severity: response.success
                    ? "success"
                    : "error",
                message: response.message,
            });

            if (response.success) {

                setForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });

                setTimeout(() => {

                    logout();

                    navigate("/login", {
                        replace: true,
                    });

                }, 2000);
            }

        }
        catch (error: any) {
            setSnackbar({
                open: true,
                severity: "error",
                message:
                    error?.response?.data?.message ??
                    t("unableToChangePassword")
            });
        }
        finally {

            setLoading(false);

        }
    };

    // ---------- PART 2 STARTS HERE ----------
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    p: 2,
                    justifyContent: "center",
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 1200,
                        borderRadius: 4,
                        boxShadow: "0 12px 32px rgba(0,0,0,.08)",
                    }}
                >
                    <CardContent
                        sx={{
                            p: 3,
                            "&:last-child": {
                                pb: 3,
                            },
                        }}
                    >

                        {/* Header */}

                        <Box sx={{ textAlign: "center", mb: 2 }}>
                            <Avatar
                                sx={{
                                    width: 56,
                                    height: 56,
                                    mx: "auto",
                                    bgcolor: "primary.main",
                                    mb: 2,
                                }}
                            >
                                <LockReset fontSize="large" />
                            </Avatar>

                            <Typography variant="h5" sx={{
                                fontWeight: 700
                            }}
                            >
                                {t("common:changePassword")}
                            </Typography>

                            <Typography variant="body2" sx={{
                                color: "text.secondary",
                                mt: 1
                            }}
                            >
                                {t("common:passwordSecureNote")}
                            </Typography>
                        </Box>

                        {/* Current Password */}

                        <Grid container spacing={2} sx={{ mt: 0.5 }}>

                            {/* Left Side */}

                            <Grid size={{ xs: 12, md: 7 }}>

                                <TextField
                                    fullWidth
                                    label={t("common:currentPassword")}
                                    size="small"
                                    margin="normal"
                                    type={showCurrent ? "text" : "password"}
                                    value={form.currentPassword}
                                    onChange={handleChange("currentPassword")}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowCurrent(!showCurrent)}
                                                    >
                                                        {showCurrent ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label={t("common:newPassword")}
                                    margin="normal"
                                    type={showNew ? "text" : "password"}
                                    value={form.newPassword}
                                    onChange={handleChange("newPassword")}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowNew(!showNew)}
                                                    >
                                                        {showNew ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />

                                <Box sx={{ mt: 2 }} >
                                    <Typography sx={{ variant: "body2", fontWeight: 600 }}>
                                        {t("passwordStrength")} : {passwordStrength.label}
                                    </Typography>

                                    <LinearProgress
                                        variant="determinate"
                                        value={passwordStrength.value}
                                        color={passwordStrength.color}
                                        sx={{
                                            mt: 1,
                                            height: 8,
                                            borderRadius: 5,
                                        }}
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    label={t("common:confirmPassword")}
                                    type={showConfirm ? "text" : "password"}
                                    value={form.confirmPassword}
                                    onChange={handleChange("confirmPassword")}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowConfirm(!showConfirm)}
                                                    >
                                                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Right Side */}

                            <Grid size={{ xs: 12, md: 5 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        border: "1px solid #E5E7EB",
                                        bgcolor: "#FAFAFA",
                                        height: "100%",
                                    }}
                                >
                                    <Typography variant="h6" sx={{
                                        fontWeight: 500,
                                        mb: 2
                                    }}
                                    >
                                        {t("common:passwordRequirements")}
                                    </Typography>

                                    <Stack spacing={1}>
                                        <Typography>✅ {t("common:minimumEightChars")}</Typography>
                                        <Typography>✅ {t("common:oneUpperCase")}</Typography>
                                        <Typography>✅ {t("common:oneLowerCase")}</Typography>
                                        <Typography>✅ {t("common:oneNumber")}</Typography>
                                        <Typography>✅ {t("common:oneSpecialChar")}</Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Buttons */}

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ mt: 4 }}
                        >
                            <Button
                                size="small"
                                variant="outlined"
                                color="inherit"
                                onClick={() => navigate(-1)}
                                sx={{
                                    flex: 1,
                                    height: 38,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                }}
                            >
                                {t("common:cancel")}
                            </Button>

                            <Button
                                size="small"
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading}
                                sx={{
                                    flex: 1,
                                    height: 38,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    boxShadow: 2,
                                }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        color="inherit"
                                    />
                                ) : (
                                    t("changePassword")
                                )}
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    sx={{
                        width: "100%",
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ChangePasswordPage;  