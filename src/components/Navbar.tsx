import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Profile.css'
import '../css/Navbar.css'


export default function Navbar() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [buttonText, setButtonText] = useState(localStorage.getItem("themeText") || "Dark Mode");
  
  const switchTheme = () => {
    const newTheme = (theme === "light" ? "dark" : "light");
    const newText = (buttonText === "Light Mode" ? "Dark Mode" : "Light Mode");
    setButtonText(newText)
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    localStorage.setItem("themeText", newText)
    window.location.reload();
  }

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
    navigate("/finduser");
    window.location.reload();
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
              {window.sessionStorage.getItem("username") ? <a className="cta" onClick={finduser}>FindUser</a>
                : <></>}
            </li>
            <li>
              {window.sessionStorage.getItem('username') ? (
                <a className='cta' onClick={rules}>
                  Rules
                </a>
              ) : (
                <></>
              )}
            </li>
            <li>
              {window.sessionStorage.getItem('username') ? (
                <a className='cta' onClick={profile}>
                  Profile
                </a>
              ) : (
                <></>
              )}
            </li>
            <li>
              {window.sessionStorage.getItem('username') ? (
                <a className='cta' onClick={logout}>
                  Sign Out
                </a>
              ) : (
                <a className='cta' onClick={login}>
                  Sign In
                </a>
              )}
            </li>
            <li>
            <button onClick={switchTheme} className="switch">{localStorage.getItem("themeText")}</button> 
            </li>
          </ul>

          <a className='navtitle' onClick={lobby}>
            Words Away
          </a>
        </div>
      </body>
    </>
  )
}
