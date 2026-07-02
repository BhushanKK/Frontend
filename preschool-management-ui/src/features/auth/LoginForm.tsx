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
    variant="h5"
    sx={{
        fontWeight: 700,
        mb: 0.5,
    }}
>
                Welcome Back 👋
            </Typography>

            <Typography
                variant="body2"
sx={{
    mb: 3,
    color: "text.secondary",
}}
            >
                Sign in to continue to School Management System
            </Typography>

            {errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMessage}
                </Alert>
            )}

            <Stack spacing={2}>
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
                    size="medium"
                    disabled={loading}
                    sx={{
                        height: 42,
                        borderRadius: 2,
                        fontWeight:600,
                        fontSize:14
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