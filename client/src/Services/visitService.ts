import axios from "axios";
import $api from "./httpCommon";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async (appointmentData: any) => {
    // console.log(appointmentData);
    const token = localStorage.getItem("token");
    console.log("token", token);

  

    const response = await $api.post("/visits", appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });



    console.log("response data ",response.data);

    return response.data;
  }
);
