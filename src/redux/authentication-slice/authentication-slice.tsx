/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../../services/authentication-services/authentication-type";
import {
  CheckLoginService,
  LoginService,
  LogoutService,
  RegisterService,
} from "../../services/authentication-services/authentication-services";
import { toast } from "react-toastify";

type InitialState = {
  loading: boolean;
  error: string | undefined;
  isLogined: boolean;
  userInfo: LoginResponse | undefined;
};

const initialState: InitialState = {
  loading: false,
  error: undefined,
  isLogined: false,
  userInfo: undefined,
};

export const LoginAction = createAsyncThunk<LoginResponse, LoginRequest>(
  "LoginAction",
  async (values: LoginRequest) => {
    try {
      const res = await LoginService(values);
      return res as LoginResponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const RegisterAction = createAsyncThunk<string, RegisterRequest>(
  "RegisterAction",
  async (values: RegisterRequest) => {
    try {
      const res = await RegisterService(values);
      return res as unknown as string;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const LogoutAction = createAsyncThunk<string, void>(
  "LogoutAction",
  async () => {
    try {
      const res = await LogoutService();
      return res as string;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const CheckLoginAction = createAsyncThunk<LoginResponse, void>(
  "CheckLoginAction",
  async () => {
    try {
      const res = await CheckLoginService();
      return res as LoginResponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateStateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAction.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(RegisterAction.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(LogoutAction.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(CheckLoginAction.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(LoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        toast.success("Đăng Nhập thành công!");
        state.userInfo = action.payload;
        state.isLogined = true;
      })
      .addCase(
        RegisterAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = undefined;
          toast.success(action.payload);
        }
      )
      .addCase(
        LogoutAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = undefined;
          state.userInfo = undefined;
          toast.success(action.payload);
        }
      )
      .addCase(CheckLoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.userInfo = action.payload;
        state.isLogined = true;
      })
      .addCase(LoginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.userInfo = undefined;
        toast.error("Tài khoản hoặc mật khẩu không chính xác");
      })
      .addCase(RegisterAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(LogoutAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(CheckLoginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.userInfo = undefined;
      });
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { updateStateLoading } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
