import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler} from "react-hook-form";
import { AxiosError } from "axios";
import { login } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import { usePermissionStore } from "../store/permissionStore";
import type { LoginRequest, LoginResponse} from "../types/auth";
import { getJwtPayload} from "../utils/jwtHelper";

export default function useLogin() {
    const navigate = useNavigate();
    const loginStore =
        useAuthStore(
            state => state.login
        );

    const [loading, setLoading] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<LoginRequest>({
        defaultValues: {
            userName: "",
            password: "",
        },
    });


    const onSubmit:
        SubmitHandler<LoginRequest>
        = async (data) => {
        try {
            setLoading(true);
            setErrorMessage("");
            const response:
                LoginResponse =
                await login(data);
            if (!response.success) {
                setErrorMessage(
                    response.message
                );
                return;
            }
            // Save authentication details
            loginStore(
                response.data
            );
            // Decode JWT
            const jwt =
                getJwtPayload(
                    response.data.accessToken
                );
            console.log(
                "Role Id:",
                jwt.roleId
            );
            // Load role permissions
           const permissions =
    await usePermissionStore
        .getState()
        .loadPermissions(jwt.roleId);

console.log(
    "Role Id:",
    jwt.roleId
);


console.log(
    "Permissions:",
    permissions
);

            navigate(
                "/dashboard",
                {
                    replace: true,
                }
            );
        }
        catch(error) {
            const err =
                error as AxiosError<{
                    message?: string
                }>;

            setErrorMessage(
                err.response?.data?.message
                ??
                "Unable to login. Please try again."
            );
        }
        finally {
            setLoading(false);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        loading,
        errorMessage,
        showPassword,
        setShowPassword,
    };
}