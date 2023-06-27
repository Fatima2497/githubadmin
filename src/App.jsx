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
import Profile from './pages/Profile'
import { PrivateRoutes } from './routing/PrivateRoutes'
import Error from './pages/Error'



function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="reset-password/:token" element={<ResetPassword /> } />
          <Route path="forgetpassword" element={<ForgotPassword />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<PrivateRoutes> <MainLayout /> </PrivateRoutes>}>
            <Route  index  element={<PrivateRoutes> <Dashboard /> </PrivateRoutes> } />
            <Route  path='enquiry'  element={<PrivateRoutes><Enquiry /></PrivateRoutes> } />
            <Route  path='enquiry/:id'  element={<PrivateRoutes><ViewEnq /></PrivateRoutes> } />
            <Route  path='blog-list'  element={<PrivateRoutes><Bloglist /></PrivateRoutes> } />
            <Route  path='blog-category-list'  element={<PrivateRoutes><BlogCatList /></PrivateRoutes> } />
            <Route  path='orders'  element={<PrivateRoutes><Order /></PrivateRoutes> } />
            <Route  path='order/:id'  element={<PrivateRoutes><ViewOrder /> </PrivateRoutes>} />
            <Route  path='customers'  element={<PrivateRoutes><Customer /></PrivateRoutes> } />
            <Route  path='product' element={<PrivateRoutes><AddProduct /></PrivateRoutes>}/>
            <Route  path='product/:id' element={<PrivateRoutes><AddProduct /></PrivateRoutes>}/>
            <Route  path='product-list'  element={<PrivateRoutes><ProductList /> </PrivateRoutes>} />
            <Route  path='category' element={<PrivateRoutes><AddCategory /></PrivateRoutes>}/>
            <Route  path='category/:id' element={<PrivateRoutes><AddCategory /></PrivateRoutes>}/>
            <Route  path='category-list' element={<PrivateRoutes><CategoryList /></PrivateRoutes>}/>
            <Route  path='brand' element={<PrivateRoutes><AddBrand /></PrivateRoutes>}/>
            <Route  path='brand/:id' element={<PrivateRoutes><AddBrand /></PrivateRoutes>}/>
            <Route  path='brand-list' element={<PrivateRoutes><Brandlist /></PrivateRoutes>}/>
            <Route  path='color' element={<PrivateRoutes><AddColor /> </PrivateRoutes>}/>
            <Route  path='color/:id' element={<PrivateRoutes><AddColor /></PrivateRoutes> }/>
            <Route  path='color-list' element={<PrivateRoutes><Colorlist /></PrivateRoutes>}/>
            <Route  path='add-blog' element={<PrivateRoutes><AddBlog /></PrivateRoutes>}/>
            <Route  path='add-blog/:id' element={<PrivateRoutes><AddBlog /></PrivateRoutes>}/>
            <Route  path='category-blog' element={<PrivateRoutes><AddBlogCat /></PrivateRoutes>}/>
            <Route  path='category-blog/:id' element={<PrivateRoutes><AddBlogCat /></PrivateRoutes>}/>
            <Route  path='add-coupon' element={<PrivateRoutes><AddCoupon /></PrivateRoutes>}/>
            <Route  path='add-coupon/:id' element={<PrivateRoutes><AddCoupon /></PrivateRoutes>}/>
            {/* <Route  path='add-coupon/:id' element={<PrivateRoutes><AddCoupon /></PrivateRoutes>}/> */}
            <Route  path='coupon-list' element={<PrivateRoutes><CouponList /></PrivateRoutes>}/>
            <Route path='profile/:id' element={<PrivateRoutes><Profile /></PrivateRoutes>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
