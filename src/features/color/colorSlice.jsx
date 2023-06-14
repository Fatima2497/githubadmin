import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk(
    "colors/get-colors",
    async (thunkApi) => {
      try {
        return await colorService.getColors();
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

  export const resetState = createAction("Reset_all");


  export const createColors = createAsyncThunk(
    "colors/create-colors",
    async (colorData,thunkApi) => {
      try {
        return await colorService.createColors(colorData);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
);

export const getAColor = createAsyncThunk(
  "colors/get-color",
  async (id,thunkApi) => {
    try {
      return await colorService.getColor(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const updateAColor = createAsyncThunk(
  "colors/update-colors",
  async (color,thunkApi) => {
    try {
      return await colorService.updateColor(color);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const deleteAColor = createAsyncThunk(
  "colors/delete-color",
  async (id,thunkApi) => {
    try {
      return await colorService.deleteColor(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);


  const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  }
export const colorSlice = createSlice({
    name:"colors",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getColors.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getColors.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.colors = action.payload;
          })
          .addCase(getColors.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(createColors.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createColors.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.savecolors = action.payload;
          })
          .addCase(createColors.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(getAColor.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAColor.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.colorName = action.payload.title;
          })
          .addCase(getAColor.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(updateAColor.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateAColor.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.updatedcolor = action.payload;
          })
          .addCase(updateAColor.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(deleteAColor.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteAColor.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.deletedcolor = action.payload;
          })
          .addCase(deleteAColor.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(resetState, () => initialState);
    }
})

export default colorSlice.reducer