import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { authSlice } from '../auth/authSlice'



const getUsers = async() => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}user/getUser`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const customerService = {
    getUsers,
}

export default customerService