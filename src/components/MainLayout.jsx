import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineCustomerService,
  AiOutlineShoppingCart,
  AiOutlineBgColors,
} from "react-icons/ai";
import {RiCouponLine} from 'react-icons/ri'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SiBrandfolder,SiMarketo } from "react-icons/si";
import { BsListCheck } from "react-icons/bs";
import { BiCategoryAlt} from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import mypic from "../images/mypic2.png";

const MainLayout = () => {
  const { Header, Sider, Content } = Layout;

  let iconStyles = { color: "white" };
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h2 className="text-white fs-5 text-center py-4 mb-0">
              <span className="sm-logo">GH</span>
              <span className="lg-logo">GadGet Hub</span>
            </h2>
          </div>
          <Menu
            className="mt-5"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key === "signout") {
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <AiOutlineDashboard className="fs-5 " />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <AiOutlineCustomerService className="fs-5 " />,
                label: "Customers",
              },
              {
                key: "catalog",
                icon: <AiOutlineShoppingCart className="fs-5" style={{ iconStyles }} />,
                label: "Catalog",
                children: [
                  {
                    key: "product",
                    icon: <AiOutlineShoppingCart className="fs-5 " />,
                    label: "Add Product",
                  },
                  {
                    key: "product-list",
                    icon: <BsListCheck className="fs-5 " />,
                    label: "Product List",
                  },
                  {
                    key: "category",
                    icon: <BiCategoryAlt className="fs-5 " />,
                    label: "Category",
                  },
                  {
                    key: "category-list",
                    icon: <BsListCheck className="fs-5 " />,
                    label: "Category List",
                  },
                  {
                    key: "brand",
                    icon: <SiBrandfolder className="fs-5 " />,
                    label: "Brand",
                  },
                  {
                    key: "brand-list",
                    icon: <BsListCheck className="fs-5 " />,
                    label: "Brand List",
                  },
                  {
                    key: "color",
                    icon: <AiOutlineBgColors className="fs-5 " />,
                    label: "Color",
                  },
                  {
                    key: "color-list",
                    icon: <BsListCheck className="fs-5 " />,
                    label: "Color List",
                  },
                ],
              },
              {
                key: "orders",
                icon: <FaClipboardList className="fs-5 " />,
                label: "Orders",
              },
              {
                key: "blog",
                icon: <FaBloggerB className="fs-5 " />,
                label: "Blogs",
                children: [
                  {
                    key: "add-blog",
                    icon: <ImBlog className="fs-5 " />,
                    label: "Add Blog",
                  },
                  {
                    key: "blog-list",
                    icon: <BsListCheck className="fs-5 " />,
                    label: "Blog List",
                  },
                  {
                    key: "category-blog",
                    icon: <FaBloggerB className="fs-5 " />,
                    label: "Blogs Category",
                  },
                  {
                    key: "blog-category-list",
                    icon: <BsListCheck className="fs-5 " />,
                    label: "Blog Catgeory List",
                  },
                ],
              },
              {
                key: "marketing",
                icon: <SiMarketo className="fs-5 " />,
                label: "Marketing",
                children: [
                  {
                    key: "add-coupon",
                    icon: <ImBlog className="fs-5 " />,
                    label: "Add Coupon",
                  },
                  {
                    key: "coupon-list",
                    icon: <RiCouponLine className="fs-5"/>,
                    label: "Coupon List",
                  },
                ],
              },
              {
                key: "enquiry",
                icon: <FaClipboardList className="fs-5 " />,
                label: "Enquiry",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="d-flex justify-content-between ps-2 pe-5"
            style={{
              padding: 0,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                background: "#fff",
              }}
            />
            <div className="d-flex gap-3 align-items-center">
              <div className="position-relative">
                <IoIosNotifications className="fs-4" />
                <span className="badge bg-warning rounded-circle p-1 position-absolute">
                  3
                </span>
              </div>
              <div className="d-flex gap-3 align-items-center dropdown">
                <div>
                  <img
                    src={mypic}
                    alt=""
                    className="img-fluid"
                    width={40}
                    height={40}
                  />
                </div>
                <div
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h5 className="mb-0">Fatima</h5>
                  <p>hashmif997@gmail.com</p>
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link className="dropdown-item py-1 mb-1" style={{"height": "auto", "lineHeight":"20px"}} to="/">
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-1 mb-1" style={{"height": "auto", "lineHeight":"20px"}} to="/">
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-1 mb-1" style={{"height": "auto", "lineHeight":"20px"}} to="/">
                    SignOut
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
            />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
