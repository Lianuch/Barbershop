import { createSlice } from "@reduxjs/toolkit";
import { AppointmentState } from "../interfaces/AppointmentState";
import { bookAppointment } from "../Services/visitService";

const initialState: AppointmentState = {
  loading: false,
  error: null,
  success: false,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookAppointment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default appointmentSlice.reducer;
