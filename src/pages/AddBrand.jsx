import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import * as Yup from "yup";
import { toast} from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createBrands, getABrand, resetState, updateABrand } from "../features/brand/brandSlice";


let userSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
});
const AddBrand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const locale = useLocation()
  const getBrandId = locale.pathname.split("/")[3]
  const newBrand = useSelector((state) => state.brand);
  const {isError, isLoading, isSuccess, createdbrands, brandName, updatedbrand} = newBrand

  useEffect(()=>{
    if(getBrandId !== undefined){
      dispatch(getABrand(getBrandId))
    }else{
      dispatch(resetState())
    }
  },[getBrandId])

  
  useEffect(()=> {
    if (isSuccess && createdbrands) {
      toast.success("Brand Added Successfullly!");
    }
    if(isSuccess && updatedbrand){
      toast.success("Brand Updated Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  },[isError, isLoading, isSuccess])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(getBrandId !== undefined){
        const data={id: getBrandId, brandData: values}
        dispatch(updateABrand(data))
      }else{
        dispatch(createBrands(values))
      }
      formik.resetForm()
      setTimeout(()=> {
        dispatch(resetState())
        navigate("/admin/brand-list")
      },300)
    },
  });


  return (
    <div>
      <h3 className="mb-3 title"> {getBrandId !== undefined ? "Edit" : " Add "} Brand</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput 
        type="text" 
        label="Enter Brand"
        name="title"
        onCh={formik.handleChange("title")}
        val={formik.values.title}
        />
          <div className="error text-center">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
        <button
        type="submit" 
        className="btn btn-success border-0 rounded-3 my-3">
           {getBrandId !== undefined ? "Edit" : " Add "} Brand
        </button>
      </form>
    </div>
  )
}

export default AddBrand