import React, { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { User } from '../types/User.type'
import WORDS_API from '../utils/ApiConfig'

import '../css/lobby.css'

const Lobby = () => {
  const [users, setUsers] = useState<User[]>([])
  async function getOpponents() {
    await WORDS_API.get('/getOpponents')
    .then((response: AxiosResponse<User[]>) => {
      console.log(response.data)
      setUsers(response.data)
    })
    .catch(() => (window.location.href = '/login'))
  }
  useEffect(() => {
    getOpponents()
  }, [])

  async function startGame(username: string) {
    await WORDS_API.post('makeGame', {
      username: username
    })
    .then((response) => {
      sessionStorage.setItem('board_id', response.data)
      window.location.href = '/game'
    })
    .catch((response) => alert(response))
  }

  function continueGame(board_id: string) {
    // alert('Board ID: ' + board_id)
    sessionStorage.setItem('board_id', board_id)
    window.location.href = '/game'
  }

  return (
    <div id='lobbycontainer'>
      <div id='floatlobby'>
      <h1>CHOOSE YOUR CHALLENGER!</h1>
      <div id='tablediv'>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>ELO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.elo.toFixed(0)}</td>
              <td>
                {user.board_id == null ? (
                  <button onClick={() => startGame(user.username)}>Challenge!</button>
                ) : (
                  <button onClick={() => continueGame(user.board_id)}>Continue!</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </div>
      <div onClick={() => { window.location.href = '/login' }} id='backbutton'>← Back</div>
    </div>
    
  )
}
export default Lobby
