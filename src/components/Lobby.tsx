import React, { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { Opponent } from '../types/Opponent.type'
import WORDS_API from '../utils/ApiConfig'
import { User } from '../../src/types/User.type'
import '../css/lobby.css'
import Leaderboard from './Leaderboard'
import FriendsList from './test/FriendsList'
import Challengeboard from './Challengeboard'

interface LobbyProp {
  currentUser: User | null
}

export default function Lobby({ currentUser }: LobbyProp) {
  const [users, setUsers] = useState<Opponent[]>([])
  const [gameType, setGameType] = useState('')
  const [tableVis, setTableVis] = useState('hidden')

  async function getPlayers() {
    setTableVis('visible')
    await WORDS_API.get('/getOpponents?type=human')
      .then((response: AxiosResponse<Opponent[]>) => {
        console.log(response.data)
        setUsers(response.data)
        setGameType('ranked')
      })
      .catch(() => (window.location.href = '/login'))
  }
  useEffect(() => {
    getPlayers()
  }, [])

  async function getBots() {
    setTableVis('visible')
    await WORDS_API.get('/getOpponents?type=bot')
      .then((response: AxiosResponse<Opponent[]>) => {
        console.log(response.data)
        setUsers(response.data)
        setGameType('practice')
      })
      .catch(() => (window.location.href = '/login'))
  }
  useEffect(() => {
    getBots()
  }, [])

  const challengeTable = document.getElementById('tablediv')

  if (challengeTable != null) {
    challengeTable.style.visibility = tableVis
  }

  return (
    <div id='lobbycontainer'>
      <h1 data-testid='title'>Welcome, {currentUser?.username}</h1>
      <div id='lobby'>
        <Leaderboard />
        <div id='playerBoard'>
          <div id='selection-buttons'>
            <button onClick={() => getPlayers()} className='table-button' role='rankedMatchBtn'>
              Challenge
            </button>
            <button onClick={() => getBots()} className='table-button'>
              Practice
            </button>
          </div>
          <div id='tablediv'>
            <Challengeboard userList={users} gameType={gameType} />
          </div>
        </div>
        <div id='rules'>
          <h3>Rules go here</h3>
        </div>
        {/* <div onClick={() => { window.location.href = '/login' }} id='backbutton'>← Back</div> */}
      </div>
    </div>
  )
}

