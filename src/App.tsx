import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Game from './components/Game'
import Home from './components/Home'
import Lobby from './components/Lobby'
import FriendsList from './components/test/FriendsList'
import Leaderboard from './components/Leaderboard'

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/lobby' element={<Lobby />} />
          {/* <Route path="/setup" element={<Setup />} /> */}
          <Route path='/game' element={<Game />} />
          <Route path='/friends' element={<FriendsList />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
