import React from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { forgetPassToken } from "../features/auth/authSlice";

const forgetSchema = yup.object({
  email: yup.string().required("Email is required"),
});

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetSchema,
    onSubmit: (values) => {
      dispatch(forgetPassToken(values));
    },
  });
  return (
    <>
      <div className="py-5" style={{ minHeight: "100vh" }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="main-div">
          <div className="my-5 main-form bg-white rounded-3 mx-auto p-4">
            <h3 className="text-center title">Forgot Password</h3>
            <p className="text-center">
              Please Enter your email to get the reset password mail.
            </p>
            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                type="email"
                label="Email Address"
                id="email"
                val={formik.values.email}
                onCh={formik.handleChange("email")}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
              <button
                className="border-0 px-3 py-2 mt-3 text-white fw-bold w-100"
                style={{ background: "#ffd333" }}
                type="submit"
              >
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
