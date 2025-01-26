import { configureStore } from "@reduxjs/toolkit";
import barbersReducer from "./slices/barbersSlice";
import languageReducer from "./slices/languageSlice"
import favorsReducer from "./slices/favorsSlice"
export const store = configureStore({
  reducer: {
    barbers: barbersReducer,
    language: languageReducer,
    favors: favorsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
