import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrders, getOrderMonth, getOrderYearly } from "../features/auth/authSlice";
import { useState } from "react";
import { getProducts, getRating } from "../features/product/productSlice";

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

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}
const Dashboard = () => {

  const [monthly, setMonthly] = useState([])
  const [dataCount, setdataCount] = useState([])
  const dispatch = useDispatch()
  const monthlyData = useSelector((state)=> state.auth.ordermonth)
  const yearlyData = useSelector((state)=> state.auth.orderyearly)

  useEffect(()=> {
    dispatch(getOrderMonth())
    dispatch(getOrderYearly())
  },[])

  useEffect(()=> {
    let monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let data= []
    let count = []
    for(let i = 0; i < monthlyData?.length; i++){
      const element = monthlyData[i]

      data.push({type:monthName[element?._id?.month],income:element?.amount})
      count.push({type:monthName[element?._id?.month],sales:element?.count})
    }
    setMonthly(data);
    setdataCount(count)
  },[monthlyData])
  const data = [
    {
      type: "January",
      income: 38,
    },
    {
      type: "February",
      income: 52,
    },
    {
      type: "March",
      income: 61,
    },
    {
      type: "April",
      income: 145,
    },
    {
      type: "May",
      income: 48,
    },
    {
      type: "June",
      income: 38,
    },
    {
      type: "July",
      income: 38,
    },
    {
      type: "August",
      income: 38,
    },
    {
      type: "September",
      income: 38,
    },
    {
      type: "Octuber",
      income: 38,
    },
    {
      type: "November",
      income: 38,
    },
    {
      type: "December",
      income: 38,
    },
  ];
  const config = {
    data: monthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "month",
      },
      income: {
        alias: "income",
      },
    },
  };
  const config2 = {
    data: dataCount,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "month",
      },
      income: {
        alias: "sales",
      },
    },
  };

  useEffect(()=>{
    dispatch(getAllOrders())
    dispatch(getRating())
  },[])
  
  const productState = useSelector((state) => state?.product?.rating);




  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i,
      name:
        orderState[i]?.shippingInfo?.firstname +
        " " +
        orderState[i]?.shippingInfo?.lastname,
      date: new Date(orderState[i].createdAt).toLocaleString("ur-PK", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
      amount: orderState[i]?.totalAmount,
      status: orderState[i].orderStatus,
      })
    }
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex flex-grow-1 p-3 justify-content-between align-items-end bg-white p-3 rounded-3 ">
          <div>
            <p className="desc">Total Income</p> 
            <h4 className="mb-0 sub-title">$ {yearlyData?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Income in Last Year from Today</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3 ">
          <div>
            <p className="desc">Total Sales</p> 
            <h4 className="mb-0 sub-title">{yearlyData?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Sales in Last Year from Today</p>
          </div>
        </div>
      </div>
     <div className="d-flex justify-content-between gap-3">
     <div className="mt-4 flex-grow-1 w-50 bg-white p-3">
        <h3 className="mb-5">Income Static</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4 flex-grow-1 w-50 bg-white p-3">
        <h3 className="mb-5">Sales Static</h3>
        <div>
          <Column {...config2} />
        </div>
      </div>
     </div>
      <div className="mt-4 bg-white p-3">
        <h3 className=" mb-5 ">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1}  className="bg-white"/>
        </div>
      </div>
      <div className="mt-4 bg-white p-3">
        <h3 className="mb-4">Recent Reviews</h3>
        {
          productState && productState?.map((item,index)=>{
            return(
              <div className="d-flex gap-10 justify-content-between align-items-center">
          <div className="d-flex justify-content-start align-items-center gap-2">
            <div>
              <img
                src={item?.images[0]?.secure_url}
                alt="people"
                className="img-fluid"
                width={70}
                height={70}
              />
            </div>
            <div>
              <h5 className="mb-2">{item?.title}</h5>
              <p className="mb-2">{item?.ratings[0]?.postedBy?.firstname + " " + item?.ratings[0]?.postedBy?.lastname}</p>
              <p className="mb-2">{item?.ratings[0]?.comment}</p>
            </div>
          </div>
          <div>
            <ReactStars count={5} value={Number(item?.totalrating)}size={24} edit={false} activeColor="#ffd700" />,
          </div>
        </div>
            )
          }
          )
          
        }
      </div>
    </div>
  );
};

export default Dashboard;
