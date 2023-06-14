import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlogs = createAsyncThunk(
  "blogs/get-blogs",
  async (thunkApi) => {
    try {
      return await blogService.getBlogs();
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const resetState = createAction("Reset_all");

export const createBlog = createAsyncThunk(
  "blogs/create-blogs",
  async (blogData, thunkApi) => {
    try {
      return await blogService.createBlogs(blogData);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getABlog = createAsyncThunk(
  "blogs/get-blog",
  async (id, thunkApi) => {
    try {
      return await blogService.getBlog(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const updateABlog = createAsyncThunk(
  "blog/update-blog",
  async (blog, thunkApi) => {
    try {
      return await blogService.updateBlog(blog);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const delteABlog = createAsyncThunk(
  "blogs/delete-blog",
  async (id, thunkApi) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.blogs = action.payload);
      })
      .addCase(getBlogs.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.error);
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.newblog = action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.error);
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.blogName = action.payload.title);
        state.blogDesc= action.payload.description;
        state.blogCategory = action.payload.category;
        state.blogImage = action.payload.image;
      })
      .addCase(getABlog.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.error);
      })
      .addCase(updateABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlog.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.updatedblog = action.payload);
      })
      .addCase(updateABlog.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.error);
      })
      .addCase(delteABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delteABlog.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.deletedblog = action.payload);
      })
      .addCase(delteABlog.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.error);
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
