import axios from 'axios'
import { base_url } from '../../utils/base_url'




const getCoupons = async() => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}coupon/`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const createCoupons = async(coupon) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.post(`${base_url}coupon/`,coupon,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const updateCoupon = async(coupon) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.put(`${base_url}coupon/${coupon.id}`,{
        name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}
const getCoupon = async(id) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}coupon/${id}`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const deleteCoupon = async(id) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.delete(`${base_url}coupon/${id}`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}
const couponService = {
    getCoupons,
    createCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}

export default couponService