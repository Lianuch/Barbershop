import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBarbers } from "../Services/barbersService";
import { BarbersState } from "../Types/BarbersState";
import { Barbers } from "../Types/Barbers";
import {
  createBarber,
  deleteBarber,
  updateBarber,
} from "../Services/barbersService";

const fetchBarbers = createAsyncThunk<Barbers[], string>(
  "barbers/fetchBarbers",
  async (lang) => {
    return getBarbers(lang);
  }
);

type NewBarber = Omit<Barbers, "_id" | "translation"> & {
  translation: {
    language: string;
    name: string;
    surname: string;
  }[];
};

const addBarber = createAsyncThunk(
  "barbers/addBarber",
  async (barber: NewBarber) => {
    return createBarber(barber);
  }
);

const removeBarber = createAsyncThunk(
  "barbers/removeBarber",
  async (_id: string) => {
    await deleteBarber(_id);
    return _id;
  }
);

const editBarber = createAsyncThunk(
  "barbers/editBarber",
  async ({ id, barber }: { id: string; barber: Barbers }) => {
    return updateBarber(id, barber);
  }
);

const initialState: BarbersState = {
  list: [],
  loading: false,
  error: null,
  lastUpdated: null,
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
        state.lastUpdated = Date.now();
      })
      .addCase(addBarber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBarber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error adding barber";
      })
      .addCase(addBarber.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.loading = false;
        state.error = null;
        state.lastUpdated = Date.now();
      })
      .addCase(removeBarber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBarber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error removing barber";
      })
      .addCase(removeBarber.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (barber) => barber._id !== action.payload
        );
        state.loading = false;
        state.error = null;
        state.lastUpdated = Date.now();
      })
      .addCase(editBarber.fulfilled, (state, action) => {
        state.list = state.list.map((barber) =>
          barber._id === action.payload._id ? {...barber, ...action.payload} : barber
        );
        state.loading = false;
        state.error = null;
        state.lastUpdated = Date.now();

      });
  },
});

export default barbersSlice.reducer;
export { fetchBarbers, addBarber, removeBarber, editBarber };
