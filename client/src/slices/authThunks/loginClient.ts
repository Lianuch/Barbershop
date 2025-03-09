import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../Services/AuthService";
import { setAuth, setClient } from "../authSlice";

export const loginClient = createAsyncThunk("auth/login",
    async ({ email, password }: { email: string; password: string }, {dispatch, rejectWithValue }) => {
        try{
            const response = await AuthService.login(email, password);
            localStorage.setItem("token", response.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setClient(response.data.user));
            return response.data;
        }
        catch(e:any){
            return rejectWithValue(e.response.data.message)
        }
})
