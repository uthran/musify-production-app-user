import React from 'react'
import './AlbumItem.css'
import { useNavigate } from 'react-router-dom'
const AlbumItem = ({name,id,bgcolor,desc,imageurl}) => {
    const albumnav=useNavigate()
  return (
    <>
    <div className="album-item-div" onClick={()=>albumnav(`album/${id}`)}>
        <img src={imageurl} alt="" />
        <p style={{fontSize:"20px",fontWeight:"bold",marginTop:"10px"}}>{name}</p>
        {/* <marquee behavior="" direction="">{desc}</marquee> */}
    </div>
    </>
  )
}

export default AlbumItem