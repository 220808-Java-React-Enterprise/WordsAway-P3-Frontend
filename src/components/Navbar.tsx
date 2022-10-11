import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Profile.css'
import '../css/Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()

  function logout() {
    window.sessionStorage.removeItem('username')
    navigate('/')
    window.location.reload()
  }

  function login() {
    navigate('/')
    window.location.reload()
  }

  function lobby() {
    navigate('/lobby')
    window.location.reload()
  }

  function rules() {
    navigate('/rules')
    window.location.reload()
  }

  function finduser() {
    navigate('/finduser')
    window.location.reload()
  }

  function profile() {
    var teee = window.sessionStorage.getItem('user')
    teee ? window.sessionStorage.setItem('profileUser', teee) : <></>

    navigate('/profile')
    window.location.reload()
  }

  return (
    <>
      <body data-testid='navbar'>
        <div className='topnav'>
          <ul>
            <li>
              
                <a data-testid="nav-rules" className='cta' onClick={rules}>
                  Rules
                </a>
            </li>
            <li>
              
                <a data-testid="nav-finduser" className='cta' onClick={finduser}>
                  Search
                </a>
            </li>
            <li>
              
                <a data-testid="nav-profile" className='cta' onClick={profile}>
                  Profile
                </a>
            </li>
            <li>
              
                <a data-testid="nav-logout" className='cta' onClick={logout}>
                  Sign Out
                </a>
             
            </li>
          </ul>

          <a data-testid="nav-lobby" className='navtitle' onClick={lobby}>
            Words Away
          </a>
        </div>
      </body>
    </>
  )
}