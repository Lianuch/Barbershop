import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../Services/AuthService";
import { setAuth, setClient } from "../authSlice";

export const logoutClient = createAsyncThunk("auth/logout", async (_, { dispatch })=>{
    try{
        await AuthService.logout();
        localStorage.removeItem("token");
        dispatch(setAuth(false));
        dispatch(setClient(null));
    }
    catch(e:any){
     console.log(e);
        
    }
})