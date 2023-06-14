import { createAsyncThunk, createSlice,createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";


export const getEnquries = createAsyncThunk(
    "enquiries/get-enquiries",
    async (thunkApi) => {
      try {
        return await enquiryService.getEnquiries();
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

  export const resetState = createAction("Reset_all");

  export const deleteEnquriry = createAsyncThunk(
    "enquiries/delete-enquiries",
    async (id,thunkApi) => {
      try {
        return await enquiryService.deleteEnquiries(id);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

  
  export const updateEnquriry = createAsyncThunk(
    "enquiries/update-enquiries",
    async (enq,thunkApi) => {
      try {
        return await enquiryService.updateEnquiries(enq);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

  export const getAEnquriry = createAsyncThunk(
    "enquiries/get-enquiry",
    async (id,thunkApi) => {
      try {
        return await enquiryService.getEnquiry(id);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

  const initialState = {
    enquiry: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  }
export const enquirySlice = createSlice({
    name:"enquiry",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getEnquries.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getEnquries.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.enquiry = action.payload;
          })
          .addCase(getEnquries.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(deleteEnquriry.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteEnquriry.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.enquirydeleted = action.payload;
          })
          .addCase(deleteEnquriry.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(getAEnquriry.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAEnquriry.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.enqName = action.payload.name;
              state.enqMobile = action.payload.mobile;
              state.enqEmail = action.payload.email;
              state.enqComment = action.payload.comment;
              state.enqStatus = action.payload.status;
          })
          .addCase(getAEnquriry.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(updateEnquriry.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateEnquriry.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
              state.isSuccess = true,
              state.updatedenq = action.payload
          })
          .addCase(updateEnquriry.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              state.isSuccess = false,
              state.message = action.error;
          })
          .addCase(resetState, () => initialState)
          ;
    }
})

export default enquirySlice.reducer