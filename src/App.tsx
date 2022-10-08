import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Opponent } from "../src/types/Opponent.type";
import { User } from "../src/types/User.type";
import Signup from './components/Signup'
import Login from './components/Login'
import Game from './components/Game'
import Home from './components/Home'
import Lobby from './components/Lobby'
import FindUser from './components/test/FindUser'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import FriendsList from './components/test/FriendsList';
import Rules from './components/Rules'
import SocketTest from './components/SocketTest';
import SettingsPage from './components/SettingsPage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [friend, setFriend] = useState('');
  useEffect(()  => {
    const data = window.sessionStorage.getItem("user");
    const data2 = window.sessionStorage.getItem("profileUser");
    if (data != null) setUser(JSON.parse(data));
    if(data2 != null) setProfileUser(JSON.parse(data2));
  }, [])

  var [theme, getTheme] = useState('')
  useEffect(() => {
    getTheme(localStorage.getItem("theme") || '');
  },[]);

  return (
    <div className='container' data-theme={theme}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Login />} />
          <Route path='/profile' element={<Profile  profileUser={profileUser}/>} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/' element={<Home />} />
          <Route path='/lobby' element={<Lobby currentUser={user}/>} />
          {/* <Route path="/setup" element={<Setup />} /> */}
          <Route path='/game' element={<Game />} />
          <Route path='/friends' element={<FriendsList />} />
          <Route path='/finduser' element={<FindUser />} />
          {/* <Route path='/socketTest' element={<SocketTest />} /> */}

          <Route path='/friends' element={<FriendsList/>} />
          <Route path='/finduser' element={<FindUser/>} />
          <Route path='/settings' element={<SettingsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
