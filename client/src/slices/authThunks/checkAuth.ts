import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../Services/httpCommon";
import { AuthResponse } from "../../interfaces/authResponse";
import { setAuth, setClient } from "../authSlice";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/clients/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      
      dispatch(setAuth(true));
      dispatch(setClient(response.data.user));

      return response.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Authentication check failed"
      );
    }
  }
);
