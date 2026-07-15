import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/tokenService";


interface ResetPasswordFormData {
    newPassword: string;
    confirmPassword: string;
}

export const useResetPassword = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token") ?? "";
    const email = searchParams.get("email") ?? "";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordFormData>();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data: ResetPasswordFormData) => {

        if (data.newPassword !== data.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);
            setErrorMessage("");

            const response = await resetPassword({
                token,
                password: data.newPassword,
                confirmPassword: data.confirmPassword,
            });

            setSuccessMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error: any) {

            setErrorMessage(
                error?.response?.data?.message ??
                "Unable to reset password."
            );

        } finally {
            setLoading(false);
        }
    };

    return {

        register,
        handleSubmit,
        watch,
        errors,

        loading,

        successMessage,
        errorMessage,

        showPassword,
        setShowPassword,

        showConfirmPassword,
        setShowConfirmPassword,

        onSubmit,
    };
};