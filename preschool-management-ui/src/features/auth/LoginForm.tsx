import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
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

import useLogin from "../../hooks/useLogin";
import logo from "../../assets/images/logo.png";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        loading,
        errorMessage,
        showPassword,
        setShowPassword,
    } = useLogin();

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                width: "100%",
            }}
        >
            {/* Logo & Heading */}
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
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 1 }}
                >
                    Sign in to continue to your School ERP Management System
                </Typography>
            </Box>

            {/* Error Message */}
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMessage}
                </Alert>
            )}

            {/* Form */}
            <Stack spacing={2.5}>
                <TextField
                    label="Username"
                    size="small"
                    fullWidth
                    {...register("userName", {
                        required: "Username is required",
                    })}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                />

                <TextField
                    label="Password"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    {...register("password", {
                        required: "Password is required",
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {/* Remember Me + Forgot Password */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox size="small" />}
                        label="Remember Me"
                    />

                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{
                            cursor: "pointer",
                            fontWeight: 600,
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Forgot Password?
                    </Typography>
                </Box>

                {/* Login Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{
                        mt: 1,
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
                        "Sign In"
                    )}
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