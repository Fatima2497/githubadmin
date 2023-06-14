import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { authSlice } from '../auth/authSlice'



const getBlogs = async() => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}blog/allblogs`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const createBlogs = async(blog) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.post(`${base_url}blog/createBlog`,blog,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}
const updateBlog = async(blog) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.put(`${base_url}blog/updateBlog/${blog.id}`,{
        title: blog.blogData.title,
        description: blog.blogData.description,
        category: blog.blogData.category,
        image: blog.blogData.image
    },
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}
const getBlog = async(id) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}blog/${id}`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const deleteBlog = async(id) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.delete(`${base_url}blog/${id}`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}
const blogService = {
    getBlogs,
    createBlogs,
    getBlog,
    updateBlog,
    deleteBlog
}

export default blogService