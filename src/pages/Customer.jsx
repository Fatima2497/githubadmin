import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
    {
      title: "Sno",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.length,
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
      title: "Action",
      dataIndex: "action",
    },
  ];
  


const Customer = () => {

  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getUsers())
  },[])

  const customerstate = useSelector((state) => state.customer.customers)
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if(customerstate[i].role !== 'admin'){
      data1.push({
        key: i,
        name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email:  customerstate[i].email,
        mobile:  customerstate[i].mobile,
        action: <Link><BiEdit style={{"color":"green"}} />    <AiFillDelete style={{"color":"red"}} /> </Link>
      });
    }
  }  
 
  return (
    <div>
    <h3 className="mb-4 title">Customer </h3>
    <div>
    <Table columns={columns} dataSource={data1}  className="bg-white"/>
    </div>
</div>
  )
}

export default Customer