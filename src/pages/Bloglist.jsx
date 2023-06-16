import React, { useEffect,useState } from 'react'

import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { delteABlog, getBlogs, resetState } from '../features/blog/blogSlice';
import CustomModal from "../components/CustomModal";

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
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Like",
    dataIndex: "like",
  },
  {
    title: "Dislike",
    dataIndex: "dislike",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setblogId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getBlogs())
  },[])

  const blogState = useSelector((state)=> state.blog.blogs)
  const data1 = [];
for (let i = 0; i < blogState.length; i++) {
  data1.push({
    key: i,
    title: blogState[i].title,
    description: blogState[i].description,
    category: blogState[i].category,
    like: blogState[i].like,
    dislike: blogState[i].dislike,
    action: (
      <>
        <Link to={`/admin/add-blog/${blogState[i]._id}`}>
          <BiEdit
            style={{ color: "green" }}
            className="fs-4 text-decoration-none"
          />
        </Link>
        <button 
        className='bg-transparent border-0'
        onClick={()=>showModal(blogState[i]._id)}
        >
          <AiFillDelete
            style={{ color: "red" }}
            className="fs-4 text-decoration-none"
          />
        </button>
      </>
    ),
  });
}

const deleteBlog = (e) => {
  dispatch(delteABlog(e))
  dispatch(resetState())
  dispatch(getBlogs())
  setOpen(false)
} 
  return (
    <div>
    <h3 className="mb-4 title">BlogList</h3>
    <div>
    <Table columns={columns} dataSource={data1}  className="bg-white"/>
    </div>
    <CustomModal
     hideModal={hideModal} 
     open={open} 
     performAction={()=>{
       deleteBlog(blogId)
     }}
     title="Are you sure you want to delete this Blog?"
    />
</div>
  )
}

export default Bloglist