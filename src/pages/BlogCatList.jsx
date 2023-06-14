import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { useDispatch,useSelector } from 'react-redux';
import { getBlogCategory, resetState } from '../features/catgeory/blogCatSlice';
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { deleteABlogCategory } from '../features/catgeory/blogCatSlice';

const columns = [
    {
      title: "Sno",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  
  
const BlogCatList = () => {

  const [open, setOpen] = useState(false);
  const [blogcatId, setblogCatId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(resetState())
    dispatch(getBlogCategory())
  },[])

  const blogState = useSelector((state) => state.blogCat.blogCategory)
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i,
      title: blogState[i].title,
      action: (
        <>
          <Link to={`/admin/category-blog/${blogState[i]._id}`}>
            <BiEdit
              style={{ color: "green" }}
              className="fs-4 text-decoration-none"
            />
          </Link>
          <button  className='bg-transparent border-0'
        onClick={()=>showModal(blogState[i]._id)}>
            <AiFillDelete
              style={{ color: "red" }}
              className="fs-4 text-decoration-none"
            />
          </button>
        </>
      ),
    });
  }

  const deleteblogCategory = (e) => {
    dispatch(deleteABlogCategory(e))
    dispatch(resetState())
    dispatch(getBlogCategory())
    setOpen(false)
  }
  
  return (
    <div>
    <h3 className="mb-4 title">Blog Categories </h3>
    <div>
    <Table columns={columns} dataSource={data1}  className="bg-white"/>
    <CustomModal
     hideModal={hideModal} 
     open={open} 
     performAction={()=>{
       deleteblogCategory(blogcatId)
     }}
     title="Are you sure you want to delete this Blog Category?"
    />
    </div>
</div>
  )
}

export default BlogCatList