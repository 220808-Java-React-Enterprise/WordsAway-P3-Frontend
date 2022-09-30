import React, { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { User } from '../types/User.type'
import WORDS_API from '../utils/ApiConfig'
// import LobbyTable from '../components/LobbyTable'

import '../css/lobby.css'
import ReactDOM from 'react-dom'

const Lobby = () => {
  const [users, setUsers] = useState<User[]>([])
  let player = sessionStorage.getItem("username")
  if (player == null) {
    window.location.href = 'login'
  }
  async function getPlayers() {
    await WORDS_API.get('/getOpponents?type=human')
      .then((response: AxiosResponse<User[]>) => {
        console.log(response.data)
        setUsers(response.data)
      })
      .catch(() => (window.location.href = '/login'))
  }
  useEffect(() => {
    getPlayers()
  }, [])

  async function getBots() {
    await WORDS_API.get('/getOpponents?type=bot')
      .then((response: AxiosResponse<User[]>) => {
        console.log(response.data)
        setUsers(response.data)
      })
      .catch(() => (window.location.href = '/login'))
  }
  useEffect(() => {
    getBots()
  }, [])

  // async function renderTable(props) {
  //   ReactDOM.render(<LobbyTable(props) />)
  // }

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
      <h1>Welcome, {player}</h1>
      <div id="lobby">
      <div id="leaderboard">
        <h3>Leaderboard go here</h3>
      </div>
      <div id='floatlobby'>
        <div id="selection-buttons">
          <button onClick={() => getPlayers()} className = "table-button">Challenge</button>
          <button onClick={() => getBots()} className = "table-button">Practice</button>
        </div>
        <div id='tablediv'>
          <table>
            <thead id = "table-header">
              <tr>
                <th>Username</th>
                <th>ELO</th>
                <th></th>
              </tr>
            </thead>
            <tbody id = "table-body">
              {users.map((user) => (
                <tr key={user.username}>
                  <td className = "usernames-column">{user.username}</td>
                  <td className = "elo-column">{user.elo.toFixed(0)}</td>
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
      <div id="rules">
        <h3>Rules go here</h3>
      </div>
      <div onClick={() => { window.location.href = '/login' }} id='backbutton'>← Back</div>
      </div>
    </div>

  )
}
export default Lobby
