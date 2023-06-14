import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";

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
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i,
      title: productState[i].title,
      description: productState[i].description,
      category: productState[i].category,
      brand: productState[i].brand,
      price: `$ ${productState[i].price}`,
      action:(
         <>
          <Link to="/"><BiEdit style={{"color":"green"}} className="fs-4 text-decoration-none" /> </Link>
          <Link to="/"> <AiFillDelete style={{"color":"red"}} className="fs-4 text-decoration-none" /></Link>
         </>
         )
    });
  }
  
  return (
    <div>
      <h3 className="mb-4 title">Products </h3>
      <div>
        <Table columns={columns} dataSource={data1} className="bg-white" />
      </div>
    </div>
  );
};

export default ProductList;
