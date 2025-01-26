import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialLanguage = localStorage.getItem("language") || "ua"

const languageSlice = createSlice({
  name: "language",
  initialState:{
    currentLanguage: initialLanguage
  },
  reducers: {
    changeLanguage: (state, action:PayloadAction<string>) => {
      state.currentLanguage = action.payload;
      localStorage.setItem("language", action.payload)
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
