import React, { useState } from 'react'
import WORDS_API from '../utils/ApiConfig'
import { AxiosResponse } from 'axios'
import CryptoJS from 'crypto-js'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  function updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function updateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function updateConfirm(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirm(event.target.value)
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
    </div>
  )
}

export default Signup
