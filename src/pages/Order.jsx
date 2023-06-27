import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getAllOrders } from "../features/auth/authSlice";

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
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Order = () => {
  const options = { year: "numeric", month: "long`", day: "numeric" };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i,
      name:
        orderState[i]?.shippingInfo?.firstname +
        " " +
        orderState[i]?.shippingInfo?.lastname,
      product: <Link to={`/admin/order/${orderState[i]._id}`}>View Order</Link>,
      date: new Date(orderState[i].createdAt).toLocaleString("ur-PK", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
      amount: orderState[i]?.totalAmount,
      status: orderState[i].orderStatus,
      action: (
        <>
          <Link to="/">
            <BiEdit
              style={{ color: "green" }}
              className="fs-4 text-decoration-none"
            />{" "}
          </Link>
          <button>
            <AiFillDelete
              style={{ color: "red" }}
              className="border-0 bg-transparent fs-4 text-decoration-none"
            />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Order </h3>
      <div>
        <Table columns={columns} dataSource={data1} className="bg-white" />
      </div>
    </div>
  );
};

export default Order;
