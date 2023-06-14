import React, { useEffect,useState } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import {deleteACoupon, getCoupons, resetState} from '../features/coupon/couponSlice'
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
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(resetState())
    dispatch(getCoupons())
  },[])

  const couponState = useSelector((state)=> state.coupon.coupons)
  const data1 = [];
  for (let i = 0; i < couponState.length ; i++) {
  data1.push({
    key: i,
    name: couponState[i].name,
    expiry: new Date(couponState[i].expiry).toLocaleString('ur-PK', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }),
    discount: couponState[i].discount,
    action: (
        <>
          <Link to={`/admin/add-coupon/${couponState[i]._id}`}>
            <BiEdit
              style={{ color: "green" }}
              className="fs-4 text-decoration-none"
            />
          </Link>
          <button
          onClick={()=>showModal(couponState[i]._id)}
          className='bg-transparent border-0'>
            <AiFillDelete
              style={{ color: "red" }}
              className="fs-4 text-decoration-none"
            />
          </button>
        </>
      ),
  });
}
const deleteCoupon = (e) => {
  dispatch(deleteACoupon(e))
  dispatch(resetState())
  dispatch(getCoupons())
  setOpen(false)
}

  return (
    <div>
    <h3 className="mb-4 name">CouponList</h3>
    <div>
    <Table columns={columns} dataSource={data1}  className="bg-white"/>
    </div>
    <CustomModal 
     hideModal={hideModal} 
     open={open} 
     performAction={()=>{
       deleteCoupon(couponId)
     }}
     title="Are you sure you want to delete this Coupon?"
    />
    </div>
  )
}

export default CouponList