import React from 'react'
import CustomInput from '../components/CustomInput'
import * as Yup from "yup";
import { toast} from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from 'react';
import { createProCat, getAProCategory, resetState, updateAProCategory } from '../features/catgeory/proCatSlice';


let userSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
});



const AddCategory = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const local = useLocation()
  const getcategoryID = local.pathname.split("/")[3]

  const newCategory = useSelector((state) => state.proCat);
  const {isSuccess, isError, isLoading, createproCategory, procatName, updatedproCategory} = newCategory

  useEffect(()=>{
    if(getcategoryID !== undefined){
      dispatch(getAProCategory(getcategoryID))
    }else{
      dispatch(resetState())
    }
  },[getcategoryID])

  useEffect(()=>{
    if(isSuccess && createproCategory){
      toast.success("Category Added successfully")
    }
    if(isSuccess && updatedproCategory){
      toast.success("Category Updated successfully")
    }
    if(isError){
      toast.error("SomeThing Went Wrong")
    }
  },[isSuccess, isError, isLoading])


  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: procatName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(getcategoryID !== undefined){
        const data = {id: getcategoryID, prodcatData: values}
        dispatch(updateAProCategory(data))
      }else{
        dispatch(createProCat(values))
      }
      formik.resetForm()
      setTimeout(()=> {
        dispatch(resetState())
        navigate("/admin/category-list")
      },300)
    },
  });


  return (
    <div>
      <h3 className="mb-4 title">{getcategoryID !== undefined ? "Edit" : "Add"} Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput 
        type="text" 
        label="Enter Category" 
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
        type='submit'
        className="btn btn-success border-0 rounded-3 my-3">
            {getcategoryID !== undefined ? "Edit" : "Add"} Category
        </button>
      </form>
    </div>
  )
}

export default AddCategory