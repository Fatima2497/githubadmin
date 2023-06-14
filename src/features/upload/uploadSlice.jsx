import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uploadService from "./uploadService"

export const uploadImage = createAsyncThunk(
  "upload/image",
  async (data, thunkApi) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      const response = await uploadService.uploadImg(formData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const delImage = createAsyncThunk(
  "delete/image",
  async (id, thunkApi) => {
    try {
      const response = await uploadService.deleteImg(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const uploadSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || "Upload failed";
      }) 
      .addCase(delImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(delImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });;
  },
});

export default uploadSlice.reducer;
