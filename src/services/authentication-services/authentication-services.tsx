/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../../utils/axios-interceptor";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "./authentication-type";

export const LoginService = async (data: LoginRequest) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res as unknown as LoginResponse;
  } catch (error: any) {
    if (error) {
      throw new Error(error.message);
    }
  }
};

export const RegisterService = async (data: RegisterRequest) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    return res as unknown as string;
  } catch (error: any) {
    if (error) {
      throw new Error(error.message);
    }
  }
};

export const LogoutService = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout", null);
    return res as unknown as string;
  } catch (error: any) {
    if (error) {
      throw new Error(error.message);
    }
  }
};

export const CheckLoginService = async () => {
  try {
    const res = await axiosInstance.post("/auth/check-login", null);
    return res as unknown as LoginResponse;
  } catch (error: any) {
    if (error) {
      throw new Error(error.message);
    }
  }
};
