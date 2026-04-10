
import React, { useContext, useEffect, useRef } from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from '../Home/Home'
import Album from '../Album/Album'
import Search from '../Search/Search'
import Navbar from '../Navbar/Navbar'
import DisplaySearch from '../Displaysearch/DisplaySearch'
import { PlayerContext } from '../../Context/PlayerContext'

import Playlist from '../Playlist/Playlist'
import AddPlay from '../Playlist/AddPlay'
import Displayplaylist from '../DisplayPlaylist/Displayplaylist'

const Display = () => {
  const {albumsdata}=useContext(PlayerContext)
  const location=useLocation();
  const displayreff=useRef();
  const isAlbum=location.pathname.includes("album")
  const albumId=isAlbum?location.pathname.split("/").pop():"";
 const album=albumsdata.find(x=>x._id==albumId)
 const bgcolor=isAlbum&&album?album.bgcolor:'#121212'

  
  
  
  
  return (
    <div style={{width:"100%",overflow:"scroll"}}>
      <Navbar bgcolor={bgcolor}/>
       <AddPlay/>
      <Routes>
       
        <Route path='/' element={<Home/>}/>
       
         <Route path='/album/:id' element={<Album albums={albumsdata.find(x=>x._id==albumId)} bgcolor={bgcolor}/>}/> 
    
        <Route path='/playlist' element={<Playlist/>} />
        <Route path='/search' element={<DisplaySearch/>}/>
        <Route path='/playlist/:id' element={<Displayplaylist/>}/>
    </Routes>
    </div>
  )
}

export default Display