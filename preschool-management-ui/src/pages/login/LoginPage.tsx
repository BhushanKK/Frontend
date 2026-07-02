import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

import axios from "axios";
import { useForm } from "react-hook-form";

import { login } from "../../api/authApi";
import type { LoginRequest } from "../../types/auth";

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm<LoginRequest>();

    const onSubmit = async (data: LoginRequest) => {

        setLoading(true);
        setServerMessage(null);
        clearErrors("root");

        try {
            const response = await login(data);

            if (response?.access) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("expiresAt", response.data.expiresAt);
                setServerMessage(response.message || "Login successful");
            } else {
                setError("root", {
                    type: "server",
                    message: response.message || "Login failed"
                });
            }
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : "Unable to reach the server";

            setError("root", {
                type: "server",
                message
            });
        } finally {
            setLoading(false);
        }
    };

    return (

        <Container
            maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <Card
                sx={{
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: 6
                }}
            >

                <CardContent sx={{ p: 5 }}>

                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                    >
                        Preschool ERP
                    </Typography>

                    <Typography
                        component="p"
                        align="center"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Sign in to continue
                    </Typography>

                    {serverMessage && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {serverMessage}
                        </Alert>
                    )}

                    {errors.root?.message && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.root.message}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <TextField
                            fullWidth
                            label="Username"
                            margin="normal"
                            {...register("username", {
                                required: "Username is required"
                            })}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            margin="normal"
                            {...register("password", {
                                required: "Password is required"
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(!showPassword)
                                                }
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
                                height: 50
                            }}
                        >
                            {
                                loading
                                    ? <CircularProgress size={25} color="inherit" />
                                    : "Login"
                            }
                        </Button>

                    </Box>

                </CardContent>

            </Card>

        </Container>
    );
}