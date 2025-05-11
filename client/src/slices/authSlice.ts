import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/AuthState";
import IClient from "../interfaces/IClient";
import { loginClient } from "./authThunks/loginClient";
import { registerUser } from "./authThunks/registerClient";
import { logoutClient } from "./authThunks/logoutClient";
import { checkAuth } from "./authThunks/checkAuth";


const initialState:AuthState = {
client: null,
isAuth: false,
isAdmin: false,
loading: false,
error: null
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuth(state,action:PayloadAction<boolean>){
            state.isAuth = action.payload
        },
        setClient(state,action:PayloadAction<IClient | null>){
            state.client = action.payload
            state.isAdmin = action.payload?.role === "admin";
        }
    },
    extraReducers:(builder)=>{
        builder
            //login
            .addCase(loginClient.pending,(state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(loginClient.fulfilled,(state,action)=>{
                state.loading = false
                state.isAuth = true
                state.client = action.payload.client
                state.isAdmin = state.client?.role === "admin";
            })
            .addCase(loginClient.rejected,(state,action)=>{
                state.loading = false
                state.error = action.payload as string;
            })
            //register
            .addCase(registerUser.pending,(state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.loading = false
                state.isAuth = true
                state.client = action.payload.client
                state.client.isActivated = action.payload.client?.isActivated;

            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading = false
                state.error = action.payload as string;
            })
            //logout
            .addCase(logoutClient.fulfilled,(state)=>{
                state.isAuth = false;
                state.client = null;
                state.loading = false
            })
            .addCase(logoutClient.pending,(state)=>{
                state.loading = true;
            })
            //check auth
            .addCase(checkAuth.pending,(state)=>{
                state.error = null
                state.loading = true
                
            })
            .addCase(checkAuth.fulfilled,(state,action)=>{
                state.loading = false
                state.isAuth = true
                state.client = action.payload
                state.isAdmin = action.payload?.role === "admin";
                state.client.isActivated = action.payload.isActivated


            })
            .addCase(checkAuth.rejected,(state,action)=>{
               state.loading = false
               state.isAuth = false
               state.client = null
               state.error = action.payload as string
            })
            
            

    }
})

export const {setAuth,setClient} = authSlice.actions
export default authSlice.reducer