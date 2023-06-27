import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({children}) => {
    const getToken =  JSON.parse(localStorage.getItem("user"))
    console.log(getToken?.token);
    return getToken?.token !== undefined ? children : (<Navigate to='/' replace={true} />)
}