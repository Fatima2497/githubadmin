import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux/es";
import { useSelector } from "react-redux";
import {login} from '../features/auth/authSlice'
import { toast } from "react-toastify";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let userSchema = Yup.object({
    email: Yup.string().email('Email should be valid').required('Email is Required'),
    password: Yup.string().required('Password is Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values))
    },
  });

 

  const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isSuccess && user) {
      toast.info("Login Successfully")
      navigate("admin")
    }
    if(isError){
      toast.error("Invalid Credential")
    }
  },[user, isLoading, isError, isSuccess, message])
  return (
    <>
      <div className="py-5 " style={{ minHeight: "100vh" }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="main-div">
          <div className="my-5 main-form bg-white rounded-3 mx-auto p-4">
            <h3 className="text-center title">Login</h3>
            <p className="text-center">Login to your account to continue.</p>
            <div className="error text-center">
              {message.message == "Rejected" ? "You are not a Admin" : ""}
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                name="email"
                type="email"
                label="Email Address"
                id="email"
                val={formik.values.email}
                onCh={formik.handleChange("email")}
              />
              <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
              </div>
              <CustomInput
                name="password"
                type="password"
                label="Password"
                id="pass"
                val={formik.values.password}
                onCh={formik.handleChange("password")}
              />
            <div className="error">
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
              <div className="mb-3 text-end mt-3">
                <Link to="forgetpassword">Forgot Password?</Link>
              </div>
              <button
                className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                style={{ background: "#ffd333" }}
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
