import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../Services/AuthService";
import { setAuth, setClient } from "../authSlice";

export const registerUser = createAsyncThunk("auth/register", 
  async ({ name,email, password }: { name: string; email: string; password: string },{ dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.registration(name, email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);

      dispatch(setAuth(true));
      dispatch(setClient(response.data.user));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);
