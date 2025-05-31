import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VisitService from "../Services/visitService";
import { visitState } from "../interfaces/visitState";

const initialState: visitState = {
  visits: [],
  loading: false,
  error: null,
};
export const fetchVisits = createAsyncThunk(
  "visits/fetchVisits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await VisitService.fetchVisits();
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchAllVisits = createAsyncThunk(
  "visits/fetchAllVisits",
  async () => {
    const response = await VisitService.getAllVisits();
    return response.data;
  }
);
const visitSlice = createSlice({
  name: "visits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisits.fulfilled, (state, action) => {
        state.loading = false;
        state.visits = action.payload;
      })
      .addCase(fetchVisits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllVisits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVisits.fulfilled, (state, action) => {
        state.visits = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllVisits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default visitSlice.reducer;
