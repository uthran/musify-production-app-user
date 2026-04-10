import React, { useEffect, useContext, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { PlayerContext } from '../../Context/PlayerContext';
import AlbumItem from '../AlbumItem/AlbumItem';
import SongItem from '../Songitem/SongItem';
import io from 'socket.io-client'
import axios from 'axios';
import './home.css';

const Home = () => {
  const { Logout, token } = useAuth(); // assuming your AuthContext provides JWT token
  const { albumsdata, songsdata } = useContext(PlayerContext);
//   const [filteredsongs,setFilteredsongs]=useState([])
//   const [mood,setMood]=useState("")

//   const moodEmojis = {
//   happy: "😊",
//   neutral: "😐",
//   sad: "😢"
// };


//  useEffect(() => {
//   const socket = io("http://localhost:5000", {
//     transports: ["websocket"], // ensures stable connection
//   });

//   socket.on("connect", () => {
//     console.log("Socket connected");

//     // 🔥 Start detection ONLY after connection
//     fetch("http://localhost:5000/start", { method: "POST" });
//   });

//   socket.on("emotion", (data) => {
//     const detectedMood = data.emotion;
//     console.log("Detected:", detectedMood);
//     setMood(detectedMood);
//   });

//   return () => {
//     fetch("http://localhost:5000/stop", { method: "POST" });
//     socket.disconnect();
//   };
// }, []);
   
  //  useEffect(() => {
  //   if (mood && songsdata.length > 0) {
  //     const filtered = songsdata.filter(
  //       (song) =>
  //         song.mood &&
  //         song.mood.toLowerCase() === mood.toLowerCase()
  //     );

  //     setFilteredsongs(filtered);
  //     console.log(filteredsongs);
      
  //   }
  // }, [mood, songsdata]);
 
  
{/* // {mood && filteredsongs.length > 0 && ( */}
//   <div className="display-song-div">
//     <h1
//   style={{
//     margin: "15px",
//     marginBottom: "30px",
//     color: "white",
//     textAlign: "center"
//   }}
// >
//   Songs based on your mood: {mood} {moodEmojis[mood?.toLowerCase()] || "🎵"}
// </h1>

//     <div className="display-song" style={{color:'white'}}>
//       {filteredsongs.map((data, index) => (
//         <SongItem
//           key={index}
//           name={data.name}
//           desc={data.desc}
//           duration={data.duration}
//           file={data.file}
//           album={data.album}
//           mood={data.mood}
//           image={data.image}
//           id={data._id}
//         />
//       ))}
//     </div>
//   </div>
// )}
return(
   <><div className="home-div">

      <div className="display-album-div">
        <h1 style={{ marginLeft: "10px" }}>Featured charts</h1>
        <div className="diplay-album" >
          {albumsdata.map((data, index) => (
            <AlbumItem
              key={index}
              name={data.name}
              desc={data.desc}
              bgcolor={data.bgcolor}
              imageurl={data.imageurl}
              id={data._id}
            />
          ))}
        </div>
      </div>

      <div className="display-song-div">
        <h1 style={{ marginLeft: "10px" }}>Today's biggest hits</h1>
        <div className="display-song">
          {songsdata.map((data, index) => (
            <SongItem
              key={index}
              name={data.name}
              desc={data.desc}
              duration={data.duration}
              file={data.file}
              album={data.album}
              mood={data.mood}
              image={data.image}
              id={data._id}
            />
          ))}
        </div>
      </div>

    </div>
  </>
        )
};

export default Home;
