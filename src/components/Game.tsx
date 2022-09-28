import React, { useState, useEffect } from 'react'
import TopBanner from './game/TopBanner'
import MainBoard from './game/MainBoard'
import SecondaryBoard from './game/SecondaryBoard'
import Tray from './game/Tray'
import BottomBanner from './game/BottomBanner'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MakeMove from './game/MakeMove'
import FireballLaunch from './game/FireballLaunch'
import FireballCounter from './game/FireballCounter'
import WORDS_API from '../utils/ApiConfig'
import { AxiosResponse } from 'axios'
import { Board } from '../types/Board.type'
import SwapTray from './game/SwapTray'
import Overlay from './game/Overlay'
import InvalidMove from './game/InvalidMove'
import { URL } from '../utils/ApiConfig'

import '../css/game.css'

const Game = () => {
  const bb: string[] = 
    ( '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' +
      '................' ).split('')

  const [users, setUsers] = useState([{ username: '_' }, { username: '_' }])
  const [board, setboard] = useState(bb)
  const [move, setMove] = useState(bb)
  const [tray, setTray] = useState('.......'.split(''))
  const [worms, setWorms] = useState(bb)
  const [fireball, setfireball] = useState({
    "count":0,
    placed: false
  })
  const [isActive, setActive] = useState(false)
  const [winner, setWinner] = useState<string|null>(null)
  const [legalMove, setLegalMove] = useState(false)

    function waitForTurn(){
        console.log('Wait for turn')
    }
    
  async function getGame() {
    let board_id = sessionStorage.getItem('board_id')
    if (board_id == null) window.location.href = '/lobby'
    else {
      await WORDS_API.get('getGame', { params: { id: board_id } })
      .then(async (response: AxiosResponse) => {
        let game: Board = response.data
        if (!game.active) {
          const eventSource = new EventSource(`${URL}/active?board_id=${board_id}` )
          eventSource.addEventListener("active", (event) => {
            getGame()
            eventSource.close()
          })
          eventSource.onerror = () => getGame()
        }
        updateState(game)
      })
      .catch(() => (window.location.href = '/login'))
    }
  }
  useEffect(() => {
    getGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function updateState(game: Board) {
    setboard(game.letters.split(''))
    setMove(bb)
    setTray(game.tray.split(''))
    setfireball({"count":game.fireballs, placed:false})
    setWorms(game.worms.split(''))
    setUsers([{ username: sessionStorage.getItem('username') || '' }, { username: game.opponent }])
    setActive(game.active)
    setWinner(game.winner)
  }

  useEffect(() => {
    sessionStorage.setItem('fireballs', JSON.stringify(fireball))
    sessionStorage.setItem('board', JSON.stringify(board))
    sessionStorage.setItem('move', JSON.stringify(move))
    sessionStorage.setItem('tray', JSON.stringify(tray))
  })

  function checkMove(themove: string[]) {
    console.log(themove)

    // send boardID, layout, replacedTray

    WORDS_API.post('checkMove', {
      boardID: sessionStorage.board_id,
      layout: themove,
      replacedTray: false
    })
    .then(async (response: AxiosResponse) => {
      console.log(response.data)
      setLegalMove(response.data)
    })
    .catch((error) => {
      setLegalMove(false)
      console.log(error)
    })
  }

  function makeMove() {
    console.log('makemove')
    setActive(false)
    WORDS_API.post('makeMove', {
      boardID: sessionStorage.board_id,
      layout: move,
      replacedTray: false
    })
    .then(async (response: AxiosResponse) => {
      console.log(response.data)
      setLegalMove(false)
      getGame()
      //updateState(response.data)
    })
    .catch((error) => {
      console.log(error)
      setActive(true)
    })
    waitForTurn()
  }

  function swapTray() {
    console.log('makemove')
    setActive(false)
    WORDS_API.post('makeMove', {
      boardID: sessionStorage.board_id,
      layout: bb,
      replacedTray: true
    })
    .then(async (response: AxiosResponse) => {
      console.log(response.data)

      getGame()
    })
    .catch((error) => {
      console.log(error)
      setActive(true)
    })
    waitForTurn()
  }

  function updateGame(inOb: string, outOb: string, inN: number, outN: number, letter: string) {
    // console.log("Letter: " + letter)
    // console.log("From: " + outOb + " at " + outN)
    // console.log("To: " + inOb + " at " + inN)

    // changing outgoing cells
    var OOut = [],
      OIn = [],
      NOut: string[] = [],
      NIn: string[] = []
    if (outOb === 'traytile' && inOb === 'empty') {
      OOut = JSON.parse(sessionStorage.tray)
      OIn = JSON.parse(sessionStorage.move)

      NOut = [...OOut]
      NIn = [...OIn]
      NIn[inN] = NOut[outN]
      NOut[outN] = '.'

      setTray(NOut)
      setMove(NIn)
      checkMove(NIn)
    } else if (outOb === 'movetile' && inOb === 'empty') {
      OIn = JSON.parse(sessionStorage.move)
      NIn = [...OIn]
      NIn[inN] = NIn[outN]
      NIn[outN] = '.'
      setMove(NIn)
      checkMove(NIn)
    } else if (outOb === 'movetile' && inOb === 'emptytraytile') {
      OIn = JSON.parse(sessionStorage.tray)
      OOut = JSON.parse(sessionStorage.move)

      NOut = [...OOut]
      NIn = [...OIn]
      NIn[inN] = NOut[outN]
      NOut[outN] = '.'

      setTray(NIn)
      setMove(NOut)
      checkMove(NOut)
    } else if (outOb === 'traytile' && inOb === 'emptytraytile') {
      OIn = JSON.parse(sessionStorage.tray)

      NIn = [...OIn]
      NIn[inN] = NIn[outN]
      NIn[outN] = '.'

      setTray(NIn)
    } else if (outOb === 'fbtile' && inOb === 'empty') {
      console.log('Working')

      OIn = JSON.parse(sessionStorage.move)

      NIn = [...OIn]
      NIn[inN] = "*"

      setMove(NIn)
      setfireball({ "count": (JSON.parse(sessionStorage.fireballs).count -1),"placed":true})
      checkMove(NIn)
    }
  }

  async function endGame() {
    await WORDS_API.post('endGame', {
      boardID: sessionStorage.board_id
    })
    .then((response) => {
      window.location.href = '/lobby'
    })
    .catch((response) => alert(response))
  }

  function checkExistingMove(){
    for (let i=0; i<move.length;i++){
      if (move[i]!=='.'){
        return false;
      }
    }
    return true;
  }

  return (
    <>
    <div className='game'>
      <DndProvider backend={HTML5Backend}>
        <TopBanner name={users[1].username} active={!isActive} />
        <div className='boards'>
            
          <div className='leftboard'>
            <MainBoard moves={move} updateGame={updateGame} letters={board} />
          </div>
          <div className='rightboard'>
            <SecondaryBoard worms={worms} />
            {!winner ?
            <>
            <FireballCounter count={fireball.count} />
            <FireballLaunch moveable={checkExistingMove()} updateGame={updateGame} fb={fireball}/>
            <div className='movebar'>
              { legalMove ? <MakeMove makeMove={makeMove} /> : <InvalidMove/>}
              <SwapTray swapTray={swapTray} />
            </div>
            </>: (winner !== sessionStorage.getItem("username") || users[1].username === "Easy-Bot") ? <button onClick={() => endGame()}>End Game</button>:<></>}
          </div>
        </div>
        {!winner ? <Tray moveable={fireball.placed} updateGame={updateGame} trayletters={tray} /> : winner === sessionStorage.getItem("username") ? <h1>YOU WIN</h1>: <h1>You Lose</h1>}
        <BottomBanner name={users[0].username} active={isActive} />
      </DndProvider>
      
    </div>
      <Overlay message='test message' active={isActive} />
      <div onClick={() => { window.location.href = '/lobby' }} id='backbutton'>← Back</div>
      <div onClick={()=>{getGame()}} id='refreshbutton'>⟳</div>
    </>
  )
}

export default Game
