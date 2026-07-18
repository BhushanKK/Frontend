import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { login } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import { usePermissionStore } from "../store/permissionStore";

import type { LoginFormData, LoginResponse } from "../types/auth";

interface JwtPayload {
  roleId: number;
}

const REMEMBER_ME_KEY = "rememberMe";
const REMEMBERED_USERNAME_KEY = "rememberedUserName";

const getRememberedUserName = () =>
  localStorage.getItem(REMEMBERED_USERNAME_KEY) ?? "";

const getRememberMeValue = () =>
  localStorage.getItem(REMEMBER_ME_KEY) === "true";

const updateRememberMe = (rememberMe: boolean, userName: string) => {
  if (rememberMe) {
    localStorage.setItem(REMEMBER_ME_KEY, "true");
    localStorage.setItem(REMEMBERED_USERNAME_KEY, userName);
    return;
  }

  localStorage.removeItem(REMEMBER_ME_KEY);
  localStorage.removeItem(REMEMBERED_USERNAME_KEY);
};

export default function useLogin() {
  const navigate = useNavigate();

  const loginStore = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      userName: getRememberedUserName(),
      password: "",
      rememberMe: getRememberMeValue(),
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const { rememberMe, ...loginPayload } = data;

      const response: LoginResponse = await login(loginPayload);

      if (!response.success) {
        setErrorMessage(response.message);
        return;
      }

      updateRememberMe(rememberMe, data.userName);

      loginStore(response.data);

      const decoded = jwtDecode<JwtPayload>(response.data.accessToken);

      await usePermissionStore.getState().loadPermissions(decoded.roleId);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      setErrorMessage(
        err.response?.data?.message ?? "Unable to login. Please try again."
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
    errorMessage,
    showPassword,
    setShowPassword,
  };
}