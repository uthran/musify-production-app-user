import React from 'react'
import './displaysearch.css'
import { useSearch } from '../../Context/SearchContext'
import { Album, Music, SearchIcon } from 'lucide-react'
import SongItem from '../Songitem/SongItem'
import { useNavigate } from 'react-router-dom'
const DisplaySearch = () => {

  const {searchquery,searchresults,isSearchactive}=useSearch()
  const {albums,songs}=searchresults; 
  const totalresult=albums.length+songs.length
  const songnav=useNavigate()

  if(totalresult==0){
      return(
        <div style={{minHeight:"400px",color:"white",display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",justifyContent:"center"}}>
        <SearchIcon size={80}/>
        <h2>No Result Found</h2>
        <p style={{color:"grey"}}>Try search for something else</p>
      </div>
      )
  }

  return (
    <div style={{color:"white"}} className='searchpage-div'>
         <div className="search-heading-div">
          <h1 style={{marginTop:"5px"}}>Search Results</h1>
          <p>
            Found {totalresult} result{totalresult !== 1 ? 's':''} for {searchquery}
          </p>
         </div>
         {
          songs.length>0&&(
            <>
            <div className="result-heading-div">
             <Music color='green'/>
             <h2>Songs</h2>
             <span>({songs.length})</span>
          </div>
          <div className='search-song-result'>
            {
        songs.map((data)=>(
          <>
             <div className='single-song-result' key={data._id} onClick={()=>songnav(`/song/${data._id}`)}>
              <img src={data?.image} alt="" />
             <div>
               <h4 style={{marginBottom:"7px"}}>{data?.name}</h4>
              <marquee behavior="" direction="">{data?.desc}</marquee>
             </div>
             
             </div>
             
             </>
        ))
       }
          </div>
          </>
          )
         }
         {
          albums.length>0&&(
            <>
            <div className="result-heading-div">
             <Album color='green'/>
             <h2>Albums</h2>
             <span>({albums.length})</span>
          </div>
          <div className='search-song-result'>
            {
        albums.map((data)=>(
          <>
             <div className='single-song-result' key={data._id} onClick={()=>songnav(`/album/${data._id}`)} >
              <img src={data?.imageurl} alt="" />
             <div>
                <h4 style={{marginBottom:"7px"}}>{data?.name}</h4>
              <marquee behavior="" direction="">{data?.desc}</marquee>
             </div>
             
             </div>
             
             </>
        ))
       }
          </div>
          </>
          )
         }
        
    </div>
  )
}

export default DisplaySearch