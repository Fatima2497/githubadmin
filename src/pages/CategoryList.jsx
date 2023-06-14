import React, { useEffect,useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProCategory, getproCategory, resetState } from "../features/catgeory/proCatSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pcatId, setpCatId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState())
    dispatch(getproCategory());
  }, []);

  const proCatState = useSelector((state) => state.proCat.proCategory);
  // const prodCatState = useSelector((state)=> state.brand)
  // const {isSuccess, isLoading, isError, deletedproCategory} = prodCatState
  // useEffect(()=> {
  //   if(isSuccess && deletedproCategory){
  //     toast.success("Category Deleted")
  //   }
  //   if(isError){
  //     toast.error("No Color Deleted! There is something wrong")
  //   }
  // },[isSuccess, isLoading, isError, deletedproCategory])
  const data1 = [];
  for (let i = 0; i < proCatState.length; i++) {
    data1.push({
      key: i,
      title: proCatState[i].title,
      action: (
        <>
          <Link to={`/admin/category/${proCatState[i]._id}`}>
            <BiEdit
              style={{ color: "green" }}
              className="fs-4 text-decoration-none"
            />
          </Link>
          <button 
          className="bg-transparent border-0"
          onClick={()=>showModal(proCatState[i]._id)}
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



  const deleteCategory = (e) => {
    dispatch(deleteAProCategory(e))
    dispatch(resetState())
    dispatch(getproCategory())
    setOpen(false)
  }
  return (
    <div>
      <h3 className="mb-4 title">Categories </h3>
      <div>
        <Table columns={columns} dataSource={data1} className="bg-white" />
      </div>
      <CustomModal
     hideModal={hideModal} 
     open={open} 
     performAction={()=>{
       deleteCategory(pcatId)
     }}
     title="Are you sure you want to delete this Product Category?"
    />
    </div>
  );
};

export default CategoryList;
