import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
    isAdmin: boolean;
    loading: boolean;
    error: string | null;
}
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        error: null,
        success: false,
    },
    reducers: {},
});