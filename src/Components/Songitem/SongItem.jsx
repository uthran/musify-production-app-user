
import { useNavigate } from 'react-router-dom'
import './Songitem.css'
import { useContext } from 'react'
import { PlayerContext } from '../../Context/PlayerContext'

const SongItem = ({name,desc,duration,file,id,image,mood,album}) => {
    const songnav=useNavigate()
    const {setTrack,songsdata,clickedSong}=useContext(PlayerContext)
  
    
  return (
    <>
    <div className="song-item-div" onClick={()=>clickedSong(id)}>
      <img src={image} alt="" />
      <p style={{fontWeight:"bold"}} className='song-div-p'>{name}</p>
      <marquee style={{marginTop:"10px"}} behavior="" direction="">{desc}</marquee>
    </div>
    </>
  )
}

export default SongItem