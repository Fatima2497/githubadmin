import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";


export const getCoupons = createAsyncThunk(
    "coupons/get-coupons",
    async (thunkApi) => {
      try {
        return await couponService.getCoupons();
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

  export const resetState = createAction("Reset_all");


  export const createCoupons = createAsyncThunk(
    "coupons/create-coupons",
    async (couponData,thunkApi) => {
      try {
        return await couponService.createCoupons(couponData);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
);
export const getACoupon = createAsyncThunk(
  "coupons/get-coupon",
  async (id,thunkApi) => {
    try {
      return await couponService.getCoupon(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const updateACoupon = createAsyncThunk(
  "coupons/update-coupon",
  async (coupon,thunkApi) => {
    try {
      return await couponService.updateCoupon(coupon);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const deleteACoupon = createAsyncThunk(
  "coupons/delete-coupon",
  async (id,thunkApi) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
  const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  }
export const couponSlice = createSlice({
    name:"coupons",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder.addCase(getCoupons.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCoupons.fulfilled, (state, action) => {
          state.isLoading = false,
          state.isError = false,
            state.isSuccess = true,
            state.coupons = action.payload;
        })
        .addCase(getCoupons.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.isSuccess = false,
            state.message = action.error;
        })
        .addCase(createCoupons.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createCoupons.fulfilled, (state, action) => {
          state.isLoading = false,
          state.isError = false,
            state.isSuccess = true,
            state.createdcoupons = action.payload;
        })
        .addCase(createCoupons.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.isSuccess = false,
            state.message = action.error;
        })
        .addCase(getACoupon.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getACoupon.fulfilled, (state, action) => {
          state.isLoading = false,
          state.isError = false,
            state.isSuccess = true,
            state.couponName = action.payload.name;
            state.couponDiscount = action.payload.discount;
            state.couponExpiry = action.payload.expiry;
        })
        .addCase(getACoupon.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.isSuccess = false,
            state.message = action.error;
        })
        .addCase(updateACoupon.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateACoupon.fulfilled, (state, action) => {
          state.isLoading = false,
          state.isError = false,
            state.isSuccess = true,
            state.updatedcoupons = action.payload;
        })
        .addCase(updateACoupon.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.isSuccess = false,
            state.message = action.error;
        })
        .addCase(deleteACoupon.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteACoupon.fulfilled, (state, action) => {
          state.isLoading = false,
          state.isError = false,
            state.isSuccess = true,
            state.deletedcoupons = action.payload;
        })
        .addCase(deleteACoupon.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.isSuccess = false,
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
  }
})

export default couponSlice.reducer