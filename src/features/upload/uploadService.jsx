import axios  from "axios";
import { base_url } from "../../utils/base_url";

export const uploadImg = async(formData) => {
    const  userData = JSON.parse(localStorage.getItem('user'))
    const  token = userData.token
    // console.log(token);
    const response = await axios.post(`${base_url}upload/`,formData,
    {

        headers:{ 
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}
export const deleteImg = async(id) => {
    const  userData = JSON.parse(localStorage.getItem('user'))
    const  token = userData.token
    // console.log(token);
    const response = await axios.delete(`${base_url}upload/delete-img/${id}`,
    {

        headers:{ 
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

const uploadService = {
    uploadImg,
    deleteImg
}

export default uploadService