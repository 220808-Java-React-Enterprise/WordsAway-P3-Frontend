import React, { useState } from 'react'
import WORDS_API from '../utils/ApiConfig'
import axios, { AxiosResponse } from 'axios'
import CryptoJS from 'crypto-js'

import '../css/login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirm, setConfirm] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  function updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function updateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function updateConfirm(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirm(event.target.value)
  }

  function toggleLogin(){
    setIsLogin(!isLogin);
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

      console.log("yeah")
      console.log(username)
      
      
      
      
     console.log("stupid")
      sessionStorage.setItem('token', response.headers.authorization)
      sessionStorage.setItem('username', username)
      axios.defaults.headers.common.Authorization = response.headers.authorization

      
      storeUser();



    })
    .catch((response) => alert(response))

  }

  async function storeUser(){
    
    await WORDS_API.get('findUser', { params: { username: username } }).then((response: AxiosResponse) => {
      let user = { ...response.data};
      window.sessionStorage.setItem("user", JSON.stringify(user))
      window.location.href = '/'
    })
    .catch((response) => console.log("wack"))
  }

  async function signup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let salt = ''
    await WORDS_API.get('salt').then((response: AxiosResponse) => {
      salt = response.data
    })
    if (password !== confirm) {
      alert("Passwords don't match")
      return
    }
    let hash = CryptoJS.HmacSHA512(password, salt).toString()
    WORDS_API.post('signup', {
      username: username,
      email: email,
      salt: salt,
      password: hash
    })
    .then(() => (window.location.href = 'login'))
    .catch(() => alert('Error'))
  }


  return (
    <>
      <div className='logincontainer'>
        <div className='title'>
          <div>WORDS AWAY</div>
          
        </div>

        <div className='floating'>
        {isLogin? <>
          <form className='form' onSubmit={login}>
            <input type='text' placeholder='Username' onChange={updateUsername} />
            <br />
            <input type='password' placeholder='Password' onChange={updatePassword} />
            <br />
            <button type='submit'>Login</button>
          </form>
          <button onClick={toggleLogin}>Sign Up</button>
          </>
        
      : 
      <div>
      <form onSubmit={signup}>
        <input type='text' placeholder='Username' autoComplete='username' onChange={updateUsername} />
        <br />
        <input type='text' placeholder='Email' autoComplete='email' onChange={updateEmail} />
        <br />
        <input type='password' placeholder='Password' autoComplete='new-password' onChange={updatePassword} />
        <br />
        <input type='password' placeholder='Confirm Password' autoComplete='new-password' onChange={updateConfirm} />
        <br />
        <button type='submit'>Signup</button>
      </form>
      <button onClick={toggleLogin}>Login</button>
    </div>
      }
      </div>
      </div>
    </>
  )
}

export default Login
