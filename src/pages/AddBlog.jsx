import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImage, uploadImage } from "../features/upload/uploadSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {getBlogCategory} from '../features/catgeory/blogCatSlice'
import { createBlog, getABlog, resetState, updateABlog} from "../features/blog/blogSlice";

let userSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const local = useLocation()
  const getBlogID = local.pathname.split("/")[3]

 useEffect(()=>{
  if(getBlogID !== undefined) {
    dispatch(getABlog(getBlogID))
    img.push(blogImage)
  }else{
    dispatch(resetState())
  }
 },[getBlogID])

  useEffect(()=>{
    dispatch(resetState())
    dispatch(getBlogCategory())
  },[])

  const blogState = useSelector((state) => state.blogCat.blogCategory);
  const imgState = useSelector((state) => state.upload.images);
  const forblog = useSelector((state)=> state.blog)
  const {
    isSuccess, 
    isError, 
    isLoading, 
    newblog,
    blogName,
    blogDesc,
    blogCategory,
    blogImage,
    updatedblog} = forblog

  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      secure_url: i.secure_url,
    });
  });

  useEffect(() => {
    if (isSuccess && newblog) {
      toast.success("Blog Added Successfullly!");
    }
    if (isSuccess && updatedblog) {
      toast.success("Blog Updated Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  
  useEffect(() => {
    formik.values.images = img;
  }, [blogImage]);



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName|| "",
      description: blogDesc || "",
      category: blogCategory || "",
      images:  "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(getBlogID !== undefined){
        dispatch(getABlog(getBlogID))
        const data = {id: getBlogID, blogData: values }
        dispatch(updateABlog(data))
      }else{
        dispatch(createBlog(values));
      }
      
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
        navigate("/admin/blog-list");
      }, 300);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getBlogID !== undefined ? "Edit" : "Add"} Blog</h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error text-center">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <select
            name="category"
            val={formik.values.category}
            onChange={formik.handleChange("category")}
            id=""
            className="form-control py-3 mt-3 mb-3"
          >
            <option value="">Select Blog Category</option>
            {
              blogState.map((i,j)=>{
                return(
                  <option value={i.title} key={j}>
                    {i.title}
                  </option>
                )
              })
            }
            
          </select>
          <div className="error text-center">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
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
          <div className="bg-white border-1 p-5 mt-3 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showImages mt-3 d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
              return (
                <div key={j} className="position-relative">
                  <button
                    onClick={() => dispatch(delImage(i.public_id))}
                    type="button"
                    className="position-absolute btn-close fs-5"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.secure_url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-3">
          {getBlogID !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
