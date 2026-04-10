import React, { use, useEffect, useRef } from 'react'
import './navbar.css'
import { ChevronLeft, ChevronRight, LogOut, UserRound } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({bgcolor}) => {
    const {Logout}=useAuth();
    const navref=useRef()
    const chevnav=useNavigate()
    const user=JSON.parse(localStorage.getItem("userData"))
    const handleLogout=()=>{
        Logout();
    }
    useEffect(()=>{
        navref.current.style.background=`linear-gradient(${bgcolor})`
    },[bgcolor])
    

  return (
    <>
    <nav ref={navref} className="navbar">
        <div className="chevron-left-right">
         <ChevronLeft className='chevron' onClick={()=>chevnav(-1)}/>
         <ChevronRight className='chevron' onClick={()=>chevnav(1)}/>
        </div>
        <div className="nav-end">
            <div className="explore-premium">
                <p>Explore Premium</p>
            </div>
            <div className="nav-user">
                
                <UserRound size={20} />
                <span>{user.email.slice(0,7)+"..."}</span>
               
            </div>
            <div className="nav-logout">
            <button className='logout-button' 
            onClick={handleLogout}>
                
            <LogOut />
            <span>Logout</span>
            </button>
            </div>
        </div>
    </nav>
    {/* <hr style={{height:"0.1rem",backgroundColor:"white"}}/> */}
    </>
  )
}

export default Navbar