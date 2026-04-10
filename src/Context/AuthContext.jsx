import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if(!context){
    console.log("useAuth must be used within an authprovider");
    }   
    return context
}

export const AuthProvider=({children})=>{
 
    const API_BASE_URL="https://musify-production-app-y8ld.onrender.com"
    const [user,setUser]=useState(null)
    const [token,setToken]=useState(localStorage.getItem("userToken"))
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        setLoading(true)
        const storedToken=localStorage.getItem("userToken")
        const storedUser=localStorage.getItem("userData")
        if(storedToken && storedUser){
            setToken(storedToken)
            setUser(JSON.stringify(storedUser))
        }
    },[])

    const Register=async(email,password)=>{
           const response=await axios.post(`${API_BASE_URL}/api/auth/register`,{email,password})
            if(response.status==200){
               return {
                success:true,
                message:"Registration successful"
               }
            }
            else{
                return{
                    success:false,
                    message:response.data.message || "Registration failed"
                }
            }
    }

    const Login=async(email,password)=>{
     
      try {
         const response=await axios.post(`${API_BASE_URL}/api/auth/login`,{email,password})
         if(response.status==200){
            console.log("hello");
            
            setToken(response.data.token)
            setUser({email:response.data.email,role:response.data.role})
            localStorage.setItem("userToken",response.data.token)
            localStorage.setItem("userData",JSON.stringify({email:response.data.email,role:response.data.role}))
            return {success:true}
         }
         else{
            
            return {
            success:false,
            message:response.data.message||'Login Failed'
        }
        }
      } catch (error) {
        
         return {
            success:false,
            message:error.response.data||'Network Error Please try again later'}
        
      }
    }
  
    const isAuthenticated=()=>{
        return !!token && !!user
    }
    const Logout=()=>{
        setToken(null)
        setUser(null)
        localStorage.removeItem("userToken")
        localStorage.removeItem("userData")
    }
    
    const contextvalue={
          Register,
          Login,
          isAuthenticated,
          Logout,
          user,
          token,
    }

    return(
        <AuthContext.Provider value={contextvalue}>
            {children}
        </AuthContext.Provider>
    )
}