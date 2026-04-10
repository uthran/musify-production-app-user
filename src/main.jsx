import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext, AuthProvider } from './Context/AuthContext.jsx'
import { PlayerContextProvider } from './Context/PlayerContext.jsx'
import { SearchProvider } from './Context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <PlayerContextProvider>
     <SearchProvider>
       <App/>
     </SearchProvider>
    </PlayerContextProvider>
  </AuthProvider>
  </BrowserRouter>
  
)
