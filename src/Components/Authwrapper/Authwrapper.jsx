import React, { useState } from 'react'
import Register from '../Register/Register'
import Login from '../Login/Login'
import { useAuth } from '../../Context/AuthContext'

const Authwrapper = ({children}) => {
    const {isAuthenticated}=useAuth();
    const [showRegister,setShowRegister]=useState(false)
    if(!isAuthenticated()){
        return showRegister ?
        (<Register OnSwitchToLogin ={()=> setShowRegister(false)} />):
        (<Login OnSwitchToRegister={()=>setShowRegister(true)} />);
    }
    return children;
  
}

export default Authwrapper