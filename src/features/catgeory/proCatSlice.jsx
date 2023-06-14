import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import proCatService from "./proCatService";


export const getproCategory = createAsyncThunk(
    "proCategory/get-proCategory",
    async (thunkApi) => {
      try {
        return await proCatService.getproCategory();
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

  export const resetState = createAction("Reset_all");


  export const createProCat = createAsyncThunk(
    "category/create-categories",
    async (catData,thunkApi) => {
      try {
        return await proCatService.createCategory(catData);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
);

export const getAProCategory = createAsyncThunk(
  "proCategory/get-proCategorys",
  async (id,thunkApi) => {
    try {
      return await proCatService.getCategorys(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const updateAProCategory = createAsyncThunk(
  "proCategory/update-proCategory",
  async (procat,thunkApi) => {
    try {
      return await proCatService.updateCategory(procat);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const deleteAProCategory = createAsyncThunk(
  "proCategory/delete-proCategory",
  async (id,thunkApi) => {
    try {
      return await proCatService.deleteCategory(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

  const initialState = {
    proCategory: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  }
export const procatSlice = createSlice({
    name:"productCategory",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getproCategory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getproCategory.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.proCategory = action.payload;
          })
          .addCase(getproCategory.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(createProCat.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createProCat.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.createproCategory = action.payload;
          })
          .addCase(createProCat.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(getAProCategory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAProCategory.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.procatName = action.payload.title;
          })
          .addCase(getAProCategory.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(updateAProCategory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateAProCategory.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.updatedproCategory = action.payload;
          })
          .addCase(updateAProCategory.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(deleteAProCategory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteAProCategory.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.deletedproCategory = action.payload;
          })
          .addCase(deleteAProCategory.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(resetState, () => initialState);
    }
})

export default procatSlice.reducer