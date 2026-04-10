import React, { useState } from 'react'
import './login.css'
import { assests } from '../../assets/Assets'
import { Hand } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';

const Login = ({OnSwitchToRegister}) => {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
      const [loading,setLoading]=useState(false)
       const [error,setError]=useState("");
    const{Login}=useAuth();
    
    

    const Handlesubmit=async (e)=>{
      
      if(email==""||password==""){
        toast.error("All fields are required")
      }
      setLoading(true)
      try {
        const result=await Login(email,password)
        if(!result.success){
          toast.error(result.message)
          setError(result.message)
        }

      } catch (error) {
        setError(error.message)
        toast.error("An Unexpected Error occurs Please try again later.")
      }
      finally{
        setLoading(false)
      }
      

    }

  return (
    <>
    <div className="register-form-div">
           <div className="register-with-logo">
              <img src={assests.logo} alt="" />
              <h1>Musify</h1>
            </div>
            <div className="join-musify">
        <h2>Welcome back</h2>
        <p>Sign to continue listening</p>
      </div>
      <div className="register-form" style={{marginTop:"50px"}}>
        
         <div className="input-div">
           <label htmlFor="">Email address</label>
          <input type="email" 
          placeholder='Enter your Email' 
          required 
          value={email}
          onChange={e=>setEmail(e.target.value)}
          />
         </div>
         <div className="input-div">
           <label htmlFor="">Password</label>
          <input type="password" 
          placeholder='Enter your Password' 
          required 
          value={password}
          onChange={e=>setPassword(e.target.value)}
          />
         </div>
    
         <div className="register-button">
          <button onClick={Handlesubmit}>Login</button>
         </div>
         <div className="already-have-account">
          <p>Don't have an account ? <span onClick={OnSwitchToRegister} >Sign up here</span></p>
         </div>
      </div>
    </div>
    </>
  )
}

export default Login