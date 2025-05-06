import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import { createBarber, deleteBarber, updateBarber } from "../Services/barbersService";
import { Barbers } from "../Types/Barbers";

const initialState: AdminState = {
  barbers: [],
  isAdmin: true,
  loading: false,
  error: null,
};
const removeBarber = createAsyncThunk(
  "admin/removeBarber",
  async (_id: string) => {
    await deleteBarber(_id);
    return _id;
  }
);

const addBarber = createAsyncThunk(
  "admin/addBarber",
  async (barber: Barbers) => {
    return createBarber(barber);
  }
);

const editBarber = createAsyncThunk(
    "admin/editBarber",
    async ({ id, barber }: { id: string; barber: Barbers }) => {
      return updateBarber(id, barber);
    }
  );
  

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBarber.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.barbers.push(action.payload);
      })
      .addCase(removeBarber.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.barbers = state.barbers.filter(
          (barber) => barber._id !== action.payload
        );
      })
      .addCase(editBarber.fulfilled, (state, action)=>{
        state.loading = false;
        state.error = null;
        state.barbers = state.barbers.map(barber => barber._id === action.payload._id ? action.payload : barber)  
      })
      
  },
});

export default adminSlice.reducer;
export { addBarber, removeBarber, editBarber };