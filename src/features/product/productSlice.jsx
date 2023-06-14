import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import productService from "./productServce";


export const getProducts = createAsyncThunk(
    "product/get-products",
    async (thunkApi) => {
      try {
        return await productService.getProducts();
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
);


export const resetState = createAction("Reset_all");

export const createProducts = createAsyncThunk(
    "product/create-products",
    async (productData,thunkApi) => {
      try {
        return await productService.createProducts(productData);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
);


  const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  }
export const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.products = action.payload;
          })
          .addCase(getProducts.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(createProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdProduct = action.payload;
          })
          .addCase(createProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
          })
          .addCase(resetState, () => initialState);
    }
})

export default productSlice.reducer