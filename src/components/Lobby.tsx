import { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { Opponent } from '../types/Opponent.type'
import WORDS_API from '../utils/ApiConfig'
import '../css/lobby.css'
import Leaderboard from './Leaderboard'
import Challengeboard from './Challengeboard'

export default function Lobby() {
  const [users, setUsers] = useState<Opponent[]>([])
  const [gameType, setGameType] = useState('')
  const [tableVis, setTableVis] = useState(false)
  const username = window.sessionStorage.getItem('username')

  async function getPlayers() {
    await WORDS_API.get('/getOpponents?type=human')
      .then((response: AxiosResponse<Opponent[]>) => {
        console.log(response.data)
        setUsers(response.data)
        setGameType('ranked')
        setTableVis(true)
      })
      .catch(() => (window.location.href = '/login'))
  }

  async function getBots() {
    await WORDS_API.get('/getOpponents?type=bot')
      .then((response: AxiosResponse<Opponent[]>) => {
        console.log(response.data)
        setUsers(response.data)
        setGameType('practice')
        setTableVis(true)
      })
      .catch(() => (window.location.href = '/login'))
  }

  return (
    <div id='lobbycontainer'>
      <h1 data-testid='title'>Welcome, {username}</h1>
      <div id='lobby'>
        <Leaderboard />
        <div id='playerBoard'>
          <div id='selection-buttons'>
            <button
              onClick={() => {
                getPlayers()
              }}
              className='table-button'
              role='rankedMatchBtn'
            >
              Challenge
            </button>
            <button
              onClick={() => {
                getBots()
              }}
              className='table-button'
              data-testid="practice-table-button"
            >
              Practice
            </button>
          </div>
          {tableVis ? (
            <div id='tablediv'>
              <Challengeboard userList={users} gameType={gameType} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div id='rules'>
          <h3>Rules go here</h3>
        </div>
        {/* <div onClick={() => { window.location.href = '/login' }} id='backbutton'>← Back</div> */}
      </div>
    </div>
  )
}

