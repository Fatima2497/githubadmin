import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice"
import customerReducer from '../features/customers/customerSlice'
import productReducer from '../features/product/productSlice'
import brandReducer from '../features/brand/brandSlice'
import colorReducer from '../features/color/colorSlice'
import proCatReducer from '../features/catgeory/proCatSlice'
import enquiryReducer from '../features/enquiry/enquirySlice'
import blogCatReducer from '../features/catgeory/blogCatSlice'
import blogReducer from '../features/blog/blogSlice'
import uploadReducer from '../features/upload/uploadSlice'
import couponReducer from '../features/coupon/couponSlice'

  
export const store = configureStore({
    reducer: {
        auth: authReducer, 
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        color: colorReducer,
        proCat: proCatReducer,
        enquiry: enquiryReducer,
        blogCat: blogCatReducer,
        blog: blogReducer,
        upload: uploadReducer,
        coupon: couponReducer,
    },
    middleware: getDefaultMiddleware ({
        serializableCheck: false
      })
   
})