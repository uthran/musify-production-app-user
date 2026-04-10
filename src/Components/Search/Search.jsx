import React, { useState } from 'react'
import './search.css'
import { CrossIcon, Home, SearchIcon, XIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../Context/SearchContext'
const Search = () => {
  const navhome=useNavigate()
  const [showsearchinput,setShowsearchinput]=useState(false)
  const { searchquery,setSearchquery,setIsSearchactive,ClearSearch}=useSearch();
  const HandleClickSearch=()=>{
    setIsSearchactive(true)
    setShowsearchinput(true)
    navhome('/search')
  }
  const HandleClearSearch=()=>{
    setShowsearchinput(false);
    console.log(showsearchinput);
    navhome("/");
    ClearSearch();
    
    
  }
  return (
    <>
    <div className="search-div">
      <div className="home-icon" onClick={()=>{navhome('/')}}>
        <Home className='lucide-home' />
        <p>Home</p>
      </div>
      <div className="search-icon" onClick={HandleClickSearch}>
        <SearchIcon/>
       {
        showsearchinput?(
           <><input type="text" 
        value={searchquery}
        onChange={e=>setSearchquery(e.target.value)}
        placeholder='What do you want to listen to ?'
        />
         <XIcon onClick={HandleClearSearch} size={19}  />
         </>
        ):(
          <p style={{fontSize:"large",fontWeight:"bold",cursor:"pointer",marginRight:"10px"}}>Search</p>
        )
       }
       
      </div>
    </div>
    </>
  )
}

export default Search