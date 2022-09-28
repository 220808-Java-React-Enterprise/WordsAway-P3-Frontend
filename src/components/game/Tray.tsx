import React from 'react'
import Cell from './Cell'

const Tray = ({ trayletters, updateGame, moveable }: { trayletters: string[]; updateGame: Function; moveable:boolean }) => {
  const tray = []
  for (let i = 0; i < 7; i++) {
    if (trayletters[i] !== '.') {
      tray.push(<Cell updateGame={updateGame} position={i} type='traytile' letter={trayletters[i]} key={i} />)
    } else {
      tray.push(<Cell updateGame={updateGame} position={i} type='emptytraytile' letter={trayletters[i]} key={i} />)
    }
  }

  return (

      <div className='tray'>
        {tray}<div style={{display: !moveable?'none':'inline'}} id='traycover'/>
      </div>

  )
}

export default Tray
