import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBarbers } from "../Services/barbersService";
import { BarbersState } from "../Types/BarbersState";
import { Barbers } from "../Types/Barbers";

const fetchBarbers = createAsyncThunk<Barbers[], string>("barbers/fetchBarbers", async (lang) => {
  return getBarbers(lang);
});

const initialState: BarbersState = {
  list: [],
  loading: false,
  error: null,
};

const barbersSlice = createSlice({
  name: "barbers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBarbers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBarbers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error occurred";
      })
      .addCase(fetchBarbers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export default barbersSlice.reducer;
export { fetchBarbers };
