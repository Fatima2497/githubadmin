import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteEnquriry, getEnquries, resetState, updateEnquriry } from "../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import { AiFillDelete,AiOutlineEye } from "react-icons/ai";
import CustomModal from '../components/CustomModal';
import { toast } from "react-toastify";


const columns = [
  {
    title: "Sno",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiry = () => {
  
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("")

  const showModal = (e) => {
    setOpen(true);
    setenqId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getEnquries());
  }, []);

  const enquiryState = useSelector((state) => state.enquiry.enquiry);
  const {isSuccess, isLoading, isError, updatedenq} = enquiryState
  useEffect(()=>{
    if(isSuccess && updatedenq){
      toast.success("Status Updated")
    }
    if(isError){
      toast.error("Server Error")
    }
  },[])
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: (
        <>
        <select name="" id="" 
                    defaulValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"} 
                    className='form-control form-select'
                    onChange={(e)=>setEnq(e.target.value, enquiryState[i]._id)}
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Progress">Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
        </>
      ),
      action: (
        <>
          <Link to={`/admin/enquiry/${enquiryState[i]._id}`}>
            <AiOutlineEye
              style={{ color: "green" }}
              className="fs-4 text-decoration-none"
            />
          </Link>
          <button 
          onClick={()=>showModal(enquiryState[i]._id)}
          className="bg-transparent border-0">
            <AiFillDelete
              style={{ color: "red" }}
              className="fs-4 text-decoration-none"
            />
          </button>
        </>
      ),
    });
  }

  const deleteEnquiry = (e) => {
    dispatch(deleteEnquriry(e))
    setOpen(false)
    dispatch(resetState())
    setTimeout(()=>{
      dispatch(getEnquries())
    },100)
  }

  const setEnq = (e,i) => {
    const data = {id: i, enqData: e}
    dispatch(updateEnquriry(data))
    dispatch(getEnquries())
  }

  return (
    <div>
      <h3 className="mb-4 title">Enquiry</h3>
      <div>
        <Table columns={columns} dataSource={data1} className="bg-white" />
      </div>
      <CustomModal
     hideModal={hideModal} 
     open={open} 
     performAction={()=>{
       deleteEnquiry(enqId)
     }}
     title="Are you sure you want to delete this Enquiry?"
    />
    </div>
  );
};

export default Enquiry;
