import { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../services/tokenService";
import type {ForgotPasswordFormData} from "../types/auth";

export const useForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ForgotPasswordFormData>({
        defaultValues: {
            email: "",
        },
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            setLoading(true);
            setSuccessMessage("");
            setErrorMessage("");

            const response = await forgotPassword({
                email: data.email,
            });

            setSuccessMessage(
                response.data.message ||
                "If an account exists with this email, a password reset link has been sent."
            );

            reset();
        } catch (error: any) {
            setErrorMessage(
                error?.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        loading,
        successMessage,
        errorMessage,
    };
};