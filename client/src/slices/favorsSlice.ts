import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FavorsState } from "../Types/FavorState";
import { Favors } from "../Types/Favors";
import { getFavors } from "../Services/favorsService";

const fetchFavors = createAsyncThunk<Favors[]>("favors/fetchFavors", async()=>{
    return getFavors();
})
const initialState: FavorsState = {
  favors: [],
  loading: false,
  error: null,
};

const favorSlice = createSlice({
    name:"favors",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
       builder
       .addCase(fetchFavors.pending,(state)=>{
        state.loading = true
        state.error=null
       })
       .addCase(fetchFavors.rejected,(state,action)=>{
        state.loading = false
        state.error= action.error.message || "Error occured"
       })
       .addCase(fetchFavors.fulfilled,(state,action)=>{
        state.loading = false
        state.favors = action.payload
       })
    },
})

export default favorSlice.reducer
export{fetchFavors}