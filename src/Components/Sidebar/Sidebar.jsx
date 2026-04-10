import React, { useContext } from 'react'
import './sidebar.css'
import Search from '../Search/Search'
import { CrosshairIcon, CrossIcon, LibraryIcon, MoveRightIcon, PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../../Context/PlayerContext'
import Playlist from '../Playlist/Playlist'
const Sidebar = () => {
    const{playlist}=useContext(PlayerContext)
    const nav=useNavigate()
  return (
  playlist && playlist.length > 0 ? (
    <div className="sidebar-div">
        <div className="search-component">
        <Search />
        <div style={{marginTop:"10px"}} className="down-sidebar-div">
               <Playlist/>
        </div>
      </div>
    </div>
  ) : (
    <div className="sidebar-div">
      <div className="search-component">
        <Search />
      </div>

      <div className="down-sidebar-div">
        <div className="your-library">
          <LibraryIcon />
          <p>Your Library</p>
          <MoveRightIcon size={20} style={{ marginRight: "15px" }} />
          <PlusIcon size={20} />
        </div>

        <div className="create-your-playlist">
          <p>Create your first playlist</p>
          <p>It's easy, we will help you</p>
          <button onClick={() => nav("/playlist")}>
            Create Your Playlist
          </button>
        </div>

        <div className="browse-podcast">
          <p>Let's find some podcasts to follow</p>
          <p>We will keep you updated on new episodes</p>
          <button>Browse podcasts</button>
        </div>
      </div>
    </div>
  )
);
}

export default Sidebar