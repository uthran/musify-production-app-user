import { createContext, useContext, useEffect, useState } from "react";
import { PlayerContext } from "./PlayerContext";

export const SearchContext=createContext()

export const useSearch=()=>{
    const context=useContext(SearchContext)
    if(!context){
           throw new Error("useSearch must be within a SearchProvider")
    }
    return context;
}

export const SearchProvider=({children})=>{
    const [searchquery,setSearchquery]=useState('')
    const [searchresults,setSearchresults]=useState({songs:[],albums:[]})
    const [isSearchactive,setIsSearchactive]=useState(false)
    const {songsdata,albumsdata}=useContext(PlayerContext)

    useEffect(()=>{
        if(searchquery.trim()==''){
             setSearchresults({songs:[],albums:[]})
             return;
        }
        const query=searchquery.toLowerCase();
        const filteredsong= songsdata.filter(song=>
            song.name.toLowerCase().includes(query)|| song.desc.toLowerCase().includes(query)
        )
        const filteredalbum=albumsdata.filter(album=>
            album.name.toLowerCase().includes(query)||album.desc.toLowerCase().includes(query)
        )
        setSearchresults({
            songs:filteredsong,
            albums:filteredalbum
        })
    },[searchquery,songsdata,albumsdata])

    const ClearSearch=()=>{
        setSearchquery("")
        setSearchresults({songs:[],albums:[]})
        setIsSearchactive(false)
    }

    const contextValue={
        searchquery,setSearchquery,
        searchresults,
        isSearchactive,setIsSearchactive,
        ClearSearch

    }

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    )
} 