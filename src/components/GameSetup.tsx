import React from 'react'
import SetupBoard from './gamesetup/SetupBoard'
import WormTray from './gamesetup/WormTray'
import {useState, useEffect} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

const GameSetup = () => {
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

    const [wormboard, setwormboard] = useState(bb)
    const [wormtray, setwormtray] = useState(".....".split(''))

    const [valid, setvalid] = useState(bb)
    const [wormtoggle,setwormtoggle]=useState(false)

    function rotateWorm(){
        setwormtoggle(!wormtoggle)
    }

    useEffect(()=>{
        setwormtray(["a", "b", "c", "d", "s"])
    },[])

    function updateBoard(){

    }

  return (
      <DndProvider backend={HTML5Backend} >
      <div className=' container'>
        <div className='gamesetup container'>
            <SetupBoard worms={wormboard}/>
            <WormTray updateBoard={updateBoard} wormtray={wormtray}/>
        </div>
      </div>
      </DndProvider>
  )
}

export default GameSetup