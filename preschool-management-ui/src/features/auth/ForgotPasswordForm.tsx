import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useForgotPassword } from "../../hooks/useForgotPassword";

export default function ForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        loading,
        successMessage,
        errorMessage,
    } = useForgotPassword();

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                width: "100%",
            }}
        >
            {/* Logo */}
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
                    alt="GurukulX Logo"
                    sx={{
                        width: { xs: 220, sm: 260 },
                        height: "auto",
                        maxHeight: 100,
                        objectFit: "contain",
                        mb: 1.5,
                    }}
                />

                <Typography sx={{variant:"h5",
                    fontWeight:700}}                    
                    gutterBottom
                >
                    Forgot Password
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    Enter your registered email address and we'll send you a
                    password reset link.
                </Typography>
            </Box>

            {/* Success */}
            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {/* Error */}
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            {/* Form */}
            <Stack spacing={2.5}>
                <TextField
                    label="Email Address"
                    size="small"
                    fullWidth
                    autoFocus
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address",
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                        fontWeight: 700,
                        fontSize: 15,
                        textTransform: "none",
                        boxShadow: "0 8px 20px rgba(25,118,210,0.20)",
                    }}
                >
                    {loading ? (
                        <CircularProgress
                            size={24}
                            color="inherit"
                        />
                    ) : (
                        "Send Reset Link"
                    )}
                </Button>

                <Button
                    component={RouterLink}
                    to="/login"
                    variant="text"
                    fullWidth
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    ← Back to Login
                </Button>
            </Stack>

            {/* Footer */}
            <Typography
                variant="caption"
                component="div"
                align="center"
                color="text.secondary"
                sx={{
                    display: "block",
                    mt: 4,
                }}
            >
                © {new Date().getFullYear()} GurukulX • School ERP Management System
            </Typography>
        </Box>
    );
}