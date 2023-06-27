import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
// import { getOrderByUser, getOrders } from '../features/auth/authSlice';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getSingleOrders } from '../features/auth/authSlice';


const columns = [
    {
      title: "Sno",
      dataIndex: "key",
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Payement Method",
      dataIndex: "payementmethod",
    },
  ];
 
  
const ViewOrder = () => {
  const dispatch = useDispatch()

  const local = useLocation()
  const orderId = local.pathname.split("/")[3]

  useEffect(() => {
    dispatch(getSingleOrders(orderId))
  },[])

  const orderState = useSelector((state) => state.auth.singleorder)
  // console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i,
      name: orderState?.orderItems[i]?.product?.title?.substr(0,15),
      brand: orderState?.orderItems[i]?.product?.brand,
      color: (
        <>
        <ul className='list-group'>
          <li className='list-group-item' style={{backgroundColor:  orderState?.orderItems[i]?.color?.title,}}></li>
        </ul>
        </>
      ),
      quantity: orderState?.orderItems[i]?.quantity,
      payementmethod: orderState?.paymentInfo?.cashonOrder,
    });
  }
  console.log(data1);
  return (
    <div>
    <h3 className="mb-4 title">View Order </h3>
    <div>
    <Table columns={columns} dataSource={data1}  className="bg-white"/>
    </div>
</div>
  )
}

export default ViewOrder