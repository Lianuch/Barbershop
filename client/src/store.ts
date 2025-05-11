import { configureStore } from "@reduxjs/toolkit";
import barbersReducer from "./slices/barbersSlice";
import languageReducer from "./slices/languageSlice"
import favorsReducer from "./slices/favorsSlice"
import authReducer from "./slices/authSlice"
import appointmentReducer from "./slices/AppointmentSlice"
import visitsReducer from "./slices/visitSlice"
export const store = configureStore({
  reducer: {
    barbers: barbersReducer,
    language: languageReducer,
    favors: favorsReducer,
    visits: visitsReducer,
    auth:authReducer,
    appointment:appointmentReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
