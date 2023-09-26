import { Route, Routes, useNavigate } from "react-router-dom";

import React ,{useContext} from 'react'
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
    const navigate = useNavigate()
    // const auth = true
    let {user}=useContext(AuthContext)
    if (user){
    return <HomePage></HomePage>}
    else{
        return <LoginPage></LoginPage>
    }
}

export default PrivateRoute