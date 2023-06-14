import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgetPassword'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Enquiry from './pages/Enquiry'
import Bloglist from './pages/Bloglist'
import BlogCatList from './pages/BlogCatList'
import Order from './pages/Order'
import Customer from './pages/Customer'
import ProductList from './pages/Productlist'
import CategoryList from './pages/CategoryList'
import Brandlist from './pages/Brandlist'
import Colorlist from './pages/Colorlist'
import AddBlog from './pages/AddBlog'
import AddBlogCat from './pages/AddBlogCat'
import AddColor from './pages/AddColor'
import AddBrand from './pages/AddBrand'
import AddCategory from './pages/AddCategory'
import AddProduct from './pages/AddProduct'
import AddCoupon from './pages/AddCoupon'
import CouponList from './pages/CouponList'
import ViewOrder from './pages/ViewOrder'
import ViewEnq from './pages/ViewEnq'



function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="resetpassword" element={<ResetPassword /> } />
          <Route path="forgetpassword" element={<ForgotPassword />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route  index  element={<Dashboard /> } />
            <Route  path='enquiry'  element={<Enquiry /> } />
            <Route  path='enquiry/:id'  element={<ViewEnq /> } />
            <Route  path='blog-list'  element={<Bloglist /> } />
            <Route  path='blog-category-list'  element={<BlogCatList /> } />
            <Route  path='orders'  element={<Order /> } />
            <Route  path='order/:id'  element={<ViewOrder /> } />
            <Route  path='customers'  element={<Customer /> } />
            <Route  path='product' element={<AddProduct />}/>
            <Route  path='product-list'  element={<ProductList /> } />
            <Route  path='category' element={<AddCategory />}/>
            <Route  path='category/:id' element={<AddCategory />}/>
            <Route  path='category-list' element={<CategoryList />}/>
            <Route  path='brand' element={<AddBrand />}/>
            <Route  path='brand/:id' element={<AddBrand />}/>
            <Route  path='brand-list' element={<Brandlist />}/>
            <Route  path='color' element={<AddColor /> }/>
            <Route  path='color/:id' element={<AddColor /> }/>
            <Route  path='color-list' element={<Colorlist />}/>
            <Route  path='add-blog' element={<AddBlog />}/>
            <Route  path='add-blog/:id' element={<AddBlog />}/>
            <Route  path='category-blog' element={<AddBlogCat />}/>
            <Route  path='category-blog/:id' element={<AddBlogCat />}/>
            <Route  path='add-coupon' element={<AddCoupon />}/>
            <Route  path='add-coupon/:id' element={<AddCoupon />}/>
            <Route  path='add-coupon/:id' element={<AddCoupon />}/>
            <Route  path='coupon-list' element={<CouponList />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
