import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";


const getData = localStorage.getItem("user") ? localStorage.getItem("user") : null
// console.log(getData);
const initialState = {
  user: getData,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkApi) => {
    try {
      return await authService.login(user);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkApi) => {
    try {
      return await authService.getOrders();
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getSingleOrders = createAsyncThunk(
  "order/get-order",
  async (id,thunkApi) => {
    try {
      return await authService.getaOrders(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);


export const getOrderMonth = createAsyncThunk(
  "order/get-monthlyorder",
  async (thunkApi) => {
    try {
      return await authService.getMonthlyOrder();
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getOrderYearly = createAsyncThunk(
  "order/get-yearlyorder",
  async (thunkApi) => {
    try {
      return await authService.getYearlyStats()
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getaUser = createAsyncThunk(
  "auth/get-user",
  async(id,thunkAPI)=>{
  try{
      return await authService.getUser(id)
  }catch(e){
      return thunkAPI.rejectWithValue(e)
  }
})

export const updateUser = createAsyncThunk(
  "auth/update-user",
  async(data,thunkAPI)=>{
  try{
      return await authService.myProfile(data)
  }catch(e){
    console.log(e);
      return thunkAPI.rejectWithValue(e)
  }
})

export const forgetPassToken = createAsyncThunk(
  "auth/post-pass",
  async(data,thunkAPI)=>{
  try{
      return await authService.forgetPass(data)
  }catch(e){
      return thunkAPI.rejectWithValue(e)
  }
})

export const resetPassToken = createAsyncThunk(
  "auth/put-resetpass",
  async(data,thunkAPI)=>{
  try{
      return await authService.resetPass(data)
  }catch(e){
      return thunkAPI.rejectWithValue(e)
  }
})


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.user = action.payload);
      })
      .addCase(login.rejected, (state) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.user = null);
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllOrders.fulfilled, (state,action) => {
        (state.isLoading = false),
        (state.isSuccess = true),
        (state.orders = action.payload);
      })
      .addCase(getAllOrders.rejected, (state) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.orders = null);
      })
      .addCase(getSingleOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleOrders.fulfilled, (state,action) => {
        (state.isLoading = false),
        (state.isSuccess = true),
        (state.singleorder = action.payload);
      })
      .addCase(getSingleOrders.rejected, (state) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.orders = null);
      })
      .addCase(getOrderMonth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderMonth.fulfilled, (state,action) => {
        (state.isLoading = false),
        (state.isSuccess = true),
        (state.ordermonth = action.payload);
      })
      .addCase(getOrderMonth.rejected, (state) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.orders = null);
      })
      .addCase(getOrderYearly.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderYearly.fulfilled, (state,action) => {
        (state.isLoading = false),
        (state.isSuccess = true),
        (state.orderyearly = action.payload);
      })
      .addCase(getOrderYearly.rejected, (state) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.orders = null);
      })
      .addCase(getaUser.pending, (state)=> {
        state.isLoading = true;
    })
    .addCase(getaUser.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.mobile = action.payload.mobile;
        state.email = action.payload.email;
    })
    .addCase(getaUser.rejected, (state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
    })
      .addCase(updateUser.pending, (state)=> {
        state.isLoading = true;
    })
    .addCase(updateUser.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload;
        if(state.isSuccess === true){
            toast.success("Your Profile is updated")
        }
    })
    .addCase(updateUser.rejected, (state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError === true){
            toast.error("No Profile is updated")
        }
    })
    .addCase(forgetPassToken.pending, (state)=> {
      state.isLoading = true;
  })
  .addCase(forgetPassToken.fulfilled, (state,action)=>{
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.gettoken = action.payload;
      if(state.isSuccess === true){
          toast.success("Email Sent Successful")
      }
  })
  .addCase(forgetPassToken.rejected, (state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError === true){
          toast.error("No Email Sent")
      }
  })
  .addCase(resetPassToken.pending, (state)=> {
    state.isLoading = true;
})
.addCase(resetPassToken.fulfilled, (state,action)=>{
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.setpass = action.payload;
    if(state.isSuccess === true){
        toast.success("Password Reset Successful")
    }
})
.addCase(resetPassToken.rejected, (state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.error;
    if(state.isError === true){
        toast.error("No Password Reset")
    }
})
  },
});

export default authSlice.reducer