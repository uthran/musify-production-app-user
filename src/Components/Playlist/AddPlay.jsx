import React, { useContext, useEffect, useState } from 'react'
import './addplay.css'
import { PlayerContext } from '../../Context/PlayerContext'
import axios from 'axios'
import { CgSelect } from 'react-icons/cg'
import toast from 'react-hot-toast'
const AddPlay = () => {
    const {playlist,singlesongId,fetchPlaylists,showaddplay,setShowaddplay}=useContext(PlayerContext)
    const [playlistId,setplaylistId]=useState("")
    const API = "https://musify-production-app-y8ld.onrender.com/api/playlists";
    const addsongToPlaylist=async()=>{
        const res=await axios.post(`${API}/${playlistId}/add/${singlesongId}`)
        setShowaddplay(false)
        toast.success("song is successfully added to the playlist")
    }
    
return (
  showaddplay ? (
    <div className="addplay-div" style={{ position: "absolute" }}>
      <div className="addplay-box">
                 <h3 style={{textAlign:"center",marginBottom:"25px"}}>Select Playlist</h3>
        {playlist.map((item) => (
          <div key={item._id}>
          <div className="addplay-playlist-data">
                            
            <label>
              {item.name}
            </label>
            <input
                type="radio"
                name="playlist"
                value={item._id}
                onChange={(e)=>setplaylistId(e.target.value)}
              />
          </div>
          <hr  style={{borderRadius:"100%"}}/>
          </div>
        ))}
        <button className='addplay-button' onClick={addsongToPlaylist}>Add</button>

      </div>
    </div>
  ) : null
);
}

export default AddPlay