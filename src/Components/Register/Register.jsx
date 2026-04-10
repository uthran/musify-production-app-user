import React, { useState } from 'react'
import './register.css'
import { mainIcon } from '../../assets/Main-Icon.png'
import toast from 'react-hot-toast'
import { useAuth } from '../../Context/AuthContext'

const Register = ({OnSwitchToLogin}) => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConifrmPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("");
  const{Register}=useAuth();
  
  const Handlesubmit =async(e)=>{
    e.preventDefault();
    setError("")
  if(email==""||password==""||confirmPassword==""){
     setError("All Fields are required"),{}
     toast.error(error)
     return;
  }
   if(password!==confirmPassword){
      setError("Password do not match")
      toast.error("Password do not match")
   }
   setLoading(true)
   try {
    const result=await Register(email,password)
    if(result.success){
          toast.success(result.message)
          OnSwitchToLogin();
    }
    else{
      toast.error(result.message)
      setError(result.message)
    }
    
   } catch (error) {
    toast.error('An unexpected error occurs please try again later')
   }
   finally{
    setLoading(false)
   }
  }

  return (
    <>
    <div className="register-form-div">
      <div className="register-with-logo">
        <img src={mainIcon} alt="" />
        <h1>Musify</h1>
      </div>
      <div className="join-musify">
        <h2>Join Musify</h2>
        <p>Create your account to start listening</p>
      </div>
      <div className="register-form">
        
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
          placeholder='Create a Password' 
          required 
          value={password}
          onChange={e=>setPassword(e.target.value)}
          />
         </div>
         <div className="input-div">
           <label htmlFor="">Confirm password</label>
          <input type="password" 
          placeholder='Confirm your Password' 
          required 
          value={confirmPassword}
          onChange={e=>setConifrmPassword(e.target.value)}
          />
         </div>
         <div className="register-button">
          <button onClick={Handlesubmit}>Register</button>
         </div>
         <div className="already-have-account">
          <p>Already have an account ? <span onClick={OnSwitchToLogin}>Sign in here</span></p>
         </div>
         <div className="register-terms">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
         </div>
      </div>
    </div>
    </>
  )
}

export default Register