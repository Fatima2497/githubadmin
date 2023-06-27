import React,{useState} from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from '../components/CustomInput';
import {FiEdit} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getaUser, updateUser } from '../features/auth/authSlice';
import { useLocation } from 'react-router-dom';


const profileSchema = yup.object({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is Required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email should be valid "),
    mobile: yup.string().required("Mobile is required"),
  });

const Profile = () => {
    const [edit, setEdit] = useState(true)
    const dispatch = useDispatch()
    const locat = useLocation()
    
    const getUserId = locat.pathname.split("/")[3]
    useEffect(()=>{
        dispatch(getaUser(getUserId))
    },[])

    const authState = useSelector((state)=>state.auth)

    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          // firstname: authState?.firstname,
          // lastname: authState?.lastname,
          // mobile: authState?.mobile,
          // email: authState?.email
          firstname: "",
          lastname:"",
          mobile: "",
          email: ""
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values))
          dispatch(updateUser(values))
          setEdit(true)
        }
      });
  
  
      return (
    <div>
        <h3>Update Profile</h3>
        <FiEdit className='fs-3 d-s' onClick={()=>setEdit(false)}/>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-3">
                <CustomInput
                  type="text"
                  name="firstname"
                  label="Firstname"
                  val={formik.values.firstname}
                  onCh={formik.handleChange("firstname")}
                  disabled={edit}
                />
              </div>
              <div className="error mt-2">
                {formik.touched.firstname && formik.errors.firstname}
              </div>
              <div className="mt-3">
                <CustomInput
                  type="text"
                  name="lastname"
                  label="Lastname"
                  val={formik.values.lastname}
                  onCh={formik.handleChange("lastname")}
                  disabled={edit}
                />
              </div>
              <div className="error mt-2">
                {formik.touched.lastname && formik.errors.lastname}
              </div>
              <div className="mt-3">
                <CustomInput
                  type="number"
                  name="mobile"
                  label="Mobile"
                  val={formik.values.mobile}
                  onCh={formik.handleChange("mobile")}
                  disabled={edit}
                />
              </div>
              <div className="error mt-2">
                {formik.touched.mobile && formik.errors.mobile}
              </div>
              <div className="mt-3">
                <CustomInput
                  type="email"
                  name="email"
                  label="Email"
                  val={formik.values.email}
                  onCh={formik.handleChange("email")}
                  disabled={edit}
                />
              </div>
              <div className="error mt-2">
                {formik.touched.email && formik.errors.email}
              </div>
              {
                edit === false &&
             <button type="submit" className="btn btn-success mt-3">
                Save
              </button>
              }
            </form>     
    </div>
  )
}

export default Profile