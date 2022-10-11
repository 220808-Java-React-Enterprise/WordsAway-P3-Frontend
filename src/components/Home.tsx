import React, { useEffect, useState } from 'react'
import WORDS_API from '../utils/ApiConfig'
import axios, { AxiosResponse } from 'axios'
import CryptoJS from 'crypto-js'
import '../css/login.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirm, setConfirm] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    window.sessionStorage.removeItem('username')
  }, [])

  function toggleLogin() {
    setIsLogin(!isLogin)
  }

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let salt = ''
    await WORDS_API.get('salt', { params: { username: username } }).then((response: AxiosResponse) => {
      salt = response.data
    })
    let hash = CryptoJS.HmacSHA512(password, salt).toString()
    await WORDS_API.post('login', {
      username: username,
      password: hash
    })
      .then((response) => {
        sessionStorage.setItem('token', response.headers.authorization)
        axios.defaults.headers.common.Authorization = response.headers.authorization
        storeUser()
      })
      .catch((response) => {
        if (response.response.status === 401) alert('Incorrect username or password!')
        else alert("Username doen't exist")
      })
  }

  async function storeUser() {
    await WORDS_API.get('findUser', { params: { username: username } })
      .then((response: AxiosResponse) => {
        let user = { ...response.data }
        window.sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('username', username)
        navigate('/lobby')
        window.location.reload()
      })
      .catch((response) => console.log(response))
  }

  async function signup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let salt = ''
    await WORDS_API.get('salt').then((response: AxiosResponse) => {
      salt = response.data
    })
    if (password !== confirm) {
      alert("Passwords don't match.")
      return
    }
    let hash = CryptoJS.HmacSHA512(password, salt).toString()
    WORDS_API.post('signup', {
      username: username,
      email: email,
      salt: salt,
      password: hash
    })
      .then(() => loginFromSignup(hash))
      .catch(() => alert('Error'))
  }

  async function loginFromSignup(password: string) {
    await WORDS_API.post('login', {
      username: username,
      password: password
    })
      .then((response) => {
        sessionStorage.setItem('token', response.headers.authorization)
        sessionStorage.setItem('username', username)
        axios.defaults.headers.common.Authorization = response.headers.authorization
        storeUser()
      })
      .then(() => (window.location.href = 'lobby'))
  }

  return (
    <>
      <div className='logincontainer'>
        <div className='title'>
          <div data-testid='title'>WORDS AWAY</div>
        </div>

        <div className='floating'>
          {isLogin ? (
            <>
              <form role='loginForm' className='form' onSubmit={login}>
                <input data-testid='login-username-input' type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
                <br />
                <input data-testid='login-password-input' type='password' placeholder='Password' onChange={(event) => setPassword(event.target.value)} />
                <br />
                <button data-testid='loginButton' type='submit'>
                  Login
                </button>
              </form>
              <button role='switchMenu' className='redirect-button' onClick={toggleLogin}>
                Sign Up
              </button>
            </>
          ) : (
            <div>
              <form role='signupForm' onSubmit={signup}>
                <input
                  type='text'
                  placeholder='Username'
                  autoComplete='username'
                  onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <input
                  type='text'
                  placeholder='Email'
                  autoComplete='email'
                  onChange={(event) => setEmail(event.target.value)}
                />
                <br />
                <input
                  type='password'
                  placeholder='Password'
                  autoComplete='new-password'
                  onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <input
                  type='password'
                  placeholder='Confirm Password'
                  autoComplete='new-password'
                  onChange={(event) => setConfirm(event.target.value)}
                />
                <br />
                <button type='submit'>Signup</button>
              </form>
              <button className='redirect-button' onClick={toggleLogin}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home