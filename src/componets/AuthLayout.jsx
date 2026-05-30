import React,{useEffect} from 'react'
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom' 
import Login from './Login.jsx'

function AuthLayout({ children, authentication }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const loading = useSelector((state) => state.auth.loading)

   useEffect(() => {
    if(loading){
        return
    }

    if(authentication && !authStatus){
        navigate("/")
    }

    if(!authentication && authStatus){
        navigate("/home")
    }

}, [authStatus, authentication, navigate, loading])

    return children;
}

export default AuthLayout;
