import React from "react";
import CustomInput from "../components/CustomInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassToken } from "../../../gadgetHub/src/features/user/userSlice";

const passwordSchema = yup.object({
  password: yup.string().required("Password is required"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetPassToken({ token: getToken, password: values.password }));
      navigate("/");
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
            <h3 className="text-center title">Reset Password</h3>
            <p className="text-center">Please Enter your new Password.</p>
            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                type="password"
                label="Password"
                id="pass"
                val={formik.values.password}
                onCh={formik.handleChange("password")}
              />
              <div className="error">
                {formik.touched.password && formik.errors.password}
              </div>
              <button
                className="border-0 px-3 py-2 mt-3 text-white fw-bold w-100"
                style={{ background: "#ffd333" }}
                type="submit"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
