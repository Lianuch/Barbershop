import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../Services/AuthService";
import { setAuth, setClient } from "../authSlice";
import { AuthResponse } from "../../interfaces/authResponse";
import  { AxiosError } from "axios";

export const loginClient = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setClient(response.data.user));
      return response.data;
    } catch (e: any) {
      const axiosError = e as AxiosError<any>;
      const message =
        axiosError.response?.data?.message || "Login failed. Try again.";
      return rejectWithValue(message);
    }
  }
);
