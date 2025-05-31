import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FavorsState } from "../Types/FavorState";
import { Favors } from "../Types/Favors";
import { createFavor, deleteFavor, getFavors } from "../Services/favorsService";
import { NewFavor } from "../Types/NewFavor";

const fetchFavors = createAsyncThunk<Favors[], string>(
  "favors/fetchFavors",
  async (lang) => {
    return getFavors(lang);
  }
);
const initialState: FavorsState = {
  favors: [],
  loading: false,
  error: null,
};


const addFavor = createAsyncThunk(
  "barbers/addBarber",
  async (favor: NewFavor) => {
    return createFavor(favor);
  }
);

  const removeFavor = createAsyncThunk(
    "favors/removeFavor",
    async (_id: string) => {
      await deleteFavor(_id);
      return _id;
    
    }
  )

const favorSlice = createSlice({
  name: "favors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error occured";
      })
      .addCase(fetchFavors.fulfilled, (state, action) => {
        state.loading = false;
        state.favors = action.payload;
      })

      .addCase(addFavor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error occured";
      })
      .addCase(addFavor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.favors.push(action.payload);
      })
      .addCase(removeFavor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error occured";
      })
      .addCase(removeFavor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favors = state.favors.filter((favor) => favor._id !== action.payload);
      });
  },
});

export default favorSlice.reducer;
export { fetchFavors, addFavor, removeFavor };
