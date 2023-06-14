import React, { useEffect,useState } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from '../components/CustomModal';

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
  
const Colorlist = () => {

  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setColorId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(resetState())
    dispatch(getColors())
  },[])

  const colorState = useSelector((state) => state.color.colors)
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i,
      title: colorState[i].title,
      action:(
         <>
         <Link to={`/admin/color/${colorState[i]._id}`}><BiEdit style={{"color":"green"}} className="fs-4 text-decoration-none" /> </Link>
         <button
         className='bg-transparent border-0' 
         onClick={()=>showModal(colorState[i]._id)}
         > <AiFillDelete style={{"color":"red"}} className="fs-4 text-decoration-none" /></button>
        </>
        )
    });
  }

  const deleteColorState = useSelector((state)=> state.brand)
  const {isSuccess, isLoading, isError, deletedcolor} = deleteColorState

  useEffect(()=> {
    if(isSuccess && deletedcolor){
      toast.success("Color Deleted")
    }
    if(isError){
      toast.error("No Color Deleted! There is something wrong")
    }
  },[isSuccess, isLoading, isError, deletedcolor])
  const deleteColor = (e) => {
    dispatch(deleteAColor(e))
    dispatch(resetState())
    dispatch(getColors())
    setOpen(false)
  }
  return (
    <div>
    <h3 className="mb-4 title">Colors </h3>
    <div>
    <Table columns={columns} dataSource={data1}  className="bg-white"/>
    </div>
    <CustomModal
     hideModal={hideModal} 
     open={open} 
     performAction={()=>{
       deleteColor(colorId)
     }}
     title="Are you sure you want to delete this Color?"
    />
</div>
  )
}

export default Colorlist