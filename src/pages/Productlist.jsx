import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProd, getProducts, resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "Sno",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  // {
  //   title: "Description",
  //   dataIndex: "description",
  // },
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
  const [open, setOpen] = useState(false);
  const [prodId,setProdId] = useState("")
  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetState())
  }, []);

  const showModal = (e) => {
    setOpen(true);
    setProdId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i,
      title: productState[i].title,
      // description: (
      //   <>
      //   <p dangerouslySetInnerHTML={{__html: productState[i].description}}></p>
      //   </>
      //   ),
      category: productState[i].category,
      brand: productState[i].brand,
      price: `$ ${productState[i].price}`,
      action:(
         <>
          <Link to={`/admin/product/${productState[i]._id}`}><BiEdit style={{"color":"green"}} className="fs-4 text-decoration-none" /> </Link>
          <button
          onClick={()=>showModal(productState[i]._id)}
          className="border-0 bg-transparent"
          > 
            <AiFillDelete style={{"color":"red"}} className="fs-4 text-decoration-none" />
          </button>
         </>
         )
    });
  }
  const deleteProd = (e) => {
 
    dispatch(deleteAProd(e))
    dispatch(resetState())
    dispatch(getProducts())
    setOpen(false)
  } 
  return (
    <div>
      <h3 className="mb-4 title">Products </h3>
      <div>
        <Table columns={columns} dataSource={data1} className="bg-white" />
      </div>
      <CustomModal
     hideModal={hideModal} 
     open={open} 
     performAction={()=>{
       deleteProd(prodId)
     }}
     title="Are you sure you want to delete this Product?"
    />
    </div>
  );
};

export default ProductList;
