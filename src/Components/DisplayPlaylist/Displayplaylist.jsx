import React, { useContext } from 'react'
import './displayplaylist.css'
import { PlayerContext } from '../../Context/PlayerContext'
import { useParams } from 'react-router-dom'
import musify from './../../assets/Main-icon.png'
import { Clock10Icon } from 'lucide-react'
import playlisticon from '../../assets/empty_playlist.png'
const Displayplaylist = () => {
    const { songsdata, playlist } = useContext(PlayerContext)
    const { id } = useParams();
    const {clickedSong}=useContext(PlayerContext)

    const currentplaylist = playlist.find(item => item._id === id);

    const playlist_1 = currentplaylist?.songIds || [];


    // ✅ MAIN FIX
    const listOfsongs = songsdata.filter(song =>
        playlist_1.includes(song._id)
    );
    
    
  return (
    <div style={{color:"white"}}>
        <div className='main-album-page-div'>
      <div className="album-image-div">
        <img className='main-album-image' style={{height:"180px",width:"180px",marginTop:"20px"}} src={playlisticon} alt="" />
        <div>
          <p>Playlist</p>
          <h2>{currentplaylist?.name}</h2>
          <p style={{marginTop:"10px"}}>{currentplaylist?.name} Playlist songs</p>
         <div className="album-logo-line">
          <img className='album-musify-logo' src={musify} alt="" />
          <h6>Musify</h6>
          <p>1,23,456 likes</p>
          <h6>{listOfsongs.length}</h6>
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
        <div className='hr-div'></div>
        {
          listOfsongs
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
    </div>
  )
}

export default Displayplaylist