import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";


export const getBrands = createAsyncThunk(
    "brands/get-brands",
    async (thunkApi) => {
      try {
        return await brandService.getBrands();
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

  
export const getABrand = createAsyncThunk(
  "brands/get-brand",
  async (id,thunkApi) => {
    try {
      return await brandService.getBrand(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);


  export const resetState = createAction("Reset_all");


  export const createBrands = createAsyncThunk(
    "brand/create-brands",
    async (brandData,thunkApi) => {
      try {
        return await brandService.createBrands(brandData);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
);

export const updateABrand = createAsyncThunk(
  "brand/update-brands",
  async (brand,thunkApi) => {
    try {
      return await brandService.updateBrand(brand);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const delteABrand = createAsyncThunk(
  "brands/delete-brand",
  async (id,thunkApi) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

  const initialState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  }
export const brandSlice = createSlice({
    name:"brands",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getBrands.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.brands = action.payload;
          })
          .addCase(getBrands.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(createBrands.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createBrands.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.createdbrands = action.payload;
          })
          .addCase(createBrands.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(getABrand.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getABrand.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.brandName = action.payload.title;
          })
          .addCase(getABrand.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(updateABrand.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateABrand.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.updatedbrand = action.payload;
          })
          .addCase(updateABrand.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(delteABrand.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(delteABrand.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.deletedbrand = action.payload;
          })
          .addCase(delteABrand.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(resetState, () => initialState);
    }
})

export default brandSlice.reducer