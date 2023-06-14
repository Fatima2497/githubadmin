import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import * as Yup from "yup";
import { toast} from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createColors, getAColor, resetState, updateAColor } from '../features/color/colorSlice';

let userSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
});


const AddColor = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const localation = useLocation()
  const getColorId = localation.pathname.split("/")[3]

  const newColor = useSelector((state)=> state.color)
  const {isSuccess, isError, isLoading, savecolors, colorName, updatedcolor} = newColor

  useEffect(()=>{
    if(getColorId !== undefined){
      dispatch(getAColor(getColorId))
    }else{
      dispatch(resetState())
    }
  },[getColorId])

  useEffect(()=>{
    if(isSuccess && savecolors){
      toast.success("Color Added successfully")
    }
    if(isSuccess && updatedcolor){
      toast.success("Color Updated successfully")
    }
    if(isError){
      toast.error("SomeThing Went Wrong")
    }
  },[isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(getColorId !== undefined){
        const data = {id: getColorId, colorData: values}
        dispatch(updateAColor(data))
      }else{
        dispatch(createColors(values))
      }
      formik.resetForm()
      setTimeout(()=> {
        dispatch(resetState())
        navigate("/admin/color-list")
      },300)
    },
  });


  return (
    <div>
      <h3 className="mb-3 title">{getColorId !== undefined ? "Edit" : "Add"} Color</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput 
        type="color" 
        label="Enter Color" 
        name="title"
        onCh={formik.handleChange("title")}
        val={formik.values.title}
        i_id="color"
        />
         <div className="error text-center">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
        <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
        {getColorId !== undefined ? "Edit" : "Add"} Color
        </button>
      </form>
    </div>
  )
}

export default AddColor