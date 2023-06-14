import { createAsyncThunk, createSlice,createAction } from "@reduxjs/toolkit";
import blogCatService from "./blogCatService";


export const getBlogCategory = createAsyncThunk(
    "blogCategory/get-blogCategory",
    async (thunkApi) => {
      try {
        return await blogCatService.getblogCategory();
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );
  export const resetState = createAction("Reset_all");


  export const createBlogCat = createAsyncThunk(
    "blogCategory/create-blogCategory",
    async (blogcatData,thunkApi) => {
      try {
        return await blogCatService.createblogCategory(blogcatData);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
);

export const getABlogCategory = createAsyncThunk(
  "blogCategory/get-blogCategorys",
  async (id,thunkApi) => {
    try {
      return await blogCatService.getBlogCategorys(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const updateABlogCategory = createAsyncThunk(
  "blogCategory/update-blogCategory",
  async (blogcat,thunkApi) => {
    try {
      return await blogCatService.updateBlogCategory(blogcat);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const deleteABlogCategory = createAsyncThunk(
  "blogCategory/delete-blogCategory",
  async (id,thunkApi) => {
    try {
      return await blogCatService.deleteBlogCategory(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);



  const initialState = {
    blogCategory: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  }
export const blogcatSlice = createSlice({
    name:"blogCategory",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getBlogCategory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.blogCategory = action.payload;
          })
          .addCase(getBlogCategory.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(createBlogCat.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createBlogCat.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.createdblogCategory = action.payload;
          })
          .addCase(createBlogCat.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(getABlogCategory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getABlogCategory.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.blogcatName = action.payload.title;
          })
          .addCase(getABlogCategory.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(updateABlogCategory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateABlogCategory.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.updatedblogcategory = action.payload;
          })
          .addCase(updateABlogCategory.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(deleteABlogCategory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteABlogCategory.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.deletedblogcategory = action.payload;
          })
          .addCase(deleteABlogCategory.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(resetState, () => initialState);
    }
})

export default blogcatSlice.reducer