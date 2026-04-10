import React, { useContext } from 'react'
import './player.css'
import { PlayerContext } from '../../Context/PlayerContext'
import { ListMusic, LucidePlayCircle, Maximize2, Mic, Minimize2, Pause, PauseIcon, Play, PlayCircle, PlayIcon, PlaySquare, Repeat, Repeat1Icon, RepeatIcon, ShuffleIcon, SkipBackIcon, SkipForward, Speaker, Volume2 } from 'lucide-react'
import { FaPause, FaPlay } from 'react-icons/fa6'

const Player = () => {
  const {track,seekBar,seekBg,setShowaddplay,addsongtoplaylist,playstatus,play,pause,time,previous,next,seeksong,audioRef}=useContext(PlayerContext)
  const addtoplaylist=(id)=>{    
    addsongtoplaylist(id)
  }
 return track ? (
<>
<audio 
       ref={audioRef}
       src={track?track.file:""}
       preload='auto'
       ></audio>
<div className="song-player-div">
     <div className='song-player-left-div'>
      <img style={{height:"40px"}} src={track.image} alt="" />
     <div>
      <p style={{fontWeight:"bold"}}>{track?.name}</p>
      <marquee className="marquee-player" behavior="" direction="">{track?.desc}</marquee>
     </div>
     </div>
     <div className='song-controller-div'>
         <div className='song-controller'>
          <ShuffleIcon size={18}/>
          <SkipBackIcon size={18} onClick={previous}/>
          {playstatus?(
            <FaPause
            size={23}
            onClick={pause}
            />
          ):(
            <FaPlay style={{color:"white"}}
            size={23}
            onClick={play}
            />
          )}
          <SkipForward
          size={18}
          onClick={next}
          />
          <RepeatIcon size={18}/>
         </div>
         <div className='seekbar-div'>
          <p>
            {"0"+time.currentTime.minute}:{(time.currentTime.second)}
          </p>
          <div className="seek-bg" ref={seekBg} onClick={seeksong}>
    <div className="seek-bar" ref={seekBar}></div>
</div>
          <p>{"0"+(track.duration)}</p>
         </div>
     </div>
     <div className='player-last-container'>
        <ListMusic onClick={()=>addtoplaylist(track?._id)} /> 
         <Mic/> 
         <Speaker/>
         <Volume2/>
         <Minimize2/>
         <Maximize2/> 
     </div>
      

</div>
</>
  ):null
}

export default Player