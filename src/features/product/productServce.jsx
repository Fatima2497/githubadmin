import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { authSlice } from '../auth/authSlice'



const getProducts = async() => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}product/getProduct`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const getProductRating = async() => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}product/getrating`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}


const createProducts = async(product) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.post(`${base_url}product/createProduct`,product,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const deleteProd = async(id) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.delete(`${base_url}product/${id}`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const getProd = async(id) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}product/getaProduct/${id}`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const updateProd = async(product) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.put(`${base_url}product/${product.id}`,{
        title: product.prodData.title,
        description: product.prodData.description,
        brand: product.prodData.brand,
        color: product.prodData.color,
        price: product.prodData.price,
        tag: product.prodData.tag,
        quantiy: product.prodData.quantiy,
        category: product.prodData.category,
        images: product.prodData.images
    },
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const productService = {
    getProducts,
    createProducts,
    deleteProd,
    getProd,
    updateProd,
    getProductRating
}

export default productService