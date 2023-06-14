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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Order Date",
      dataIndex: "date",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
 
  
const ViewOrder = () => {
  const options = { year: 'numeric', month: 'long`', day: 'numeric' };
  const dispatch = useDispatch()

  const local = useLocation()
  const orderId = local.pathname.split("/")[3]

  useEffect(() => {
    dispatch(getSingleOrders(orderId))
  },[])

  // const orderState = useSelector((state) => state.auth.orders)
  // console.log(orderState);
  // const data1 = [];
  // for (let i = 0; i < orderState.length; i++) {
  //   data1.push({
  //     key: i,
  //     name: orderState[i].orderBy.firstname + " " + orderState[i].orderBy.lastname,
  //     product: orderState[i].products?.product?.title,
  //     date: new Date(orderState[i].createdAt).toLocaleString('ur-PK', {
  //       day: 'numeric',
  //       month: 'numeric',
  //       year: 'numeric',
  //       hour: 'numeric',
  //       minute: 'numeric'
  //     }),
  //     amount: orderState[i].paymentIntent.amount,
  //     status: orderState[i].orderStatus,
  //   });
  // }

  return (
    <div>
    <h3 className="mb-4 title">View Order </h3>
    <div>
    {/* <Table columns={columns} dataSource={data1}  className="bg-white"/> */}
    </div>
</div>
  )
}

export default ViewOrder