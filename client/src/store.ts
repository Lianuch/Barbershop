import { configureStore } from "@reduxjs/toolkit";
import barbersReducer from "./slices/barbersSlice";
import languageReducer from "./slices/languageSlice"
import favorsReducer from "./slices/favorsSlice"
import authReducer from "./slices/authSlice"
import appointmentReducer from "./slices/AppointmentSlice"
import adminReducer from "./slices/adminSlice"
export const store = configureStore({
  reducer: {
    barbers: barbersReducer,
    language: languageReducer,
    favors: favorsReducer,
    auth:authReducer,
    appointment:appointmentReducer,
    admin: adminReducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
