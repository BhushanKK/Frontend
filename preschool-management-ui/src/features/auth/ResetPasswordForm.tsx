import {
    Alert,
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useResetPassword } from "../../hooks/useResetPassword";

export default function ResetPasswordForm() {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        loading,
        successMessage,
        errorMessage,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
    } = useResetPassword();

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{
                        width: 240,
                        mb: 2,
                    }}
                />

                <Typography sx={{variant:"h5", fontWeight:700}}>
                    Reset Password
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    Enter your new password.
                </Typography>
            </Box>

            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <Stack spacing={2.5}>

                <TextField
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    {...register("newPassword")}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    {...register("confirmPassword")}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{
                        height: 48,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                    }}
                >
                    {loading ? (
                        <CircularProgress size={22} color="inherit" />
                    ) : (
                        "Reset Password"
                    )}
                </Button>

                <Button
                    component={RouterLink}
                    to="/login"
                    variant="text"
                >
                    Back to Login
                </Button>

            </Stack>
        </Box>
    );
}