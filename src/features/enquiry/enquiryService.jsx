import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { authSlice } from '../auth/authSlice'



const getEnquiries = async() => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}enquiry/`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const deleteEnquiries = async(id) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.delete(`${base_url}enquiry/${id}`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const getEnquiry = async(id) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.get(`${base_url}enquiry/${id}`,
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const updateEnquiries = async(enq) => {
    const  data = JSON.parse(localStorage.getItem('user'))
    const  token = data.token
    // console.log(token);
    const response = await axios.put(`${base_url}enquiry/${enq.id}`, 
    {
        status: enq.enqData
    },
    {

        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}


const enquiryService = {
    getEnquiries,
    deleteEnquiries,
    getEnquiry,
    updateEnquiries
}

export default enquiryService