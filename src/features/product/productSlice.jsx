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

export const getRating = createAsyncThunk(
  "product/get-productrating",
  async (thunkApi) => {
    try {
      return await productService.getProductRating();
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

export const deleteAProd = createAsyncThunk(
  "product/delete-product",
  async (id, thunkApi) => {
    try {
      return await productService.deleteProd(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkApi) => {
    try {
      return await productService.getProd(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const updateAProd = createAsyncThunk(
  "product/update-product",
  async (prod, thunkApi) => {
    try {
      return await productService.updateProd(prod);
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
          .addCase(deleteAProd.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteAProd.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deleted = action.payload;
          })
          .addCase(deleteAProd.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
          })
          .addCase(getAProduct.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.productTitle = action.payload.title;
            state.productDescription = action.payload.decription;
            state.productBrand = action.payload.brand;
            state.productCategory = action.payload.category;
            state.productPrice = action.payload.price;
            state.productQuantity = action.payload.quantity;
            state.productImage = action.payload.images;
            state.productColor = action.payload.color[0].title;
            state.productTag = action.payload.tags;
          })
          .addCase(getAProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
          })
          .addCase(updateAProd.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateAProd.fulfilled, (state, action) => {
            (state.isLoading = false),
              (state.isError = false),
              (state.isSuccess = true),
              (state.updatedproduct = action.payload);
          })
          .addCase(updateAProd.rejected, (state, action) => {
            (state.isLoading = false),
              (state.isError = true),
              (state.isSuccess = false),
              (state.message = action.error);
          })
          .addCase(getRating.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getRating.fulfilled, (state, action) => {
            (state.isLoading = false),
              (state.isError = false),
              (state.isSuccess = true),
              (state.rating = action.payload);
          })
          .addCase(getRating.rejected, (state, action) => {
            (state.isLoading = false),
              (state.isError = true),
              (state.isSuccess = false),
              (state.message = action.error);
          })
          .addCase(resetState, () => initialState);
    }
})

export default productSlice.reducer