import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './playlist.css'
import { FaList } from 'react-icons/fa6';
import { MdPlaylistPlay } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const API = "https://musify-production-app-y8ld.onrender.com/api/playlists";
const Playlist = () => {
     const userId = 1;
    
      const [name, setName] = useState("");
      const [playlists, setPlaylists] = useState([]);
      const [selectedPlaylist, setSelectedPlaylist] = useState(true);
      const [songs, setSongs] = useState([]);
      const [songId, setSongId] = useState("");
      const nav=useNavigate();


      const createPlaylist = async () => {
    if (!name) return alert("Enter playlist name");

    await axios.post(API, {
      userId,
      name,
      description: "My playlist",
      songIds: [],
    });

    setName("");
    fetchPlaylists();
  };

  const DeletePlaylist=async(id)=>{
    axios.delete(`${API}/${id}`)
    window.location.reload()
  }

    const fetchPlaylists = async () => {
    const res = await axios.get(`${API}/user/${userId}`);
    setPlaylists(res.data);
  };
  useEffect(()=>{
    fetchPlaylists()
  },[])

  return (
    <>
    <div className="create-playlist-div">
         <div className="playlist-input">
            <input type="text"
            value={name}
            placeholder='enter playlist name'
            onChange={(e) => setName(e.target.value)} 
            />
            <button
            onClick={createPlaylist}
            >Create</button>
         </div>
    </div>
        {
            playlists.map((item,index)=>{
                return(
                   <>
                    <div className='playlist-div' style={{color:"white"}} key={index}>
                        <div onClick={()=>nav(`/playlist/${item._id}`)} style={{marginLeft:"10px",cursor:"pointer"}}>
                            <MdPlaylistPlay size={30}/>
                       <p >{item?.name}</p>
                        </div>
                       <div>
                        <button  onClick={()=>DeletePlaylist(item._id)}>Delete</button>
                       </div>
                    </div>
                    <hr className="playlist-hr" />
                   </>
                )
            })
        }
    </>
  )
}

export default Playlist