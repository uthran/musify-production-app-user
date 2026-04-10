import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import Display from './Components/Display/Display'
import Authwrapper from './Components/Authwrapper/Authwrapper'
import Sidebar from './Components/Sidebar/Sidebar'
import './app.css'
import Navbar from './Components/Navbar/Navbar'
import Player from './Components/Player/Player'
import { PlayerContext } from './Context/PlayerContext'
const App = () => {
  const {audioRef,track}=useContext(PlayerContext)
  return (
<>
      <Toaster/>
    <Authwrapper>
      <div className="authwrapper" style={{overflow:"scroll"}}>
      <div className="authwrapper-1" style={{height:"85vh",overflow:"scroll",scrollBehavior:"smooth"}}>
            <Sidebar/>
             <Display/>
      </div>
     
      </div>
       <Player/>
      
    </Authwrapper>
</>
  )
}

export default App