import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as axios from 'axios';

// Llamada asíncrona
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  }
);

// Slice de Redux para manejar el estado de productos
const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
      state.error = null;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default productsSlice.reducer;
