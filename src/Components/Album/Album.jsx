import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './album.css'
import mainIcon from "../../assets/Main-Icon.png";

import { PlayerContext } from '../../Context/PlayerContext'
import { Clock10Icon } from 'lucide-react'
import SongItem from '../Songitem/SongItem'
const Album = ({albums,bgcolor}) => {
  
  
  const {songsdata}=useContext(PlayerContext)
  const bgref=useRef()
  const hrRef=useRef()
  const songnav=useNavigate();
  const {clickedSong}=useContext(PlayerContext)
  
  
  
  useEffect(()=>{
   bgref.current.style.background=`linear-gradient(${bgcolor},#121212,#121212,#121212)`
  //  bgref.current.style.height='100vh';
  },[bgcolor,albums])

  return (
    <div className='main-album-page-div' ref={bgref}>
      <div className="album-image-div">
        <img className='main-album-image' src={albums?.imageurl} alt="" />
        <div>
          <p>Playlist</p>
          <h2>{albums?.name}</h2>
          <p>Lana Del Ray Songs</p>
         <div className="album-logo-line">
          <img className='album-musify-logo' src={mainIcon} alt="" />
          <h6>Musify</h6>
          <p>1,23,456 likes</p>
          <h6>6 songs</h6>
          <p>about 2 hr 30 mins </p>
         </div>
        </div>
      </div>
      <div className="song-list-div">
        <p>#</p>
        <p>Album</p>
        <p>Date Added</p>
        <p><Clock10Icon/></p>
        </div>
        <div className='hr-div' ref={hrRef}></div>
        {
          songsdata.filter(song=>song?.album==albums?.name)
          .map((data,index)=>{
    return <div className='song-list-table' onClick={()=>clickedSong(data._id)} key={data._id}>
      <div className='song-img-div'>
      <p style={{marginRight:"5px"}}>{index+1}</p>
      <img style={{height:"40px",width:"40px",marginRight:"5px",borderRadius:"2px",border:"1px solid white"}} src={data.image} alt="" />
      <p>{data.name}</p>
      </div>
      <p style={{fontSize:"medium"}}>{data.album}</p>
      <p>5 days ago</p>
      <p>{data.duration}</p>
       
    </div>
    
  })
        }
      
    </div>
  )
}


 

export default Album