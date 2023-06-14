import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {createCoupons, getACoupon, resetState, updateACoupon} from '../features/coupon/couponSlice'


let userSchema = Yup.object({
  name: Yup.string().required("Coupon Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount is Required"),
})

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const local = useLocation()
  const getCouponId = local.pathname.split("/")[3]

  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdcoupons,updatedcoupons, couponName,couponExpiry,couponDiscount } = newCoupon;

  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(()=> {
    if(getCouponId !== undefined){
      dispatch(getACoupon(getCouponId))
    }else{
      dispatch(resetState())
    }
  },[getCouponId])

  useEffect(()=>{
    if(isSuccess && createdcoupons){
      toast.success("Coupon Added successfully")
    }
    if(isSuccess && updatedcoupons){
      toast.success("Coupon Updated successfully")
    }
    if(isError){
      toast.error("SomeThing Went Wrong")
    }
  },[isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormet(couponExpiry) || "",
      discount: couponDiscount || ""
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(getCouponId !== undefined){
        const data = {id:getCouponId, couponData: values}
        dispatch(updateACoupon(data))
      }else{
        dispatch(createCoupons(values))
      }
      formik.resetForm()
      setTimeout(()=> {
        dispatch(resetState())
        navigate("/admin/coupon-list")
      },200)
     },
  });
  return (
    <div>
      <h3 className="mb-3 title">{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Coupon"
          name="name"
          onCh={formik.handleChange("name")}
          val={formik.values.name}
          i_id="name"
        />

        <div className="error text-center">
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <CustomInput
          type="date"
          label="Enter Coupon"
          name="expiry"
          onCh={formik.handleChange("expiry")}
          val={formik.values.expiry}
          i_id="date"
        />

        <div className="error text-center">
          {formik.touched.expiry && formik.errors.expiry ? (
            <div>{formik.errors.expiry}</div>
          ) : null}
        </div>
        <CustomInput
          type="number"
          label="Enter Coupon"
          name="discount"
          onCh={formik.handleChange("discount")}
          val={formik.values.discount}
          i_id="discount"
        />

        <div className="error text-center">
          {formik.touched.discount && formik.errors.discount ? (
            <div>{formik.errors.discount}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-3"
        >
          {getCouponId !== undefined ? "Edit" : "Add"} Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
