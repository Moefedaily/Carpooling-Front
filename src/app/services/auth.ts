import { licenseCredentials } from "@/Utils/types/license";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../../Utils/types/user";
import api from "./api";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    if (response.data.success && response.data.data.accessToken) {
      localStorage.setItem("token", response.data.data.accessToken);
      console.log(JSON.stringify(response.data.data));
      return response.data;
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    throw new Error("An unexpected error occurred during login");
  }
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);
  if (response.data.success && response.data.data.accessToken) {
    localStorage.setItem("token", response.data.data.accessToken);
  }
  return response.data;
};
export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    //console.log("user " + JSON.stringify((JSON.parse(window.atob(base64)))));
    return JSON.parse(window.atob(base64));
  }
  return null;
};

export const getUserId = () => {
  const user = getUser();
  console.debug(user);
  if (user) {
    return user.id;
  }
  return null;
};
export const registerAsDriver = async (
  licenseData: licenseCredentials
): Promise<AuthResponse> => {
  const response = await api.post(`/auth/register-as-driver`, licenseData);
  return response.data;
};

export const requestPasswordReset = async (
  email: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>(
      "/auth/request-password-reset",
      { email }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "An unexpected error occurred during password reset request"
    );
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/reset-password", {
      token,
      newPassword,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred during password reset");
  }
};

export const confirmEmail = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await api.get<AuthResponse>(
      `/auth/confirm-email?token=${token}`
    );
    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred during email confirmation");
  }
};
