import React, { useEffect,useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { delteABrand, getBrands, resetState } from "../features/brand/brandSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

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

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i,
      title: brandState[i].title,
      action: (
        <>
          <Link to={`/admin/brand/${brandState[i]._id}`}>
            <BiEdit
              style={{ color: "green" }}
              className="fs-4 text-decoration-none"
            />
          </Link>
          <button className="bg-transparent border-0"
          onClick={()=>showModal(brandState[i]._id)}
          >
            <AiFillDelete
              style={{ color: "red" }}
              className="fs-4 text-decoration-none"
            />
          </button >
        </>
      ),
    });
  }

  const deleteBrandState = useSelector((state)=> state.brand)
  const {isSuccess, isLoading, isError, deletedbrand} = deleteBrandState

  useEffect(()=> {
    if(isSuccess && deletedbrand){
      toast.success("Brand Deleted")
    }
    if(isError){
      toast.error("No Brand Deleted! There is something wrong")
    }
  },[isSuccess, isLoading, isError, deletedbrand])
  const deleteBrand = (e) => {
    dispatch(delteABrand(e))
    dispatch(resetState())
    dispatch(getBrands())
    setOpen(false)
  }
  return (
    <div>
      <h3 className="mb-4 title">Brands </h3>
      <div>
        <Table columns={columns} dataSource={data1} className="bg-white" />
      </div>
      <CustomModal 
      hideModal={hideModal} 
      open={open} 
      performAction={()=>{
        deleteBrand(brandId)
      }}
      title="Are you sure you want to delete this Brand? "/>
    </div>
  );
};

export default Brandlist;
