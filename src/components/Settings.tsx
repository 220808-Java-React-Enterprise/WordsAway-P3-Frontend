import React, { useEffect, useState } from 'react'
import WORDS_API from '../utils/ApiConfig'
import { AxiosResponse } from 'axios'
import CryptoJS from 'crypto-js'
import '../css/settings.css'
import { User } from '../types/User.type'
import { useNavigate } from 'react-router-dom'


const SettingsPage = () => {
  const [newEmail, setEmail] = useState('')
  const [newPassword, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [isShown2, setIsShown2] = useState(false)
  const [icon, setIcon] = useState<String | undefined>('')
  const [username, setUsername] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [buttonText, setButtonText] = useState(localStorage.getItem('themeText') || 'Dark Mode')
  const navigate = useNavigate()

  useEffect(() => {
    const data = window.sessionStorage.getItem('user')
    if (data != null) {
      setUser(JSON.parse(data))
      setIcon(user?.avatar?.toString())
    } else {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (user != null) {
      setIcon(user?.avatar?.toString())
    }
  }, [user])

  async function handleUpdatePassword() {
    console.log('here at handlePassword')
    let salt = ''
    await WORDS_API.get('salt', { params: { username: user?.username } }).then((response: AxiosResponse) => {
      salt = response.data
    })

    let oldHash = CryptoJS.HmacSHA512(oldPassword, salt).toString()
    let newHash = CryptoJS.HmacSHA512(newPassword, salt).toString()

    WORDS_API.put('/settings/updateUser/', {
      currentPassword: oldHash,
      email: newEmail,
      newPassword: newHash,
      avatarIdx: Number(icon)
    })
      .then((response: AxiosResponse) => {
        WORDS_API.get('findUser', { params: { username: user?.username } })
          .then((response: AxiosResponse) => {
            let user2 = { ...response.data }
            window.sessionStorage.setItem('user', JSON.stringify(user2))
            window.location.href = '/lobby'
          })
          .catch((response) => console.log(response))
        alert('Change successful!')
        console.log(response)
      })
      .catch((error: { response: { data: { message: any } } }) => {
        alert('Sorry something went wrong.')
        console.log(error)
      })
  }

  function emptyFunction2(event: React.MouseEvent<HTMLAnchorElement>) {
    var test = event.currentTarget.dataset.value
    setIcon(test)
    setIsShown2(false)
  }

  function iconPrompt() {
    setIsShown2(true)
  }

  //function that takes a buttons value and sends a request to the server to update the user's settings
  console.log(user)
  console.log('icon: ' + icon)

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    const newText = buttonText === 'Light Mode' ? 'Dark Mode' : 'Light Mode'
    setButtonText(newText)
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    localStorage.setItem('themeText', newText)
    window.location.reload()
  }

  return (
    <div className='settingsPage'>
      <h1> Settings</h1>
      <br />
      <section>
        <a href='#' onClick={iconPrompt}>
          <img data-testid='select-icon' id='settingIcon' alt='Its broken!' src={'images/icon' + icon + '.png'}></img>
        </a>

        <div style={{ display: isShown2 ? 'flex' : 'none' }} id='iconSelect'>
          <div id='iconSpace'>
            <button id='closeIcons' onClick={() => setIsShown2(false)}>
              Close
            </button>

            <div id='grid'>
              <a href='#' className='yes' onClick={emptyFunction2} data-value='0'>
                <img alt='Its broken!' src={'images/icon0.png'}></img>
              </a>
              <a href='#' className='yes' onClick={emptyFunction2} data-value='1'>
                <img alt='Its broken!' src={'images/icon1.png'}></img>
              </a>
              <a href='#' className='yes' onClick={emptyFunction2} data-value='2'>
                <img alt='Its broken!' src={'images/icon2.png'}></img>
              </a>
              <a href='#' className='yes' onClick={emptyFunction2} data-value='3'>
                <img alt='Its broken!' src={'images/icon3.png'}></img>
              </a>
              <a href='#' className='yes' onClick={emptyFunction2} data-value='4'>
                <img alt='Its broken!' src={'images/icon4.png'}></img>
              </a>
              <a href='#' className='yes' onClick={emptyFunction2} data-value='5'>
                <img alt='Its broken!' src={'images/icon5.png'}></img>
              </a>
              <a href='#' className='yes' onClick={emptyFunction2} data-value='6'>
                <img alt='Its broken!' src={'images/icon6.png'}></img>
              </a>
              <a href='#' className='yes' onClick={emptyFunction2} data-value='7'>
                <img alt='Its broken!' src={'images/icon7.png'}></img>
              </a>
            </div>
          </div>
        </div>

        <br />
        <form>
          <label>New Email</label>
          <br />
          <input type='text' placeholder='enter new email' onChange={(event) => setEmail(event.target.value)} />
          <br />
          <label>New Password</label>
          <br />
          <input type='text' placeholder='enter new password' onChange={(event) => setPassword(event.target.value)} />
          <br />
          <label>Old Password</label>
          <br />
          <input
            type='text'
            placeholder='enter old password'
            onChange={(event) => setOldPassword(event.target.value)}
          />

          <input type='button' value='Enter' onClick={handleUpdatePassword} />
        </form>
        <br />
      </section>
      <button data-testid='switch-theme' onClick={switchTheme} className='switch'>
        {localStorage.getItem('themeText') ? localStorage.getItem('themeText') : 'Dark Mode'}
      </button>
    </div>
  )
}

export default SettingsPage
