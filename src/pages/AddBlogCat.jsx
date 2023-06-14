import React,{useEffect} from 'react'
import CustomInput from '../components/CustomInput'
import * as Yup from "yup";
import { toast} from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createBlogCat, getABlogCategory, resetState, updateABlogCategory } from '../features/catgeory/blogCatSlice'

let userSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
});


const AddBlogCat = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const local = useLocation()
  const getBlogCatID = local.pathname.split("/")[3]
  
  const newBlogCat = useSelector((state)=>state.blogCat)
  const {isSuccess, isError, isLoading, createdblogCategory,blogcatName,updatedblogcategory} = newBlogCat 

  useEffect(()=>{
    if(getBlogCatID !== undefined){
      dispatch(getABlogCategory(getBlogCatID))
    }else{
      dispatch(resetState())
    }
  },[getBlogCatID])

  useEffect(()=>{
    if(isSuccess && createdblogCategory){
      toast.success("Blog Category Added Successfuly")
    }
    if(isSuccess && updatedblogcategory){
      toast.success("Blog Category Updated Successfuly")
    }
    if(isError){
      toast.error("SomeThing Went Wrong")
    }
  },[isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogcatName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(getBlogCatID !== undefined) {
        const data = {id: getBlogCatID, blogCatData: values}
        dispatch(updateABlogCategory(data))
      }else{
        dispatch(createBlogCat(values))
      }
      formik.resetForm()
      setTimeout(()=> {
        dispatch(resetState())
        navigate("/admin/blog-category-list")
      },300)
    },
  });


  return (
    <div>
      <h3 className="mb-3 title">{getBlogCatID !== undefined ? "Edit" : " Add "} Blog Category</h3>
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
            {getBlogCatID !== undefined ? "Edit" : " Add "} Blog Category
        </button>
      </form>
    </div>
  )
}

export default AddBlogCat