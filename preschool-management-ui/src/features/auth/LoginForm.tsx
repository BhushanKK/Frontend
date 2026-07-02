import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import useLogin from "../../hooks/useLogin";

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
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 1,
                }}
            >
                Welcome Back 👋
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
            >
                Sign in to continue to School Management System
            </Typography>

            {errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMessage}
                </Alert>
            )}

            <Stack spacing={3}>
                <TextField
                    label="Username"
                    fullWidth
                    {...register("userName", {
                        required: "Username is required",
                    })}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                />

                <TextField
                    label="Password"
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
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Remember Me"
                    />

                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        Forgot Password?
                    </Typography>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                        height: 50,
                        borderRadius: 2,
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
        </Box>
    );
}