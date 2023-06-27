import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast} from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getproCategory } from "../features/catgeory/proCatSlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImage, uploadImage } from "../features/upload/uploadSlice";
import { useNavigate,useLocation } from "react-router-dom";
import { createProducts,getAProduct,resetState, updateAProd } from "../features/product/productSlice";

let userSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.string().required("Price is Required"),
  category: Yup.string().required("Category is Required"),
  brand: Yup.string().required("Brand is Required"),
  color: Yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: Yup.string().required("Quantity is Required"),
  tags: Yup.string().required("Tags is Required"),
});
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [color, setColor] = useState([]);

  const local = useLocation()
  const getProdID = local.pathname.split("/")[3]

  useEffect(()=>{
    if(getProdID !== undefined){
      dispatch(getAProduct(getProdID))
      img.push(productImage)
    }else{
      dispatch(resetState())
    }
  },[getProdID])
  
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getproCategory());
    dispatch(getColors());
  }, []);

 

  const brandState = useSelector((state) => state.brand.brands);
  const proCatState = useSelector((state) => state.proCat.proCategory);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const {
    isError, 
    isLoading, 
    isSuccess, 
    createdProduct,
    productTitle, 
    productDescription,
    productImage,
    productCategory,
    productBrand,
    productPrice,
    productQuantity,
    productTag,
    productColor,
    updatedProduct
  } = newProduct
  



  useEffect(()=> {
    if(isSuccess && createdProduct){
      toast.success('Product Added Successfully!');
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfullly!");
    }
    if(isError){
      toast.error('Sorry! Server Error');
    }
  },[isError, isLoading, isSuccess])

  const coloropt = [];
  colorState?.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });


  const img = []
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      secure_url: i.secure_url,
    });
  });
  
  useEffect(() => {
    formik.values.color = color ? color : " " ;
    formik.values.images = img;
  },[color,productImage])

  


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productTitle || "",
      description: productDescription || "",
      price: productPrice || "",
      category: productCategory || "",
      brand: productBrand || "",
      color: productColor || "",
      quantity: productQuantity || "",
      tags: productTag || "",
      images: ""
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(getProdID !== undefined){
        dispatch(getAProduct(getProdID))
        const data = {id:getProdID, prodData: values}
        dispatch(updateAProd(data))
      }else{
        dispatch(createProducts(values))
      }
      formik.resetForm()
      setTimeout(()=> {
        navigate("/admin/product-list")
      },300)
    },
  });

  const handleColors = (e) => {
    setColor(e)
    // console.log(e);
    
    
  }

  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    // e.target.value
    setDesc(e);
  };
  return (
    <div className="d-flex gap-3 flex-column">
      <h3 className="mb-4 title">{getProdID !== undefined ? "Edit Product": "Add Product"}</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Title"
            name="title"
            onCh={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error text-center">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-3 mt-3">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              val={formik.values.description}
            />
            <div className="error text-center">
              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </div>
          </div>
          <CustomInput
          
            type="number"
            label="Enter Product Price"
            name="price"
            val={formik.values.price}
            onCh={formik.handleChange("price")}
          />
          <div className="error text-center">
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>
          <select
            name="category"
            val={formik.values.category}
            onChange={formik.handleChange("category")}
            id=""
            className="form-control py-3 mt-3 mb-3"
          >
            <option value="">Select Product Category</option>
            {proCatState.map((i, j) => {
              return (
                <option value={i.title} key={j}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error text-center">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          <select
            name="brand"
            val={formik.values.brand}
            onChange={formik.handleChange("brand")}
            id=""
            className="form-control py-3 mb-3"
          >
            <option value="">Select Product Brand</option>
            {brandState.map((i, j) => {
              return (
                <option value={i.title} key={j}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error text-center">
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select color"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
           <div className="error text-center">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            val={formik.values.quantity}
            onCh={formik.handleChange("quantity")}
          />
          <div className="error text-center">
            {formik.touched.quantity && formik.errors.quantity ? (
              <div>{formik.errors.quantity}</div>
            ) : null}
          </div>
          <select
            name="Tags"
            val={formik.values.tags}
            onChange={formik.handleChange("tags")}
            id=""
            className="form-control mt-3 py-3 mb-3"
          >
            <option value="" >Select Tags</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error text-center">
            {formik.touched.tags && formik.errors.tags ? (
              <div>{formik.errors.tags}</div>
            ) : null}
          </div>
          <div className="bg-white border-1 p-5 mt-3 text-center">
          <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
          </div>
          <div className="showImages mt-3 d-flex flex-wrap gap-3">
            {
              imgState.map((i,j) => {
                return (
                  <div key={j} className="position-relative">
                    <button 
                    onClick={()=> dispatch(delImage(i.public_id))}
                    type="button"
                    className="position-absolute btn-close fs-5" 
                    style={{top:"10px", right:"10px"}}></button>
                    <img src={i.secure_url} alt="" width={200} height={200} />
                  </div>
                )
              })
            }
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-3"
          >
            {getProdID !== undefined ? "Edit Product": "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
