import { createContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { Album } from "lucide-react";

export const PlayerContext=createContext()

export const PlayerContextProvider=({children})=>{

    const API = "http://localhost:8080/api/playlists";
    const[songsdata,setSongsdata]=useState([])
    const [showaddplay,setShowaddplay]=useState(false)
    const[albumsdata,setAlbumsdata]=useState([])
    const {user,token}=useAuth();
    const [singlesongId,setSinglesongId]=useState("")
    const [playlist, setPlaylist] = useState([]);
    const [track,setTrack]=useState(songsdata[0])
    const [playstatus,setPlaystatus]=useState(false)
    const [time,setTime]=useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })
    const API_BASE_URL="https://musify-production-app-y8ld.onrender.com"
    const btoken={Authorization:`Bearer ${token}`}
    const audioRef=useRef(null);
    const seekBg=useRef();
    const seekBar=useRef();
    
    const play=()=>{
        audioRef.current.play();
        setPlaystatus(true)

    }
    const pause=()=>{
        audioRef.current.pause()
        setPlaystatus(false)

    }
    
    const playwithId = async (id) => {
    const selected = songsdata.find(item => item._id === id);
    if (selected) {
        setTrack(selected);
        setTimeout(() => {
            audioRef.current.play();
            setPlaystatus(true);
        }, 0);
    }
}
    const previous = () => {
    const index = songsdata.findIndex(item => item._id === track._id);

    if (index > 0) {
        setTrack(songsdata[index - 1]);
        setTimeout(() => {
            audioRef.current.play();
            setPlaystatus(true);
        }, 0);
    }
}
    const next = () => {
    const index = songsdata.findIndex(item => item._id === track._id);

    if (index < songsdata.length - 1) {
        setTrack(songsdata[index + 1]);
        setTimeout(() => {
            audioRef.current.play();
            setPlaystatus(true);
        }, 0);
    }
}
    const seeksong=async(e)=>{
        audioRef.current.currentTime=(e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current.duration;

    }
    
    
    
    const getSongsData=async()=>{
        axios.get(`${API_BASE_URL}/api/songs`,{headers:btoken})
        .then((res)=>{
           setSongsdata(res.data.songs)
           if(res.data.songs.length>0){
                setTrack(res.data.songs[0])
           }
        })
    }
    const getAlbumsData=async()=>{
        axios.get(`${API_BASE_URL}/api/albums`,{headers:btoken})
        .then((res)=>{
         setAlbumsdata(res.data.albums)
        })
    }
    const clickedSong=async(id)=>{
          const selectedsong=songsdata.filter((item)=>{
          return item._id==id
    })
        setTrack(selectedsong[0])
        
    }

    const fetchPlaylists = async () => {
    const res = await axios.get(`${API}/user/1`);
    setPlaylist(res.data);
  };
    const addsongtoplaylist=(id)=>{
        setSinglesongId(id)
        setShowaddplay(true)
    }
    


    const contextvalue={
        getSongsData,
        getAlbumsData,
        songsdata,
        albumsdata,
        audioRef,seekBar,seekBg,
        track,setTrack,
        playstatus,setPlaystatus,
        time,setTime,
        clickedSong,
        play,pause,playwithId,previous,next,seeksong,
        playlist,setPlaylist,fetchPlaylists,
        showaddplay,setShowaddplay,singlesongId,setSinglesongId,addsongtoplaylist
    }
    useEffect(()=>{
        fetchPlaylists();
       if(token&&user){
        getAlbumsData();
        getSongsData();
       }
    },[user,token])

    useEffect(()=>{
        const audio=audioRef.current;
        if(!audio){
              return
        }
        const updateseekbar=()=>{
            if(seekBar.current && audio.duration){
                const progress=(audio.currentTime/audio.duration)*100
                seekBar.current.style.width=Math.floor(progress)+"%";
                setTime({
                    currentTime:{
                        second:Math.floor(audio.currentTime%60),
                        minute:Math.floor(audio.currentTime/60)
                    },
                    totalTime:{
                        second:Math.floor(audio.duration%60),
                        minute:Math.floor(audio.duration/60)
                    }
                })

            }
        }
        const HandleLoadedMetadata=()=>{
            if(seekBar.current){
                  seekBar.current.style.width="0%"
            }
        }
        audio.addEventListener('timeupdate',updateseekbar)
        audio.addEventListener('loadedmetadata',HandleLoadedMetadata)

        return()=>{
            audio.removeEventListener('timeupdate',updateseekbar)
        audio.removeEventListener('loadedmetadata',HandleLoadedMetadata)
        }
    },[track])
    return(
        <PlayerContext.Provider value={contextvalue}>
                 {children}
        </PlayerContext.Provider>
    )
}